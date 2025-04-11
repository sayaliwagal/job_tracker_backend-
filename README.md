# Student Job Tracker - Backend

This is the backend service for the Student Job Tracker application, built with Node.js, Express, and MongoDB.

## Tech Stack

- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling tool

## Project Structure

```
backend/
├── config/         # Configuration files
├── controllers/    # Request handlers
├── models/         # Database models
├── routes/         # API routes
├── .env            # Environment variables (not tracked in git)
├── package.json    # Project dependencies
└── server.js       # Entry point
```

## Prerequisites

- Node.js (v14+ recommended)
- MongoDB Atlas account or local MongoDB installation
- npm or yarn package manager

## Installation

1. Clone the repository

```bash
git clone <repository-url>
cd student-job-tracker/backend
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

## Running the Server

### Development mode

```bash
npm run dev
```

### Production mode

```bash
npm start
```

## API Endpoints

### Jobs

| Method | Endpoint      | Description              | Request Body                                            |
| ------ | ------------- | ------------------------ | ------------------------------------------------------- |
| GET    | /api/jobs     | Get all job applications | -                                                       |
| POST   | /api/jobs     | Create a job application | `{ company, role, status, applicationDate, link }`      |
| GET    | /api/jobs/:id | Get a specific job       | -                                                       |
| PATCH  | /api/jobs/:id | Update a job             | `{ company?, role?, status?, applicationDate?, link? }` |
| DELETE | /api/jobs/:id | Delete a job             | -                                                       |

## Data Models

### Job Model

```javascript
{
  company: String,         // Required
  role: String,            // Required
  status: String,          // Enum: ['Applied', 'Interview', 'Offer', 'Rejected']
  applicationDate: Date,   // Default: Current date
  link: String,            // Optional
  createdAt: Date,         // Auto-generated timestamp
  updatedAt: Date          // Auto-generated timestamp
}
```

## Deployment

This backend can be deployed to cloud platforms like Render or Railway:

1. Create an account on Render or Railway
2. Connect your GitHub repository
3. Configure the following:
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Add the environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `PORT`: 5000 (or let the platform assign one)

## Error Handling

The API uses standard HTTP status codes:

- `200`: Success
- `201`: Created
- `400`: Bad Request
- `404`: Not Found
- `500`: Server Error
  ////

# Student Job Tracker - Frontend

This is the frontend application for the Student Job Tracker, built with React.

## Tech Stack

- **React**: UI library
- **React Router**: Navigation
- **Axios**: HTTP client
- **Bootstrap**: CSS framework

## Project Structure

```
frontend/
├── public/                # Static files
├── src/
│   ├── components/        # React components
│   ├── services/          # API services
│   ├── App.css            # Main stylesheet
│   ├── App.js             # Main component
│   └── index.js           # Entry point
├── package.json           # Project dependencies
└── .env                   # Environment variables (not tracked in git)
```

## Prerequisites

- Node.js (v14+ recommended)
- npm or yarn package manager
- Backend API running (locally or deployed)

## Installation

1. Clone the repository

```bash
git clone <repository-url>
cd student-job-tracker/frontend
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```
REACT_APP_API_URL=http://localhost:5000/api
```

## Running the Application

### Development mode

```bash
npm start
```

This will start the development server on [http://localhost:3000](http://localhost:3000).

### Build for production

```bash
npm run build
```

This will create an optimized production build in the `build` folder.

## Features

### 1. Job Application Management

- Add new job applications with company, role, status, date, and link
- View all job applications in a responsive layout
- Update job application status
- Delete job applications

### 2. Filtering and Sorting

- Filter applications by status (Applied, Interview, Offer, Rejected)
- Sort applications by date (newest or oldest first)

## Component Overview

- **App**: Main application component with routing
- **Navbar**: Navigation component
- **AddJob**: Form for adding new job applications
- **JobsList**: List of job applications with filtering options
- **JobCard**: Individual job application card with status update and delete options

## API Integration

The frontend communicates with the backend API using axios. The API service is located in `src/services/jobService.js` and includes the following functions:

- `getAllJobs()`: Fetch all job applications
- `createJob(jobData)`: Create a new job application
- `updateJob(id, jobData)`: Update a job application
- `deleteJob(id)`: Delete a job application

## Deployment

This frontend can be deployed to Vercel:

1. Install Vercel CLI:

```bash
npm install -g vercel
```

2. Deploy:

```bash
vercel
```

3. For production deployment:

```bash
vercel --prod
```

4. Configure environment variables on Vercel dashboard:
   - `REACT_APP_API_URL`: URL of your deployed backend API

## Customization

### Styling

The application uses Bootstrap for styling with some custom CSS in `App.css`. You can modify the styles by:

1. Editing `App.css`
2. Overriding Bootstrap variables
3. Adding component-specific CSS modules

### Adding New Features

You can extend the application by:

1. Adding new components in the `components` directory
2. Extending the API service in `services/jobService.js`
3. Adding new routes in `App.js`

## Browser Support

The application is compatible with modern browsers:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

[MIT](LICENSE)
