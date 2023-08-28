import { Entity, Column } from 'typeorm';
import { Base } from '../common/baseEntity';

@Entity({ name: 'sys_operate_log' })
export class OperationLog extends Base {
  @Column()
  operator: number;

  @Column()
  method: string;

  @Column()
  operation: string;

  @Column()
  entity: string;

  @Column({ name: 'entity_id' })
  entityId: string;

  @Column({ name: 'old_entity' })
  oldEntity: string;

  @Column({ name: 'new_entity' })
  newEntity: string;
}
