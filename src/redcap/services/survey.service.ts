import { HttpService, Injectable } from '@nestjs/common';
import { APP_LOGGER } from '../../../logger/index';
import * as dotenv from 'dotenv';
dotenv.config();
@Injectable()
export class SurveyRedcapService {
    token: string;
    constructor(
        private readonly http: HttpService,
    ) {
        this.token = process.env.REDCAP_API_TOKEN;
    }

    exportSurveyLink(instrument:string,event: string,record: string) {
        return new Promise(async (resolve, reject) => {
            try {
                const url = process.env.REDCAP_HOST + process.env.REDCAP_PATH;
                const data = `token=${this.token}&content=surveyLink&instrument=${instrument}&event=${event}&record=${record}&format=json&returnFormat=json`;
                const config = {
                    headers: {
                        'Content-Type': `application/x-www-form-urlencoded`,
                        'Accept': 'application/json'
                    }
                }
                await this.http.post(url, data, config).toPromise().then(async response => {
                    resolve(response.data);
                }, error => {
                    APP_LOGGER.error('Error Api', error);
                    reject(error);
                });
            } catch (err) {
                APP_LOGGER.error('Error Api', err);
                reject(err);
            }
        })
    }
    exportSurveyParticipants(instrument:string,event: string,record: string) {
        return new Promise(async (resolve, reject) => {
            try {
                const url = process.env.REDCAP_HOST + process.env.REDCAP_PATH;
                const data = `token=${this.token}&content=participantList&instrument=${instrument}&event${event}&record=${record}&format=json&returnFormat=json`;
                const config = {
                    headers: {
                        'Content-Type': `application/x-www-form-urlencoded`,
                        'Accept': 'application/json'
                    }
                }
                await this.http.post(url, data, config).toPromise().then(async response => {
                    resolve(response.data);
                }, error => {
                    APP_LOGGER.error('Error Api', error);
                    reject(error);
                });
            } catch (err) {
                APP_LOGGER.error('Error Api', err);
                reject(err);
            }
        })
    }
    exportSurveyQueueLink(record: string) {
        return new Promise(async (resolve, reject) => {
            try {
                const url = process.env.REDCAP_HOST + process.env.REDCAP_PATH;
                const data = `token=${this.token}&content=surveyQueueLink&record=${record}&format=json&returnFormat=json`;
                const config = {
                    headers: {
                        'Content-Type': `application/x-www-form-urlencoded`,
                        'Accept': 'application/json'
                    }
                }
                await this.http.post(url, data, config).toPromise().then(async response => {
                    resolve(response.data);
                }, error => {
                    APP_LOGGER.error('Error Api', error);
                    reject(error);
                });
            } catch (err) {
                APP_LOGGER.error('Error Api', err);
                reject(err);
            }
        })
    }
    exportSurveyReturnCode(instrument:string,event: string,record: string) {
        return new Promise(async (resolve, reject) => {
            try {
                const url = process.env.REDCAP_HOST + process.env.REDCAP_PATH;
                const data = `token=${this.token}&content=surveyReturnCode&instrument=${instrument}&event${event}&record=${record}&format=json&returnFormat=json`;
                const config = {
                    headers: {
                        'Content-Type': `application/x-www-form-urlencoded`,
                        'Accept': 'application/json'
                    }
                }
                await this.http.post(url, data, config).toPromise().then(async response => {
                    resolve(response.data);
                }, error => {
                    APP_LOGGER.error('Error Api', error);
                    reject(error);
                });
            } catch (err) {
                APP_LOGGER.error('Error Api', err);
                reject(err);
            }
        })
    }
}
