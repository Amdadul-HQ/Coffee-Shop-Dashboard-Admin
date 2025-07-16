import { baseApi } from "../../api/baseApi";

const adminNotification =  baseApi.injectEndpoints({
    endpoints: (builder) => ({
        adminSendUserNotification :builder.mutation({
            query: ({ data, id }) => ({
                url: `/notification/push/${id}`,
                method: "POST",
                body: data,
            }),
        }),
    })
})

export const {useAdminSendUserNotificationMutation} = adminNotification