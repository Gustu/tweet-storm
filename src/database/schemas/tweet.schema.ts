import * as mongoose from 'mongoose';

export type Tweet = {
    id: number;
    text: string;
    created_at: string;
    user: {
        id: number;
        name: string;
    }
};

export const TweetSchema = new mongoose.Schema<Tweet>({
    id: Number,
    text: String,
    created_at: String,
    user: {
        id: Number,
        name: String,
    }
});