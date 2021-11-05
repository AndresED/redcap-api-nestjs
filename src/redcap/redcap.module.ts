import { HttpModule, Module } from '@nestjs/common';
import { RedcapController } from './redcap.controller';
import { ArmsRedcapService } from './services/arms.service';
import { ProjectsRedcapService } from './services/projects.service';

@Module({
  controllers: [RedcapController],
  providers: [
    ArmsRedcapService,
    ProjectsRedcapService
  ],
  imports: [HttpModule],
})
export class RedcapModule {}
