# TravelTrucks

TravelTrucks is a frontend web application for browsing and booking campervans.

The project was built with Next.js, TypeScript, and the Next.js App Router. It uses the TravelTrucks backend API to display campers, apply filters, load additional catalog items, show camper details, display reviews, and submit booking requests.

## Live Demo

- Website: [Live page](https://camping-web-iota.vercel.app/)
- Repository: [TravelTrucks Web](https://github.com/YshTi/camping-web)

## Main Features

**The design is made only for the desktop version. Other screen resolutions up to 1440 pixels are not yet available.**

- Home page with a hero section and a link to the camper catalog
- Camper catalog loaded from the backend API
- Backend filtering by location, camper form, engine, and transmission
- “Load More” pagination with 4 additional campers per request
- Camper details page opened in a new browser tab
- Image gallery with swipe, drag, looping, and synchronized thumbnails
- Camper specifications and amenities
- User reviews with a five-star rating scale
- Booking form with Formik and Yup validation
- Custom success and error notifications using React Hot Toast
- Loading, empty, and error states
- Semantic HTML and accessible form controls
- Theme-aware SVG favicon

## Pages

- `/` — home page
- `/catalog` — camper catalog
- `/catalog/[camperId]` — camper details page

## Technologies

- Next.js
- React
- TypeScript
- Next.js App Router
- TanStack Query
- Axios
- Formik
- Yup
- Swiper
- React Icons
- React Hot Toast
- CSS Modules

## Backend API

```text
https://campers-api.goit.study
```

The API URL is stored in an environment variable:

```env
NEXT_PUBLIC_API_URL=https://campers-api.goit.study
```

## Installation

Clone the repository:

```bash
git clone https://github.com/YshTi/camping-web.git
```

Open the project directory:

```bash
cd camping-web
```

Install dependencies:

```bash
npm install
```

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_URL=https://campers-api.goit.study
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Available Scripts

```bash
npm run dev
```

Starts the development server.

```bash
npm run build
```

Creates a production build.

```bash
npm run start
```

Starts the production server after a successful build.

```bash
npm run lint
```

Runs the project linter.

## Project Structure

```text
src/
├── app/
│   ├── catalog/
│   │   ├── [camperId]/
│   │   └── page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── components/
├── lib/
│   └── api/
├── providers/
├── styles/
└── types/
```

## Form Validation

The booking form validates:

- required fields
- full name format
- allowed name characters
- email format

The form shows validation feedback after field interaction and prevents submission while the data is invalid.

## Deployment

The project can be deployed on Vercel or Netlify.

Add this environment variable in the hosting platform settings:

```env
NEXT_PUBLIC_API_URL=https://campers-api.goit.study
```

## Author

**Tetiana Yushkevych**

- GitHub: [YshTi](https://github.com/YshTi)
