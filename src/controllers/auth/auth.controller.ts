import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  // Post para enviar la información para validar el login devolviendo un boolean, esto es como una simulación
  // pero en realidad se puede hacer con una autenticación segura
  @Post('login')
  Login(@Body() body: { email: string; password: string }): { success: boolean } {
    const isValid = body.email === 'adm@outlook.com' && body.password === '1';
    return { success: isValid };
  }
}
