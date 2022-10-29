
export class AccountCache<T> {
  mem: Map<string, { account: T; insertedAt: number }>;
  queue: string[];
  constructor(public maxSize: number, public tls: number = 5000) {
    this.queue = [];
    this.mem = new Map();
  }

  public insert(key: string, value: T) {
    if (this.queue.length > this.maxSize) {
      while (!this.mem.has(this.queue[0])) {
        this.queue = this.queue.slice(1);
      }
      this.mem.delete(this.queue[0]);
    }
    let keyString = key;
    this.queue.push(keyString);
    this.mem.set(keyString, {
      account: value,
      insertedAt: new Date().getTime(),
    });
  }

  public get(key: string): T {
    if (!key) return undefined;
    let keyString = key;
    let cache = this.mem.get(keyString);
    if (!cache) {
      return undefined;
    }
    if (new Date().getTime() - cache.insertedAt > this.tls) {
      this.mem.delete(keyString);
    }
    return cache.account;
  }
}
