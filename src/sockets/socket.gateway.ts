
import { WebSocketGateway,WebSocketServer,SubscribeMessage } from '@nestjs/websockets';
import {Server } from 'socket.io';
import * as dotenv from 'dotenv';
dotenv.config();
// tslint:disable-next-line: radix
@WebSocketGateway(parseInt(process.env.PORT_SOCKET))
export class SocketGateway{
    @WebSocketServer() server: Server;
    numberUsers: number = 0;
    constructor(
    ) {}
    async handleConnection(){
        // A client has connected
        this.numberUsers++;
        // Notify connected clients of current users
        this.server.emit('users', this.numberUsers);
        // console.log("#users:"+this.numberUsers); 

    }
    async handleDisconnect(){
        // A client has disconnected
        this.numberUsers--;
        // Notify connected clients of current users
        this.server.emit('users', this.numberUsers);
        // console.log("#users:"+this.numberUsers); 
    }
    async actualizarTotalTokens(userId) {
        try {
            this.server.emit('actualizar-total-tokens', {userId});
            // console.log('event emit - actualizar total tokens - userId '+ userId);
        } catch (error) {}
    }
    async actualizarNumeroNotificaciones(userId) {
        try {
            // console.log('enviando event emit - actualizar numero notificaiones - userId '+ userId);
            this.server.emit('actualizar-numero-notificaciones', {userId});
            // console.log('socket enviado event emit - actualizar numero notificaiones - userId '+ userId);
            
        } catch (error) {}
    }
    async actualizarHistorialTransferencia(userId) {
        try {
            // console.log('enviando event emit - actualizar historial transferencia - userId '+ userId);
            this.server.emit('actualizar-historial-transferencias', {userId});
            // console.log('socket event emit enviado - actualizar historial transferencia - userId '+ userId);
        } catch (error) {}
    }
}
