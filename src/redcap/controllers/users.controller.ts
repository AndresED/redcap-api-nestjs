import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, UseInterceptors } from '@nestjs/common';
import { AppExceptionFilter } from '../../shared/filters/app-exception.filter';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ResponseInterceptor } from '../../shared/interceptors/response.interceptor';
import { UsersRedcapService } from '../services/users.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { arrayFiles, localOptions } from '../multer.option';
import { UploadFileDto } from '../dto/create-redcap.dto';
@Controller('users')
@ApiTags('Users')
@UseFilters(new AppExceptionFilter())
@UseInterceptors(ResponseInterceptor)
export class UsersController {
    constructor(
        private readonly usersRedcapService: UsersRedcapService,
    ) { }

    @Post('import')
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileFieldsInterceptor(arrayFiles, localOptions))
    importEvents(@Body() fileData: UploadFileDto) {
        return this.usersRedcapService.import(fileData);
    }
    @Post('export')
    export() {
        return this.usersRedcapService.export();
    }
}