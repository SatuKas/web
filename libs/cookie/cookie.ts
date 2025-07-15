import Cookies, { CookieSetOptions } from 'universal-cookie';

/**
 * Class representing a storage mechanism using cookies.
 * Implements the Storage interface.
 */
export class CookieStorage implements Storage {
  /**
   * The Cookies instance used for managing cookies.
   */
  protected cookies: Cookies;

  /**
   * The number of cookies currently stored.
   */
  readonly length: number;

  /**
   * Creates an instance of CookieStorage.
   * @param config - Configuration options for setting cookies.
   */
  constructor(config: CookieSetOptions) {
    this.cookies = new Cookies(null, config);
    this.length = this.cookies.getAll().length;
  }

  /**
   * Clears all cookies.
   */
  clear(): void {
    const allCookies = this.cookies.getAll();

    if (allCookies?.length > 0) {
      allCookies.forEach((cookie: string) => {
        this.cookies.remove(cookie);
      });
    }
  }

  /**
   * Retrieves the value of a cookie by key.
   * @param key - The name of the cookie to retrieve.
   * @returns The value of the cookie, or null if not found.
   */
  getItem(key: string): string | null {
    return this.cookies.get(key);
  }

  /**
   * Retrieves the name of the cookie at the specified index.
   * @param index - The index of the cookie to retrieve.
   * @returns The name of the cookie, or null if not found.
   */
  key(index: number): string | null {
    const allCookies = this.cookies.getAll();
    return allCookies[index] ?? null;
  }

  /**
   * Removes a cookie by key.
   * @param key - The name of the cookie to remove.
   */
  removeItem(key: string): void {
    this.cookies.remove(key);
  }

  /**
   * Sets a cookie with the specified key and value.
   * @param key - The name of the cookie to set.
   * @param value - The value of the cookie to set.
   */
  setItem(key: string, value: string, options?: CookieSetOptions): void {
    this.cookies.set(key, value, options);
  }
}
