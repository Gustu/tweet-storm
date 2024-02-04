import {Inject, Injectable} from "@nestjs/common";
import {ALERT_MODEL} from "../database/contants";
import {Alert} from "../database/schemas/alert.schema";
import {Model} from "mongoose";
import {AlertType} from "./alert";

@Injectable()
export class AlertRepository {
    constructor(
        @Inject(ALERT_MODEL)
        private alertModel: Model<Alert>,
    ) {
    }

    async create(alert: Alert): Promise<Alert> {
        const createdAlert = new this.alertModel(alert);
        return createdAlert.save();
    }

    async findAlertByTypeInWindow(type: AlertType, windowStart: Date, windowEnd: Date): Promise<Alert> {
        return this.alertModel.findOne({type, created_at: {$gte: windowStart, $lte: windowEnd}}).exec();
    }
}