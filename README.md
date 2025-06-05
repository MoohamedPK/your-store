# E-Commerce Application

A modern e-commerce platform built with Next.js, TypeScript, and Prisma.

## 🚀 Features

- User authentication with NextAuth.js
- Shopping cart functionality (both guest and authenticated users)
- Product catalog with filtering and search
- Responsive design with Tailwind CSS
- State management with Redux Toolkit
- Form validation with Zod
- Database management with Prisma

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database

## 🛠️ Installation

1. Clone the repository:

```bash
git clone [your-repository-url]
cd ecommerce-app
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL="your-database-url"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
```

4. Set up the database:

```bash
npx prisma generate
npx prisma db push
```

## 🚀 Development

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🧪 Testing

### Unit Tests

Run unit tests:

```bash
npm run test
# or
yarn test
```

### E2E Tests

Run end-to-end tests:

```bash
npm run test:e2e
# or
yarn test:e2e
```

### Test Coverage

Generate test coverage report:

```bash
npm run test:coverage
# or
yarn test:coverage
```

## 📁 Project Structure

```
├── app/                 # Next.js app directory
│   ├── api/            # API routes
│   ├── actions/        # Server actions
│   └── (routes)/       # Page routes
├── components/         # React components
├── prisma/            # Database schema and migrations
├── public/            # Static assets
├── redux/             # Redux store and slices
└── types/             # TypeScript type definitions
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run end-to-end tests
- `npm run test:coverage` - Generate test coverage

## 📚 Documentation

### API Documentation

API endpoints are documented in the `app/api` directory. Each route includes:

- Request/Response formats
- Authentication requirements
- Error handling

### Component Documentation

Components are documented using JSDoc comments. Key components include:

- `CartProduct` - Shopping cart item component
- `ProductCard` - Product display component
- `AuthForm` - Authentication form component

### Database Schema

The database schema is defined in `prisma/schema.prisma`. Key models include:

- User
- Product
- Cart
- Order

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Prisma team for the database toolkit
- All contributors who have helped shape this project
