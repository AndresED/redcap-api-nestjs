import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, UseInterceptors } from '@nestjs/common';
import { AppExceptionFilter } from '../shared/filters/app-exception.filter';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ResponseInterceptor } from '../shared/interceptors/response.interceptor';
import { DagsDeleteDto, UploadFileDto } from './dto/create-redcap.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { arrayFiles, localOptions } from './multer.option';
import { DagsRedcapService } from './services/dags.service';
@Controller('dags')
@ApiTags('Redcap')
@UseFilters(new AppExceptionFilter())
@UseInterceptors(ResponseInterceptor)
export class RedcapController {
  constructor(
    private readonly dagsRedcapService: DagsRedcapService,
    ) {}

  
  @Post('dags/import')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileFieldsInterceptor(arrayFiles, localOptions))
  importDags(@Body() fileData: UploadFileDto) {
    return this.dagsRedcapService.import(fileData);
  }
  @Post('dags/export')
  exportDags() {
    return this.dagsRedcapService.export();
  }

  @Post('dags/delete')
  deleteDags(@Body() dags: DagsDeleteDto) {
    return this.dagsRedcapService.delete(dags);
  }

  @Post('project/import')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileFieldsInterceptor(arrayFiles, localOptions))
  import(@Body() fileData: UploadFileDto) {
    return this.dagsRedcapService.import(fileData);
  }
  @Post('project/export')
  export() {
    return this.dagsRedcapService.export();
  }
}