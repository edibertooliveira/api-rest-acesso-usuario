import AppError from '../../../shared/errors/ApiError';
import { getCustomRepository } from 'typeorm';
import { MoviesRepository } from '../typeorm/repositories/MoviesRepository';
import Movie from '../typeorm/entities/Movie';

interface ICreateMovie {
  title: string;
  genre: string;
  directors: string;
  authors: string;
  year: number;
}

export default class CreateMovieService {
  public async execute({
    title,
    genre,
    directors,
    authors,
    year,
  }: ICreateMovie): Promise<Movie> {
    const moviesRepository = getCustomRepository(MoviesRepository);
    const movieExists = await moviesRepository.findByName(title);

    if (movieExists) {
      throw new AppError('There is already one movie with this name', 400);
    }

    const movie = moviesRepository.create({
      title,
      genre,
      directors,
      authors,
      year,
    });

    await moviesRepository.save(movie);
    return movie;
  }
}
