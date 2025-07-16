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
        adminAnnoucement: builder.mutation({
            query: ({ data }) => ({
                url: `/notification/announcements`,
                method: "POST",
                body: data,
            }),
            invalidatesTags:["announcements"]
        }),
        // Get all announcements with pagination
    adminGetAllAnnouncements: builder.query<any, { limit?: number; offset?: number }>({
      query: ({ limit = 10, offset = 0 } = {}) => ({
        url: "/notification/announcements",
        method: "GET",
        params: { limit, offset },
      }),
      providesTags: ["announcements"],
    }),

    // Delete announcement
    deleteAnnouncement: builder.mutation<void, string>({
      query: (id) => ({
        url: `/notification/announcements/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["announcements"],
    }),

    // Update announcement
    updateAnnouncement: builder.mutation({
      query: ({ id, data }) => ({
        url: `/notification/announcements/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["announcements"],
    }),
    })
})

export const {useAdminSendUserNotificationMutation,useAdminAnnoucementMutation,useAdminGetAllAnnouncementsQuery,useDeleteAnnouncementMutation,useUpdateAnnouncementMutation} = adminNotification