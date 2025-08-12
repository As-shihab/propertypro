import { Edm } from 'odata-v4-server';

export class Role {
@Edm.Key
  @Edm.Int32
  id: number;

  @Edm.String
  name: string;

  @Edm.String
  description?: string;

  permissions: any;

  users: any;

  RolePermission: any;
}