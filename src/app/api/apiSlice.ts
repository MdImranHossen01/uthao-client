import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { setCredentials } from '../features/auth/authSlice';
import { TParcel, TUser } from '@/types';

type TApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User', 'Parcel'],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/api/auth/login',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials(data.data));
        } catch (error) {}
      },
    }),
    register: builder.mutation<TUser, Partial<TUser>>({
      query: (userInfo) => ({
        url: '/api/auth/register',
        method: 'POST',
        body: userInfo,
      }),
    }),
    // Sender endpoints
    getMyParcels: builder.query<TParcel[], void>({
      query: () => '/api/parcels/my-parcels',
      transformResponse: (response: TApiResponse<TParcel[]>) => response.data,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Parcel' as const, id: _id })),
              { type: 'Parcel', id: 'LIST' },
            ]
          : [{ type: 'Parcel', id: 'LIST' }],
    }),
    createParcel: builder.mutation<TParcel, Partial<TParcel>>({
      query: (newParcel) => ({
        url: '/api/parcels',
        method: 'POST',
        body: newParcel,
      }),
      invalidatesTags: [{ type: 'Parcel', id: 'LIST' }],
    }),
    // Admin endpoints
    getAllUsers: builder.query<TUser[], void>({
      query: () => '/api/users',
      transformResponse: (response: TApiResponse<TUser[]>) => response.data,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'User' as const, id: _id })),
              { type: 'User', id: 'LIST' },
            ]
          : [{ type: 'User', id: 'LIST' }],
    }),
    updateUserStatus: builder.mutation<
      TUser,
      { userId: string; status: string }
    >({
      query: ({ userId, status }) => ({
        url: `/api/users/${userId}/update-status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),
    getAllParcels: builder.query<TParcel[], void>({
      query: () => '/api/parcels/all',
      transformResponse: (response: TApiResponse<TParcel[]>) => response.data,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Parcel' as const, id: _id })),
              { type: 'Parcel', id: 'LIST' },
            ]
          : [{ type: 'Parcel', id: 'LIST' }],
    }),
    // Receiver endpoints
    getMyDeliveries: builder.query<TParcel[], void>({
      query: () => '/api/parcels/my-deliveries',
      transformResponse: (response: TApiResponse<TParcel[]>) => response.data,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Parcel' as const, id: _id })),
              { type: 'Parcel', id: 'LIST' },
            ]
          : [{ type: 'Parcel', id: 'LIST' }],
    }),
    confirmDelivery: builder.mutation<TParcel, string>({
      query: (parcelId) => ({
        url: `/api/parcels/${parcelId}/confirm-delivery`,
        method: 'PATCH',
      }),
      invalidatesTags: [{ type: 'Parcel', id: 'LIST' }],
    }),
    // Public tracking endpoint
    trackParcelById: builder.query<TParcel, string>({
      query: (trackingId) => `/api/parcels/track/${trackingId}`,
      transformResponse: (response: TApiResponse<TParcel>) => response.data,
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetMyParcelsQuery,
  useCreateParcelMutation,
  useGetAllUsersQuery,
  useUpdateUserStatusMutation,
  useGetAllParcelsQuery,
  useGetMyDeliveriesQuery,
  useConfirmDeliveryMutation,
  useLazyTrackParcelByIdQuery,
} = apiSlice;