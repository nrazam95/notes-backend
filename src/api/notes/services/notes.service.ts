import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotesEntity } from '../models/notes.entity';
import { DeleteResult, getRepository, Repository } from 'typeorm';
import { from, Observable } from 'rxjs';
import { UsersEntity } from 'src/api/users/models/users.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(NotesEntity)
    private readonly notesRepository: Repository<NotesEntity>,
  ) {}

  getNotes() {
    return 'Notes';
  }

  async createNote(
    title: string,
    note: string,
    username: string,
  ): Promise<Observable<NotesEntity>> {
    const userInfo = getRepository(UsersEntity).findOne({ username });

    const noteEntity = new NotesEntity();
    noteEntity.title = title;
    noteEntity.note = note;
    noteEntity.user_id = (await userInfo).id;
    noteEntity.createdAt = new Date();
    noteEntity.updatedAt = new Date();
    return from(this.notesRepository.save(noteEntity));
  }

  deleteNote(id: number): Observable<DeleteResult> {
    return from(this.notesRepository.delete(id));
  }
}
