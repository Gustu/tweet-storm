import mongoose from "mongoose";
import {AlertType} from "../../tweet/alert";

export type Alert = {
    type: AlertType;
    params: any;
    created_at: Date;
};

export const AlertSchema = new mongoose.Schema<Alert>({
    type: { type: String, index: true },
    params: { type: mongoose.Schema.Types.Mixed },
    created_at: { type: Date, index: true },
});
