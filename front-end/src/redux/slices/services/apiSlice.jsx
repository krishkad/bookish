import { createApi , fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_PUBLIC_URL}/api/admin/`,
    // baseUrl: 'https://bookish-8j43.onrender.com/api/user/',

    prepareHeaders: (headers) => {
        const token = localStorage.getItem('userrToken');

        if(token) {
            headers.set('authorization' , `Bearer ${token}`);
        }
        return headers;
    }
})

export const userApiSlice = createApi({

    reducerPath: 'userApi',
    baseQuery,
    tagTypes: ['Cart', 'Books'],

    endpoints : (builder) => ({

        registerUser: builder.mutation({
            query : (userData) => ({
                url: 'signup',
                method: 'POST',
                body: userData
            })
        }),

        loginUser: builder.mutation({
            query: (userData) => ({
                url: 'login',
                method: 'POST',
                body: userData
            })
        }),

        booksForUsers: builder.query({
            query: () => ({
                url : 'books',
                method: 'GET',
            }),
            providesTags: ['Books'],
        }),

        fetchCartInfo: builder.query({
            query: () => ({
                url : 'cart_items',
                method: 'GET',
            }),
            providesTags: ['Cart'],
        }),

        addAndRemoveFromCart: builder.mutation({
            query: (id) => ({
                url : `toggle_cart/${id}`,
                method: 'PUT',
            }),
            invalidatesTags: ['Cart'],
        })
    })

})


export const { 
    useRegisterUserMutation , useLoginUserMutation , useBooksForUsersQuery ,
    useFetchCartInfoQuery , useAddAndRemoveFromCartMutation
} = userApiSlice;