import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RedcapService } from './redcap.service';
import { CreateRedcapDto } from './dto/create-redcap.dto';
import { UpdateRedcapDto } from './dto/update-redcap.dto';

@Controller('redcap')
export class RedcapController {
  constructor(private readonly redcapService: RedcapService) {}

  @Post()
  create(@Body() createRedcapDto: CreateRedcapDto) {
    return this.redcapService.create(createRedcapDto);
  }

  @Get()
  findAll() {
    return this.redcapService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.redcapService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRedcapDto: UpdateRedcapDto) {
    return this.redcapService.update(+id, updateRedcapDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.redcapService.remove(+id);
  }
}
