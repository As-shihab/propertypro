import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
  Delete,
  Param,
  Get,
  Body,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { MediaService } from './media.service';


@Controller()
export class MediaController {
  constructor(private readonly mediaService: MediaService) { }

  @Post('upload')
  @UseInterceptors(
    FileFieldsInterceptor(
      [{ name: 'media' }],
      {
        storage: diskStorage({
          destination: (req, file, cb) => {
            let folder = 'others';
            if (file.mimetype.startsWith('image/')) folder = 'images';
            else if (file.mimetype.startsWith('video/')) folder = 'videos';

            const uploadPath = join('src', 'storage', 'public', folder);
            if (!existsSync(uploadPath)) mkdirSync(uploadPath, { recursive: true });

            cb(null, uploadPath);
          },
          filename: (req, file, cb) => {
            const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, uniqueName + extname(file.originalname));
          },
        }),
      },
    ),
  )
  async uploadMedia(
    @UploadedFiles()
    files: { media?: Express.Multer.File[] },
    @Body() body: { userId: string; productId: string }
  ) {
    const savedMedia: any[] = [];

    for (const file of files.media || []) {
      const folder = file.mimetype.startsWith('image/') ? 'images' :
        file.mimetype.startsWith('video/') ? 'videos' : 'others';

      const media = await this.mediaService.createMedia({
        productId: body.productId ? Number(body.productId) : undefined,
        userId: body.userId ? Number(body.userId) : undefined,
        fileName: file.originalname,
        filePath: join('src', 'storage', 'public', folder, file.filename),
        fileType: file.mimetype,
        fileSize: file.size,
      });
      savedMedia.push(media);
    }

    return { message: 'Upload successful', savedMedia };
  }

  @Delete(':id')
  async deleteMedia(@Param('id') id: string) {
    return this.mediaService.deleteMedia(Number(id));
  }

  @Get()
  async getAllMedia() {
    return this.mediaService.getAllMedia();
  }
}
