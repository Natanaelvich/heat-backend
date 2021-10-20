import { Request, Response } from 'express';

import { GetLatestMessagesService } from '../services/GetLatestMessagesService';

class GetLatestMessagesController {
  public async handle(request: Request, response: Response) {
    const service = new GetLatestMessagesService();

    try {
      const result = await service.execute();

      return response.json(result);
    } catch (err: any) {
      return response.json({
        err: err.message,
      })
    }
  }
}

export { GetLatestMessagesController }