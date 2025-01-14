import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';

@Injectable()
export class PerawatService {
    constructor(private readonly prismaService: PrismaService) {}

    async createPerawat(data: any) {
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
