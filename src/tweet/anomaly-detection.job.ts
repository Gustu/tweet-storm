import {Injectable, Logger} from '@nestjs/common';
import {Cron} from '@nestjs/schedule';
import {TweetRepository} from "./tweet.repository";
import {AlertRepository} from "./alert.repository";
import {AlertType} from "./alert";

const WINDOW_SIZE_IN_MINUTES = 5; // 5 minutes
const WINDOW_COMPARISON_SIZE = 10; // 50 minutes

@Injectable()
export class AnomalyDetectionJob {
    private readonly logger = new Logger(AnomalyDetectionJob.name);

    constructor(private readonly tweetRepository: TweetRepository, private readonly alertRepository: AlertRepository) {
    }

    @Cron('*/5 * * * * *')
    async analyzeWindow() {
        this.logger.log('Analyzing tweet window...');
        const now = new Date();

        const windowStart = new Date(now.getTime() - (WINDOW_SIZE_IN_MINUTES * 60000));
        const windowEnd = now;

        const counts = await this.tweetRepository.countInWindows(WINDOW_SIZE_IN_MINUTES, WINDOW_COMPARISON_SIZE);

        this.logger.log(`Window start: ${windowStart}, window end: ${windowEnd}`);
        this.logger.log(`Counts: ${JSON.stringify(counts.map(c => c.count))}`);

        const prevFullWindows = counts.slice(0, -1);
        const currentWindow = counts[counts.length - 1];

        const prevFullWindowsAverage = prevFullWindows.reduce((acc, curr) => acc + curr.count, 0) / prevFullWindows.length;
        this.logger.log(`Previous full windows average: ${prevFullWindowsAverage}`);
        this.logger.log(`Current window: ${currentWindow.count}`);

        const isCurrentWindowAboveThreshold = currentWindow.count > prevFullWindowsAverage * 2;

        if (isCurrentWindowAboveThreshold) {
            this.logger.log(`Current window is above threshold. Alerting...`);
            const alert = await this.alertRepository.findAlertByTypeInWindow(AlertType.DOUBLED_AVG_TWEET_COUNT, windowStart, windowEnd);


            await this.alertRepository.create({
                type: AlertType.DOUBLED_AVG_TWEET_COUNT,
                created_at: now,
                params: {
                    windowStart,
                    windowEnd,
                    currentWindowCount: currentWindow.count,
                    prevFullWindowsAverage,
                },
            });
        }
    }
}