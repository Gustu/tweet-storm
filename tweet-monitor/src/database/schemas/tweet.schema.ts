import mongoose from "mongoose";

export type Tweet = {
    id: number;
    text: string;
    created_at: Date;
    user: {
        id: number;
        name: string;
    }
};

export const TweetSchema = new mongoose.Schema<Tweet>({
    id: Number,
    text: String,
    created_at: { type: Date, index: true },
    user: {
        id: Number,
        name: String,
    }
});