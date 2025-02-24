import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaFile } from './entities/media-file.entity';
import { FileUploadModule } from './file-upload/file-upload.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { Environment } from './environments/environment-dev';
import * as os from 'os';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'nest-local-uploads'),

      //if use other folder on hardware
      //rootPath: path.join(os.homedir(), 'nest-local-uploads'),

      serveRoot: Environment.mediaServeRoot,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'nest_file_upload_db',
      entities: [MediaFile],
      synchronize: true,
    }),
    FileUploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
