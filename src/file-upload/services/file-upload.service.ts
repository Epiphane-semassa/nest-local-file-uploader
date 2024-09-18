import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { existsSync } from 'fs';
import { MediaFile } from '../../entities/media-file.entity';
import { Environment } from '../../environments/environment-dev';

@Injectable()
export class FileUploadService {
  constructor(
    @InjectRepository(MediaFile)
    private mediaRepository: Repository<MediaFile>,
  ) {}

  async uploadFile(file: Express.Multer.File): Promise<MediaFile> {
    const newMedia = this.mediaRepository.create({
      filename: file.filename,
      path: file.path,
    });
    return this.mediaRepository.save(newMedia);
  }

  async getFileById(id: number): Promise<string> {
    const media = await this.mediaRepository.findOne({ where: { id } });
    if (media && existsSync(media.path)) {
      return Environment.baseUrl + `${media.path}`;
    }
    throw new Error('File not found');
  }
}
