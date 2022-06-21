import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common'
import { Response } from 'express'
import { GetUser } from 'src/common/decorators'
import { AccessTokenGuard, RefreshTokenGuard } from 'src/common/guards'
import { AuthService } from './auth.service'
import { SignupDto, SigninDto } from './dtos'
import { User } from './user.entity'

@Controller('auth')
export class AuthController {
  constructor(private authSerivice: AuthService) {}

  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  signup(
    @Body(ValidationPipe) dto: SignupDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authSerivice.signup(dto, res)
  }

  @Post('/signin')
  @HttpCode(HttpStatus.OK)
  signin(@Body() dto: SigninDto, @Res({ passthrough: true }) res: Response) {
    return this.authSerivice.signin(dto, res)
  }

  @Post('/logout')
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  logout(@GetUser() user: User) {
    const { id } = user
    return this.authSerivice.logout(id)
  }

  @Post('/refresh')
  @UseGuards(RefreshTokenGuard)
  @HttpCode(HttpStatus.OK)
  silentRefresh(
    @GetUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authSerivice.silentRefresh(user, res)
  }
}
