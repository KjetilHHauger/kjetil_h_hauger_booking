# Holidaze

A modern React-based booking platform that lets users discover, search, and book venues. Featuring filtering, pagination, user authentication, and an immersive hero video, profile.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Available Scripts](#available-scripts)
- [License](#license)

## Features

- **Venue Gallery**: Browse a paginated list of venues with lazy-loaded images and meta details.
- **Filtering & Search**: Filter venues by city, price, and amenities; search by keywords.
- **User Authentication**: Register and log in to your account to make bookings.
- **Booking Modal**: Select dates and guests to instantly book your chosen venue.
- **Responsive Design**: Mobile-first layout built with Tailwind CSS.
- **SEO & Accessibility**: Semantic HTML headings and ARIA-friendly components.
- **Error Handling**: Graceful fallbacks for broken images and network errors.

## Tech Stack

- **React** (v18+) for UI
- **React Router DOM** for client-side routing
- **Tailwind CSS** for utility-first styling
- **Zustand** (custom `userStore.js`) for state management of auth
- **Custom Hooks**:

  - `useVenues.js` for fetching and caching venue data

- **Vite** for fast builds and local development

## Installation

1. Clone the repo:

   ```bash
   git clone https://github.com/yourusername/holidaze.git
   ```

2. Install dependencies:

   ```bash
   cd holidaze
   npm install
   ```

3. Create a `.env` file in the root with the following variables:

   ```env
   VITE_API_BASE_URL=https://api.yourdomain.com
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open your browser at `http://localhost:3000`.

## Available Scripts

In the project directory, you can run:

- `npm run dev` - Start local dev server (HMR enabled)
- `npm run build` - Bundle for production
- `npm run preview` - Preview the production build

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
