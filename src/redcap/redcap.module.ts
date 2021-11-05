import { HttpModule, Module } from '@nestjs/common';
import { ArmsController } from './controllers/arms.controller';
import { ProjectsController } from './controllers/projects.controllers';
import { ArmsRedcapService } from './services/arms.service';
import { ProjectsRedcapService } from './services/projects.service';

@Module({
  controllers: [
    ArmsController,
    ArmsController,
    ProjectsController
  ],
  providers: [
    ArmsRedcapService,
    ProjectsRedcapService,
  ],
  imports: [HttpModule],
})
export class RedcapModule {}
