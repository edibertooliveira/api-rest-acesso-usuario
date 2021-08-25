import { Request, Response } from 'express';
import { UpdateMovieImageService } from '../services/';

export default class MoviesAvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const userAvatar = new UpdateMovieImageService();
    const user = await userAvatar.execute({
      id: req.params.id,
      imageFilename: req.file?.filename,
    });

    return res.status(200).json(user);
  }
}
