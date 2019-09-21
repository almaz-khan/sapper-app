import { gql } from 'apollo-boost';

export const GET_GAMES = gql`
  query GetGame($limit: Int, $skip: Int, $query: GameFilter) {
    games(limit: $limit, skip: $skip, query: $query) {
      _id
      startDate
      endDate
      source
      red {
        score
        offense {
          _id
          firstName
          lastName
        }
        defense {
          _id
          firstName
          lastName
        }
      }
      blue {
        score
        offense {
          _id
          firstName
          lastName
        }
        defense {
          _id
          firstName
          lastName
        }
      }
    }
  }
`;

export const ADD_GAME = gql`
  mutation AddGame($input: GameInput!) {
    addGame(input: $input) {
      red {
        defense {
          lastName
          firstName
        }
      }
      blue {
        defense {
          lastName
          firstName
        }
      }
    }
  }
`;
