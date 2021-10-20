import { Request, Response } from 'express';

import { CreateMessageService } from '../services/CreateMessageService';

class CreateMessageController {
  public async handle(request: Request, response: Response) {
    const { message } = request.body;
    const user_id = request.user_id;

    const service = new CreateMessageService();

    try {
      const result = await service.execute(message, user_id);

      return response.json(result);
    } catch (err: any) {
      return response.json({
        err: err.message,
      })
    }
  }
}

export { CreateMessageController }