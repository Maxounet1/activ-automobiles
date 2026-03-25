interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

class FrontendCache {
  private cache: Map<string, CacheEntry<unknown>>;
  private defaultTTL: number;

  constructor(defaultTTL = 5 * 60 * 1000) {
    this.cache = new Map();
    this.defaultTTL = defaultTTL;
  }

  set<T>(key: string, data: T, ttl?: number): void {
    const now = Date.now();
    const expiresAt = now + (ttl || this.defaultTTL);

    this.cache.set(key, {
      data,
      timestamp: now,
      expiresAt,
    });

    this.cleanupExpired();
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);

    if (!entry) {
      return null;
    }

    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  has(key: string): boolean {
    const entry = this.cache.get(key);

    if (!entry) {
      return false;
    }

    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  private cleanupExpired(): void {
    const now = Date.now();
    const keysToDelete: string[] = [];

    this.cache.forEach((entry, key) => {
      if (now > entry.expiresAt) {
        keysToDelete.push(key);
      }
    });

    keysToDelete.forEach(key => this.cache.delete(key));
  }

  getSize(): number {
    return this.cache.size;
  }

  getStats(): {
    size: number;
    keys: string[];
    oldestEntry: number | null;
    newestEntry: number | null;
  } {
    let oldestTimestamp: number | null = null;
    let newestTimestamp: number | null = null;
    const keys: string[] = [];

    this.cache.forEach((entry, key) => {
      keys.push(key);

      if (oldestTimestamp === null || entry.timestamp < oldestTimestamp) {
        oldestTimestamp = entry.timestamp;
      }

      if (newestTimestamp === null || entry.timestamp > newestTimestamp) {
        newestTimestamp = entry.timestamp;
      }
    });

    return {
      size: this.cache.size,
      keys,
      oldestEntry: oldestTimestamp,
      newestEntry: newestTimestamp,
    };
  }
}

export const vehicleCache = new FrontendCache(10 * 60 * 1000);
export const searchCache = new FrontendCache(3 * 60 * 1000);
export const agencyCache = new FrontendCache(15 * 60 * 1000);

export function getCacheKey(prefix: string, params: Record<string, any>): string {
  const sortedParams = Object.keys(params)
    .sort()
    .map(key => `${key}=${JSON.stringify(params[key])}`)
    .join('&');

  return `${prefix}:${sortedParams}`;
}
