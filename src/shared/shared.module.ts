import { Module, HttpModule, Provider } from '@nestjs/common';
import { EmailService } from './services/email.service';
import { SMSService } from './services/sms.service';

@Module({
  imports: [
    HttpModule,
  ],
  providers: [
    EmailService,
    SMSService,
  ],
  exports: [
    EmailService,
    SMSService,
  ],
})
export class SharedModule {
  constructor(){
  }
}
