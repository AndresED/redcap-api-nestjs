import { Module, forwardRef, HttpModule } from '@nestjs/common';
import { DatabaseModule } from '../shared/database/database.module';
import { SocketGateway } from './socket.gateway';

@Module({
  imports: [
    DatabaseModule,
    HttpModule
  ],
  controllers: [],
  providers: [
    SocketGateway,
  ],
  exports: [
    SocketGateway
  ]
})
export class SocketModule { }
