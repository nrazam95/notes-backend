import { ApiProperty } from '@nestjs/swagger';
import { UsersEntity } from 'src/api/users/models/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
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

  @ApiProperty()
  @Column({ nullable: true })
  user_id: number;

  @ManyToOne(() => UsersEntity, (user) => user.notes, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: UsersEntity;

  @ManyToMany(() => UsersEntity, (user) => user.likedNotes, {
    eager: true,
  })
  @JoinColumn({ name: 'user_id' })
  likedUsers: UsersEntity[];
}
