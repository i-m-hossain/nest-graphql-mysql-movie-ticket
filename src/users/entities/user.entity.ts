import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'user', schema: 'user' })
export class User {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Field()
  @Column()
  email: string;
  @Field()
  @Column()
  username: string;
  @Field()
  @Column()
  password: string;
}
