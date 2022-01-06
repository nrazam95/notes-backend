import { ApiProperty } from '@nestjs/swagger';
import { NotesEntity } from 'src/api/notes/models/notes.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EntityWithSequence, NextVal } from 'typeorm-sequence';

@Entity('users')
export class UsersEntity extends EntityWithSequence {
  @NextVal('users_id_seq')
  @PrimaryGeneratedColumn({ name: 'id' })
  @PrimaryColumn({ name: 'id', type: 'integer', nullable: false })
  id: number;

  @ApiProperty()
  @Column({ name: 'user_name', type: 'varchar', length: 255, nullable: false })
  username: string;

  @ApiProperty()
  @Column({ name: 'name', type: 'varchar', length: 255, nullable: true })
  name: string;

  @ApiProperty()
  @Column({ name: 'email', type: 'varchar', length: 255 })
  email: string;

  @ApiProperty()
  @Column({ name: 'password', type: 'varchar', nullable: false })
  password: string;

  @ApiProperty()
  @Column({ name: 'created_at', type: 'timestamp', nullable: false })
  createdAt: Date;

  @ApiProperty()
  @Column({ name: 'updated_at', type: 'timestamp', nullable: false })
  updatedAt: Date;

  @OneToMany(() => NotesEntity, (note) => note.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  notes: NotesEntity[];
}
