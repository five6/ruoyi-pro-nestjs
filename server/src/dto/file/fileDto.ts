import { ApiProperty } from "@nestjs/swagger";
import { PageDto } from "../commonDto";

export class FilePageDto extends PageDto {
    @ApiProperty({ description: '文件类型' })
    type: string;
    
    @ApiProperty({ description: '文件路径' })
    path: string;

    @ApiProperty({ description: '创建时间' })
    createTime: Date[];
}

export class FileConfigPageDto extends PageDto {
    @ApiProperty({ description: '配置名' })
    name: string;
    
    @ApiProperty({ description: '存储器' })
    storage: string;

    @ApiProperty({ description: '创建时间' })
    createTime: Date[];
}

export class FileContentPageDto extends PageDto {
    @ApiProperty({ description: '配置名' })
    name: string;
    
    @ApiProperty({ description: '存储器' })
    storage: string;

    @ApiProperty({ description: '创建时间' })
    createTime: Date[];
}