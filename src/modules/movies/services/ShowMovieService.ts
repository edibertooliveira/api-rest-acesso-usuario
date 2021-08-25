import { getCustomRepository } from 'typeorm';
import { MoviesRepository } from '../typeorm/repositories/MoviesRepository';
import Movie from '../typeorm/entities/Movie';
import AppError from '../../../shared/errors/ApiError';

interface IShowMovie {
  id: string;
}
export default class ShowMovieService {
  public async execute({ id }: IShowMovie): Promise<Movie | undefined> {
    const moviesRepository = getCustomRepository(MoviesRepository);
    const movie = await moviesRepository.findOne(id);

    if (!movie) {
      throw new AppError('Movie not found', 404);
    }

    return movie;
  }
}
