'use client'

import { useState, createContext, useContext, useEffect } from 'react'
// import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'

interface CMSData {
  photos: Photo[]
  galleries: Gallery[]
  settings: SiteSettings
  theme: ThemeSettings
}

interface Photo {
  id: string
  title: string
  description: string
  url: string
  thumbnail: string
  tags: string[]
  gallery: string
  featured: boolean
  order: number
  alt: string
  metadata: {
    size: number
    dimensions: { width: number; height: number }
    uploadedAt: string
    uploadedBy: string
  }
}

interface Gallery {
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

interface SiteSettings {
  siteName: string
  tagline: string
  description: string
  contact: {
    email: string
    phone: string
    address: string
    social: {
      instagram: string
      facebook: string
      twitter: string
    }
  }
  seo: {
    metaTitle: string
    metaDescription: string
    keywords: string[]
  }
}

interface ThemeSettings {
  primaryColor: string
  secondaryColor: string
  accentColor: string
  fontPrimary: string
  fontSecondary: string
  headerStyle: 'minimal' | 'classic' | 'modern'
  galleryLayout: 'grid' | 'masonry' | 'slideshow'
}

interface CMSContextType {
  data: CMSData
  loading: boolean
  error: string | null
  
  // Actions photos
  uploadPhoto: (file: File, metadata: Partial<Photo>) => Promise<void>
  updatePhoto: (id: string, updates: Partial<Photo>) => Promise<void>
  deletePhoto: (id: string) => Promise<void>
  reorderPhotos: (photoIds: string[]) => Promise<void>
  
  // Actions galeries
  createGallery: (gallery: Omit<Gallery, 'id' | 'createdAt'>) => Promise<void>
  updateGallery: (id: string, updates: Partial<Gallery>) => Promise<void>
  deleteGallery: (id: string) => Promise<void>
  reorderGalleries: (galleryIds: string[]) => Promise<void>
  
  // Actions paramètres
  updateSettings: (settings: Partial<SiteSettings>) => Promise<void>
  updateTheme: (theme: Partial<ThemeSettings>) => Promise<void>
  
  // Actions Git
  commitChanges: (message: string) => Promise<void>
  deployChanges: () => Promise<void>
}

const CMSContext = createContext<CMSContextType | null>(null)

export function CMSProvider({ children }: { children: React.ReactNode }) {
  // const { data: session } = useSession()
  const [data, setData] = useState<CMSData>({
    photos: [],
    galleries: [],
    settings: {
      siteName: 'Portfolio Photographe',
      tagline: 'Capturer les moments précieux',
      description: 'Portfolio professionnel de photographie',
      contact: {
        email: 'contact@photographe.com',
        phone: '+33 6 12 34 56 78',
        address: 'Paris, France',
        social: {
          instagram: '@photographe',
          facebook: 'photographe',
          twitter: '@photographe'
        }
      },
      seo: {
        metaTitle: 'Portfolio Photographe - Photographie Professionnelle',
        metaDescription: 'Découvrez mon travail de photographe professionnel',
        keywords: ['photographie', 'portrait', 'mariage', 'événementiel']
      }
    },
    theme: {
      primaryColor: '#1f2937',
      secondaryColor: '#f9fafb',
      accentColor: '#ef4444',
      fontPrimary: 'Inter',
      fontSecondary: 'Playfair Display',
      headerStyle: 'modern',
      galleryLayout: 'grid'
    }
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Charger les données au démarrage
  useEffect(() => {
    loadCMSData()
  }, [])

  const loadCMSData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Charger depuis l'API
      const response = await fetch('/api/cms/data')
      if (!response.ok) throw new Error('Erreur lors du chargement')
      
      const cmsData = await response.json()
      setData(cmsData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue')
      toast.error('Erreur lors du chargement des données')
    } finally {
      setLoading(false)
    }
  }

  const uploadPhoto = async (file: File, metadata: Partial<Photo>) => {
    try {
      setLoading(true)
      
      const formData = new FormData()
      formData.append('file', file)
      formData.append('metadata', JSON.stringify(metadata))
      
      const response = await fetch('/api/cms/photos', {
        method: 'POST',
        body: formData
      })
      
      if (!response.ok) throw new Error('Erreur lors de l\'upload')
      
      const newPhoto = await response.json()
      setData(prev => ({
        ...prev,
        photos: [...prev.photos, newPhoto]
      }))
      
      toast.success('Photo uploadée avec succès')
    } catch (err) {
      toast.error('Erreur lors de l\'upload')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updatePhoto = async (id: string, updates: Partial<Photo>) => {
    try {
      const response = await fetch(`/api/cms/photos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      })
      
      if (!response.ok) throw new Error('Erreur lors de la mise à jour')
      
      const updatedPhoto = await response.json()
      setData(prev => ({
        ...prev,
        photos: prev.photos.map(p => p.id === id ? updatedPhoto : p)
      }))
      
      toast.success('Photo mise à jour')
    } catch (err) {
      toast.error('Erreur lors de la mise à jour')
      throw err
    }
  }

  const deletePhoto = async (id: string) => {
    try {
      const response = await fetch(`/api/cms/photos/${id}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) throw new Error('Erreur lors de la suppression')
      
      setData(prev => ({
        ...prev,
        photos: prev.photos.filter(p => p.id !== id)
      }))
      
      toast.success('Photo supprimée')
    } catch (err) {
      toast.error('Erreur lors de la suppression')
      throw err
    }
  }

  const reorderPhotos = async (photoIds: string[]) => {
    try {
      const response = await fetch('/api/cms/photos/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ photoIds })
      })
      
      if (!response.ok) throw new Error('Erreur lors du réordonnancement')
      
      // Réorganiser localement
      const reorderedPhotos = photoIds.map((id, index) => {
        const photo = data.photos.find(p => p.id === id)
        return photo ? { ...photo, order: index } : null
      }).filter(Boolean) as Photo[]
      
      setData(prev => ({ ...prev, photos: reorderedPhotos }))
      toast.success('Ordre mis à jour')
    } catch (err) {
      toast.error('Erreur lors du réordonnancement')
      throw err
    }
  }

  const createGallery = async (gallery: Omit<Gallery, 'id' | 'createdAt'>) => {
    try {
      const response = await fetch('/api/cms/galleries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gallery)
      })
      
      if (!response.ok) throw new Error('Erreur lors de la création')
      
      const newGallery = await response.json()
      setData(prev => ({
        ...prev,
        galleries: [...prev.galleries, newGallery]
      }))
      
      toast.success('Galerie créée avec succès')
    } catch (err) {
      toast.error('Erreur lors de la création')
      throw err
    }
  }

  const updateGallery = async (id: string, updates: Partial<Gallery>) => {
    try {
      const response = await fetch(`/api/cms/galleries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      })
      
      if (!response.ok) throw new Error('Erreur lors de la mise à jour')
      
      const updatedGallery = await response.json()
      setData(prev => ({
        ...prev,
        galleries: prev.galleries.map(g => g.id === id ? updatedGallery : g)
      }))
      
      toast.success('Galerie mise à jour')
    } catch (err) {
      toast.error('Erreur lors de la mise à jour')
      throw err
    }
  }

  const deleteGallery = async (id: string) => {
    try {
      const response = await fetch(`/api/cms/galleries/${id}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) throw new Error('Erreur lors de la suppression')
      
      setData(prev => ({
        ...prev,
        galleries: prev.galleries.filter(g => g.id !== id)
      }))
      
      toast.success('Galerie supprimée')
    } catch (err) {
      toast.error('Erreur lors de la suppression')
      throw err
    }
  }

  const reorderGalleries = async (galleryIds: string[]) => {
    try {
      const response = await fetch('/api/cms/galleries/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ galleryIds })
      })
      
      if (!response.ok) throw new Error('Erreur lors du réordonnancement')
      
      const reorderedGalleries = galleryIds.map((id, index) => {
        const gallery = data.galleries.find(g => g.id === id)
        return gallery ? { ...gallery, order: index } : null
      }).filter(Boolean) as Gallery[]
      
      setData(prev => ({ ...prev, galleries: reorderedGalleries }))
      toast.success('Ordre mis à jour')
    } catch (err) {
      toast.error('Erreur lors du réordonnancement')
      throw err
    }
  }

  const updateSettings = async (settings: Partial<SiteSettings>) => {
    try {
      const response = await fetch('/api/cms/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      })
      
      if (!response.ok) throw new Error('Erreur lors de la mise à jour')
      
      const updatedSettings = await response.json()
      setData(prev => ({ ...prev, settings: updatedSettings }))
      toast.success('Paramètres mis à jour')
    } catch (err) {
      toast.error('Erreur lors de la mise à jour')
      throw err
    }
  }

  const updateTheme = async (theme: Partial<ThemeSettings>) => {
    try {
      const response = await fetch('/api/cms/theme', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(theme)
      })
      
      if (!response.ok) throw new Error('Erreur lors de la mise à jour')
      
      const updatedTheme = await response.json()
      setData(prev => ({ ...prev, theme: updatedTheme }))
      toast.success('Thème mis à jour')
    } catch (err) {
      toast.error('Erreur lors de la mise à jour')
      throw err
    }
  }

  const commitChanges = async (message: string) => {
    try {
      setLoading(true)
      
      const response = await fetch('/api/cms/git/commit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      })
      
      if (!response.ok) throw new Error('Erreur lors du commit')
      
      toast.success('Modifications sauvegardées dans Git')
    } catch (err) {
      toast.error('Erreur lors de la sauvegarde')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const deployChanges = async () => {
    try {
      setLoading(true)
      
      const response = await fetch('/api/cms/deploy', {
        method: 'POST'
      })
      
      if (!response.ok) throw new Error('Erreur lors du déploiement')
      
      toast.success('Site déployé avec succès')
    } catch (err) {
      toast.error('Erreur lors du déploiement')
      throw err
    } finally {
      setLoading(false)
    }
  }

  return (
    <CMSContext.Provider value={{
      data,
      loading,
      error,
      uploadPhoto,
      updatePhoto,
      deletePhoto,
      reorderPhotos,
      createGallery,
      updateGallery,
      deleteGallery,
      reorderGalleries,
      updateSettings,
      updateTheme,
      commitChanges,
      deployChanges
    }}>
      {children}
    </CMSContext.Provider>
  )
}

export function useCMS() {
  const context = useContext(CMSContext)
  if (!context) {
    throw new Error('useCMS doit être utilisé dans un CMSProvider')
  }
  return context
}

// Types exportés
export type { Photo, Gallery, SiteSettings, ThemeSettings, CMSData }
