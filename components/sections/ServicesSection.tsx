'use client'

import { motion } from 'framer-motion'
import { Camera, Heart, Users, MapPin, Clock, Star, ArrowRight } from 'lucide-react'

interface Service {
  id: string
  icon: typeof Camera
  title: string
  description: string
  features: string[]
  price: string
  duration: string
  popular?: boolean
}

const services: Service[] = [
  {
    id: 'mariage',
    icon: Heart,
    title: 'Mariage',
    description: 'Immortalisez le plus beau jour de votre vie avec élégance et émotion.',
    features: [
      'Séance engagement offerte',
      'Couverture complète de la journée',
      'Galerie privée en ligne',
      '500+ photos retouchées',
      'Album photo premium inclus',
      'Droits d\'usage personnels'
    ],
    price: 'À partir de 1800€',
    duration: '12h de couverture',
    popular: true
  },
  {
    id: 'portrait',
    icon: Users,
    title: 'Portrait & Famille',
    description: 'Capturez la complicité et les sourires de ceux que vous aimez.',
    features: [
      'Séance en studio ou extérieur',
      'Conseil stylisme',
      '50+ photos retouchées',
      'Galerie en ligne',
      'Tirages haute qualité',
      'Séance jusqu\'à 4 personnes'
    ],
    price: 'À partir de 350€',
    duration: '2h de séance'
  },
  {
    id: 'entreprise',
    icon: Camera,
    title: 'Photographie Corporate',
    description: 'Valorisez votre image professionnelle avec des portraits et événements d\'entreprise.',
    features: [
      'Portraits professionnels',
      'Événements d\'entreprise',
      'Photos de locaux',
      'Retouche professionnelle',
      'Livraison rapide 48h',
      'Droits commerciaux inclus'
    ],
    price: 'À partir de 500€',
    duration: 'Selon le projet'
  },
  {
    id: 'voyage',
    icon: MapPin,
    title: 'Destination & Voyage',
    description: 'Accompagnement photographique pour vos voyages et événements à l\'étranger.',
    features: [
      'Séances en destination',
      'Lune de miel',
      'Événements à l\'étranger',
      'Reportage de voyage',
      'Galerie premium',
      'Album voyage personnalisé'
    ],
    price: 'Sur devis',
    duration: 'Séjour personnalisé'
  }
]

export function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-gradient-to-br from-neutral-100 to-neutral-50 dark:from-neutral-800 dark:to-neutral-900">
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
              Services
            </span>
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            Des prestations sur mesure pour capturer tous vos moments précieux. 
            Chaque service est pensé pour vous offrir une expérience unique et des souvenirs inoubliables.
          </p>
        </motion.div>

        {/* Grille des services */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="relative group"
            >
              {/* Badge "Populaire" */}
              {service.popular && (
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
                  viewport={{ once: true }}
                  className="absolute -top-4 -right-4 z-10"
                >
                  <div className="gradient-accent text-white text-xs font-bold px-3 py-1 rounded-full shadow-medium flex items-center space-x-1">
                    <Star className="h-3 w-3 fill-current" />
                    <span>Populaire</span>
                  </div>
                </motion.div>
              )}

              {/* Carte du service */}
              <motion.div
                className={`relative h-full glass rounded-3xl p-8 hover:shadow-strong transition-all duration-500 ${
                  service.popular ? 'ring-2 ring-accent-400/50' : ''
                }`}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                {/* Header de la carte */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-2xl ${
                      service.popular ? 'gradient-accent' : 'gradient-primary'
                    }`}>
                      <service.icon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-neutral-800 dark:text-neutral-200">
                        {service.title}
                      </h3>
                      <div className="flex items-center space-x-4 mt-1">
                        <div className="flex items-center text-sm text-neutral-500">
                          <Clock className="h-4 w-4 mr-1" />
                          {service.duration}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Fonctionnalités */}
                <div className="space-y-3 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <motion.div
                      key={featureIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.15 + featureIndex * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center space-x-3"
                    >
                      <div className="w-2 h-2 gradient-secondary rounded-full flex-shrink-0"></div>
                      <span className="text-sm text-neutral-600 dark:text-neutral-400">
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Prix et CTA */}
                <div className="border-t border-neutral-200 dark:border-neutral-700 pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-2xl font-bold gradient-rainbow bg-clip-text text-transparent">
                        {service.price}
                      </div>
                    </div>
                  </div>
                  
                  <motion.button
                    className={`w-full flex items-center justify-center space-x-2 py-4 px-6 rounded-2xl font-semibold transition-all duration-300 ${
                      service.popular
                        ? 'gradient-accent text-white hover:shadow-medium'
                        : 'glass hover:shadow-medium'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Découvrir ce service</span>
                    <ArrowRight className="h-5 w-5" />
                  </motion.button>
                </div>

                {/* Élément décoratif */}
                <motion.div
                  className="absolute bottom-4 right-4 w-16 h-16 gradient-primary/10 rounded-full -z-10"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Call to action global */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="glass rounded-3xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-serif font-bold mb-4 text-neutral-800 dark:text-neutral-200">
              Projet personnalisé ?
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
              Chaque histoire est unique. Discutons ensemble de vos besoins pour créer 
              une prestation sur mesure qui vous ressemble.
            </p>
            <motion.a
              href="#contact"
              className="inline-flex items-center space-x-2 gradient-primary text-white px-8 py-4 rounded-full font-semibold hover:shadow-medium transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Demander un devis</span>
              <ArrowRight className="h-5 w-5" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
