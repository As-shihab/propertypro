import { Module } from '@nestjs/common';
import { MediaController } from '@module/media/media.controller';
import { MediaService } from '@module/media/media.service';

@Module({
  controllers: [MediaController],
  providers: [MediaService],
})
export class MediaModule {}
