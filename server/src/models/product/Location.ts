import { Edm } from 'odata-v4-server';

export class Location {
@Edm.Key
  @Edm.Int32
  id: number;

  @Edm.Int32
  productId: number;

  @Edm.String
  street: string;

  @Edm.String
  city: string;

  @Edm.String
  state?: string;

  @Edm.String
  country: string;

  @Edm.String
  postalCode?: string;

  @Edm.Double
  latitude?: number;

  @Edm.Double
  longitude?: number;

  @Edm.String
  timezone?: string;

  @Edm.String
  neighborhood?: string;

  @Edm.String
  landmarks?: string;

  @Edm.String
  description?: string;

  @Edm.String
  airportCode?: string;

  @Edm.Boolean
  metroAccess: boolean;
}