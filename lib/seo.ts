import { Metadata } from 'next'

interface SEOConfig {
  title: string
  description: string
  keywords?: string
  image?: string
  url?: string
  type?: 'website' | 'article' | 'profile'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  section?: string
  tags?: string[]
  locale?: string
}

const defaultConfig = {
  siteName: 'Portfolio Photographe Professionnel',
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://votre-domaine.com',
  defaultImage: '/images/og-default.jpg',
  twitterHandle: '@votre_username',
  author: 'Nom de la Photographe',
}

export function generateSEOMetadata({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  section,
}: SEOConfig): Metadata {
  const fullTitle = title.includes('Portfolio') ? title : `${title} | ${defaultConfig.siteName}`
  const fullUrl = url ? `${defaultConfig.baseUrl}${url}` : defaultConfig.baseUrl
  const ogImage = image ? `${defaultConfig.baseUrl}${image}` : `${defaultConfig.baseUrl}${defaultConfig.defaultImage}`

  return {
    title: fullTitle,
    description,
    keywords,
    authors: [{ name: author || defaultConfig.author }],
    creator: author || defaultConfig.author,
    publisher: defaultConfig.siteName,
    
    // Open Graph
    openGraph: {
      title: fullTitle,
      description,
      url: fullUrl,
      siteName: defaultConfig.siteName,
      type,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'fr_FR',
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(section && { section }),
    },

    // Twitter
    twitter: {
      card: 'summary_large_image',
      site: defaultConfig.twitterHandle,
      creator: defaultConfig.twitterHandle,
      title: fullTitle,
      description,
      images: [ogImage],
    },

    // Additional metadata
    alternates: {
      canonical: fullUrl,
    },
    
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    // Structured data hints
    other: {
      'og:image:alt': title,
      'og:image:type': 'image/jpeg',
      'article:author': author || defaultConfig.author,
      ...(section && { 'article:section': section }),
    },
  }
}

// Métadonnées spécifiques pour différents types de pages
export const seoTemplates = {
  home: {
    title: 'Portfolio Photographe Professionnel - Capturer l\'Émotion',
    description: 'Photographe professionnelle spécialisée dans les mariages, portraits et photographie d\'art. Découvrez mon univers créatif et mes services sur mesure.',
    keywords: 'photographe professionnel, mariage, portrait, photographie artistique, France, séance photo',
  },
  
  gallery: {
    title: 'Galerie Photo - Mes Plus Belles Œuvres',
    description: 'Explorez ma galerie complète : mariages, portraits, nature et photographie d\'art. Chaque image raconte une histoire unique.',
    keywords: 'galerie photo, portfolio, mariage, portrait, nature, photographie artistique',
  },
  
  about: {
    title: 'À Propos - Mon Histoire de Photographe',
    description: 'Découvrez mon parcours, ma passion pour la photographie et ma philosophie artistique. Plus de 8 ans d\'expérience à votre service.',
    keywords: 'photographe, à propos, expérience, parcours, passion photographie',
  },
  
  services: {
    title: 'Services Photo - Prestations Sur Mesure',
    description: 'Découvrez mes services photographiques : mariages, portraits, événements d\'entreprise et séances en destination. Devis personnalisé.',
    keywords: 'services photo, mariage, portrait, entreprise, tarifs photographe',
  },
  
  contact: {
    title: 'Contact - Réservez Votre Séance Photo',
    description: 'Contactez-moi pour discuter de votre projet photo. Disponible en France et à l\'international pour vos événements spéciaux.',
    keywords: 'contact photographe, réservation, devis photo, séance photo',
  },
}

// Générateur de données structurées JSON-LD
export function generateStructuredData(type: 'photographer' | 'article' | 'gallery' | 'service', data: any) {
  const baseData = {
    '@context': 'https://schema.org',
  }

  switch (type) {
    case 'photographer':
      return {
        ...baseData,
        '@type': 'Person',
        name: data.name || defaultConfig.author,
        jobTitle: 'Photographe Professionnelle',
        description: data.description,
        url: defaultConfig.baseUrl,
        image: data.image,
        sameAs: data.socialLinks || [],
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'FR',
          addressRegion: data.region || 'Île-de-France',
        },
        offers: {
          '@type': 'Offer',
          category: 'Photography Services',
          description: 'Services photographiques professionnels',
        },
      }

    case 'gallery':
      return {
        ...baseData,
        '@type': 'ImageGallery',
        name: data.title,
        description: data.description,
        author: {
          '@type': 'Person',
          name: defaultConfig.author,
        },
        numberOfImages: data.imageCount,
        datePublished: data.publishedDate,
      }

    case 'service':
      return {
        ...baseData,
        '@type': 'Service',
        name: data.name,
        description: data.description,
        provider: {
          '@type': 'Person',
          name: defaultConfig.author,
        },
        offers: {
          '@type': 'Offer',
          price: data.price,
          priceCurrency: 'EUR',
          description: data.description,
        },
      }

    case 'article':
      return {
        ...baseData,
        '@type': 'Article',
        headline: data.title,
        description: data.description,
        author: {
          '@type': 'Person',
          name: data.author || defaultConfig.author,
        },
        datePublished: data.publishedDate,
        dateModified: data.modifiedDate,
        image: data.image,
      }

    default:
      return baseData
  }
}
