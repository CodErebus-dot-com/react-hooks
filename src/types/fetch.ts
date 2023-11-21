/**
 * FetchOptions type represents the options for configuring the fetch request.
 * It includes all standard Fetch API options.
 *
 * @property {boolean} [isCredentialsForCrossOrigin] - Whether to include credentials for cross-origin requests.
 */
export type FetchOptions = RequestInit & {
  isCredentialsForCrossOrigin?: boolean;
  refetch?: number;
  retryAfter?: number;
};

/**
 * CustomError type represents the error object returned by the useFetch hook.
 *
 * @property {string} message - The error message.
 * @property {any} response - The response object.
 */
export type CustomError = {
  message: string;
  response: Response;
};

/**
 * UseFetchResult type represents the result object returned by the useFetch hook.
 *
 * @property {T | null} data - The data returned by the fetch request.
 * @property {CustomError | null} error - The error object returned by the fetch request.
 * @property {boolean} loading - Whether the fetch request is in progress.
 */
export type UseFetchResult<T> = {
  data: T | null;
  error: CustomError | null;
  loading: boolean;
};
