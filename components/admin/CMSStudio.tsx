'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  LayoutDashboard,
  Image,
  Folder,
  Settings,
  Palette,
  BarChart3,
  User,
  LogOut,
  Bell,
  Search,
  Plus,
  GitBranch,
  Zap,
  TrendingUp,
  Camera,
  Eye,
  Upload,
  Edit,
  Activity
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { CMSProvider, useCMS } from '@/lib/cms/context'
import { useAuth } from '@/lib/auth-context'
import { hasPermission } from '@/lib/auth'
import { CMSPhotoManager } from './CMSPhotoManager'
import { GalleryManager } from './CMSGalleryManager'
// import { VisualCustomizer } from './VisualCustomizer'
import toast from 'react-hot-toast'

interface NavigationItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  component: React.ComponentType
  permission?: string
}

const navigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Tableau de bord',
    icon: LayoutDashboard,
    component: DashboardHome
  },
  {
    id: 'photos',
    label: 'Photos',
    icon: Image,
    component: CMSPhotoManager,
    permission: 'photos.create'
  },
  {
    id: 'galleries',
    label: 'Galeries',
    icon: Folder,
    component: GalleryManager,
    permission: 'galleries.create'
  },
  {
    id: 'customization',
    label: 'Personnalisation',
    icon: Palette,
    component: CustomizationPlaceholder,
    permission: 'theme.edit'
  },
  {
    id: 'analytics',
    label: 'Statistiques',
    icon: BarChart3,
    component: AnalyticsPlaceholder
  },
  {
    id: 'settings',
    label: 'Paramètres',
    icon: Settings,
    component: SettingsPlaceholder
  }
]

function DashboardHome() {
  const { data } = useCMS()
  
  const stats = {
    totalPhotos: data.photos.length,
    totalGalleries: data.galleries.length,
    featuredPhotos: data.photos.filter(p => p.featured).length,
    publishedGalleries: data.galleries.filter(g => g.published).length
  }

  const recentActivity = [
    { type: 'photo', action: 'Ajout', item: 'Portrait Marie L.', time: '2h' },
    { type: 'gallery', action: 'Création', item: 'Mariage Sarah & Tom', time: '1j' },
    { type: 'theme', action: 'Modification', item: 'Couleurs principale', time: '2j' },
    { type: 'photo', action: 'Mise en avant', item: 'Coucher de soleil', time: '3j' }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="text-gray-600 mt-1">Vue d'ensemble de votre portfolio</p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Total Photos</p>
              <p className="text-3xl font-bold">{stats.totalPhotos}</p>
            </div>
            <Camera className="w-8 h-8 text-purple-200" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Galeries</p>
              <p className="text-3xl font-bold">{stats.totalGalleries}</p>
            </div>
            <Folder className="w-8 h-8 text-blue-200" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Photos mises en avant</p>
              <p className="text-3xl font-bold">{stats.featuredPhotos}</p>
            </div>
            <Eye className="w-8 h-8 text-green-200" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">Galeries publiées</p>
              <p className="text-3xl font-bold">{stats.publishedGalleries}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-orange-200" />
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Actions rapides */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-lg border border-gray-200 p-6"
        >
          <h3 className="text-lg font-medium text-gray-900 mb-4">Actions rapides</h3>
          <div className="space-y-3">
            <Button className="w-full justify-start" variant="secondary">
              <Upload className="w-4 h-4 mr-3" />
              Uploader des photos
            </Button>
            <Button className="w-full justify-start" variant="secondary">
              <Plus className="w-4 h-4 mr-3" />
              Créer une galerie
            </Button>
            <Button className="w-full justify-start" variant="secondary">
              <Palette className="w-4 h-4 mr-3" />
              Personnaliser le thème
            </Button>
            <Button className="w-full justify-start" variant="secondary">
              <GitBranch className="w-4 h-4 mr-3" />
              Publier les modifications
            </Button>
          </div>
        </motion.div>

        {/* Activité récente */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-lg border border-gray-200 p-6"
        >
          <h3 className="text-lg font-medium text-gray-900 mb-4">Activité récente</h3>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs ${
                  activity.type === 'photo' ? 'bg-purple-500' :
                  activity.type === 'gallery' ? 'bg-blue-500' :
                  activity.type === 'theme' ? 'bg-green-500' : 'bg-gray-500'
                }`}>
                  {activity.type === 'photo' ? <Camera className="w-4 h-4" /> :
                   activity.type === 'gallery' ? <Folder className="w-4 h-4" /> :
                   activity.type === 'theme' ? <Palette className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">{activity.action}</span> • {activity.item}
                  </p>
                  <p className="text-xs text-gray-500">Il y a {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function CustomizationPlaceholder() {
  return (
    <div className="text-center py-12">
      <Palette className="w-12 h-12 text-gray-300 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        Personnalisation visuelle
      </h3>
      <p className="text-gray-500">
        Le module de personnalisation sera bientôt disponible
      </p>
    </div>
  )
}

function AnalyticsPlaceholder() {
  return (
    <div className="text-center py-12">
      <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        Statistiques détaillées
      </h3>
      <p className="text-gray-500">
        Les analytics seront bientôt disponibles
      </p>
    </div>
  )
}

function SettingsPlaceholder() {
  return (
    <div className="text-center py-12">
      <Settings className="w-12 h-12 text-gray-300 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        Paramètres du site
      </h3>
      <p className="text-gray-500">
        Les paramètres seront bientôt disponibles
      </p>
    </div>
  )
}

function CMSDashboard() {
  const { user } = useAuth()
  const { logout } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const currentItem = navigationItems.find(item => item.id === activeTab)
  const CurrentComponent = currentItem?.component || DashboardHome

  const handleSignOut = () => {
    logout()
    toast.success('À bientôt !')
    router.push('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-16'} bg-white border-r border-gray-200 transition-all duration-300`}>
        <div className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <Camera className="w-5 h-5 text-white" />
            </div>
            {isSidebarOpen && (
              <div>
                <h1 className="text-lg font-bold text-gray-900">CMS Studio</h1>
                <p className="text-xs text-gray-500">Portfolio Manager</p>
              </div>
            )}
          </div>
        </div>

        <nav className="px-3 space-y-1">
          {navigationItems.map((item) => {
            // Vérifier les permissions
            if (item.permission && user?.permissions && 
                !hasPermission(user.permissions, item.permission)) {
              return null
            }

            const isActive = activeTab === item.id
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  isActive 
                    ? 'bg-purple-50 text-purple-700 border-r-2 border-purple-600' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-purple-600' : ''}`} />
                {isSidebarOpen && (
                  <span className="font-medium">{item.label}</span>
                )}
              </button>
            )
          })}
        </nav>

        {/* User section */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-200 bg-white">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-gray-600" />
            </div>
            {isSidebarOpen && (
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500">
                  {user?.role}
                </p>
              </div>
            )}
            <button
              onClick={handleSignOut}
              className="p-1 text-gray-400 hover:text-gray-600"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <Activity className="w-5 h-5" />
              </button>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {currentItem?.label}
                </h2>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <CurrentComponent />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}

export default function CMSStudioApp() {
  return (
    <CMSProvider>
      <CMSDashboard />
    </CMSProvider>
  )
}

// Export nommé pour l'import dans l'index
export { CMSDashboard as CMSStudio }
