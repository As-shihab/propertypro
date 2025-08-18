import { Edm } from 'odata-v4-server';

export class Category {
@Edm.Key
  @Edm.Int32
  id: number;

  @Edm.String
  name: string;

  @Edm.String
  slug?: string;

  @Edm.String
  description?: string;

  @Edm.String
  icon?: string;

  @Edm.Boolean
  isActive: boolean;

  @Edm.Int32
  priority: number;

  products: any;

  @Edm.DateTimeOffset
  createdAt: Date;

  @Edm.DateTimeOffset
  updatedAt: Date;

  metadata?: any;
}