import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Request,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Get,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateFileVo } from './vo/create-file.vo';
import { QueryFileDto } from './dto/query-file.dto';

@ApiTags('文件管理')
@ApiHeader({
  name: 'Authorization',
  description: '用户令牌',
  example: 'Bearer token',
})
@ApiOkResponse({
  description: '返回示例',
  type: CreateFileVo,
})
@ApiBearerAuth()
@Controller('file')
export class FileController {
  bucket = 'AddrVault';
  path = '/images/avatar';
  constructor(private readonly fileService: FileService) {}

  @ApiOperation({ summary: '上传文件' })
  @Post('upload')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Request() req, // 获取请求对象
  ) {
    const fileData = await this.fileService.uploadFile(
      this.bucket,
      this.path,
      file,
      req.user.sub, // 传递用户 ID
    );

    return fileData; // 返回文件信息，包括数据库 ID
  }

  @ApiOperation({ summary: '根据查询条件获取文件' })
  @ApiBearerAuth() // 鉴权
  @HttpCode(HttpStatus.OK)
  @Get('query')
  async findByQuery(@Query() query: QueryFileDto, @Request() req: any) {
    return this.fileService.findByQuery({
      ...query,
      user_id: req.user.sub,
    });
  }

  @ApiOperation({ summary: '根据文件ID获取文件' })
  @ApiBearerAuth() // 鉴权
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    // TODO: 根据文件ID获取文件
    return this.fileService.getFileById(id);
  }

  @ApiOperation({ summary: '根据文件ID删除文件' })
  @ApiBearerAuth() // 鉴权
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async deleteFile(@Param('id') id: string) {
    const { bucket, id: fileId, path } = await this.findOne(id);
    // TODO: 删除文件
    return this.fileService.deleteFile(id, bucket, path);
  }
}
