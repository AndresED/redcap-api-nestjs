import { HttpService, Injectable } from '@nestjs/common';
import { APP_LOGGER } from '../../../logger/index';
import * as dotenv from 'dotenv';
dotenv.config();
@Injectable()
export class RedcapService {
    token: string;
    constructor(
        private readonly http: HttpService,
    ) {
        this.token = process.env.REDCAP_API_TOKEN;
    }

    export() {
        return new Promise(async (resolve, reject) => {
            try {
                const url = process.env.REDCAP_HOST + process.env.REDCAP_PATH;
                const data = `token=${this.token}&content=version&format=json&returnFormat=json`;
                const config = {
                    headers: {
                        'Content-Type': `application/x-www-form-urlencoded`,
                        'Accept': 'application/json'
                    }
                }
                await this.http.post(url, data, config).toPromise().then(async response => {
                    resolve(response.data);
                }, error => {
                    APP_LOGGER.error('Error initializing Intellectus Api', error);
                    reject(error);
                });
            } catch (err) {
                APP_LOGGER.error('Error initializing Intellectus Api', err);
                reject(err);
            }
        })
    }
}
