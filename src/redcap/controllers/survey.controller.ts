import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, UseInterceptors } from '@nestjs/common';
import { AppExceptionFilter } from '../../shared/filters/app-exception.filter';
import { ApiTags } from '@nestjs/swagger';
import { ResponseInterceptor } from '../../shared/interceptors/response.interceptor';
import { SurveyRedcapService } from '../services/survey.service';
@Controller('survey')
@ApiTags('Survey')
@UseFilters(new AppExceptionFilter())
@UseInterceptors(ResponseInterceptor)
export class SurveyController {
    constructor(
        private readonly SurveyRedcapService: SurveyRedcapService,
    ) { }

    @Post('export/surveylink/:instrument/:event/:record')
    exportSurveyLink(@Param('instrument') instrument: string,@Param('event') event: string,@Param('record') record: string) {
        return this.SurveyRedcapService.exportSurveyLink(instrument,event,record);
    }
    @Post('export/surveyparticipants/:instrument/:event/:record')
    exportSurveyParticipants(@Param('instrument') instrument: string,@Param('event') event: string,@Param('record') record: string) {
        return this.SurveyRedcapService.exportSurveyParticipants(instrument,event,record);
    }
    @Post('export/surveyqueuelink/:record')
    exportSurveyQueueLink(@Param('record') record: string) {
        return this.SurveyRedcapService.exportSurveyQueueLink(record);
    }
    @Post('export/surveyreturncode/:instrument/:event/:record')
    exportSurveyReturnCode(@Param('instrument') instrument: string,@Param('event') event: string,@Param('record') record: string) {
        return this.SurveyRedcapService.exportSurveyReturnCode(instrument,event,record);
    }

    
}