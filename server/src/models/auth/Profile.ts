import { Edm } from 'odata-v4-server';

export class Profile {
@Edm.Key
  @Edm.Int32
  id: number;

  @Edm.Int32
  userId: number;

  @Edm.String
  bio?: string;

  @Edm.String
  avatarUrl?: string;

  @Edm.String
  phone?: string;

  @Edm.String
  address?: string;

  @Edm.DateTimeOffset
  dob?: Date;

  @Edm.String
  gender?: string;

  @Edm.DateTimeOffset
  createdAt: Date;

  @Edm.DateTimeOffset
  updatedAt: Date;
}