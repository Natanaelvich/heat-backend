import { Request, Response } from 'express';
import { ProfileUserService } from '../services/ProfileUserService';


class ProfileController {
  public async handle(request: Request, response: Response) {
    const service = new ProfileUserService();
    const user_id = request.user_id;

    try {
      const result = await service.execute(user_id);

      return response.json(result);
    } catch (err: any) {
      return response.json({
        err: err.message,
      })
    }
  }
}

export { ProfileController }