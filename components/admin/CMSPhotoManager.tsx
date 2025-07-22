'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Upload, 
  X, 
  Image as ImageIcon, 
  Plus,
  Camera,
  Tags,
  Eye,
  Trash2,
  Edit3,
  Star,
  ChevronRight,
  Filter,
  Search,
  Grid3X3,
  List,
  MoreHorizontal
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useCMS } from '@/lib/cms/context'
import toast from 'react-hot-toast'

interface CMSPhotoUploadProps {
  onUpload?: (photos: any[]) => void
}

export function CMSPhotoUpload({ onUpload }: CMSPhotoUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { uploadPhoto } = useCMS()

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/')
    )
    
    if (files.length > 0) {
      handleFiles(files)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      handleFiles(files)
    }
  }

  const handleFiles = async (files: File[]) => {
    setIsUploading(true)
    const uploadedPhotos = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      setUploadProgress((i / files.length) * 100)

      try {
        await uploadPhoto(file, {
          title: file.name.replace(/\.[^/.]+$/, ""),
          description: '',
          tags: [],
          gallery: 'default',
          featured: false,
          order: 0,
          alt: ''
        })

        uploadedPhotos.push(file)
      } catch (error) {
        console.error('Erreur upload:', error)
      }
    }

    setUploadProgress(100)
    toast.success(`${uploadedPhotos.length} photo(s) uploadée(s)`)
    onUpload?.(uploadedPhotos)
    
    setTimeout(() => {
      setIsUploading(false)
      setUploadProgress(0)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      {/* Zone de drop */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`
          relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200
          ${isDragging 
            ? 'border-purple-500 bg-purple-50 scale-102' 
            : 'border-gray-300 hover:border-purple-400 hover:bg-gray-50'
          }
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        <motion.div
          animate={{ scale: isDragging ? 1.1 : 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Glissez vos photos ici
          </h3>
          <p className="text-gray-500 mb-4">
            ou cliquez pour sélectionner des fichiers
          </p>
          <div className="text-xs text-gray-400">
            Formats acceptés : JPG, PNG, WebP • Taille max : 10MB par fichier
          </div>
        </motion.div>

        {/* Barre de progression */}
        {isUploading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center"
          >
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <div className="text-lg font-medium text-gray-900 mb-2">
                Upload en cours...
              </div>
              <div className="w-32 h-2 bg-gray-200 rounded-full mx-auto">
                <motion.div
                  className="h-full bg-purple-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${uploadProgress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="text-sm text-gray-500 mt-2">
                {Math.round(uploadProgress)}%
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export function CMSPhotoManager() {
  const { data, updatePhoto, deletePhoto, reorderPhotos } = useCMS()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [filterGallery, setFilterGallery] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPhotos, setSelectedPhotos] = useState<Set<string>>(new Set())
  const [editingPhoto, setEditingPhoto] = useState<string | null>(null)

  const filteredPhotos = data.photos.filter(photo => {
    const matchesSearch = photo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         photo.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesGallery = filterGallery === 'all' || photo.gallery === filterGallery
    return matchesSearch && matchesGallery
  })

  const galleries = ['all', ...new Set(data.photos.map(p => p.gallery))]

  const handleToggleFeatured = async (photoId: string, featured: boolean) => {
    try {
      await updatePhoto(photoId, { featured })
    } catch (error) {
      console.error('Erreur:', error)
    }
  }

  const handleDeletePhoto = async (photoId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette photo ?')) {
      try {
        await deletePhoto(photoId)
        setSelectedPhotos(prev => {
          const newSet = new Set(prev)
          newSet.delete(photoId)
          return newSet
        })
      } catch (error) {
        console.error('Erreur:', error)
      }
    }
  }

  const handleBulkAction = async (action: string) => {
    const photoIds = Array.from(selectedPhotos)
    
    switch (action) {
      case 'delete':
        if (confirm(`Supprimer ${photoIds.length} photo(s) sélectionnée(s) ?`)) {
          for (const id of photoIds) {
            await deletePhoto(id)
          }
          setSelectedPhotos(new Set())
        }
        break
      case 'feature':
        for (const id of photoIds) {
          await updatePhoto(id, { featured: true })
        }
        break
      case 'unfeature':
        for (const id of photoIds) {
          await updatePhoto(id, { featured: false })
        }
        break
    }
  }

  return (
    <div className="space-y-6">
      {/* Header avec actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestionnaire de Photos</h2>
          <p className="text-gray-600">{data.photos.length} photo(s) au total</p>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          >
            {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid3X3 className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Zone d'upload */}
      <CMSPhotoUpload />

      {/* Filtres et recherche */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Rechercher par titre ou tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <select
          value={filterGallery}
          onChange={(e) => setFilterGallery(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          {galleries.map(gallery => (
            <option key={gallery} value={gallery}>
              {gallery === 'all' ? 'Toutes les galeries' : gallery}
            </option>
          ))}
        </select>
      </div>

      {/* Actions groupées */}
      {selectedPhotos.size > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-purple-50 border border-purple-200 rounded-lg p-4 flex items-center justify-between"
        >
          <span className="text-purple-700 font-medium">
            {selectedPhotos.size} photo(s) sélectionnée(s)
          </span>
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleBulkAction('feature')}
            >
              <Star className="w-4 h-4 mr-1" />
              Mettre en avant
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleBulkAction('unfeature')}
            >
              Retirer de la mise en avant
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => handleBulkAction('delete')}
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Supprimer
            </Button>
          </div>
        </motion.div>
      )}

      {/* Grille/Liste des photos */}
      <div className={`
        ${viewMode === 'grid' 
          ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'
          : 'space-y-4'
        }
      `}>
        <AnimatePresence>
          {filteredPhotos.map((photo) => (
            <motion.div
              key={photo.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`
                group relative bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow
                ${viewMode === 'list' ? 'flex items-center p-4' : ''}
              `}
            >
              {/* Checkbox de sélection */}
              <input
                type="checkbox"
                checked={selectedPhotos.has(photo.id)}
                onChange={(e) => {
                  const newSet = new Set(selectedPhotos)
                  if (e.target.checked) {
                    newSet.add(photo.id)
                  } else {
                    newSet.delete(photo.id)
                  }
                  setSelectedPhotos(newSet)
                }}
                className="absolute top-2 left-2 z-10 w-4 h-4 text-purple-600 bg-white rounded border-gray-300 focus:ring-purple-500"
              />

              {/* Image */}
              <div className={`relative ${viewMode === 'list' ? 'w-16 h-16 mr-4' : 'aspect-square'}`}>
                <img
                  src={photo.thumbnail || photo.url}
                  alt={photo.alt || photo.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Badge featured */}
                {photo.featured && (
                  <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 rounded-full p-1">
                    <Star className="w-3 h-3 fill-current" />
                  </div>
                )}

                {/* Overlay d'actions */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => setEditingPhoto(photo.id)}
                  >
                    <Edit3 className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleToggleFeatured(photo.id, !photo.featured)}
                  >
                    <Star className={`w-4 h-4 ${photo.featured ? 'fill-current' : ''}`} />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDeletePhoto(photo.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Informations */}
              <div className={`${viewMode === 'list' ? 'flex-1' : 'p-3'}`}>
                <h3 className="font-medium text-gray-900 truncate">
                  {photo.title}
                </h3>
                {viewMode === 'list' && (
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                    <span>{photo.gallery}</span>
                    <span>{photo.tags.length} tag(s)</span>
                    <span>{photo.metadata.dimensions.width}x{photo.metadata.dimensions.height}</span>
                  </div>
                )}
                {viewMode === 'grid' && (
                  <div className="text-xs text-gray-500 mt-1">
                    <div className="flex items-center space-x-1">
                      <Tags className="w-3 h-3" />
                      <span>{photo.tags.length}</span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Message si aucune photo */}
      {filteredPhotos.length === 0 && (
        <div className="text-center py-12">
          <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Aucune photo trouvée
          </h3>
          <p className="text-gray-500">
            {searchTerm || filterGallery !== 'all' 
              ? 'Essayez de modifier vos filtres de recherche'
              : 'Commencez par uploader vos premières photos'
            }
          </p>
        </div>
      )}
    </div>
  )
}
