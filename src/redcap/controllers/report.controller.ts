import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, UseInterceptors } from '@nestjs/common';
import { AppExceptionFilter } from '../../shared/filters/app-exception.filter';
import { ApiTags } from '@nestjs/swagger';
import { ResponseInterceptor } from '../../shared/interceptors/response.interceptor';
import { ReportsRedcapService } from '../services/reports.service';
@Controller('reports')
@ApiTags('Reports')
@UseFilters(new AppExceptionFilter())
@UseInterceptors(ResponseInterceptor)
export class ReportsController {
    constructor(
        private readonly reportsRedcapService: ReportsRedcapService,
    ) { }

    @Post('export/:reportId/:csvDelimiter/:rawOrLabelHeaders/:exportCheckboxLabel')
    exportRecords(@Param('reportId') reportId: string,@Param('csvDelimiter') csvDelimiter: string,@Param('rawOrLabelHeaders') rawOrLabelHeaders: string,@Param('exportCheckboxLabel') exportCheckboxLabel: boolean) {
        return this.reportsRedcapService.export(reportId,csvDelimiter,rawOrLabelHeaders,exportCheckboxLabel);
    }
}