import env from '@/config/env';
import AuthCredential, { CredentialService } from '@/services/api/core/CredentialService';
import * as ApiRoute from '@/services/api/routes';
import { ApiResponse, ExceptionCode, ResponseStatus } from '@/types/api/common';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

/**
 * Config type for BaseHttpClient constructor.
 * @property {boolean} [withCredential] - if true, will attach Authorization header with access token (default: true)
 */
type Config = {
  withCredential?: boolean; // whether to use credential for the request
};

/**
 * BaseHttpClient is a wrapper for Axios to handle HTTP requests with built-in
 * support for authentication, token refresh, and error handling.
 *
 * - Automatically attaches access token to requests (if withCredential is true)
 * - Handles 401 errors by trying to refresh token and retrying the request
 * - Handles network errors and returns user-friendly messages
 */
export class BaseHttpClient {
  private client: AxiosInstance; // Axios instance for making HTTP requests

  private withCredential: boolean; // whether to use credential for the request

  private crendential: AuthCredential; // credential service for token management

  /**
   * Create a new BaseHttpClient instance.
   * @param {Config} param0 - config object
   */
  constructor({ withCredential }: Config) {
    this.crendential = new CredentialService();
    this.client = axios.create({
      baseURL: env.BASE_API_URL + ApiRoute.getApiVersion(),
    });
    this.withCredential = withCredential ?? true;

    this.initializeRequestInterceptor();
    this.initializeResponseInterceptor();
  }

  /**
   * Set up Axios request interceptor to add Authorization header if token exists.
   * This ensures every outgoing request (if withCredential is true) will have the access token.
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
   * Set up Axios response interceptor to handle:
   * - Network errors (no response from server)
   * - 401 Unauthorized: try to refresh token and retry request once, otherwise logout
   * - Other errors: just forward the error data
   */
  private initializeResponseInterceptor() {
    this.client.interceptors.response.use(
      async (response) => {
        // Always return only the response data for successful requests
        return response.data;
      },
      async (error: AxiosError<ApiResponse<any>>) => {
        // originalRequest is used to retry the request after token refresh
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
        const responseData = error.response?.data;
        const responseStatus = responseData?.code;

        // Handle network errors (no response from server)
        if (!error.response) {
          const networkError: ApiResponse<null> = {
            status: ResponseStatus.ERROR,
            message: this.getNetworkErrorMessage(error),
            code: ExceptionCode.INTERNAL_SERVER_ERROR,
            error: {
              details: [],
            },
            data: null,
          };
          return Promise.reject(networkError);
        }

        // Handle 401 Unauthorized: try to refresh token and retry once
        if (
          responseStatus &&
          [
            ExceptionCode.INVALID_TOKEN,
            ExceptionCode.EXPIRED_TOKEN,
            ExceptionCode.REVOKED_TOKEN,
            ExceptionCode.UNAUTHORIZED_USER,
          ].includes(responseStatus)
        ) {
          // If already retried, logout and reject
          if (originalRequest._retry) {
            this.crendential.logoutHandler();
            return Promise.reject(responseData);
          } else {
            try {
              await this.crendential.requestNewTokens();
              originalRequest._retry = true; // Mark as retried to avoid infinite loop
              return this.client.request(originalRequest);
            } catch (error) {
              this.crendential.logoutHandler();
              return Promise.reject(error);
            }
          }
        }
        // For other errors, just reject with the response data
        return Promise.reject(responseData);
      }
    );
  }

  /**
   * Get a user-friendly message for network errors based on error code.
   * @param {AxiosError} error - Axios error object
   * @returns {string} - user-friendly error message
   */
  private getNetworkErrorMessage(error: AxiosError): string {
    switch (error.code) {
      case 'ERR_NETWORK':
        return 'No internet connection. Please check your network.';
      case 'ECONNREFUSED':
        return 'Server is not responding. Please try again later.';
      case 'ETIMEDOUT':
        return 'Request timeout. Please try again.';
      case 'ENOTFOUND':
        return 'Server not found. Please check the URL.';
      case 'ECONNRESET':
        return 'Connection was reset. Please try again.';
      default:
        return 'Network error occurred. Please try again.';
    }
  }

  /**
   * Send a GET request.
   * @template T
   * @param {string} url - endpoint URL
   * @param {AxiosRequestConfig} [config] - optional Axios config
   * @returns {Promise<T>} - response data
   */
  protected async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    // Use Axios instance to send GET request
    const response = this.client.get(url, config);
    return response as Promise<T>;
  }

  /**
   * Send a POST request.
   * @template T
   * @param {string} url - endpoint URL
   * @param {any} [data] - request body data
   * @param {AxiosRequestConfig} [config] - optional Axios config
   * @returns {Promise<T>} - response data
   */
  protected async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = this.client.post(url, data, config);
    return response as Promise<T>;
  }

  /**
   * Send a PUT request.
   * @template T
   * @param {string} url - endpoint URL
   * @param {any} [data] - request body data
   * @param {AxiosRequestConfig} [config] - optional Axios config
   * @returns {Promise<T>} - response data
   */
  protected async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = this.client.put(url, data, config);
    return response as Promise<T>;
  }

  /**
   * Send a PATCH request.
   * @template T
   * @param {string} url - endpoint URL
   * @param {any} [data] - request body data
   * @param {AxiosRequestConfig} [config] - optional Axios config
   * @returns {Promise<T>} - response data
   */
  protected async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = this.client.patch(url, data, config);
    return response as Promise<T>;
  }

  /**
   * Send a DELETE request.
   * @template T
   * @param {string} url - endpoint URL
   * @param {AxiosRequestConfig} [config] - optional Axios config
   * @returns {Promise<T>} - response data
   */
  protected async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = this.client.delete(url, config);
    return response as Promise<T>;
  }
}
