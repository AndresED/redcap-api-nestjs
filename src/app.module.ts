import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SocketModule } from './sockets/socket.module';
import { UsersModule } from './users/users.module';
import { RedcapModule } from './redcap/redcap.module';
@Module({
  imports: [
    SocketModule,
    AuthModule,
    UsersModule,
    RedcapModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
