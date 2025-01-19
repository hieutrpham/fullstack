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
  query {
    repositories {
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
