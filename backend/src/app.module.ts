import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { BooksModule } from './books/books.module';
import { AuthModule } from './auth/auth.module';
import { Book } from './books/entities/book.entity';

/**
 * Main Application Module
 * Configures GraphQL, SQLite database, environment variables, and feature modules
 */
@Module({
  imports: [
    // Load environment variables from .env file
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Configure GraphQL with Apollo Server
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true, // Enable GraphQL Playground for development
      context: ({ req }: { req: any }) => ({ req }), // Pass request to context for auth guard
    }),

    // Configure TypeORM with SQLite database
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.DATABASE_PATH || './database.sqlite',
      entities: [Book],
      synchronize: true, // Auto-create database schema (disable in production)
      logging: false,
    }),

    // Feature modules
    AuthModule,
    BooksModule,
  ],
})
export class AppModule { }
