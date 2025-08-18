import { Edm } from 'odata-v4-server';

export class Amenity {
@Edm.Key
  @Edm.Int32
  id: number;

  @Edm.String
  name: string;

  @Edm.String
  icon?: string;

  category: any;

  @Edm.Boolean
  isFeatured: boolean;

  @Edm.String
  description?: string;

  products: any;

  @Edm.Int32
  roomTypeId?: number;
}