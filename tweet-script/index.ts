import {random} from "lodash";
import moment from "moment";

import Redis from "ioredis";

const redis = new Redis(); // Connects to 127.0.0.1:6379 by default

type Tweet = {
    id: number;
    text: string;
    created_at: string;
    user: {
        id: number;
        name: string;
    }
};

// Constants
const HASHTAG = '#YourHashtag';
const TWEET_OPTIONS = [
    "This is a great day for",
    "Really excited about",
    "Let's discuss",
    "I have some thoughts about",
    "What do you think about",
    "I'm really passionate about",
];

function publishTweet(tweet: Tweet) {
    redis.publish('tweet_channel', JSON.stringify(tweet));
}

function generateRandomTweet(): Tweet {
    const text = `${TWEET_OPTIONS[random(0, TWEET_OPTIONS.length - 1)]} ${HASHTAG}`;
    return {
        id: random(1000000, 999999999),
        text: text,
        created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
        user: {
            id: random(10000, 99999999),
            name: `User${random(1, 1000)}`
        }
    };
}

function tweetStreamSimulation(tweetsPerMinute: number) {
    const interval = 60000 / tweetsPerMinute; // Calculate interval in milliseconds
    let count = 0;

    const generateAndLogTweet = () => {
        const tweet = generateRandomTweet(); // Generate tweet
        publishTweet(tweet); // Publish tweet to Redis
        count++;

        if (count % 50 === 0) {
            console.log(`Published ${count} tweets`);
        }
    };

    setInterval(generateAndLogTweet, interval);
}

// take number of tweets from command line
const args = process.argv.slice(2);
const tweetsPerMinute = parseInt(args[0]);

tweetStreamSimulation(tweetsPerMinute);