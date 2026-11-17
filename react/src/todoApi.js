import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const todoApi=createApi({
    reducerPath:'todoApi',
    baseQuery:fetchBaseQuery({
        baseUrl:'https://to-dos-api.softclub.tj/api/'
    }),
    endpoints:(buider)=>({
        getTodos:buider.query({
            query:()=>"to-dos",
            providesTags: ["Todos"],
        }),
        addTodo:buider.mutation({
            query:(data)=>({
                url:"to-dos",
                method:'post',
                body:data
            }),
          invalidatesTags: ["Todos"],
        }),
        editTodo:buider.mutation({
            query:(data)=>({
                url:"to-dos",
                method:'put',
                body:data
            }),
            invalidatesTags:['Todos'],
        }),
        deleteTodo:buider.mutation({
            query:(id)=>({
                url:`to-dos?id=${id}`,
                method:"delete",
            }),
            invalidatesTags:['Todos']
        })
    })
})
export const {useGetTodosQuery,useAddTodoMutation,useEditTodoMutation,useDeleteTodoMutation,} = todoApi;