import { gql } from "@apollo/client";

const REPO_DETAILS = gql`
  fragment RepoDetails on Repository {
    id
    ownerAvatarUrl
    fullName
    description
    forksCount
    stargazersCount
    reviewCount
    ratingAverage
    language
    url
  }
`;

export const GET_REPOSITORIES = gql`
  query (
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
    $after: String
    $first: Int
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      after: $after
      first: $first
    ) {
      totalCount
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          ...RepoDetails
        }
        cursor
      }
    }
  }

  ${REPO_DETAILS}
`;

export const GET_REPOSITORY = gql`
  query ($repositoryId: ID!) {
    repository(id: $repositoryId) {
      ...RepoDetails
      reviews {
        edges {
          node {
            text
            rating
            createdAt
            user {
              username
            }
          }
        }
      }
    }
  }
  ${REPO_DETAILS}
`;

export const ME = gql`
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            rating
            repository {
              name
              id
            }
            createdAt
            text
          }
        }
      }
    }
  }
`;
