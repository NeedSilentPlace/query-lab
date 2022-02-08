import * as Types from '../../../types';

import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useQuery, UseQueryOptions, useInfiniteQuery, UseInfiniteQueryOptions, QueryFunctionContext } from 'react-query';

function fetcher<TData, TVariables>(client: GraphQLClient, query: string, variables?: TVariables, headers?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request<TData, TVariables>(query, variables, headers);
}
export type PostDetailQueryVariables = Types.Exact<{
  postId: Types.Scalars['String'];
}>;


export type PostDetailQueryResponse = { post?: { id: string, title: string, thumbnail: string, description: string } | null | undefined };


export const PostDetailDocument = `
    query PostDetail($postId: String!) {
  post(id: $postId) {
    id
    title
    thumbnail
    description
  }
}
    `;
export const usePostDetailQuery = <
      TData = PostDetailQueryResponse,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: PostDetailQueryVariables,
      options?: UseQueryOptions<PostDetailQueryResponse, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<PostDetailQueryResponse, TError, TData>(
      ['PostDetail', variables],
      fetcher<PostDetailQueryResponse, PostDetailQueryVariables>(client, PostDetailDocument, variables, headers),
      options
    );

usePostDetailQuery.getKey = (variables: PostDetailQueryVariables) => ['PostDetail', variables];
;

export const useInfinitePostDetailQuery = <
      TData = PostDetailQueryResponse,
      TError = unknown
    >(
      pageParamKey: keyof PostDetailQueryVariables,
      client: GraphQLClient,
      variables: PostDetailQueryVariables,
      options?: UseInfiniteQueryOptions<PostDetailQueryResponse, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useInfiniteQuery<PostDetailQueryResponse, TError, TData>(
      ['PostDetail.infinite', variables],
      (metaData) => fetcher<PostDetailQueryResponse, PostDetailQueryVariables>(client, PostDetailDocument, {...variables, ...(metaData.pageParam ?? {})}, headers)(),
      options
    );

usePostDetailQuery.fetcher = (client: GraphQLClient, variables: PostDetailQueryVariables, headers?: RequestInit['headers']) => fetcher<PostDetailQueryResponse, PostDetailQueryVariables>(client, PostDetailDocument, variables, headers);