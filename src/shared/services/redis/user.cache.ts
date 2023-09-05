import Logger from 'bunyan';
import { config } from '@root/config';
import { IUserDocument } from "@user/interfaces/user.interface";
import { BaseCache } from "./base.cache";
import { Server } from 'socket.io';

const log: Logger = config.createLogger('redisConnection');

export class UserCache extends BaseCache {
  constructor() {
    super('userCache');
  }

  public async saveUserToCache(key: string, userId: string, createUser: IUserDocument): Promise<void> {
    const createdAt = new Date();
    const { _id, uId, username, email, avatarColor, blocked, blockedBy, postsCount, profilePicture, followersCount, followingCount, notifications, work, location, school, quote, bgImageId, bgImageVersion, social } = createUser;

    const firstList: string[] = [
      '_id',
      `${_id}`,
      'uId',
      `${uId}`,
      'username',
      `${username}`,
      'email',
      `${email}`,
      'avatarColor',
      `${avatarColor}`,
    ];

    const secondList: string[] = [
      'blocked',
      `${blocked}`,
      'blockedBy',
      `${blockedBy}`,
      'postsCount',
      `${postsCount}`,
      'profilePicture',
      `${profilePicture}`,
      'followersCount',
      `${followersCount}`,
      'followingCount',
      `${followingCount}`,
      'notifications',
      `${notifications}`,
    ]

    const thirdList: string[] = [
      'work',
      `${work}`,
      'location',
      `${location}`,
      'school',
      `${school}`,
      'quote',
      `${quote}`,
      'bgImageId',
      `${bgImageId}`,
      'bgImageVersion',
      `${bgImageVersion}`,
    ];

    const dataToSave: string[] = [...firstList, ...secondList,...thirdList]

    try {
      if(!this.client.isOpen) {
        await this.client.connect();
      }
      await this.client.ZADD('user', { score: parseInt(userId, 10), value: `${key}` });
      await this.client.HSET(`users:${key}`, dataToSave);
    } catch (error) {
      log.error(error);
      throw new Error('Server error. Try again.');
    }

  }

}
