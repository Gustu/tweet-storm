import mongoose from "mongoose";

export type Alert = {
    anomaly: string;
    created_at: Date;
};

export const AlertSchema = new mongoose.Schema<Alert>({
    anomaly: String,
    created_at: { type: Date, index: true },
});
