import { HttpService, Injectable } from '@nestjs/common';
import { LogsDeleteDto, UploadFileDto } from '../dto/create-redcap.dto';
import { APP_LOGGER } from '../../../logger/index';
import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config();
@Injectable()
export class LogsRedcapService {
    token: string;
    constructor(
        private readonly http: HttpService,
    ) {
        this.token = process.env.REDCAP_API_TOKEN;
    }

    import(fileData: UploadFileDto) {
        return new Promise(async (resolve, reject) => {
            try {
                let dir;
                if (process.env.STAGE == 'production') {
                    dir = __dirname.replace('dist/', '');
                    dir = path.resolve(dir, '../../../uploads/uploads/')
                } else {
                    dir = __dirname.replace('dist/', '');
                    dir = path.resolve(dir, '../../../uploads/uploads/')
                }
                dir = dir + "/" + fileData.file;
                const XLSX = require('xlsx')
                const workbook = XLSX.readFile(dir);
                const sheet_name_list = workbook.SheetNames;
                const xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
                const url = process.env.REDCAP_HOST + process.env.REDCAP_PATH;
                const data = `token=${this.token}&data=${xlData}&content=logs&format=json&returnFormat=json`;
                const config = {
                    headers: {
                        'Content-Type': `application/x-www-form-urlencoded`,
                        'Accept': 'application/json'
                    }
                }
                await this.http.post(url, data, config).toPromise().then(async response => {
                    this.deleteFile(dir); // Eliminando archivo subido
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

    export() {
        return new Promise(async (resolve, reject) => {
            try {
                const url = process.env.REDCAP_HOST + process.env.REDCAP_PATH;
                const data = `token=${this.token}&content=logs&format=json&returnFormat=json`;
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

    delete(logss: LogsDeleteDto) {
        return new Promise(async (resolve, reject) => {
            try {
                const logssArray = logss.logs.split(',');
                const url = process.env.REDCAP_HOST + process.env.REDCAP_PATH;
                const data = `token=${this.token}&content=logs&logss=${logssArray}&format=json&returnFormat=json`;
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
    deleteFile(file) {
        return new Promise(async (resolve, reject) => {
            try {
                let dir = file;
                const fs = require('fs').promises;
                fs.unlink(dir)
                    .then(() => {
                        console.log('File removed');
                        APP_LOGGER.info('File removed');
                        resolve('success');
                    }).catch(err => {
                        APP_LOGGER.error('Something wrong happened removing the file', err);
                        reject(err);
                    })
            } catch (error) {
                APP_LOGGER.error('Something wrong happened removing the file', error);
                reject(error);
            }
        })
    }
}
