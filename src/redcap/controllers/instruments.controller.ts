import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, UseInterceptors } from '@nestjs/common';
import { AppExceptionFilter } from '../../shared/filters/app-exception.filter';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ResponseInterceptor } from '../../shared/interceptors/response.interceptor';
import { InstrumentsRedcapService } from '../services/instruments.service';
import { InstrumentsDeleteDto, UploadFileDto } from '../dto/create-redcap.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { arrayFiles, localOptions } from '../multer.option';
@Controller('instruments')
@ApiTags('Instruments')
@UseFilters(new AppExceptionFilter())
@UseInterceptors(ResponseInterceptor)
export class InstrumentsController {
    constructor(
        private readonly instrumentsRedcapService: InstrumentsRedcapService,
    ) { }

    @Post('import')
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileFieldsInterceptor(arrayFiles, localOptions))
    importInstruments(@Body() fileData: UploadFileDto) {
        return this.instrumentsRedcapService.import(fileData);
    }
    @Post('export')
    exportInstruments() {
        return this.instrumentsRedcapService.export();
    }

    @Post('delete')
    deleteInstruments(@Body() instruments: InstrumentsDeleteDto) {
        return this.instrumentsRedcapService.delete(instruments);
    }

}