import { Request, Response } from 'express';
import { ResetPasswordService } from '../services';

export default class ResetPasswordController {
  public async update(req: Request, res: Response): Promise<Response> {
    const { password, token } = req.body;
    const resetPasswordService = new ResetPasswordService();
    await resetPasswordService.execute({ password, token });
    return res.status(204).json();
  }
}
