import {
    Table,
    IconButton,
    HStack,
    Text,
    Box,
} from '@chakra-ui/react';
import { toaster } from '../App';
import { useMutation } from '@apollo/client';
import { Book } from '../types/book';
import { DELETE_BOOK, GET_BOOKS } from '../graphql/books';
import { BookFormModal } from './BookFormModal';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';
import { useState } from 'react';

interface BooksTableProps {
    books: Book[];
}

/**
 * Books Table Component
 * Displays a professional table of books with edit and delete actions
 */
export const BooksTable: React.FC<BooksTableProps> = ({ books }) => {
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [bookToDelete, setBookToDelete] = useState<Book | null>(null);

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    // Delete book mutation
    const [deleteBook, { loading: deleting }] = useMutation(DELETE_BOOK, {
        refetchQueries: [{ query: GET_BOOKS }],
        onCompleted: () => {
            toaster.success({
                title: 'Book deleted',
                description: 'The book has been successfully deleted.',
            });
            setDeleteDialogOpen(false);
            setBookToDelete(null);
        },
        onError: (error: Error) => {
            toaster.error({
                title: 'Error deleting book',
                description: error.message,
            });
        },
    });

    const handleEdit = (book: Book) => {
        console.log('Edit clicked for book:', book);
        setSelectedBook(book);
        setEditModalOpen(true);
    };

    const handleDeleteClick = (book: Book) => {
        setBookToDelete(book);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (bookToDelete) {
            deleteBook({ variables: { id: bookToDelete.id } });
        }
    };

    return (
        <>
            <Box overflowX="auto">
                <Table.Root size="md">
                    <Table.Header bg="gray.50">
                        <Table.Row borderBottom="1px solid" borderColor="gray.200">
                            <Table.ColumnHeader
                                px={6}
                                py={4}
                                color="gray.500"
                                fontWeight="semibold"
                                fontSize="xs"
                                textTransform="uppercase"
                                w="32"
                            >
                                ID
                            </Table.ColumnHeader>
                            <Table.ColumnHeader
                                px={6}
                                py={4}
                                color="gray.500"
                                fontWeight="semibold"
                                fontSize="xs"
                                textTransform="uppercase"
                                minW="200px"
                            >
                                Book Name
                            </Table.ColumnHeader>
                            <Table.ColumnHeader
                                px={6}
                                py={4}
                                color="gray.500"
                                fontWeight="semibold"
                                fontSize="xs"
                                textTransform="uppercase"
                                minW="300px"
                            >
                                Description
                            </Table.ColumnHeader>
                            <Table.ColumnHeader
                                px={6}
                                py={4}
                                color="gray.500"
                                fontWeight="semibold"
                                fontSize="xs"
                                textTransform="uppercase"
                                textAlign="right"
                                w="32"
                            >
                                Actions
                            </Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {books.map((book, index) => (
                            <Table.Row
                                key={book.id}
                                borderBottom="1px solid"
                                borderColor="gray.200"
                                _hover={{
                                    bg: "blue.50"
                                }}
                                transition="background 0.2s"
                            >
                                <Table.Cell px={6} py={4} fontSize="sm" fontFamily="mono" color="gray.600">
                                    {index + 1}
                                </Table.Cell>
                                <Table.Cell px={6} py={4}>
                                    <Text fontSize="sm" fontWeight="semibold" color="gray.900">
                                        {book.name}
                                    </Text>
                                </Table.Cell>
                                <Table.Cell px={6} py={4}>
                                    <Text
                                        fontSize="sm"
                                        color="gray.600"
                                        lineClamp={1}
                                        maxW="prose"
                                    >
                                        {book.description}
                                    </Text>
                                </Table.Cell>
                                <Table.Cell px={6} py={4}>
                                    <HStack gap={2} justify="end">
                                        <IconButton
                                            aria-label="Edit book"
                                            size="sm"
                                            variant="ghost"
                                            color="gray.500"
                                            onClick={() => handleEdit(book)}
                                            _hover={{
                                                bg: "blue.50",
                                                color: "blue.600"
                                            }}
                                            title="Edit"
                                        >
                                            ✏️
                                        </IconButton>
                                        <IconButton
                                            aria-label="Delete book"
                                            size="sm"
                                            variant="ghost"
                                            color="gray.500"
                                            onClick={() => handleDeleteClick(book)}
                                            _hover={{
                                                bg: "red.50",
                                                color: "red.600"
                                            }}
                                            title="Delete"
                                        >
                                            🗑️
                                        </IconButton>
                                    </HStack>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            </Box>

            {/* Pagination Footer */}
            <Box
                px={6}
                py={4}
                borderTop="1px solid"
                borderColor="gray.200"
                bg="gray.50"
            >
                <HStack justify="space-between">
                    <Text fontSize="sm" color="gray.600">
                        Showing <Text as="span" fontWeight="medium" color="gray.900">1</Text> to{' '}
                        <Text as="span" fontWeight="medium" color="gray.900">{books.length}</Text> of{' '}
                        <Text as="span" fontWeight="medium" color="gray.900">{books.length}</Text> results
                    </Text>
                    <HStack gap={2}>
                        <button
                            className="px-3 py-1 text-sm border border-gray-200 rounded bg-white text-gray-500 disabled:opacity-50"
                            disabled
                        >
                            Previous
                        </button>
                        <button className="px-3 py-1 text-sm border border-gray-200 rounded bg-white text-gray-900 hover:bg-gray-50">
                            Next
                        </button>
                    </HStack>
                </HStack>
            </Box>

            {/* Edit Modal */}
            <BookFormModal
                isOpen={editModalOpen}
                onClose={() => {
                    setEditModalOpen(false);
                    setSelectedBook(null);
                }}
                book={selectedBook}
            />

            {/* Delete Confirmation Dialog */}
            <DeleteConfirmDialog
                isOpen={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                onConfirm={handleDeleteConfirm}
                bookName={bookToDelete?.name || ''}
                isLoading={deleting}
            />
        </>
    );
};
