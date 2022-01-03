import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { NextVal, EntityWithSequence } from 'typeorm-sequence';

@Entity('notes')
export class NotesEntity extends EntityWithSequence {
  @NextVal('notes_id_seq')
  @ApiProperty()
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ApiProperty()
  @Column({ type: 'varchar' })
  title: string;

  @ApiProperty()
  @Column({ type: 'varchar' })
  note: string;

  @ApiProperty()
  @Column({ type: 'timestamp' })
  createdAt: Date;

  @ApiProperty()
  @Column({ type: 'timestamp' })
  updatedAt: Date;
}
