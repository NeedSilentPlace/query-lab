import * as Types from '../../../../types';

import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useQuery, UseQueryOptions, useInfiniteQuery, UseInfiniteQueryOptions, QueryFunctionContext } from 'react-query';

function fetcher<TData, TVariables>(client: GraphQLClient, query: string, variables?: TVariables, headers?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request<TData, TVariables>(query, variables, headers);
}
export type BooksQueryVariables = Types.Exact<{
  input?: Types.InputMaybe<Types.BooksQueryInput>;
}>;


export type BooksQueryResponse = { books: Array<{ id: string, title: string, author: string, description: string, thumbnail: string }> };


export const BooksDocument = `
    query Books($input: BooksQueryInput) {
  books(input: $input) {
    id
    title
    author
    description
    thumbnail
  }
}
    `;
export const useBooksQuery = <
      TData = BooksQueryResponse,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: BooksQueryVariables,
      options?: UseQueryOptions<BooksQueryResponse, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<BooksQueryResponse, TError, TData>(
      variables === undefined ? ['Books'] : ['Books', variables],
      fetcher<BooksQueryResponse, BooksQueryVariables>(client, BooksDocument, variables, headers),
      options
    );

useBooksQuery.getKey = (variables?: BooksQueryVariables) => variables === undefined ? ['Books'] : ['Books', variables];
;

export const useInfiniteBooksQuery = <
      TData = BooksQueryResponse,
      TError = unknown
    >(
      pageParamKey: keyof BooksQueryVariables,
      client: GraphQLClient,
      variables?: BooksQueryVariables,
      options?: UseInfiniteQueryOptions<BooksQueryResponse, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useInfiniteQuery<BooksQueryResponse, TError, TData>(
      variables === undefined ? ['Books.infinite'] : ['Books.infinite', variables],
      (metaData) => fetcher<BooksQueryResponse, BooksQueryVariables>(client, BooksDocument, {...variables, ...(metaData.pageParam ?? {})}, headers)(),
      options
    );

useBooksQuery.fetcher = (client: GraphQLClient, variables?: BooksQueryVariables, headers?: RequestInit['headers']) => fetcher<BooksQueryResponse, BooksQueryVariables>(client, BooksDocument, variables, headers);