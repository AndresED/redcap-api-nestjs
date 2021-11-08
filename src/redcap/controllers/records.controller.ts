import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, UseInterceptors } from '@nestjs/common';
import { AppExceptionFilter } from '../../shared/filters/app-exception.filter';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ResponseInterceptor } from '../../shared/interceptors/response.interceptor';
import { RecordsRedcapService } from '../services/records.service';
import { RecordsDeleteDto, UploadFileDto } from '../dto/create-redcap.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { arrayFiles, localOptions } from '../multer.option';
@Controller('records')
@ApiTags('Records')
@UseFilters(new AppExceptionFilter())
@UseInterceptors(ResponseInterceptor)
export class RecordsController {
    constructor(
        private readonly recordsRedcapService: RecordsRedcapService,
    ) { }

    @Post('import')
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileFieldsInterceptor(arrayFiles, localOptions))
    importRecords(@Body() fileData: UploadFileDto) {
        return this.recordsRedcapService.import(fileData);
    }
    @Post('export')
    exportRecords() {
        return this.recordsRedcapService.export();
    }

    @Post('delete')
    deleteRecords(@Body() records: RecordsDeleteDto) {
        return this.recordsRedcapService.delete(records);
    }

}