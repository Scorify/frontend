import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Check = {
  __typename?: 'Check';
  config: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  source: Source;
};

export type Config = {
  __typename?: 'Config';
  check: Check;
  config: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  user: User;
};

export type LoginOutput = {
  __typename?: 'LoginOutput';
  domain: Scalars['String']['output'];
  expires: Scalars['Int']['output'];
  httpOnly: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  path: Scalars['String']['output'];
  secure: Scalars['Boolean']['output'];
  token: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: Scalars['Boolean']['output'];
  createCheck: Check;
  createUser: User;
  deleteCheck: Scalars['Boolean']['output'];
  deleteUser: Scalars['Boolean']['output'];
  editConfig: Config;
  login: LoginOutput;
  updateCheck: Check;
  updateUser: User;
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};


export type MutationCreateCheckArgs = {
  config: Scalars['String']['input'];
  name: Scalars['String']['input'];
  source: Scalars['String']['input'];
};


export type MutationCreateUserArgs = {
  number?: InputMaybe<Scalars['Int']['input']>;
  password: Scalars['String']['input'];
  role: Role;
  username: Scalars['String']['input'];
};


export type MutationDeleteCheckArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationEditConfigArgs = {
  config: Scalars['String']['input'];
  id: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationUpdateCheckArgs = {
  config?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID']['input'];
  number?: InputMaybe<Scalars['Int']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Role>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  check: Check;
  checks: Array<Check>;
  config: Config;
  configs: Array<Config>;
  me: User;
  source: Source;
  sources: Array<Source>;
};


export type QueryCheckArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};


export type QueryConfigArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySourceArgs = {
  name: Scalars['String']['input'];
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export type Source = {
  __typename?: 'Source';
  name: Scalars['String']['output'];
  schema: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID']['output'];
  number?: Maybe<Scalars['Int']['output']>;
  role: Role;
  username: Scalars['String']['output'];
};


export const MeDocument = gql`
    query Me {
  me {
    id
    username
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export function useMeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeSuspenseQueryHookResult = ReturnType<typeof useMeSuspenseQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    name
    token
    expires
    path
    domain
    secure
    httpOnly
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($oldPassword: String!, $newPassword: String!) {
  changePassword(oldPassword: $oldPassword, newPassword: $newPassword)
}
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      oldPassword: // value for 'oldPassword'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const ChecksDocument = gql`
    query Checks {
  checks {
    id
    name
    config
    source {
      name
      schema
    }
  }
  sources {
    name
    schema
  }
}
    `;

/**
 * __useChecksQuery__
 *
 * To run a query within a React component, call `useChecksQuery` and pass it any options that fit your needs.
 * When your component renders, `useChecksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChecksQuery({
 *   variables: {
 *   },
 * });
 */
export function useChecksQuery(baseOptions?: Apollo.QueryHookOptions<ChecksQuery, ChecksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ChecksQuery, ChecksQueryVariables>(ChecksDocument, options);
      }
export function useChecksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChecksQuery, ChecksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ChecksQuery, ChecksQueryVariables>(ChecksDocument, options);
        }
export function useChecksSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ChecksQuery, ChecksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ChecksQuery, ChecksQueryVariables>(ChecksDocument, options);
        }
export type ChecksQueryHookResult = ReturnType<typeof useChecksQuery>;
export type ChecksLazyQueryHookResult = ReturnType<typeof useChecksLazyQuery>;
export type ChecksSuspenseQueryHookResult = ReturnType<typeof useChecksSuspenseQuery>;
export type ChecksQueryResult = Apollo.QueryResult<ChecksQuery, ChecksQueryVariables>;
export const CreateCheckDocument = gql`
    mutation CreateCheck($name: String!, $source: String!, $config: String!) {
  createCheck(name: $name, source: $source, config: $config) {
    id
    name
    source {
      name
      schema
    }
  }
}
    `;
export type CreateCheckMutationFn = Apollo.MutationFunction<CreateCheckMutation, CreateCheckMutationVariables>;

/**
 * __useCreateCheckMutation__
 *
 * To run a mutation, you first call `useCreateCheckMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCheckMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCheckMutation, { data, loading, error }] = useCreateCheckMutation({
 *   variables: {
 *      name: // value for 'name'
 *      source: // value for 'source'
 *      config: // value for 'config'
 *   },
 * });
 */
export function useCreateCheckMutation(baseOptions?: Apollo.MutationHookOptions<CreateCheckMutation, CreateCheckMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCheckMutation, CreateCheckMutationVariables>(CreateCheckDocument, options);
      }
export type CreateCheckMutationHookResult = ReturnType<typeof useCreateCheckMutation>;
export type CreateCheckMutationResult = Apollo.MutationResult<CreateCheckMutation>;
export type CreateCheckMutationOptions = Apollo.BaseMutationOptions<CreateCheckMutation, CreateCheckMutationVariables>;
export const UpdateCheckDocument = gql`
    mutation UpdateCheck($id: ID!, $name: String, $config: String) {
  updateCheck(id: $id, name: $name, config: $config) {
    id
    name
    source {
      name
      schema
    }
  }
}
    `;
export type UpdateCheckMutationFn = Apollo.MutationFunction<UpdateCheckMutation, UpdateCheckMutationVariables>;

/**
 * __useUpdateCheckMutation__
 *
 * To run a mutation, you first call `useUpdateCheckMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCheckMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCheckMutation, { data, loading, error }] = useUpdateCheckMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      config: // value for 'config'
 *   },
 * });
 */
export function useUpdateCheckMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCheckMutation, UpdateCheckMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCheckMutation, UpdateCheckMutationVariables>(UpdateCheckDocument, options);
      }
export type UpdateCheckMutationHookResult = ReturnType<typeof useUpdateCheckMutation>;
export type UpdateCheckMutationResult = Apollo.MutationResult<UpdateCheckMutation>;
export type UpdateCheckMutationOptions = Apollo.BaseMutationOptions<UpdateCheckMutation, UpdateCheckMutationVariables>;
export const DeleteCheckDocument = gql`
    mutation DeleteCheck($id: ID!) {
  deleteCheck(id: $id)
}
    `;
export type DeleteCheckMutationFn = Apollo.MutationFunction<DeleteCheckMutation, DeleteCheckMutationVariables>;

/**
 * __useDeleteCheckMutation__
 *
 * To run a mutation, you first call `useDeleteCheckMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCheckMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCheckMutation, { data, loading, error }] = useDeleteCheckMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCheckMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCheckMutation, DeleteCheckMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCheckMutation, DeleteCheckMutationVariables>(DeleteCheckDocument, options);
      }
export type DeleteCheckMutationHookResult = ReturnType<typeof useDeleteCheckMutation>;
export type DeleteCheckMutationResult = Apollo.MutationResult<DeleteCheckMutation>;
export type DeleteCheckMutationOptions = Apollo.BaseMutationOptions<DeleteCheckMutation, DeleteCheckMutationVariables>;
export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, username: string } };

export type LoginMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginOutput', name: string, token: string, expires: number, path: string, domain: string, secure: boolean, httpOnly: boolean } };

export type ChangePasswordMutationVariables = Exact<{
  oldPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: boolean };

export type ChecksQueryVariables = Exact<{ [key: string]: never; }>;


export type ChecksQuery = { __typename?: 'Query', checks: Array<{ __typename?: 'Check', id: string, name: string, config: string, source: { __typename?: 'Source', name: string, schema: string } }>, sources: Array<{ __typename?: 'Source', name: string, schema: string }> };

export type CreateCheckMutationVariables = Exact<{
  name: Scalars['String']['input'];
  source: Scalars['String']['input'];
  config: Scalars['String']['input'];
}>;


export type CreateCheckMutation = { __typename?: 'Mutation', createCheck: { __typename?: 'Check', id: string, name: string, source: { __typename?: 'Source', name: string, schema: string } } };

export type UpdateCheckMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  config?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateCheckMutation = { __typename?: 'Mutation', updateCheck: { __typename?: 'Check', id: string, name: string, source: { __typename?: 'Source', name: string, schema: string } } };

export type DeleteCheckMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteCheckMutation = { __typename?: 'Mutation', deleteCheck: boolean };
