'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Camera,
  Layout,
  Palette,
  Settings,
  BookOpen,
  BarChart3,
  Zap,
  GitBranch
} from 'lucide-react'

// Import des composants CMS Studio
import { CMSDashboard } from '@/components/admin/CMSDashboard'
import { AdvancedPhotoManager } from '@/components/admin/AdvancedPhotoManager'
import { GalleryManager } from '@/components/admin/GalleryManager'
import { VisualCustomizer } from '@/components/admin/VisualCustomizer'
import { CMSGuide } from '@/components/admin/CMSGuide'
import { useAutoSave, SaveStatus } from '@/lib/cms/auto-save'
import { cmsToast } from '@/lib/cms/toast'

// Configuration des onglets CMS
const cmsTabsConfig = [
  {
    id: 'dashboard',
    label: 'Tableau de bord',
    icon: BarChart3,
    component: CMSDashboard,
    description: 'Vue d\'ensemble et statistiques'
  },
  {
    id: 'photos',
    label: 'Photos',
    icon: Camera,
    component: AdvancedPhotoManager,
    description: 'Gestion des photos avec upload et édition'
  },
  {
    id: 'galleries',
    label: 'Galeries',
    icon: Layout,
    component: GalleryManager,
    description: 'Création et organisation des collections'
  },
  {
    id: 'visual',
    label: 'Personnalisation',
    icon: Palette,
    component: VisualCustomizer,
    description: 'Couleurs, polices et apparence'
  },
  {
    id: 'guide',
    label: 'Guide',
    icon: BookOpen,
    component: CMSGuide,
    description: 'Documentation et aide'
  }
]

export default function CMSStudioExample() {
  const [activeTab, setActiveTab] = useState('dashboard')
  
  // Système de sauvegarde automatique
  const autoSave = useAutoSave({
    interval: 5 * 60 * 1000, // 5 minutes
    enabled: true,
    onSave: async () => {
      // Sauvegarde personnalisée si nécessaire
      await fetch('/api/cms/save-changes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `CMS Studio Update: ${new Date().toLocaleString()}`,
          timestamp: new Date().toISOString()
        })
      })
    }
  })

  const CurrentComponent = cmsTabsConfig.find(tab => tab.id === activeTab)?.component || CMSDashboard

  const handleSaveNow = () => {
    autoSave.saveNow()
    cmsToast.success('Sauvegarde manuelle effectuée')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header CMS Studio */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 backdrop-blur-md bg-white/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo et titre */}
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">CMS Studio</h1>
                <p className="text-sm text-slate-500">Gestion collaborative Git-based</p>
              </div>
            </div>

            {/* Actions et statut */}
            <div className="flex items-center space-x-6">
              {/* Statut de sauvegarde */}
              <SaveStatus 
                hasChanges={autoSave.hasChanges}
                isSaving={autoSave.isSaving}
                lastSaved={autoSave.lastSaved}
              />

              {/* Bouton sauvegarde manuelle */}
              <button
                onClick={handleSaveNow}
                disabled={!autoSave.hasChanges || autoSave.isSaving}
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
              >
                <GitBranch className="h-4 w-4" />
                <span>Sauvegarder</span>
              </button>

              {/* Indicateur Git */}
              <div className="flex items-center space-x-2 text-green-600">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm">Git actif</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar Navigation */}
          <div className="col-span-3">
            <nav className="space-y-2">
              {cmsTabsConfig.map((tab) => {
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id)
                      autoSave.markDirty() // Marquer comme modifié pour tester
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                        : 'text-slate-600 hover:bg-white hover:shadow-md'
                    }`}
                  >
                    <tab.icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                    <div className="flex-1">
                      <div className="font-medium">{tab.label}</div>
                      <div className={`text-xs ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                        {tab.description}
                      </div>
                    </div>
                  </button>
                )
              })}
            </nav>

            {/* Info Git-based */}
            <div className="mt-8 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
              <div className="flex items-center space-x-2 mb-3">
                <GitBranch className="h-5 w-5 text-green-600" />
                <h3 className="font-medium text-green-900">Git-based CMS</h3>
              </div>
              <p className="text-sm text-green-700 mb-3">
                Toutes vos modifications sont automatiquement versionnées dans Git.
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs text-green-600">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Auto-save 5min</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Versionné</span>
                </div>
              </div>
            </div>

            {/* Raccourcis */}
            <div className="mt-6 space-y-2">
              <h4 className="text-sm font-medium text-slate-900 mb-3">Actions rapides</h4>
              <button 
                onClick={() => cmsToast.success('Upload modal ouvert!')}
                className="w-full text-left p-3 rounded-lg hover:bg-white hover:shadow-sm transition-all text-sm text-slate-600 hover:text-slate-900"
              >
                📸 Ajouter des photos
              </button>
              <button 
                onClick={() => cmsToast.info('Création de galerie!')}
                className="w-full text-left p-3 rounded-lg hover:bg-white hover:shadow-sm transition-all text-sm text-slate-600 hover:text-slate-900"
              >
                🖼️ Nouvelle galerie
              </button>
              <button 
                onClick={() => cmsToast.gitSaved()}
                className="w-full text-left p-3 rounded-lg hover:bg-white hover:shadow-sm transition-all text-sm text-slate-600 hover:text-slate-900"
              >
                🎨 Personnaliser
              </button>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="col-span-9">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
            >
              <div className="p-6">
                <CurrentComponent />
              </div>
            </motion.div>

            {/* Footer avec informations système */}
            <div className="mt-6 text-center">
              <div className="inline-flex items-center space-x-4 text-sm text-slate-500">
                <span className="flex items-center space-x-1">
                  <GitBranch className="h-4 w-4" />
                  <span>Branch: main</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Zap className="h-4 w-4" />
                  <span>CMS Studio v1.0</span>
                </span>
                <span>Portfolio Photographe</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
