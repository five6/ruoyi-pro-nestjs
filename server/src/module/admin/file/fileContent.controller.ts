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
  import { PageDto } from 'src/dto/commonDto';
  import { FileConfigPageDto, FileContentPageDto, FilePageDto } from 'src/dto/file/FileDto';
  import { FileConfigService } from 'src/service/file/fileConfig.service';
import { FileContentService } from 'src/service/file/fileContent.service';
  
  @ApiTags('文件内容')
  @Controller(`${Config.ADMIN_API_PREFIX}/file-content`)
  export class FileContentController {
    constructor(private service: FileContentService) {}
  
    @ApiOperation({ summary: '获取文件列表' })
    @Get('page')
    async find(@Query() pageDto: FileContentPageDto) {
      const fields = '';
      const result = await this.service.find(pageDto);
      return {
        list: result[0],
        total: result[1],
      };
    }
  
  
    @Delete('delete')
    @ApiOperation({ summary: '删除' })
    @ApiParam({ name: 'id' })
    async delete(@Query('id') id) {
      await this.service.delete(id);
    }
  }
  