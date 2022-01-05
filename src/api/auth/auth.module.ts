import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from '../users/models/users.entity';
import { UsersService } from '../users/services/users.service';
import { AuthController } from './controllers/auth.controller';
import { PasswordHelper } from './password/password.helper';
import { AuthService } from './services/auth.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        signOptions: {
          expiresIn: 3600,
        },
        secret: configService.get<string>('JWT_SECRET'),
      }),
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([UsersEntity]),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, PasswordHelper],
  exports: [],
})
export class AuthModule {}
