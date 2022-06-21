import {
  ConflictException,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common'
import { EntityRepository } from '@mikro-orm/postgresql'
import { SignupDto } from './dtos'
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

    try {
      await this.persistAndFlush(user)
    } catch (error) {
      if (error.code === '23505') throw new ConflictException(error.detail)
      else throw new InternalServerErrorException('서버 에러가 발생하였습니다.')
    }
    return user
  }

  async findUserForRefresh({
    userId,
    refreshToken,
  }: {
    userId: number
    refreshToken: string
  }): Promise<User> {
    const user = await this.findOne({
      id: userId,
    })

    if (!user) throw new ForbiddenException('해당 유저를 찾을 수 없습니다.')

    const refreshMatches = await argon.verify(user.refreshToken, refreshToken)

    if (!refreshMatches)
      throw new ForbiddenException('리프레쉬 토큰 정보가 올바르지 않습니다.')

    return user
  }

  async updateRefreshToken({
    userId,
    refreshToken,
  }: {
    userId: number
    refreshToken: string
  }): Promise<void> {
    const hashedRefreshToken = refreshToken
      ? await argon.hash(refreshToken)
      : null

    await this.createQueryBuilder()
      .update({ refreshToken: hashedRefreshToken })
      .where({ id: userId })
  }
}
