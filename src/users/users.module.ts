import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from '../../src/shared/database/database.module';
import { UsersProvider } from './users.provider';
import { SharedModule } from '../../src/shared/shared.module';
import { EmailService } from '../shared/services/email.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersProvider,EmailService],
  imports: [
    DatabaseModule,
    SharedModule,
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: {
        expiresIn: process.env.EXPIRESIN,
      },
    }),
  ],
})
export class UsersModule {}
