import { ApolloClient, InMemoryCache } from 'apollo-boost'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import fetch from 'isomorphic-unfetch'

let apolloClient = null

// Polyfill fetch() on the server (used by apollo-client)
if (typeof window === 'undefined') {
  global.fetch = fetch
}

function create ({ getToken, fetchOptions }) {
  const httpLink = createHttpLink({
    uri: 'http://localhost:9090/graphql',
    credentials: 'same-origin',
    fetchOptions
  })

  const authLink = setContext((_, { headers }) => {
    const token = getToken()

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
      }
    }
  })

  const isBrowser = typeof window !== 'undefined'
  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser,
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  })
}

export default function initApollo (options) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    let fetchOptions = {}

    return create({
      ...options,
      fetchOptions
    })
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(options)
  }

  return apolloClient
}
