import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) { }

  async getProducts(query: any) {
    const where: any = {};
    const include: any = {};

    // --- Handle $filter ---
    if (query.$filter) {
      const [field, operator, rawValue] = query.$filter.split(' ');

      // Convert string "true"/"false" to boolean
      let value: any;
      if (rawValue === 'true') value = 1;
      else if (rawValue === 'false') value = 0;
      else value = isNaN(Number(rawValue)) ? rawValue : Number(rawValue);

      switch (operator) {
        case 'eq':
          where[field] = value;
          break;
        case 'ne':
          where[field] = { not: value };
          break;
        case 'gt':
          where[field] = { gt: value };
          break;
        case 'ge':
          where[field] = { gte: value };
          break;
        case 'lt':
          where[field] = { lt: value };
          break;
        case 'le':
          where[field] = { lte: value };
          break;
        case 'contains':
          where[field] = { contains: String(value), mode: 'insensitive' };
          break;
      }
    }


    if (query.$expand) {

      const relations = query.$expand.split(',');
      relations.forEach((rel: any) => {
        include[rel] = true;
      });
    }

    return this.prisma.product.findMany({
      where,
      include,
    });
  }
}
