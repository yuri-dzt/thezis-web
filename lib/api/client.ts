/* eslint-disable @typescript-eslint/no-explicit-any */
// import { cookies } from 'next/headers';

// interface ApiClientOptions {
//   tags?: string[];
//   revalidate?: number | false;
// }

// class ApiClient {
//   private baseUrl: string;

//   constructor() {
//     this.baseUrl = process.env.API_BASE_URL || 'http://localhost:4000';
//   }

//   private async request<T>(
//     endpoint: string,
//     options: RequestInit & ApiClientOptions = {}
//   ): Promise<T> {
//     const { tags = [], revalidate, ...fetchOptions } = options;

//     const url = `${this.baseUrl}${endpoint}`;

//     const defaultHeaders: Record<string, string> = {};

//     if (!(options.body instanceof FormData)) {
//       defaultHeaders['Content-Type'] = 'application/json';
//     }

//     // Always add access token to headers
//     const accessToken = await this.getAccessToken();
//     if (accessToken) {
//       defaultHeaders['Authorization'] = `Bearer ${accessToken}`;
//     }

//     const finalHeaders = {
//       ...defaultHeaders,
//       ...fetchOptions.headers,
//     };

//     try {
//       const response = await fetch(url, {
//         ...fetchOptions,
//         headers: finalHeaders,
//         next: {
//           tags,
//           revalidate,
//         },
//       });

//       if (!response.ok) {
//         // Handle authentication errors
//         if (response.status === 401) {
//           throw new ApiError(
//             'Não autorizado. Verifique sua chave API.',
//             response.status,
//             await response.text()
//           );
//         }

//         throw new ApiError(
//           `API Error: ${response.status}`,
//           response.status,
//           await response.text()
//         );
//       }

//       if (response.status !== 204 && response.status !== 201) {
//         return await response.json();
//       } else {
//         return (response as T)
//       }
//     } catch (error) {
//       if (error instanceof ApiError) {
//         throw error;
//       }
//       throw new ApiError('Network Error', 500, 'Failed to connect to API');
//     }
//   }

//   async download(endpoint: string): Promise<Blob> {
//     const url = `${this.baseUrl}${endpoint}`;

//     const defaultHeaders: Record<string, string> = {};

//     const accessToken = await this.getAccessToken();
//     if (accessToken) {
//       defaultHeaders['Authorization'] = `Bearer ${accessToken}`;
//     }

//     try {
//       const response = await fetch(url, {
//         method: 'GET',
//         headers: defaultHeaders,
//       });

//       if (!response.ok) {
//         throw new ApiError(
//           `Erro ao baixar arquivo: ${response.status}`,
//           response.status,
//           await response.text()
//         );
//       }

//       // Verificar se é realmente CSV
//       const contentType = response.headers.get('content-type');
//       if (!contentType?.includes('text/csv')) {
//         console.warn('Content-Type não é CSV:', contentType);
//       }

//       // Criar blob com o tipo correto e encoding
//       const arrayBuffer = await response.arrayBuffer();
//       return new Blob([arrayBuffer], {
//         type: 'text/csv;charset=utf-8'
//       });
//     } catch (error) {
//       if (error instanceof ApiError) {
//         throw error;
//       }
//       throw new ApiError('Erro de rede ao baixar o arquivo', 500);
//     }
//   }

//   private async getAccessToken(): Promise<string | null> {
//     try {
//       const cookieStore = await cookies();
//       const tokenFromCookies = cookieStore.get('access_token')?.value;

//       if (tokenFromCookies) {
//         return tokenFromCookies;
//       }

//       return null
//     } catch (error) {
//       console.error('Error getting access token:', error);
//       return null;
//     }
//   }

//   async get<T>(endpoint: string, options?: ApiClientOptions): Promise<T> {
//     return this.request<T>(endpoint, { ...options, method: 'GET' });
//   }

//   async post<T>(
//     endpoint: string,
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     data?: any,
//     options?: ApiClientOptions
//   ): Promise<T> {
//     let bodyData

//     if (data instanceof FormData) {
//       bodyData = data
//     } else {
//       bodyData = JSON.stringify(data)
//     }

//     return this.request<T>(endpoint, {
//       ...options,
//       method: 'POST',
//       body: bodyData,
//     });
//   }

//   async put<T>(
//     endpoint: string,
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     data?: any,
//     options?: ApiClientOptions
//   ): Promise<T> {
//     return this.request<T>(endpoint, {
//       ...options,
//       method: 'PUT',
//       body: data ? JSON.stringify(data) : undefined,
//     });
//   }

//   async patch<T>(
//     endpoint: string,
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     data?: any,
//     options?: ApiClientOptions
//   ): Promise<T> {
//     return this.request<T>(endpoint, {
//       ...options,
//       method: 'PATCH',
//       body: data ? JSON.stringify(data) : undefined,
//     });
//   }

//   async delete<T>(endpoint: string, options?: ApiClientOptions): Promise<T> {
//     return this.request<T>(endpoint, { ...options, method: 'DELETE' });
//   }
// }

// export class ApiError extends Error {
//   constructor(
//     message: string,
//     public status: number,
//     public details?: string
//   ) {
//     super(message);
//     this.name = 'ApiError';
//   }
// }

// export const apiClient = new ApiClient();

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

  // método genérico
  private async request<T>(
    endpoint: string,
    options: RequestInit & ApiClientOptions = {}
  ): Promise<T> {
    const { tags = [], revalidate, headers = {}, ...fetchOptions } = options;

    const url = `${this.baseUrl}${endpoint}`;

    // Headers padrão
    const defaultHeaders: Record<string, string> = {};

    if (!(fetchOptions.body instanceof FormData)) {
      defaultHeaders['Content-Type'] = 'application/json';
    }

    // Sempre tenta pegar token do cookie
    const accessToken = await this.getAccessToken();
    if (accessToken) {
      defaultHeaders['Authorization'] = `Bearer ${accessToken}`;
    }

    const finalHeaders = { ...defaultHeaders, ...headers };

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        headers: finalHeaders,
        // next é específico do Next.js para cache/revalidate
        next: { tags, revalidate },
      });

      // tratamento de erro
      if (!response.ok) {
        if (response.status === 401) {
          throw new ApiError(
            'Não autorizado. Verifique sua chave API.',
            response.status,
            await response.text()
          );
        }

        throw new ApiError(
          `Erro na API: ${response.status}`,
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

  // pega token do cookie (HttpOnly)
  private async getRefreshToken(): Promise<string | null> {
    try {
      const cookieStore = await cookies();
      const token = cookieStore.get('refresh_token')?.value ?? null;
      return token;
    } catch (err) {
      console.error('Erro ao pegar refresh token:', err);
      return null;
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
