import { PartialType } from '@nestjs/swagger';
import { CreateRedcapDto } from './create-redcap.dto';

export class UpdateRedcapDto extends PartialType(CreateRedcapDto) {}
