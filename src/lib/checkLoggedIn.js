import gql from 'graphql-tag';

export default async apolloClient => {
  return apolloClient
    .query({
      query: gql`
        {
          getUser {
            username
            email
          }
        }
      `
    })
    .then(({ data }) => ({ loggedInUser: data.getUser }))
    .catch(() => ({ loggedInUser: {} }));
};
