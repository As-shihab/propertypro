import { Module } from '@nestjs/common';
import { AdminController } from '@module/admin/admin.controller';
import { AdminService } from '@module/admin/admin.service';

@Module({
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
