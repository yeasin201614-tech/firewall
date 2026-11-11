import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }

  @Post('mfa/verify')
  async verifyMfa(@Body() body: { code: string; tempToken: string }) {
    return this.authService.verifyMfa(body.code, body.tempToken);
  }

  @Post('register')
  async register(@Body() body: { email: string; fullName: string; password: string }) {
    return this.authService.register(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(@Request() req: any) {
    return this.authService.getUserById(req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('mfa/setup')
  async setupMfa(@Request() req: any) {
    return this.authService.generateMfaQr(req.user.id);
  }
}
