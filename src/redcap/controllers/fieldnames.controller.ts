import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, UseInterceptors } from '@nestjs/common';
import { AppExceptionFilter } from '../../shared/filters/app-exception.filter';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ResponseInterceptor } from '../../shared/interceptors/response.interceptor';
import { FieldNamesRedcapService } from '../services/field.names.service';
import { FieldNamesDeleteDto, UploadFileDto } from '../dto/create-redcap.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { arrayFiles, localOptions } from '../multer.option';
@Controller('fieldnames')
@ApiTags('FieldNames')
@UseFilters(new AppExceptionFilter())
@UseInterceptors(ResponseInterceptor)
export class FieldNamesController {
    constructor(
        private readonly fieldnamesRedcapService: FieldNamesRedcapService,
    ) { }

    @Post('import')
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileFieldsInterceptor(arrayFiles, localOptions))
    importFieldNames(@Body() fileData: UploadFileDto) {
        return this.fieldnamesRedcapService.import(fileData);
    }
    @Post('export')
    exportFieldNames() {
        return this.fieldnamesRedcapService.export();
    }

    @Post('delete')
    deleteFieldNames(@Body() fieldnames: FieldNamesDeleteDto) {
        return this.fieldnamesRedcapService.delete(fieldnames);
    }
}