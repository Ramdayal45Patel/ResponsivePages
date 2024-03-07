import { apiEndPoints } from "../../constant/enum";
import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (params) => ({
        url: `${apiEndPoints.GetUser}`,
        params: params,
        method: "GET",
      }),
    }),

    addUser: builder.mutation({
      query: (data: any) => ({
        url: `${apiEndPoints.AddUser}`,
        method: "POST",
        body: data,
      }),
    }),

    updateUser: builder.mutation({
      query: (data: any) => {
        const { _id, ...rest } = data;
        let userId = _id;
        return {
          method: "PUT",
          url: `${apiEndPoints.UpdateUser}${userId}`,
          body: rest,
        };
      },
    }),
  }),
});

export const { useGetUserQuery, useAddUserMutation, useUpdateUserMutation } =
  userApiSlice;
