# Book Dashboard - Full Stack Application

## 🎉 Project Complete!

This is a complete full-stack book management dashboard built with modern technologies.

## 📚 Tech Stack

### Backend
- **NestJS** - Progressive Node.js framework
- **GraphQL** with Apollo Server - API layer
- **TypeORM** - ORM for database operations
- **SQLite** - Lightweight database
- **Auth0** - Authentication & authorization
- **TypeScript** - Type safety

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Chakra UI v3** - Component library
- **Apollo Client** - GraphQL client
- **Auth0 React SDK** - Authentication

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Auth0
Follow the detailed instructions in `SETUP.md` to:
- Create an Auth0 account
- Set up an API
- Create an application
- Configure callback URLs

### 3. Set Environment Variables

**Backend** (`backend/.env`):
```env
AUTH0_DOMAIN=your-domain.auth0.com
AUTH0_AUDIENCE=your-api-identifier
DATABASE_PATH=./database.sqlite
PORT=3000
```

**Frontend** (`frontend/.env`):
```env
VITE_AUTH0_DOMAIN=your-domain.auth0.com
VITE_AUTH0_CLIENT_ID=your-client-id
VITE_AUTH0_AUDIENCE=your-api-identifier
VITE_API_URL=http://localhost:3000/graphql
```

### 4. Run the Application
```bash
# Run both servers
npm run dev

# Or run separately:
# Terminal 1 - Backend
cd backend && npm run start:dev

# Terminal 2 - Frontend
cd frontend && npm run dev
```

### 5. Access the Application
- Frontend: http://localhost:5173
- Backend GraphQL Playground: http://localhost:3000/graphql

## ✨ Features

- ✅ **Authentication** - Sign up/Sign in with Auth0
- ✅ **Protected API** - All GraphQL operations require authentication
- ✅ **CRUD Operations** - Create, Read, Update, Delete books
- ✅ **Real-time Updates** - Automatic refetch after mutations
- ✅ **Error Handling** - User-friendly error messages
- ✅ **Loading States** - Visual feedback during operations
- ✅ **Responsive Design** - Works on all screen sizes
- ✅ **Type Safety** - Full TypeScript coverage

## 📖 API Documentation

### GraphQL Schema

**Book Type**:
```graphql
type Book {
  id: Int!
  name: String!
  description: String!
}
```

**Queries**:
```graphql
# Get all books
query GetBooks {
  books {
    id
    name
    description
  }
}

# Get a single book
query GetBook($id: Int!) {
  book(id: $id) {
    id
    name
    description
  }
}
```

**Mutations**:
```graphql
# Create a book
mutation CreateBook($createBookInput: CreateBookInput!) {
  createBook(createBookInput: $createBookInput) {
    id
    name
    description
  }
}

# Update a book
mutation UpdateBook($updateBookInput: UpdateBookInput!) {
  updateBook(updateBookInput: $updateBookInput) {
    id
    name
    description
  }
}

# Delete a book
mutation DeleteBook($id: Int!) {
  removeBook(id: $id)
}
```

## 🏗️ Project Structure

```
book-dashboard/
├── backend/
│   ├── src/
│   │   ├── auth/
│   │   │   ├── auth.guard.ts      # Auth0 JWT validation
│   │   │   └── auth.module.ts
│   │   ├── books/
│   │   │   ├── dto/
│   │   │   │   ├── create-book.input.ts
│   │   │   │   └── update-book.input.ts
│   │   │   ├── entities/
│   │   │   │   └── book.entity.ts
│   │   │   ├── books.module.ts
│   │   │   ├── books.resolver.ts  # GraphQL resolver
│   │   │   └── books.service.ts   # Business logic
│   │   ├── app.module.ts          # Main module
│   │   └── main.ts                # Entry point
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── BooksTable.tsx     # Books table component
│   │   │   ├── BookFormModal.tsx  # Create/Edit modal
│   │   │   └── DeleteConfirmDialog.tsx
│   │   ├── graphql/
│   │   │   └── books.ts           # GraphQL queries/mutations
│   │   ├── lib/
│   │   │   └── apollo-client.ts   # Apollo Client setup
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx      # Main dashboard
│   │   │   └── Login.tsx          # Login page
│   │   ├── types/
│   │   │   └── book.ts            # TypeScript types
│   │   ├── App.tsx                # Main app component
│   │   ├── main.tsx               # Entry point
│   │   └── vite-env.d.ts          # Vite types
│   ├── .env.example
│   ├── tsconfig.json
│   └── package.json
│
├── README.md
├── SETUP.md
├── PROJECT_STATUS.md
└── package.json
```

## 🔒 Security

- **JWT Authentication** - All API requests require valid Auth0 JWT token
- **CORS Protection** - Only configured origins can access the API
- **Input Validation** - All inputs are validated using class-validator
- **SQL Injection Protection** - TypeORM prevents SQL injection
- **XSS Protection** - React automatically escapes content

## 🧪 Testing

### Manual Testing Checklist
- [ ] Sign up with new account
- [ ] Sign in with existing account
- [ ] Create a new book
- [ ] Edit an existing book
- [ ] Delete a book
- [ ] Verify real-time updates
- [ ] Test error handling (invalid inputs)
- [ ] Test authentication (logout and try to access)

## 📝 Conventional Commits

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```bash
# Examples:
git commit -m "feat: add book creation functionality"
git commit -m "fix: resolve authentication token issue"
git commit -m "docs: update README with setup instructions"
git commit -m "refactor: improve GraphQL resolver structure"
git commit -m "style: format code with prettier"
git commit -m "test: add unit tests for books service"
git commit -m "chore: update dependencies"
```

## 🐛 Troubleshooting

### TypeScript Errors in IDE
If you see errors like "Module '@apollo/client' has no exported member 'ApolloProvider'":
1. Restart your TypeScript language server
2. In VS Code: `Ctrl+Shift+P` → "TypeScript: Restart TS Server"
3. The code will compile and run correctly

### Backend Won't Start
- Check if port 3000 is already in use
- Verify Auth0 credentials in `.env`
- Check for syntax errors in TypeScript files

### Frontend Won't Start
- Check if port 5173 is already in use
- Verify all dependencies are installed: `npm install`
- Check for syntax errors in TypeScript files

### Authentication Fails
- Verify Auth0 domain and client ID are correct
- Check that callback URLs include `http://localhost:5173`
- Ensure API audience matches between frontend and backend
- Clear browser cookies and localStorage

### GraphQL Requests Fail
- Verify backend is running on port 3000
- Check that you're signed in
- Verify Auth0 token is being sent in headers
- Check browser console for detailed errors

## 🚢 Deployment

### Backend Deployment
1. Set `synchronize: false` in TypeORM configuration
2. Use environment variables for all sensitive data
3. Enable HTTPS
4. Configure CORS for production domain
5. Use a production-grade database (PostgreSQL, MySQL)

### Frontend Deployment
1. Build the production bundle: `npm run build`
2. Deploy the `dist/` folder to a static hosting service
3. Update Auth0 callback URLs for production domain
4. Update environment variables for production API URL

### Recommended Platforms
- **Backend**: Railway, Render, Heroku, AWS
- **Frontend**: Vercel, Netlify, AWS S3 + CloudFront
- **Database**: Railway PostgreSQL, AWS RDS, Supabase

## 📚 Additional Resources

- [NestJS Documentation](https://docs.nestjs.com/)
- [GraphQL Best Practices](https://graphql.org/learn/best-practices/)
- [Apollo Client Documentation](https://www.apollographql.com/docs/react/)
- [Chakra UI v3 Documentation](https://www.chakra-ui.com/)
- [Auth0 Documentation](https://auth0.com/docs)
- [TypeORM Documentation](https://typeorm.io/)


## 👨‍💻 Author

Name : Aswin Kumar
Email : aswinak0330@gmail.com
Phone no : +91 9790796357
