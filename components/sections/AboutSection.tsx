'use client'

import { motion } from 'framer-motion'
import { Heart, MapPin, Camera, Award } from 'lucide-react'
import Image from 'next/image'

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">
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
              Mon Univers
            </span>
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            Passionnée par l'art de capturer l'émotion pure, je transforme chaque instant en souvenir éternel.
            Mon approche artistique mêle technique maîtrisée et sensibilité créative.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-strong">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-secondary-600/20"></div>
              <Image
                src="/api/placeholder/600/750"
                alt="Portrait de la photographe"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              
              {/* Éléments décoratifs */}
              <motion.div
                className="absolute top-6 right-6 w-12 h-12 gradient-accent rounded-full opacity-80"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
              />
              
              <motion.div
                className="absolute bottom-6 left-6 w-8 h-8 gradient-primary rounded-full opacity-60"
                animate={{
                  scale: [1, 0.8, 1],
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: 1,
                }}
              />
            </div>
          </motion.div>

          {/* Contenu */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Histoire */}
            <div>
              <h3 className="text-2xl font-serif font-semibold mb-4 text-neutral-800 dark:text-neutral-200">
                Mon Histoire
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                Depuis plus de 8 ans, je parcours le monde avec mon objectif, à la recherche de ces moments 
                magiques où l'émotion rencontre la lumière. Chaque cliché raconte une histoire unique, 
                chaque portrait révèle une âme.
              </p>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Formée aux Beaux-Arts et passionnée de voyage, j'apporte à chaque projet une vision 
                artistique personnelle et une approche humaine authentique.
              </p>
            </div>

            {/* Statistiques */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: Heart, number: '500+', label: 'Couples heureux' },
                { icon: Camera, number: '50k+', label: 'Photos prises' },
                { icon: MapPin, number: '25+', label: 'Pays visités' },
                { icon: Award, number: '15+', label: 'Prix remportés' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center glass p-6 rounded-2xl hover:shadow-medium transition-all duration-300"
                >
                  <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Philosophie */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="glass p-8 rounded-3xl"
            >
              <h4 className="text-xl font-serif font-semibold mb-4 text-neutral-800 dark:text-neutral-200">
                Ma Philosophie
              </h4>
              <blockquote className="italic text-neutral-600 dark:text-neutral-400 leading-relaxed border-l-4 border-primary-500 pl-4">
                "La photographie n'est pas seulement l'art de capturer la lumière, 
                c'est l'art de révéler l'invisible : les émotions, les connexions, 
                les instants précieux qui font la beauté de la vie."
              </blockquote>
            </motion.div>

            {/* Call to action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              viewport={{ once: true }}
            >
              <motion.a
                href="#contact"
                className="inline-flex items-center space-x-2 gradient-secondary text-white px-8 py-4 rounded-full font-semibold hover:shadow-medium transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Discutons de votre projet</span>
                <Heart className="h-5 w-5" />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
