import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

/**
 * Create Apollo Client with Auth0 authentication
 * @param getAccessTokenSilently - Auth0 function to get access token
 * @returns Configured Apollo Client instance
 */
export const createApolloClient = (getAccessTokenSilently: () => Promise<string>) => {
    // HTTP link to GraphQL API
    const httpLink = createHttpLink({
        uri: import.meta.env.VITE_API_URL || 'http://localhost:3005/graphql',
    });

    // Auth link to add JWT token to requests
    const authLink = setContext(async (_, { headers }) => {
        try {
            const token = await getAccessTokenSilently();
            return {
                headers: {
                    ...headers,
                    authorization: token ? `Bearer ${token}` : '',
                },
            };
        } catch (error) {
            console.error('Error getting access token:', error);
            return { headers };
        }
    });

    // Create and return Apollo Client
    return new ApolloClient({
        link: from([authLink, httpLink]),
        cache: new InMemoryCache(),
        defaultOptions: {
            watchQuery: {
                fetchPolicy: 'cache-and-network',
            },
        },
    });
};
