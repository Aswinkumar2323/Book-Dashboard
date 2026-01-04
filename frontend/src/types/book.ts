/**
 * Book type definition
 */
export interface Book {
    id: number;
    name: string;
    description: string;
}

/**
 * Input type for creating a book
 */
export interface CreateBookInput {
    name: string;
    description: string;
}

/**
 * Input type for updating a book
 */
export interface UpdateBookInput {
    id: number;
    name?: string;
    description?: string;
}
