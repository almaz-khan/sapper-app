import { ApolloClient, InMemoryCache } from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import fetch from 'isomorphic-unfetch';

let apolloClient = null;
const uri = process.env.HOST_URI || 'http://localhost:3000/graphql/';

function create({ fetchOptions }, token) {
  const httpLink = createHttpLink({
    uri,
    credentials: 'same-origin',
    fetchOptions
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        token
      }
    };
  });

  const isBrowser = typeof window !== 'undefined';

  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser,
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });
}

export default function initApollo(options, token) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    let fetchOptions = {
      fetch: fetch
    };

    return create(
      {
        ...options,
        fetchOptions
      },
      token
    );
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(options, token);
  }

  return apolloClient;
}
