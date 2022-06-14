import { EntityRepository } from '@mikro-orm/postgresql'
import { AuthCredentialsDto } from './dtos'
import { User } from './user.entity'
import * as argon from 'argon2'

export class UserRepository extends EntityRepository<User> {
  async createUser(dto: AuthCredentialsDto): Promise<User> {
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
