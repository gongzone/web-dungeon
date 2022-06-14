import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { MikroOrmModule } from '@mikro-orm/nestjs'

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV == 'development' ? '.env.dev' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      isGlobal: true,
    }),
    MikroOrmModule.forRoot(),
  ],
})
export class AppModule {}
