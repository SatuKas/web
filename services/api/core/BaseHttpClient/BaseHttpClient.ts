import env from '@/config/env';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/constants/cookieKey';
import { LOGIN_PATH_URL } from '@/constants/routes';
import { CookieStorage } from '@/libs/cookie';
import AuthCredential, { CredentialService } from '@/services/api/core/CredentialService';
import * as ApiRoute from '@/services/api/routes';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

type Config = {
  withCredential?: boolean;
};

/**
 * BaseHttpClient class provides a wrapper around Axios for making HTTP requests.
 * It includes request and response interceptors for handling authorization tokens
 * and automatic token refresh on 401 responses.
 */
export class BaseHttpClient {
  private client: AxiosInstance;

  /**
   * Whether to use credential for the request.
   */
  private withCredential: boolean;

  /**
   * The credential object used for obtaining access tokens.
   */
  private crendential: AuthCredential;

  private cookieStorage: CookieStorage;

  /**
   * Constructs a new instance of BaseHttpClient.
   * @param credential - The credential object used for obtaining access tokens.
   * @param baseUrl - The base URL for the Axios client.
   * @param logoutHandler - The handler function to be called on logout.
   */
  constructor({ withCredential }: Config) {
    this.cookieStorage = new CookieStorage({
      domain: env.MAIN_DOMAIN,
      path: '/',
    });

    this.crendential = new CredentialService({
      storage: this.cookieStorage,
      refreshTokenEndpoint: ApiRoute.AUTH_REFRESH_TOKEN_PATH,
      revokeTokenEndpoint: ApiRoute.AUTH_LOGOUT_PATH,
    });
    this.client = axios.create({
      baseURL: env.BASE_API_URL,
    });
    this.withCredential = withCredential ?? true;

    this.initializeRequestInterceptor();
    this.initializeResponseInterceptor();
  }

  /**
   * The handler function to be called on logout.
   */
  private async logoutHandler() {
    await this.crendential
      .revokeTokens()
      .then((res) => {
        console.info('logout success from assessment', res);
      })
      .catch((error) => {
        console.error('logout error', error);
        return error;
      })
      .finally(() => {
        this.cookieStorage.removeItem(ACCESS_TOKEN_KEY);
        this.cookieStorage.removeItem(REFRESH_TOKEN_KEY);

        window.open(LOGIN_PATH_URL, '_self');
      });
  }

  /**
   * Initializes the request interceptor to add the Authorization header.
   */
  private initializeRequestInterceptor() {
    this.client.interceptors.request.use(
      (config) => {
        const token = this.crendential.getAccessToken();
        if (token && this.withCredential) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  /**
   * Initializes the response interceptor to handle token refresh on 401 responses.
   */
  private initializeResponseInterceptor() {
    this.client.interceptors.response.use(
      async (response) => {
        return response.data;
      },
      async (error) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
        const responseStatus = error.response?.data?.code ?? error.response?.status;
        if (responseStatus === 401) {
          // if the response status is 401 and the same request has been retried before,
          // then logout and reject the promise otherwise try to refresh the token
          if (originalRequest._retry) {
            this.logoutHandler();
            return Promise.reject(error);
          } else {
            try {
              await this.requestNewToken();
              originalRequest._retry = true; // Mark the request as retried
              return this.client.request(originalRequest);
            } catch (error) {
              return Promise.reject(error);
            }
          }
        }
        return Promise.reject(error);
      }
    );
  }

  private async requestNewToken() {
    try {
      await this.crendential.requestNewTokens();
    } catch (error) {
      this.logoutHandler();
      return Promise.reject(error);
    }
  }

  /**
   * Sends a GET request to the specified URL.
   * @param url - The URL to send the GET request to.
   * @param config - Optional Axios request configuration.
   * @returns A promise that resolves to the response data.
   */
  protected async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = this.client.get(url, config);
    return response as Promise<T>;
  }

  /**
   * Sends a POST request to the specified URL with the given data.
   * @param url - The URL to send the POST request to.
   * @param data - The data to include in the POST request.
   * @param config - Optional Axios request configuration.
   * @returns A promise that resolves to the response data.
   */
  protected async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = this.client.post(url, data, config);
    return response as Promise<T>;
  }

  /**
   * Sends a PUT request to the specified URL with the given data.
   * @param url - The URL to send the PUT request to.
   * @param data - The data to include in the PUT request.
   * @param config - Optional Axios request configuration.
   * @returns A promise that resolves to the response data.
   */
  protected async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = this.client.put(url, data, config);
    return response as Promise<T>;
  }

  /**
   * Sends a PATCH request to the specified URL with the given data and configuration.
   *
   * @template T - The expected response type.
   * @param {string} url - The URL to send the PATCH request to.
   * @param {any} [data] - The data to be sent in the body of the PATCH request.
   * @param {AxiosRequestConfig} [config] - Optional configuration for the Axios request.
   * @returns {Promise<T>} - A promise that resolves to the response of type T.
   */
  protected async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = this.client.patch(url, data, config);
    return response as Promise<T>;
  }

  /**
   * Sends a DELETE request to the specified URL.
   * @param url - The URL to send the DELETE request to.
   * @param config - Optional Axios request configuration.
   * @returns A promise that resolves to the response data.
   */
  protected async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = this.client.delete(url, config);
    return response as Promise<T>;
  }
}
