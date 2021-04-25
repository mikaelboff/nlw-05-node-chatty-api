import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Users } from "./Users";

@Entity("connections")
export class Connections {
  @PrimaryColumn()
  id: string;

  @Column({ nullable: true })
  admin_id: string;

  @Column()
  user_id: string;

  @Column()
  socket_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @JoinColumn({ name: "user_id" })
  @ManyToOne(() => Users)
  user: Users;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
