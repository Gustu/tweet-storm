import {Controller, Injectable, Logger} from '@nestjs/common';
import {Ctx, MessagePattern, Payload, RedisContext} from "@nestjs/microservices";

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  @MessagePattern('tweet_channel')
  async handleTweetPublished(@Payload() data: any, @Ctx() context: RedisContext) {
    this.logger.log(`Received message: ${JSON.stringify(data)}`);
    this.logger.log(`Channel: ${context.getChannel()}`);
    // Handle the tweet data
  }
}
