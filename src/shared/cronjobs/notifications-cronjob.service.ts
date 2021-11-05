import { Injectable, Inject } from '@nestjs/common';
import * as moment from 'moment';

@Injectable()
export class NotificationsCronJobServices {
  constructor(
  ) { }

  diferenciaFechas(fechaMayor, fechaMenor) {
    const fecha1 = moment(fechaMayor);
    const fecha2 = moment(fechaMenor);
    return fecha1.diff(fecha2, 'minutes');
  }
}

