import {random} from "lodash";
import moment from "moment";

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

function generateRandomTweet() {
    const text = `${TWEET_OPTIONS[random(0, TWEET_OPTIONS.length - 1)]} ${HASHTAG}`;
    const tweet = {
        id: random(1000000, 999999999),
        text: text,
        created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
        user: {
            id: random(10000, 99999999),
            name: `User${random(1, 1000)}`
        }
    };
    return JSON.stringify(tweet);
}

function tweetStreamSimulation(tweetsPerMinute: number) {
    const interval = 60000 / tweetsPerMinute; // Calculate interval in milliseconds
    let count = 0;

    const generateAndLogTweet = () => {
        generateRandomTweet(); // Generate tweet
        count++;
        console.log(`Tweet Count: ${count}`);
    };

    setInterval(generateAndLogTweet, interval);
}

tweetStreamSimulation(1000);