import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Request } from 'express'
import { UserRepository } from '../user.repository'
import { TokenService } from '../token.service'
import { ITokenPayload } from '../interfaces'
import { User } from '../user.entity'

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService,
    protected readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        RefreshStrategy.cookieExtractor,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      passReqToCallback: true,
      secretOrKey: configService.get<string>('JWT_REFRESH_SECRET'),
    })
  }

  private static cookieExtractor(req: Request) {
    let refreshToken = null
    if (req && 'auth-cookie' in req.cookies) {
      refreshToken = req.cookies['auth-cookie']
    }
    return refreshToken
  }

  async validate(req: Request, payload: ITokenPayload | null) {
    const refreshToken = req.cookies['auth-cookie']
    const { userId } = payload

    const user: User = await this.userRepository.findOne({ id: userId })

    if (!user) throw new UnauthorizedException('해당 유저를 찾을 수 없습니다.')

    await this.tokenService.verifyToken(user.refreshToken, refreshToken)

    return user
  }
}
