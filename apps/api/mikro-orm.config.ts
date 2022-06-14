import { TsMorphMetadataProvider } from '@mikro-orm/reflection'
import migrationVar from './mikro-orm-var'

export default () => ({
  type: process.env.DB_TYPE || migrationVar.type,
  host: process.env.DB_HOST || migrationVar.host,
  port: process.env.DB_PORT || migrationVar.port,
  user: process.env.DB_USER || migrationVar.user,
  password: process.env.DB_PASSWORD || migrationVar.password,
  dbName: process.env.DB_NAME || migrationVar.name,
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  metadataProvider: TsMorphMetadataProvider,
  migrations: {
    path: 'dist/migrations',
    // pathTs: path.join(__dirname, './migrationsTs'),
    glob: '!(*.d).{js,ts}',
  },
})
