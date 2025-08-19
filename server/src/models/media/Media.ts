import { Edm } from 'odata-v4-server';

export class Media {
@Edm.Key
  @Edm.Int32
  id: number;

  @Edm.Int32
  productId?: number;

  @Edm.Int32
  userId?: number;

  @Edm.String
  fileName?: string;

  @Edm.String
  filePath?: string;

  @Edm.String
  fileType?: string;

  @Edm.Int32
  fileSize?: number;

  @Edm.String
  altText?: string;

  @Edm.Boolean
  isFeatured: boolean;

  metadata?: any;

  @Edm.DateTimeOffset
  createdAt: Date;

  @Edm.DateTimeOffset
  updatedAt: Date;
}