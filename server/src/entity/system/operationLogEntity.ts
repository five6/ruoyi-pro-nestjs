import { Entity, Column, ObjectIdColumn, ObjectId } from 'typeorm';
import { Base } from '../common/baseEntity';

@Entity({ name: 'sys_operate_log' })
export class OperationLog extends Base {
  @Column()
  operator: string;

  @Column()
  method: string;

  @Column()
  operation: string;

  @Column()
  entity: string;

  @Column({ name: 'entityId' })
  entityId: string;

  @Column({ name: 'oldEntity' })
  oldEntity: string;

  @Column({ name: 'newEntity' })
  newEntity: string;
}
