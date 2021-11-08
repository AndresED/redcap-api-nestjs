import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, UseInterceptors } from '@nestjs/common';
import { AppExceptionFilter } from '../../shared/filters/app-exception.filter';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ResponseInterceptor } from '../../shared/interceptors/response.interceptor';
import { FilesRedcapService } from '../services/files.service';
import { FilesDeleteDto, UploadFileDto } from '../dto/create-redcap.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { arrayFiles, localOptions } from '../multer.option';
@Controller('files')
@ApiTags('Files')
@UseFilters(new AppExceptionFilter())
@UseInterceptors(ResponseInterceptor)
export class FilesController {
    constructor(
        private readonly filesRedcapService: FilesRedcapService,
    ) { }


    @Post('import')
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileFieldsInterceptor(arrayFiles, localOptions))
    importFiles(@Body() fileData: UploadFileDto) {
        return this.filesRedcapService.import(fileData);
    }
    @Post('export')
    exportFiles() {
        return this.filesRedcapService.export();
    }

    @Post('delete')
    deleteFiles(@Body() files: FilesDeleteDto) {
        return this.filesRedcapService.delete(files);
    }

}