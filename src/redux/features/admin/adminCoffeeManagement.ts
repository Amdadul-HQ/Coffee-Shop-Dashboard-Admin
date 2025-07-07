import { baseApi } from "../../api/baseApi";

const adminCoffeeManagement = baseApi.injectEndpoints({ 
         endpoints: (builder) => ({
            adminUpdateCafe : builder.mutation({
                query:({data,id}) => {
                    return {
                    url: `/admin/cafe/update-cafe/${id}`,
                    method: "PATCH",
                    body: data,
                    }
                },
                invalidatesTags:["coffeeShop"]
            }),
            adminCafeApproveCafe: builder.mutation({
                query:({id}) => {
                    return {
                    url: `/admin/cafe/approve-cafe/${id}`,
                    method: "PATCH",
                    }
                },
                invalidatesTags:["pendingCafe","coffeeShop"]
            }),
            adminCafeMergeCafe: builder.mutation({
            query: ({ targetId, duplicateIds }) => {
                return {
                url: `/admin/cafe/merge-cafes/${targetId}`,
                method: "PATCH",
                body: { duplicateIds }, // ✅ Fix: Proper payload structure
                };
            },
            invalidatesTags: ['duplicateCafe'],
            }),
            adminGetAllCafe: builder.query({
                query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                args.forEach((item: any) => {
                    params.append(item.name, item.value);
                });
                }
                return {
                url:'/admin/cafe/get-admin-cafes',
                method:"GET",
                params: params,
                };
            },
            providesTags: ["coffeeShop"],
            }),
            adminGetFlaggedContent:builder.query({
                query:(args) => {
                    const params = new URLSearchParams();
                if (args) {
                args.forEach((item: any) => {
                    params.append(item.name, item.value);
                });
                }
                return {
                url:'/admin/cafe-flagged-content',
                method:"GET",
                params: params,
                };
                },
                providesTags:["flaggedContent"]
            })
            ,
            adminImportCafes: builder.mutation({
                query:({data}) => {
                    return {
                        url:'/admin/cafe/bulk-import-cafes',
                        method:"POST",
                        body:data
                    }
                }
            }),
            adminCafeExport :builder.query({
                query:() => {
                    return{
                        url:'/admin/cafe/export-cafes',
                        method:"GET"
                    }
                }
            }),
            adminCafeDelete:builder.mutation({
                query:({id}) => {
                    return {
                        url:`/admin/cafe/delete-cafe/${id}`,
                        method:"DELETE"
                    }
                },
                invalidatesTags:["coffeeShop"]
            }),
            adminCafeFlaggedResolve:builder.mutation({
                query:({id}) => {
                    return {
                        url:`/admin/cafe-flagged-content/resolve/${id}`,
                        method:"PATCH"
                    }
                },
                invalidatesTags:["flaggedContent"]
            }),
            adminGetAllCafePending:builder.query({
                query:(args) => {
                    const params = new URLSearchParams();
                if (args) {
                args.forEach((item: any) => {
                    params.append(item.name, item.value);
                });
                }
                return {
                url:'/admin/cafe/get-pending-cafes',
                method:"GET",
                params: params,
                };
                },
                providesTags:["pendingCafe"]
            }),
            adminDuplicateCafe:builder.query({
                query:(args) => {
                    const params = new URLSearchParams();
                if (args) {
                args.forEach((item: any) => {
                    params.append(item.name, item.value);
                });
                }
                return {
                url:'/admin/cafe/get-duplicate-cafes',
                method:"GET",
                params: params,
                };
                },
                providesTags:["duplicateCafe"]
            }),
            adminFlaggedContentRemove:builder.mutation({
                query:({id}) => {
                  return {
                    url:`/admin/cafe-flagged-content/${id}`,
                    method:"DELETE"
                  }
                },
                invalidatesTags:["flaggedContent"]
            }),
            adminPendingCafeReject:builder.mutation({
                query:({id}) => {
                    return{
                        url:`/admin/cafe/reject-cafe/${id}`,
                        method:"PATCH"
                    }
                },
                invalidatesTags:["pendingCafe","coffeeShop"]
            })
          })
})

export const {useAdminPendingCafeRejectMutation,useAdminFlaggedContentRemoveMutation,useAdminDuplicateCafeQuery,useAdminGetAllCafePendingQuery,useAdminCafeFlaggedResolveMutation,useAdminGetFlaggedContentQuery,useAdminCafeDeleteMutation,useAdminGetAllCafeQuery,useAdminImportCafesMutation,useAdminCafeExportQuery,useAdminUpdateCafeMutation,useAdminCafeApproveCafeMutation,useAdminCafeMergeCafeMutation} = adminCoffeeManagement;