# 🛠 Documentation Technique Avancée

## Architecture Détaillée

### App Router Next.js 14

```typescript
app/
├── (admin)/                 # Route Group - Administration
│   ├── admin/
│   │   └── page.tsx        # /admin - Interface d'administration
│   ├── layout.tsx          # Layout admin avec protection
│   └── page.tsx            # Page d'accueil admin
├── blog/
│   └── page.tsx            # /blog - Page blog complète
├── galerie/
│   └── page.tsx            # /galerie - Galerie complète
├── globals.css             # Styles globaux + variables CSS
├── layout.tsx              # Root layout avec providers
└── page.tsx                # / - Homepage
```

### Système de Types TypeScript

#### Interfaces Principales

```typescript
// Types pour les photos
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
  location?: string
  camera?: string
  settings?: {
    aperture?: string
    shutter?: string
    iso?: string
    focal?: string
  }
}

// Types pour les articles de blog
interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  coverImage: string
  author: {
    name: string
    avatar: string
    bio: string
  }
  publishedAt: string
  updatedAt?: string
  readingTime: number
  tags: string[]
  category: string
  featured: boolean
  views: number
}

// Types pour l'upload
interface UploadedFile {
  id: string
  file: File
  preview: string
  progress: number
  status: 'uploading' | 'completed' | 'error'
  error?: string
}
```

### Système de Composants

#### Pattern de Composition

```typescript
// Exemple : GalleryPreview
export function GalleryPreview() {
  // State management local
  const [selectedCategory, setSelectedCategory] = useState('Tous')
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  // Logic de filtrage
  const filteredItems = selectedCategory === 'Tous' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory)

  return (
    <section>
      <CategoryFilters {...} />
      <MasonryGrid items={filteredItems} />
      <Lightbox {...} />
    </section>
  )
}
```

#### Props Pattern avec TypeScript

```typescript
// Interface avec props optionnelles et defaults
interface ComponentProps {
  title?: string
  description?: string
  showCategories?: boolean
  allowDownload?: boolean
  onPhotoClick?: (photo: PhotoItem) => void
}

// Destructuring avec defaults
export function Component({ 
  title = "Default Title",
  description = "Default Description",
  showCategories = true,
  allowDownload = false,
  onPhotoClick 
}: ComponentProps) {
  // Implementation
}
```

### State Management

#### useState pour l'état local

```typescript
// Gestion des filtres
const [selectedCategory, setSelectedCategory] = useState<string>('Tous')
const [searchTerm, setSearchTerm] = useState<string>('')

// Gestion des modales
const [lightboxOpen, setLightboxOpen] = useState<boolean>(false)
const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number>(0)

// Gestion des uploads
const [files, setFiles] = useState<UploadedFile[]>([])
const [uploadProgress, setUploadProgress] = useState<number>(0)
```

#### Context Pattern pour le thème

```typescript
// ThemeProvider utilise next-themes
import { ThemeProvider as NextThemesProvider } from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
```

### Optimisation des Performances

#### Code Splitting Automatique

```typescript
// Lazy loading des composants lourds
const EnhancedGallery = dynamic(() => import('./galleries/EnhancedGallery'), {
  loading: () => <Loading />,
  ssr: false // Client-side uniquement si nécessaire
})

// Préchargement conditionnel
const AdminPanel = dynamic(() => import('./admin/AdminPanel'), {
  loading: () => <Loading message="Chargement de l'administration..." />,
})
```

#### Optimisation des Images

```typescript
// Configuration Next.js Image
const imageProps = {
  src: photo.src,
  alt: photo.alt,
  width: photo.width || 600,
  height: photo.height || 400,
  quality: 85,
  placeholder: 'blur' as const,
  blurDataURL: generateBlurDataURL(photo.src),
  sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
}
```

#### Memoization avec useMemo et useCallback

```typescript
// Memoization des calculs coûteux
const filteredAndSortedPhotos = useMemo(() => {
  return photos
    .filter(photo => selectedCategory === 'Tous' || photo.category === selectedCategory)
    .filter(photo => photo.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}, [photos, selectedCategory, searchTerm])

// Memoization des handlers
const handlePhotoClick = useCallback((photoId: string) => {
  const photoIndex = filteredPhotos.findIndex(p => p.id === photoId)
  setCurrentPhotoIndex(photoIndex)
  setLightboxOpen(true)
}, [filteredPhotos])
```

### Animations avec Framer Motion

#### Variants Pattern

```typescript
// Définition des variants d'animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

// Utilisation dans le composant
<motion.div
  variants={containerVariants}
  initial="hidden"
  animate="visible"
>
  {items.map(item => (
    <motion.div key={item.id} variants={itemVariants}>
      {/* Contenu */}
    </motion.div>
  ))}
</motion.div>
```

#### Animations de Layout

```typescript
// Animation automatique lors des changements de layout
<motion.div layout layoutId={photo.id}>
  <Image {...imageProps} />
</motion.div>

// Animations de présence
<AnimatePresence mode="wait">
  {isVisible && (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
    >
      {/* Contenu */}
    </motion.div>
  )}
</AnimatePresence>
```

### Gestion des Erreurs

#### Error Boundaries

```typescript
// components/ErrorBoundary.tsx
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />
    }

    return this.props.children
  }
}
```

#### Gestion d'erreur avec try/catch

```typescript
// Gestion des erreurs async
const handleUpload = async (files: FileList) => {
  try {
    setIsUploading(true)
    const uploadPromises = Array.from(files).map(uploadFile)
    await Promise.all(uploadPromises)
    toast.success('Upload terminé avec succès!')
  } catch (error) {
    console.error('Erreur upload:', error)
    toast.error('Erreur lors de l\'upload')
  } finally {
    setIsUploading(false)
  }
}
```

### SEO & Métadonnées

#### Metadata API Next.js 14

```typescript
// Génération dynamique des métadonnées
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const photo = await getPhoto(params.id)
  
  return {
    title: `${photo.title} | Portfolio`,
    description: photo.description,
    openGraph: {
      title: photo.title,
      description: photo.description,
      images: [
        {
          url: photo.src,
          width: photo.width,
          height: photo.height,
          alt: photo.alt,
        }
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: photo.title,
      description: photo.description,
      images: [photo.src],
    },
  }
}
```

#### Structured Data

```typescript
// Génération de JSON-LD pour Schema.org
export function generatePhotoStructuredData(photo: PhotoItem) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Photograph',
    name: photo.title,
    description: photo.description,
    url: photo.src,
    creator: {
      '@type': 'Person',
      name: photo.photographer || 'Photographe',
    },
    datePublished: photo.publishedAt,
    contentLocation: photo.location,
  }
}
```

### Tests (Structure prévue)

#### Tests Unitaires avec Jest

```typescript
// __tests__/components/GalleryPreview.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { GalleryPreview } from '../components/sections/GalleryPreview'

describe('GalleryPreview', () => {
  it('should filter photos by category', () => {
    render(<GalleryPreview />)
    
    fireEvent.click(screen.getByText('Mariage'))
    
    expect(screen.getAllByTestId('photo-item')).toHaveLength(2)
  })
})
```

#### Tests E2E avec Playwright (prévu)

```typescript
// e2e/gallery.spec.ts
import { test, expect } from '@playwright/test'

test('gallery navigation works', async ({ page }) => {
  await page.goto('/')
  await page.click('[data-testid="gallery-link"]')
  await expect(page).toHaveURL('/galerie')
  await page.click('[data-testid="filter-mariage"]')
  await expect(page.locator('[data-testid="photo-item"]')).toHaveCount(2)
})
```

### Optimisations Avancées

#### Bundle Analysis

```bash
# Analyse du bundle
npm run build
npx @next/bundle-analyzer

# Résultats typiques:
# - Main bundle: ~200KB (gzipped)
# - Images optimisées: WebP/AVIF
# - Code splitting automatique
# - Tree shaking effectif
```

#### Performance Monitoring

```typescript
// Mesure des Core Web Vitals
export function reportWebVitals(metric: NextWebVitalsMetric) {
  switch (metric.name) {
    case 'FCP':
      // First Contentful Paint
      console.log('FCP:', metric.value)
      break
    case 'LCP':
      // Largest Contentful Paint
      console.log('LCP:', metric.value)
      break
    case 'CLS':
      // Cumulative Layout Shift
      console.log('CLS:', metric.value)
      break
    case 'FID':
      // First Input Delay
      console.log('FID:', metric.value)
      break
    case 'TTFB':
      // Time to First Byte
      console.log('TTFB:', metric.value)
      break
  }
}
```

### Déploiement & CI/CD

#### GitHub Actions Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy Portfolio

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run test

  build-and-deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

### Sécurité

#### Content Security Policy

```typescript
// next.config.js
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline';
      style-src 'self' 'unsafe-inline' fonts.googleapis.com;
      img-src 'self' data: blob: https:;
      font-src 'self' fonts.gstatic.com;
      connect-src 'self' vitals.vercel-insights.com;
    `.replace(/\s{2,}/g, ' ').trim()
  }
]

module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}
```

#### Variables d'Environnement

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://votre-domaine.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
CONTACT_EMAIL=contact@votre-domaine.com
UPLOAD_SECRET=votre-secret-upload
```

Cette documentation technique couvre tous les aspects avancés de l'architecture et du développement du portfolio photo.
