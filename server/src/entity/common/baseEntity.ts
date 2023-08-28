import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

export abstract class Base {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'tinyint', default: '1' })
  status: number;

  @CreateDateColumn({
    name: 'create_time',
    type: 'datetime',
  })
  createTime: Date;

  @UpdateDateColumn({ name: 'update_time', type: 'timestamp' })
  updateTime: Date;

  @Column({ name: 'creator', nullable: true })
  creator: string;

  @Column({ name: 'updater', nullable: true })
  updater: string;

  @DeleteDateColumn({ name: 'deleted', type: 'timestamp', default: null })
  deleted: Date;

  @Column({ name: 'tenant_id', default: 1 })
  tenantId: number;
}
