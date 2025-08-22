import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ProductModule } from '@module/product/product.module';
import { MediaModule } from '@module/media/media.module';
import { AuthModule } from '@module/auth/auth.module';
import { apiRoutes } from '../src/routers/api.router';
import { PrismaService } from '@prisma/prisma.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'storage', 'public'), // ✅ project root storage
      serveRoot: '/public',
      serveStaticOptions: {
        index: false, // don’t try to serve index.html
      },
    }),

    MediaModule,
    AuthModule,
    ProductModule,

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
export class AppModule { }
