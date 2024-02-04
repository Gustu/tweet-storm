import {Module} from "@nestjs/common";
import {TweetController} from "./tweet.controller";
import {TweetRepository} from "./tweet.repository";
import {DatabaseModule} from "../database/database.module";
import {ArchiveTweetsJob} from "./archive-tweets.job";

@Module({
    imports: [DatabaseModule],
    providers: [TweetRepository, ArchiveTweetsJob],
    controllers: [TweetController],
    exports: [],
})
export class TweetModule {}