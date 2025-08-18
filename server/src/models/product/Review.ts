import { Edm } from 'odata-v4-server';

export class Review {
@Edm.Key
  @Edm.Int32
  id: number;

  @Edm.Int32
  productId: number;

  @Edm.Int32
  userId: number;

  @Edm.Int32
  rating: number;

  @Edm.String
  comment?: string;

  @Edm.DateTimeOffset
  createdAt: Date;
}