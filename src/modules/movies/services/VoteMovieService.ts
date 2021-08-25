import { getCustomRepository } from 'typeorm';
import { MovieRatingsRepository } from '@modules/movies/typeorm/repositories/MovieRatingsRepository';

interface IVoteMovie {
  userId: string;
  movieId: string;
  value: number;
}
export default class VoteMovieService {
  public async vote({ userId, movieId, value }: IVoteMovie): Promise<void> {
    const movieRatingsRepository = getCustomRepository(MovieRatingsRepository);

    const existsVote = await movieRatingsRepository.findOne({
      where: {
        userId,
        movieId,
      },
    });

    if (!existsVote) {
      const newVoteMovie = movieRatingsRepository.create({
        userId,
        movieId,
        value,
      });

      await movieRatingsRepository.save(newVoteMovie);
    } else {
      existsVote.value = value;
      await movieRatingsRepository.save(existsVote);
    }

    await movieRatingsRepository.queryRunner?.query(
      `UPDATE movies SET rating = (
            SELECT ROUND(AVG(value),1) FROM ratings WHERE ratings.movie_id = ${movieId}
        ) WHERE movies.id = ${movieId}`,
    );
  }
}
