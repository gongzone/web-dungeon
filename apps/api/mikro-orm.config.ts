import { TsMorphMetadataProvider } from '@mikro-orm/reflection'

export default {
  type: 'postgresql',
  host: 'localhost',
  port: 5432,
  user: 'dnjsqhwo',
  password: 'self0922',
  dbName: 'webdungeon',
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  metadataProvider: TsMorphMetadataProvider,
  migrations: {
    path: 'dist/migrations',
    // pathTs: path.join(__dirname, './migrationsTs'),
    glob: '!(*.d).{js,ts}',
  },
}
