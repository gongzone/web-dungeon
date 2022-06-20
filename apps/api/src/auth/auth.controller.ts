import { Body, Controller, Post, Res, ValidationPipe } from '@nestjs/common'
import { Response } from 'express'
import { AuthService } from './auth.service'
import { SignupDto, SigninDto } from './dtos'

@Controller('auth')
export class AuthController {
  constructor(private authSerivice: AuthService) {}

  @Post('/signup')
  signup(
    @Body(ValidationPipe) dto: SignupDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authSerivice.signup(dto, res)
  }

  @Post('/signin')
  signin(@Body() dto: SigninDto, @Res({ passthrough: true }) res: Response) {
    return this.authSerivice.signin(dto, res)
  }

  // @Post('/logout')
  // logout() {
  //   return this.authSerivice.logout()
  // }
}
