import { IsNull, getCustomRepository } from "typeorm";
import { Connections } from "../entities/Connections";
import { ConnectionsRepository } from "../repositories/ConnectionsRepository";

interface ConnectionsCreateDTO {
  socket_id: string;
  user_id: string;
  admin_id?: string;
  id?: string;
}

export class ConnectionsService {
  private connectionsRepository: ConnectionsRepository;

  constructor() {
    this.connectionsRepository = getCustomRepository(ConnectionsRepository);
  }

  async create({ admin_id, user_id, socket_id, id }: ConnectionsCreateDTO) {
    let connection = await this.connectionsRepository.findOne({
      user_id
    });

    if (connection) {
      connection.socket_id = socket_id;
    } else {
      connection = this.connectionsRepository.create({
        admin_id,
        user_id,
        socket_id,
        id
      });
    }

    await this.connectionsRepository.save(connection);

    return connection;
  }

  async listByUser(user_id: string) {
    const list = await this.connectionsRepository.find({
      where: { user_id },
      relations: ["user"]
    });

    return list;
  }

  async findByUserId(user_id: string) {
    return await this.connectionsRepository.findOne({
      user_id
    });
  }

  async listWithoutAdmin() {
    return await this.connectionsRepository.find({
      where: { admin_id: null },
      relations: ["user"]
    });
  }

  async findBySocketId(socket_id: string) {
    return await this.connectionsRepository.findOne({
      where: { socket_id }
    });
  }

  async updateAdminId(user_id: string, admin_id: string) {
    await this.connectionsRepository
      .createQueryBuilder()
      .update(Connections)
      .set({ admin_id })
      .where("user_id= :user_id", { user_id })
      .execute();
  }
}
