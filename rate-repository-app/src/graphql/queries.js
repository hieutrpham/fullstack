import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      totalCount
      edges {
        node {
          ownerAvatarUrl
          fullName
          description
          forksCount
          stargazersCount
          reviewCount
          ratingAverage
          language
        }
      }
    }
  }
`;
