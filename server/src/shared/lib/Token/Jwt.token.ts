import { JwtService } from "@nestjs/jwt";


export class JwtToken {
  private jwtService: JwtService;

  constructor() {
    this.jwtService = new JwtService({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "1d" },
    });
  }

  generateToken(payload: Record<string, any>): string {
    return this.jwtService.sign(payload);
  }

  verifyToken(token: string): Record<string, any> {
    return this.jwtService.verify(token);
  }
}