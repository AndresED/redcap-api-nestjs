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
    EventsController
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
    EventsRedcapService
  ],
  imports: [HttpModule],
})
export class RedcapModule {}
