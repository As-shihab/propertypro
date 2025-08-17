import { Controller, Get } from '@nestjs/common';

@Controller()
export class AdminController {
  @Get()
  getHello() {
    return { message: 'Admin works' };
  }
}
