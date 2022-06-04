import { Injectable } from '@nestjs/common';
import keys from 'src/config/keys';
import { CreateMovieInput } from './dto/create-movie.input';
import { Movie } from './entities/movie.entity';
import fetch from 'cross-fetch';

@Injectable()
export class MoviesService {
  async findAll(searchString: string): Promise<Movie[]> {
    const url = `${keys.OMDB_URL}/?apikey=${keys.OMDB_SECRET}&s=${searchString}`;
    console.log(url);
    try {
      const res = await fetch(url);
      const result = await res.json();
      return result.Search;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
