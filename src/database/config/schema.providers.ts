import {Connection} from 'mongoose';
import {TweetSchema} from "../schemas/tweet.schema";
import {DATABASE_CONNECTION, TWEET_MODEL} from "../contants";

export const schemaProviders = [
    {
        provide: TWEET_MODEL,
        useFactory: (connection: Connection) => connection.model('Tweet', TweetSchema),
        inject: [DATABASE_CONNECTION],
    },
];