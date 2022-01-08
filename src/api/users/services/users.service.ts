import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { from, Observable } from 'rxjs';
import { UsersEntity } from '../models/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  createUser(user: any): Observable<UsersEntity> {
    const userEntity = new UsersEntity();
    userEntity.username = user.username;
    userEntity.password = user.password;
    userEntity.email = user.email;
    userEntity.createdAt = new Date();
    userEntity.updatedAt = new Date();
    return from(this.usersRepository.save(userEntity));
  }

  findByUsername(username: any): Observable<UsersEntity> {
    return from(
      this.usersRepository
        .createQueryBuilder('user')
        .where('user.username = :username', { username })
        .leftJoinAndSelect('user.notes', 'notes')
        .leftJoinAndSelect('user.likedNotes', 'likedNotes')
        .getOne(),
    );
  }
}
