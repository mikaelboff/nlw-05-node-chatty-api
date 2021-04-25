import { EntityRepository, Repository } from "typeorm";
import { Connections } from "../entities/Connections";

@EntityRepository(Connections)
export class ConnectionsRepository extends Repository<Connections> {}
