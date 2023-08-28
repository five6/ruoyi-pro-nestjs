import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { AzLogger } from '../logger/logger.service';
import { ToolsService } from '../tools/tools.service';
import { Pagination } from '../../common/result-beans/Pagination';
import { BufferedFile } from '../../common/model/files.model';
import { MinioService } from 'nestjs-minio-client';
import * as _ from 'lodash';
import * as hasha from 'hasha';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class FileService {
  private readonly baseBucket = this.configService.get('MINIO_BUCKET');
  private readonly FILE_PREFIX = 'glx/';
  public get client() {
    return this.minio.client;
  }

  constructor(
    private readonly minio: MinioService,
    private logger: AzLogger,
    private readonly toolService: ToolsService,
    private configService: ConfigService,
  ) { }

  async find(json: any, fields?: string, pagination?: Pagination) {

  }

  async update(json: any) {

  }

  async findOne(id: string) {

  }

  async delete(id: string) {

  }

  async updateStatus(json: any) {

  }

  async upload(){

  }

}
