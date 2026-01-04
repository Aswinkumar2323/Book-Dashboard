import { useEffect, useState } from 'react';
import { ChakraProvider, defaultSystem, Spinner, Center } from '@chakra-ui/react';
import { createToaster } from '@chakra-ui/react';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import { ApolloProvider } from '@apollo/client';
import { createApolloClient } from './lib/apollo-client';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';

// Create global toaster instance
export const toaster = createToaster({
    placement: 'top-end',
    pauseOnPageIdle: true,
});

/**
 * App Content Component
 * Handles authentication state and Apollo Client setup
 */
const AppContent: React.FC = () => {
    const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
    const [apolloClient, setApolloClient] = useState<any>(null);

    // Create Apollo Client when authenticated
    useEffect(() => {
        if (isAuthenticated) {
            const client = createApolloClient(getAccessTokenSilently);
            setApolloClient(client);
        }
    }, [isAuthenticated, getAccessTokenSilently]);

    // Show loading spinner while Auth0 is initializing
    if (isLoading) {
        return (
            <Center h="100vh" bg="gray.100">
                <Spinner size="xl" color="gray.700" />
            </Center>
        );
    }

    // Show login page if not authenticated
    if (!isAuthenticated) {
        return <Login />;
    }

    // Show loading spinner while Apollo Client is being created
    if (!apolloClient) {
        return (
            <Center h="100vh" bg="gray.100">
                <Spinner size="xl" color="gray.700" />
            </Center>
        );
    }

    // Show dashboard when authenticated and Apollo Client is ready
    return (
        <ApolloProvider client={apolloClient}>
            <Dashboard />
        </ApolloProvider>
    );
};

/**
 * Main App Component
 * Wraps the app with Auth0 and Chakra UI providers
 */
function App() {
    return (
        <Auth0Provider
            domain={import.meta.env.VITE_AUTH0_DOMAIN}
            clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
            authorizationParams={{
                redirect_uri: window.location.origin,
                audience: import.meta.env.VITE_AUTH0_AUDIENCE,
            }}
        >
            <ChakraProvider value={defaultSystem}>
                <AppContent />
            </ChakraProvider>
        </Auth0Provider>
    );
}

export default App;
