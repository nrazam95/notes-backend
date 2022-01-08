import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesController } from './controllers/notes.controller';
import { NotesService } from './services/notes.service';
import { NotesEntity } from './models/notes.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([NotesEntity])],
  controllers: [NotesController],
  providers: [NotesService],
  exports: [],
})
export class NotesModule {}
