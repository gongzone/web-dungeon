import {
  Entity,
  EntityRepositoryType,
  Enum,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core'
import { UserRepository } from './user.repository'

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity({ customRepository: () => UserRepository })
@Unique({ properties: ['userId', 'email', 'nickname'] })
export class User {
  [EntityRepositoryType]?: UserRepository

  @PrimaryKey()
  id!: number

  @Property()
  userId!: string

  @Property()
  password!: string

  @Property()
  email!: string

  @Property()
  nickname!: string

  @Enum({ items: () => UserRole, default: UserRole.USER })
  role!: UserRole

  @Property()
  createdAt: Date = new Date()

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date()
}
