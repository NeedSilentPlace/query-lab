import * as Types from '../../../../types';

import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useQuery, UseQueryOptions, useInfiniteQuery, UseInfiniteQueryOptions, QueryFunctionContext } from 'react-query';

function fetcher<TData, TVariables>(client: GraphQLClient, query: string, variables?: TVariables, headers?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request<TData, TVariables>(query, variables, headers);
}
export type PostsQueryVariables = Types.Exact<{
  input?: Types.InputMaybe<Types.PostsQueryInput>;
}>;


export type PostsQueryResponse = { posts: Array<{ id: string, title: string, thumbnail: string, description: string }> };


export const PostsDocument = `
    query Posts($input: PostsQueryInput) {
  posts(input: $input) {
    id
    title
    thumbnail
    description
  }
}
    `;
export const usePostsQuery = <
      TData = PostsQueryResponse,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: PostsQueryVariables,
      options?: UseQueryOptions<PostsQueryResponse, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<PostsQueryResponse, TError, TData>(
      variables === undefined ? ['Posts'] : ['Posts', variables],
      fetcher<PostsQueryResponse, PostsQueryVariables>(client, PostsDocument, variables, headers),
      options
    );

usePostsQuery.getKey = (variables?: PostsQueryVariables) => variables === undefined ? ['Posts'] : ['Posts', variables];
;

export const useInfinitePostsQuery = <
      TData = PostsQueryResponse,
      TError = unknown
    >(
      pageParamKey: keyof PostsQueryVariables,
      client: GraphQLClient,
      variables?: PostsQueryVariables,
      options?: UseInfiniteQueryOptions<PostsQueryResponse, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useInfiniteQuery<PostsQueryResponse, TError, TData>(
      variables === undefined ? ['Posts.infinite'] : ['Posts.infinite', variables],
      (metaData) => fetcher<PostsQueryResponse, PostsQueryVariables>(client, PostsDocument, {...variables, ...(metaData.pageParam ?? {})}, headers)(),
      options
    );

usePostsQuery.fetcher = (client: GraphQLClient, variables?: PostsQueryVariables, headers?: RequestInit['headers']) => fetcher<PostsQueryResponse, PostsQueryVariables>(client, PostsDocument, variables, headers);