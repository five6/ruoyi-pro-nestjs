import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AzLogger } from '../../logger/logger.service';
import { ToolsService } from '../../tools/tools.service';
import { RoleService } from '../role/role.service';
import { InjectRepository } from '@nestjs/typeorm';
import { In, InsertResult, Like, MongoRepository, Repository } from 'typeorm';
import { Menu } from '../../../entity/system/menuEntity';
import * as _ from 'lodash';
import { MenuOption } from '../../../common/result-beans/rsp/DeptOption';
import { errors } from '../../../common/constants/error.constants';
import { ObjectId } from 'mongodb';
import { DestoryDto } from '../../../dto/commonDto';
@Injectable()
export class MenuService {
  constructor(
    private logger: AzLogger,
    @InjectRepository(Menu)
    public readonly repository: MongoRepository<Menu>,
    private readonly toolService: ToolsService,
    private readonly roleService: RoleService,
  ) {}

  async getList() {
    return await this.repository.find({
      where: {
        deleted: null,
      },
    });
  }

  async getSimpleList(): Promise<MenuOption[]> {
    const list = await this.repository.find({
      where: {
        deleted: null,
      },
    });
    return _.map(list, (item) => {
      return new MenuOption(item.id, item.name, item.type, item.parentId);
    });
  }
  async getById(id): Promise<Menu> {
    return await this.repository.findOneBy({ _id: new ObjectId(id) });
  }

  async getBygetByIdsAndTypeId({ ids = [], type = 3 }): Promise<Menu[]> {
    return await this.repository.find({
      _id: { $in: _.map(ids, (id) => new ObjectId(id)) },
      type: type,
    });
  }

  async save(model: any): Promise<Menu> {
    if (model.id) {
      model.id = new ObjectId(model.id);
    }
    return await this.repository.save(model);
  }
  async destroy(id: string) {
    const count = await this.repository.countBy({
      where: {
        deleted: null,
        parentId: id,
      },
    });
    // 校验是否有子菜单
    if (count > 0) {
      throw new HttpException(
        errors.MENU_EXISTS_CHILDREN,
        HttpStatus.FORBIDDEN,
      );
    }
    // 当有角色使用菜单
    const exists = await this.roleService.repository.countBy({
      deleted: null,
      menuIds: {
        $elemMatch: { $eq: id },
      },
    });
    if (exists > 0) {
      throw new HttpException(errors.MENU_USED_ERROR, HttpStatus.FORBIDDEN);
    }
    const model = {
      id: new ObjectId(id),
      deleted: new Date(),
    } as DestoryDto;
    return await this.repository.save(model);
  }
}
