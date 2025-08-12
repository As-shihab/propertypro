import { Routes } from '@nestjs/core';
import { AuthModule } from '@module/auth/auth.module';

export const AuthRoutes: Routes = [
  {
    path: 'auth',
    module: AuthModule,
  },
];
