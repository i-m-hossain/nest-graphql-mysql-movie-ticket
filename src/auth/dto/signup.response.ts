import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class SignupResponse {
  @Field()
  access_token: string;
  @Field()
  user: User;
}
