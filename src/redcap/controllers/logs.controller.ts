import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, UseInterceptors } from '@nestjs/common';
import { AppExceptionFilter } from '../../shared/filters/app-exception.filter';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ResponseInterceptor } from '../../shared/interceptors/response.interceptor';
import { LogsRedcapService } from '../services/logs.service';
import { LogsDeleteDto, UploadFileDto } from '../dto/create-redcap.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { arrayFiles, localOptions } from '../multer.option';
@Controller('logs')
@ApiTags('Logs')
@UseFilters(new AppExceptionFilter())
@UseInterceptors(ResponseInterceptor)
export class LogsController {
    constructor(
        private readonly logsRedcapService: LogsRedcapService,
    ) { }

    @Post('import')
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileFieldsInterceptor(arrayFiles, localOptions))
    importLogs(@Body() fileData: UploadFileDto) {
        return this.logsRedcapService.import(fileData);
    }
    @Post('export')
    exportLogs() {
        return this.logsRedcapService.export();
    }

    @Post('delete')
    deleteLogs(@Body() logs: LogsDeleteDto) {
        return this.logsRedcapService.delete(logs);
    }

}