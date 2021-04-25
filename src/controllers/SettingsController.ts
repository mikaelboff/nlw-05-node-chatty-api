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
}
