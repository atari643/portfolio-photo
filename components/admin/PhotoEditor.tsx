'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  X, 
  Save, 
  Star, 
  Eye, 
  Tag, 
  MapPin, 
  Calendar, 
  Camera, 
  Settings,
  Hash,
  FileText,
  Palette,
  Globe,
  Lock,
  Image as ImageIcon
} from 'lucide-react'
import { useCategories } from '@/lib/cms/hooks/useCMS'
import { Photo } from '@/lib/cms/types'

interface PhotoEditorProps {
  photo: Photo
  isOpen: boolean
  onClose: () => void
  onSave: (updatedPhoto: Photo) => void
}

export function PhotoEditor({ photo, isOpen, onClose, onSave }: PhotoEditorProps) {
  const { categories } = useCategories()
  const [formData, setFormData] = useState<Photo>(photo)
  const [activeTab, setActiveTab] = useState('basic')
  const [newTag, setNewTag] = useState('')
  const [newKeyword, setNewKeyword] = useState('')

  useEffect(() => {
    setFormData(photo)
  }, [photo])

  const handleSave = () => {
    onSave(formData)
    onClose()
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }))
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const addKeyword = () => {
    if (newKeyword.trim() && !formData.keywords?.includes(newKeyword.trim())) {
      setFormData(prev => ({
        ...prev,
        keywords: [...(prev.keywords || []), newKeyword.trim()]
      }))
      setNewKeyword('')
    }
  }

  const removeKeyword = (keywordToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      keywords: prev.keywords?.filter(keyword => keyword !== keywordToRemove) || []
    }))
  }

  const tabs = [
    { id: 'basic', label: 'Informations de base', icon: FileText },
    { id: 'technical', label: 'Données techniques', icon: Camera },
    { id: 'portfolio', label: 'Portfolio', icon: Star },
    { id: 'seo', label: 'SEO & Référencement', icon: Globe },
    { id: 'advanced', label: 'Avancé', icon: Settings }
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-slate-100 rounded-lg overflow-hidden">
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Éditer la photo</h2>
              <p className="text-sm text-slate-500">{photo.filename}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save className="h-4 w-4" />
              <span>Sauvegarder</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex h-[calc(90vh-100px)]">
          {/* Sidebar avec onglets */}
          <div className="w-64 bg-slate-50 border-r border-slate-200 p-4">
            <nav className="space-y-2">
              {tabs.map(tab => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{tab.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Contenu principal */}
          <div className="flex-1 p-6 overflow-y-auto">
            {activeTab === 'basic' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-900">Informations de base</h3>
                
                {/* Titre */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Titre de la photo *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ex: Portrait au coucher de soleil"
                  />
                </div>

                {/* Sous-titre */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Sous-titre
                  </label>
                  <input
                    type="text"
                    value={formData.subtitle || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ex: Séance engagement Sarah & Tom"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Décrivez cette photo, l'histoire derrière, l'émotion captée..."
                  />
                </div>

                {/* Catégorie */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Catégorie *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Non catégorisé">Non catégorisé</option>
                    {categories?.map(category => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Tags
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {formData.tags.map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        <span>{tag}</span>
                        <button
                          onClick={() => removeTag(tag)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addTag()}
                      className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Ajouter un tag..."
                    />
                    <button
                      onClick={addTag}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Ajouter
                    </button>
                  </div>
                </div>

                {/* Statuts */}
                <div className="grid grid-cols-2 gap-4">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-slate-700">Photo en vedette</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.published}
                      onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-slate-700">Publié</span>
                  </label>
                </div>
              </div>
            )}

            {activeTab === 'technical' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-900">Données techniques</h3>
                
                {/* Lieu */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <MapPin className="h-4 w-4 inline mr-1" />
                    Lieu de prise de vue
                  </label>
                  <input
                    type="text"
                    value={formData.location || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ex: Paris, France"
                  />
                </div>

                {/* Date de prise */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <Calendar className="h-4 w-4 inline mr-1" />
                    Date de prise de vue
                  </label>
                  <input
                    type="date"
                    value={formData.dateTaken || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, dateTaken: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Équipement */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Appareil photo
                    </label>
                    <input
                      type="text"
                      value={formData.camera || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, camera: e.target.value }))}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Ex: Canon EOS R5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Objectif
                    </label>
                    <input
                      type="text"
                      value={formData.lens || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, lens: e.target.value }))}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Ex: 85mm f/1.4"
                    />
                  </div>
                </div>

                {/* Paramètres de prise de vue */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">
                    Paramètres de prise de vue
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">Ouverture</label>
                      <input
                        type="text"
                        value={formData.settings?.aperture || ''}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          settings: { ...prev.settings, aperture: e.target.value }
                        }))}
                        className="w-full px-2 py-1 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-blue-500"
                        placeholder="f/2.8"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">Vitesse</label>
                      <input
                        type="text"
                        value={formData.settings?.shutter || ''}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          settings: { ...prev.settings, shutter: e.target.value }
                        }))}
                        className="w-full px-2 py-1 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-blue-500"
                        placeholder="1/125s"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">ISO</label>
                      <input
                        type="text"
                        value={formData.settings?.iso || ''}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          settings: { ...prev.settings, iso: e.target.value }
                        }))}
                        className="w-full px-2 py-1 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-blue-500"
                        placeholder="800"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">Focale</label>
                      <input
                        type="text"
                        value={formData.settings?.focalLength || ''}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          settings: { ...prev.settings, focalLength: e.target.value }
                        }))}
                        className="w-full px-2 py-1 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-blue-500"
                        placeholder="85mm"
                      />
                    </div>
                  </div>
                </div>

                {/* Notes techniques */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Notes techniques
                  </label>
                  <textarea
                    value={formData.technicalNotes || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, technicalNotes: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Conditions de lumière, techniques utilisées, post-traitement..."
                  />
                </div>
              </div>
            )}

            {activeTab === 'portfolio' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-900">Informations portfolio</h3>
                
                {/* Client/Projet */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Client
                    </label>
                    <input
                      type="text"
                      value={formData.client || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, client: e.target.value }))}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Nom du client"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Projet
                    </label>
                    <input
                      type="text"
                      value={formData.project || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, project: e.target.value }))}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Nom du projet"
                    />
                  </div>
                </div>

                {/* Ambiance */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Ambiance / Mood
                  </label>
                  <select
                    value={formData.mood || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, mood: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Sélectionner une ambiance</option>
                    <option value="romantic">Romantique</option>
                    <option value="dramatic">Dramatique</option>
                    <option value="natural">Naturel</option>
                    <option value="elegant">Élégant</option>
                    <option value="vintage">Vintage</option>
                    <option value="modern">Moderne</option>
                    <option value="artistic">Artistique</option>
                    <option value="joyful">Joyeux</option>
                    <option value="intimate">Intime</option>
                    <option value="bold">Audacieux</option>
                  </select>
                </div>

                {/* Note/Évaluation */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Évaluation personnelle
                  </label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                        className={`p-1 ${
                          (formData.rating || 0) >= star 
                            ? 'text-yellow-500' 
                            : 'text-slate-300'
                        }`}
                      >
                        <Star className="h-5 w-5 fill-current" />
                      </button>
                    ))}
                    <span className="text-sm text-slate-600 ml-3">
                      {formData.rating ? `${formData.rating}/5` : 'Non évalué'}
                    </span>
                  </div>
                </div>

                {/* Prix */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Prix (optionnel)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={formData.price || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) || undefined }))}
                      className="w-full px-3 py-2 pl-8 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0"
                      min="0"
                      step="0.01"
                    />
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">€</span>
                  </div>
                </div>

                {/* Licence */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Type de licence
                  </label>
                  <select
                    value={formData.license || 'personal'}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      license: e.target.value as 'personal' | 'commercial' | 'editorial' | 'royalty-free'
                    }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="personal">Usage personnel</option>
                    <option value="commercial">Usage commercial</option>
                    <option value="editorial">Éditorial</option>
                    <option value="royalty-free">Libre de droits</option>
                  </select>
                </div>
              </div>
            )}

            {activeTab === 'seo' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-900">SEO & Référencement</h3>
                
                {/* Alt text SEO */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Texte alternatif (Alt)
                  </label>
                  <input
                    type="text"
                    value={formData.seoAlt || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, seoAlt: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Description pour les lecteurs d'écran et le SEO"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Important pour l'accessibilité et le référencement
                  </p>
                </div>

                {/* Description réseaux sociaux */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Description pour les réseaux sociaux
                  </label>
                  <textarea
                    value={formData.socialDescription || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, socialDescription: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Description optimisée pour Facebook, Instagram, Twitter..."
                  />
                </div>

                {/* Mots-clés SEO */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Mots-clés SEO
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {formData.keywords?.map(keyword => (
                      <span
                        key={keyword}
                        className="inline-flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                      >
                        <Hash className="h-3 w-3" />
                        <span>{keyword}</span>
                        <button
                          onClick={() => removeKeyword(keyword)}
                          className="text-green-600 hover:text-green-800"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newKeyword}
                      onChange={(e) => setNewKeyword(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
                      className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Ajouter un mot-clé SEO..."
                    />
                    <button
                      onClick={addKeyword}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Ajouter
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'advanced' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-900">Paramètres avancés</h3>
                
                {/* Visibilité */}
                <div>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.isPrivate || false}
                      onChange={(e) => setFormData(prev => ({ ...prev, isPrivate: e.target.checked }))}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <div>
                      <span className="text-sm font-medium text-slate-700">Photo privée</span>
                      <p className="text-xs text-slate-500">
                        Ne sera visible que dans l'administration
                      </p>
                    </div>
                  </label>
                </div>

                {/* Informations système */}
                <div className="bg-slate-50 rounded-lg p-4 space-y-3">
                  <h4 className="font-medium text-slate-900">Informations système</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-500">ID:</span>
                      <span className="ml-2 font-mono">{formData.id}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Taille:</span>
                      <span className="ml-2">{Math.round(formData.size / 1024)} KB</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Format:</span>
                      <span className="ml-2">{formData.type}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Vues:</span>
                      <span className="ml-2">{formData.views}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-slate-500">Uploadé le:</span>
                      <span className="ml-2">
                        {new Date(formData.uploadedAt).toLocaleDateString('fr-FR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
