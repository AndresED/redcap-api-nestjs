import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, UseInterceptors } from '@nestjs/common';
import { AppExceptionFilter } from '../shared/filters/app-exception.filter';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ResponseInterceptor } from '../shared/interceptors/response.interceptor';
import { ArmsRedcapService } from './services/arms.service';
import { ArmsDeleteDto, UploadFileDto } from './dto/create-redcap.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { arrayFiles, localOptions } from './multer.option';
import { ProjectsRedcapService } from './services/projects.service';
@Controller('redcap')
@ApiTags('Redcap')
@UseFilters(new AppExceptionFilter())
@UseInterceptors(ResponseInterceptor)
export class RedcapController {
  constructor(
    private readonly armsRedcapService: ArmsRedcapService,
    private readonly projectsRedcapService: ProjectsRedcapService,
    ) {}

  
  @Post('arms/import')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileFieldsInterceptor(arrayFiles, localOptions))
  importArms(@Body() fileData: UploadFileDto) {
    return this.armsRedcapService.import(fileData);
  }
  @Post('arms/export')
  exportArms() {
    return this.armsRedcapService.export();
  }

  @Post('arms/delete')
  deleteArms(@Body() arms: ArmsDeleteDto) {
    return this.armsRedcapService.delete(arms);
  }

  @Post('project/import')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileFieldsInterceptor(arrayFiles, localOptions))
  import(@Body() fileData: UploadFileDto) {
    return this.projectsRedcapService.import(fileData);
  }
  @Post('project/export')
  export() {
    return this.projectsRedcapService.export();
  }
}