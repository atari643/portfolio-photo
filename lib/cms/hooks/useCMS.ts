import { useState, useEffect } from 'react'

// Hook pour gérer les photos
export function usePhotos() {
  const [photos, setPhotos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPhotos = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/cms/photos')
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

  const uploadPhotos = async (files: FileList) => {
    const formData = new FormData()
    Array.from(files).forEach(file => {
      formData.append('files', file)
    })

    try {
      const response = await fetch('/api/cms/photos', {
        method: 'POST',
        body: formData
      })
      
      const result = await response.json()
      if (result.success) {
        await fetchPhotos() // Recharger la liste
        return result.files
      } else {
        throw new Error(result.error)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'upload')
      throw err
    }
  }

  const updatePhoto = async (id: string, updateData: any) => {
    try {
      const response = await fetch('/api/cms/photos', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, ...updateData })
      })
      
      const result = await response.json()
      if (result.success) {
        await fetchPhotos() // Recharger la liste
        return result.photo
      } else {
        throw new Error(result.error)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la mise à jour')
      throw err
    }
  }

  const deletePhoto = async (id: string) => {
    try {
      const response = await fetch(`/api/cms/photos?id=${id}`, {
        method: 'DELETE'
      })
      
      const result = await response.json()
      if (result.success) {
        await fetchPhotos() // Recharger la liste
        return true
      } else {
        throw new Error(result.error)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la suppression')
      throw err
    }
  }

  useEffect(() => {
    fetchPhotos()
  }, [])

  return {
    photos,
    loading,
    error,
    uploadPhotos,
    updatePhoto,
    deletePhoto,
    refetch: fetchPhotos
  }
}

// Hook pour gérer les galeries
export function useGalleries() {
  const [galleries, setGalleries] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchGalleries = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/cms/galleries')
      const data = await response.json()
      setGalleries(data.galleries || [])
      setError(null)
    } catch (err) {
      setError('Erreur lors du chargement des galeries')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const createGallery = async (galleryData: any) => {
    try {
      const response = await fetch('/api/cms/galleries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(galleryData)
      })
      
      const result = await response.json()
      if (result.success) {
        await fetchGalleries()
        return result.gallery
      } else {
        throw new Error(result.error)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la création')
      throw err
    }
  }

  const updateGallery = async (id: string, updates: any) => {
    try {
      const response = await fetch('/api/cms/galleries', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, ...updates })
      })
      
      const result = await response.json()
      if (result.success) {
        await fetchGalleries()
        return result.gallery
      } else {
        throw new Error(result.error)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la mise à jour')
      throw err
    }
  }

  useEffect(() => {
    fetchGalleries()
  }, [])

  return {
    galleries,
    loading,
    error,
    createGallery,
    updateGallery,
    refetch: fetchGalleries
  }
}

// Hook pour gérer les catégories
export function useCategories() {
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCategories = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/cms/categories')
      const data = await response.json()
      setCategories(data.categories || [])
      setError(null)
    } catch (err) {
      setError('Erreur lors du chargement des catégories')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const createCategory = async (categoryData: any) => {
    try {
      const response = await fetch('/api/cms/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(categoryData)
      })
      
      const result = await response.json()
      if (result.success) {
        await fetchCategories()
        return result.category
      } else {
        throw new Error(result.error)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la création')
      throw err
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  return {
    categories,
    loading,
    error,
    createCategory,
    refetch: fetchCategories
  }
}

// Hook pour gérer les paramètres
export function useSettings() {
  const [settings, setSettings] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSettings = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/cms/settings')
      const data = await response.json()
      setSettings(data.settings)
      setError(null)
    } catch (err) {
      setError('Erreur lors du chargement des paramètres')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const updateSettings = async (updates: any) => {
    try {
      const response = await fetch('/api/cms/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ settings: updates })
      })
      
      const result = await response.json()
      if (result.success) {
        setSettings(result.settings)
        return result.settings
      } else {
        throw new Error(result.error)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la mise à jour')
      throw err
    }
  }

  useEffect(() => {
    fetchSettings()
  }, [])

  return {
    settings,
    loading,
    error,
    updateSettings,
    refetch: fetchSettings
  }
}

// Hook pour gérer les statistiques
export function useStats() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/cms/stats')
      const data = await response.json()
      setStats(data.stats)
      setError(null)
    } catch (err) {
      setError('Erreur lors du chargement des statistiques')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  return {
    stats,
    loading,
    error,
    refetch: fetchStats
  }
}
