'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  EyeOff,
  Image,
  Folder,
  Calendar,
  User,
  Settings,
  DragDropContext,
  Droppable,
  Draggable
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useCMS } from '@/lib/cms/context'
import toast from 'react-hot-toast'

interface CreateGalleryModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (gallery: any) => void
}

function CreateGalleryModal({ isOpen, onClose, onSubmit }: CreateGalleryModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    slug: '',
    published: true
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      coverImage: '',
      photos: [],
      order: 0
    })
    setFormData({ title: '', description: '', slug: '', published: true })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-lg p-6 w-full max-w-md mx-4"
      >
        <h3 className="text-lg font-medium text-gray-900 mb-4">Créer une nouvelle galerie</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Titre de la galerie
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Ex: Mariage Sarah & Thomas"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              rows={3}
              placeholder="Description de la galerie..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              URL (slug)
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="mariage-sarah-thomas"
              pattern="[a-z0-9-]+"
            />
            <p className="text-xs text-gray-500 mt-1">
              Utilisez uniquement des lettres minuscules, chiffres et tirets
            </p>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="published"
              checked={formData.published}
              onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <label htmlFor="published" className="ml-2 text-sm text-gray-700">
              Publier immédiatement
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">
              Créer la galerie
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export function GalleryManager() {
  const { data, createGallery, updateGallery, deleteGallery, reorderGalleries } = useCMS()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingGallery, setEditingGallery] = useState<string | null>(null)
  const [selectedGalleries, setSelectedGalleries] = useState<Set<string>>(new Set())

  const handleCreateGallery = async (galleryData: any) => {
    try {
      await createGallery(galleryData)
      toast.success('Galerie créée avec succès')
    } catch (error) {
      toast.error('Erreur lors de la création')
    }
  }

  const handleTogglePublished = async (galleryId: string, published: boolean) => {
    try {
      await updateGallery(galleryId, { published })
      toast.success(published ? 'Galerie publiée' : 'Galerie dépubliée')
    } catch (error) {
      toast.error('Erreur lors de la mise à jour')
    }
  }

  const handleDeleteGallery = async (galleryId: string) => {
    const gallery = data.galleries.find(g => g.id === galleryId)
    if (!gallery) return

    if (confirm(`Êtes-vous sûr de vouloir supprimer la galerie "${gallery.title}" ?`)) {
      try {
        await deleteGallery(galleryId)
        toast.success('Galerie supprimée')
      } catch (error) {
        toast.error('Erreur lors de la suppression')
      }
    }
  }

  const handleBulkDelete = async () => {
    if (selectedGalleries.size === 0) return

    if (confirm(`Supprimer ${selectedGalleries.size} galerie(s) sélectionnée(s) ?`)) {
      try {
        for (const galleryId of selectedGalleries) {
          await deleteGallery(galleryId)
        }
        setSelectedGalleries(new Set())
        toast.success('Galeries supprimées')
      } catch (error) {
        toast.error('Erreur lors de la suppression')
      }
    }
  }

  const getGalleryStats = (gallery: any) => {
    const photos = data.photos.filter(p => p.gallery === gallery.id)
    return {
      totalPhotos: photos.length,
      featuredPhotos: photos.filter(p => p.featured).length
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestionnaire de Galeries</h2>
          <p className="text-gray-600">{data.galleries.length} galerie(s) au total</p>
        </div>

        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Nouvelle galerie
        </Button>
      </div>

      {/* Actions groupées */}
      {selectedGalleries.size > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-purple-50 border border-purple-200 rounded-lg p-4 flex items-center justify-between"
        >
          <span className="text-purple-700 font-medium">
            {selectedGalleries.size} galerie(s) sélectionnée(s)
          </span>
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="destructive"
              onClick={handleBulkDelete}
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Supprimer
            </Button>
          </div>
        </motion.div>
      )}

      {/* Liste des galeries */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-12 px-6 py-3">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedGalleries(new Set(data.galleries.map(g => g.id)))
                      } else {
                        setSelectedGalleries(new Set())
                      }
                    }}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Galerie
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Photos
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Créée le
                </th>
                <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <AnimatePresence>
                {data.galleries.map((gallery) => {
                  const stats = getGalleryStats(gallery)
                  
                  return (
                    <motion.tr
                      key={gallery.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedGalleries.has(gallery.id)}
                          onChange={(e) => {
                            const newSet = new Set(selectedGalleries)
                            if (e.target.checked) {
                              newSet.add(gallery.id)
                            } else {
                              newSet.delete(gallery.id)
                            }
                            setSelectedGalleries(newSet)
                          }}
                          className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        />
                      </td>
                      
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mr-4">
                            {gallery.coverImage ? (
                              <img
                                src={gallery.coverImage}
                                alt={gallery.title}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            ) : (
                              <Folder className="w-6 h-6 text-gray-400" />
                            )}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {gallery.title}
                            </div>
                            <div className="text-sm text-gray-500">
                              /{gallery.slug}
                            </div>
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {stats.totalPhotos} photo(s)
                        </div>
                        {stats.featuredPhotos > 0 && (
                          <div className="text-xs text-purple-600">
                            {stats.featuredPhotos} en avant
                          </div>
                        )}
                      </td>
                      
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleTogglePublished(gallery.id, !gallery.published)}
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            gallery.published
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {gallery.published ? (
                            <>
                              <Eye className="w-3 h-3 mr-1" />
                              Publié
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-3 h-3 mr-1" />
                              Brouillon
                            </>
                          )}
                        </button>
                      </td>
                      
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(gallery.createdAt).toLocaleDateString('fr-FR')}
                      </td>
                      
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingGallery(gallery.id)}
                          >
                            <Edit3 className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                          >
                            <Image className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteGallery(gallery.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  )
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Message si aucune galerie */}
      {data.galleries.length === 0 && (
        <div className="text-center py-12">
          <Folder className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Aucune galerie créée
          </h3>
          <p className="text-gray-500 mb-4">
            Commencez par créer votre première galerie pour organiser vos photos
          </p>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Créer ma première galerie
          </Button>
        </div>
      )}

      {/* Modal de création */}
      <CreateGalleryModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateGallery}
      />
    </div>
  )
}
