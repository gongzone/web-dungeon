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

@Entity({ tableName: 'users', customRepository: () => UserRepository })
@Unique({ properties: ['username', 'email', 'nickname'] })
export class User {
  [EntityRepositoryType]?: UserRepository

  @PrimaryKey()
  id!: number

  @Property()
  username!: string

  @Property({ hidden: true })
  password!: string

  @Property()
  email!: string

  @Property()
  nickname!: string

  @Enum({ items: () => UserRole, default: UserRole.USER })
  role!: UserRole

  @Property({ hidden: true })
  refreshToken?: string

  @Property()
  createdAt: Date = new Date()

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date()
}
