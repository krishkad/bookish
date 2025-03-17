import { createApi , fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: `${process.env.PUBLIC_URL}/api/admin/`,
    // baseUrl: 'https://bookish-8j43.onrender.com/api/admin/',

    prepareHeaders: (headers) => {
        const token = localStorage.getItem('adminToken');

        if(token) {
            headers.set('authorization' , `Bearer ${token}`);
        }
        return headers;
    }
})

export const adminApiSlice = createApi({

    reducerPath: 'adminApi',
    baseQuery,
    tagTypes: ['books'],

    endpoints : (builder) => ({
        adminLogin: builder.mutation({
            query: (data) => ({
                url: 'login',
                method: 'POST',
                body: data
            }),
        }),

        addBook: builder.mutation({
            query : (data) => ({
                url: 'add_book',
                method: 'POST',
                body: data
            }),
            invalidatesTags: [{type: 'books' , id: 'LIST'}]
        }),

        getBooks: builder.query({
            query: ({page , limit}) => ({
                url : `books?page=${page}&limit=${limit}`,
                method: 'GET',
            }),
            providesTags: [{type: 'books' , id: 'LIST'}]
        }),

        deleteBook: builder.mutation({
            query: (id) => ({
                url: `delete_book/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags : [{type: 'books' , id: 'LIST'}]
        }),

        getSingleBook: builder.query({
            query: (id) => ({
                url: `book/${id}`,
                method: 'GET'
            }),
            invalidatesTags : [{type: 'books' , id: 'LIST'}]
        }),

        updateBook: builder.mutation({
            query: ({id , ...data}) => ({
                url: `edit_book/${id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags : [{type: 'books' , id: 'LIST'}]
        })
    })

})


export const { 
    useAdminLoginMutation , useAddBookMutation, useGetBooksQuery , 
    useDeleteBookMutation , useGetSingleBookQuery, useUpdateBookMutation
} = adminApiSlice;