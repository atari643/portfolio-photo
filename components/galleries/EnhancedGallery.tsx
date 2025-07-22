'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import { Zoom, Fullscreen, Thumbnails, Counter } from 'yet-another-react-lightbox/plugins'
import 'yet-another-react-lightbox/plugins/thumbnails.css'
import { Eye, Heart, Download, Share2, X, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { OptimizedImage } from '../ui/OptimizedImage'
import { usePublicPhotos } from '@/lib/hooks/usePublicPhotos'

interface PhotoItem {
  id: string
  src: string
  alt: string
  category: string
  title: string
  description: string
  width?: number
  height?: number
  likes?: number
  views?: number
  tags?: string[]
  photographer?: string
  location?: string
  camera?: string
  settings?: {
    aperture?: string
    shutter?: string
    iso?: string
    focal?: string
  }
}

interface EnhancedGalleryProps {
  photos: PhotoItem[]
  title?: string
  description?: string
  showCategories?: boolean
  allowDownload?: boolean
  showMetadata?: boolean
}

const categories = ['Tous', 'Mariage', 'Portrait', 'Nature', 'Architecture']

export function EnhancedGallery({ 
  photos, 
  title = "Galerie Photo",
  description = "Collection de mes meilleures œuvres",
  showCategories = true,
  allowDownload = true,
  showMetadata = true
}: EnhancedGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState('Tous')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [likedPhotos, setLikedPhotos] = useState<Set<string>>(new Set())

  const filteredPhotos = selectedCategory === 'Tous' 
    ? photos 
    : photos.filter(photo => photo.category === selectedCategory)

  const lightboxSlides = filteredPhotos.map(photo => ({
    src: photo.src,
    alt: photo.alt,
    width: photo.width || 1200,
    height: photo.height || 800,
  }))

  const handlePhotoClick = (index: number) => {
    setCurrentPhotoIndex(index)
    setLightboxOpen(true)
  }

  const toggleLike = (photoId: string) => {
    setLikedPhotos(prev => {
      const newSet = new Set(prev)
      if (newSet.has(photoId)) {
        newSet.delete(photoId)
      } else {
        newSet.add(photoId)
      }
      return newSet
    })
  }

  const handleDownload = async (photo: PhotoItem) => {
    if (!allowDownload) return
    
    try {
      const response = await fetch(photo.src)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${photo.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Erreur de téléchargement:', error)
    }
  }

  const handleShare = async (photo: PhotoItem) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: photo.title,
          text: photo.description,
          url: window.location.href,
        })
      } catch (error) {
        console.log('Partage annulé')
      }
    } else {
      // Fallback: copier l'URL dans le presse-papier
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <section className="py-20 bg-neutral-50 dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-6">
            <span className="gradient-text-rainbow">
              {title}
            </span>
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed mb-8">
            {description}
          </p>

          {/* Filtres de catégories */}
          {showCategories && (
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'gradient-primary text-white shadow-medium'
                      : 'glass hover:shadow-medium'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Galerie en grille */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              className="group relative cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              onClick={() => handlePhotoClick(index)}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-medium hover:shadow-strong transition-all duration-500 aspect-[4/3]">
                <OptimizedImage
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="transform group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />

                {/* Overlay avec actions */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    {/* Métadonnées */}
                    {showMetadata && (
                      <div className="mb-3">
                        <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white">
                          {photo.category}
                        </span>
                        <h3 className="text-lg font-serif font-semibold text-white mt-2">
                          {photo.title}
                        </h3>
                        <p className="text-sm text-white/80 line-clamp-2">
                          {photo.description}
                        </p>
                      </div>
                    )}
                    
                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <motion.button
                          onClick={(e) => {
                            e.stopPropagation()
                            handlePhotoClick(index)
                          }}
                          className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Eye className="h-4 w-4 text-white" />
                        </motion.button>
                        
                        <motion.button
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleLike(photo.id)
                          }}
                          className={`p-2 backdrop-blur-sm rounded-full transition-colors ${
                            likedPhotos.has(photo.id)
                              ? 'bg-red-500/70 hover:bg-red-500/90'
                              : 'bg-white/20 hover:bg-white/30'
                          }`}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Heart 
                            className={`h-4 w-4 text-white ${
                              likedPhotos.has(photo.id) ? 'fill-current' : ''
                            }`} 
                          />
                        </motion.button>

                        {allowDownload && (
                          <motion.button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDownload(photo)
                            }}
                            className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Download className="h-4 w-4 text-white" />
                          </motion.button>
                        )}

                        <motion.button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleShare(photo)
                          }}
                          className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Share2 className="h-4 w-4 text-white" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          index={currentPhotoIndex}
          slides={lightboxSlides}
          plugins={[Zoom, Fullscreen, Thumbnails, Counter]}
          zoom={{
            maxZoomPixelRatio: 3,
            scrollToZoom: true,
          }}
          thumbnails={{
            position: 'bottom',
            width: 120,
            height: 80,
            border: 2,
            borderRadius: 8,
            gap: 16,
          }}
          counter={{
            container: { style: { top: 'unset', bottom: 0 } },
          }}
          styles={{
            container: { backgroundColor: 'rgba(0, 0, 0, 0.95)' },
            thumbnail: { borderColor: '#ec4899' },
          }}
          render={{
            slide: ({ slide, rect }) => {
              const currentPhoto = filteredPhotos[currentPhotoIndex]
              const slideData = slide as { src: string; alt: string }
              return (
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src={slideData.src}
                    alt={slideData.alt}
                    style={{
                      maxWidth: rect.width,
                      maxHeight: rect.height,
                      objectFit: 'contain',
                    }}
                  />
                  
                  {/* Métadonnées dans le lightbox */}
                  {showMetadata && currentPhoto && (
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="bg-black/60 backdrop-blur-sm rounded-xl p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-xl font-serif font-semibold mb-1">
                              {currentPhoto.title}
                            </h3>
                            <p className="text-sm text-white/80">
                              {currentPhoto.description}
                            </p>
                          </div>
                          <span className="px-3 py-1 bg-primary-600 rounded-full text-xs font-medium">
                            {currentPhoto.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            },
          }}
        />
      </div>
    </section>
  )
}
