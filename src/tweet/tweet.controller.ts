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
    await this.tweetRepository.create(data);
  }
}
