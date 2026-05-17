import type { ApiError } from '../types';

const CODE_MESSAGES: Record<string, string> = {
  '401': 'Your session has expired. Please log in again.',
  '403': 'You do not have permission to perform this action.',
  '404': 'The requested resource was not found.',
  '429': 'Too many requests. Please wait a moment and try again.',
  '500': 'A server error occurred. Please try again later.',
};

export function resolveErrorMessage(err: unknown): string {
  if (isApiError(err)) {
    return CODE_MESSAGES[err.code] ?? err.message;
  }
  if (err instanceof DOMException && err.name === 'AbortError') {
    return 'The request timed out. Please check your connection.';
  }
  if (err instanceof Error) return err.message;
  return 'An unexpected error occurred.';
}

function isApiError(err: unknown): err is ApiError {
  return typeof err === 'object' && err !== null && 'code' in err && 'message' in err;
}
