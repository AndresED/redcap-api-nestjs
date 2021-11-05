import { HttpException, HttpService, HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();
@Injectable()
export class SMSService {
  constructor(
    private readonly http: HttpService,
  ){

  }
 
  sendSMS(message: string, phone: string){
      return new Promise((resolve, reject) =>{
        try {
            const accountSid = process.env.ACCOUNTSID_TWILIO;
            const authToken = process.env.AUTH_TOKEN_TWILIO;
            const client = require('twilio')(accountSid, authToken);
            client.messages
              .create({
                 body: message,
                 from: process.env.NUMBER_TWILIO,
                 to: phone
               })
              .then(message => {
                console.log(message.sid);
                resolve('sms_send');
              }).catch(error=>{
                  console.log(error);
              });

          } catch (error) {
              console.log(error);
              reject(error);
          }
      })
  }

  checkNumber(cellphone){
    return new Promise(async(resolve, reject) =>{
      try {
        const url = 'https://lookups.twilio.com/v1/PhoneNumbers/' + cellphone;
        const header = {
          headers: {
            'Authorization': 'Basic QUM0MjZhZTIxMjMyZTgzMGU2MzYxZjUxZGE4YWZiMTRjOToxMTUzNjdmNTUzY2Y5ZTE1NGVhYjkzNmJmNmJiMmVkNg=='
          }
        }
        await this.http.post(url,header).toPromise().then(async response =>{
          resolve(response.data);
        },error=>{
          // console.log(error);
          resolve(error.response);
          // reject(error);
        });
        } catch (error) {
          resolve(error.response);
          //reject(error);
        }
    })
  }
}
