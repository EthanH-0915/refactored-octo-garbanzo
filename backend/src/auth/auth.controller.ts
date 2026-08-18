import { Controller, Post, Get, Res, Req, Body, UseGuards } from '@nestjs/common';
import type { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async createUser(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    console.log('Registering user with email:', email);
    return this.authService.registerUser(email, password);
  }

  @Post('login')
  async login(@Body() body: any, @Res({ passthrough: true }) res: Response) {
    console.log('Login attempt for user:', body.email);
    const { token } = await this.authService.validateUser(body.email, body.password);

    // Set JWT as cookie
    res.cookie('token', token, {
      httpOnly: true, // not accessible via JS
      secure: process.env.NODE_ENV === 'production', // only HTTPS in prod
      sameSite: 'strict',
      path: '/',
      maxAge: 1000 * 60 * 60, // 1 hour
    });

    return { message: 'Login successful' };
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token');
    return { message: 'Logged out' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Req() req: Request & { user: { userId: string; email: string } }) {
    return req.user;
  }
}