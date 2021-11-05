import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, UseInterceptors } from '@nestjs/common';
import { AppExceptionFilter } from '../../shared/filters/app-exception.filter';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ResponseInterceptor } from '../../shared/interceptors/response.interceptor';
import { DagsRedcapService } from '../services/dags.service';
import { DagsDeleteDto, UploadFileDto } from '../dto/create-redcap.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { arrayFiles, localOptions } from '../multer.option';
@Controller('dags')
@ApiTags('Dags')
@UseFilters(new AppExceptionFilter())
@UseInterceptors(ResponseInterceptor)
export class DagsController {
    constructor(
        private readonly dagsRedcapService: DagsRedcapService,
    ) { }

    @Post('import')
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileFieldsInterceptor(arrayFiles, localOptions))
    importDags(@Body() fileData: UploadFileDto) {
        return this.dagsRedcapService.import(fileData);
    }
    @Post('export')
    exportDags() {
        return this.dagsRedcapService.export();
    }

    @Post('delete')
    deleteDags(@Body() dags: DagsDeleteDto) {
        return this.dagsRedcapService.delete(dags);
    }

}