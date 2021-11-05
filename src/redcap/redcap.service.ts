import { HttpService, Injectable } from '@nestjs/common';
import { CreateRedcapDto } from './dto/create-redcap.dto';
import { UpdateRedcapDto } from './dto/update-redcap.dto';
import * as dotenv from 'dotenv';
dotenv.config();
@Injectable()
export class RedcapService {
  config: {
    host: string,
    path: string
  }
  redcap: any;
  token: string;
  constructor(
    private readonly http: HttpService,
  ){
    this.token = process.env.REDCAP_API_TOKEN;
  }
  create(createRedcapDto: CreateRedcapDto) {
    return 'This action adds a new redcap';
  }

  findAll() {
    return new Promise(async(resolve,reject) => {
      try{
        const url = process.env.REDCAP_HOST + process.env.REDCAP_PATH;
        const data = `token=${this.token}&content=project&format=json&returnFormat=json`;
        const config =  {
          headers: {
            'Content-Type': `application/x-www-form-urlencoded`,
            'Accept': 'application/json'
          }
        }
        await this.http.post(url,data,config).toPromise().then(async response =>{
            console.log(response.data);
            resolve(response.data);
        },error=>{
            console.log(error);
            reject(error);
        });
      }catch(err){
        console.log('error - catch',err)
        reject(err);
      }
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} redcap`;
  }

  update(id: number, updateRedcapDto: UpdateRedcapDto) {
    return `This action updates a #${id} redcap`;
  }

  remove(id: number) {
    return `This action removes a #${id} redcap`;
  }
}
