import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
export class UploadFileDto {
    @ApiPropertyOptional()
    @IsString()
    @IsNotEmpty()
    file: string;
}
export class ArmsDeleteDto {
    @ApiPropertyOptional()
    @IsString()
    @IsNotEmpty()
    arms: string;
}
export class DagsDeleteDto {
    @ApiPropertyOptional()
    @IsString()
    @IsNotEmpty()
    dags: string;
}