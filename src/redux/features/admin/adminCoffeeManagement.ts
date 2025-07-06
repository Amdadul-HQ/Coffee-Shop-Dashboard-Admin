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
                }
            }),
            adminCafeApproveCafe: builder.mutation({
                query:({id}) => {
                    return {
                    url: `/admin/cafe/approve-cafe/${id}`,
                    method: "PATCH",
                    }
                }
            }),
            adminCafeMergeCafe :builder.mutation({
                query:({sourceId,targetId}) => {
                    return {
                    url: `/admin/cafe/merge-cafes/${sourceId}/${targetId}`,
                    method: "GET",
                    }
                }
            }),
            adminGetAllCafe: builder.query({
                query:() => {
                    return {
                        url:'/admin/cafe/get-admin-cafes',
                        method:"GET"
                    }
                }
            }),
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
            })
          })
})

export const {useAdminGetAllCafeQuery,useAdminImportCafesMutation,useAdminCafeExportQuery,useAdminUpdateCafeMutation,useAdminCafeApproveCafeMutation,useAdminCafeMergeCafeMutation} = adminCoffeeManagement;