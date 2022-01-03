import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { from, Observable } from 'rxjs';
import { NotesEntity } from '../models/notes.entity';
import { NotesService } from '../services/notes.service';

@ApiTags('notes')
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get('')
  getNotes() {
    return this.notesService.getNotes();
  }

  @Post('')
  createNote(@Body() notes: any): Observable<NotesEntity> {
    const title: string = notes.title.toString();
    const note: string = notes.note.toString();
    return from(this.notesService.createNote(title, note));
  }
}
