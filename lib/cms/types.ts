// Types communs pour le système CMS
export interface Photo {
  id: string
  filename: string
  path: string
  size: number
  type: string
  url: string
  thumbnail?: string
  title: string
  description: string
  category: string
  tags: string[]
  featured: boolean
  published: boolean
  uploadedAt: string
  views: number
  alt?: string
  order?: number
  
  // Métadonnées étendues pour portfolio
  subtitle?: string
  location?: string
  dateTaken?: string
  camera?: string
  lens?: string
  settings?: {
    aperture?: string
    shutter?: string
    iso?: string
    focalLength?: string
  }
  
  // Informations client/projet
  client?: string
  project?: string
  mood?: string
  colorPalette?: string[]
  technicalNotes?: string
  
  // SEO et social
  seoAlt?: string
  socialDescription?: string
  
  // Commercial
  price?: number
  license?: 'personal' | 'commercial' | 'editorial' | 'royalty-free'
  keywords?: string[]
  rating?: number // 1-5 étoiles
  isPrivate?: boolean
  
  // Métadonnées techniques
  metadata?: {
    size: number
    dimensions: { width: number; height: number }
    uploadedAt: string
    uploadedBy: string
  }
}

export interface Gallery {
  id: string
  title: string
  description: string
  slug: string
  coverImage: string
  photos: string[]
  order: number
  published: boolean
  createdAt: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  color?: string
  order: number
}

export interface SiteSettings {
  siteName: string
  tagline: string
  description: string
  contact: {
    email: string
    phone?: string
    address?: string
  }
  social: {
    instagram?: string
    facebook?: string
    website?: string
  }
  seo: {
    title: string
    description: string
    keywords: string[]
  }
}

export interface ThemeSettings {
  primaryColor: string
  secondaryColor: string
  accentColor: string
  backgroundColor: string
  textColor: string
  font: string
}
