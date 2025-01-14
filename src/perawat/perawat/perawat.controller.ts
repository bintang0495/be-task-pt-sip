import { BadRequestException, Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PerawatService } from './perawat.service';

@Controller('/api/v1/perawat')
export class PerawatController {
    constructor(private readonly perawatService: PerawatService) {}

    @Post()
    async createPerawat(@Body() data: any) {
        return await this.perawatService.createPerawat(data);
    }

    @Get()
    async getAllPerawat(
        @Query('page') page: string = '1', // Nilai default sebagai string
        @Query('count') count: string = '10', // Nilai default sebagai string
    ) {
        // Validasi parameter dan konversi ke angka
        const pageNumber = parseInt(page, 10);
        const countNumber = parseInt(count, 10);
    
        if (isNaN(pageNumber) || isNaN(countNumber) || pageNumber < 1 || countNumber < 1) {
            throw new BadRequestException('Page and count must be positive integers.');
        }
        return await this.perawatService.getAllPerawat(pageNumber, countNumber);
    }
}
