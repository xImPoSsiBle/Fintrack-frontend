import { baseApi } from './baseApi'
import type { Category, CategoryCreate, CategoryUpdate, TransactionType } from '../../types/category'

export const categoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query<Category[], void>({
      query: () => '/categories',
      providesTags: [{ type: 'Category', id: 'LIST' }],
    }),
    getCategoriesByType: builder.query<Category[], TransactionType>({
      query: (type) => `/categories/${type}`,
      providesTags: (result) =>
        result
          ? [...result.map((c) => ({ type: 'Category' as const, id: c.id })), { type: 'Category', id: 'LIST' }]
          : [{ type: 'Category', id: 'LIST' }],
    }),
    createCategory: builder.mutation<Category, CategoryCreate>({
      query: (body) => ({
        url: '/categories',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Category', id: 'LIST' }],
    }),
    updateCategory: builder.mutation<Category, { id: number; data: CategoryUpdate }>({
      query: ({ id, data }) => ({
        url: `/categories/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Category', id }, { type: 'Category', id: 'LIST' }],
    }),
    deleteCategory: builder.mutation<void, number>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Category', id: 'LIST' }],
    })
  }),
})

export const {
  useGetAllCategoriesQuery,
  useGetCategoriesByTypeQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation
} = categoriesApi
