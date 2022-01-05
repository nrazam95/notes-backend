import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { PasswordHelper } from '../auth/password/password.helper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './models/users.entity';
import { UsersService } from './services/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  controllers: [UsersController],
  providers: [PasswordHelper, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
