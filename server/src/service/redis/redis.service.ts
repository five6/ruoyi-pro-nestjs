import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
@Injectable()
export class RedisService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  //设置数据
  async set(key: string, value: any, seconds?: number) {
    value = JSON.stringify(value);
    if (seconds) {
      await this.redis.set(key, value, 'EX', seconds);
    } else {
      await this.redis.set(key, value);
    }
  }
  //获取数据
  async get(key: string) {
    const data = await this.redis.get(key);
    if (!data) {
      return null;
    }
    return JSON.parse(data);
  }

  async setHash(hashKey: string, key: string, value: any) {
    value = JSON.stringify(value);
    await this.redis.hset(hashKey, key, value);
  }

  async getHash(hashKey: string, key: string) {
    const data = await this.redis.hget(hashKey, key);
    if (!data) {
      return null;
    }
    return JSON.parse(data);
  }

  async remove(key: string) {
    await this.redis.del(key);
  }

  async hremove(key: string) {
    await this.redis.hdel(key);
  }

  //删除全部
  async clear() {
    await this.redis.flushdb();
  }
}
