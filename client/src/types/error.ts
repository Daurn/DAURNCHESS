export type ApiError = {
  message: string;
  status?: number;
  details?: unknown;
};

export type ValidationError = {
  field: string;
  message: string;
};
