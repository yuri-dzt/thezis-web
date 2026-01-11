export interface ActionResponse<T> {
  success: boolean;
  response?: T;
  error?: {
    message: string;
  };
}
