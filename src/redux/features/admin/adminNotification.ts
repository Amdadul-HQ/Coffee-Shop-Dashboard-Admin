import { baseApi } from "../../api/baseApi";


export interface Notification {
  id: string
  title: string
  message: string
  fcmTokens: string[]
  startsAt?: string | null
  endsAt?: string | null
  createdAt: string
}

export interface NotificationsResponse {
  data: any;
  notifications: Notification[]
  total: number
  limit: number
  offset: number
  hasMore: boolean
}

export interface PaginationParams {
  limit?: number
  offset?: number
}

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
    // Get all Notification
    adminGetAllNotification: builder.query<any, { limit?: number; offset?: number }>({
        query: ({ limit = 10, offset = 0 } = {}) => ({
            url: '/notification/push',
            method: "GET",
            params: { limit, offset }
        })
    }),
    // Get all notifications with pagination
    adminGetAllNotifications: builder.query<NotificationsResponse, PaginationParams>({
      query: ({ limit = 10, offset = 0 } = {}) => ({
        url: "/notification/push",
        method: "GET",
        params: { limit, offset },
      }),
      providesTags: ["notifications"],
    }),

    // Delete notification
    deleteNotification: builder.mutation<void, string>({
      query: (id) => ({
        url: `/notification/push/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["notifications"],
    }),
    getAllNotes :builder.query<any, { limit?: number; offset?: number }>({
      query: ({ limit = 10, offset = 0 } = {}) => ({
        url: "/admin/user-note",
        method: "GET",
        params: { limit, offset },
      }),
      providesTags: ["notes"],
    }),
  })
})

export const {useAdminGetAllNotificationsQuery,useDeleteNotificationMutation,useAdminSendUserNotificationMutation,useAdminAnnoucementMutation,useAdminGetAllAnnouncementsQuery,useDeleteAnnouncementMutation,useUpdateAnnouncementMutation,useAdminGetAllNotificationQuery} = adminNotification