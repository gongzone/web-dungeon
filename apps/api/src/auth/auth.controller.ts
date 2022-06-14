import { Body, Controller, Post, ValidationPipe } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthCredentialsDto } from './dto'

@Controller('auth')
export class AuthController {
  constructor(private authSerivice: AuthService) {}

  @Post('/local/signup')
  signup(@Body(ValidationPipe) dto: AuthCredentialsDto) {
    return this.authSerivice.signup(dto)
  }

  // @Post('/local/signin')
  // signin() {
  //   return this.authSerivice.signin()
  // }

  // @Post('/logout')
  // logout() {
  //   return this.authSerivice.logout()
  // }
}
