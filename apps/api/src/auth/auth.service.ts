import { Injectable } from '@nestjs/common'
import { AuthCredentialsDto } from './dto'
import { UserRepository } from './user.repository'

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async signup(dto: AuthCredentialsDto) {
    const { userId, password, email, nickname } = dto

    const createdUser = await this.userRepository.createUser({
      userId,
      password,
      email,
      nickname,
    })
  }

  // signin() {}

  // logout() {}
}
