import { Injectable } from '@nestjs/common';
import { UploadFileDto } from './files.dto';
@Injectable()
export class FileService { 
    constructor() {}
    async upload(body: UploadFileDto) {
        return new Promise(async (resolve, reject) => {
            try {
                // console.log('body file =>',body)
                const result = {file: body.file};
                resolve(result);
            } catch (error) {
                console.log(error)
                reject(error);
            }
        });
    }
}
