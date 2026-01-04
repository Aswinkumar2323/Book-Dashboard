import {
    Box,
    Container,
    Heading,
    Button,
    HStack,
    Spinner,
    Center,
    Text,
    Stack,
    Flex,
    VStack,
} from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { GET_BOOKS } from '../graphql/books';
import { Book } from '../types/book';
import { BooksTable } from '../components/BooksTable';
import { BookFormModal } from '../components/BookFormModal';
import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';

/**
 * Dashboard Page Component
 * Main page displaying the books table with search and actions
 */
export const Dashboard: React.FC = () => {
    const { logout, user } = useAuth0();
    const [createModalOpen, setCreateModalOpen] = useState(false);

    // Fetch all books
    const { data, loading, error } = useQuery<{ books: Book[] }>(GET_BOOKS);

    if (loading) {
        return (
            <Center h="100vh" bg="gray.50">
                <Spinner size="xl" color="blue.600" />
            </Center>
        );
    }

    if (error) {
        return (
            <Center h="100vh" bg="gray.50">
                <Stack gap={4} align="center">
                    <Text color="gray.800" fontSize="xl" fontWeight="semibold">
                        Error loading books: {error.message}
                    </Text>
                    <Text color="gray.600" textAlign="center">
                        Please make sure the backend server is running and you're authenticated.
                    </Text>
                </Stack>
            </Center>
        );
    }

    const books = data?.books || [];

    return (
        <Box minH="100vh" bg="gray.50">
            {/* Top Navigation Bar */}
            <Box
                as="header"
                position="sticky"
                top="0"
                zIndex="20"
                borderBottom="1px solid"
                borderColor="gray.200"
                bg="white"
                px={6}
                py={3}
            >
                <Flex justify="space-between" align="center">
                    <HStack gap={4}>
                        <Center
                            w="10"
                            h="10"
                            borderRadius="lg"
                            bg="blue.50"
                            color="blue.600"
                        >
                            📚
                        </Center>
                        <Heading size="md" fontWeight="bold" color="gray.900">
                            Book Dashboard
                        </Heading>
                    </HStack>

                    <HStack gap={6}>
                        {/* User Profile */}
                        <HStack gap={3}>
                            <VStack align="end" gap={0} display={{ base: 'none', sm: 'flex' }}>
                                <Text fontSize="sm" fontWeight="bold" lineHeight="none">
                                    {user?.name || 'Admin User'}
                                </Text>
                                <Text fontSize="xs" color="gray.500">
                                    {user?.email || 'admin@library.com'}
                                </Text>
                            </VStack>
                            <Box
                                w="10"
                                h="10"
                                borderRadius="full"
                                border="1px solid"
                                borderColor="gray.200"
                                bgImage={user?.picture || "url('https://via.placeholder.com/40')"}
                                bgSize="cover"
                                backgroundPosition="center"
                            />
                            <Button
                                size="sm"
                                variant="outline"
                                borderColor="gray.200"
                                color="gray.900"
                                fontWeight="medium"
                                onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                                _hover={{
                                    bg: "gray.50"
                                }}
                                ml={2}
                            >
                                <HStack gap={1}>
                                    <Text fontSize="sm">🚪</Text>
                                    <Text display={{ base: 'none', sm: 'inline' }}>Logout</Text>
                                </HStack>
                            </Button>
                        </HStack>
                    </HStack>
                </Flex>
            </Box>

            {/* Main Content */}
            <Box py={8} px={{ base: 4, sm: 8 }}>
                <Container maxW="1200px" px={0}>
                    <VStack gap={6} align="stretch">
                        {/* Page Heading & Actions */}
                        <Flex
                            direction={{ base: 'column', md: 'row' }}
                            justify="space-between"
                            align={{ base: 'start', md: 'end' }}
                            gap={4}
                        >
                            <VStack align="start" gap={1}>
                                <Heading
                                    size={{ base: 'xl', md: '2xl' }}
                                    fontWeight="black"
                                    color="gray.900"
                                >
                                    Book Management
                                </Heading>
                                <Text color="gray.600" fontSize="md">
                                    Manage your library collection, add new entries, or update existing records.
                                </Text>
                            </VStack>
                            <Button
                                bg="blue.600"
                                color="white"
                                fontWeight="bold"
                                size="lg"
                                onClick={() => setCreateModalOpen(true)}
                                _hover={{
                                    bg: "blue.700"
                                }}
                                shadow="sm"
                                minW="140px"
                            >
                                <HStack gap={2}>
                                    <Text fontSize="lg">➕</Text>
                                    <Text>Add New Book</Text>
                                </HStack>
                            </Button>
                        </Flex>


                        {/* Data Table Card */}
                        <Box
                            borderRadius="xl"
                            border="1px solid"
                            borderColor="gray.200"
                            bg="white"
                            overflow="hidden"
                            shadow="sm"
                        >
                            {books.length === 0 ? (
                                <Center py={16}>
                                    <VStack gap={4}>
                                        <Text fontSize="lg" color="gray.500" fontWeight="semibold">
                                            No books found
                                        </Text>
                                        <Button
                                            bg="blue.600"
                                            color="white"
                                            fontWeight="bold"
                                            onClick={() => setCreateModalOpen(true)}
                                            _hover={{
                                                bg: "blue.700"
                                            }}
                                        >
                                            + Create Your First Book
                                        </Button>
                                    </VStack>
                                </Center>
                            ) : (
                                <BooksTable books={books} />
                            )}
                        </Box>
                    </VStack>
                </Container>
            </Box>

            {/* Create Modal */}
            <BookFormModal isOpen={createModalOpen} onClose={() => setCreateModalOpen(false)} />
        </Box>
    );
};
