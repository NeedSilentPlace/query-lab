export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Book = {
  __typename?: 'Book';
  author: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['ID'];
  thumbnail: Scalars['String'];
  title: Scalars['String'];
};

export type BookUpdateInput = {
  author: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['ID'];
  thumbnail: Scalars['String'];
  title: Scalars['String'];
};

export type BooksQueryInput = {
  limit: Scalars['Int'];
  offset: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']>;
  updateBook: Book;
  updatePost: Post;
};


export type MutationUpdateBookArgs = {
  input: BookUpdateInput;
};


export type MutationUpdatePostArgs = {
  input: PostUpdateInput;
};

export type Post = {
  __typename?: 'Post';
  description: Scalars['String'];
  id: Scalars['ID'];
  thumbnail: Scalars['String'];
  title: Scalars['String'];
};

export type PostUpdateInput = {
  description: Scalars['String'];
  id: Scalars['ID'];
  thumbnail: Scalars['String'];
  title: Scalars['String'];
};

export type PostsQueryInput = {
  limit: Scalars['Int'];
  offset: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']>;
  book: Book;
  books: Array<Book>;
  post?: Maybe<Post>;
  posts: Array<Post>;
};


export type QueryBookArgs = {
  id: Scalars['String'];
};


export type QueryBooksArgs = {
  input?: InputMaybe<BooksQueryInput>;
};


export type QueryPostArgs = {
  id: Scalars['String'];
};


export type QueryPostsArgs = {
  input?: InputMaybe<PostsQueryInput>;
};
