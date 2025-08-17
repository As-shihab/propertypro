import { Routes } from '@nestjs/core';
import { AdminModule } from '@module/admin/admin.module';

export const AdminRoutes: Routes = [
  {
    path: 'admin',
    module: AdminModule,
  },
];
