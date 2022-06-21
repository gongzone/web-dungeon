import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { AccessStrategy, RefreshStrategy } from './strategies'
import { TokenService } from './token.service'
import { User } from './user.entity'

@Module({
  imports: [
    MikroOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [AuthService, TokenService, AccessStrategy, RefreshStrategy],
  exports: [AccessStrategy],
})
export class AuthModule {}
