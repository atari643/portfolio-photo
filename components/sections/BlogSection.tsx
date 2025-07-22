'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, User, Tag, ArrowRight, Search } from 'lucide-react'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  coverImage: string
  author: {
    name: string
    avatar: string
    bio: string
  }
  publishedAt: string
  updatedAt?: string
  readingTime: number
  tags: string[]
  category: string
  featured: boolean
  views: number
}

interface BlogSectionProps {
  posts?: BlogPost[]
  featured?: boolean
  maxPosts?: number
}

// Données d'exemple (à remplacer par votre CMS)
const samplePosts: BlogPost[] = [
  {
    id: '1',
    title: 'Les secrets d\'une session photo de mariage réussie',
    excerpt: 'Découvrez les techniques et astuces pour capturer les moments les plus précieux d\'un mariage avec authenticité et émotion.',
    content: '',
    coverImage: '/api/placeholder/600/400',
    author: {
      name: 'Marie Dubois',
      avatar: '/api/placeholder/100/100',
      bio: 'Photographe passionnée depuis 10 ans'
    },
    publishedAt: '2024-12-15',
    readingTime: 8,
    tags: ['mariage', 'conseils', 'technique'],
    category: 'Conseils',
    featured: true,
    views: 1250
  },
  {
    id: '2',
    title: 'Portrait en lumière naturelle : maîtriser les golden hours',
    excerpt: 'Comment exploiter la lumière dorée du lever et coucher de soleil pour des portraits exceptionnels.',
    content: '',
    coverImage: '/api/placeholder/600/400',
    author: {
      name: 'Marie Dubois',
      avatar: '/api/placeholder/100/100',
      bio: 'Photographe passionnée depuis 10 ans'
    },
    publishedAt: '2024-12-10',
    readingTime: 6,
    tags: ['portrait', 'lumière', 'technique'],
    category: 'Tutoriels',
    featured: false,
    views: 890
  },
  {
    id: '3',
    title: 'Behind the scenes : shooting mode dans les Alpes',
    excerpt: 'Retour sur une session photo mode en montagne avec les défis et les récompenses de la photographie en altitude.',
    content: '',
    coverImage: '/api/placeholder/600/400',
    author: {
      name: 'Marie Dubois',
      avatar: '/api/placeholder/100/100',
      bio: 'Photographe passionnée depuis 10 ans'
    },
    publishedAt: '2024-12-05',
    readingTime: 5,
    tags: ['behind-the-scenes', 'mode', 'voyage'],
    category: 'Stories',
    featured: false,
    views: 654
  }
]

export function BlogSection({ posts = samplePosts, featured = false, maxPosts }: BlogSectionProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Tous')

  // Filtrer les posts
  let filteredPosts = posts
  
  if (featured) {
    filteredPosts = posts.filter(post => post.featured)
  }
  
  if (selectedCategory !== 'Tous') {
    filteredPosts = filteredPosts.filter(post => post.category === selectedCategory)
  }
  
  if (searchTerm) {
    filteredPosts = filteredPosts.filter(post => 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  }

  if (maxPosts) {
    filteredPosts = filteredPosts.slice(0, maxPosts)
  }

  const categories = ['Tous', ...Array.from(new Set(posts.map(post => post.category)))]

  return (
    <section className="py-20 bg-white dark:bg-neutral-900">
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
              {featured ? 'Articles à la Une' : 'Blog & Stories'}
            </span>
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            Découvrez mes conseils techniques, behind-the-scenes et réflexions sur l'art de la photographie.
          </p>
        </motion.div>

        {/* Filtres et recherche */}
        {!featured && (
          <div className="mb-12 space-y-6">
            {/* Barre de recherche */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Rechercher un article..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl glass border border-neutral-200 dark:border-neutral-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>

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
                  {category}
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* Grille d'articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>

        {/* CTA pour voir plus */}
        {featured && (
          <div className="text-center mt-12">
            <Link href="/blog">
              <motion.button
                className="gradient-primary text-white px-8 py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Voir tous les articles</span>
                <ArrowRight className="h-5 w-5" />
              </motion.button>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

// Composant pour chaque carte d'article
interface BlogCardProps {
  post: BlogPost
  index: number
}

function BlogCard({ post, index }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="glass rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 group"
    >
      {/* Image de couverture */}
      <div className="relative overflow-hidden">
        <Link href={`/blog/${post.id}`}>
          <Image
            src={post.coverImage}
            alt={post.title}
            width={600}
            height={400}
            className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </Link>
        
        {/* Badge featured */}
        {post.featured && (
          <div className="absolute top-4 left-4">
            <span className="gradient-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
              À la une
            </span>
          </div>
        )}

        {/* Catégorie */}
        <div className="absolute top-4 right-4">
          <span className="bg-white/90 dark:bg-black/90 text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
            {post.category}
          </span>
        </div>
      </div>

      {/* Contenu */}
      <div className="p-6">
        {/* Métadonnées */}
        <div className="flex items-center space-x-4 text-sm text-neutral-500 dark:text-neutral-400 mb-4">
          <span className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(post.publishedAt)}</span>
          </span>
          <span className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{post.readingTime} min</span>
          </span>
        </div>

        {/* Titre */}
        <Link href={`/blog/${post.id}`}>
          <h3 className="text-xl font-semibold mb-3 text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
            {post.title}
          </h3>
        </Link>

        {/* Extrait */}
        <p className="text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
            >
              <Tag className="h-3 w-3 mr-1" />
              {tag}
            </span>
          ))}
        </div>

        {/* Auteur et stats */}
        <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center space-x-3">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              width={32}
              height={32}
              className="rounded-full"
            />
            <div>
              <p className="text-sm font-medium text-neutral-900 dark:text-white">
                {post.author.name}
              </p>
            </div>
          </div>
          
          <div className="text-sm text-neutral-500 dark:text-neutral-400">
            {post.views} vues
          </div>
        </div>
      </div>
    </motion.article>
  )
}
