import { AuthRoutes } from '@module/auth/route';
import { Routes } from '@nestjs/core';
export const apiRoutes: Routes = [
  ...AuthRoutes];
