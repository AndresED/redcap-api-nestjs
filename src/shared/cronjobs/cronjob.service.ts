import { Inject, Injectable } from '@nestjs/common';
import { NotificationsCronJobServices } from './notifications-cronjob.service';
import { APP_LOGGER } from '../../../logger/index';
@Injectable() 
export class ScheduleService {
  constructor(
    // tslint:disable-next-line: no-shadowed-variable
    private notificationsCronJobServices: NotificationsCronJobServices,
  ){}
  // SINTAXIS DE UN CRON JOB
  // * * * * *
  // minutos(0-59)
  // horas(0-23)
  // día del mes(0-31)
  // mes(0-12 o nombres)
  // día de la semana (0-7, 7 es Domingo, o nombres)
  async startCronJob() {
    try {
      
      const CronJob = require('cron').CronJob;
      // Patrón de cron
      APP_LOGGER.info(`CronJob  Init`);
      // tslint:disable-next-line: no-unused-expression
      const job = new CronJob('*/15  * * * *', async () => {
        // this.facebookCronJobServices.initPopulationFacebook();
      });
      job.start();
    } catch (error) {
      APP_LOGGER.error('Error initializing CronJob', error);
    }
  }
}