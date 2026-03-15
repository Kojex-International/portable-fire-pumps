# Portable Fire Pumps Website

![Astro](https://img.shields.io/badge/Astro-Static%20Site-FF5D01)
![React](https://img.shields.io/badge/React-Components-61DAFB)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-UI-38B2AC)
![TypeScript](https://img.shields.io/badge/TypeScript-Type%20Safe-3178C6)

Distributor website for **Shibaura portable fire pumps**, operated by **Kojex International**.

🌐 Live site: *coming soon*

Built with **Astro, React, Tailwind CSS, and TypeScript**.

## Screenshots

### Homepage
![Homepage](docs/screenshots/homepage.png)

### Product Listing
![Product Listing](docs/screenshots/product-listing.png)

### Product Detail (FT510)
![Product Detail](docs/screenshots/product-detail-ft510.png)

### Resources & Documentation
![Resources](docs/screenshots/resources-search.png)

## Repository Purpose

This repository powers the Portable Fire Pumps website for a distributor-focused product and technical information platform.

It is not an ecommerce storefront. The primary purpose is to:
- Showcase fire pump product lines and detail pages
- Publish technical manuals, catalogs, and parts resources
- Support distributor discovery and engagement
- Capture contact and RFQ inquiries

## Project Status

The project is under active development.

Current priorities:
- Expanding pump product pages
- Improving technical documentation and resources
- Strengthening distributor visibility
- Improving performance, SEO, and content quality

## 🖼️ Preview

### Website Screenshot
<img alt="Portable Fire Pumps Website Preview" src="./public/hero-firepump-loop-poster.png" />

### Performance & Speed
Run a local production build to validate output quality and performance:

```bash
npm run build
```

## ✨ Features

- 🚀 **Built with Astro** - Fast, modern static site generation
- ⚛️ **React Components** - Interactive components with React
- 🎨 **Tailwind CSS 4** - Modern utility-first styling
- 📱 **Fully Responsive** - Mobile-first design
- ♿ **Accessible** - Built with accessibility in mind
- 🎯 **SEO Optimized** - Meta tags and semantic HTML
- 🎭 **Smooth Animations** - Powered by Motion library
- 🎨 **Modern UI** - Beautiful gradient designs and components

## 🧱 Tech Stack

- **Astro 5** for routing, static page rendering, and layout composition
- **React 19** for interactive islands
- **Tailwind CSS 4** for styling and utility classes
- **TypeScript** for type safety in page, component, and data layers
- **Lucide React** for iconography

## Component Conventions

Use **Astro components** by default. Astro-first architecture keeps runtime JavaScript low and improves page performance.

Astro components should be used for:
- Static content
- Page layouts
- SEO content
- Product detail pages
- Documentation pages

React components should be used only for:
- Interactive UI
- Forms
- Dynamic elements

Examples of valid React island usage:
- RFQ form
- Mobile navigation
- Interactive UI elements (tabs, reveal interactions, card toggles)

Minimize client-side JavaScript whenever possible. If a section can render statically, keep it in Astro.

## 📦 Pages Included

- **Home** - Brand and product entry point
- **Products** - Product family pages and individual pump detail pages
- **Features** - Auto relay and core pump feature content
- **Distributors** - Distributor network and partner details
- **Resources** - Catalogs, manuals, parts lists, and storage notes
- **Contact / RFQ** - Inquiry and request-for-quote workflow

## 🌐 Bilingual Routing Structure

- English pages are served under `/en/...`
- French pages are served under `/fr/...`
- Route pairs should be maintained for all user-facing pages (EN/FR)
- Navigation entries should map to both locales consistently

## Route Naming Conventions

English routes:
- `/en/products/`
- `/en/resources/`
- `/en/features/`
- `/en/distributors/`

French routes:
- `/fr/products/`
- `/fr/resources/`
- `/fr/features/`
- `/fr/distributors/`

EN and FR routes should remain structurally aligned to preserve maintainability and predictable navigation behavior.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone this repository:
```bash
git clone <your-repository-url>
cd portable-fire-pumps
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:4321](http://localhost:4321) in your browser

## 📝 Configuration

### Site Configuration

Update `src/config/site.ts` with your information:

```typescript
export const SITE = {
  title: 'Portable Fire Pumps',
  description: 'High-performance portable fire pumps for fire prevention and disaster relief sectors',
  url: 'https://www.portable-fire-pumps.com',
  author: 'Kojex International',
} as const;

export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/shibaura_bousai',
  facebook: 'https://www.facebook.com/profile.php?id=61556205597560',
  instagram: 'https://www.instagram.com/shibaura_fire_pump/',
  youtube: 'https://www.youtube.com/@shibaura6004',
} as const;
```

### Form Integration

The RFQ form (`src/components/forms/RFQForm.tsx`) currently logs form data to the console. To integrate with a backend:

1. **Option 1: Form Service** (Recommended for static sites)
   - Use [Formspree](https://formspree.io/), [Netlify Forms](https://www.netlify.com/products/forms/), or similar
   - Update the `handleSubmit` function in `RFQForm.tsx`

2. **Option 2: Custom API**
   - Create an API endpoint
   - Update the form submission handler

Example with Formspree:
```typescript
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  
  const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    body: formData,
    headers: { 'Accept': 'application/json' }
  });
  
  if (response.ok) {
    // Show success message
  }
};
```

## 🛠️ Available Scripts

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `npm install`          | Installs dependencies                            |
| `npm run dev`          | Starts local dev server at `localhost:4321`     |
| `npm run build`        | Build your production site to `./dist/`         |
| `npm run preview`      | Preview your build locally, before deploying     |
| `npm run audit:images` | Audit active image alt text and filename quality |
| `npm run astro ...`    | Run CLI commands like `astro add`, `astro check` |

## Website Preview

### Homepage

![Homepage](docs/screenshots/homepage.png)

### Product Page

![Product Page](docs/screenshots/product-page.png)

### Resources

![Resources](docs/screenshots/resources.png)

## 📁 Project Structure

```
/
├── public/                   # Static files served as-is
├── src/
│   ├── archive/                # Archived template/legacy code and assets
│   ├── assets/                 # Source-managed images/graphics
│   ├── components/
│   │   ├── forms/              # RFQ/contact form components
│   │   ├── layout/             # Shared page layout primitives
│   │   ├── navigation/         # Header/footer/mobile navigation
│   │   ├── products/           # Product-specific rendering components
│   │   ├── react/              # React island components
│   │   ├── sections/           # Reusable page sections
│   │   └── ui/                 # Generic UI primitives
│   ├── config/                 # Site/navigation configuration
│   ├── data/
│   │   ├── firepumps.ts        # Compatibility re-export
│   │   └── firepumps/          # Modular firepump data system
│   │       ├── index.ts        # Public API + validation
│   │       ├── pumps/          # One file per pump model
│   │       ├── localize.ts
│   │       ├── validation.ts
│   │       ├── media.ts
│   │       ├── spec-utils.ts
│   │       ├── spec-types.ts
│   │       ├── types.ts
│   │       └── frReplacements.ts
│   ├── layouts/                # Base layout composition
│   ├── pages/
│   │   ├── en/                 # English routes
│   │   └── fr/                 # French routes
│   ├── styles/                 # Global styles
│   └── utils/                  # Utility helpers
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## Product Rendering Architecture

- Product detail pages use thin locale wrappers:
  - `src/pages/en/products/[slug].astro`
  - `src/pages/fr/products/[slug].astro`
- Shared product rendering is centralized in:
  - `src/components/products/ProductDetailPageContent.astro`
- Product content is sourced from the modular firepump data API (`getFirepumps(...)`), keeping page templates declarative and minimizing duplicated EN/FR markup.

### Product Page Flow

The current product page architecture flows from route wrappers to shared rendering and then to the firepump data layer.

```text
EN/FR Route
    ↓
[slug].astro
    ↓
ProductDetailPageContent.astro
    ↓
src/data/firepumps/index.ts
    ↓
pumps/<model>.ts
```

## Firepump Data Architecture

- `src/data/firepumps.ts` is a compatibility layer that re-exports from `src/data/firepumps/index.ts`.
- `src/data/firepumps/index.ts` assembles pump modules, runs validation, and exports `getFirepumps(locale)`.
- Each pump model is defined under `src/data/firepumps/pumps/`.
- Supporting modules are split by responsibility:
  - `localize.ts` (EN/FR value localization)
  - `validation.ts` (hero/spec schema validation)
  - `media.ts` (shared media/manual assets)
  - `spec-utils.ts` and `spec-types.ts` (spec table helpers/types)
  - `frReplacements.ts` (French normalization replacements)

## 🗂️ Asset Organization

- Store source-managed images and graphics in `src/assets/`
- Store direct public files (favicons, static media, non-bundled assets) in `public/`
- Keep product-related media grouped by model family where practical
- Keep archived/deprecated template assets under `src/archive/`

## Asset Naming Guidelines

- Use lowercase only
- Use kebab-case only
- Use descriptive names; avoid generic names like `image1`, `final-v2`, `IMG_1234`
- Include model numbers when relevant
- Keep hero/support images separate from product/model assets
- Archive deprecated assets rather than deleting them

Recommended naming patterns:
- Product photos: `shibaura-{model}-portable-fire-pump-{view}.ext`
- Performance overview images: `{model}-performance-overview-graph.ext`
- Performance charts: `{model}-performance-curve.ext`
- Dimensions diagrams: `{model}-dimensions-diagram.ext`
- Hero/support images: `{context}-{role}.ext`
- Brand assets: `shibaura-wordmark.ext`, `shibaura-logo-mark.ext`

Examples:
- `shibaura-ff500ar-portable-fire-pump-side-view.jpg`
- `ft510-performance-overview-graph.png`
- `ff500-dimensions-diagram.jpg`
- `distributors-network-hero.png`
- `shibaura-wordmark.svg`

## Alt Text Standards

- Meaningful content images must have descriptive alt text
- Decorative images should use `alt=""`
- Describe the image naturally; do not repeat filenames
- Avoid keyword stuffing
- Include model/context where useful for product and technical imagery

Examples:
- `Side view of the Shibaura FT510 portable fire pump`
- `Performance curve for the Shibaura P572S portable fire pump`
- `Diagram showing a portable fire pump relay system used in wildfire operations`

### Image Audit

Run `npm run audit:images` to scan active source files for:
- `<img>` or `<Image>` tags missing `alt`
- weak literal alt values such as `image`, `photo`, `picture`, or `logo`
- generic asset filename references in active imports

Scope: `src/pages/`, `src/components/`, `src/layouts/` (excluding archived content).

## 🎨 Customization

### Colors

The site uses Tailwind CSS. Customize colors in `src/styles/global.css` or update Tailwind config.

### Images

Store production images in `src/assets/` and public static media in `public/`.

### Content

- Update page and section copy in `src/pages/` and related components
- Modify navigation in `src/config/site.ts`
- Maintain EN/FR parity for user-facing pages
- Keep product/resource data aligned with `src/data/`

## ➕ Adding a New Pump Model

1. Add a new model file under `src/data/firepumps/pumps/`.
2. Export/include it in `src/data/firepumps/index.ts` so it is part of the validated `firepumps` array.
3. Add required media/manual assets via `src/data/firepumps/media.ts` (or existing asset/data locations as appropriate).
4. Verify EN/FR product detail routes resolve via `src/pages/en/products/[slug].astro` and `src/pages/fr/products/[slug].astro`.
5. Confirm listing/card surfaces include the new model where needed.
6. Run `npm run build` and validate hero/spec/resources output for both locales.

## Page Creation Checklist

- Create EN route
- Create FR route
- Confirm route naming consistency
- Add metadata and title
- Confirm images load correctly
- Confirm internal links
- Verify layout consistency
- Test page locally

## Pre-Deployment Checklist

- Run `npm run build` successfully
- Verify EN and FR routes exist for new pages
- Verify product pages render correctly
- Verify hero images load correctly
- Check console for build errors
- Verify internal navigation links
- Confirm RFQ form still works
- Confirm assets are located in correct directories

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

This creates a `dist/` folder with your static site.

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

### Other Platforms

The `dist/` folder can be deployed to any static hosting service:
- GitHub Pages
- Cloudflare Pages
- AWS S3 + CloudFront
- Any static hosting provider

## Template Acknowledgment

This project was originally bootstrapped from an Astro website template created by **Sudeep**.

Original template source:
https://github.com/sudeep2003

The repository has since been significantly modified and adapted to power the **Portable Fire Pumps** distributor website operated by **Kojex International**. Most of the site structure, content, and components have been customized for this project.

The original template is licensed under the MIT License. The original license notice is preserved in the repository.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## 🤝 Contributing

Contributions, issues, and feature requests are welcome. Please open an issue in this repository.

## ⭐ Show Your Support

If you find this repository useful, please give it a star on GitHub.

## 📧 Support

For questions or support, please open an issue on GitHub.

Built with [Astro](https://astro.build)
