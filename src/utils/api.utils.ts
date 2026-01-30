import { APIRequestContext } from '@playwright/test';
import { config } from '../config/env.config';

export class ApiUtils {
  private request: APIRequestContext;
  private baseUrl: string;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.baseUrl = config.apiUrl;
  }

  async get<T>(endpoint: string, headers?: Record<string, string>): Promise<T> {
    const response = await this.request.get(`${this.baseUrl}${endpoint}`, {
      headers,
    });
    return response.json();
  }

  async post<T>(
    endpoint: string,
    data: object,
    headers?: Record<string, string>
  ): Promise<T> {
    const response = await this.request.post(`${this.baseUrl}${endpoint}`, {
      data,
      headers,
    });
    return response.json();
  }

  async put<T>(
    endpoint: string,
    data: object,
    headers?: Record<string, string>
  ): Promise<T> {
    const response = await this.request.put(`${this.baseUrl}${endpoint}`, {
      data,
      headers,
    });
    return response.json();
  }

  async delete<T>(endpoint: string, headers?: Record<string, string>): Promise<T> {
    const response = await this.request.delete(`${this.baseUrl}${endpoint}`, {
      headers,
    });
    return response.json();
  }

  async createTestUser(userData: object): Promise<object> {
    return this.post('/api/users', userData);
  }

  async deleteTestUser(userId: string): Promise<void> {
    await this.delete(`/api/users/${userId}`);
  }

  async getAuthToken(email: string, password: string): Promise<string> {
    const response = await this.post<{ token: string }>('/api/auth/login', {
      email,
      password,
    });
    return response.token;
  }
}
