import { createParamDecorator, ExecutionContext } from '@nestjs/common';
// import { UsersEntity } from '../../users/models/users.entity';

export const GetUser = createParamDecorator((data, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});
