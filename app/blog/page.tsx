import { Metadata } from 'next'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Navigation } from '../../components/layout/Navigation'
import { Footer } from '../../components/layout/Footer'
import { generateSEOMetadata, seoTemplates } from '../../lib/seo'
import { Calendar, Clock, Eye, ArrowRight, Camera, Heart } from 'lucide-react'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Blog Photo - Conseils et Behind-the-Scenes',
  description: 'Découvrez les coulisses de mes séances photo, mes conseils techniques et mes histoires de photographe passionnée.',
  keywords: 'blog photo, conseils photographie, behind the scenes, tutoriels photo, stories photographe',
  url: '/blog',
  type: 'website',
})

// Articles exemple (à remplacer par un vrai CMS)
const blogPosts = [
  {
    id: '1',
    title: 'Les Secrets d\'une Séance Photo de Mariage Réussie',
    excerpt: 'Découvrez mes conseils pour capturer l\'émotion pure lors d\'un mariage, de la préparation aux moments intimes.',
    content: '',
    author: 'Photographe Pro',
    publishedAt: '2024-01-15',
    readTime: '5 min',
    views: 1234,
    category: 'Mariage',
    image: '/api/placeholder/600/400',
    tags: ['mariage', 'conseils', 'émotion'],
  },
  {
    id: '2',
    title: 'Maîtriser la Lumière Naturelle en Portrait',
    excerpt: 'Comment utiliser la lumière naturelle pour créer des portraits saisissants et authentiques.',
    content: '',
    author: 'Photographe Pro',
    publishedAt: '2024-01-10',
    readTime: '7 min',
    views: 856,
    category: 'Portrait',
    image: '/api/placeholder/600/400',
    tags: ['portrait', 'lumière', 'technique'],
  },
  {
    id: '3',
    title: 'Behind the Scenes : Séance en Montagne',
    excerpt: 'Plongez dans les coulisses d\'une séance photo spectaculaire dans les Alpes françaises.',
    content: '',
    author: 'Photographe Pro',
    publishedAt: '2024-01-05',
    readTime: '4 min',
    views: 672,
    category: 'Nature',
    image: '/api/placeholder/600/400',
    tags: ['nature', 'behind-the-scenes', 'montagne'],
  },
  {
    id: '4',
    title: 'Préparer sa Séance Photo de Famille',
    excerpt: 'Guide complet pour préparer une séance photo de famille mémorable et naturelle.',
    content: '',
    author: 'Photographe Pro',
    publishedAt: '2024-01-01',
    readTime: '6 min',
    views: 1089,
    category: 'Portrait',
    image: '/api/placeholder/600/400',
    tags: ['famille', 'préparation', 'conseils'],
  },
]

const categories = ['Tous', 'Mariage', 'Portrait', 'Nature', 'Technique']

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <Navigation />
      
      {/* Espacement pour la navigation fixe */}
      <div className="h-16"></div>
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-neutral-100 to-neutral-50 dark:from-neutral-800 dark:to-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-6">
            <span className="gradient-text-rainbow">
              Blog Photo
            </span>
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            Plongez dans l\'univers de la photographie avec mes conseils, mes behind-the-scenes 
            et mes histoires de photographe passionnée.
          </p>
        </div>
      </section>

      {/* Filtres de catégories */}
      <section className="py-8 bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                className="px-6 py-3 rounded-full font-medium transition-all duration-300 glass hover:shadow-medium"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles de blog */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Articles principaux */}
            <div className="lg:col-span-2 space-y-8">
              {blogPosts.map((post, index) => (
                <article
                  key={post.id}
                  className="glass rounded-3xl overflow-hidden hover:shadow-strong transition-all duration-500"
                >
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <div className="aspect-[16/10] relative overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-primary-600 text-white text-xs font-medium rounded-full">
                            {post.category}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="md:w-2/3 p-8">
                      <div className="flex items-center space-x-4 text-sm text-neutral-500 mb-3">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(post.publishedAt).toLocaleDateString('fr-FR')}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{post.readTime}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>{post.views}</span>
                        </div>
                      </div>
                      
                      <h2 className="text-xl md:text-2xl font-serif font-bold text-neutral-800 dark:text-neutral-200 mb-4">
                        {post.title}
                      </h2>
                      
                      <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 text-xs rounded-full"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                        
                        <Link
                          href={`/blog/${post.id}`}
                          className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
                        >
                          <span>Lire l\'article</span>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* À propos */}
              <div className="glass rounded-3xl p-8">
                <h3 className="text-xl font-serif font-bold text-neutral-800 dark:text-neutral-200 mb-4">
                  À Propos du Blog
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                  Bienvenue sur mon blog ! Je partage ici ma passion pour la photographie, 
                  mes conseils techniques et les coulisses de mes séances.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center">
                    <Camera className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-800 dark:text-neutral-200">
                      Photographe Pro
                    </div>
                    <div className="text-sm text-neutral-500">
                      8+ ans d\'expérience
                    </div>
                  </div>
                </div>
              </div>

              {/* Articles populaires */}
              <div className="glass rounded-3xl p-8">
                <h3 className="text-xl font-serif font-bold text-neutral-800 dark:text-neutral-200 mb-6">
                  Articles Populaires
                </h3>
                <div className="space-y-4">
                  {blogPosts
                    .sort((a, b) => b.views - a.views)
                    .slice(0, 3)
                    .map((post) => (
                      <Link
                        key={post.id}
                        href={`/blog/${post.id}`}
                        className="block group"
                      >
                        <div className="flex space-x-3 p-3 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
                          <div className="w-16 h-16 relative overflow-hidden rounded-lg flex-shrink-0">
                            <img
                              src={post.image}
                              alt={post.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-neutral-800 dark:text-neutral-200 line-clamp-2 group-hover:text-primary-600 transition-colors">
                              {post.title}
                            </h4>
                            <div className="flex items-center space-x-2 text-xs text-neutral-500 mt-1">
                              <Eye className="h-3 w-3" />
                              <span>{post.views}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="glass rounded-3xl p-8">
                <h3 className="text-xl font-serif font-bold text-neutral-800 dark:text-neutral-200 mb-4">
                  Newsletter
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-6">
                  Recevez mes derniers articles et conseils photo directement dans votre boîte mail.
                </p>
                <form className="space-y-4">
                  <input
                    type="email"
                    placeholder="Votre email"
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-600 glass focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  />
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center space-x-2 gradient-primary text-white py-3 px-6 rounded-xl font-semibold hover:shadow-medium transition-all duration-300"
                  >
                    <Heart className="h-4 w-4" />
                    <span>S\'abonner</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  )
}
