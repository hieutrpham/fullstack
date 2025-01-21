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
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
      totalCount
      edges {
        node {
          ...RepoDetails
        }
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
  {
    me {
      id
      username
    }
  }
`;
