export interface ActionResponse<T> {
  success: boolean;
  response?: T;
  error?: {
    code?: string;
    status?: number;
    message: string;
  };
}
