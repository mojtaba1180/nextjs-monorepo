import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { APIError } from "../types";

/**
 * HTTP Client configuration
 */
const APIHttp: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REST_API_ENDPOINT || "/api",
  timeout: 70000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Request interceptor - Add authentication token
 */
APIHttp.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get token from localStorage or cookie
    const token = typeof window !== "undefined" 
      ? localStorage.getItem("auth_token") || sessionStorage.getItem("auth_token")
      : null;

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor - Handle errors and notifications
 */
APIHttp.interceptors.response.use(
  (response: AxiosResponse) => {
    // Handle successful responses
    return response;
  },
  (error) => {
    // Handle error responses
    const apiError: APIError = {
      message: error.response?.data?.message || error.message || "An error occurred",
      status: error.response?.status || 500,
      code: error.response?.data?.code,
    };

    // Handle specific error cases
    if (error.response?.status === 401) {
      // Unauthorized - redirect to login or refresh token
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth_token");
        sessionStorage.removeItem("auth_token");
        // You can dispatch a logout action here or redirect to login
        window.location.href = "/login";
      }
    }

    if (error.response?.status === 403) {
      // Forbidden - show access denied message
      console.error("Access denied:", apiError.message);
    }

    if (error.response?.status >= 500) {
      // Server error - show generic error message
      console.error("Server error:", apiError.message);
    }

    // You can integrate with toast notifications here
    // toast.error(apiError.message);

    return Promise.reject(apiError);
  }
);

/**
 * Generic GET request
 */
export const apiGet = <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  return APIHttp.get<T>(url, config);
};

/**
 * Generic POST request
 */
export const apiPost = <T, D = any>(
  url: string, 
  data?: D, 
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  return APIHttp.post<T>(url, data, config);
};

/**
 * Generic PUT request
 */
export const apiPut = <T, D = any>(
  url: string, 
  data?: D, 
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  return APIHttp.put<T>(url, data, config);
};

/**
 * Generic PATCH request
 */
export const apiPatch = <T, D = any>(
  url: string, 
  data?: D, 
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  return APIHttp.patch<T>(url, data, config);
};

/**
 * Generic DELETE request
 */
export const apiDelete = <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  return APIHttp.delete<T>(url, config);
};

/**
 * Upload file with progress tracking
 */
export const apiUpload = <T>(
  url: string,
  formData: FormData,
  onUploadProgress?: (progressEvent: any) => void
): Promise<AxiosResponse<T>> => {
  return APIHttp.post<T>(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
  });
};

export default APIHttp;
