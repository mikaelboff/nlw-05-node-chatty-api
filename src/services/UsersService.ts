import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";

export class UsersService {
  private usersRepository: UsersRepository;

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepository);
  }

  async create(email: string) {
    let user = await this.usersRepository.findOne({ email });

    if (user) {
      return user;
    }

    user = this.usersRepository.create({ email });

    await this.usersRepository.save(user);

    return user;
  }
}
