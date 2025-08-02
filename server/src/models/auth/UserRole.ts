import { Edm } from 'odata-v4-server';

export class UserRole {
@Edm.Key
  @Edm.Int32
  id: number;

  @Edm.Int32
  userId: number;

  @Edm.Int32
  roleId: number;
}