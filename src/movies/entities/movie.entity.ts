import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Movie {
  @Field()
  Title: string;
  @Field()
  Year: string;
  @Field()
  imdbID: string;
  @Field()
  Type: string;
  @Field()
  Poster: string;
}
