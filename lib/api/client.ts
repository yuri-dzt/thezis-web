/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from 'next/headers';

interface ApiClientOptions {
  tags?: string[];
  revalidate?: number | false;
  headers?: Record<string, string>;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public details?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.API_BASE_URL || 'http://localhost:4000';
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit & ApiClientOptions = {}
  ): Promise<T> {
    const { tags = [], revalidate, headers = {}, ...fetchOptions } = options;

    const url = `${this.baseUrl}${endpoint}`;

    const defaultHeaders: Record<string, string> = {};

    if (!(fetchOptions.body instanceof FormData)) {
      defaultHeaders['Content-Type'] = 'application/json';
    }

    const accessToken = await this.getAccessToken();
    if (accessToken) {
      defaultHeaders['Authorization'] = `Bearer ${accessToken}`;
    }

    const finalHeaders = { ...defaultHeaders, ...headers };

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        headers: finalHeaders,
        next: { tags, revalidate },
      });

      if (response.status === 401) {
        await this.clearAuthCookies();
      }

      if (!response.ok) {
        if (response.status === 401) {
          await this.clearAuthCookies();
        }

        throw new ApiError(
          'API_ERROR',
          response.status,
          await response.text()
        );
      }

      // respostas sem body
      if (response.status === 204) {
        return {} as T;
      }

      // tentar parsear JSON
      const contentType = response.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        return await response.json();
      }

      // fallback caso não seja JSON
      return (await response.text()) as unknown as T;

    } catch (err) {
      if (err instanceof ApiError) throw err;

      // Se for erro de redirect do Next.js, propaga
      if (err && typeof err === 'object' && 'digest' in err) {
        throw err;
      }

      throw new ApiError('Erro de rede', 500, 'Falha ao conectar à API');
    }
  }

  // download de arquivos
  async download(endpoint: string): Promise<Blob> {
    const url = `${this.baseUrl}${endpoint}`;
    const accessToken = await this.getAccessToken();

    const headers: Record<string, string> = {};
    if (accessToken) headers['Authorization'] = `Bearer ${accessToken}`;

    const response = await fetch(url, {
      method: 'GET',
      headers,
    });

    if (response.status === 401) {
      await this.clearAuthCookies();
    }

    if (!response.ok) {
      throw new ApiError(
        `Erro ao baixar arquivo: ${response.status}`,
        response.status,
        await response.text()
      );
    }

    const arrayBuffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'application/octet-stream';

    return new Blob([arrayBuffer], { type: contentType });
  }

  // pega token do cookie (HttpOnly)
  private async getAccessToken(): Promise<string | null> {
    try {
      const cookieStore = await cookies();
      const token = cookieStore.get('access_token')?.value ?? null;
      return token;
    } catch (err) {
      console.error('Erro ao pegar access token:', err);
      return null;
    }
  }

  // limpa cookies de autenticação
  private async clearAuthCookies(): Promise<void> {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_URL}/api/auth/logout`, {
        method: "POST",
        cache: "no-store",
      });
    } catch (err) {
      console.error("Erro ao chamar rota de logout:", err);
    }
  }


  // métodos de conveniência
  async get<T>(endpoint: string, options?: ApiClientOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  async post<T>(endpoint: string, data?: any, options?: ApiClientOptions): Promise<T> {
    const body = data instanceof FormData ? data : JSON.stringify(data);
    return this.request<T>(endpoint, { ...options, method: 'POST', body });
  }

  async put<T>(endpoint: string, data?: any, options?: ApiClientOptions): Promise<T> {
    const body = data ? JSON.stringify(data) : undefined;
    return this.request<T>(endpoint, { ...options, method: 'PUT', body });
  }

  async patch<T>(endpoint: string, data?: any, options?: ApiClientOptions): Promise<T> {
    const body = data ? JSON.stringify(data) : undefined;
    return this.request<T>(endpoint, { ...options, method: 'PATCH', body });
  }

  async delete<T>(endpoint: string, options?: ApiClientOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }
}

export const apiClient = new ApiClient();