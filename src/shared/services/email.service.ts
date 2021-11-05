import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as Email from 'email-templates';
import * as dotenv from 'dotenv';
dotenv.config();
@Injectable()
export class EmailService {
    constructor() {}
    parseBoolean(value){
        if(value=="true"){
            return true;
        } else {
            return false;
        }
    }
    async sendEmail(destinatario, asunto, tipoMensaje, datos) {
        try {
            return new Promise(async (resolve, reject) => {
                let status;
                const email = new Email();
                let routeTemplate = '../src/shared/templates/welcome';
                switch(tipoMensaje){
                    case 'welcome':
                        routeTemplate = '../src/shared/templates/welcome';
                        break;
                    case 'resetpassword':
                        routeTemplate = '../src/shared/templates/resetpassword';
                        break;
                }
                await email 
                        .render(routeTemplate, datos)
                        .then(async (resultado) => {
                            // crear un objeto de transporte reutilizable usando SMTP transport
                            const transporter = nodemailer.createTransport({
                                service: process.env.MAIL_SERVICE,
                                host: process.env.MAIL_HOST,
                                port: process.env.MAIL_PORT,
                                secure: process.env.MAIL_SECURE,
                                auth: {
                                    user: process.env.MAIL_USER,
                                    pass: process.env.MAIL_PASSWORD,
                                },
                                tls: {
                                    rejectUnauthorized:  this. parseBoolean(process.env.MAIL_REJECT_UNAUTHORIZED)
                                }
                            });
                            // configura los datos del correo
                            let mailOptions = {
                                from: `Musa <${process.env.MAIL_EMAIL_FROM}>`,
                                to: destinatario,
                                subject: asunto,
                                html: resultado,
                            };
                            await transporter.sendMail(mailOptions, async function(error, info) {
                                if (error) {
                                    status = 'error_send_email';
                                    console.log(error);
                                    reject(status);
                                } else {
                                    status = 'success';
                                    resolve(status);
                                }
                            });
                        });
            });
        } catch (error) {
            console.log(error);
            return 'error_send_email';
        }
    }
}
