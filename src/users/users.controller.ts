import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, UseInterceptors, Query, UseGuards, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, ActivateAccountDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseInterceptor } from '../shared/interceptors/response.interceptor';
import { AppExceptionFilter } from '../shared/filters/app-exception.filter';
import { JwtAuthGuard } from '../shared/guard/jwt-auth.guard';
@Controller('users')
@ApiTags('Users')
@UseFilters(new AppExceptionFilter())
@UseInterceptors(ResponseInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Permite realizar el registro de un usuario.'})
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @Post('activate-account')
  @ApiOperation({ summary: 'Permite activar una cuenta basado en su codigo de activación.'})
  activateAccount(@Body() activateAccountDto: ActivateAccountDto) {
    return this.usersService.activateAccount(activateAccountDto.verificationCode,activateAccountDto.email);
  }

  @Get()
  @ApiBearerAuth() // Protecctión de recurso mediante autenticación para swagger
  @UseGuards(new JwtAuthGuard()) // Protección de rutas para el endpoint
  @ApiHeader({ name: 'Authorization', required: true })
  @ApiResponse({ type: CreateUserDto, status: 200 })
  @ApiQuery({ name: 'limit', required: true, type: Number })
  @ApiQuery({ name: 'page', required: true, type: Number })
  @ApiOperation({ summary: 'Permite listar los usuarios de manera paginada.'})
  findAll(@Query() query) {
    let limit;
    let page;
    if (query.limit != null && query.limit != 'null' && query.limit != undefined && query.limit != 'undefined'){
      limit = parseInt(query.limit);
    }else{
        limit = null;
    }
    if (query.page != null && query.page != 'null' && query.page != undefined && query.page != 'undefined'){
        page = parseInt(query.page);
    }else{
        page = null;
    }
    return this.usersService.list(limit,page);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Permite ver el detalle de los datos de un usuario'})
  @ApiBearerAuth() // Protecctión de recurso mediante autenticación para swagger
  @UseGuards(new JwtAuthGuard()) // Protección de rutas para el endpoint
  @ApiHeader({ name: 'Authorization', required: true })
  findOne(@Param('id') id: string) {
    return this.usersService.detail(id);
  }

  @Get('search-email/:email')
  @ApiOperation({ summary: 'Buscar si un email esta siendo utilizado'})
  searchEmail(@Param('email') email: string) {
    return this.usersService.searchEmail(email);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Permite actualizar los datos de un usuario'})
  @ApiBearerAuth() // Protecctión de recurso mediante autenticación para swagger
  @UseGuards(new JwtAuthGuard()) // Protección de rutas para el endpoint
  @ApiHeader({ name: 'Authorization', required: true })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Permite eliminar los datos de un usuario'})
  @ApiBearerAuth() // Protecctión de recurso mediante autenticación para swagger
  @UseGuards(new JwtAuthGuard()) // Protección de rutas para el endpoint
  @ApiHeader({ name: 'Authorization', required: true })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

}
