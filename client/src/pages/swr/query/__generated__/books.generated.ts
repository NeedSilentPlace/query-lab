import * as Types from '../../../../types';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
import { ClientError } from 'graphql-request/dist/types';
import useSWR, { SWRConfiguration as SWRConfigInterface, Key as SWRKeyInterface } from 'swr';
export type BooksQueryVariables = Types.Exact<{
  input?: Types.InputMaybe<Types.BooksQueryInput>;
}>;


export type BooksQuery = { __typename?: 'Query', books: Array<{ __typename?: 'Book', id: string, title: string, author: string, description: string, thumbnail: string }> };

export type BookQueryVariables = Types.Exact<{
  bookId: Types.Scalars['String'];
}>;


export type BookQuery = { __typename?: 'Query', book: { __typename?: 'Book', id: string, title: string, author: string, description: string, thumbnail: string } };


export const BooksDocument = gql`
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

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    Books(variables?: BooksQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<BooksQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<BooksQuery>(BooksDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Books');
    },
    Book(variables: BookQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<BookQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<BookQuery>(BookDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Book');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;
export function getSdkWithHooks(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  const sdk = getSdk(client, withWrapper);
  const genKey = <V extends Record<string, unknown> = Record<string, unknown>>(name: string, object: V = {} as V): SWRKeyInterface => [name, ...Object.keys(object).sort().map(key => object[key])];
  return {
    ...sdk,
    useBooks(variables?: BooksQueryVariables, config?: SWRConfigInterface<BooksQuery, ClientError>) {
      return useSWR<BooksQuery, ClientError>(genKey<BooksQueryVariables>('Books', variables), () => sdk.Books(variables), config);
    },
    useBook(variables: BookQueryVariables, config?: SWRConfigInterface<BookQuery, ClientError>) {
      return useSWR<BookQuery, ClientError>(genKey<BookQueryVariables>('Book', variables), () => sdk.Book(variables), config);
    }
  };
}
export type SdkWithHooks = ReturnType<typeof getSdkWithHooks>;