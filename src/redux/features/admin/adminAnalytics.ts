import { baseApi } from "../../api/baseApi";

const adminAnalytics = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        adminUserActivity: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((item: any) => {
                        params.append(item.name, item.value);
                    });
                }
                return {
                    url: '/admin/analytics/user/active',
                    method: "GET",
                    params,
                };
            },
            providesTags: ["coffeeShop"],
        }),
        adminUserRetention: builder.query({
        query: (args: { cohortDate: Date | string; retentionDay?: number }) => {
            const params = new URLSearchParams();

            if (args) {
            if (args.cohortDate) {
                const dateStr =
                typeof args.cohortDate === 'string'
                    ? args.cohortDate
                    : args.cohortDate.toISOString().split('T')[0]; // Convert Date to 'YYYY-MM-DD'
                params.append('cohortDate', dateStr);
            }
            if (args.retentionDay !== undefined) {
                params.append('retentionDay', String(args.retentionDay));
            }
            }

            return {
            url: '/admin/analytics/user/retention',
            method: 'GET',
            params,
            };
        },
        }),
    })
})

export const { useAdminUserActivityQuery,useAdminUserRetentionQuery } = adminAnalytics