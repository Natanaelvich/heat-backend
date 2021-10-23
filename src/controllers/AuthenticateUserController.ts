import { Request, Response } from 'express';
import { AuthenticateUserService } from '../services/AuthenticateUserService';


class AuthenticateUserController {
  public async handle(request: Request, response: Response) {
    const { code } = request.body;
    const service = new AuthenticateUserService();

    try {
      const result = await service.execute(code);

      return response.json(result);
    } catch (err: any) {
      return response.status(400).json({
        err: err.message,
      })
    }
  }
}

export { AuthenticateUserController }