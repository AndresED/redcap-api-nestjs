import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, UseInterceptors } from '@nestjs/common';
import { AppExceptionFilter } from '../../shared/filters/app-exception.filter';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ResponseInterceptor } from '../../shared/interceptors/response.interceptor';
import { EventsRedcapService } from '../services/events.service';
import { EventsDeleteDto, UploadFileDto } from '../dto/create-redcap.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { arrayFiles, localOptions } from '../multer.option';
@Controller('events')
@ApiTags('Events')
@UseFilters(new AppExceptionFilter())
@UseInterceptors(ResponseInterceptor)
export class EventsController {
    constructor(
        private readonly eventsRedcapService: EventsRedcapService,
    ) { }

    @Post('import')
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileFieldsInterceptor(arrayFiles, localOptions))
    importEvents(@Body() fileData: UploadFileDto) {
        return this.eventsRedcapService.import(fileData);
    }
    @Post('export')
    exportEvents() {
        return this.eventsRedcapService.export();
    }

    @Post('delete')
    deleteEvents(@Body() events: EventsDeleteDto) {
        return this.eventsRedcapService.delete(events);
    }

}