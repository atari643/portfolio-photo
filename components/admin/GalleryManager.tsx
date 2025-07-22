'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence, Reorder } from 'framer-motion'
import { 
  Plus, 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  Star, 
  Eye, 
  Edit3, 
  Trash2,
  Image as ImageIcon,
  Folder,
  Settings,
  GripVertical,
  X,
  Check,
  AlertCircle,
  Copy,
  ExternalLink
} from 'lucide-react'
import { useGalleries, usePhotos } from '@/lib/cms/hooks/useCMS'

export function GalleryManager() {
  const { galleries, loading, error, createGallery, updateGallery } = useGalleries()
  const { photos } = usePhotos()
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGalleries, setSelectedGalleries] = useState<string[]>([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingGallery, setEditingGallery] = useState<any>(null)
  const [sortedGalleries, setSortedGalleries] = useState(galleries || [])

  // Mettre à jour l'ordre des galeries
  const handleReorder = useCallback(async (newOrder: any[]) => {
    setSortedGalleries(newOrder)
    
    // Sauvegarder le nouvel ordre
    try {
      for (let i = 0; i < newOrder.length; i++) {
        if (newOrder[i].order !== i) {
          await updateGallery(newOrder[i].id, { order: i })
        }
      }
    } catch (error) {
      console.error('Erreur lors de la réorganisation:', error)
    }
  }, [updateGallery])

  // Actions de lot pour les galeries sélectionnées
  const bulkActions = {
    publish: async () => {
      for (const galleryId of selectedGalleries) {
        await updateGallery(galleryId, { published: true })
      }
      setSelectedGalleries([])
    },
    unpublish: async () => {
      for (const galleryId of selectedGalleries) {
        await updateGallery(galleryId, { published: false })
      }
      setSelectedGalleries([])
    },
    delete: async () => {
      if (confirm(`Supprimer ${selectedGalleries.length} galerie(s) ?`)) {
        // API call pour supprimer
        setSelectedGalleries([])
      }
    },
    feature: async () => {
      for (const galleryId of selectedGalleries) {
        await updateGallery(galleryId, { featured: true })
      }
      setSelectedGalleries([])
    }
  }

  // Filtrage des galeries
  const filteredGalleries = (sortedGalleries.length ? sortedGalleries : galleries || [])
    .filter(gallery =>
      gallery.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gallery.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gallery.category?.toLowerCase().includes(searchTerm.toLowerCase())
    )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-slate-600">Chargement des galeries...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 text-red-600">
        <AlertCircle className="h-8 w-8 mr-3" />
        <span>{error}</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Barre d'outils */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="flex items-center space-x-4">
          <motion.button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 gradient-primary text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="h-5 w-5" />
            <span>Nouvelle Galerie</span>
          </motion.button>
        </div>

        <div className="flex items-center space-x-4">
          {/* Recherche */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Mode d'affichage */}
          <div className="flex bg-slate-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow' : ''}`}
            >
              <Grid3X3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow' : ''}`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center space-x-3">
            <Folder className="h-8 w-8 text-blue-500" />
            <div>
              <p className="text-2xl font-bold text-slate-900">{galleries?.length || 0}</p>
              <p className="text-sm text-slate-600">Galeries total</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center space-x-3">
            <Star className="h-8 w-8 text-yellow-500" />
            <div>
              <p className="text-2xl font-bold text-slate-900">
                {galleries?.filter(g => g.featured).length || 0}
              </p>
              <p className="text-sm text-slate-600">En vedette</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center space-x-3">
            <ImageIcon className="h-8 w-8 text-green-500" />
            <div>
              <p className="text-2xl font-bold text-slate-900">
                {galleries?.reduce((sum, g) => sum + (g.photos?.length || 0), 0) || 0}
              </p>
              <p className="text-sm text-slate-600">Photos total</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center space-x-3">
            <Eye className="h-8 w-8 text-purple-500" />
            <div>
              <p className="text-2xl font-bold text-slate-900">
                {galleries?.filter(g => g.published).length || 0}
              </p>
              <p className="text-sm text-slate-600">Publiées</p>
            </div>
          </div>
        </div>

        {/* Actions de lot si des galeries sont sélectionnées */}
        {selectedGalleries.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-blue-700">
                  {selectedGalleries.length} galerie(s) sélectionnée(s)
                </span>
                <button
                  onClick={() => setSelectedGalleries([])}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Désélectionner tout
                </button>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={bulkActions.publish}
                  className="flex items-center space-x-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                >
                  <Eye className="h-4 w-4" />
                  <span>Publier</span>
                </button>
                <button
                  onClick={bulkActions.feature}
                  className="flex items-center space-x-1 px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors"
                >
                  <Star className="h-4 w-4" />
                  <span>Mettre en vedette</span>
                </button>
                <button
                  onClick={bulkActions.delete}
                  className="flex items-center space-x-1 px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Supprimer</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Liste des galeries */}
      {viewMode === 'list' ? (
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <Reorder.Group 
            axis="y" 
            values={filteredGalleries} 
            onReorder={handleReorder}
            className="divide-y divide-slate-200"
          >
            {filteredGalleries.map((gallery) => (
              <Reorder.Item 
                key={gallery.id} 
                value={gallery}
                className="p-4 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="cursor-move">
                    <GripVertical className="h-5 w-5 text-slate-400" />
                  </div>
                  
                  {gallery.coverPhoto ? (
                    <img 
                      src={`/uploads/photos/${gallery.coverPhoto}`} 
                      alt={gallery.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-slate-200 rounded-lg flex items-center justify-center">
                      <Folder className="h-8 w-8 text-slate-400" />
                    </div>
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-slate-900 truncate">{gallery.title}</h4>
                      {gallery.featured && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                      {!gallery.published && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                          Brouillon
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 truncate">{gallery.description}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-slate-500">{gallery.category}</span>
                      <span className="text-xs text-slate-500">
                        {gallery.photos?.length || 0} photos
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setEditingGallery(gallery)}
                      className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      <Edit3 className="h-4 w-4 text-slate-600" />
                    </button>
                    <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                      <Copy className="h-4 w-4 text-slate-600" />
                    </button>
                    <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                      <ExternalLink className="h-4 w-4 text-slate-600" />
                    </button>
                    <button className="p-2 hover:bg-red-100 rounded-lg transition-colors">
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </button>
                  </div>
                </div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </div>
      ) : (
        <Reorder.Group 
          axis="y" 
          values={filteredGalleries} 
          onReorder={handleReorder}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredGalleries.map((gallery) => (
            <GalleryCard
              key={gallery.id}
              gallery={gallery}
              onEdit={() => setEditingGallery(gallery)}
              photos={photos}
              isSelected={selectedGalleries.includes(gallery.id)}
              onToggleSelection={() => {
                setSelectedGalleries(prev =>
                  prev.includes(gallery.id)
                    ? prev.filter(id => id !== gallery.id)
                    : [...prev, gallery.id]
                )
              }}
            />
          ))}
        </Reorder.Group>
      )}

      {/* Message si aucune galerie */}
      {filteredGalleries.length === 0 && (
        <div className="text-center py-12">
          <Folder className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">
            {searchTerm ? 'Aucun résultat' : 'Aucune galerie'}
          </h3>
          <p className="text-slate-600 mb-6">
            {searchTerm 
              ? 'Essayez de modifier vos critères de recherche'
              : 'Commencez par créer votre première galerie'
            }
          </p>
          {!searchTerm && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="gradient-primary text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
            >
              Créer votre première galerie
            </button>
          )}
        </div>
      )}

      {/* Modals */}
      {showCreateModal && (
        <CreateGalleryModal
          onClose={() => setShowCreateModal(false)}
          onCreate={createGallery}
          photos={photos}
        />
      )}

      {editingGallery && (
        <EditGalleryModal
          gallery={editingGallery}
          onClose={() => setEditingGallery(null)}
          onUpdate={updateGallery}
          photos={photos}
        />
      )}
    </div>
  )
}

// Composant carte de galerie
interface GalleryCardProps {
  gallery: any
  onEdit: () => void
  photos: any[]
  isSelected?: boolean
  onToggleSelection?: () => void
}

function GalleryCard({ gallery, onEdit, photos, isSelected = false, onToggleSelection }: GalleryCardProps) {
  const galleryPhotos = photos.filter(photo => gallery.photos?.includes(photo.id))
  const coverPhoto = galleryPhotos.find(photo => photo.id === gallery.coverPhoto) || galleryPhotos[0]

  return (
    <Reorder.Item value={gallery}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`group bg-white rounded-xl border-2 overflow-hidden hover:shadow-lg transition-all duration-300 ${
          isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-slate-200'
        }`}
      >
        {/* Checkbox de sélection */}
        {onToggleSelection && (
          <div className="absolute top-3 left-3 z-10">
            <button
              onClick={onToggleSelection}
              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                isSelected 
                  ? 'bg-blue-500 border-blue-500' 
                  : 'bg-white border-slate-300 group-hover:border-slate-400'
              }`}
            >
              {isSelected && <Check className="h-3 w-3 text-white" />}
            </button>
          </div>
        )}

        {/* Image de couverture */}
        <div className="relative aspect-video overflow-hidden">
          {coverPhoto ? (
            <img
              src={coverPhoto.url}
              alt={gallery.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-slate-200 flex items-center justify-center">
              <Folder className="h-12 w-12 text-slate-400" />
            </div>
          )}
          
          {/* Overlay avec actions */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 flex items-center space-x-2 transition-opacity duration-300">
              <button
                onClick={onEdit}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors"
              >
                <Edit3 className="h-5 w-5 text-slate-600" />
              </button>
              <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors">
                <ExternalLink className="h-5 w-5 text-slate-600" />
              </button>
            </div>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex space-x-2">
            {gallery.featured && (
              <div className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                <Star className="h-3 w-3 inline mr-1" />
                Vedette
              </div>
            )}
            {!gallery.published && (
              <div className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                Brouillon
              </div>
            )}
          </div>

          {/* Compteur de photos */}
          <div className="absolute bottom-3 right-3 bg-black bg-opacity-75 text-white px-2 py-1 rounded-full text-xs">
            {galleryPhotos.length} photos
          </div>
        </div>

        {/* Informations */}
        <div className="p-4">
          <h4 className="font-semibold text-slate-900 mb-1 truncate">{gallery.title}</h4>
          <p className="text-sm text-slate-600 mb-3 line-clamp-2">{gallery.description}</p>
          
          <div className="flex items-center justify-between">
            <span className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-full">
              {gallery.category}
            </span>
            <div className="flex items-center space-x-1">
              <button className="p-1 hover:bg-slate-100 rounded transition-colors">
                <Eye className="h-4 w-4 text-slate-500" />
              </button>
              <button className="p-1 hover:bg-slate-100 rounded transition-colors">
                <Settings className="h-4 w-4 text-slate-500" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </Reorder.Item>
  )
}

// Modal de création de galerie
function CreateGalleryModal({ onClose, onCreate, photos }: any) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Général',
    photos: [],
    featured: false,
    published: true
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      await onCreate(formData)
      onClose()
    } catch (error) {
      console.error('Erreur lors de la création:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-slate-900">Nouvelle Galerie</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Titre de la galerie
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Catégorie
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="Général">Général</option>
              <option value="Mariage">Mariage</option>
              <option value="Portrait">Portrait</option>
              <option value="Nature">Nature</option>
              <option value="Architecture">Architecture</option>
            </select>
          </div>

          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-slate-700">Mettre en vedette</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
                className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-slate-700">Publier immédiatement</span>
            </label>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Création...' : 'Créer la galerie'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

// Modal d'édition de galerie (similaire à la création)
function EditGalleryModal({ gallery, onClose, onUpdate, photos }: any) {
  // Implémentation similaire à CreateGalleryModal mais avec les données existantes
  return <CreateGalleryModal onClose={onClose} onCreate={onUpdate} photos={photos} />
}
