
import { Module } from '@nestjs/common';
import { databaseProviders } from './config/database.provider';
import {schemaProviders} from "./config/schema.providers";

@Module({
    providers: [...databaseProviders, ...schemaProviders],
    exports: [...databaseProviders, ...schemaProviders],
})
export class DatabaseModule {}