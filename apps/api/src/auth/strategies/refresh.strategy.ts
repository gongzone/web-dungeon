import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Request } from 'express'

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(protected readonly configService: ConfigService) {
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
    let token = null
    if (req && 'refresh_token' in req.cookies) {
      token = req.cookies['refresh_token']
    }
    return token
  }

  validate(req: Request, payload: any) {
    const refreshToken = req.cookies['refresh_token']
    return {
      ...payload,
      refreshToken,
    }
  }
}
