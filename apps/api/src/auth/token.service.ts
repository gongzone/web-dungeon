import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Response } from 'express'
import { ITokenPayload } from './interfaces'
import * as argon from 'argon2'

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  setAuthCookie(refreshToken: string, res: Response): void {
    const secureOption = process.env.NODE_ENV == 'production' ? true : false
    res.cookie('auth-cookie', refreshToken, {
      httpOnly: true,
      secure: secureOption,
    })
  }

  async verifyToken(hashed: string, notHashed: string) {
    const refreshMatches = await argon.verify(hashed, notHashed)

    if (!refreshMatches)
      throw new UnauthorizedException('리프레쉬 토큰 정보가 올바르지 않습니다.')
  }

  async generateAllToken({
    userId,
    username,
  }: ITokenPayload): Promise<{ accessToken: string; refreshToken: string }> {
    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken({ userId, username }),
      this.generateRefreshToken({ userId, username }),
    ])

    return { accessToken, refreshToken }
  }

  async generateAccessToken({
    userId,
    username,
  }: ITokenPayload): Promise<string> {
    const accessToken = this.jwtService.signAsync(
      {
        userId,
        username,
      },
      {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: 60 * 15,
      },
    )

    return accessToken
  }

  async generateRefreshToken({
    userId,
    username,
  }: ITokenPayload): Promise<string> {
    const RefreshToken = this.jwtService.signAsync(
      {
        userId,
        username,
      },
      {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: 60 * 60 * 24 * 7,
      },
    )

    return RefreshToken
  }
}
