import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { AuthGuard } from '../auth/auth.guard';

/**
 * GraphQL Resolver for Book operations
 * All operations are protected by Auth0 authentication
 */
@Resolver(() => Book)
@UseGuards(AuthGuard) // Protect all resolver methods with Auth0 authentication
export class BooksResolver {
    constructor(private readonly booksService: BooksService) { }

    /**
     * Create a new book
     * @param createBookInput - Book data
     * @returns The created book
     */
    @Mutation(() => Book, { description: 'Create a new book' })
    async createBook(
        @Args('createBookInput') createBookInput: CreateBookInput,
    ): Promise<Book> {
        return await this.booksService.create(createBookInput);
    }

    /**
     * Get all books
     * @returns Array of all books
     */
    @Query(() => [Book], { name: 'books', description: 'Get all books' })
    async findAll(): Promise<Book[]> {
        return await this.booksService.findAll();
    }

    /**
     * Get a single book by ID
     * @param id - Book ID
     * @returns The book
     */
    @Query(() => Book, { name: 'book', description: 'Get a book by ID' })
    async findOne(@Args('id', { type: () => Int }) id: number): Promise<Book> {
        return await this.booksService.findOne(id);
    }

    /**
     * Update an existing book
     * @param updateBookInput - Book data to update
     * @returns The updated book
     */
    @Mutation(() => Book, { description: 'Update an existing book' })
    async updateBook(
        @Args('updateBookInput') updateBookInput: UpdateBookInput,
    ): Promise<Book> {
        return await this.booksService.update(updateBookInput);
    }

    /**
     * Delete a book
     * @param id - Book ID to delete
     * @returns Success status
     */
    @Mutation(() => Boolean, { description: 'Delete a book' })
    async removeBook(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
        return await this.booksService.remove(id);
    }
}
