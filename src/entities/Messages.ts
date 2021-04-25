import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Users } from "./Users";

@Entity("messages")
export class Messages {
  @PrimaryColumn()
  id: string;

  @Column({ nullable: true })
  admin_id: string;

  @Column()
  user_id: string;

  @Column()
  text: string;

  @CreateDateColumn()
  created_at: Date;

  @JoinColumn({ name: "user_id" })
  @ManyToOne(() => Users)
  user: Users;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
