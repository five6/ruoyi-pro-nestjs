import { Entity, Column } from 'typeorm';
import { Base } from '../common/baseEntity';

@Entity({ name: 'sys_dict_data' })
export class DictData extends Base {
  @Column({ name: 'sort', comment: '字典排序', default: 0 })
  sort: number;

  @Column({ name: 'label', comment: '字典标签' })
  label: string;

  @Column({ name: 'value', comment: '字典键值' })
  value: string;

  @Column({
    name: 'dictType',
    comment: '字典类型',
    default: '',
  })
  dictType: string;

  @Column({
    name: 'colorType',
    comment: '颜色类型',
    default: '',
  })
  colorType: string;

  @Column({
    name: 'cssClass',
    comment: 'css 样式',
    default: '',
  })
  cssClass: string;

  @Column({ comment: '备注', nullable: true })
  remark: string;
}
