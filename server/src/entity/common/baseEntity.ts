import {
  ObjectId,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { CommonStatusEnum } from '../../Enum/Global';

export abstract class Base {
  @ObjectIdColumn()
  id: ObjectId;

  @Column({ default: CommonStatusEnum.ENABLE })
  status: number;

  @CreateDateColumn({
    name: 'createTime',
  })
  createTime: Date;

  @UpdateDateColumn({ name: 'updateTime' })
  updateTime: Date;

  @Column({ name: 'creator', nullable: true })
  creator: string;

  @Column({ name: 'updater', nullable: true })
  updater: string;

  @Column({ name: 'deleted', default: null })
  deleted: Date;
}
