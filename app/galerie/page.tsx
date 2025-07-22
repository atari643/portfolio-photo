import { Metadata } from 'next'
import { Navigation } from '../../components/layout/Navigation'
import { Footer } from '../../components/layout/Footer'
import { EnhancedGallery } from '../../components/galleries/EnhancedGallery'

export const metadata: Metadata = {
  title: 'Galerie - Portfolio Photographe',
  description: 'Découvrez l\'intégralité de mes œuvres photographiques. Collection complète de portraits, mariages, nature et photographie d\'art.',
  keywords: 'galerie photo, portfolio photographe, mariage, portrait, nature, photographie artistique',
  openGraph: {
    title: 'Galerie Complète - Portfolio Photographe',
    description: 'Collection complète de mes meilleures œuvres photographiques',
    type: 'website',
  },
}

// Photos exemple pour la galerie complète (à remplacer par vos vraies données)
const galleryPhotos = [
  {
    id: '1',
    src: '/api/placeholder/400/600',
    alt: 'Portrait couple élégant',
    category: 'Mariage',
    title: 'Sarah & Thomas',
    description: 'Un amour rayonnant sous la lumière dorée du coucher de soleil',
    width: 400,
    height: 600,
  },
  {
    id: '2',
    src: '/api/placeholder/600/400',
    alt: 'Paysage montagne majestueuse',
    category: 'Nature',
    title: 'Alpes Françaises',
    description: 'Quand la terre touche le ciel dans une harmonie parfaite',
    width: 600,
    height: 400,
  },
  {
    id: '3',
    src: '/api/placeholder/400/500',
    alt: 'Portrait enfant souriant',
    category: 'Portrait',
    title: 'Innocence Pure',
    description: 'Le sourire qui illumine tout, capturé dans un moment d\'émotion pure',
    width: 400,
    height: 500,
  },
  {
    id: '4',
    src: '/api/placeholder/500/600',
    alt: 'Cérémonie de mariage intime',
    category: 'Mariage',
    title: 'Premier Regard',
    description: 'L\'émotion à l\'état pur lors de la découverte de la mariée',
    width: 500,
    height: 600,
  },
  {
    id: '5',
    src: '/api/placeholder/600/500',
    alt: 'Architecture moderne urbaine',
    category: 'Architecture',
    title: 'Lignes Urbaines',
    description: 'Géométrie et lumière dans l\'architecture contemporaine',
    width: 600,
    height: 500,
  },
  {
    id: '6',
    src: '/api/placeholder/400/550',
    alt: 'Portrait femme élégante',
    category: 'Portrait',
    title: 'Élégance Naturelle',
    description: 'La beauté dans sa simplicité la plus authentique',
    width: 400,
    height: 550,
  },
  {
    id: '7',
    src: '/api/placeholder/550/400',
    alt: 'Coucher de soleil océan',
    category: 'Nature',
    title: 'Horizon Infini',
    description: 'L\'océan rencontre le ciel dans une danse de couleurs',
    width: 550,
    height: 400,
  },
  {
    id: '8',
    src: '/api/placeholder/450/600',
    alt: 'Portrait de famille joyeux',
    category: 'Portrait',
    title: 'Bonheur Familial',
    description: 'La complicité et l\'amour d\'une famille unie',
    width: 450,
    height: 600,
  },
  {
    id: '9',
    src: '/api/placeholder/600/450',
    alt: 'Détail architectural moderne',
    category: 'Architecture',
    title: 'Détails Contemporains',
    description: 'La beauté se cache dans les détails architecturaux',
    width: 600,
    height: 450,
  },
  {
    id: '10',
    src: '/api/placeholder/400/580',
    alt: 'Bouquet de mariée artistique',
    category: 'Mariage',
    title: 'Floraison d\'Amour',
    description: 'La délicatesse des fleurs symbole d\'un nouveau départ',
    width: 400,
    height: 580,
  },
  {
    id: '11',
    src: '/api/placeholder/580/400',
    alt: 'Forêt mystérieuse automne',
    category: 'Nature',
    title: 'Mystère Automnal',
    description: 'Les couleurs chaudes de l\'automne dans une forêt enchantée',
    width: 580,
    height: 400,
  },
  {
    id: '12',
    src: '/api/placeholder/420/600',
    alt: 'Portrait artistique noir et blanc',
    category: 'Portrait',
    title: 'Contraste Émotionnel',
    description: 'L\'intensité du regard capturée en noir et blanc',
    width: 420,
    height: 600,
  },
]

export default function GalleriePage() {
  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <Navigation />
      
      {/* Espacement pour la navigation fixe */}
      <div className="h-16"></div>
      
      <EnhancedGallery 
        photos={galleryPhotos}
        title="Galerie Complète"
        description="Explorez l'intégralité de mes œuvres photographiques. Chaque image raconte une histoire unique, chaque moment capturé révèle une émotion authentique."
        showCategories={true}
        allowDownload={true}
        showMetadata={true}
      />
      
      <Footer />
    </main>
  )
}
