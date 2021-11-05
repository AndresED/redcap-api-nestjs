import { Module,  HttpModule } from '@nestjs/common';
import { FileController } from './files.controller';
import { FileService } from './files.service';
@Module({
  providers: [
  FileService,
  ],
  imports: [
    HttpModule,
  ],
  controllers: [
    FileController
  ],
  exports:[
  ],
})
export class FilesModule {}
