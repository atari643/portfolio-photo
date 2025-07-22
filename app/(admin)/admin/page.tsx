'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Upload, 
  Image as ImageIcon, 
  Folder, 
  Settings, 
  BarChart3, 
  Users,
  Camera,
  Eye,
  Palette,
  Plus,
  FileImage,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

interface AdminStats {
  totalPhotos: number
  totalViews: number
  totalClients: number
  recentUploads: number
}

const adminStats: AdminStats = {
  totalPhotos: 247,
  totalViews: 12350,
  totalClients: 45,
  recentUploads: 8
}

export default function AdminPage() {
  const [selectedTab, setSelectedTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: BarChart3 },
    { id: 'photos', label: 'Gérer Photos', icon: ImageIcon },
    { id: 'galleries', label: 'Galeries', icon: Folder },
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'settings', label: 'Paramètres', icon: Settings }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
                            <h1 className="text-3xl font-bold gradient-text-rainbow">
                Gestion du Portfolio
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                Gérez votre portfolio en toute simplicité
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="gradient-primary text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Upload className="h-5 w-5 inline-block mr-2" />
              Upload Photo
            </motion.button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                      selectedTab === tab.id
                        ? 'gradient-primary text-white shadow-lg'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-800/50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                  </motion.button>
                )
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {selectedTab === 'overview' && <OverviewSection stats={adminStats} />}
            {selectedTab === 'photos' && <PhotoManagementSection />}
            {selectedTab === 'galleries' && <GalleryManagementSection />}
            {selectedTab === 'clients' && <ClientManagementSection />}
            {selectedTab === 'settings' && <SettingsSection />}
          </div>
        </div>
      </div>
    </div>
  )
}

// Composant Vue d'ensemble
function OverviewSection({ stats }: { stats: AdminStats }) {
  const statCards = [
    { label: 'Photos Total', value: stats.totalPhotos, icon: ImageIcon, color: 'from-blue-500 to-cyan-500' },
    { label: 'Vues Total', value: stats.totalViews, icon: BarChart3, color: 'from-emerald-500 to-teal-500' },
    { label: 'Clients', value: stats.totalClients, icon: Users, color: 'from-violet-500 to-purple-500' },
    { label: 'Récemment ajoutées', value: stats.recentUploads, icon: Upload, color: 'from-orange-500 to-red-500' }
  ]

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-2xl p-6 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">
                    {stat.value.toLocaleString()}
                  </p>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-xl font-semibold mb-6 text-slate-900 dark:text-white">
          Actions Rapides
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            className="flex items-center space-x-3 p-4 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
          >
            <Upload className="h-8 w-8 text-blue-500" />
            <div className="text-left">
              <p className="font-medium text-slate-900 dark:text-white">Upload Photos</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Ajouter de nouvelles images</p>
            </div>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            className="flex items-center space-x-3 p-4 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-emerald-500 dark:hover:border-emerald-400 transition-colors"
          >
            <Folder className="h-8 w-8 text-emerald-500" />
            <div className="text-left">
              <p className="font-medium text-slate-900 dark:text-white">Nouvelle Galerie</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Créer une collection</p>
            </div>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            className="flex items-center space-x-3 p-4 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-violet-500 dark:hover:border-violet-400 transition-colors"
          >
            <Settings className="h-8 w-8 text-violet-500" />
            <div className="text-left">
              <p className="font-medium text-slate-900 dark:text-white">Paramètres</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Configurer le site</p>
            </div>
          </motion.button>
        </div>
      </div>
    </div>
  )
}

// Autres sections (placeholder pour maintenant)
function PhotoManagementSection() {
  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="text-xl font-semibold mb-4">Gestion des Photos</h3>
      <p className="text-slate-600 dark:text-slate-400">Interface de gestion des photos à implémenter...</p>
    </div>
  )
}

function GalleryManagementSection() {
  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="text-xl font-semibold mb-4">Gestion des Galeries</h3>
      <p className="text-slate-600 dark:text-slate-400">Interface de gestion des galeries à implémenter...</p>
    </div>
  )
}

function ClientManagementSection() {
  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="text-xl font-semibold mb-4">Gestion des Clients</h3>
      <p className="text-slate-600 dark:text-slate-400">Interface de gestion des clients à implémenter...</p>
    </div>
  )
}

function SettingsSection() {
  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="text-xl font-semibold mb-4">Paramètres</h3>
      <p className="text-slate-600 dark:text-slate-400">Interface de paramètres à implémenter...</p>
    </div>
  )
}
