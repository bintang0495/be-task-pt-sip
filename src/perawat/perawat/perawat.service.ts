import { Injectable, NotFoundException } from '@nestjs/common';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { PrismaService } from 'src/common/prisma.service';

@Injectable()
export class PerawatService {
    constructor(
        private readonly prismaService: PrismaService,
    ) {}

    async createPerawat({
        poli_id,
        name,
    }: {
        poli_id: number,
        name: string
    }): Promise<any> {
        const perawat = await this.prismaService.poli.findUnique({
            where: {
                id: poli_id,
            }
        });
        if (!perawat) {
            throw new NotFoundException(`Perawat dengan Poli Id ${poli_id} tidak ditemukan.`);
        }
        return await this.prismaService.perawat.create({ data: {
            poli_id,
            name,
        } });
    }

    async getAllPerawat(page: number = 1, count: number = 10): Promise<any> {
        // Menghitung total data
        const totalCount = await this.prismaService.perawat.count();

        const dataPerawat = await this.prismaService.perawat.findMany({
            skip: (page - 1) * count,
            take: count,
            include: {
                poli: {
                    include: {
                        telecoms: true,
                        identifiers: true,
                        log_location_poli: true,
                    },
                },
            },
        });

        const totalPages = Math.ceil(totalCount / count);

        return {
            data: dataPerawat,
            meta: {
                totalCount,
                totalPages,
                currentPage: page,
                pageSize: count,
            },
        };
    }
}
