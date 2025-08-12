import { Edm } from 'odata-v4-server';

export class Token {
@Edm.Key
  @Edm.Int32
  id: number;

  @Edm.Int32
  userId: number;

  @Edm.String
  token: string;

  @Edm.String
  type: string;

  @Edm.DateTimeOffset
  createdAt: Date;

  @Edm.DateTimeOffset
  expiresAt: Date;

  @Edm.Boolean
  used: boolean;
}