import { ApiPropertyOptional } from '@nestjs/swagger';
import { Column, DataType, Table, Model, ForeignKey, CreatedAt, UpdatedAt, BelongsTo, HasMany, BelongsToMany, HasOne } from 'sequelize-typescript';
import { v4 as uuidv4} from 'uuid';
@Table({
    tableName: 'users'
})
export class Users extends Model<Users> {
    @ApiPropertyOptional()
    @Column({
        type: DataType.UUIDV4,
        defaultValue: ()=>{
            return uuidv4();
        },
        allowNull: false,
        unique: true,
        primaryKey: true,
    })
    public id: string;
    @ApiPropertyOptional()
    @Column({
        type: DataType.STRING,
        allowNull: true,
        validate: {
            notEmpty: false,
        },
        field: 'email',
    })
    email: string;

    @ApiPropertyOptional()
    @Column({
        type: DataType.STRING,
        allowNull: true,
        validate: {
            notEmpty: false,
        },
        field: 'phone',
    })
    phone: string;
    @ApiPropertyOptional()
    @Column({
        type: DataType.STRING,
        allowNull: true,
        validate: {
            notEmpty: false,
        },
        field: 'address',
    })
    address: string;

    @ApiPropertyOptional()
    @Column({
        type: DataType.STRING,
        allowNull: true,
        validate: {
            notEmpty: false,
        },
        field: 'first_names',
    })
    firstnames: string;

    @ApiPropertyOptional()
    @Column({
        type: DataType.STRING,
        allowNull: true,
        validate: {
            notEmpty: false,
        },
        field: 'last_names',
    })
    lastnames: string;


    @ApiPropertyOptional()
    @Column({
        type: DataType.STRING,
        allowNull: true,
        validate: {
            notEmpty: false,
        },
        field: 'avatar',
    })
    avatar: string;

    @ApiPropertyOptional()
    @Column({
        type: DataType.ENUM('male', 'female'),
        allowNull: true,
        validate: {
            notEmpty: false,
        },
        field: 'gender',
    })
    gender: string;

    @ApiPropertyOptional()
    @Column({
        type: DataType.ENUM('created', 'contacted','joined'),
        allowNull: true,
        validate: {
            notEmpty: false,
        },
        field: 'referal_status',
    })
    referalStatus: string;

 


    @ApiPropertyOptional()
    @Column({
        type: DataType.STRING,
        allowNull: true,
        validate: {
            notEmpty: false,
        },
        field: 'profile_id',
    })
    profileId: string;


    @ApiPropertyOptional()
    @Column({
        type: DataType.ENUM('audience', 'artist', 'host', 'admin'),
        allowNull: true,
        validate: {
            notEmpty: false,
        },
        field: 'profile_type',
    })
    profileType: string;

    @ApiPropertyOptional()
    @Column({
        type: DataType.ENUM('venmo', 'paypal', 'zelle'),
        allowNull: true,
        validate: {
            notEmpty: false,
        },
        field: 'digital_payment',
    })
    digitalPayment: string;


    @ApiPropertyOptional()
    @Column({
        type: DataType.STRING,
        allowNull: true,
        validate: {
            notEmpty: false,
        },
        field: 'digital_payment_account_name',
    })
    digitalPaymentAccountName: string;

    @ApiPropertyOptional()
    @Column({
        type: DataType.STRING,
        allowNull: true,
        validate: {
            notEmpty: false,
        },
        field: 'country_id',
    })
    countryId: string;

    @ApiPropertyOptional()
    @Column({
        type: DataType.STRING,
        allowNull: true,
        validate: {
            notEmpty: false,
        },
        field: 'country',
    })
    country: string;

    @ApiPropertyOptional()
    @Column({
        type: DataType.STRING,
        allowNull: true,
        validate: {
            notEmpty: false,
        },
        field: 'state_id',
    })
    stateId: string;

    @ApiPropertyOptional()
    @Column({
        type: DataType.STRING,
        allowNull: true,
        validate: {
            notEmpty: false,
        },
        field: 'state',
    })
    state: string;


    @ApiPropertyOptional()
    @Column({
        type: DataType.STRING,
        allowNull: true,
        validate: {
            notEmpty: false,
        },
        field: 'city',
    })
    city: string;

    @ApiPropertyOptional()
    @Column({
        type: DataType.STRING,
        allowNull: true,
        validate: {
            notEmpty: false,
        },
        field: 'google_maps_link',
    })
    googleMapsLink: string;

    @ApiPropertyOptional()
    @Column({
        type: DataType.STRING,
        allowNull: true,
        validate: {
            notEmpty: false,
        },
        field: 'lat',
    })
    lat: string;

    @ApiPropertyOptional()
    @Column({
        type: DataType.STRING,
        allowNull: true,
        validate: {
            notEmpty: false,
        },
        field: 'lng',
    })
    lng: string;

    @ApiPropertyOptional()
    @Column({
        type: DataType.BOOLEAN,
        allowNull: true,
        validate: {
            notEmpty: false,
        },
        field: 'host_profile',
    })
    hostProfile: boolean;

    @ApiPropertyOptional()
    @Column({
        type: DataType.BOOLEAN,
        allowNull: true,
        validate: {
            notEmpty: false,
        },
        field: 'artist_profile',
    })
    artistProfile: boolean;

    @ApiPropertyOptional()
    @Column({
        type: DataType.BOOLEAN,
        allowNull: true,
        validate: {
            notEmpty: false,
        },
        field: 'admin_profile',
    })
    adminProfile: boolean;

    @ApiPropertyOptional()
    @Column({
        type: DataType.STRING,
        allowNull: true,
        validate: {
            notEmpty: false,
        },
        field: 'verification_code',
    })
    verificationCode: string;

    @ApiPropertyOptional()
    @Column({
        type: DataType.STRING,
        allowNull: true,
        validate: {
            notEmpty: false,
        },
        field: 'password',
    })
    password: string;

    @ApiPropertyOptional()
    @Column({
        type: DataType.STRING,
        allowNull: true,
        validate: {
            notEmpty: false,
        },
        field: 'recuperation_code',
    })
    recuperationCode: string;

    @ApiPropertyOptional()
    @Column({
        type: DataType.STRING,
        allowNull: true,
        validate: {
            notEmpty: false,
        },
        field: 'referal_name',
    })
    referalName: string;

    @ApiPropertyOptional()
    @Column({
        type: DataType.STRING,
        allowNull: true,
        validate: {
            notEmpty: false,
        },
        field: 'referal_phone',
    })
    referalPhone: string;

    @ApiPropertyOptional()
    @Column({
        type: DataType.STRING,
        allowNull: true,
        validate: {
            notEmpty: false,
        },
        field: 'referal_phone_code',
    })
    referalPhoneCode: string;

    @ApiPropertyOptional()
    @Column({
        type: DataType.STRING,
        allowNull: true,
        validate: {
            notEmpty: false,
        },
        field: 'phone_code',
    })
    phoneCode: string;

    @ApiPropertyOptional()
    @Column({
        type: DataType.ENUM('active', 'unactive'),
        allowNull: true,
        validate: {
            notEmpty: false,
        },
        field: 'user_status',
    })
    userStatus: string;

    @ApiPropertyOptional()
    @Column({
        type: DataType.ENUM(
            'phone',
            'email',
            'facebook',
            'instagram',
            'twitter',
            'google',
            'youtube',
            'linkedin',
            'wordOfMouth',
            'anotherVenue',
            'university',
            'artistFriend',
            'artOrganization',
            'inPersonEvent',
            'discoveredAnEvent',
            'other',
        ),
        allowNull: true,
        validate: {
            notEmpty: false,
        },
        field: 'musa_how_did_you_hear',
    })
    musaHowDidYouHear: string;
    @ApiPropertyOptional()
    @Column({
        type: DataType.STRING,
        allowNull: true,
        validate: {
            notEmpty: false,
        },
        field: 'musa_referal',
    })
    musaReferal: string;
    @ApiPropertyOptional()
    @Column({
        type: DataType.STRING,
        allowNull: true,
        validate: {
            notEmpty: false,
        },
        field: 'exhibition_id',
    })
    exhibitionId: string;
    @ApiPropertyOptional()
    @Column({
        type: DataType.STRING,
        allowNull: true,
        validate: {
            notEmpty: false,
        },
        field: 'popup_id',
    })
    popupId: string;
    @CreatedAt public created_at: Date;
    @UpdatedAt public updated_at: Date;
}