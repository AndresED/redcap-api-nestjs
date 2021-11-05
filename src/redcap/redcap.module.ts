import { Module } from '@nestjs/common';
import { RedcapService } from './redcap.service';
import { RedcapController } from './redcap.controller';

@Module({
  controllers: [RedcapController],
  providers: [RedcapService]
})
export class RedcapModule {}
