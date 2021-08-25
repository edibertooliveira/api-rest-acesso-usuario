import path from 'path';
import fs from 'fs';
import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/ApiError';
import { MoviesRepository } from '../typeorm/repositories/MoviesRepository';
import Movie from '../typeorm/entities/Movie';
import uploadConfig from '../../../config/upload';

interface IRequest {
  id: string;
  imageFilename?: string;
}

export default class UpdateMovieImageService {
  public async execute({ id, imageFilename }: IRequest): Promise<Movie> {
    const moviesRepository = getCustomRepository(MoviesRepository);
    const movie = await moviesRepository.findOne(id);
    if (!movie) {
      throw new AppError('movie not found', 404);
    }
    if (movie.image) {
      const movieImageFilePath = path.join(uploadConfig.directory, movie.image);
      const movieImageFileExists = await fs.promises.stat(movieImageFilePath);
      if (movieImageFileExists) {
        await fs.promises.unlink(movieImageFilePath);
      }
    }

    movie.image = imageFilename || '';
    await moviesRepository.update(id, movie);
    return movie;
  }
}
