# Holidaze (UNDER CONSTRUCTION)

This is a React + Vite-powered front-end for the Holidaze booking app. Users can browse venues, view details, and (eventually) book stays. The project is styled with Tailwind CSS and fetches data from the Noroff Holidaze API.

---

## 🚀 Tech Stack

- **React 19**
- **Vite**
- **React Router**
- **Tailwind CSS**
- **Custom Theme using `@theme` tokens**
- **Netlify (optional for deployment)**

---

## 🛠️ Getting Started

### 1. Clone the project

```
git clone https://github.com/your-username/holidaze.git
cd holidaze
```

### 2. Install dependencies
```
npm install
```
### 3.Set up environment variables

```
VITE_API_URL=https://v2.api.noroff.dev/holidaze/venues
VITE_API_KEY=your-api-key-here
```

\*Make sure .gitignore ignores .env. NEVER commit your .env

### 4. Run the development server

```
npm run dev
```

### 5. Deployment

If you're using Netlify:

1. Go to your site settings → environment Variables
2. Add VITE_API_URL and VITE_API_KEY with the correct values
3. Deploy

### Author

Kjetil H. Hauger

### License

MIT
