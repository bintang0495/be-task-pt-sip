import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { AuthService } from 'src/auth/auth/auth.service';
import { PrismaService } from 'src/common/prisma.service';

@Injectable()
export class PoliService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly authService: AuthService,
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ){}

    async createPoli(setupData: any) {
        const token = await this.authService.getAccessToken();

        const urlApiSatuSehat = this.configService.get<string>('URL_API_SATUSEHAT_LOCATION');

        const response = await firstValueFrom(
            this.httpService.post(
                urlApiSatuSehat,
                setupData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
        );

        // Data untuk tabel Poli
        const poliData = {
            resource_type: setupData.resourceType,
            status: setupData.status,
            name: setupData.name,
            description: setupData.description,
            mode: setupData.mode,
            longitude: setupData.position.longitude,
            latitude: setupData.position.latitude,
            altitude: setupData.position.altitude,
            reference_organization: setupData.managingOrganization?.reference,
            physical_type: setupData.physicalType,
        };

        const telecomData = setupData.telecom.map((item: { system: string; value: string; use: string; }) => ({
            system: item.system,
            value: item.value,
            use: item.use,
        }));

        const identifierData = setupData.identifier.map((item: { system: string; value: string; use: string; }) => ({
            system: item.system,
            value: item.value,
        }));

        // Mulai transaksi
        const result = await this.prisma.$transaction(async (prisma) => {
            // Insert data ke tabel poli
            const poli = await prisma.poli.create({
                data: poliData,
            });

            // Insert data ke tabel telecom dengan foreign key poliId
            const telecomPromises = telecomData.map((item: { system: string; value: string; use: string; }) =>
                prisma.telecom.create({
                    data: {
                        system: item.system,
                        value: item.value,
                        use: item.use,
                        poli_id: poli.id, // foreign key ke poli
                    },
                }),
            );

            const identifierPromises = identifierData.map((item: { system: string; value: string; }) => 
                prisma.identifier.create({
                    data: {
                        system: item.system,
                        value: item.value,
                        poli_id: poli.id,
                    }
                })
            );

            const saveLog = prisma.logLocationPoli.create({
                data: {
                    status: response.status,
                    response: response.data,
                    request: response.config.method,
                    url: response.config.url,
                    poli_id: poli.id,
                }
            })

            await Promise.all([
                ...telecomPromises,
                ...identifierPromises,
                saveLog,
            ]);

            return { poli, telecom: telecomData, identifier:identifierData };
        });

        return result;
    }
}
