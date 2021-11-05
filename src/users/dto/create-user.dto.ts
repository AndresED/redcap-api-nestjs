import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional, IsBoolean } from "class-validator";

export class CreateUserDto {
    @ApiPropertyOptional()
    @IsString()
    @IsNotEmpty()
    email: string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    phone: string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    firstnames: string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    referalStatus: string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    lastnames: string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    avatar: string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    gender: string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    musaHowDidYouHear: string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    musaReferal: string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    profileType: string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    address: string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    profileId: string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    digitalPayment: string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    digitalPaymentAccountName: string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    countryId: string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    country: string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    stateId: string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    state: string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    city: string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    googleMapsLink: string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    lat: string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    lng: string;
    @ApiPropertyOptional()
    @IsBoolean()
    @IsOptional()
    hostProfile: boolean;
    @ApiPropertyOptional()
    @IsBoolean()
    @IsOptional()
    artistProfile: boolean;
    @ApiPropertyOptional()
    @IsBoolean()
    @IsOptional()
    adminProfile: boolean;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    verificationCode: string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    password: string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    recuperationCode: string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    userStatus: string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    phoneCode: string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    referalPhoneCode: string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    referalPhone: string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    referalName: string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    exhibitionId: string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    popupId: string;
}


export class ActivateAccountDto{
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    verificationCode: string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    email: string;
}