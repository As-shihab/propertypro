import { Edm } from 'odata-v4-server';

export class Product {
@Edm.Key
  @Edm.Int32
  id: number;

  @Edm.String
  name: string;

  @Edm.String
  description?: string;

  @Edm.Double
  price: number;

  @Edm.Int32
  categoryId: number;

  @Edm.DateTimeOffset
  createdAt: Date;

  @Edm.DateTimeOffset
  updatedAt: Date;
}