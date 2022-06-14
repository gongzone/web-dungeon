import { Body, Controller, Post, Res, ValidationPipe } from '@nestjs/common'
import { Response } from 'express'
import { AuthService } from './auth.service'
import { AuthCredentialsDto } from './dtos'

@Controller('auth')
export class AuthController {
  constructor(private authSerivice: AuthService) {}

  @Post('/signup')
  signup(
    @Body(ValidationPipe) dto: AuthCredentialsDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authSerivice.signup(dto, res)
  }

  // @Post('/signin')
  // signin() {
  //   return this.authSerivice.signin()
  // }

  // @Post('/logout')
  // logout() {
  //   return this.authSerivice.logout()
  // }
}
