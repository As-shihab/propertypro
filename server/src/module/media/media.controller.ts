import { Controller, Get } from '@nestjs/common';

@Controller()
export class MediaController {
  @Get()
  getHello() {
    return { message: 'Media works' };
  }
}
