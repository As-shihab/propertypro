import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Controller()
export class AuthController {
  private readonly jwtService = new JwtService({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '1d' },
  });

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

    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });

    return { access_token: token };
  }

  @Get('user/:id')
  async getUser(@Param('id') id: string) {
    const user = await this.db.user.findUnique({
      where: { id: Number(id) },
      select: { id: true, email: true },
    });

    if (!user) {
      return { message: 'User not found' };
    }

    return user;
  }
}
