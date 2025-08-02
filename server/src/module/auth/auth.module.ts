import { Module } from '@nestjs/common';
import { AuthController } from '@module/auth/auth.controller';
import { AuthService } from '@module/auth/auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
