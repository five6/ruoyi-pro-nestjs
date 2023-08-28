import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

import { Config } from '../../../common/config/config';
import { Pagination } from '../../../common/result-beans/Pagination';
import { BufferedFile } from '../../../common/model/files.model';
import { FileService } from '../../../service/file/file.service';
import { Keep } from '../../../common/decorators/keep.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('文件')
@Controller(`${Config.ADMIN_API_PREFIX}/files`)
export class FilesController {
  constructor(private service: FileService) {}

  @ApiOperation({ summary: '获取文件列表' })
  @Get()
  async find(
    @Query('name') name: string,
    @Query('md5') md5: string,
    @Query('pageSize') pageSize?: number,
    @Query('pageNo') pageNo?: number,
  ) {
    const fields = '';
    const result = await this.service.find(
      { name, md5 },
      fields,
      new Pagination({ pageNo, pageSize }),
    );
    return {
      items: result[0],
      total: result[1],
    };
  }

  @ApiOperation({ summary: '上传文件' })
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: BufferedFile, @Request() request) {
    return await this.service.upload();
  }


  @Delete(':id')
  @ApiOperation({ summary: '删除' })
  @ApiParam({ name: 'id' })
  async delete(@Param('id') id) {
    await this.service.delete(id).catch((err) => {
      throw err;
    });
    return '删除成功';
  }
}
