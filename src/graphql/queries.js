import { gql } from '@apollo/client';
import { REPOSITORY_DETAILS } from './fragments';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          ...RepositoryDetails
        }
      }
    }
  }
  ${REPOSITORY_DETAILS}
`;

export const GET_REPOSITORY = gql`
  query ($repositoryId: ID!) {
    repository(id: $repositoryId) {
      ...RepositoryDetails
      url
    }
  }
  ${REPOSITORY_DETAILS}
`;

export const CHECK_LOGGED_USER = gql`
  query {
    me {
      id
      username
    }
  }
`;