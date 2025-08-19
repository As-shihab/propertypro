import { MediaRoutes } from '@module/media/route';
import { AuthRoutes } from '@module/auth/route';
import { Routes } from '@nestjs/core';
export const apiRoutes: Routes = [
  ...MediaRoutes,
  ...AuthRoutes];
