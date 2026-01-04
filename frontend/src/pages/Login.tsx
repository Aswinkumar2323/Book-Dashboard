import {
    Box,
    Container,
    Heading,
    Text,
    Button,
    Stack,
    Center,
    Flex,
    HStack,
    VStack,
} from '@chakra-ui/react';
import { useAuth0 } from '@auth0/auth0-react';

/**
 * Login Page Component
 * Split-screen design with hero section and login form
 */
export const Login: React.FC = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <Box minH="100vh" bg="gray.50">
            {/* Header */}
            <Box
                as="header"
                borderBottom="1px solid"
                borderColor="gray.200"
                bg="white"
            >
                <Container maxW="7xl">
                    <Flex h="16" align="center" justify="space-between">
                        <HStack gap={3}>
                            <Center
                                h="8"
                                w="8"
                                borderRadius="md"
                                bg="blue.600"
                                color="white"
                            >
                                📚
                            </Center>
                            <Heading size="md" fontWeight="bold">
                                Book Dashboard
                            </Heading>
                        </HStack>
                    </Flex>
                </Container>
            </Box>

            {/* Main Content */}
            <Flex
                as="main"
                flex="1"
                align="center"
                justify="center"
                px={4}
                py={12}
            >
                <Box
                    maxW="1000px"
                    w="full"
                    borderRadius="xl"
                    overflow="hidden"
                    bg="white"
                    shadow="2xl"
                    minH="600px"
                >
                    <Flex direction={{ base: 'column', md: 'row' }} h="full">
                        {/* Left Side - Hero Section */}
                        <Box
                            w={{ base: 'full', md: '50%' }}
                            bg="gray.900"
                            p={10}
                            position="relative"
                            display={{ base: 'none', md: 'flex' }}
                            flexDirection="column"
                            justifyContent="space-between"
                            color="white"
                        >
                            {/* Background Image Overlay */}
                            <Box
                                position="absolute"
                                inset="0"
                                bgImage="url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')"
                                bgSize="cover"
                                backgroundPosition="center"
                                opacity="0.2"
                                zIndex="0"
                            />
                            <Box
                                position="absolute"
                                inset="0"
                                bgGradient="to-t"
                                gradientFrom="gray.900"
                                gradientVia="gray.900/80"
                                gradientTo="transparent"
                                zIndex="1"
                            />

                            {/* Content */}
                            <VStack align="start" gap={6} position="relative" zIndex="2" flex="1" justify="center">
                                <Center
                                    h="12"
                                    w="12"
                                    borderRadius="lg"
                                    bg="whiteAlpha.100"
                                    backdropFilter="blur(10px)"
                                    border="1px solid"
                                    borderColor="whiteAlpha.200"
                                >
                                    <Text fontSize="2xl">📖</Text>
                                </Center>
                                <Heading
                                    size="2xl"
                                    fontWeight="black"
                                    lineHeight="tight"
                                    maxW="sm"
                                >
                                    Manage your library with precision.
                                </Heading>
                                <Text
                                    color="gray.400"
                                    fontSize="lg"
                                    lineHeight="relaxed"
                                    maxW="sm"
                                >
                                    A minimalist dashboard to track your inventory. Edit, delete, and organize your books efficiently with our secure platform.
                                </Text>
                            </VStack>

                            {/* Testimonial Section */}
                            <Box
                                position="relative"
                                zIndex="2"
                                mt="auto"
                                pt={8}
                                borderTop="1px solid"
                                borderColor="whiteAlpha.100"
                            >
                                <HStack gap={3}>
                                    <HStack gap={-2}>
                                        {/* <Box
                                            h="8"
                                            w="8"
                                            borderRadius="full"
                                            border="2px solid"
                                            borderColor="gray.900"
                                            bgImage="url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&q=80')"
                                            bgSize="cover"
                                        />
                                        <Box
                                            h="8"
                                            w="8"
                                            borderRadius="full"
                                            border="2px solid"
                                            borderColor="gray.900"
                                            bgImage="url('https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&q=80')"
                                            bgSize="cover"
                                        /> */}
                                        {/* <Box
                                            h="8"
                                            w="8"
                                            borderRadius="full"
                                            border="2px solid"
                                            borderColor="gray.900"
                                            bgImage="url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&q=80')"
                                            bgSize="cover"
                                        /> */}
                                    </HStack>
                                    {/* <Text fontSize="sm" fontWeight="medium" color="gray.400">
                                        Trusted by 200+ Libraries
                                    </Text> */}
                                </HStack>
                            </Box>
                        </Box>

                        {/* Right Side - Login Form */}
                        <Flex
                            w={{ base: 'full', md: '50%' }}
                            direction="column"
                            justify="center"
                            p={{ base: 8, sm: 12, lg: 16 }}
                        >
                            <Box mx="auto" w="full" maxW="360px">
                                <Box mb={10}>
                                    <Heading size="xl" fontWeight="bold" color="gray.900">
                                        Welcome back
                                    </Heading>
                                    <Text mt={2} fontSize="sm" color="gray.500">
                                        Please sign in to access your dashboard.
                                    </Text>
                                </Box>

                                {/* Login Options */}
                                <Stack gap={4}>
                                    {/* Primary Auth0 Button */}
                                    <Button
                                        size="lg"
                                        bg="blue.600"
                                        color="white"
                                        fontWeight="bold"
                                        onClick={() => loginWithRedirect()}
                                        _hover={{
                                            bg: "blue.700"
                                        }}
                                    >
                                        <HStack gap={2}>
                                            <Text>🔓</Text>
                                            <Text>Log In with Auth0</Text>
                                        </HStack>
                                    </Button>
                                </Stack>
                            </Box>
                        </Flex>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    );
};
