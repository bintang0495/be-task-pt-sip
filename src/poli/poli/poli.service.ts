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

    async createPoli(setupData: any): Promise<any> {
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

        const responseData = response.data;

        // Data untuk tabel Poli
        const poliData = {
            resource_type: responseData.resourceType,
            status: responseData.status,
            name: responseData.name,
            description: responseData.description,
            mode: responseData.mode,
            longitude: responseData.position.longitude,
            latitude: responseData.position.latitude,
            altitude: responseData.position.altitude,
            reference_organization: responseData.managingOrganization?.reference,
            physical_type: responseData.physicalType,
        };

        const telecomData = responseData.telecom.map((item: { system: string; value: string; use: string; }) => ({
            system: item.system,
            value: item.value,
            use: item.use,
        }));

        const identifierData = responseData.identifier.map((item: { system: string; value: string; use: string; }) => ({
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
                    response: responseData,
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
