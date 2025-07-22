'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Camera,
  Layout,
  Eye,
  Heart,
  TrendingUp,
  Users,
  Calendar,
  FileText,
  BarChart3,
  Activity,
  Star,
  Upload,
  Download,
  Share2
} from 'lucide-react'
import { useStats } from '@/lib/cms/hooks/useCMS'

interface StatCard {
  title: string
  value: string | number
  change?: number
  icon: any
  color: string
  description: string
}

export function CMSDashboard() {
  const { stats, loading } = useStats()
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month')

  // Cartes de statistiques basées sur les vraies données
  const statsCards: StatCard[] = [
    {
      title: 'Photos totales',
      value: stats?.totalPhotos || 0,
      change: 0,
      icon: Camera,
      color: 'blue',
      description: 'Photos dans votre collection'
    },
    {
      title: 'Galeries actives',
      value: stats?.totalGalleries || 0,
      change: 0,
      icon: Layout,
      color: 'green',
      description: 'Galeries publiées'
    },
    {
      title: 'Vues totales',
      value: stats?.totalViews || 0,
      change: 0,
      icon: Eye,
      color: 'purple',
      description: 'Vues de vos photos'
    },
    {
      title: 'Catégories',
      value: stats?.totalCategories || 0,
      change: 0,
      icon: TrendingUp,
      color: 'orange',
      description: 'Catégories organisées'
    }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-slate-600">Chargement du tableau de bord...</span>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* En-tête */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Tableau de bord</h2>
          <p className="text-slate-600">Vue d'ensemble de votre portfolio photographique</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="week">7 derniers jours</option>
            <option value="month">30 derniers jours</option>
            <option value="year">12 derniers mois</option>
          </select>
        </div>
      </div>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statsCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center`}>
                <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
              </div>
              {stat.change && (
                <div className={`flex items-center space-x-1 text-sm ${
                  stat.change > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  <TrendingUp className="h-4 w-4" />
                  <span>{stat.change > 0 ? '+' : ''}{stat.change}%</span>
                </div>
              )}
            </div>
            
            <div>
              <p className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</p>
              <p className="text-sm font-medium text-slate-700 mb-1">{stat.title}</p>
              <p className="text-xs text-slate-500">{stat.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Répartition par catégories */}
        <div className="col-span-12 lg:col-span-8">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900">Répartition par catégories</h3>
              <BarChart3 className="h-5 w-5 text-blue-600" />
            </div>
            
            {stats?.categoryBreakdown && stats.categoryBreakdown.length > 0 ? (
              <div className="space-y-4">
                {stats.categoryBreakdown.map((category: any, index: number) => (
                  <div key={category.category} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">{category.category}</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 bg-slate-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${category.percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-slate-500 w-8">{category.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-slate-500">
                <BarChart3 className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                <p>Aucune donnée de catégorie disponible</p>
                <p className="text-sm">Ajoutez des photos pour voir les statistiques</p>
              </div>
            )}
          </div>
        </div>

        {/* Photos populaires */}
        <div className="col-span-12 lg:col-span-4">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900">Photos populaires</h3>
              <Star className="h-5 w-5 text-yellow-500" />
            </div>
            
            {stats?.popularPhotos && stats.popularPhotos.length > 0 ? (
              <div className="space-y-4">
                {stats.popularPhotos.map((photo: any, index: number) => (
                  <motion.div
                    key={photo.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div className="w-12 h-12 bg-slate-200 rounded-lg flex items-center justify-center">
                      <Camera className="h-6 w-6 text-slate-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate">{photo.title}</p>
                      <div className="flex items-center space-x-3 text-xs text-slate-500">
                        <span className="flex items-center space-x-1">
                          <Eye className="h-3 w-3" />
                          <span>{photo.views}</span>
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-slate-500">
                <Star className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                <p>Aucune photo populaire</p>
                <p className="text-sm">Les photos avec le plus de vues apparaîtront ici</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Actions rapides */}
      <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-6 border border-slate-200">
        <h3 className="text-xl font-bold text-slate-900 mb-4">Actions rapides</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex items-center space-x-3 p-4 bg-white rounded-lg hover:shadow-md transition-all group">
            <Camera className="h-6 w-6 text-blue-500 group-hover:scale-110 transition-transform" />
            <div className="text-left">
              <div className="font-medium text-slate-900">Ajouter des photos</div>
              <div className="text-sm text-slate-500">Upload par glisser-déposer</div>
            </div>
          </button>
          
          <button className="flex items-center space-x-3 p-4 bg-white rounded-lg hover:shadow-md transition-all group">
            <Layout className="h-6 w-6 text-green-500 group-hover:scale-110 transition-transform" />
            <div className="text-left">
              <div className="font-medium text-slate-900">Créer une galerie</div>
              <div className="text-sm text-slate-500">Nouvelle collection</div>
            </div>
          </button>
          
          <button className="flex items-center space-x-3 p-4 bg-white rounded-lg hover:shadow-md transition-all group">
            <BarChart3 className="h-6 w-6 text-purple-500 group-hover:scale-110 transition-transform" />
            <div className="text-left">
              <div className="font-medium text-slate-900">Voir les stats</div>
              <div className="text-sm text-slate-500">Analytics détaillées</div>
            </div>
          </button>
          
          <button className="flex items-center space-x-3 p-4 bg-white rounded-lg hover:shadow-md transition-all group">
            <Share2 className="h-6 w-6 text-orange-500 group-hover:scale-110 transition-transform" />
            <div className="text-left">
              <div className="font-medium text-slate-900">Partager</div>
              <div className="text-sm text-slate-500">Réseaux sociaux</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
