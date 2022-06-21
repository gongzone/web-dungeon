import { Injectable, UnauthorizedException } from '@nestjs/common'
import { Response } from 'express'
import { SignupDto, SigninDto } from './dtos'
import { TokenService } from './token.service'
import { UserRepository } from './user.repository'
import * as argon from 'argon2'
import { User } from './user.entity'

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService,
  ) {}

  async signup(dto: SignupDto, res: Response): Promise<{ token: string }> {
    const createdUser = await this.userRepository.createUser(dto)

    const tokens = await this.tokenService.generateAllToken({
      userId: createdUser.id,
      username: createdUser.username,
    })

    await this.userRepository.updateRefreshToken({
      userId: createdUser.id,
      refreshToken: tokens.refreshToken,
    })

    this.tokenService.setAuthCookie(tokens.refreshToken, res)

    return { token: tokens.accessToken }
  }

  async signin(dto: SigninDto, res: Response): Promise<{ token: string }> {
    const { username, password } = dto
    const user = await this.userRepository.findOne({ username })

    if (!user)
      throw new UnauthorizedException('사용자 아이디를 찾을 수 없습니다.')

    const passwordMatches = await argon.verify(user.password, password)

    if (!passwordMatches)
      throw new UnauthorizedException('사용자 비밀번호가 잘못되었습니다.')

    const tokens = await this.tokenService.generateAllToken({
      userId: user.id,
      username: user.username,
    })

    await this.userRepository.updateRefreshToken({
      userId: user.id,
      refreshToken: tokens.refreshToken,
    })

    this.tokenService.setAuthCookie(tokens.refreshToken, res)

    return { token: tokens.accessToken }
  }

  async logout(userId: number): Promise<{ message: string }> {
    await this.userRepository.updateRefreshToken({
      userId,
      refreshToken: null,
    })

    return { message: '로그아웃이 성공적으로 이루어졌습니다.' }
  }

  async silentRefresh(user: User, res: Response): Promise<{ token: string }> {
    const tokens = await this.tokenService.generateAllToken({
      userId: user.id,
      username: user.username,
    })

    await this.userRepository.updateRefreshToken({
      userId: user.id,
      refreshToken: tokens.refreshToken,
    })

    this.tokenService.setAuthCookie(tokens.refreshToken, res)

    return { token: tokens.accessToken }
  }
}
