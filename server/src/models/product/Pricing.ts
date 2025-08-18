import { Edm } from 'odata-v4-server';

export class Pricing {
@Edm.Key
  @Edm.Int32
  id: number;

  @Edm.Int32
  productId: number;

  @Edm.Double
  basePrice: number;

  @Edm.String
  currency: string;

  @Edm.Double
  taxRate: number;

  @Edm.Double
  cleaningFee?: number;

  @Edm.Double
  resortFee?: number;

  @Edm.Double
  securityDeposit?: number;

  @Edm.Double
  weeklyDiscount?: number;

  @Edm.Double
  monthlyDiscount?: number;

  minStayDiscount?: any;

  seasonalRates?: any;

  @Edm.Boolean
  acceptsCreditCards: boolean;

  @Edm.String
  paymentPolicy?: string;
}