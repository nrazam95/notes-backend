import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Logger,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { from } from 'rxjs';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { NotesService } from '../services/notes.service';

@UseGuards(JwtAuthGuard)
@ApiTags('notes')
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get('')
  getNotes() {
    return this.notesService.getNotes();
  }

  @ApiBearerAuth('access-token')
  @Post('')
  createNote(@Body() notes: any, @Req() req: Request) {
    const title: string = notes.title.toString();
    const note: string = notes.note.toString();
    const username: any = req.query.username;
    Logger.log(`User "${req.query.username}" creating a new task.`);
    return from(this.notesService.createNote(title, note, username));
  }
}
