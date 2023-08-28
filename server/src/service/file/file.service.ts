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
import { FilePageDto } from 'src/dto/file/FileDto';

@Injectable()
export class FileService {
  private readonly baseBucket = this.configService.get('MINIO_BUCKET');
  private readonly FILE_PREFIX = 'zzz/';
  public get client() {
    return this.minio.client;
  }

  constructor(
    private readonly minio: MinioService,
    private logger: AzLogger,
    private readonly toolService: ToolsService,
    private configService: ConfigService,
    @InjectRepository(File)
    public readonly repository: MongoRepository<File>,
  ) {}

  async find(dto: FilePageDto) {
    const skip = (dto.pageNo - 1) * dto.pageSize;
    const where = { deleted: null } as any;
    if (dto.path) {
      where['path'] = dto.path;
    }
    if (dto.type) {
      where['label'] = dto.type;
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

  async updateStatus(json: any) {}

  async upload(file) {
    if (!file) {
      throw new HttpException('请上传文件', HttpStatus.BAD_REQUEST);
    }
    const hashedFileName = hasha(file.buffer, { algorithm: 'md5' });
    const ext = file.originalname.substring(
      file.originalname.lastIndexOf('.'),
      file.originalname.length,
    );

    // 当md5值已存在的时候，返回数据库文件信息
    const dbFile = await this.repository.findOneBy({ md5: hashedFileName });
    if (dbFile) return { url: dbFile.url };
    const filename = hashedFileName + ext;
    const fileName = `${this.FILE_PREFIX}${filename}`;
    const fileBuffer = file.buffer;
    const ret = await this.client.putObject(
      `${this.baseBucket}`,
      fileName,
      fileBuffer,
    );
    if (ret) {
      const url = `${this.configService.get(
        'MINIO_ENDPOINT_HOST',
      )}/${fileName}`;
      // 保存基本信息到数据库
      await this.repository.save({
        name: file.originalname,
        path: url,
        url: url,
        type: file.mimetype,
        size: file.size,
        md5: hashedFileName,
        deleted: null,
      });
      return { url: url };
    } else {
      return { url: null };
    }
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
