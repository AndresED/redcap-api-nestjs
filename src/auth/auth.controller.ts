import { Controller, Post, UseInterceptors, Headers, Body, Get, Param, Put, Delete, Query, UseFilters } from '@nestjs/common';
import { ResponseInterceptor } from '../shared/interceptors/response.interceptor';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthLoginDto, AuthSocialLoginDto, AuthRequestDto, ResetPasswordDto } from './auth.dto';
import { AuthService } from './auth.service';
import { AppExceptionFilter } from '../shared/filters/app-exception.filter';

@Controller('auth')
@ApiTags('Auth')
@UseInterceptors(ResponseInterceptor)
@UseFilters(new AppExceptionFilter())
export class AuthController {
    constructor(private readonly nameService: AuthService) { }
    // Login de un usuario
    @Post()
    @ApiOperation({ summary: 'Permite realizar el login de un usuario del sistema.'})
    async auth(@Body() body: AuthLoginDto) {
        return await this.nameService.auth(body.email,body.password);
    }
    // Solicitud de recuperación de contraseña
    @Post('request-reset')
    @ApiOperation({ summary: 'Inicia el proceso de recuperación de contraseña mediante el envio de un email'})
    async request(@Body() body: AuthRequestDto) {
        return await this.nameService.requestPassword(body.email);
    }
    // Validar codigo generado por usuario para el reset password
    @Get('validate-code/:code')
    @ApiOperation({ summary: 'Valida el codigo de recuperación de contraseña generado por el sistema.'})
    async validateCode(@Param('code') code: string) {
        return await this.nameService.validateCode(code);
    }
    // Actualizar la contraseña
    @Post('reset-password')
    @ApiOperation({ summary: 'Actualiza la contraseña de un usuario'})
    async resetPassword(@Body() body: ResetPasswordDto) {
        return await this.nameService.resetPassword(body.code,body.password);
    }
}