import { Edm } from 'odata-v4-server';

export class RoomType {
@Edm.Key
  @Edm.Int32
  id: number;

  @Edm.Int32
  productId: number;

  @Edm.String
  name: string;

  @Edm.String
  description?: string;

  @Edm.Int32
  maxGuests: number;

  @Edm.Int32
  sizeSqFt?: number;

  @Edm.Int32
  quantity: number;

  @Edm.Double
  basePrice?: number;

  amenities: any;
}