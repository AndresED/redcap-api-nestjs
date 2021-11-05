import { Users } from '../../db/entitys/users';

export const UsersProvider = {
    provide: 'UsersRepository',
    useValue: Users,
};
