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
export class FilesDeleteDto {
    @ApiPropertyOptional()
    @IsString()
    @IsNotEmpty()
    files: string;
}
export class ProjectsDeleteDto {
    @ApiPropertyOptional()
    @IsString()
    @IsNotEmpty()
    projects: string;
}
export class RecordsDeleteDto {
    @ApiPropertyOptional()
    @IsString()
    @IsNotEmpty()
    records: string;
}
export class FieldNamesDeleteDto {
    @ApiPropertyOptional()
    @IsString()
    @IsNotEmpty()
    fieldnames: string;
}
export class InstrumentsDeleteDto {
    @ApiPropertyOptional()
    @IsString()
    @IsNotEmpty()
    instruments: string;
}
export class LogsDeleteDto {
    @ApiPropertyOptional()
    @IsString()
    @IsNotEmpty()
    logs: string;
}
export class EventsDeleteDto {
    @ApiPropertyOptional()
    @IsString()
    @IsNotEmpty()
    events: string;
}