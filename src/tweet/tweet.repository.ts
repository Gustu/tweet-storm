import {Inject, Injectable} from "@nestjs/common";
import {TWEET_MODEL} from "../database/contants";
import {Model} from "mongoose";
import {Tweet} from "../database/schemas/tweet.schema";

@Injectable()
export class TweetRepository {
    constructor(
        @Inject(TWEET_MODEL)
        private tweetModel: Model<Tweet>,
    ) {
    }

    async create(tweet: Tweet): Promise<Tweet> {
        const createdTweet = new this.tweetModel(tweet);
        return createdTweet.save();
    }

    async archiveOldTweets(numberOfTweetsToKeep: number): Promise<void> {
        const countTweets = await this.tweetModel.countDocuments().exec();
        const tweetsToDelete = countTweets - numberOfTweetsToKeep;

        if (tweetsToDelete > 0) {
            const oldestTweets = await this.tweetModel.find().sort({createdAt: 1}).limit(tweetsToDelete).exec();
            await this.tweetModel.deleteMany({_id: {$in: oldestTweets.map(t => t._id)}});
        }
    }
}