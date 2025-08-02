import { Controller, Get } from '@nestjs/common';

@Controller()
export class AuthController {
  @Get()
  getHello() {
    return { message: 'Auth works' };
  }
}
