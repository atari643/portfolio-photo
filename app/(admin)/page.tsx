'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, Image, Settings, Eye, Edit, Trash2, Plus, Camera, Palette } from 'lucide-react'

interface Photo {
  id: string
  src: string
  alt: string
  category: string
  title: string
  description: string
}

// Exemple de données (à remplacer par un vrai CMS)
const initialPhotos: Photo[] = [
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
  }
]

export default function AdminPage() {
  const [photos, setPhotos] = useState<Photo[]>(initialPhotos)
  const [selectedCategory, setSelectedCategory] = useState('Toutes')
  const [isUploading, setIsUploading] = useState(false)

  const categories = ['Toutes', 'Mariage', 'Portrait', 'Nature', 'Architecture']

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    setIsUploading(true)
    
    // Simulation de l'upload (remplacez par votre logique)
    setTimeout(() => {
      console.log('Photos uploadées:', files.length)
      setIsUploading(false)
    }, 2000)
  }

  const filteredPhotos = selectedCategory === 'Toutes' 
    ? photos 
    : photos.filter(photo => photo.category === selectedCategory)

  return (
    <div className="space-y-8">
      {/* Header avec actions rapides */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-3xl font-serif font-bold text-neutral-800 dark:text-neutral-200">
            Gestion des Photos
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            Interface simplifiée pour gérer votre portfolio
          </p>
        </div>
        
        {/* Actions rapides */}
        <div className="flex flex-wrap gap-3">
          <motion.label
            className="flex items-center space-x-2 gradient-primary text-white px-6 py-3 rounded-xl font-semibold cursor-pointer hover:shadow-medium transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Upload className="h-5 w-5" />
            <span>{isUploading ? 'Upload...' : 'Ajouter Photos'}</span>
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
          </motion.label>
          
          <motion.button
            className="flex items-center space-x-2 glass px-6 py-3 rounded-xl font-semibold hover:shadow-medium transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Settings className="h-5 w-5" />
            <span>Paramètres</span>
          </motion.button>
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { icon: Image, title: 'Total Photos', value: photos.length, color: 'primary' },
          { icon: Camera, title: 'En ligne', value: photos.length, color: 'secondary' },
          { icon: Eye, title: 'Vues ce mois', value: '2.4k', color: 'accent' },
          { icon: Palette, title: 'Catégories', value: categories.length - 1, color: 'primary' },
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="glass rounded-2xl p-6 hover:shadow-medium transition-all duration-300"
          >
            <div className={`w-12 h-12 gradient-${stat.color} rounded-xl flex items-center justify-center mb-4`}>
              <stat.icon className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              {stat.title}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filtres de catégories */}
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
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

      {/* Grille des photos avec actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPhotos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group relative glass rounded-2xl overflow-hidden hover:shadow-strong transition-all duration-300"
          >
            {/* Image */}
            <div className="aspect-[4/3] relative overflow-hidden">
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Overlay avec actions */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="flex space-x-3">
                  <motion.button
                    className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Eye className="h-4 w-4 text-white" />
                  </motion.button>
                  <motion.button
                    className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Edit className="h-4 w-4 text-white" />
                  </motion.button>
                  <motion.button
                    className="p-2 bg-red-500/70 backdrop-blur-sm rounded-full hover:bg-red-500/90 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Trash2 className="h-4 w-4 text-white" />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Informations */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-xs font-medium rounded-full">
                  {photo.category}
                </span>
              </div>
              <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
                {photo.title}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
                {photo.description}
              </p>
            </div>
          </motion.div>
        ))}

        {/* Bouton d'ajout */}
        <motion.label
          className="aspect-[4/3] glass rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:shadow-medium transition-all duration-300 border-2 border-dashed border-neutral-300 dark:border-neutral-600"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus className="h-12 w-12 text-neutral-400 mb-2" />
          <span className="text-neutral-500 font-medium">Ajouter une photo</span>
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />
        </motion.label>
      </div>

      {/* Zone de glisser-déposer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="glass rounded-3xl p-12 text-center border-2 border-dashed border-neutral-300 dark:border-neutral-600"
      >
        <Upload className="h-16 w-16 text-neutral-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
          Glissez vos photos ici
        </h3>
        <p className="text-neutral-600 dark:text-neutral-400 mb-6">
          Ou cliquez pour sélectionner plusieurs fichiers à la fois
        </p>
        <label className="inline-flex items-center space-x-2 gradient-secondary text-white px-6 py-3 rounded-xl font-semibold cursor-pointer hover:shadow-medium transition-all duration-300">
          <Camera className="h-5 w-5" />
          <span>Choisir les fichiers</span>
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />
        </label>
      </motion.div>
    </div>
  )
}
