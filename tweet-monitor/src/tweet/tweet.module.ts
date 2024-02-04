import {Module} from "@nestjs/common";
import {TweetController} from "./tweet.controller";
import {TweetRepository} from "./tweet.repository";
import {DatabaseModule} from "../database/database.module";
import {ArchiveTweetsJob} from "./archive-tweets.job";
import {AnomalyDetectionJob} from "./anomaly-detection.job";
import {AlertRepository} from "./alert.repository";

@Module({
    imports: [DatabaseModule],
    providers: [TweetRepository, ArchiveTweetsJob, AnomalyDetectionJob, AlertRepository],
    controllers: [TweetController],
    exports: [],
})
export class TweetModule {
}