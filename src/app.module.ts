import {Module} from '@nestjs/common';
import {ClientsModule, Transport} from "@nestjs/microservices";
import {TweetModule} from "./tweet/tweet.module";
import {ScheduleModule} from "@nestjs/schedule";

@Module({
    imports: [
        ScheduleModule.forRoot(),
        ClientsModule.register([{
            name: 'TWEET_SERVICE',
            transport: Transport.REDIS,
            options: {
                host: 'localhost',
                port: 6379,
            }
        },]),
        TweetModule
    ],
    providers: [],
    controllers: [],
})
export class AppModule {
}
