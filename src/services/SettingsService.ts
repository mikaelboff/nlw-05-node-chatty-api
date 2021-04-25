import { getCustomRepository } from "typeorm";
import { SettingsRepository } from "../repositories/SettingsRepository";

interface SettingsCreateDTO {
  chat: boolean;
  username: string;
}

export class SettingsService {
  private settingsRepository: SettingsRepository;

  constructor() {
    this.settingsRepository = getCustomRepository(SettingsRepository);
  }

  async create({ chat, username }: SettingsCreateDTO) {
    const userAlreadyExists = await this.settingsRepository.findOne({
      username
    });

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    const settings = this.settingsRepository.create({ chat, username });

    await this.settingsRepository.save(settings);

    return settings;
  }
}
