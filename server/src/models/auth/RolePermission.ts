import { Edm } from 'odata-v4-server';

export class RolePermission {
@Edm.Key
  @Edm.Int32
  id: number;

  @Edm.Int32
  roleId: number;

  @Edm.Int32
  permissionId: number;
}