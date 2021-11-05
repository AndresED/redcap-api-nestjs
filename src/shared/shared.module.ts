import { SocketGateway } from './../sockets/socket.gateway';
import { SocketModule } from './../sockets/socket.module';
import { Module, HttpModule, Provider } from '@nestjs/common';
import { EmailService } from './services/email.service';
import { SMSService } from './services/sms.service';

@Module({
  imports: [
    HttpModule,
    // SocketModule,
  ],
  providers: [
    EmailService,
    SMSService,
  ],
  exports: [
    EmailService,
    SMSService,
    // SocketGateway
  ],
})
export class SharedModule {
  constructor(){
  }
}
