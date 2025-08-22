import { Controller, Get, Query } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts(@Query() query: any) {
    const products = await this.productService.getProducts(query);

    return {
      success: true,
      count: products.length,
      product: products,
    };
  }
}
