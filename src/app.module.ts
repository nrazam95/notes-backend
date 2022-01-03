import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import NotesBundle from './api/notes.bundle';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345',
      database: 'notes_backend',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ...NotesBundle,
  ],
})
export class AppModule {}
