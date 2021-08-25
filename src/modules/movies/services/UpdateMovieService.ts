import { getCustomRepository } from 'typeorm';
import { MoviesRepository } from '../typeorm/repositories/MoviesRepository';
import Movie from '../typeorm/entities/Movie';
import AppError from '../../../shared/errors/ApiError';

interface IUpdateMovie {
  id: string;
  title: string;
  genre: string;
  directors: string;
  authors: string;
  year: number;
}
export default class UpdateMovieService {
  public async execute({
    id,
    title,
    genre,
    directors,
    authors,
    year,
  }: IUpdateMovie): Promise<Movie> {
    const moviesRepository = getCustomRepository(MoviesRepository);
    const movieExists = await moviesRepository.findByName(title);
    const movie = await moviesRepository.findOne(id);

    if (movieExists && movie?.id !== id) {
      throw new AppError('There is already one movie with this name', 400);
    }

    if (!movie) {
      throw new AppError('Movie not found', 404);
    }

    movie.title = title;
    movie.genre = genre;
    movie.directors = directors;
    movie.authors = authors;
    movie.year = year;

    await moviesRepository.update(id, movie);

    return movie;
  }
}
