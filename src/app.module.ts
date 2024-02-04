import {Module} from '@nestjs/common';
import {TweetController} from './tweet/tweet.controller';
import {ClientsModule, Transport} from "@nestjs/microservices";
import {TweetRepository} from "./tweet/tweet.repository";
import {DatabaseModule} from "./database/database.module";

@Module({
    imports: [ClientsModule.register([
        {
            name: 'TWEET_SERVICE',
            transport: Transport.REDIS,
            options: {
                host: 'localhost',
                port: 6379,
            }
        },
    ]), DatabaseModule],
    providers: [TweetRepository],
    controllers: [TweetController],
})
export class AppModule {
}
