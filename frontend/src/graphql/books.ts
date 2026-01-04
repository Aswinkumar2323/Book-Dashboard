import { gql } from '@apollo/client';

/**
 * GraphQL query to fetch all books
 */
export const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      name
      description
    }
  }
`;

/**
 * GraphQL query to fetch a single book by ID
 */
export const GET_BOOK = gql`
  query GetBook($id: Int!) {
    book(id: $id) {
      id
      name
      description
    }
  }
`;

/**
 * GraphQL mutation to create a new book
 */
export const CREATE_BOOK = gql`
  mutation CreateBook($createBookInput: CreateBookInput!) {
    createBook(createBookInput: $createBookInput) {
      id
      name
      description
    }
  }
`;

/**
 * GraphQL mutation to update an existing book
 */
export const UPDATE_BOOK = gql`
  mutation UpdateBook($updateBookInput: UpdateBookInput!) {
    updateBook(updateBookInput: $updateBookInput) {
      id
      name
      description
    }
  }
`;

/**
 * GraphQL mutation to delete a book
 */
export const DELETE_BOOK = gql`
  mutation DeleteBook($id: Int!) {
    removeBook(id: $id)
  }
`;
