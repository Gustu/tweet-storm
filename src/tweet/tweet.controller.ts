import {Controller, Injectable, Logger} from '@nestjs/common';
import {Ctx, MessagePattern, Payload, RedisContext} from "@nestjs/microservices";
import {TweetRepository} from "./tweet.repository";
import {Tweet} from "../database/schemas/tweet.schema";

@Controller()
export class TweetController {
  private readonly logger = new Logger(TweetController.name);

  constructor(private readonly tweetRepository: TweetRepository) {

  }

  @MessagePattern('tweet_channel')
  async handleTweetPublished(@Payload() data: Tweet, @Ctx() context: RedisContext) {
    this.logger.log(`Received message: ${JSON.stringify(data)}`);
    this.logger.log(`Channel: ${context.getChannel()}`);

    // Save the tweet to the database
    await this.tweetRepository.create(data);
  }
}
