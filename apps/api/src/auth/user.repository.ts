import { ForbiddenException } from '@nestjs/common'
import { EntityRepository } from '@mikro-orm/postgresql'
import { SignupDto, SigninDto } from './dtos'
import { User } from './user.entity'
import * as argon from 'argon2'

export class UserRepository extends EntityRepository<User> {
  async createUser(dto: SignupDto): Promise<User> {
    const { username, password, email, nickname } = dto

    const hashedPassword = await argon.hash(password)

    const user = this.create({
      username,
      password: hashedPassword,
      email,
      nickname,
    })

    await this.persistAndFlush(user)

    return user
  }

  async findUser(dto: SigninDto): Promise<User> {
    const user = await this.findOne({
      username: dto.username,
    })

    if (!user) throw new ForbiddenException('사용자 아이디를 찾을 수 없습니다.')

    const passwordMatches = await argon.verify(user.password, dto.password)

    if (!passwordMatches)
      throw new ForbiddenException('사용자 비밀번호가 잘못되었습니다.')

    return user
  }

  async updateRefreshToken({
    userId,
    refreshToken,
  }: {
    userId: number
    refreshToken: string
  }): Promise<void> {
    const hashedRefreshToken = await argon.hash(refreshToken)

    await this.createQueryBuilder()
      .update({ refreshToken: hashedRefreshToken })
      .where({ id: userId })
  }
}
