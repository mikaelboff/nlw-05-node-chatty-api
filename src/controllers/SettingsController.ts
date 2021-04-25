import { Request, Response } from "express";
import { SettingsService } from "../services/SettingsService";

export class SettingsController {
  async create(req: Request, res: Response) {
    const { chat, username } = req.body;

    const settingsService = new SettingsService();

    try {
      const settings = await settingsService.create({ chat, username });

      return res.json(settings);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
  }

  async findByUsername(req: Request, res: Response) {
    const { username } = req.params;

    const settingsService = new SettingsService();

    const setting = await settingsService.findByUsername(username);

    return res.json(setting);
  }

  async update(req: Request, res: Response) {
    const { username } = req.params;
    const { chat } = req.body;

    const settingsService = new SettingsService();

    await settingsService.update(username, chat);

    return res.json();
  }
}
