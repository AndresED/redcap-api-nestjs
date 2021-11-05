import { Sequelize } from 'sequelize-typescript';
import { modelsPath } from '../../../db/entitys';
import { configDatabase } from '../../../ormconfig';
export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize(configDatabase);
            sequelize.addModels(modelsPath);
            return sequelize;
        },
    },
];