/**
 * If you want the API to return something for your ease of handling the UI, style that variable here
 */
export interface IResponseFromAPI<Q> {
  errorMessages: Array<Record<string, string>>;
  data: Q | null;
}
