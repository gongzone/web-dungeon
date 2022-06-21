import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { ITokenPayload } from '../interfaces'
import { User } from '../user.entity'
import { UserRepository } from '../user.repository'

@Injectable()
export class AccessStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly userRepository: UserRepository,
    protected readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_ACCESS_SECRET'),
    })
  }

  async validate(payload: ITokenPayload): Promise<User> {
    const { userId } = payload
    const user: User = await this.userRepository.findOne({ id: userId })

    if (!user) throw new UnauthorizedException('해당 유저를 찾을 수 없습니다.')

    return user
  }
}
