import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';

/**
 * Service for managing book operations
 * Handles CRUD operations for books using TypeORM repository
 */
@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(Book)
        private readonly booksRepository: Repository<Book>,
    ) { }

    /**
     * Create a new book
     * @param createBookInput - Book data to create
     * @returns The created book
     */
    async create(createBookInput: CreateBookInput): Promise<Book> {
        const book = this.booksRepository.create(createBookInput);
        return await this.booksRepository.save(book);
    }

    /**
     * Get all books
     * @returns Array of all books
     */
    async findAll(): Promise<Book[]> {
        return await this.booksRepository.find();
    }

    /**
     * Get a single book by ID
     * @param id - Book ID
     * @returns The book if found
     * @throws NotFoundException if book doesn't exist
     */
    async findOne(id: number): Promise<Book> {
        const book = await this.booksRepository.findOne({ where: { id } });
        if (!book) {
            throw new NotFoundException(`Book with ID ${id} not found`);
        }
        return book;
    }

    /**
     * Update an existing book
     * @param updateBookInput - Book data to update
     * @returns The updated book
     * @throws NotFoundException if book doesn't exist
     */
    async update(updateBookInput: UpdateBookInput): Promise<Book> {
        console.log('Update called with:', JSON.stringify(updateBookInput, null, 2));

        const book = await this.findOne(updateBookInput.id);
        console.log('Found book:', JSON.stringify(book, null, 2));

        // Update the fields directly (they're required now)
        book.name = updateBookInput.name;
        book.description = updateBookInput.description;

        const updatedBook = await this.booksRepository.save(book);
        console.log('Updated book:', JSON.stringify(updatedBook, null, 2));

        return updatedBook;
    }

    /**
     * Delete a book
     * @param id - Book ID to delete
     * @returns True if deletion was successful
     * @throws NotFoundException if book doesn't exist
     */
    async remove(id: number): Promise<boolean> {
        const book = await this.findOne(id);
        await this.booksRepository.remove(book);
        return true;
    }
}
