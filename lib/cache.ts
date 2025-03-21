import Redis from "ioredis";



const REDIS_URL = process.env.REDIS_URL as string;
const redis = new Redis(REDIS_URL);



console.log(`Redis connected: ${process.env.REDIS_URL}`);








export async function redisGet<T>(key: string): Promise<T | null> {
  const data = await redis.get(key);
  return data ? JSON.parse(data) as T : null;
}

export async function redisSet<T>(key: string, value: T, ttlSeconds = 60): Promise<void> {
  await redis.set(key, JSON.stringify(value), "EX", ttlSeconds);
}

export async function redisDel(key: string): Promise<void> {
  await redis.del(key);
}

export async function redisGetOrSet<T>(
  key: string,
  fetchFn: () => Promise<T>,
  ttlSeconds = 60
): Promise<T> {
  const cached = await redisGet<T>(key);
  if (cached) {
    console.log(`Cache hit for key: ${key}`);
    return cached;
  }

  console.log(`Cache miss for key : ${key} - fetching fresh data`);
  const fresh = await fetchFn();
  await redisSet(key, fresh, ttlSeconds);
  return fresh;
}
