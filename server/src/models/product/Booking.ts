import { Edm } from 'odata-v4-server';

export class Booking {
@Edm.Key
  @Edm.Int32
  id: number;

  @Edm.Int32
  productId: number;

  @Edm.Int32
  userId: number;

  @Edm.DateTimeOffset
  checkIn: Date;

  @Edm.DateTimeOffset
  checkOut: Date;

  @Edm.Int32
  guests: number;

  @Edm.Double
  totalPrice: number;

  @Edm.String
  status: string;

  payment?: any;

  @Edm.DateTimeOffset
  createdAt: Date;
}