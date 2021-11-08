import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, UseInterceptors } from '@nestjs/common';
import { AppExceptionFilter } from '../../shared/filters/app-exception.filter';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ResponseInterceptor } from '../../shared/interceptors/response.interceptor';
import { UploadFileDto } from '../dto/create-redcap.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { arrayFiles, localOptions } from '../multer.option';
import { MetaDataRedcapService } from '../services/metadata.service';
@Controller('metadata')
@ApiTags('Metadata')
@UseFilters(new AppExceptionFilter())
@UseInterceptors(ResponseInterceptor)
export class MetadataController {
    constructor(
        private readonly metaDataRedcapService: MetaDataRedcapService,
    ) { }

    @Post('import')
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileFieldsInterceptor(arrayFiles, localOptions))
    importRecords(@Body() fileData: UploadFileDto) {
        return this.metaDataRedcapService.import(fileData);
    }
    @Post('export/:field')
    exportRecords(@Param('field') field: string) {
        return this.metaDataRedcapService.export(field);
    }
}