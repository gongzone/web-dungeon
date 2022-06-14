import { EntityRepository } from '@mikro-orm/postgresql'
import { AuthCredentialsDto } from './dto'
import { User } from './user.entity'
import * as argon from 'argon2'

export class UserRepository extends EntityRepository<User> {
  async createUser(dto: AuthCredentialsDto): Promise<User> {
    const { userId, password, email, nickname } = dto

    // change password to hash
    const hashedPassword = await argon.hash(password)

    // create user instance
    const user = this.create({
      userId,
      password: hashedPassword,
      email,
      nickname,
    })

    // save instance to db
    await this.persistAndFlush(user)

    return user
  }
}
