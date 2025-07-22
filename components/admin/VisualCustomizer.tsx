'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Palette, 
  Type, 
  Layout, 
  Brush, 
  Eye, 
  Save, 
  RotateCcw,
  Monitor,
  Smartphone,
  Tablet
} from 'lucide-react'
import { useSettings } from '@/lib/cms/hooks/useCMS'

interface ColorPalette {
  name: string
  primary: string
  secondary: string
  accent: string
  background: string
  text: string
}

const colorPalettes: ColorPalette[] = [
  {
    name: 'Élégant',
    primary: '#6366F1',
    secondary: '#8B5CF6',
    accent: '#EC4899',
    background: '#FFFFFF',
    text: '#1F2937'
  },
  {
    name: 'Nature',
    primary: '#059669',
    secondary: '#10B981',
    accent: '#F59E0B',
    background: '#F9FAFB',
    text: '#374151'
  },
  {
    name: 'Océan',
    primary: '#0EA5E9',
    secondary: '#06B6D4',
    accent: '#8B5CF6',
    background: '#F8FAFC',
    text: '#0F172A'
  },
  {
    name: 'Sunset',
    primary: '#EF4444',
    secondary: '#F97316',
    accent: '#EAB308',
    background: '#FFFBEB',
    text: '#92400E'
  },
  {
    name: 'Monochrome',
    primary: '#374151',
    secondary: '#6B7280',
    accent: '#9CA3AF',
    background: '#F9FAFB',
    text: '#111827'
  }
]

const fontOptions = [
  { name: 'Inter', value: 'Inter, sans-serif', category: 'Sans-serif' },
  { name: 'Poppins', value: 'Poppins, sans-serif', category: 'Sans-serif' },
  { name: 'Montserrat', value: 'Montserrat, sans-serif', category: 'Sans-serif' },
  { name: 'Playfair Display', value: 'Playfair Display, serif', category: 'Serif' },
  { name: 'Merriweather', value: 'Merriweather, serif', category: 'Serif' },
  { name: 'Lora', value: 'Lora, serif', category: 'Serif' },
  { name: 'Dancing Script', value: 'Dancing Script, cursive', category: 'Script' },
  { name: 'Pacifico', value: 'Pacifico, cursive', category: 'Script' }
]

export function VisualCustomizer() {
  const { settings, loading, updateSettings } = useSettings()
  const [activeTab, setActiveTab] = useState('colors')
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const [localSettings, setLocalSettings] = useState<any>(null)
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    if (settings) {
      setLocalSettings(settings)
    }
  }, [settings])

  if (loading || !localSettings) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-slate-600">Chargement des paramètres...</span>
      </div>
    )
  }

  const handleColorChange = (type: string, color: string) => {
    setLocalSettings((prev: any) => ({
      ...prev,
      [type]: color
    }))
    setHasChanges(true)
  }

  const handleFontChange = (font: string) => {
    setLocalSettings((prev: any) => ({
      ...prev,
      fontFamily: font
    }))
    setHasChanges(true)
  }

  const applyColorPalette = (palette: ColorPalette) => {
    setLocalSettings((prev: any) => ({
      ...prev,
      primaryColor: palette.primary,
      secondaryColor: palette.secondary,
      accentColor: palette.accent
    }))
    setHasChanges(true)
  }

  const saveChanges = async () => {
    try {
      await updateSettings(localSettings)
      setHasChanges(false)
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error)
    }
  }

  const tabs = [
    { id: 'colors', label: 'Couleurs', icon: Palette },
    { id: 'typography', label: 'Typographie', icon: Type },
    { id: 'layout', label: 'Mise en page', icon: Layout },
    { id: 'preview', label: 'Aperçu', icon: Eye }
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
      {/* Panel de personnalisation */}
      <div className="lg:col-span-1 space-y-6">
        {/* Header avec actions */}
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-slate-900">
            Personnalisation
          </h3>
          <div className="flex items-center space-x-2">
            {hasChanges && (
              <>
                <button
                  onClick={resetChanges}
                  className="flex items-center space-x-1 px-3 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Annuler</span>
                </button>
                <button
                  onClick={saveChanges}
                  className="flex items-center space-x-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Save className="h-4 w-4" />
                  <span>Sauvegarder</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Onglets */}
        <div className="border-b border-slate-200">
          <nav className="flex space-x-4">
            {tabs.map(tab => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Contenu des onglets */}
        <div className="space-y-6">
          {activeTab === 'colors' && (
            <div className="space-y-6">
              {/* Palettes prédéfinies */}
              <div>
                <h4 className="font-medium text-slate-900 mb-3">Palettes prédéfinies</h4>
                <div className="grid grid-cols-1 gap-3">
                  {colorPalettes.map(palette => (
                    <motion.button
                      key={palette.name}
                      onClick={() => applyColorPalette(palette)}
                      className="flex items-center space-x-3 p-3 border border-slate-200 rounded-lg hover:border-slate-300 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex space-x-1">
                        <div
                          className="w-6 h-6 rounded"
                          style={{ backgroundColor: palette.primary }}
                        />
                        <div
                          className="w-6 h-6 rounded"
                          style={{ backgroundColor: palette.secondary }}
                        />
                        <div
                          className="w-6 h-6 rounded"
                          style={{ backgroundColor: palette.accent }}
                        />
                      </div>
                      <span className="font-medium text-slate-900">{palette.name}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Couleurs personnalisées */}
              <div>
                <h4 className="font-medium text-slate-900 mb-3">Personnalisation</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Couleur principale
                    </label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={localSettings.primaryColor}
                        onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                        className="w-12 h-12 rounded border border-slate-300"
                      />
                      <input
                        type="text"
                        value={localSettings.primaryColor}
                        onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                        className="flex-1 px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Couleur secondaire
                    </label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={localSettings.secondaryColor}
                        onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                        className="w-12 h-12 rounded border border-slate-300"
                      />
                      <input
                        type="text"
                        value={localSettings.secondaryColor}
                        onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                        className="flex-1 px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Couleur d'accent
                    </label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={localSettings.accentColor}
                        onChange={(e) => handleColorChange('accentColor', e.target.value)}
                        className="w-12 h-12 rounded border border-slate-300"
                      />
                      <input
                        type="text"
                        value={localSettings.accentColor}
                        onChange={(e) => handleColorChange('accentColor', e.target.value)}
                        className="flex-1 px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'typography' && (
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-slate-900 mb-3">Police de caractères</h4>
                <select
                  value={localSettings.fontFamily}
                  onChange={(e) => handleFontChange(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
                  style={{ fontFamily: localSettings.fontFamily }}
                >
                  {fontOptions.map(font => (
                    <option key={font.value} value={font.value} style={{ fontFamily: font.value }}>
                      {font.name} ({font.category})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <h4 className="font-medium text-slate-900 mb-3">Aperçu du texte</h4>
                <div
                  className="p-4 border border-slate-200 rounded-lg"
                  style={{ 
                    fontFamily: localSettings.fontFamily,
                    color: localSettings.primaryColor 
                  }}
                >
                  <h1 className="text-2xl font-bold mb-2">Titre principal</h1>
                  <h2 className="text-lg font-semibold mb-2">Sous-titre</h2>
                  <p className="text-base">
                    Ceci est un exemple de paragraphe pour voir le rendu de la police 
                    sélectionnée dans votre portfolio.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'layout' && (
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-slate-900 mb-3">Options de galerie</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Photos par page
                    </label>
                    <select
                      value={localSettings.gallerySettings?.itemsPerPage || 12}
                      onChange={(e) => setLocalSettings((prev: any) => ({
                        ...prev,
                        gallerySettings: {
                          ...prev.gallerySettings,
                          itemsPerPage: parseInt(e.target.value)
                        }
                      }))}
                      className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
                    >
                      <option value={8}>8 photos</option>
                      <option value={12}>12 photos</option>
                      <option value={16}>16 photos</option>
                      <option value={24}>24 photos</option>
                    </select>
                  </div>

                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="showMetadata"
                      checked={localSettings.gallerySettings?.showMetadata || false}
                      onChange={(e) => setLocalSettings((prev: any) => ({
                        ...prev,
                        gallerySettings: {
                          ...prev.gallerySettings,
                          showMetadata: e.target.checked
                        }
                      }))}
                      className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="showMetadata" className="text-sm font-medium text-slate-700">
                      Afficher les métadonnées des photos
                    </label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="enableLightbox"
                      checked={localSettings.gallerySettings?.enableLightbox || false}
                      onChange={(e) => setLocalSettings((prev: any) => ({
                        ...prev,
                        gallerySettings: {
                          ...prev.gallerySettings,
                          enableLightbox: e.target.checked
                        }
                      }))}
                      className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="enableLightbox" className="text-sm font-medium text-slate-700">
                      Activer la lightbox
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Aperçu en temps réel */}
      <div className="lg:col-span-2">
        {/* Contrôles de l'aperçu */}
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium text-slate-900">Aperçu en temps réel</h4>
          <div className="flex items-center space-x-2 bg-slate-100 rounded-lg p-1">
            <button
              onClick={() => setPreviewMode('desktop')}
              className={`p-2 rounded ${previewMode === 'desktop' ? 'bg-white shadow' : ''}`}
            >
              <Monitor className="h-4 w-4" />
            </button>
            <button
              onClick={() => setPreviewMode('tablet')}
              className={`p-2 rounded ${previewMode === 'tablet' ? 'bg-white shadow' : ''}`}
            >
              <Tablet className="h-4 w-4" />
            </button>
            <button
              onClick={() => setPreviewMode('mobile')}
              className={`p-2 rounded ${previewMode === 'mobile' ? 'bg-white shadow' : ''}`}
            >
              <Smartphone className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Aperçu */}
        <div
          className={`mx-auto bg-white border border-slate-300 rounded-lg overflow-hidden transition-all duration-300 ${
            previewMode === 'mobile' ? 'max-w-sm' :
            previewMode === 'tablet' ? 'max-w-2xl' : 'max-w-full'
          }`}
          style={{
            fontFamily: localSettings.fontFamily,
            '--primary': localSettings.primaryColor,
            '--secondary': localSettings.secondaryColor,
            '--accent': localSettings.accentColor
          } as any}
        >
          {/* Header du site */}
          <div className="p-6 border-b border-slate-200">
            <h1 
              className="text-2xl font-bold mb-2"
              style={{ color: localSettings.primaryColor }}
            >
              {localSettings.siteName}
            </h1>
            <p 
              className="text-lg"
              style={{ color: localSettings.secondaryColor }}
            >
              {localSettings.tagline}
            </p>
          </div>

          {/* Contenu d'exemple */}
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div
                  key={i}
                  className="aspect-square bg-slate-200 rounded-lg flex items-center justify-center"
                >
                  <span className="text-slate-500">Photo {i}</span>
                </div>
              ))}
            </div>

            <button
              className="px-6 py-3 rounded-lg text-white font-medium transition-colors"
              style={{ backgroundColor: localSettings.primaryColor }}
            >
              Bouton d'action
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
