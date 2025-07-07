import { baseApi } from "../../api/baseApi";

const adminManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: any) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/admin/user/get-users",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["users"],
    }),
    getUsersAnalytics:builder.query({
        query:() => {

        return {
          url: "/admin/user/get-user-analytics",
          method: "GET",
        };
        }
    }),
    userSuspend:builder.mutation({
        query:({id}) => {
        return {
            url:`/admin/user/suspend-user/${id}`,
            method:"PATCH"
        }
    },
    invalidatesTags: ["users"],
    }),
    userUnSuspend:builder.mutation({
         query:({id}) => {
        return {
            url:`/admin/user/unsuspend-user/${id}`,
            method:"PATCH"
        }
    },
    invalidatesTags: ["users"],
    }),
    forceLogout:builder.mutation({
         query:({id}) => {
        return {
            url:`/admin/user/force-logout/${id}`,
            method:"GET"
        }
    },
    invalidatesTags: ["users"],
    }),
    resetPassword:builder.mutation({
        query:({id}) => {
            return {
                url:`/admin/user/reset-password/${id}`,
                method:"PATCH"
            }
        },
        invalidatesTags: ["users"],
    }),
    getUserDetails:builder.query({
        query:({id}) => {

        return {
          url: `/admin/user/get-user/${id}`,
          method: "GET",
        };
        }
    }),
  }),
});

export const { useGetAllUserQuery,useGetUsersAnalyticsQuery,useUserSuspendMutation,useUserUnSuspendMutation, useForceLogoutMutation ,useResetPasswordMutation,useGetUserDetailsQuery } = adminManagementApi;