import {Test} from "@nestjs/testing";
import {AnomalyDetectionJob} from "./anomaly-detection.job";
import {TweetRepository} from "./tweet.repository";
import {AlertRepository} from "./alert.repository";
import {mock} from "jest-mock-extended";

describe('AnomalyDetectionJob', () => {
    let job: AnomalyDetectionJob;
    const mockTweetRepository = mock<TweetRepository>();
    const mockAlertRepository = mock<AlertRepository>();

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                AnomalyDetectionJob,
                {
                    provide: TweetRepository,
                    useValue: mockTweetRepository,
                }, {
                    provide: AlertRepository,
                    useValue: mockAlertRepository,
                }
            ],
        }).compile();

        job = module.get(AnomalyDetectionJob);
    });


    it('should analyze window', async () => {
        mockTweetRepository.countInWindows.mockResolvedValue([
            {window: 1, count: 1},
            {window: 2, count: 2},
            {window: 3, count: 3},
            {window: 4, count: 4},
            {window: 5, count: 5},
            {window: 6, count: 6},
        ]);

        await job.analyzeWindow();

        expect(mockTweetRepository.countInWindows).toHaveBeenCalled();
    });

    it('should alert if current window is above threshold', async () => {
        mockTweetRepository.countInWindows.mockResolvedValue([
            {window: 1, count: 1},
            {window: 2, count: 2},
            {window: 3, count: 3},
            {window: 4, count: 5},
        ]);

        await job.analyzeWindow();

        expect(mockAlertRepository.create).toHaveBeenCalled();
    });

    it('should not alert if current window is not above threshold', async () => {
        mockTweetRepository.countInWindows.mockResolvedValue([
            {window: 1, count: 1},
            {window: 2, count: 2},
            {window: 3, count: 3},
            {window: 4, count: 4},
        ]);

        await job.analyzeWindow();

        expect(mockAlertRepository.create).not.toHaveBeenCalled();
    });
});