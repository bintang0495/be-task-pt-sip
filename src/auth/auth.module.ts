import { Module } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { HttpModule } from '@nestjs/axios';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [HttpModule, CommonModule],
  providers: [AuthService],
  controllers: [],
  exports: [AuthService],
})
export class AuthModule {}
