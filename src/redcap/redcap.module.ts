import { HttpModule, Module } from '@nestjs/common';
import { RedcapController } from './redcap.controller';
import { ArmsRedcapService } from './services/arms.service';
import { ProjectsRedcapService } from './services/projects.service';
import { DagsRedcapService } from './services/dags.service';

@Module({
  controllers: [RedcapController],
  providers: [
    ArmsRedcapService,
    ProjectsRedcapService, 
    DagsRedcapService
  ],
  imports: [HttpModule],
})
export class RedcapModule {}
