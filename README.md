# Tweet Storm Analysis

## Introduction

This project allows to simulate tweet traffic and monitor tweets in real-time to detect anomalies. 

## Architecture

The project is composed of 3 main components:
- tweet-generator: a simple node.js application that generates tweets and sends them to Redis
- tweet-monitor: a node.js application that consumes tweets from Redis and analyzes them
- Redis: a message broker that allows to decouple the tweet-generator and tweet-monitor
- MongoDB: a database that stores the tweets and alerts

## Usage

1. docker-compose up -d
3. cd tweet-generator && yarn && yarn start X (X is the number of tweets to generate per minute)
4. cd tweet-monitor && yarn && yarn start:dev


## Future Work

Allowing other platforms: 

The project is currently limited to Twitter, but it could be extended to other platforms such as Facebook, Instagram, etc. 
TweetSchema could be transformed to more universal schema which would consist of the platform name and additional params.
Currently, the monitor is not analyzing the content, but only counts, so we can easily use it for all platforms.

## Time Spent

1. Setup - 30m
2. Tweet Generator - 30m
3. Redis communication - 1.5h
4. Archiving tweets - 1.5h
5. Tweet Monitor - 1h