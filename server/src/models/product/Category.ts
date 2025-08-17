import { Edm } from 'odata-v4-server';

export class Category {
@Edm.Key
  @Edm.Int32
  id: number;

  @Edm.String
  name: string;

  products: any;

  @Edm.String
  icon?: string;

  @Edm.DateTimeOffset
  createdAt: Date;

  @Edm.DateTimeOffset
  updatedAt: Date;
}