import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieInput } from './dto/create-movie.input';

@Resolver(() => Movie)
export class MoviesResolver {
  constructor(private readonly moviesService: MoviesService) {}
  @Query(() => [Movie], { name: 'movies' })
  findAll(@Args('searchString', { type: () => String }) searchString: string) {
    return this.moviesService.findAll(searchString);
  }
}
