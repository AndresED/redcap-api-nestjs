import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, UseInterceptors } from '@nestjs/common';
import { AppExceptionFilter } from '../../shared/filters/app-exception.filter';
import {  ApiTags } from '@nestjs/swagger';
import { ResponseInterceptor } from '../../shared/interceptors/response.interceptor';
import { RedcapService } from '../services/redcap.service';
@Controller('redcap')
@ApiTags('Redcap')
@UseFilters(new AppExceptionFilter())
@UseInterceptors(ResponseInterceptor)
export class RedcapController {
    constructor(
        private readonly redcapService: RedcapService,
    ) { }

    @Post('export')
    exportRecords() {
        return this.redcapService.export();
    }
}