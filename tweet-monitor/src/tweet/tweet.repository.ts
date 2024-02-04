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

    async countBetween(windowStart: Date, windowEnd: Date): Promise<number> {
        return this.tweetModel.countDocuments({created_at: {$gte: windowStart, $lte: windowEnd}}).exec();
    }

    async countInWindows(windowSizeInMinutes: number, numberOfWindows: number): Promise<{
        window: number;
        count: number;
    }[]> {
        const windowSizeInMilliseconds = windowSizeInMinutes * 60 * 1000;

        // Generate all possible windows
        const allWindows = Array.from({length: numberOfWindows}, (_, i) => i);

        // Get counts from MongoDB
        const countsFromDb = await this.tweetModel.aggregate([
            {
                $match: {
                    created_at: {
                        $gte: new Date(Date.now() - windowSizeInMilliseconds * numberOfWindows)
                    }
                }
            },
            {
                $project: {
                    window: {
                        $floor: {
                            $divide: [
                                {$subtract: [new Date(), "$created_at"]},
                                windowSizeInMilliseconds
                            ]
                        }
                    }
                }
            },
            {
                $group: {
                    _id: "$window",
                    count: {$sum: 1}
                }
            },
            {
                $sort: {_id: 1}
            }
        ]).exec();

        // Convert countsFromDb to a Map for easy lookup
        const countsMap = new Map(countsFromDb.map(window => [window._id, window.count]));

        // Merge allWindows with countsMap
        return allWindows.map(window => ({
            window,
            count: countsMap.get(window) || 0
        })).reverse();
    }
}