import {Inject, Injectable} from "@nestjs/common";
import {TWEET_MODEL} from "../database/contants";
import {Model} from "mongoose";
import {Tweet} from "../database/schemas/tweet.schema";

@Injectable()
export class TweetRepository {
    constructor(
        @Inject(TWEET_MODEL)
        private tweetModel: Model<Tweet>,
    ) {}

    async create(tweet: Tweet): Promise<Tweet> {
        const createdTweet = new this.tweetModel(tweet);
        return createdTweet.save();
    }
}