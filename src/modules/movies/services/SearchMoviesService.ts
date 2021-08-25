import { getManager } from 'typeorm';
import Movie from '../typeorm/entities/Movie';

interface ISearchMovies {
  director: string;
  author: string;
  genre: string;
}

export default class SearchMoviesService {
  public async execute({
    director,
    author,
    genre,
  }: ISearchMovies): Promise<Movie> {
    const entityManager = getManager();
    return await entityManager.query(
      `
      SELECT *, (SELECT ROUND(AVG(r.value)) as rating from ratings as r where r.movie_id = m.id) as rating FROM movies as m
      where m.authors like '${author}%' and m.directors like '${director}%' and m.genre like '${genre}%'
    `,
    );
  }
}
