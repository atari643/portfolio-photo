'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { ChevronRight, Eye, Heart, Camera, Filter } from 'lucide-react'
import Image from 'next/image'

interface GalleryItem {
  id: string
  src: string
  alt: string
  category: string
  title: string
  description: string
}

// Photos exemple (remplacez par vos vraies photos)
const galleryItems: GalleryItem[] = [
  {
    id: '1',
    src: '/api/placeholder/400/600',
    alt: 'Portrait couple',
    category: 'Mariage',
    title: 'Sarah & Thomas',
    description: 'Un amour rayonnant sous la lumière dorée'
  },
  {
    id: '2',
    src: '/api/placeholder/600/400',
    alt: 'Paysage montagne',
    category: 'Nature',
    title: 'Alpes Françaises',
    description: 'Quand la terre touche le ciel'
  },
  {
    id: '3',
    src: '/api/placeholder/400/500',
    alt: 'Portrait enfant',
    category: 'Portrait',
    title: 'Innocence',
    description: 'Le sourire qui illumine tout'
  },
  {
    id: '4',
    src: '/api/placeholder/500/600',
    alt: 'Mariage cérémonie',
    category: 'Mariage',
    title: 'Premier regard',
    description: 'L\'émotion à l\'état pur'
  },
  {
    id: '5',
    src: '/api/placeholder/600/500',
    alt: 'Architecture moderne',
    category: 'Architecture',
    title: 'Lignes urbaines',
    description: 'Géométrie et lumière'
  },
  {
    id: '6',
    src: '/api/placeholder/400/550',
    alt: 'Portrait femme',
    category: 'Portrait',
    title: 'Élégance',
    description: 'La beauté dans sa simplicité'
  }
]

const categories = ['Tous', 'Mariage', 'Portrait', 'Nature', 'Architecture']

export function GalleryPreview() {
  const [selectedCategory, setSelectedCategory] = useState('Tous')
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const filteredItems = selectedCategory === 'Tous' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory)

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
            <span className="gradient-rainbow bg-clip-text text-transparent">
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
