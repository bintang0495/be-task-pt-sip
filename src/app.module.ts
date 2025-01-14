import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { PoliModule } from './poli/poli.module';
import { PerawatModule } from './perawat/perawat.module';

@Module({
  imports: [
    AuthModule,
    PoliModule,
    PerawatModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
