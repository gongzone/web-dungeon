import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Response } from 'express'
import { ITokenPayload } from './interfaces'

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  sendCookiewithRefreshToken({
    refreshToken,
    res,
  }: {
    refreshToken: string
    res: Response
  }): void {
    res.cookie('auth-cookie', refreshToken, { httpOnly: true, secure: true })
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
        sub: userId,
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
        sub: userId,
        username,
      },
      {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: 60 * 60 * 24 * 7,
      },
    )

    return RefreshToken
  }
}
