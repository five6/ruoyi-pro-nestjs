import { Entity, Column } from 'typeorm';
import { Base } from '../common/baseEntity';

@Entity({ name: 'sys_dict_type' })
export class DictType extends Base {
  @Column({ name: 'name', comment: '字典名称', default: '' })
  name: string;

  @Column({ name: 'type', comment: '字典类型', default: '' })
  type: string;

  @Column({ comment: '备注', nullable: true })
  remark: string;
}
