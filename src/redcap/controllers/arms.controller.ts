import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, UseInterceptors } from '@nestjs/common';
import { AppExceptionFilter } from '../../shared/filters/app-exception.filter';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ResponseInterceptor } from '../../shared/interceptors/response.interceptor';
import { ArmsRedcapService } from '../services/arms.service';
import { ArmsDeleteDto, UploadFileDto } from '../dto/create-redcap.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { arrayFiles, localOptions } from '../multer.option';
@Controller('arms')
@ApiTags('Arms')
@UseFilters(new AppExceptionFilter())
@UseInterceptors(ResponseInterceptor)
export class ArmsController {
    constructor(
        private readonly armsRedcapService: ArmsRedcapService,
    ) { }


    @Post('import')
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileFieldsInterceptor(arrayFiles, localOptions))
    importArms(@Body() fileData: UploadFileDto) {
        return this.armsRedcapService.import(fileData);
    }
    @Post('export')
    exportArms() {
        return this.armsRedcapService.export();
    }

    @Post('delete')
    deleteArms(@Body() arms: ArmsDeleteDto) {
        return this.armsRedcapService.delete(arms);
    }

}