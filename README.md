# Portfolio Photographe Professionnel 📸

Un portfolio moderne et élégant pour photographes professionnels, construit avec Next.js 14, TypeScript et Tailwind CSS selon les tendances design 2025.

## 📋 Table des Matières

1. [Fonctionnalités](#-fonctionnalités)
2. [Technologies](#-technologies-utilisées)
3. [Installation](#-installation)
4. [Architecture](#-architecture-du-projet)
5. [Composants](#-composants-détaillés)
6. [Configuration](#-configuration)
7. [Déploiement](#-déploiement)
8. [Personnalisation](#-personnalisation)

## ✨ Fonctionnalités

### 🎨 Design & Interface
- **Design moderne 2025** - Electric Blue, dégradés fluides, glassmorphism
- **Responsive Design** - Interface fluide sur tous les appareils
- **Animations immersives** - Transitions élégantes avec Framer Motion
- **Mode sombre/clair** - Thème adaptatif automatique
- **Typographie moderne** - Mix Inter/Playfair Display

### 📸 Galerie & Photos
- **Galerie masonry optimisée** - Layout dynamique responsive
- **Lightbox professionnel** - Yet Another React Lightbox intégré
- **Optimisation d'images** - Next.js Image avec Sharp
- **Filtres par catégorie** - Navigation intuitive
- **Métadonnées EXIF** - Informations techniques complètes

### 🚀 Administration
- **Interface d'admin moderne** - Dashboard glassmorphism
- **Upload drag & drop** - Gestion simplifiée des photos
- **Gestion des galeries** - Organisation par catégories
- **Statistiques temps réel** - Analytics visuels

### 📝 Blog & Contenu
- **Système de blog intégré** - Articles avec SEO
- **Recherche et filtres** - Navigation par catégories
- **Behind-the-scenes** - Stories et conseils
- **Éditeur markdown** - Gestion de contenu facilitée

### ⚡ Performance & SEO
- **SEO optimisé** - Metadata API Next.js 14
- **SSG & ISR** - Generation statique optimale
- **Core Web Vitals** - Performance maximale
- **Structured Data** - Schema.org intégré

## 🚀 Technologies utilisées

### Framework & Core
- **Next.js 14.2.30** - App Router, SSG, Image Optimization
- **TypeScript 5.3.3** - Type safety complète
- **React 18.2.0** - Hooks modernes et concurrent features

### Styling & Design
- **Tailwind CSS 3.3.6** - Utility-first CSS framework
- **Framer Motion 10.16.16** - Animations et micro-interactions
- **Lucide React 0.294.0** - Icônes modernes et cohérentes
- **Google Fonts** - Inter & Playfair Display

### Media & Galeries
- **Sharp 0.33.0** - Optimisation d'images haute performance
- **Yet Another React Lightbox 3.24.0** - Galerie professionnelle
- **PhotoSwipe 5.4.2** - Alternative lightbox mobile-first

### Utilities & Tools
- **React Hot Toast 2.4.1** - Notifications élégantes
- **Next Themes 0.2.1** - Gestion du mode sombre
- **Clsx 2.0.0** - Conditional classnames
- **Tailwind Merge 2.0.0** - Merge intelligent des classes CSS

## 📦 Installation

### Prérequis
- Node.js 18.0.0 ou supérieur
- npm ou yarn
- Git

### Installation rapide
```bash
# Cloner le repository
git clone https://github.com/atari643/portfolio-photo.git
cd portfolio-photo

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Ouvrir dans le navigateur
# http://localhost:3000
```

### Scripts disponibles
```bash
npm run dev      # Serveur de développement
npm run build    # Build de production
npm run start    # Serveur de production
npm run lint     # Linting ESLint
npm run export   # Export statique pour GitHub Pages
```

## 🏗 Architecture du Projet

```
portfolio-photo/
├── 📁 app/                          # App Router Next.js 14
│   ├── 📁 (admin)/                  # Route groupée administration
│   │   ├── admin/page.tsx           # Interface d'administration complète
│   │   ├── layout.tsx               # Layout admin avec protection
│   │   └── page.tsx                 # Page d'administration principale
│   ├── 📁 blog/                     # Système de blog intégré
│   │   └── page.tsx                 # Page blog avec filtres et recherche
│   ├── 📁 galerie/                  # Galeries photos
│   │   └── page.tsx                 # Galerie complète avec masonry
│   ├── globals.css                  # Styles globaux et variables CSS
│   ├── layout.tsx                   # Layout principal avec métadonnées
│   └── page.tsx                     # Page d'accueil
├── 📁 components/                   # Composants React modulaires
│   ├── 📁 admin/                    # Composants d'administration
│   │   └── PhotoUpload.tsx          # Upload drag & drop moderne
│   ├── 📁 galleries/                # Composants galeries
│   │   └── EnhancedGallery.tsx      # Galerie masonry avancée
│   ├── 📁 layout/                   # Composants de mise en page
│   │   ├── Footer.tsx               # Footer avec liens sociaux
│   │   └── Navigation.tsx           # Navigation sticky responsive
│   ├── 📁 providers/                # Context providers
│   │   └── ThemeProvider.tsx        # Provider thème sombre/clair
│   ├── 📁 sections/                 # Sections de page
│   │   ├── AboutSection.tsx         # Section à propos avec timeline
│   │   ├── BlogSection.tsx          # Section blog avec filtres
│   │   ├── ContactSection.tsx       # Formulaire de contact
│   │   ├── GalleryPreview.tsx       # Aperçu galerie homepage
│   │   ├── HeroSection.tsx          # Hero avec animations
│   │   └── ServicesSection.tsx      # Services avec pricing
│   ├── 📁 ui/                       # Composants UI réutilisables
│   │   ├── Button.tsx               # Bouton avec variantes
│   │   ├── Loading.tsx              # Composants de chargement
│   │   └── OptimizedImage.tsx       # Image wrapper optimisé
│   └── index.ts                     # Exports centralisés
├── 📁 lib/                          # Utilitaires et helpers
│   ├── seo.ts                       # Helpers SEO et métadonnées
│   └── utils.ts                     # Fonctions utilitaires
├── 📁 public/                       # Assets statiques
│   └── manifest.json                # PWA manifest
├── 📁 .github/workflows/            # GitHub Actions
│   └── deploy.yml                   # Déploiement automatique
├── next.config.js                   # Configuration Next.js
├── tailwind.config.js               # Configuration Tailwind CSS
├── tsconfig.json                    # Configuration TypeScript
└── package.json                     # Dépendances et scripts
```

## 🧩 Composants Détaillés

### 📱 Layout & Navigation

#### `components/layout/Navigation.tsx`
**Navigation responsive avec thème et animations**

```typescript
interface NavigationItem {
  name: string
  href: string
  icon: LucideIcon
}
```

**Fonctionnalités :**
- Navigation sticky avec blur backdrop
- Menu mobile hamburger animé
- Toggle thème sombre/clair intégré
- Smooth scroll vers les sections
- Indicateur de scroll actif

**Props & Configuration :**
- `navigationItems` : Array des éléments de menu
- Auto-détection de la section active
- Support clavier complet

#### `components/layout/Footer.tsx`
**Footer moderne avec liens sociaux et scroll-to-top**

**Fonctionnalités :**
- Links sociaux avec animations
- Bouton scroll-to-top conditionnel
- Grid responsive pour les liens
- Copyright dynamique

### 🎨 Sections de Contenu

#### `components/sections/HeroSection.tsx`
**Section héro avec animations parallax**

**Fonctionnalités :**
- Animation typewriter pour le titre
- Dégradés CSS modernes
- CTA buttons avec micro-interactions
- Responsive sur tous devices

#### `components/sections/AboutSection.tsx`
**Section à propos avec timeline**

**Fonctionnalités :**
- Timeline verticale animée
- Grid responsive pour skills
- Statistiques avec compteurs animés
- Parallax subtil sur images

#### `components/sections/GalleryPreview.tsx`
**Aperçu galerie pour la homepage**

```typescript
interface GalleryItem {
  id: string
  src: string
  alt: string
  category: string
  title: string
  description: string
}
```

**Fonctionnalités :**
- Layout masonry responsive
- Filtres par catégorie animés
- Hover effects sophistiqués
- Integration lightbox seamless

#### `components/sections/BlogSection.tsx`
**Système de blog complet avec recherche**

```typescript
interface BlogPost {
  id: string
  title: string
  excerpt: string
  coverImage: string
  author: Author
  publishedAt: string
  readingTime: number
  tags: string[]
  category: string
  featured: boolean
  views: number
}
```

**Fonctionnalités :**
- Recherche en temps réel
- Filtres par catégorie
- Cards avec métadonnées
- Mode featured/complet
- SEO optimisé par article

#### `components/sections/ServicesSection.tsx`
**Services avec pricing et CTA**

**Fonctionnalités :**
- Cards de services animées
- Pricing tables responsive
- CTA buttons personnalisés
- Icons Lucide intégrés

#### `components/sections/ContactSection.tsx`
**Formulaire de contact avec validation**

**Fonctionnalités :**
- Validation TypeScript stricte
- Messages d'erreur personnalisés
- États de chargement
- Toast notifications
- Intégration email (à configurer)

### � Galeries & Media

#### `components/galleries/EnhancedGallery.tsx`
**Galerie masonry professionnelle**

```typescript
interface PhotoItem {
  id: string
  src: string
  alt: string
  category: string
  title: string
  description: string
  width?: number
  height?: number
  likes?: number
  views?: number
  tags?: string[]
  photographer?: string
  camera?: string
  settings?: ExifSettings
}
```

**Fonctionnalités avancées :**
- Layout masonry intelligent
- Système de likes et vues
- Métadonnées EXIF complètes
- Partage social intégré
- Download conditionnel
- Lightbox avec navigation clavier
- Filtres par tags/catégorie
- Infinite scroll (prévu)

#### `components/ui/OptimizedImage.tsx`
**Wrapper d'image optimisé Next.js**

**Fonctionnalités :**
- Lazy loading intelligent
- Placeholder blur automatique
- Formats WebP/AVIF
- Responsive images
- Error handling robuste

### 🛠 Administration

#### `components/admin/PhotoUpload.tsx`
**Interface d'upload moderne drag & drop**

```typescript
interface UploadedFile {
  id: string
  file: File
  preview: string
  progress: number
  status: 'uploading' | 'completed' | 'error'
  error?: string
}
```

**Fonctionnalités :**
- Drag & drop multi-fichiers
- Preview instantané
- Validation de type/taille
- Barre de progression animée
- Gestion d'erreurs détaillée
- Interface non-technique friendly

#### `app/(admin)/admin/page.tsx`
**Dashboard d'administration complet**

**Fonctionnalités :**
- Navigation par onglets
- Statistiques en temps réel
- Actions rapides
- Design glassmorphism
- Interface intuitive pour photographes

### 🎯 UI Components

#### `components/ui/Button.tsx`
**Système de boutons avec variantes**

```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'accent' | 'ghost' | 'glass'
  size: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}
```

**Variantes disponibles :**
- `primary` : Gradient principal
- `secondary` : Style outline
- `accent` : Couleur d'accent
- `ghost` : Transparent avec hover
- `glass` : Effet glassmorphism

#### `components/ui/Loading.tsx`
**Composants de chargement animés**

**Types disponibles :**
- Spinner avec tailles variables
- Loading dots séquentiels
- Skeleton loaders (prévu)
- Messages de chargement personnalisés

## ⚙️ Configuration

### `next.config.js`
**Configuration Next.js optimisée**

```javascript
const nextConfig = {
  images: {
    domains: ['localhost', 'github.com', 'raw.githubusercontent.com'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    unoptimized: true, // Pour export statique
  },
  output: 'export', // GitHub Pages compatibility
  trailingSlash: true,
  distDir: 'out',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/portfolio-photo' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/portfolio-photo' : '',
}
```

### `tailwind.config.js`
**Configuration Tailwind avec couleurs 2025**

```javascript
theme: {
  extend: {
    colors: {
      'electric-blue': {
        500: '#0ea5e9', // Couleur tendance 2025
      },
      'sunset-orange': { /* Palette complète */ },
      'cosmic-purple': { /* Palette complète */ },
    },
    fontFamily: {
      sans: ['var(--font-inter)', 'sans-serif'],
      serif: ['var(--font-playfair)', 'serif'],
    },
    animation: {
      'gradient': 'gradient 6s ease infinite',
      'float': 'float 3s ease-in-out infinite',
    }
  }
}
```

### `lib/seo.ts`
**Système SEO avancé**

```typescript
export function generateSEOMetadata({
  title,
  description,
  image,
  type = 'website',
}: SEOConfig): Metadata
```

**Fonctionnalités SEO :**
- Metadata API Next.js 14
- Open Graph complet
- Twitter Cards
- Structured Data Schema.org
- Sitemap automatique
- Robots.txt optimisé

### `app/globals.css`
**Styles globaux et variables CSS**

**Inclus :**
- Variables CSS pour thèmes
- Classes utilitaires personnalisées
- Gradients modernes
- Shadows et effects
- Reset CSS moderne

## 📱 Déploiement

### GitHub Pages (Recommandé)

1. **Configuration automatique avec GitHub Actions**
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - name: Setup Node.js
      uses: actions/setup-node@v4
    - name: Build
      run: npm run build
    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
```

2. **Activation dans les paramètres GitHub**
   - Repository Settings > Pages
   - Source: GitHub Actions
   - Branch: gh-pages (créée automatiquement)

### Vercel (Alternative recommandée)

```bash
# Installation Vercel CLI
npm i -g vercel

# Déploiement
vercel --prod

# Configuration automatique détectée
```

### Netlify (Alternative)

```bash
# Build command
npm run build

# Publish directory
out
```

## 🎨 Personnalisation

### Couleurs et Thème

**Modifier les couleurs principales :**
```javascript
// tailwind.config.js
theme: {
  extend: {
    colors: {
      primary: {
        50: '#votre-couleur-50',
        500: '#votre-couleur-principale',
        900: '#votre-couleur-900',
      }
    }
  }
}
```

**Variables CSS personnalisées :**
```css
/* app/globals.css */
:root {
  --gradient-primary: linear-gradient(135deg, #votre-debut 0%, #votre-fin 100%);
  --shadow-soft: 0 4px 20px rgba(0, 0, 0, 0.1);
}
```

### Contenu et Textes

**Modifier les données des sections :**

1. **Images** : Remplacer dans `/public/images/`
2. **Galerie** : Modifier `galleryItems` dans `GalleryPreview.tsx`
3. **Services** : Adapter dans `ServicesSection.tsx`
4. **À propos** : Personnaliser dans `AboutSection.tsx`
5. **Blog** : Modifier `samplePosts` dans `BlogSection.tsx`

### Métadonnées et SEO

**Configuration principale :**
```typescript
// lib/seo.ts
const defaultConfig = {
  siteName: 'Votre Nom Portfolio',
  baseUrl: 'https://votre-domaine.com',
  defaultImage: '/images/og-default.jpg',
  twitterHandle: '@votre_handle',
  author: 'Votre Nom',
}
```

### Fonts et Typographie

**Changer les polices :**
```typescript
// app/layout.tsx
const customFont = Custom_Font({
  subsets: ['latin'],
  variable: '--font-custom',
  display: 'swap',
})
```

## 🤝 Contribution

### Structure des Commits
```
feat: Nouvelle fonctionnalité
fix: Correction de bug
docs: Documentation
style: Formatage
refactor: Refactoring
test: Tests
```

### Développement Local

```bash
# Branch pour nouvelle feature
git checkout -b feature/nom-feature

# Développement
npm run dev

# Tests et build
npm run build
npm run lint

# Commit et push
git add .
git commit -m "feat: description"
git push origin feature/nom-feature
```

## 📊 Performance & Analytics

### Core Web Vitals Optimisés
- **LCP** : < 2.5s (Next.js Image + SSG)
- **FID** : < 100ms (Code splitting optimisé)
- **CLS** : < 0.1 (Layouts stables)

### Bundle Analysis
```bash
# Analyser la taille du bundle
npm run build
npx @next/bundle-analyzer
```

### Monitoring (À intégrer)
- Vercel Analytics
- Google Analytics 4
- Search Console
- Performance monitoring

## 🔒 Sécurité

### Bonnes Pratiques Implémentées
- Headers de sécurité Next.js
- Validation TypeScript stricte
- Sanitization des inputs
- CSP (Content Security Policy)
- HTTPS enforced

### Variables d'Environnement
```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://votre-domaine.com
CONTACT_EMAIL=contact@votre-domaine.com
```

## 📞 Support & Contact

### Issues GitHub
- Bug reports avec template
- Feature requests
- Questions techniques

### Documentation
- README complet ✅
- Commentaires inline
- TypeScript types explicites
- Exemples d'usage

---

**Créé avec ❤️ pour les photographes passionnés**

*Portfolio moderne suivant les tendances design 2025 : Electric Blue, glassmorphism, micro-interactions et performance optimale.*