import { Edm } from 'odata-v4-server';

export class User {
@Edm.Key
  @Edm.Int32
  id: number;

  @Edm.String
  email: string;

  @Edm.String
  password: string;

  @Edm.String
  name?: string;

  @Edm.Boolean
  verified: boolean;

  @Edm.DateTimeOffset
  createdAt: Date;

  @Edm.DateTimeOffset
  updatedAt: Date;

  profile?: any;

  sessions: any;

  tokens: any;

  roles: any;
}