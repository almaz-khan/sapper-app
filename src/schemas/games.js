import { gql } from 'apollo-boost';

export const GET_GAMES = gql`
{
  games {
    _id,
    red {
      score,
      offense {
        _id,
        firstName,
        lastName
      },
      defense {
        _id,
        firstName,
        lastName
      }
    },
    blue {
      score,
      offense {
        _id,
        firstName,
        lastName
      },
      defense {
        _id,
        firstName,
        lastName
      }
    }
  }
}
`;
