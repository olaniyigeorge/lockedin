import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import axiosInstance from './axios.instance';
import { QueryKeyT, UseMutationOptionsT, UseQueryOptionsT } from './types';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});

export function useSafeQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKeyT = QueryKeyT,
>(
  queryKey: TQueryKey,
  url: string,
  options?: UseQueryOptionsT<TQueryFnData, TError, TData, TQueryKey>
) {
  return useQuery<TQueryFnData, TError, TData, TQueryKey>({
    queryKey,
    queryFn: async () => {
      const { data } = await axiosInstance.get<TQueryFnData>(url);
      return data;
    },
    ...options,
  });
}

export function useSafeMutation<
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown,
>(
  url: string,
  method: 'post' | 'put' | 'patch' | 'delete' = 'post',
  options?: UseMutationOptionsT<TData, TError, TVariables, TContext>
) {
  return useMutation<TData, TError, TVariables, TContext>({
    mutationFn: async variables => {
      const { data } = await axiosInstance[method]<TData>(url, variables);
      return data;
    },
    ...options,
  });
}
