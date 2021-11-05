import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, UseInterceptors } from '@nestjs/common';
import { AppExceptionFilter } from '../../shared/filters/app-exception.filter';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ResponseInterceptor } from '../../shared/interceptors/response.interceptor';
import { UploadFileDto } from '../dto/create-redcap.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { arrayFiles, localOptions } from '../multer.option';
import { ProjectsRedcapService } from '../services/projects.service';
@Controller('projects')
@ApiTags('Projects')
@UseFilters(new AppExceptionFilter())
@UseInterceptors(ResponseInterceptor)
export class ProjectsController {
    constructor(
        private readonly projectsRedcapService: ProjectsRedcapService,
    ) { }
    @Post('import')
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileFieldsInterceptor(arrayFiles, localOptions))
    import(@Body() fileData: UploadFileDto) {
        return this.projectsRedcapService.import(fileData);
    }
    @Post('export')
    export() {
        return this.projectsRedcapService.export();
    }
}