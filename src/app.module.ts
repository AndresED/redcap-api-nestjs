import { Module } from '@nestjs/common';
import { RedcapModule } from './redcap/redcap.module';
@Module({
  imports: [
    RedcapModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
