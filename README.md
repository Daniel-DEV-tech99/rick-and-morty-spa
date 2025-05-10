# Rick and Morty Universe Explorer

![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-blue)
![Shadcn UI](https://img.shields.io/badge/Shadcn%20UI-latest-black)

A modern, responsive Single Page Application (SPA) that allows users to explore characters from the Rick and Morty universe. Built with Next.js, React, TypeScript, and Tailwind CSS.

## 🌟 Features

- **Character Browsing**: View all characters from the Rick and Morty universe with beautiful card layouts
- **Detailed Character Profiles**: Click on any character to see detailed information
- **Advanced Search & Filtering**: Search by name and filter by status, species, and gender
- **Responsive Design**: Fully responsive layout that works on all devices
- **Pagination**: Navigate through multiple pages of character results
- **Smooth Animations**: Elegant transitions and hover effects for an enhanced user experience
- **Dark/Light Mode**: Toggle between dark and light themes
- **SEO Optimized**: Built with Next.js for improved search engine visibility

## 🚀 Live Demo

[View the live demo](#) *(Add your deployment URL here)*

## 📸 Screenshots

*(Add screenshots of your application here)*

## 🛠️ Technologies Used

- **Framework**: [Next.js 15](https://nextjs.org/)
- **UI Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Component Library**: [Shadcn UI](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/)
- **Validation**: [Zod](https://zod.dev/)
- **API**: [Rick and Morty API](https://rickandmortyapi.com/)

## 🏗️ Project Structure

```
rick-and-morty-spa/
├── app/                  # Next.js App Router
│   ├── character/        # Character detail pages
│   └── page.tsx          # Home page
├── components/           # Reusable UI components
│   ├── ui/               # Shadcn UI components
│   ├── character-card.tsx
│   ├── pagination-controls.tsx
│   ├── search-and-filter.tsx
│   └── ...
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── public/               # Static assets
└── styles/               # Global styles
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18.17 or later
- pnpm (recommended) or npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/rick-and-morty-spa.git
   cd rick-and-morty-spa
   ```

2. Install dependencies:

   ```bash
   pnpm install
   # or
   npm install
   ```

3. Run the development server:

   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🔧 Available Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint to check code quality

## 🧩 Key Components

- **CharacterCard**: Displays character information in a card format with hover animations
- **SearchAndFilter**: Provides search and filtering functionality
- **PaginationControls**: Handles pagination between results
- **CharacterPage**: Displays detailed information about a specific character

## 📱 Responsive Design

The application is fully responsive and works on:

- Mobile devices
- Tablets
- Desktop computers

## 🌐 API Integration

This project uses the [Rick and Morty API](https://rickandmortyapi.com/) to fetch character data. The API provides information about characters, locations, and episodes from the show.

## 🎨 Customization

### Themes

The application supports both light and dark themes using the `next-themes` package. The theme automatically adapts to the user's system preferences but can also be toggled manually.

### UI Components

UI components are built using Shadcn UI, which provides a collection of accessible and customizable components built on Radix UI primitives.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgements

- [Rick and Morty API](https://rickandmortyapi.com/) for providing the data
- [Shadcn UI](https://ui.shadcn.com/) for the beautiful UI components
- [Next.js](https://nextjs.org/) for the amazing framework
- [Vercel](https://vercel.com/) for hosting capabilities

---

Created with ❤️ by [Daniel Francis]
