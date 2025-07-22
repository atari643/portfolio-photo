import { useState, useEffect } from 'react'

export interface PublicPhoto {
  id: string
  title: string
  description: string
  url: string
  thumbnail?: string
  category: string
  tags: string[]
  featured: boolean
  alt?: string
  views: number
}

// Hook pour récupérer les photos publiques (pour le portfolio)
export function usePublicPhotos() {
  const [photos, setPhotos] = useState<PublicPhoto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPhotos = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/photos')
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des photos')
      }
      const data = await response.json()
      setPhotos(data.photos || [])
      setError(null)
    } catch (err) {
      setError('Erreur lors du chargement des photos')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPhotos()
  }, [])

  return { photos, loading, error, refetch: fetchPhotos }
}

// Hook pour récupérer les photos par catégorie
export function usePhotosByCategory(category?: string) {
  const { photos, loading, error, refetch } = usePublicPhotos()
  
  const filteredPhotos = category 
    ? photos.filter(photo => photo.category === category)
    : photos

  return { photos: filteredPhotos, loading, error, refetch }
}

// Hook pour récupérer seulement les photos vedettes
export function useFeaturedPhotos(limit?: number) {
  const { photos, loading, error, refetch } = usePublicPhotos()
  
  const featuredPhotos = photos
    .filter(photo => photo.featured)
    .slice(0, limit)

  return { photos: featuredPhotos, loading, error, refetch }
}
