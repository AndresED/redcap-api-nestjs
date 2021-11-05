import { Injectable, HttpService } from '@nestjs/common';
import { MessageOneSignalJSON, MessageGroupOneSignalJSON } from '../interfaces/onesignal.interface';
import * as moment from 'moment';
import * as dotenv from 'dotenv';
dotenv.config();
@Injectable()
export class OneSignalService {
    constructor(
        private readonly http: HttpService,
    ){}

    async allDevice(message: MessageOneSignalJSON){
        try {
            const url = `https://onesignal.com/api/v1/notifications`;
            const data = {
                'app_id': process.env.ONESIGNALAPID,
                'included_segments': ['Active Users', 'Inactive Users'],
                'data': message.data,
                'contents': message.contents,
                'headings': message.headings
            }
            // console.log(data);
            const result = await this.http.post(url, data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Basic ${process.env.ONESIGNALAPIKEY}`
                    }
                } ).toPromise();
            return result.data;
        } catch (error) {
            console.log(error)
            return error;
        }
    }
    async groupDevice(message: MessageGroupOneSignalJSON){
        try {
            
            const url = `https://onesignal.com/api/v1/notifications`;
            const data = {
                'app_id': process.env.ONESIGNALAPID,
                'include_player_ids': message.includePlayerIds,
                'data': message.data,
                'contents': message.contents,
            }
            const result = await this.http.post(url, data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Basic ${process.env.ONESIGNALAPIKEY}`
                    }
                } ).toPromise();
            return result.data;
        } catch (error) {
            console.log(error)
            return error;
        }
    }
    sendNotificationUpdateData(notificationType: string){
        return new Promise(async (resolve, reject) =>{
          try {
             const message = 'Hemos realizado una actualización de datos en el servidor, así que sincronizaremos la aplicación con estos datos. No te preocupes, no tienes que hacer nada.'
             const title ='Actualización de datos';
              const dataPushNotification = {
                  data: {
                    date: moment(),
                    title: title,
                    body: message,
                    notificationType,
                    itemId: null,
                    itemType: null,
                    itemTitle: null,
                    itemText: message,
                    itemAmmount: null,
                    itemDate: null,
                    itemStatus: null,
                  },
                  contents: {
                    en: message,
                    es: message,
                  },
                  headings: {
                      en: title,
                      es: title,
                  },
                }
              this.allDevice(dataPushNotification);
            resolve('push_notification_send');
          } catch (error) {
            reject(error);
          }
        })
      }
}
