import {
  Entity,
  EntityRepositoryType,
  Enum,
  PrimaryKey,
  Property,
} from '@mikro-orm/core'
import { UserRepository } from './user.repository'

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity({ tableName: 'users', customRepository: () => UserRepository })
export class User {
  [EntityRepositoryType]?: UserRepository

  @PrimaryKey()
  id!: number

  @Property({ unique: true })
  username!: string

  @Property({ hidden: true })
  password!: string

  @Property({ unique: true })
  email!: string

  @Property({ unique: true })
  nickname!: string

  @Enum({ items: () => UserRole, default: UserRole.USER })
  role!: UserRole

  @Property({ unique: true, hidden: true, default: null })
  refreshToken?: string

  @Property()
  createdAt: Date = new Date()

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date()
}
