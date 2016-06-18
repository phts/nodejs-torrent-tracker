import * as _ from 'lodash';

interface Data <T> {
  [index: string]: T;
}

export default class BufferKeyedMap<T> {
  private data: Data<T>;

  constructor() {
    this.data = {};
  }

  get(key: Buffer): T {
    return this.data[this._normalizeKey(key)];
  }

  set(key: Buffer, obj: T): void {
    this.data[this._normalizeKey(key)] = obj;
  }

  delete(key: Buffer): void {
    delete this.data[this._normalizeKey(key)];
  }

  getData(): Data<T> {
    return this.data;
  }

  getValues(): T[] {
    return _.values<T>(this.data);
  }

  private _normalizeKey(key: Buffer): string {
    return key.toString('binary');
  }
}
