import { getCustomRepository } from 'typeorm';
import { MoviesRepository } from '../typeorm/repositories/MoviesRepository';
import AppError from '../../../shared/errors/ApiError';
interface IDeleteMovie {
  id: string;
}

export default class DeleteMovieService {
  public async execute({ id }: IDeleteMovie): Promise<void> {
    const moviesRepository = getCustomRepository(MoviesRepository);
    const movieExists = await moviesRepository.findOne(id);

    if (!movieExists) {
      throw new AppError('There is already one movie with this name', 400);
    }

    const movie = await moviesRepository.findOne(id);

    if (!movie) {
      throw new AppError('Movie not found', 404);
    }

    await moviesRepository.remove(movie);
  }
}
