import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import Channel from "./Channel";

@Entity()
class Message extends BaseEntity {
  @PrimaryGeneratedColumn() // mariaDB의 auto_increment와 유사한 역할, Primary Key로 사용.
  id: number;

  @Column({ type: "text", nullable: false }) // column을 가리키며 해당 column의 스키마 타입과 null값 허용 여부 명시
  nickname: string;

  @Column({ type: "text", nullable: false })
  content: String;

  // 본인과 대상의 관계가 N : 1 임을 표현할 때 사용되는 어노테이션
  @ManyToOne(type => Channel, Channel => Channel.message)
  innerChannel: Channel;

  @Column({ type: "text", nullable: false })
  innerChannelId: number;

  @CreateDateColumn() createdAt: string;

  @UpdateDateColumn() updatedAt: string;
}

export default Message;
