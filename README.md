# URL Shortener with Analytics

A full-stack URL shortener application built with **Node.js** (Express) for the backend, **React** for the frontend, **MongoDB** for the database, and **Redis** for caching. Users can shorten long URLs, view analytics for their short URLs, and manage their links.

## Features

- **Shorten URLs:** Convert long URLs into short, easy-to-share links.
- **Custom Aliases:** Optionally specify a custom alias for your short URL.
- **Analytics:** Track total clicks, unique users, and device/OS information for each short URL.
- **User Authentication:** Sign in with Google to manage your URLs.
- **Caching:** Redis is used to cache short URL redirects for faster performance.

## Technologies Used

### Backend

- **Node.js**: Runtime environment.
- **Express**: Web framework for building APIs.
- **MongoDB**: Database to store URLs and analytics.
- **Redis**: In-memory data store for caching short URLs.
- **JWT**: JSON Web Tokens for user authentication.
- **Google OAuth**: User authentication using Google.

### Frontend

- **React**: JavaScript library for building the user interface.
- **Axios**: HTTP client for making API requests.
- **React Router**: Routing for the frontend.
- **Bootstrap**: Styling and layout.

### Deployment

- **Docker**: Containerization for easy deployment.

## Prerequisites

Before running the project, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (running locally or remotely)
- **Redis** (running locally or remotely)
- **Docker** (optional, for containerization)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/ABHAY-AJ/url_shortner.git
cd url-shortener
```

### 2. Backend Setup

#### Install dependencies:

```bash
npm install
```

#### Create a `.env` file in the backend directory and add the following environment variables:

```plaintext
PORT=5000
MONGODB_URI=mongodb://localhost:27017/urlshortener
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
```

#### Start the backend server:

Navigate to the `src` directory:

```bash
cd src
```

```bash
node app.js
```

### 3. Frontend Setup

Navigate to the `frontend` directory:

```bash
cd ../frontend
```

#### Install dependencies:

```bash
npm install
```

#### Create a `.env` file in the frontend directory and add the following environment variables:

```plaintext
REACT_APP_API_URL=http://localhost:5000
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
```

#### Start the frontend development server:

```bash
npm start
```

### 4. Run with Docker (Optional)

Build the Docker images for the backend and frontend:

```bash
docker-compose build
```

Start the containers:

```bash
docker-compose up
```

Access the application:

- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **Backend:** [http://localhost:5000](http://localhost:5000)

## API Endpoints

### Authentication

- **POST** `/api/auth/google`: Authenticate with Google.

### URL Shortener

- **POST** `/api/url/shorten`: Shorten a long URL.
- **GET** `/api/url/:alias`: Redirect to the original URL.

### Analytics

- **GET** `/api/analytics/:alias`: Get analytics for a specific short URL.
- **GET** `/api/analytics/topic/:topic`: Get analytics for a specific topic.
- **GET** `/api/analytics/overall`: Get overall analytics for the user.
  ### ETC.......

## Folder Structure

### Backend

```plaintext
src/
├── config/            # Configuration files (e.g., Redis, MongoDB)
├── models/            # MongoDB models (e.g., Url, Analytics, User)
├── routes/            # API routes (e.g., auth, url, analytics)
├── utils/             # Utility functions (e.g., auth middleware)
├── app.js             # Express app setup

```

### Frontend

```plaintext
frontend/
├── public/            # Static assets
├── src/
│   ├── components/    # Reusable components (e.g., Navbar, UrlForm)
│   ├── pages/         # Application pages (e.g., Home, Dashboard, Analytics)
│   ├── utils/         # Utility functions (e.g., API calls, auth)
│   ├── App.js         # Main application component
│   └── index.js       # React entry point
└── Dockerfile         # Docker configuration for the frontend
```

## Screenshots

### Home Page

![LOGIN Page](./screenshots//Screenshot%202025-02-04%20041404.png)

### Dashboard

![Dashboard](./screenshots//Screenshot%202025-02-04%20041446.png)

### Analytics

![SINGLE URL Analytics](./screenshots/Screenshot%202025-02-04%20041511.png)

### URL SHORTNER

![URL SHORTNER](./screenshots/Screenshot%202025-02-04%20041529.png)
