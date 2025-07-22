import { NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

interface Stats {
  totalPhotos: number
  totalGalleries: number
  totalCategories: number
  totalViews: number
  recentUploads: number
  popularPhotos: Array<{
    id: string
    title: string
    views: number
    url: string
  }>
  categoryBreakdown: Array<{
    category: string
    count: number
    percentage: number
  }>
  monthlyStats: Array<{
    month: string
    uploads: number
    views: number
  }>
}

export async function GET() {
  try {
    // Récupérer les données des photos
    const photosPath = join(process.cwd(), 'data', 'photos.json')
    let photos: any[] = []
    if (existsSync(photosPath)) {
      const photosData = await readFile(photosPath, 'utf-8')
      photos = JSON.parse(photosData)
    }

    // Récupérer les données des galeries
    const galleriesPath = join(process.cwd(), 'data', 'galleries.json')
    let galleries: any[] = []
    if (existsSync(galleriesPath)) {
      const galleriesData = await readFile(galleriesPath, 'utf-8')
      galleries = JSON.parse(galleriesData)
    }

    // Récupérer les données des catégories
    const categoriesPath = join(process.cwd(), 'data', 'categories.json')
    let categories: any[] = []
    if (existsSync(categoriesPath)) {
      const categoriesData = await readFile(categoriesPath, 'utf-8')
      categories = JSON.parse(categoriesData)
    }

    // Calculer les statistiques
    const totalPhotos = photos.length
    const totalGalleries = galleries.length
    const totalCategories = categories.length
    const totalViews = photos.reduce((sum, photo) => sum + (photo.views || 0), 0)

    // Photos récemment uploadées (derniers 7 jours)
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    const recentUploads = photos.filter(photo => 
      new Date(photo.uploadedAt) > sevenDaysAgo
    ).length

    // Photos populaires (top 5 par vues)
    const popularPhotos = photos
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, 5)
      .map(photo => ({
        id: photo.id,
        title: photo.title,
        views: photo.views || 0,
        url: photo.url
      }))

    // Répartition par catégorie
    const categoryCount: { [key: string]: number } = {}
    photos.forEach(photo => {
      const category = photo.category || 'Non catégorisé'
      categoryCount[category] = (categoryCount[category] || 0) + 1
    })

    const categoryBreakdown = Object.entries(categoryCount).map(([category, count]) => ({
      category,
      count,
      percentage: Math.round((count / totalPhotos) * 100)
    }))

    // Statistiques mensuelles (6 derniers mois)
    const monthlyStats: Array<{
      month: string
      uploads: number
      views: number
    }> = []
    for (let i = 5; i >= 0; i--) {
      const date = new Date()
      date.setMonth(date.getMonth() - i)
      const monthKey = date.toISOString().substring(0, 7) // YYYY-MM
      
      const monthUploads = photos.filter(photo => 
        photo.uploadedAt && photo.uploadedAt.startsWith(monthKey)
      ).length

      monthlyStats.push({
        month: date.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' }),
        uploads: monthUploads,
        views: 0 // Vues réelles à implémenter si nécessaire
      })
    }

    const stats: Stats = {
      totalPhotos,
      totalGalleries,
      totalCategories,
      totalViews,
      recentUploads,
      popularPhotos,
      categoryBreakdown,
      monthlyStats
    }

    return NextResponse.json({ stats })

  } catch (error) {
    console.error('Erreur lors du calcul des statistiques:', error)
    
    // Retourner des statistiques par défaut en cas d'erreur
    const defaultStats: Stats = {
      totalPhotos: 0,
      totalGalleries: 0,
      totalCategories: 0,
      totalViews: 0,
      recentUploads: 0,
      popularPhotos: [],
      categoryBreakdown: [],
      monthlyStats: []
    }

    return NextResponse.json({ stats: defaultStats })
  }
}
