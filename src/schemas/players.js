import { gql } from 'apollo-boost';

export const GET_PLAYERS = gql`
  {
    players{
      _id
      lastName
      firstName
    }
  }
`;
