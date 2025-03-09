import type {
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import {
  type AxiosError,
  type InternalAxiosRequestConfig
} from "axios";

export interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export type QueryKeyT = readonly unknown[];

export type UseQueryOptionsT<
  TQueryFnData = unknown,
  TError = AxiosError,
  TData = TQueryFnData,
  TQueryKey extends QueryKeyT = QueryKeyT,
> = Omit<
  UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  "queryKey" | "queryFn"
>;

export type UseMutationOptionsT<
  TData = unknown,
  TError = AxiosError,
  TVariables = void,
  TContext = unknown,
> = UseMutationOptions<TData, TError, TVariables, TContext>;
