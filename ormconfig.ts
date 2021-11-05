import * as dotenv from 'dotenv';
dotenv.config();
const configDatabase: any = {
    username: process.env.USERNAME_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DATABASE,
    host: process.env.HOST_DATABASE,
    dialect: process.env.DIALECT,
    port: parseInt(process.env.PORT_DB),
    operatorsAliases: process.env.OPERATORSALIASES,
    logging: false,
    
}
export {
    configDatabase,
}