type QueryParam = Record<string, string | boolean | number | undefined>;

/**
 * Handle get the query param for api route
 *
 * @param queryParam param object for api route
 * @returns query param with format: ?a=1&b=2&c=3
 */
export const getQueryParams = (queryParam: QueryParam) => {
  if (!queryParam) return "";

  return Object.keys(queryParam).reduce(
    (prev, next) =>
      `${prev}${
        queryParam[next]
          ? `${!prev ? "?" : "&"}${next}=${queryParam[next]}` // Add ? at the first param and & at other next ones.
          : ""
      }`,
    "",
  );
};

export const getUrlWithParam = (url: string, param?: QueryParam) =>
  `${url}${getQueryParams(param as QueryParam)}`;
