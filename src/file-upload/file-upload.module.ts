import { Module } from '@nestjs/common';
import { FileUploadService } from './services/file-upload.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaFile } from '../entities/media-file.entity';
import { FileUploadController } from './controllers/file-upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';

@Module({
  imports: [
    TypeOrmModule.forFeature([MediaFile]),
    MulterModule.register({
      storage: diskStorage({
        destination: './nest-local-uploads',
        /*destination: (req, file, cb) => {
          const userDir = os.homedir();
          const uploadPath = path.join(userDir, 'nest-local-uploads');
          cb(null, uploadPath);
        },*/
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  ],
  providers: [FileUploadService],
  controllers: [FileUploadController],
})
export class FileUploadModule {}
