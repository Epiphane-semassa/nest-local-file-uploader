import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Get,
  Param,
} from '@nestjs/common';
import { FileUploadService } from '../services/file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Environment } from '../../environments/environment-dev';

@Controller('file')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const media = await this.fileUploadService.uploadFile(file);
    //return { id: media.id, link: Environment.baseUrl + `/file/${media.id}` };
    return { id: media.id, link: Environment.baseUrl + Environment.mediaServeRoot + `/${file.filename}` };
  }

  @Get(':id')
  async getFileLink(@Param('id') id: number) {
    const link = await this.fileUploadService.getFileById(id);
    return { link };
  }
}
