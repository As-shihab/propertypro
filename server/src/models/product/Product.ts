import { Edm } from 'odata-v4-server';

export class Product {
@Edm.Key
  @Edm.Int32
  id: number;

  @Edm.String
  name?: string;

  @Edm.String
  description?: string;

  @Edm.Int32
  categoryId: number;

  @Edm.String
  status: string;

  @Edm.Boolean
  featured: boolean;

  @Edm.DateTimeOffset
  createdAt: Date;

  @Edm.DateTimeOffset
  updatedAt: Date;

  location?: any;

  pricing?: any;

  roomTypes: any;

  amenities: any;

  reviews: any;

  bookings: any;

  @Edm.Int32
  userId?: number;
}