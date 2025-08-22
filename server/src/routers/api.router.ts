import { MediaRoutes } from '@module/media/route';
import { AuthRoutes } from '@module/auth/route';
import { ProductRoutes } from '@module/product/route';
import { Routes } from '@nestjs/core';
export const apiRoutes: Routes = [
  ...ProductRoutes,
  ...MediaRoutes,
  ...AuthRoutes];
