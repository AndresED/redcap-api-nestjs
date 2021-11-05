import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { APP_LOGGER } from '../../logger/index';
import { Users } from '../../db/entitys/users';
import * as admin from 'firebase-admin';
import ShortUniqueId from 'short-unique-id';
import { v4 as uuidv4} from 'uuid';
import { EmailService } from '../shared/services/email.service';
dotenv.config();
@Injectable()
export class AuthService { 
    admin = admin;
    constructor(
        @Inject('UsersRepository') private readonly users: typeof Users,
        private readonly jwtService: JwtService,
        private emailService: EmailService
    ) { 
    }
    // LOGIN
    async auth(email: string, password: string){
        return new Promise(async(resolve,reject)=>{
            try {
                const users = await this.users.findOne({
                    where: {
                        email,
                    },
                });
                if(!users){
                    throw new HttpException({ message: 'email_not_found' }, HttpStatus.UNPROCESSABLE_ENTITY);
                }
                if (!bcrypt.compareSync(password,users.password)) {
                    throw new HttpException({ message: 'password_incorrect' }, HttpStatus.UNPROCESSABLE_ENTITY);
                }
                if(users.userStatus === 'unactive'){
                    throw new HttpException({ message: 'user_disable' }, HttpStatus.UNPROCESSABLE_ENTITY);
                }
                const token = await this.createTokenUsers(users);
                resolve({
                    accessToken: token,
                });
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }
    


    // CREACIÓN DEL TOKEN DE SESIÓN
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

    // Solicitud de recuperación de contraseña
    async requestPassword(email: string) {
        return new Promise(async (resolve, reject) => {
            try {
                // VERIFICAMOS QUE EL EMAIL INGRESADO EXISTA
                const dataUser = await this.users.findOne({
                    where: {
                        email,
                    },
                });
                if (!dataUser) {
                    throw new HttpException({ message: 'email_not_found' }, HttpStatus.UNPROCESSABLE_ENTITY);
                }
                // GENERO CODIGO Y URL
                let code = await uuidv4();
                code = code.toLocaleLowerCase();
                const url = `${process.env.URLWEB}/change-pwd/${code}`;
                // ACTUALIZAMOS EL CODIGO DE RECUPERACION DE LA CUENTA QUE SOLICITA EL CAMBIO DE CONTRASEÑA
                await this.users.update({recuperationCode: code}, {where: {email}});
                // ENVIAMOS EL EMAIL DE RECUPERACION DE CONTRASEÑA
                this.emailService.sendEmail(email, 'Recuperation Password', 'resetpassword', {
                    name: `${dataUser.firstnames} ${dataUser.lastnames}`,
                    email,
                    url,
                });
                resolve('email_send');
            } catch (error) {
                APP_LOGGER.error('REQUEST RESET PASSWORD: ', new Error(JSON.stringify(error)));
                reject(error);
            }
        });
    }
    // Verificación de codigo de solicitud de recuperación de contraseña
    async validateCode(code: string) {
        return new Promise(async (resolve, reject) => {
            try {
                // VERIFICANDO QUE EL CODIGO DE RECUPERACIÓN EXISTA
                const dataUser = await this.users.findOne({
                    where: {
                        recuperationCode: code,
                    },
                });
                if (!dataUser) {
                    throw new HttpException({ message: 'code_not_found' }, HttpStatus.UNPROCESSABLE_ENTITY);
                }
                resolve('code_validate');
            } catch (error) {
                APP_LOGGER.error('VALIDATE CODE: ', new Error(JSON.stringify(error)));
                reject(error);
            }
        });
    }

    // ACTUALIZACIÓN DE CONTRASEÑA
    async resetPassword(code, password) {
        return new Promise(async (resolve, reject) => {
            try {
                // VERIFICANDO QUE EL CODIGO EXISTA
                const dataUser = await this.users.findOne({
                    where: {
                        recuperationCode: code,
                    },
                });
                if (!dataUser) {
                    throw new HttpException({ message: 'code_not_found' }, HttpStatus.UNPROCESSABLE_ENTITY);
                }
                // CIFRANDO NUEVA CONTRASEÑA
                const pwd = await bcrypt.hashSync(password, 10);
                // ACTUALIZANDO CONTRASEÑA Y SETEANDO A NULL EL CODIGO DE RECUPERACIÓN
                await this.users.update({password: pwd, recuperationCode: null}, {where: {id: dataUser.id}});
                const accessToken = await this.createTokenUsers(dataUser);
                resolve({accessToken});
            } catch (error) {
                APP_LOGGER.error('RESET PASSWORD: ', new Error(JSON.stringify(error)));
                reject(error);
            }
        });
    }
}
