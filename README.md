# alpe.dev - Personal Website

A fun, non-corporate personal website featuring a terminal simulation hero and smooth animations. Dark mode primary, with a self-deprecating/witty/absurdist tone.

Built in 2 days with AI. Yes, really.

## Tech Stack

| Layer        | Technology              |
| ------------ | ----------------------- |
| Framework    | Next.js 16 (App Router) |
| Language     | TypeScript              |
| Animations   | GSAP + Framer Motion    |
| Styling      | CSS Modules             |
| Blog         | MDX                     |
| Contact Form | Formspree               |
| Hosting      | Vercel                  |

## Features

- **Terminal Hero** - Animated terminal with dev commands
- **Baby Countdown Widget** - Because being a soon-to-be dad is worth celebrating (with a progress bar)
- **Gaming Stats Section** - Self-deprecating competitive gaming resume
- **Contact Form** - Formspree integration for easy contact
- **MDX Blog** - Version-controlled, flexible blog posts
- **Dark Mode** - Neon cyan, pink, and purple accents
- **Accessibility** - WCAG 2.1 AA compliant with reduced motion support
- **Responsive** - Mobile-first design

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/alpe89/alpe.dev.git

# Navigate to the project directory
cd portfolio

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Environment Variables

Create a `.env.local` file with:

```
NEXT_PUBLIC_FORMSPREE_ID=your_formspree_id_here
```

Get your Formspree ID from [formspree.io](https://formspree.io).

## Project Structure

```
portfolio/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page
│   │   ├── globals.css         # Global styles
│   │   ├── blog/               # Blog pages
│   │   └── not-found.tsx       # 404 page
│   ├── components/
│   │   ├── sections/           # Page sections
│   │   │   ├── Hero/           # Terminal hero section
│   │   │   ├── About/          # About with countdown & gaming stats
│   │   │   ├── Links/          # Social links
│   │   │   └── BlogPreview/    # Blog preview
│   │   └── ui/                 # Reusable UI components
│   ├── content/posts/          # MDX blog posts
│   ├── hooks/                  # Custom React hooks
│   └── lib/                    # Utilities
├── public/                     # Static assets
├── mdx-components.tsx          # MDX component mapping
└── next.config.ts              # Next.js configuration
```

## Available Scripts

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint
npm run lint
```

## Adding Blog Posts

Create a new `.mdx` file in `src/content/posts/`:

```mdx
---
title: 'Your Post Title'
description: 'A brief description'
date: '2025-01-01'
tags: ['tag1', 'tag2']
published: true
---

# Your content here

Write in Markdown with JSX support!
```

## Customization

### Theme Colors

Edit CSS variables in `src/app/variables.css`:

```css
:root {
  --color-neon-cyan: #00fff5;
  --color-neon-pink: #ff00ff;
  --color-neon-purple: #bf00ff;
}
```

### Baby Countdown Date

Update the due date in `src/components/sections/About/BabyCountdown.tsx`:

```typescript
const DUE_DATE = new Date('2025-04-30T00:00:00');
```

## Deployment

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/alpe89/alpe.dev)

Or deploy manually:

```bash
npm run build
vercel deploy --prod
```

## License

MIT License - feel free to use this as a template for your own portfolio!

---

Built with ❤️ and too much coffee.
