import { createParamDecorator } from '@nestjs/common';
import { UsersEntity } from '../../users/models/users.entity';

export const GetUser = createParamDecorator((data, req): UsersEntity => {
  return req.user;
});
