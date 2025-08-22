import { Routes } from '@nestjs/core';
import { MediaModule } from '@module/media/media.module';

export const MediaRoutes: Routes = [
  {
    path: 'media',
    module: MediaModule,
  },
];
