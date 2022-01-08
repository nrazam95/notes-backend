import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  ParseIntPipe,
  Param,
} from '@nestjs/common';
// import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { from } from 'rxjs';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { NotesService } from '../services/notes.service';
// import { UserIsUserGuard } from 'src/api/auth/strategies/UserIsUser.guard';
import { GetUser } from 'src/api/auth/strategies/get-user.decorator';

@ApiTags('notes')
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @UseGuards(JwtAuthGuard)
  @Get('')
  getNotes(@GetUser() user: any) {
    const username: any = user.username;
    return this.notesService.getNotes(username);
  }

  @UseGuards(JwtAuthGuard)
  @Post('')
  createNote(@Body() notes: any, @GetUser() user: any) {
    const title: string = notes.title.toString();
    const note: string = notes.note.toString();
    const username: any = user.username;
    return from(this.notesService.createNote(title, note, username));
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/like')
  likeNote(@GetUser() user: any, @Param('id', ParseIntPipe) id: number) {
    const username: any = user.username;
    return this.notesService.likeNote(id, username);
  }
}
