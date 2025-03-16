import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, CreateAxiosDefaults } from 'axios';

export type AxiosHttpResponse<T = unknown> = Omit<AxiosResponse<T>, 'config' | 'request'>;

abstract class AxiosHttp {
  private client?: AxiosInstance;

  private getStatusCode(status: number) {
    const statusCode: Record<number, string> = {
      400: 'Bad Request',
      401: 'Unauthorized',
      404: 'Not Found',
      422: 'Unprocessable Content',
      500: 'Internal Server Error',
      502: 'Bad Gateway',
      503: 'Service Unavailable',
      504: 'Gateway Timeout',
    };

    return statusCode[status];
  }

  /**
   * Creates a new Axios instance with the given configuration.
   * Sets the default 'Content-Type' header to 'application/json; charset=utf-8'.
   * This instance is stored in the class's client property for further use.
   *
   * @param config - Optional Axios configuration options to customize the instance.
   * @returns A configured AxiosInstance.
   */
  private createAxiosInstance(config?: CreateAxiosDefaults<any>) {
    const axiosInstance = Axios.create({
      ...config,
      headers: {
        Accept: 'application/json; charset=utf-8',
        'Content-Type': 'application/json; charset=utf-8',
      },
    });

    this.requestInterceptors(axiosInstance);
    this.responseInterceptors(axiosInstance);
    this.client = axiosInstance;

    return axiosInstance;
  }

  /**
   * Handles any errors that occur during the request or response phases.\
   * It returns a string message with the error status code and the corresponding error message.\
   * If the error is a server error (500), it returns a generic error message.\
   * If the error is a client error (4xx), it returns a message with the error status code and the error message.\
   * If the error is a network error, it returns a message with the error status code and a generic error message.\
   * If the error is an unknown error, it returns a generic error message with the error message.
   *
   * @param error - The error object to be handled.
   * @returns A string message with the handled error.
   */
  protected handleErrorResponse(error: any): AxiosCustomErrorType | string {
    if (error.response) {
      const { data, status, statusText } = error.response;
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const statusCode = this.getStatusCode(status);
      if (statusCode) {
        return {
          code: statusCode,
          status,
          message: `${data.message || statusText}`,
        };
      }

      return {
        code: `${status} ${statusText || 'Server Error'}`,
        status,
        message: `${data.message || statusText}`,
      };
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      // return `Error: No response received from the server`;
      return {
        code: `Error`,
        status: 1000,
        message: 'No response received from the server',
      };
    } else {
      // Something happened in setting up the request that triggered an Error
      return {
        code: `Error`,
        status: 1001,
        message: `${error.message}`,
      };
    }
  }

  /**
   * Sets up request interceptors for the Axios client.
   * This allows you to modify requests before they are sent to the server.
   * It also handles any errors that occur during the request phase.
   *
   * @param client - The AxiosInstance to which the interceptors are attached.
   */
  protected requestInterceptors(client: AxiosInstance) {
    client.interceptors.request.use(
      request => {
        // Do something before request is sent to the server
        // Basically if you want to modify a certain request before it is being sent
        return request;
      },
      error => {
        // Do something with request error
        return Promise.reject(this.handleErrorResponse(error));
      },
    );
  }

  /**
   * Sets up response interceptors for the Axios client.
   * This allows you to handle responses before they are processed by the client.
   * You can modify the response data or handle any errors that occur during the response phase.
   *
   * @param client - The AxiosInstance to which the interceptors are attached.
   */
  protected responseInterceptors(client: AxiosInstance) {
    client.interceptors.response.use(
      config => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data before it is sent to the client
        return config;
      },
      error => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error before it is sent to the client
        return Promise.reject(this.handleErrorResponse(error));
      },
    );
  }

  /**
   * Getter for the Axios HTTP client instance.
   * If the client has already been initialized, returns the existing client.
   * Otherwise, creates and returns a new Axios client instance.
   */
  protected get http() {
    return this?.client !== undefined ? this.client : this.createAxiosInstance({ baseURL: `/` });
  }
}

class HttpAxios extends AxiosHttp {
  /**
   * Makes a GET request to the specified URL and returns the response.\
   * The response body is parsed as JSON and type-checked according to the type parameter `T`.
   *
   * Where `T` is a generic type which holds the expected data type to be returned
   *
   * @param url - The URL to make the GET request to.
   * @param config - Optional configuration for the request.
   * @returns The parsed response as an {@link AxiosHttpResponse} with type parameter `T`.
   */
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosHttpResponse<T>> {
    const response = await this.http.get<T>(url, config);
    return response;
  }

  /**
   * Makes a POST request to the specified URL with the provided payload and returns the response.
   * The response body is parsed as JSON and type-checked according to the type parameter `T`.
   *
   * Where `T` is a generic type which holds the expected data type to be returned.
   *
   * @param url - The URL to make the POST request to.
   * @param body - The payload to be sent with the POST request.
   * @param config - Optional configuration for the request.
   * @returns The parsed response as an {@link AxiosHttpResponse} with type parameter `T`.
   */

  async post<T, P = unknown>(url: string, body: P, config?: AxiosRequestConfig): Promise<AxiosHttpResponse<T>> {
    const response = await this.http.post<T>(url, body, config);
    return response;
  }

  /**
   * Makes a PUT request to the specified URL with the provided payload and returns the response.\
   * The response body is parsed as JSON and type-checked according to the type parameter `T`.
   *
   * Where `T` is a generic type which holds the expected data type to be returned.
   *
   * @param url - The URL to make the PUT request to.
   * @param body - The payload to be sent with the PUT request.
   * @param config - Optional configuration for the request.
   * @returns The parsed response as an {@link AxiosHttpResponse} with type parameter `T`.
   */
  async put<T, P = unknown>(url: string, body: P, config?: AxiosRequestConfig): Promise<AxiosHttpResponse<T>> {
    const response = await this.http.put<T>(url, body, config);
    return response;
  }

  /**
   * Makes a DELETE request to the specified URL and returns the response.\
   * The response body is parsed as JSON and type-checked according to the type parameter `T`.
   *
   * Where `T` is a generic type which holds the expected data type to be returned
   *
   * @param url - The URL to make the DELETE request to.
   * @param config - Optional configuration for the request.
   * @returns The parsed response as an {@link AxiosHttpResponse} with type parameter `T`.
   */
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosHttpResponse<T>> {
    const response = await this.http.delete<T>(url, config);
    return response;
  }

  /**
   * Makes a request to the specified URL and returns the response.\
   * The response body is parsed as JSON and type-checked according to the type parameter `T`.
   *
   * Where `T` is a generic type which holds the expected data type to be returned
   *
   * @param config - The configuration for the request.
   * @returns The parsed response as an {@link AxiosHttpResponse} with type parameter `T`.
   */
  async request<T>(config: AxiosRequestConfig): Promise<AxiosHttpResponse<T>> {
    const response = await this.http.request<T>(config);
    return response;
  }

  /**
   * Makes a HEAD request to the specified URL and returns the response.
   *
   * @param url - The URL to make the HEAD request to.
   * @param config - Optional configuration for the request.
   * @returns The parsed response as an {@link AxiosHttpResponse}.
   */
  async head(url: string, config?: AxiosRequestConfig): Promise<AxiosHttpResponse> {
    const response = await this.http.head(url, config);
    return response;
  }

  /**
   * Makes a PATCH request to the specified URL and returns the response.\
   * The response body is parsed as JSON and type-checked according to the type parameter `T`.
   *
   * Where `T` is a generic type which holds the expected data type to be returned
   *
   * @param url - The URL to make the PATCH request to.
   * @param body - The partial payload to be sent with the PATCH request.
   * @param config - Optional configuration for the request.
   * @returns The parsed response as an {@link AxiosHttpResponse} with type parameter `T`.
   */
  async patch<T, P = unknown>(
    url: string,
    body: Partial<P>,
    config?: AxiosRequestConfig,
  ): Promise<AxiosHttpResponse<T>> {
    const response = await this.http.patch<T>(url, body, config);
    return response;
  }
}

export default HttpAxios;
