import { HttpModule, Module } from '@nestjs/common';
import { RedcapService } from './redcap.service';
import { RedcapController } from './redcap.controller';

@Module({
  controllers: [RedcapController],
  providers: [RedcapService],
  imports: [HttpModule],
})
export class RedcapModule {}
