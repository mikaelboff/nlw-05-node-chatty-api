import { getCustomRepository } from "typeorm";
import { MessagesRepository } from "../repositories/MessagesRepository";

interface MessagesCreateDTO {
  admin_id?: string;
  text: string;
  user_id: string;
}

export class MessagesService {
  private messagesRepository: MessagesRepository;

  constructor() {
    this.messagesRepository = getCustomRepository(MessagesRepository);
  }

  async create({ admin_id, text, user_id }: MessagesCreateDTO) {
    const message = this.messagesRepository.create({
      admin_id,
      text,
      user_id
    });

    await this.messagesRepository.save(message);

    return message;
  }

  async listByUser(user_id: string) {
    const list = await this.messagesRepository.find({
      where: { user_id },
      relations: ["user"]
    });

    return list;
  }
}
