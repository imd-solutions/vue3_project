import { StorageType } from "./storage-type";

export class StorageService {
  // localStorage
  static getLocalItem(key: string): string {
    return this.getItem(this.getStorage(StorageType.local), key);
  }

  static setLocalItem(key: string, val: string): void {
    this.setItem(this.getStorage(StorageType.local), key, val);
  }

  static getLocalObject(key: string): any {
    return this.getObject(this.getStorage(StorageType.local), key);
  }

  static setLocalObject(key: string, obj: any): void {
    this.setObject(this.getStorage(StorageType.local), key, obj);
  }

  // sessionStorage
  static getSessionItem(key: string): string {
    return this.getItem(this.getStorage(StorageType.session), key);
  }

  static setSessionItem(key: string, val: string): void {
    this.setItem(this.getStorage(StorageType.session), key, val);
  }

  static getSessionObject(key: string): any {
    return this.getObject(this.getStorage(StorageType.session), key);
  }

  static setSessionObject(key: string, obj: any): void {
    this.setObject(this.getStorage(StorageType.session), key, obj);
  }

  // private helpers
  private static getStorage(type?: StorageType): Storage {
    if (type === StorageType.local) {
      return window.localStorage;
    } else {
      return window.sessionStorage;
    }
  }

  private static getItem(storage: Storage, key: string): string {
    return storage.getItem(key);
  }

  private static setItem(storage: Storage, key: string, val: string): void {
    storage.setItem(key, val);
  }

  private static getObject(storage: Storage, key: string): any {
    const item = this.getItem(storage, key);
    if (item) {
      try {
        return JSON.parse(item);
      } catch (e) {
        console.error(
          `unable to parse storage data into JSON object: ${item}`,
          e
        );
      }
    } else {
      return null;
    }
  }

  private static setObject(storage: Storage, key: string, obj: any): void {
    this.setItem(storage, key, JSON.stringify(obj));
  }
}
