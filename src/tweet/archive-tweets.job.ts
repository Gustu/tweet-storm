
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import {TweetRepository} from "./tweet.repository";

@Injectable()
export class ArchiveTweetsJob {
    private readonly logger = new Logger(ArchiveTweetsJob.name);

    constructor(private readonly tweetRepository: TweetRepository) {
    }

    @Cron('*/5 * * * * *')
    async archiveOldTweets() {
        this.logger.log('Archiving old tweets...');

        // approximate archive of 100000 tweets (tweets can come faster than the job runs)
        await this.tweetRepository.archiveOldTweets(100000);
    }
}