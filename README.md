# Backend Users - Client-Server Project

Backend service for user management in a client-server architecture.

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## 🎯 About

This is the backend service for user management, built as part of a client-server architecture project. It provides RESTful APIs for user authentication, registration, profile management, and related operations.

## ✨ Features

- User registration and authentication
- JWT-based authorization
- Password hashing and security
- User profile management
- Input validation and sanitization
- Error handling and logging
- API rate limiting
- Database integration
- Environment-based configuration

## 🔧 Prerequisites

Before running this project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16.x or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) or [PostgreSQL](https://www.postgresql.org/) (depending on your setup)
- [Git](https://git-scm.com/)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend-users
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit the `.env` file with your configuration values.

## ⚙️ Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=users_db
DB_USER=your_username
DB_PASSWORD=your_password
DB_URL=mongodb://localhost:27017/users_db

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=24h
JWT_REFRESH_EXPIRES_IN=7d

# Security
BCRYPT_SALT_ROUNDS=12
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Email Configuration (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Logging
LOG_LEVEL=info
```

## 🎮 Usage

### Development Mode
```bash
npm run dev
# or
yarn dev
```

### Production Mode
```bash
npm run build
npm start
# or
yarn build
yarn start
```

### Other Scripts
```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Lint code
npm run lint

# Format code
npm run format

# Database migrations
npm run migrate

# Database seeds
npm run seed
```

## 🛠️ API Endpoints

### Authentication
```
POST   /api/auth/register       # User registration
POST   /api/auth/login          # User login
POST   /api/auth/refresh        # Refresh JWT token
POST   /api/auth/logout         # User logout
POST   /api/auth/forgot-password # Request password reset
POST   /api/auth/reset-password  # Reset password
```

### Users
```
GET    /api/users               # Get all users (admin only)
GET    /api/users/:id           # Get user by ID
PUT    /api/users/:id           # Update user
DELETE /api/users/:id           # Delete user
GET    /api/users/profile       # Get current user profile
PUT    /api/users/profile       # Update current user profile
```

### Health Check
```
GET    /api/health              # Health check endpoint
```

### API Documentation
- Swagger UI: `http://localhost:3000/api-docs` (when running locally)

## 🗄️ Database Schema

### User Model
```javascript
{
  id: String,
  email: String (unique),
  password: String (hashed),
  firstName: String,
  lastName: String,
  role: String (enum: 'user', 'admin'),
  isActive: Boolean,
  emailVerified: Boolean,
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run specific test file
npm test -- --grep "user authentication"
```

## 🚀 Deployment

### Using Docker
```bash
# Build Docker image
docker build -t backend-users .

# Run container
docker run -p 3000:3000 --env-file .env backend-users
```

### Using Docker Compose
```bash
docker-compose up -d
```

### Manual Deployment
1. Set up your production server
2. Install Node.js and dependencies
3. Configure environment variables
4. Run database migrations
5. Start the application with PM2 or similar process manager

```bash
# Using PM2
npm install -g pm2
pm2 start ecosystem.config.js
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards
- Use ESLint and Prettier for code formatting
- Write tests for new features
- Follow conventional commit messages
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - *Initial work* - [YourGitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- Thanks to all contributors
- University project requirements
- Open source libraries used

## 📞 Support

For support, email your_email@example.com or create an issue in the repository.

---

**Note**: This is a university project for learning purposes. Please review and adapt the configuration according to your specific requirements.