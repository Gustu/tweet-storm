import {Connection} from 'mongoose';
import {TweetSchema} from "../schemas/tweet.schema";
import {ALERT_MODEL, DATABASE_CONNECTION, TWEET_MODEL} from "../contants";
import {AlertSchema} from "../schemas/alert.schema";

export const schemaProviders = [
    {
        provide: TWEET_MODEL,
        useFactory: (connection: Connection) => connection.model('Tweet', TweetSchema),
        inject: [DATABASE_CONNECTION],
    },
    {
        provide: ALERT_MODEL,
        useFactory: (connection: Connection) => connection.model('Alert', AlertSchema),
        inject: [DATABASE_CONNECTION],
    }
];