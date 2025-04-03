
import { toastService } from "./toast";

interface RequestOptions extends RequestInit {
  showErrorToast?: boolean;
  showSuccessToast?: boolean;
  successMessage?: string;
}

interface ApiClientOptions {
  baseUrl: string;
  defaultHeaders?: HeadersInit;
}

/**
 * API Client for making HTTP requests
 */
export class ApiClient {
  private baseUrl: string;
  private defaultHeaders: HeadersInit;

  constructor(options: ApiClientOptions) {
    this.baseUrl = options.baseUrl;
    this.defaultHeaders = {
      "Content-Type": "application/json",
      ...options.defaultHeaders,
    };
  }

  /**
   * Set authorization token for all future requests
   * @param token The authorization token
   */
  setAuthToken(token: string | null) {
    if (token) {
      this.defaultHeaders = {
        ...this.defaultHeaders,
        Authorization: `Bearer ${token}`,
      };
    } else {
      // Remove Authorization header if token is null
      const headers = { ...this.defaultHeaders };
      delete headers.Authorization;
      this.defaultHeaders = headers;
    }
  }

  /**
   * Make a GET request
   * @param endpoint API endpoint
   * @param options Request options
   * @returns Promise with response data
   */
  async get<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    return this.request<T>(endpoint, {
      method: "GET",
      ...options,
    });
  }

  /**
   * Make a POST request
   * @param endpoint API endpoint
   * @param data Request body
   * @param options Request options
   * @returns Promise with response data
   */
  async post<T>(endpoint: string, data: any, options: RequestOptions = {}): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
      ...options,
    });
  }

  /**
   * Make a PUT request
   * @param endpoint API endpoint
   * @param data Request body
   * @param options Request options
   * @returns Promise with response data
   */
  async put<T>(endpoint: string, data: any, options: RequestOptions = {}): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
      ...options,
    });
  }

  /**
   * Make a PATCH request
   * @param endpoint API endpoint
   * @param data Request body
   * @param options Request options
   * @returns Promise with response data
   */
  async patch<T>(endpoint: string, data: any, options: RequestOptions = {}): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PATCH",
      body: JSON.stringify(data),
      ...options,
    });
  }

  /**
   * Make a DELETE request
   * @param endpoint API endpoint
   * @param options Request options
   * @returns Promise with response data
   */
  async delete<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    return this.request<T>(endpoint, {
      method: "DELETE",
      ...options,
    });
  }

  /**
   * Generic request method
   * @param endpoint API endpoint
   * @param options Request options
   * @returns Promise with response data
   */
  private async request<T>(
    endpoint: string,
    { showErrorToast = true, showSuccessToast = false, successMessage = "Operación completada con éxito", ...options }: RequestOptions
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const requestOptions: RequestInit = {
      ...options,
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
    };
    
    try {
      const response = await fetch(url, requestOptions);
      
      if (!response.ok) {
        let errorMessage = `Error ${response.status}: ${response.statusText}`;
        
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          // If we can't parse the error as JSON, use the default message
        }
        
        const error = new Error(errorMessage);
        throw error;
      }
      
      // Handle empty responses (e.g. for DELETE requests)
      if (response.status === 204) {
        if (showSuccessToast) {
          toastService.success(successMessage);
        }
        return {} as T;
      }
      
      const data = await response.json();
      
      if (showSuccessToast) {
        toastService.success(successMessage);
      }
      
      return data;
    } catch (error) {
      if (showErrorToast) {
        toastService.error(
          "Error",
          error instanceof Error ? error.message : "Ha ocurrido un error inesperado"
        );
      }
      throw error;
    }
  }
}

// Create and export a default API client instance
export const api = new ApiClient({
  baseUrl: import.meta.env.VITE_API_URL || "/api",
});
