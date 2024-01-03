import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('login')
  Login(@Body() body: { email: string; password: string }): {success: boolean} {
    const isValid = body.email === 'adm@outlook.com' && body.password === '1';
    return { success: isValid };
  }
}
