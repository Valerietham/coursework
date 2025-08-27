# Furever: Swipe Fur Love

**Furever: Swipe fur love** is Singapore’s swipe-based cat adoption platform, designed to help potential adopters find their purrfect match and cats to find their furever homes. Fosterers list cats for adoption, while adopters browse, swipe, and connect with cats they love.

Once matched, users can chat directly to arrange in-person viewings. For those not yet ready to adopt, Furever offers “Kibbles”. Each Kibble represents a $2 donation, with a minimum purchase of 5 Kibbles ($10).

Furever makes it easier and enjoyable than ever to meet, adopt, and support Singapore’s cats in need.

Project Documentation: https://docs.google.com/document/d/1hNWvfZXoDIQ5BqrVh8QdW_ic7wWi1IKP/edit?usp=sharing&ouid=107667235089554625827&rtpof=true&sd=true

Project Presentation: https://www.canva.com/design/DAGwsxTL4_s/a38EheHo5y6AnZTfY5H3Ng/view?utm_content=DAGwsxTL4_s&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h48a8e56d21

## Project Overview

**Furever** connects potential adopters with cats in need of homes. The platform features:

- **Swipe Interface**: Tinder-like swiping mechanism for browsing cats
- **Kibble Credit System**: Virtual "kibbles" currency for platform engagement
- **User Authentication**: Secure Auth0 integration for user management
- **Payment Integration**: Stripe payment processing for purchasing credits
- **Responsive Design**: Responsive UI built with React, TypeScript, and Tailwind CSS

## Architecture

**File Navigation**

```
capstone/
├── frontend/         # React TypeScript + Vite application
├── backend/          # Node.js Express + Sequelize API
└── README.md         # This file
```

**Frontend Stack: React, Vite, Tailwind CSS, React Router, Auth0, Axios**

**Backend Stack: Node.js (v18) with Express 5, Sequelize ORM, Passport.js for Auth0 authentication, Stripe, JWT for secure API access**

**Database: MySQL**

## How to start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd capstone
```

### 2. Environment Setup

#### Backend Environment Variables

Create a `.env` file in the `backend/` directory:

```bash
# Server Configuration
SERVER_PORT=3000
NODE_ENV=development

# Database Configuration
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=furever

# Auth0 Configuration
AUTH0_DOMAIN=your_auth0_domain
AUTH0_CLIENT_ID=your_auth0_client_id
AUTH0_CLIENT_SECRET=your_auth0_client_secret
AUTH0_CALLBACK_URL=http://localhost:3000/callback
AUDIENCE=your_auth0_audience
ISSUER_BASE_URL=https://your_auth0_domain/
SESSION_SECRET=your_session_secret

# Stripe Configuration
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
STRIPE_PRICE_ID=your_stripe_price_id

# Client Configuration
CLIENT_URL=http://localhost:5173
```

#### Frontend Environment Variables

Create a `.env.local` file in the `frontend/` directory:

```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:3000

# Auth0 Configuration
VITE_AUTH0_DOMAIN=your_auth0_domain
VITE_AUTH0_CLIENT_ID=your_auth0_client_id
VITE_AUTH0_AUDIENCE=your_auth0_audience

# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Development Configuration
VITE_NODE_ENV=development
```

**Note**: The WhatsApp integration uses the format `https://api.whatsapp.com/send/?phone=65{phone_number}` where `65` is the Singapore country code. Fosterer contact information is automatically included when fetching cats, enabling direct WhatsApp communication.

### 3. Database Setup

#### Create MySQL Database

```sql
CREATE DATABASE furever;
```

#### Run Database Migrations

```bash
cd backend
npm install
npx sequelize-cli db:migrate
```

### 4. Install Dependencies

#### Backend Dependencies

```bash
cd backend
npm install
```

#### Frontend Dependencies

```bash
cd frontend
npm install
```

### 5. Start the Application

#### Start Backend Server

```bash
cd backend
node index.js
```

The backend will be available at `http://localhost:3000`

#### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Code Structure

#### Backend Structure

```
backend/
├── controllers/     # Request handlers
├── services/        # Business logic
├── models/          # Database models
├── routes/          # API route definitions
├── middleware/      # Custom middleware
├── migrations/      # Database migrations
└── config/          # Configuration files
```

#### Frontend Structure

```
frontend/
├── src/
│   ├── components/  # Reusable UI components
│   ├── pages/       # Page components
│   ├── hooks/       # Custom React hooks
│   ├── types/       # TypeScript type definitions
│   └── assets/      # Static assets
├── public/          # Public assets
└── dist/            # Build output
```

## API Endpoints

### Authentication

- `POST /api/users/me` - Create/update user profile
- `GET /api/users/private` - Protected user endpoint

### Cats

- `GET /api/cats` - Get all available cats
- `GET /api/cats/:id` - Get specific cat details
- `POST /api/cats` - Create new cat (via Postman)

### Interests

- `GET /api/interests/adopter/:adopterId` - Get user interests
- `GET /api/interests/adopter/:adopterId/likes` - Get user likes
- `POST /api/interests/record` - Record like/pass action

### Credits

- `POST /api/credits/create` - Create credits record
- `GET /api/credits/adopter/:adopterId` - Get user credits
- `PUT /api/credits/add` - Add credits to account
- `PUT /api/credits/subtract` - Subtract credits from account

### Feeds

- `POST /api/feeds/record` - Record feeding interaction
- `GET /api/feeds/adopter/:adopterId` - Get user feeding history
- `GET /api/feeds/cat/:catId` - Get cat feeding history
- `GET /api/feeds/stats/:adopterId` - Get feeding statistics

### Checkout

- `POST /api/create-checkout-session` - Create Stripe checkout
- `GET /api/checkout-session` - Get checkout session details

### Webhooks

- `POST /webhook` - Stripe webhook handler

## Configuration

### API Configuration

The frontend uses environment variables directly for API configuration. Each hook imports `import.meta.env.VITE_API_BASE_URL` to construct API endpoints.

To change the backend URL, simply update the `VITE_API_BASE_URL` environment variable in your `.env.local` file.

### Database Configuration

Edit `backend/config/config.json` for database settings with the your username and password:

```json
{
  "development": {
    "username": "root",
    "password": "your_password",
    "database": "furever",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

### Stripe Configuration

1. Create Stripe account and get API keys
2. Set up webhook endpoints
3. Configure price IDs for credit packages

### Auth0 Configuration

1. Create Auth0 application (Type: Single Page Application)
2. Configure callback URLs
3. Set up JWT audience and issuer

**Thank you for reading! 🐾**
