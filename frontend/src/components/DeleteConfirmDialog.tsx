import {
    Button,
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

interface DeleteConfirmDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    bookName: string;
    isLoading?: boolean;
}

/**
 * Delete Confirmation Dialog Component
 * Confirms book deletion before executing
 */
export const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({
    isOpen,
    onClose,
    onConfirm,
    bookName,
    isLoading = false,
}) => {
    return (
        <DialogRoot open={isOpen} onOpenChange={(e) => !e.open && onClose()}>
            <DialogContent
                maxW="md"
                position="fixed"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
            >
                <DialogHeader>
                    <DialogTitle color="gray.900" fontWeight="bold">Delete Book</DialogTitle>
                </DialogHeader>
                <DialogCloseTrigger />

                <DialogBody color="gray.800">
                    Are you sure you want to delete "{bookName}"? This action cannot be undone.
                </DialogBody>

                <DialogFooter>
                    <DialogActionTrigger asChild>
                        <Button
                            variant="outline"
                            disabled={isLoading}
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
                        bg="gray.800"
                        color="white"
                        onClick={onConfirm}
                        loading={isLoading}
                        _hover={{
                            bg: "gray.900"
                        }}
                    >
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </DialogRoot>
    );
};
