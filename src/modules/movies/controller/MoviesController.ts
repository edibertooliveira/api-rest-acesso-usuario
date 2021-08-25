import { Request, Response } from 'express';
import {
  CreateMovieService,
  DeleteMovieService,
  ListMoviesService,
  ShowMovieService,
  UpdateMovieService,
  VoteMovieService,
  SearchMoviesService,
} from '../services';

interface ISearchMovies {
  director: string;
  author: string;
  genre: string;
}

export default class MoviesController {
  public async index(_req: Request, res: Response): Promise<Response> {
    const listMovies = new ListMoviesService();
    const movies = await listMovies.execute();
    return res.status(200).json(movies);
  }

  public async search(req: Request, res: Response): Promise<Response> {
    const { author, director, genre } = req.query;
    const searchMovies = new SearchMoviesService();
    const movies = await searchMovies.execute({
      director,
      author,
      genre,
    } as ISearchMovies);
    return res.status(200).json({ movies });
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const findMovie = new ShowMovieService();
    const movie = await findMovie.execute({ id });
    return res.status(200).json(movie);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { title, genre, directors, authors, year } = req.body;
    const createMovie = new CreateMovieService();
    const movie = await createMovie.execute({
      title,
      genre,
      directors,
      authors,
      year,
    });
    return res.status(201).json(movie);
  }

  public async vote(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;
    const { movieId, value } = req.body;
    const VoteMovie = new VoteMovieService();
    await VoteMovie.vote({
      userId,
      movieId,
      value,
    });
    return res.status(204).json();
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const deleteMovie = new DeleteMovieService();
    await deleteMovie.execute({ id });
    return res.status(204).json({});
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { title, genre, directors, authors, year } = req.body;
    const updateMovie = new UpdateMovieService();
    const movie = await updateMovie.execute({
      id,
      title,
      genre,
      directors,
      authors,
      year,
    });
    return res.status(200).json(movie);
  }
}
