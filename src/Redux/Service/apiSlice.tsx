import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../../enviroment/api";

const baseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  prepareHeaders: (headers, { getState }: any) => {
    headers.set("Accept", "application/json");
    return headers;
  },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result: any = await baseQuery(args, api, extraOptions);
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
  refetchOnMountOrArgChange: true,
  keepUnusedDataFor: 1,
});
