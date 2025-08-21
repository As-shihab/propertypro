import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
@Controller()
export class ProductController {
  @Get()
async  getHello() {
    const http = new PrismaService(); // Ensure PrismaService is used
    const res =await http.product.findMany({include:{medias:true}}); // Example usage of PrismaService
    return { message: 'Product works', res:  res ? res : "No products found" };
  }
}
