import {
    HttpException,
    HttpStatus,
    Injectable,
    InternalServerErrorException,
  } from '@nestjs/common';
  import { AzLogger } from '../logger/logger.service';
  import { ToolsService } from '../tools/tools.service';
  import { Pagination } from '../../common/result-beans/Pagination';
  import { MinioService } from 'nestjs-minio-client';
  import { ConfigService } from '@nestjs/config';
  import * as hasha from 'hasha';
  import { InjectRepository } from '@nestjs/typeorm';
  import { MongoRepository } from 'typeorm';
  import { File } from '../../entity/file/fileEntity';
  import { ObjectId } from 'mongodb';
  import { DestoryDto } from '../../dto/commonDto';
  import * as _ from 'lodash';
  import { FileConfigPageDto, FileContentPageDto, FilePageDto } from '../../dto/file/FileDto';
import { FileConfig } from 'src/entity/file/fileConfigEntity';
import { FileContent } from 'src/entity/file/fileContentEntity';
  
  @Injectable()
  export class FileContentService {
    constructor(
      private readonly minio: MinioService,
      private logger: AzLogger,
      private readonly toolService: ToolsService,
      private configService: ConfigService,
      @InjectRepository(FileContent)
      public readonly repository: MongoRepository<FileContent>,
    ) {}
  
    async find(dto: FileContentPageDto) {
      const skip = (dto.pageNo - 1) * dto.pageSize;
      const where = { deleted: null } as any;
      if (dto.name) {
        where['name'] = new RegExp(dto.name, 'i');
      }
      if (dto.storage) {
        where['storage'] = dto.storage;
      }
      if (dto.createTime?.length == 2 && dto.createTime[0] && dto.createTime[1]) {
        where['createTime'] = {
          $gte: dto.createTime[0],
          $lte: dto.createTime[1],
        };
      }
      const [dicData, count] = await this.repository.findAndCount({
        where,
        skip: skip,
        take: +dto.pageSize,
      });
      return [dicData, count];
    }
  
    async findOne(id: string) {
      try {
        const result = await this.repository.findOneBy({
          deleted: null,
          _id: new ObjectId(id),
        });
        return result;
      } catch (error) {
        return null;
      }
    }
  
    async delete(id: string) {
      const model = {
        id: new ObjectId(id),
        deleted: new Date(),
      } as DestoryDto;
      return await this.repository.save(model);
    }
  }
  