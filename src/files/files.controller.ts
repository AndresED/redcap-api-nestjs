import { Controller, Post, UseInterceptors, Headers, Body, Get, Param, Put, Delete, Query, UseGuards, UseFilters } from '@nestjs/common';
import { UploadFileDto } from './files.dto';
import { FileService } from './files.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { arrayFiles, localOptions } from './multer.option';
import { AppExceptionFilter } from '../shared/filters/app-exception.filter';
import { ResponseInterceptor } from '../shared/interceptors/response.interceptor';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../shared/guard/jwt-auth.guard';
@Controller('file')
@ApiTags('Files')
@UseFilters(new AppExceptionFilter())
@UseInterceptors(ResponseInterceptor)
export class FileController {
    constructor(private readonly nameService: FileService) { }
    // @ApiBearerAuth() // Protecctión de recurso mediante autenticación para swagger
    // @UseGuards(new JwtAuthGuard()) // Protección de rutas para el endpoint
    // @ApiHeader({ name: 'Authorization', required: true })
    @Post()
    @UseInterceptors(FileFieldsInterceptor(arrayFiles, localOptions))
    async create(@Body() body: UploadFileDto) {
        return await this.nameService.upload(body);
    }
}