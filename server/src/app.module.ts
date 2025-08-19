import { MediaModule } from '@module/media/media.module';
import { AuthModule } from '@module/auth/auth.module';

import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { PrismaService } from './prisma/prisma.service';
import { apiRoutes } from '../src/routers/api.router';

@Module({
  imports: [
    MediaModule,
    AuthModule,
    RouterModule.register([
      {
        path: 'api',
        children: apiRoutes,
      },
    ]),
  ],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
