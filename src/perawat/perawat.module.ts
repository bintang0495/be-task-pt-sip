import { Module } from '@nestjs/common';
import { PerawatService } from './perawat/perawat.service';
import { PerawatController } from './perawat/perawat.controller';
import { PrismaService } from 'src/common/prisma.service';

@Module({
  imports: [],
  providers: [PerawatService, PrismaService],
  controllers: [PerawatController]
})
export class PerawatModule {}
