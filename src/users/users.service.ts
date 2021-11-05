import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Users } from '../../db/entitys/users';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { APP_LOGGER } from '../../logger/index';
import { CountOptions, FindOptions, Op } from 'sequelize';
import { EmailService } from '../shared/services/email.service';
import { v4 as uuidv4} from 'uuid';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UsersService {
  constructor(
    @Inject('UsersRepository') private readonly users: typeof Users,
    private emailService: EmailService,
    private readonly jwtService: JwtService,
  ){}
  create(createUserDto: CreateUserDto) {
    return new Promise(async (resolve, reject) => {
      try {
          const codeActivation = await uuidv4();
          const user = await this.users.findOne({where:{email:createUserDto.email}});
          if(user){
            throw new HttpException({ message: 'email_duplicated' }, HttpStatus.UNPROCESSABLE_ENTITY);
          }
          createUserDto.password = await bcrypt.hashSync(createUserDto.password, 10);
          const result: any = await this.users.create(createUserDto);
          // ENVIAMOS EMAIL DE ACTIVACION DE CUENTA
          /* this.emailService.sendEmail(createUserDto.email,'Active account','activate-account',{
            name: `${createUserDto.firstnames} ${createUserDto.lastnames}`,
            url: process.env.URLWEB +'/activate-account/'+codeActivation+'/'+createUserDto.email
          }) */
          resolve(result);
      } catch (error) {
          console.log(error);
          APP_LOGGER.info(error);
          reject(error);
      }
    });
  }

  activateAccount(verificationCode: string,email: string){
    return new Promise(async(resolve,reject)=>{
      try {
        const user = await this.users.findOne({where:{email}});
        if(!user){
          throw new HttpException({ message: 'email_not_found' }, HttpStatus.UNPROCESSABLE_ENTITY);
        }else{
          if(user.verificationCode == null){
            await this.users.update({verificationCode: null,userStatus: 'active'}, {where: {id: user.id}});
          }else{
            if(user.verificationCode != verificationCode){
              throw new HttpException({ message: 'verification_code_not_found' }, HttpStatus.UNPROCESSABLE_ENTITY);
            }else{
              await this.users.update({verificationCode: null,userStatus: 'active'}, {where: {id: user.id}});
            }
          }
        }
        const accessToken = await this.createTokenUsers(user);
        resolve({accessToken});
      } catch (error) {
        console.log(error);
        reject(error);
      }
    })
  }

  async createTokenUsers(payload: Users) {
    try {
        const dataPayload = {
            id: payload.id,
        }
        const accessToken = await this.jwtService.sign({
            dataPayload
        });
        return accessToken;
    } catch (error) {
        APP_LOGGER.error('CREATE TOKEN: ',new Error(JSON.stringify(error)));
        return error;
    }
}

  async list(limit,page) {
    return new Promise(async (resolve,reject)=>{
        try {
            const querybase: FindOptions =  {};
            const querybaseCount: CountOptions = querybase;
            querybaseCount.distinct = true;
            const counter: any = await this.users.findAndCountAll(querybaseCount);
            const offset: number = ((page - 1) * limit);
            querybase.limit = parseInt(limit+'');
            querybase.offset = offset;
            const result =  await this.users.findAll(querybase);
            const pages: number = Math.ceil(counter.count / limit);
            resolve({
                result,
                count: counter.count,
                pages,
            });
            resolve(result);
        } catch (error) {
          APP_LOGGER.info(error);
          reject(error);
        }
    })
}

// Detalle de Pais
async detail(id: string) {
    return new Promise(async(resolve,reject)=>{
        try {
            const result: any =  await this.users.findOne({
                where: {
                    id,
                },
                attributes:{
                  exclude: ['password']
                }
            });
            if (!result) {
                throw new HttpException({ message: 'user_not_found' }, HttpStatus.UNPROCESSABLE_ENTITY);
            }
            resolve(result);
        } catch (error) {
          APP_LOGGER.info(error);
          reject(error);
        }
    })
}

  update(id: string, updateUserDto: Partial<UpdateUserDto>) {
    return new Promise(async (resolve, reject) => {
      try {
          const existPais = await this.users.findOne({ where: { id } });
          if (!existPais) {
              throw new HttpException({ message: 'user_not_found' }, HttpStatus.UNPROCESSABLE_ENTITY);
          }
          if(updateUserDto.password !=null){
            updateUserDto.password = await bcrypt.hashSync(updateUserDto.password, 10);
          }
          const result = await this.users.update(updateUserDto, {
              where: {
                  id, 
              },
              returning: true,
          });
          resolve(result);
      } catch (error) {
        APP_LOGGER.info(error);
        reject(error);
      }
  });
  }

  remove(id: string) {
    return new Promise(async (resolve, reject) => {
      try {
          const result = await this.users.findOne({ where: { id } })
          if (!result) {
              throw new HttpException({ message: 'user_not_found' }, HttpStatus.NOT_FOUND)
          }
          await this.users.destroy({
              where: {
                  id,
              },
          });
          resolve({
            status: 1,
            message: 'user_deleted'
        })
      } catch (error) {
        APP_LOGGER.info(error);
        reject(error);
      }
    });
  }
  searchEmail(email: string){
    return new Promise(async (resolve, reject) => {
      try {
          let statusUser = true;
          const result = await this.users.findOne({ where: { email } })
          if (!result) {
              statusUser = false;
          }else{
            statusUser = true;
          }
          resolve({
            statusUser
        })
      } catch (error) {
        APP_LOGGER.info(error);
        reject(error);
      }
    });
  }
}
