'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { ChevronRight, Eye, Heart, Camera, Filter } from 'lucide-react'
import Image from 'next/image'
import { useFeaturedPhotos } from '@/lib/hooks/usePublicPhotos'

interface GalleryItem {
  id: string
  src: string
  alt: string
  category: string
  title: string
  description: string
}

export function GalleryPreview() {
  const { photos: featuredPhotos, loading } = useFeaturedPhotos(6) // Limite à 6 photos vedettes
  const [selectedCategory, setSelectedCategory] = useState('Tous')
  
  // Convertir les photos du CMS au format attendu par le composant
  const galleryItems: GalleryItem[] = featuredPhotos.map(photo => ({
    id: photo.id,
    src: photo.url,
    alt: photo.alt || photo.title,
    category: photo.category,
    title: photo.title,
    description: photo.description
  }))

  // Extraire les catégories uniques des photos
  const categories = ['Tous', ...Array.from(new Set(featuredPhotos.map(photo => photo.category)))]
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const filteredItems = selectedCategory === 'Tous' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory)

  if (loading) {
    return (
      <section id="gallery" className="py-20 bg-neutral-50 dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-neutral-600 dark:text-neutral-400">Chargement de la galerie...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="gallery" className="py-20 bg-neutral-50 dark:bg-neutral-900">
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
              Galerie
            </span>
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed mb-8">
            Découvrez une sélection de mes œuvres les plus marquantes. 
            Chaque image raconte une histoire, chaque moment capturé révèle une émotion.
          </p>

          {/* Filtres de catégories */}
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
                <span className="flex items-center space-x-2">
                  <Filter className="h-4 w-4" />
                  <span>{category}</span>
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Galerie en masonry */}
        <motion.div 
          className="masonry"
          layout
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="masonry-item group cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              layout
              onHoverStart={() => setHoveredItem(item.id)}
              onHoverEnd={() => setHoveredItem(null)}
              whileHover={{ y: -10 }}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-medium hover:shadow-strong transition-all duration-500">
                <div className="image-container">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                {/* Overlay avec informations */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                  animate={{ opacity: hoveredItem === item.id ? 1 : 0 }}
                >
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                        {item.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-serif font-semibold mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-white/80 leading-relaxed">
                      {item.description}
                    </p>
                    
                    {/* Actions */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-4">
                        <motion.button
                          className="flex items-center space-x-1 text-white/80 hover:text-white transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Eye className="h-4 w-4" />
                          <span className="text-sm">Voir</span>
                        </motion.button>
                        <motion.button
                          className="flex items-center space-x-1 text-white/80 hover:text-white transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Heart className="h-4 w-4" />
                          <span className="text-sm">J'aime</span>
                        </motion.button>
                      </div>
                      <Camera className="h-5 w-5 text-white/60" />
                    </div>
                  </div>
                </motion.div>

                {/* Badge catégorie (toujours visible) */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 glass text-xs font-medium rounded-full">
                    {item.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.a
            href="/galerie"
            className="inline-flex items-center space-x-2 gradient-secondary text-white px-8 py-4 rounded-full font-semibold hover:shadow-medium transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Voir toute la galerie</span>
            <ChevronRight className="h-5 w-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
