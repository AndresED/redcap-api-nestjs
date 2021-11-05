import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as helmet from 'helmet';
import * as dotenv from 'dotenv';
import { json } from 'express';
import { APP_LOGGER } from '../logger/index';
import { ValidationPipe } from '@nestjs/common';
const qt = require('quickthumb');
dotenv.config();
import 'reflect-metadata';
async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.use(helmet());
    app.enableCors();
    // app.use(csurf());
    const PORT = process.env.PORT || 3000;
    app.use(json({ limit: '300mb' }));
    if(process.env.STAGE == 'production'){ 
      const dir = __dirname.replace('dist/src','') +  'uploads'
      app.use(qt.static(dir, {
        cacheDir: dir+'/thumbnail'
      }));
    }else{
      const dir = __dirname.replace('dist/src','') +  'uploads'
      app.use(qt.static(dir, {
        cacheDir: dir+'/thumbnail'
      }));
    }
    app.useGlobalPipes(new ValidationPipe());
    const config = new DocumentBuilder()
      .setTitle('SandWord ApiRest')
      .setDescription('SandWord Api Rest V1')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
    await app.listen(PORT, async() => {
      APP_LOGGER.info(`SandWord Api Server is running in port ${PORT}`)
      APP_LOGGER.info(`SandWord Socket Server is running in port ${process.env.PORT_SOCKET}`)
    });
  
  } catch (error) {
    APP_LOGGER.error('Error initializing SandWord Api', error);
  }
}
bootstrap();
