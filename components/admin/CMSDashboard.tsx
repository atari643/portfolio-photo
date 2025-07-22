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

  // Données factices pour la démo
  const statsCards: StatCard[] = [
    {
      title: 'Photos totales',
      value: stats?.totalPhotos || 247,
      change: +12,
      icon: Camera,
      color: 'blue',
      description: 'Photos dans votre collection'
    },
    {
      title: 'Galeries actives',
      value: stats?.totalGalleries || 12,
      change: +2,
      icon: Layout,
      color: 'green',
      description: 'Galeries publiées'
    },
    {
      title: 'Vues ce mois',
      value: stats?.monthlyViews || '4.2K',
      change: +18,
      icon: Eye,
      color: 'purple',
      description: 'Visiteurs uniques'
    },
    {
      title: 'J\'aime reçus',
      value: stats?.totalLikes || 892,
      change: +24,
      icon: Heart,
      color: 'red',
      description: 'Réactions positives'
    },
    {
      title: 'Taux d\'engagement',
      value: '8.4%',
      change: +3.2,
      icon: TrendingUp,
      color: 'orange',
      description: 'Interactions / vues'
    },
    {
      title: 'Nouveaux followers',
      value: 156,
      change: +28,
      icon: Users,
      color: 'indigo',
      description: 'Ce mois-ci'
    }
  ]

  const recentActivity = [
    {
      type: 'upload',
      message: 'Nouvelle photo ajoutée à "Mariage Sarah & Tom"',
      time: '2 minutes',
      icon: Upload,
      color: 'green'
    },
    {
      type: 'gallery',
      message: 'Galerie "Portraits Automne" mise à jour',
      time: '1 heure',
      icon: Layout,
      color: 'blue'
    },
    {
      type: 'view',
      message: '23 nouvelles vues sur votre portfolio',
      time: '3 heures',
      icon: Eye,
      color: 'purple'
    },
    {
      type: 'like',
      message: '5 nouveaux j\'aime sur vos photos',
      time: '4 heures',
      icon: Heart,
      color: 'red'
    }
  ]

  const popularPhotos = [
    {
      id: '1',
      title: 'Portrait coucher de soleil',
      views: 234,
      likes: 45,
      thumbnail: '/api/placeholder/400/300'
    },
    {
      id: '2',
      title: 'Architecture moderne',
      views: 189,
      likes: 38,
      thumbnail: '/api/placeholder/400/300'
    },
    {
      id: '3',
      title: 'Nature sauvage',
      views: 156,
      likes: 31,
      thumbnail: '/api/placeholder/400/300'
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
        {/* Activité récente */}
        <div className="col-span-12 lg:col-span-8">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900">Activité récente</h3>
              <button className="text-sm text-blue-600 hover:text-blue-700">
                Voir tout
              </button>
            </div>
            
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-4 p-3 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <div className={`w-10 h-10 bg-${activity.color}-100 rounded-full flex items-center justify-center`}>
                    <activity.icon className={`h-5 w-5 text-${activity.color}-600`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">{activity.message}</p>
                    <p className="text-xs text-slate-500">Il y a {activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Photos populaires */}
        <div className="col-span-12 lg:col-span-4">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900">Photos populaires</h3>
              <Star className="h-5 w-5 text-yellow-500" />
            </div>
            
            <div className="space-y-4">
              {popularPhotos.map((photo, index) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <img
                    src={photo.thumbnail}
                    alt={photo.title}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">{photo.title}</p>
                    <div className="flex items-center space-x-3 text-xs text-slate-500">
                      <span className="flex items-center space-x-1">
                        <Eye className="h-3 w-3" />
                        <span>{photo.views}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Heart className="h-3 w-3" />
                        <span>{photo.likes}</span>
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
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
