import * as Types from '../../../../types';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
import { ClientError } from 'graphql-request/dist/types';
import useSWR, { SWRConfiguration as SWRConfigInterface, Key as SWRKeyInterface } from 'swr';
export type BookQueryVariables = Types.Exact<{
  bookId: Types.Scalars['String'];
}>;


export type BookQuery = { __typename?: 'Query', book: { __typename?: 'Book', id: string, title: string, author: string, description: string, thumbnail: string } };

export type UpdateBookMutationVariables = Types.Exact<{
  input: Types.BookUpdateInput;
}>;


export type UpdateBookMutation = { __typename?: 'Mutation', updateBook: { __typename?: 'Book', id: string, title: string, author: string, description: string, thumbnail: string } };


export const BookDocument = gql`
    query Book($bookId: String!) {
  book(id: $bookId) {
    id
    title
    author
    description
    thumbnail
  }
}
    `;
export const UpdateBookDocument = gql`
    mutation UpdateBook($input: BookUpdateInput!) {
  updateBook(input: $input) {
    id
    title
    author
    description
    thumbnail
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    Book(variables: BookQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<BookQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<BookQuery>(BookDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Book');
    },
    UpdateBook(variables: UpdateBookMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateBookMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateBookMutation>(UpdateBookDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateBook');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;
export function getSdkWithHooks(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  const sdk = getSdk(client, withWrapper);
  const genKey = <V extends Record<string, unknown> = Record<string, unknown>>(name: string, object: V = {} as V): SWRKeyInterface => [name, ...Object.keys(object).sort().map(key => object[key])];
  return {
    ...sdk,
    useBook(variables: BookQueryVariables, config?: SWRConfigInterface<BookQuery, ClientError>) {
      return useSWR<BookQuery, ClientError>(genKey<BookQueryVariables>('Book', variables), () => sdk.Book(variables), config);
    }
  };
}
export type SdkWithHooks = ReturnType<typeof getSdkWithHooks>;