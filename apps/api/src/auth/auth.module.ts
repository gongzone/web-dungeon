import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { AccessStrategy, RefreshStrategy } from './strategies'
import { TokenService } from './token.service'
import { User } from './user.entity'

@Module({
  imports: [MikroOrmModule.forFeature([User]), JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, TokenService, AccessStrategy, RefreshStrategy],
})
export class AuthModule {}
