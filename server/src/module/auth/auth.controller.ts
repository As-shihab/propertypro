import {
  Controller,
  Post,
  Get,
  Body,
  UnauthorizedException,
  Headers,
  HttpException,
  HttpStatus,
  Head,
} from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Emailer } from 'shared/lib/Email/Emailer';
import { OtpTemplate } from 'shared/lib/Email/OtpTemplete';
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
  async getUser(@Headers("authorization") headers: string) {
    const token = headers
    const payload = await this.Token.verifyToken(token);

    if (!payload || typeof payload.id !== 'number') {
      throw new UnauthorizedException('Invalid token');
    }

    const user = await this.db.user.findUnique({
      where: { id: payload.id },
      select: {
        id: true,
        name: true,
        email: true,
        verified: true
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }


  // otp verification

  @Post('sent-otp')
  async verifyOtp(@Headers() headers: { authorization: string }) {
    const token = headers.authorization;
    if (!token) {
      throw new HttpException('Authorization token is required', HttpStatus.UNAUTHORIZED);
    }

    const payload = await this.Token.verifyToken(token);
    const userId = payload.id;

    try {

      const user = await this.db.user.findUnique({
        where: { id: userId },
        select: { email: true, name: true },
      });

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }


      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      await Emailer(
        user.email,
        'Aptigen OTP Verification',
        `Hi, ${user.name} Greetings from Aptigen!`,
        OtpTemplate(otp, user.name)
      ).then(async () => {

        const verifyToken = this.Token.generateToken({
          id: userId,
          email: user.email,
        });

        await this.db.token.create({
          data: {
            userId: userId,
            otp: otp,
            token: verifyToken,
            type: 'todo-verification',
            expiresAt: new Date(Date.now() + 10 * 60 * 1000),
          },
        });

      })
      return { message: 'OTP sent successfully' };

    } catch (error) {
      console.error('❌ Error sending OTP:', error);
      throw new HttpException('Failed to send OTP', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }



  @Post('verify-otp')
  async verifyOtpCode(@Body() body: { otp: string }) {
    const { otp } = body;

    if (!otp) {
      return new HttpException('OTP is required', HttpStatus.BAD_REQUEST);
    }

    const token = await this.db.token.findFirst({
      where: {
        otp: typeof otp === 'string' ? otp : String(otp),
        expiresAt: {
          gt: new Date(),
        },
        used: false,
      },
      include: {
        user: true,
      },
    });

    if (!token) {
      throw new HttpException('Invalid or expired OTP', HttpStatus.UNAUTHORIZED);
    }

    // Mark the OTP as used
    await this.db.token.update({
      where: { id: token.id },
      data: { used: true },
    });

    // Update user verification status
    await this.db.user.update({
      where: { id: token.userId },
      data: { verified: true },
    });

    await this.db.profile.create({
      data: {
        userId: token.userId,

      },
    })

    return { message: 'OTP verified successfully', code: HttpStatus.OK };
  }

}

