import { prismaClient } from '../prisma';
import { io } from '../app';

class CreateMessageService {
  public async execute(text: string, user_id: string) {
    const message = await prismaClient.message.create({
      data: {
        text,
        user_id
      },
      include: {
        user: true
      }
    });

    const infoWS = {
      id: message.id,
      text: message.text,
      user_id: message.id,
      created_at: message.created_at,
      user: {
        id: message.user.id,
        name: message.user.name,
        avatar_url: message.user.avatar_url
      }
    };

    io.emit("new_messages", infoWS);

    return message;
  }
}

export { CreateMessageService }