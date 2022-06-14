import { Injectable } from '@nestjs/common'
import { Response } from 'express'
import { AuthCredentialsDto } from './dtos'
import { TokenService } from './token.service'
import { UserRepository } from './user.repository'

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService,
  ) {}

  async signup(dto: AuthCredentialsDto, res: Response) {
    const { username, password, email, nickname } = dto

    // 유저 생성
    const createdUser = await this.userRepository.createUser({
      username,
      password,
      email,
      nickname,
    })

    // 토큰 생성
    const { accessToken, refreshToken } =
      await this.tokenService.generateAllToken({
        userId: createdUser.id,
        username: createdUser.username,
      })

    // refresh 토큰, 유저 db에 업데이트
    await this.userRepository.updateRefreshToken({
      userId: createdUser.id,
      refreshToken,
    })

    // refresh 토큰, 쿠키에 담아서 클라이언트 측으로 전달
    this.tokenService.sendCookiewithRefreshToken({ refreshToken, res })

    // access 토큰, JSON payload로 전달
    return { token: accessToken }
  }

  // signin() {}

  // logout() {}
}
