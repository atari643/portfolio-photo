'use client'

import { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Upload, 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  Star, 
  Eye, 
  Edit3, 
  Trash2, 
  Download,
  Tag,
  Calendar,
  ArrowUpDown,
  Settings,
  X,
  Check,
  AlertCircle,
  Image as ImageIcon
} from 'lucide-react'
import { usePhotos, useCategories } from '@/lib/cms/hooks/useCMS'
import { PhotoUpload } from './PhotoUpload'
import { PhotoEditor } from './PhotoEditor'

interface PhotoManagerProps {
  onPhotoSelect?: (photos: string[]) => void
  multiSelect?: boolean
  maxSelection?: number
}

export function AdvancedPhotoManager({ 
  onPhotoSelect, 
  multiSelect = false, 
  maxSelection 
}: PhotoManagerProps) {
  const { photos, loading, error, uploadPhotos, refetch, updatePhoto } = usePhotos()
  const { categories } = useCategories()
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'views' | 'featured'>('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [showUpload, setShowUpload] = useState(false)
  const [editingPhoto, setEditingPhoto] = useState<any>(null)
  
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Filtrage et tri des photos
  const filteredAndSortedPhotos = photos
    .filter(photo => {
      const matchesSearch = photo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          photo.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          photo.tags?.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesCategory = selectedCategory === 'all' || photo.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      let comparison = 0
      switch (sortBy) {
        case 'title':
          comparison = a.title.localeCompare(b.title)
          break
        case 'views':
          comparison = (a.views || 0) - (b.views || 0)
          break
        case 'featured':
          comparison = (a.featured ? 1 : 0) - (b.featured ? 1 : 0)
          break
        case 'date':
        default:
          comparison = new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime()
      }
      return sortOrder === 'asc' ? comparison : -comparison
    })

  // Gestion de la sélection multiple
  const handlePhotoSelect = useCallback((photoId: string) => {
    if (!multiSelect) {
      setSelectedPhotos([photoId])
      onPhotoSelect?.([photoId])
      return
    }

    setSelectedPhotos(prev => {
      const isSelected = prev.includes(photoId)
      let newSelection: string[]

      if (isSelected) {
        newSelection = prev.filter(id => id !== photoId)
      } else {
        if (maxSelection && prev.length >= maxSelection) {
          return prev // Ne pas dépasser la limite
        }
        newSelection = [...prev, photoId]
      }

      onPhotoSelect?.(newSelection)
      return newSelection
    })
  }, [multiSelect, maxSelection, onPhotoSelect])

  // Gestion de l'upload par glisser-déposer
  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    if (files.length > 0) {
      try {
        await uploadPhotos(files)
      } catch (error) {
        console.error('Erreur upload:', error)
      }
    }
  }, [uploadPhotos])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
  }, [])

  // Actions en lot
  const handleBulkAction = async (action: string) => {
    if (selectedPhotos.length === 0) return

    switch (action) {
      case 'feature':
        // Mettre en avant les photos sélectionnées
        console.log('Mettre en avant:', selectedPhotos)
        break
      case 'unfeature':
        // Retirer la mise en avant
        console.log('Retirer mise en avant:', selectedPhotos)
        break
      case 'delete':
        // Supprimer les photos sélectionnées
        if (confirm(`Supprimer ${selectedPhotos.length} photo(s) ?`)) {
          console.log('Supprimer:', selectedPhotos)
        }
        break
      case 'download':
        // Télécharger les photos sélectionnées
        console.log('Télécharger:', selectedPhotos)
        break
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-slate-600">Chargement des photos...</span>
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
      {/* Barre d'outils supérieure */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="flex items-center space-x-4">
          <motion.button
            onClick={() => setShowUpload(!showUpload)}
            className="flex items-center space-x-2 gradient-primary text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Upload className="h-5 w-5" />
            <span>Ajouter Photos</span>
          </motion.button>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files && uploadPhotos(e.target.files)}
          />
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

          {/* Filtre par catégorie */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Toutes catégories</option>
            {categories.map(category => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>

          {/* Tri */}
          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [field, order] = e.target.value.split('-')
              setSortBy(field as any)
              setSortOrder(order as any)
            }}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="date-desc">Plus récent</option>
            <option value="date-asc">Plus ancien</option>
            <option value="title-asc">Titre A-Z</option>
            <option value="title-desc">Titre Z-A</option>
            <option value="views-desc">Plus vues</option>
            <option value="featured-desc">En vedette</option>
          </select>

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

      {/* Zone d'upload conditionnelle */}
      <AnimatePresence>
        {showUpload && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <PhotoUpload
              onUploadComplete={(files) => {
                console.log('Upload terminé:', files)
                refetch()
                setShowUpload(false)
              }}
              multiple={true}
              maxFiles={20}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actions en lot */}
      {selectedPhotos.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg p-4"
        >
          <span className="text-blue-800 font-medium">
            {selectedPhotos.length} photo(s) sélectionnée(s)
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleBulkAction('feature')}
              className="flex items-center space-x-1 px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
            >
              <Star className="h-4 w-4" />
              <span>Mettre en avant</span>
            </button>
            <button
              onClick={() => handleBulkAction('download')}
              className="flex items-center space-x-1 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Télécharger</span>
            </button>
            <button
              onClick={() => handleBulkAction('delete')}
              className="flex items-center space-x-1 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
              <span>Supprimer</span>
            </button>
            <button
              onClick={() => setSelectedPhotos([])}
              className="p-1 hover:bg-slate-200 rounded"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center space-x-3">
            <ImageIcon className="h-8 w-8 text-blue-500" />
            <div>
              <p className="text-2xl font-bold text-slate-900">{photos.length}</p>
              <p className="text-sm text-slate-600">Photos total</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center space-x-3">
            <Star className="h-8 w-8 text-yellow-500" />
            <div>
              <p className="text-2xl font-bold text-slate-900">
                {photos.filter(p => p.featured).length}
              </p>
              <p className="text-sm text-slate-600">En vedette</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center space-x-3">
            <Eye className="h-8 w-8 text-green-500" />
            <div>
              <p className="text-2xl font-bold text-slate-900">
                {photos.reduce((sum, p) => sum + (p.views || 0), 0)}
              </p>
              <p className="text-sm text-slate-600">Vues total</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center space-x-3">
            <Upload className="h-8 w-8 text-purple-500" />
            <div>
              <p className="text-2xl font-bold text-slate-900">
                {photos.filter(p => {
                  const uploadDate = new Date(p.uploadedAt)
                  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                  return uploadDate > weekAgo
                }).length}
              </p>
              <p className="text-sm text-slate-600">Cette semaine</p>
            </div>
          </div>
        </div>
      </div>

      {/* Grille ou liste des photos */}
      <div
        className={`
          ${viewMode === 'grid' 
            ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4' 
            : 'space-y-4'
          }
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {filteredAndSortedPhotos.map((photo, index) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            viewMode={viewMode}
            isSelected={selectedPhotos.includes(photo.id)}
            onSelect={() => handlePhotoSelect(photo.id)}
            onEdit={() => setEditingPhoto(photo)}
            multiSelect={multiSelect}
          />
        ))}
      </div>

      {/* Message si aucune photo */}
      {filteredAndSortedPhotos.length === 0 && (
        <div className="text-center py-12">
          <ImageIcon className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">
            {searchTerm || selectedCategory !== 'all' ? 'Aucun résultat' : 'Aucune photo'}
          </h3>
          <p className="text-slate-600 mb-6">
            {searchTerm || selectedCategory !== 'all' 
              ? 'Essayez de modifier vos critères de recherche'
              : 'Commencez par ajouter quelques photos à votre portfolio'
            }
          </p>
          {!searchTerm && selectedCategory === 'all' && (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="gradient-primary text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
            >
              Ajouter votre première photo
            </button>
          )}
        </div>
      )}

      {/* Éditeur de photo */}
      <AnimatePresence>
        {editingPhoto && (
          <PhotoEditor
            photo={editingPhoto}
            isOpen={true}
            onClose={() => setEditingPhoto(null)}
            onSave={async (updatedPhoto) => {
              try {
                await updatePhoto(editingPhoto.id, updatedPhoto)
                await refetch()
                setEditingPhoto(null)
              } catch (error) {
                console.error('Erreur lors de la mise à jour:', error)
              }
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

// Composant pour chaque carte de photo
interface PhotoCardProps {
  photo: any
  viewMode: 'grid' | 'list'
  isSelected: boolean
  onSelect: () => void
  onEdit: () => void
  multiSelect: boolean
}

function PhotoCard({ photo, viewMode, isSelected, onSelect, onEdit, multiSelect }: PhotoCardProps) {
  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`flex items-center space-x-4 p-4 bg-white rounded-lg border-2 transition-all duration-200 ${
          isSelected ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-slate-300'
        }`}
      >
        {multiSelect && (
          <button
            onClick={onSelect}
            className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
              isSelected ? 'bg-blue-500 border-blue-500' : 'border-slate-300'
            }`}
          >
            {isSelected && <Check className="h-4 w-4 text-white" />}
          </button>
        )}
        
        <img
          src={photo.url}
          alt={photo.title}
          className="w-16 h-16 object-cover rounded-lg"
        />
        
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-slate-900 truncate">{photo.title}</h4>
          <p className="text-sm text-slate-600 truncate">{photo.description}</p>
          <div className="flex items-center space-x-4 mt-1">
            <span className="text-xs text-slate-500">{photo.category}</span>
            <span className="text-xs text-slate-500">{photo.views || 0} vues</span>
            {photo.featured && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={onEdit}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Edit3 className="h-4 w-4 text-slate-600" />
          </button>
          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <Eye className="h-4 w-4 text-slate-600" />
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`group relative aspect-square overflow-hidden rounded-lg border-2 transition-all duration-200 ${
        isSelected ? 'border-blue-500 ring-2 ring-blue-500 ring-opacity-50' : 'border-transparent'
      }`}
    >
      <img
        src={photo.url}
        alt={photo.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        onClick={!multiSelect ? onSelect : undefined}
      />
      
      {/* Overlay avec actions */}
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
        <div className="opacity-0 group-hover:opacity-100 flex items-center space-x-2 transition-opacity duration-300">
          {multiSelect && (
            <button
              onClick={onSelect}
              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                isSelected ? 'bg-blue-500 border-blue-500' : 'bg-white border-white'
              }`}
            >
              {isSelected && <Check className="h-5 w-5 text-white" />}
            </button>
          )}
          <button
            onClick={onEdit}
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors"
          >
            <Edit3 className="h-4 w-4 text-slate-600" />
          </button>
          <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors">
            <Eye className="h-4 w-4 text-slate-600" />
          </button>
        </div>
      </div>

      {/* Badges */}
      <div className="absolute top-2 left-2 flex space-x-1">
        {photo.featured && (
          <div className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            <Star className="h-3 w-3 inline mr-1" />
            Vedette
          </div>
        )}
      </div>

      {/* Informations */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
        <h4 className="text-white font-medium text-sm truncate">{photo.title}</h4>
        <div className="flex items-center justify-between text-xs text-white/80 mt-1">
          <span>{photo.category}</span>
          <span>{photo.views || 0} vues</span>
        </div>
      </div>
    </motion.div>
  )
}
