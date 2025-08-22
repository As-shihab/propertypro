import { Module } from '@nestjs/common';
import { ProductController } from '@module/product/product.controller';
import { ProductService } from '@module/product/product.service';
import { PrismaService } from '@prisma/prisma.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService , PrismaService],
})
export class ProductModule {}
