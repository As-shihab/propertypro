import { Edm } from 'odata-v4-server';

export class Permission {
@Edm.Key
  @Edm.Int32
  id: number;

  @Edm.String
  name: string;

  @Edm.String
  description?: string;

  roles: any;

  Role: any;
}