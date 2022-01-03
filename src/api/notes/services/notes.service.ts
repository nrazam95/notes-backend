import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotesEntity } from '../models/notes.entity';
import { Repository } from 'typeorm';
import { from, Observable } from 'rxjs';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(NotesEntity)
    private readonly notesRepository: Repository<NotesEntity>,
  ) {}

  getNotes() {
    return 'Notes';
  }

  createNote(title: string, note: string): Observable<NotesEntity> {
    const noteEntity = new NotesEntity();
    noteEntity.title = title;
    noteEntity.note = note;
    noteEntity.createdAt = new Date();
    noteEntity.updatedAt = new Date();
    return from(this.notesRepository.save(noteEntity));
  }
}
