import {
    Button,
    Input,
    Textarea,
    Stack,
} from '@chakra-ui/react';
import {
    DialogActionTrigger,
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
} from '@chakra-ui/react';
import { toaster } from '../App';
import { useMutation } from '@apollo/client';
import { useState, useEffect } from 'react';
import { Book } from '../types/book';
import { CREATE_BOOK, UPDATE_BOOK, GET_BOOKS } from '../graphql/books';

interface BookFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    book?: Book | null;
}

/**
 * Book Form Modal Component
 * Modal for creating or editing a book
 */
export const BookFormModal: React.FC<BookFormModalProps> = ({
    isOpen,
    onClose,
    book,
}) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const isEditing = !!book;

    // Reset form when modal opens/closes or book changes
    useEffect(() => {
        console.log('BookFormModal useEffect - book:', book, 'isOpen:', isOpen);
        if (book) {
            setName(book.name);
            setDescription(book.description);
        } else {
            setName('');
            setDescription('');
        }
    }, [book, isOpen]);

    // Create book mutation
    const [createBook, { loading: creating }] = useMutation(CREATE_BOOK, {
        refetchQueries: [{ query: GET_BOOKS }],
        onCompleted: () => {
            toaster.success({
                title: 'Book created',
                description: 'The book has been successfully created.',
            });
            handleClose();
        },
        onError: (error: Error) => {
            toaster.error({
                title: 'Error creating book',
                description: error.message,
            });
        },
    });

    // Update book mutation
    const [updateBook, { loading: updating }] = useMutation(UPDATE_BOOK, {
        refetchQueries: [{ query: GET_BOOKS }],
        onCompleted: () => {
            toaster.success({
                title: 'Book updated',
                description: 'The book has been successfully updated.',
            });
            handleClose();
        },
        onError: (error: Error) => {
            toaster.error({
                title: 'Error updating book',
                description: error.message,
            });
        },
    });

    const handleClose = () => {
        setName('');
        setDescription('');
        onClose();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim() || !description.trim()) {
            toaster.warning({
                title: 'Validation error',
                description: 'Please fill in all fields.',
            });
            return;
        }

        // Check if we're editing (book prop exists and has an id)
        if (book && book.id) {
            console.log('Updating book:', { id: book.id, name, description });
            updateBook({
                variables: {
                    updateBookInput: {
                        id: book.id,
                        name,
                        description,
                    },
                },
            });
        } else {
            console.log('Creating book:', { name, description });
            createBook({
                variables: {
                    createBookInput: {
                        name,
                        description,
                    },
                },
            });
        }
    };

    const loading = creating || updating;



    return (
        <DialogRoot open={isOpen} onOpenChange={(e) => !e.open && handleClose()}>
            <DialogContent
                maxW="lg"
                maxH="80vh"
                position="fixed"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                overflowY="auto"
            >
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle color="gray.900" fontWeight="bold">
                            {isEditing ? 'Edit Book' : 'Create New Book'}
                        </DialogTitle>
                    </DialogHeader>
                    <DialogCloseTrigger />

                    <DialogBody>
                        <Stack gap={4}>
                            <Stack gap={1.5}>
                                <label htmlFor="book-name" style={{ color: '#1a202c', fontWeight: '500' }}>
                                    Name *
                                </label>
                                <Input
                                    id="book-name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter book name"
                                    disabled={loading}
                                    required
                                />
                            </Stack>
                            <Stack gap={1.5}>
                                <label htmlFor="book-description" style={{ color: '#1a202c', fontWeight: '500' }}>
                                    Description *
                                </label>
                                <Textarea
                                    id="book-description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Enter book description"
                                    rows={4}
                                    disabled={loading}
                                    required
                                />
                            </Stack>
                        </Stack>
                    </DialogBody>

                    <DialogFooter>
                        <DialogActionTrigger asChild>
                            <Button
                                variant="outline"
                                disabled={loading}
                                borderColor="gray.300"
                                color="gray.700"
                                _hover={{
                                    bg: "gray.100"
                                }}
                            >
                                Cancel
                            </Button>
                        </DialogActionTrigger>
                        <Button
                            bg="gray.900"
                            color="white"
                            type="submit"
                            loading={loading}
                            _hover={{
                                bg: "gray.800"
                            }}
                        >
                            {isEditing ? 'Update' : 'Create'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </DialogRoot>
    );
};
