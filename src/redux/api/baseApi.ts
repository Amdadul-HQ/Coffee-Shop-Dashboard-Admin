import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const baseApi = createApi({
    reducerPath : 'baseApi',
    baseQuery : fetchBaseQuery({baseUrl : "https://disaster-relief-donation.vercel.app/api/v1"}),
    tagTypes:['donations','testimonials','comments','volunteers'],
    endpoints : () => ({
     
    }),
})
