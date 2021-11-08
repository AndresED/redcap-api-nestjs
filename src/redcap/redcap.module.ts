import { HttpModule, Module } from '@nestjs/common';

import { ArmsController } from './controllers/arms.controller';
import { ProjectsController } from './controllers/projects.controllers';
import { DagsController } from './controllers/dags.controller';
import { FilesController } from './controllers/files.controller';
import { RecordsController } from './controllers/records.controller';
import { FieldNamesController } from './controllers/fieldnames.controller';
import { InstrumentsController } from './controllers/instruments.controller';
import { LogsController } from './controllers/logs.controller';
import { EventsController } from './controllers/events.controller';


import { ArmsRedcapService } from './services/arms.service';
import { ProjectsRedcapService } from './services/projects.service';
import { DagsRedcapService } from './services/dags.service';
import { FilesRedcapService } from './services/files.service';
import { RecordsRedcapService } from './services/records.service';
import { FieldNamesRedcapService } from './services/field.names.service';
import { InstrumentsRedcapService } from './services/instruments.service';
import { LogsRedcapService } from './services/logs.service';
import { EventsRedcapService } from './services/events.service';
import { MetadataController } from './controllers/metadata.controller';
import { MetaDataRedcapService } from './services/metadata.service';
import { RedcapService } from './services/redcap.service';
import { RedcapController } from './controllers/redcap.controller';
import { ReportsController } from './controllers/report.controller';
import { ReportsRedcapService } from './services/reports.service';
import { SurveyController } from './controllers/survey.controller';
import { SurveyRedcapService } from './services/survey.service';
import { UsersController } from './controllers/users.controller';
import { UsersRedcapService } from './services/users.service';


@Module({
  controllers: [
    ArmsController,
    DagsController,
    ProjectsController,
    FilesController,
    RecordsController,
    FieldNamesController,
    InstrumentsController,
    LogsController,
    EventsController,
    MetadataController,
    RedcapController,
    ReportsController,
    SurveyController,
    UsersController
  ],
  providers: [
    ArmsRedcapService,
    ProjectsRedcapService,
    DagsRedcapService,
    FilesRedcapService,
    RecordsRedcapService,
    FieldNamesRedcapService,
    InstrumentsRedcapService,
    LogsRedcapService,
    EventsRedcapService,
    MetaDataRedcapService,
    RedcapService,
    ReportsRedcapService,
    SurveyRedcapService,
    UsersRedcapService,
  ],
  imports: [HttpModule],
})
export class RedcapModule {}
