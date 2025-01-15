import { Injectable, NotFoundException } from '@nestjs/common';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { PrismaService } from 'src/common/prisma.service';

@Injectable()
export class PerawatService {
    constructor(
        private readonly prismaService: PrismaService,
    ) {}

    async createPerawat(data: any) {
        const poliId = data.poli_id;
        const perawat = await this.prismaService.poli.findUnique({
            where: {
                id: data.poli_id,
            }
        });
        if (!perawat) {
            throw new NotFoundException(`Perawat dengan Poli Id ${poliId} tidak ditemukan.`);
        }
        return await this.prismaService.perawat.create({ data });
    }

    async getAllPerawat(page = 1, count = 10) {
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
