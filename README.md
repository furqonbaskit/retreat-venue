# Retreat Venue Booking System

A modern, full-stack web application for browsing and booking retreat venues. Built with Next.js, TypeScript, and Prisma

## Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm**, **yarn**, or **pnpm** (package manager)
- **PostgreSQL** database

## Installation

1. **Clone the repository**:
   ```bash
   git clone git@github.com:furqonbaskit/retreat-venue.git
   cd retreat-venue
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the root directory and add the following:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/retreat_venue?schema=public"
   # Replace with your actual database connection string
   ```

4. **Set up the database**:
   - Ensure your PostgreSQL database is running.
   - Run Prisma migrations to create the database schema:
     ```bash
     npx prisma migrate dev
     ```
   - (Optional) Seed the database with sample data:
     ```bash
     npx prisma db seed
     ```

5. **Generate Prisma client**:
   ```bash
   npx prisma generate
   ```

## Running the Application

1. **Start the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

2. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000). or you can access from deployed application [Vercel App](https://retreat-venue-qg4j-6f5e9s5y1-furqons-projects-6ed3672f.vercel.app/)

3. **Explore the app**:
   - Visit `/venue` to browse and filter venues.
   - Click "Book Venue" on any venue to open the booking modal.
   - Visit `/booking` to view the booking management dashboard.

## Architecture and Approach

### Overall Architecture
This application follows a modern full-stack architecture using Next.js App Router:
- **Frontend**: Client-side rendered pages for interactive features like filtering and modals
- **Backend**: Server-side API routes handling business logic and database operations
- **Database**: Prisma ORM provides type-safe database access and migrations
- **Clean Code Architechture**: Using clean code format for folder structure, and custom hook for fetching APIs
- **Validation**: Client side and API validation using Zod schema

### Tradeoffs
- Using CSR may cause initial load to be slower, and SEO can be limited compared to SSR
- Using Types from generated Prisma scheme can cause rewrite if there is plan to migrate or add new ORM
- Using custom hook like useVenues and useBooking add layers that can make debugger harder, and also less features compare to data fetching library

## Improvements
- **Hybrid Rendering**: Consider mixing CSR and SSR to benefit of both worlds
- **Data Fetching**: Improve data fetching using SWR or React Query for improvement caching and error handling
- **Unit Testing**: Add unit testing to catch bug early and code reability
- **Mobile Responsive**: Add mobile responsiveness
- **Styling**: Overall improvement on frontend styling and animation

### Out of Scope Improvement (Tech Debt)
- **Authentication and Authorization**: Implement login/signup setup to accomodate and manage user booking
- **Payment**: Integrate with payment gateway service for processing payment
- **Notification**: Add email service for activation, confirmation, updates etc
- **Logging**: Add logging for transactions and errors
