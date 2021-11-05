import { Injectable } from '@nestjs/common';
import { CreateRedcapDto } from './dto/create-redcap.dto';
import { UpdateRedcapDto } from './dto/update-redcap.dto';

@Injectable()
export class RedcapService {
  create(createRedcapDto: CreateRedcapDto) {
    return 'This action adds a new redcap';
  }

  findAll() {
    return `This action returns all redcap`;
  }

  findOne(id: number) {
    return `This action returns a #${id} redcap`;
  }

  update(id: number, updateRedcapDto: UpdateRedcapDto) {
    return `This action updates a #${id} redcap`;
  }

  remove(id: number) {
    return `This action removes a #${id} redcap`;
  }
}
