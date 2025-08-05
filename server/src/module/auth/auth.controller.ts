import {
  Controller,
  Post,
  Get,
  Body,
  UnauthorizedException,
  Headers,
} from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtToken } from 'shared/lib/Token/Jwt.token';

@Controller()
export class AuthController {
  public Token = new JwtToken();
  private readonly db = new PrismaService();

  @Post('signup')
  async signup(@Body() body: { name: string; password: string; email: string }) {
    const { name, password, email } = body;

    // Validate input
    if (!name || !password || !email) {
      throw new UnauthorizedException('All fields are required');
    }

    // Check if email already exists
    const existingUser = await this.db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new UnauthorizedException('Email already in use');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await this.db.user.create({
      data: {
        name,
        password: hashedPassword,
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return {
      message: 'User created successfully',
      user,
    };
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.db.user.findUnique({
      where: { email: body.email },
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (!(await bcrypt.compare(body.password, user.password))) {
      throw new UnauthorizedException('Invalid password');
    }

    const token = this.Token.generateToken
      ({
        id: user.id,
        email: user.email,
      });

    return { access_token: token };
  }

  @Get('user')
  async getUser(@Headers('authorization') authHeader: string) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Authorization header missing or invalid');
    }

    const token = authHeader.split(' ')[1];
    const payload = this.Token.verifyToken(token); // should return { id: number }

    if (!payload || typeof payload.id !== 'number') {
      throw new UnauthorizedException('Invalid token');
    }

    const user = await this.db.user.findUnique({
      where: { id: payload.id },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }


}
