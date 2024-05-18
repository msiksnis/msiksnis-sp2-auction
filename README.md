# Auction House

**(This is a school project built by Martins Siksnis)**

Auction House is a web application that allows users to create, browse, bid on, and manage auction listings. The project is built using Next.js, leveraging server-side rendering and static site generation for optimized performance.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Running the Project Locally](#running-the-project-locally)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Special Instructions for Testers](#special-instructions-for-testers)

## Features

- User Authentication: Sign up, login, and profile management.
- Auction Listings: Create, edit, browse, and search for auction listings.
- Bidding: Place bids on listings, view active bids and wins.
- Filtering: Filter listings by most popular tags.
- Favorites: Mark listings as favorites for quick access.
- Responsive Design: Optimized for various screen sizes.

## Technologies Used

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Tailwind Merge](https://www.npmjs.com/package/tailwind-merge)
- [Class Variance Authority](https://cva.style/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Axios](https://axios-http.com/)
- [React Hot Toast](https://react-hot-toast.com/)
- [React Hook Form](https://react-hook-form.com/)
- [React Day Picker](https://react-day-picker.js.org/)
- [Date-fns](https://date-fns.org/)
- [Lucide Icons](https://lucide.dev/)

## Setup and Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/msiksnis/msiksnis-sp2-auction.git
   cd auction-house

   ```

2. **Install dependencies:**

   ```bash
    npm install

   ```

3. **Create a `.env` file in the root directory:**

   ```bash
   touch .env

   ```

4. **Add environment variables to the `.env` file:**

   ```bash
   API_KEY=your_api_key
   API_BASE="https://v2.api.noroff.dev"
   API_ALL_LISTINGS="https://v2.api.noroff.dev/auction/listings"
   API_PROFILES="https://v2.api.noroff.dev/auction/profiles"
   ROOT_URL="http://localhost:3000"

   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```
