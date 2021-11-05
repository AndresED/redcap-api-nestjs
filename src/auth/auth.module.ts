import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DatabaseModule } from '../shared/database/database.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { SharedModule } from '../shared/shared.module';
import { UsersModule } from '../users/users.module';
import { UsersProvider } from '../users/users.provider';
dotenv.config();
@Module({
  providers: [
    AuthService,
    UsersProvider,
  ],
  imports: [
    UsersModule,
    DatabaseModule,
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: {
        expiresIn: process.env.EXPIRESIN,
      },
    }),
    SharedModule,
  ],
  controllers: [
    AuthController,
  ],
  exports:[
    AuthService,
  ],
})
export class AuthModule {}
