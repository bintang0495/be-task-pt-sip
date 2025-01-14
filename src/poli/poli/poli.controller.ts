import { Body, Controller, Post } from '@nestjs/common';
import { PoliService } from './poli.service';

@Controller('/api/v1/poli')
export class PoliController {
    constructor(private readonly poliService: PoliService) {}

    @Post()
    async createPoli(@Body() data:any) {
        return await this.poliService.createPoli(data);
    }
}
