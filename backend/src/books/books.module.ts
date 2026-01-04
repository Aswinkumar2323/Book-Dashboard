import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksService } from './books.service';
import { BooksResolver } from './books.resolver';
import { Book } from './entities/book.entity';

/**
 * Books Module
 * Configures the books feature with TypeORM repository and GraphQL resolver
 */
@Module({
    imports: [TypeOrmModule.forFeature([Book])],
    providers: [BooksResolver, BooksService],
    exports: [BooksService],
})
export class BooksModule { }
