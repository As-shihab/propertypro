import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

import { MediaModule } from '@module/media/media.module';
import { AuthModule } from '@module/auth/auth.module';
import { apiRoutes } from '../src/routers/api.router';
import { PrismaService } from '@prisma/prisma.service';

@Module({
  imports: [
    // Serve uploaded files under /public
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'src', 'storage', 'public'),
      serveRoot: '/public',
    }),
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
