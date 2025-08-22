import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { unlinkSync, existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class MediaService {
  constructor(private prisma: PrismaService) {}

  async createMedia(data: {
    productId?: number;
    userId?: number;
    fileName: string;
    filePath: string;
    fileType: string;
    fileSize: number;
    altText?: string;
    isFeatured?: boolean;
    metadata?: Record<string, any>;
  }) {
    const createData: any = {
      fileName: data.fileName,
      filePath: data.filePath,
      fileType: data.fileType,
      fileSize: data.fileSize,
      altText: data.altText || null,
      isFeatured: data.isFeatured ?? false,
      metadata: data.metadata || undefined,
    };
    if (data.productId !== undefined) {
      createData.productId = data.productId;
    }
    if (data.userId !== undefined) {
      createData.userId = data.userId;
    }
    return this.prisma.media.create({
      data: createData,
    });
  }

  async deleteMedia(id: number) {
    const media = await this.prisma.media.findUnique({ where: { id } });
    if (!media) throw new NotFoundException('Media not found');

    if (!media.filePath) {
      throw new NotFoundException('Media file path not found');
    }
    const filePath = join(process.cwd(), media.filePath);
    if (existsSync(filePath)) unlinkSync(filePath);

    return this.prisma.media.delete({ where: { id } });
  }

  async getAllMedia() {
    return this.prisma.media.findMany();
  }

  async getMediaById(id: number) {
    return this.prisma.media.findUnique({ where: { id } });
  }
}
