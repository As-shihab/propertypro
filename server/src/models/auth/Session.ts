import { Edm } from 'odata-v4-server';

export class Session {
@Edm.Key
  @Edm.Int32
  id: number;

  @Edm.Int32
  userId: number;

  @Edm.String
  device?: string;

  @Edm.String
  ipAddress?: string;

  @Edm.String
  userAgent?: string;

  @Edm.Boolean
  active: boolean;

  @Edm.DateTimeOffset
  lastUsed: Date;

  @Edm.DateTimeOffset
  createdAt: Date;

  @Edm.DateTimeOffset
  expiresAt: Date;
}