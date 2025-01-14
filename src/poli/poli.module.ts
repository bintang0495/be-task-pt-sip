import { Module } from '@nestjs/common';
import { PoliService } from './poli/poli.service';
import { PoliController } from './poli/poli.controller';
import { AuthModule } from 'src/auth/auth.module';
import { HttpModule } from '@nestjs/axios';
import { PrismaService } from 'src/common/prisma.service';

@Module({
  imports: [AuthModule, HttpModule],
  providers: [PoliService, PrismaService],
  controllers: [PoliController]
})
export class PoliModule {}
