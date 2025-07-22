'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Sparkles, Camera } from 'lucide-react'
import { useEffect, useState } from 'react'

export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background avec gradient animé */}
      <div className="absolute inset-0 gradient-rainbow opacity-10"></div>
      
      {/* Particles animées */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Badge animé */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="inline-flex items-center space-x-2 glass px-4 py-2 rounded-full">
            <Sparkles className="h-4 w-4 text-accent-500" />
            <span className="text-sm font-medium">Capturer l'émotion</span>
          </div>
        </motion.div>

        {/* Titre principal */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold mb-6"
        >
          <span className="block gradient-text-rainbow">
            Photographe
          </span>
          <span className="block text-neutral-800 dark:text-neutral-200">
            d'Art & d'Émotion
          </span>
        </motion.h1>

        {/* Sous-titre */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          Chaque cliché raconte une histoire unique. Découvrez un univers où la lumière 
          danse avec les émotions pour créer des souvenirs intemporels.
        </motion.p>

        {/* Boutons d'action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <motion.a
            href="#gallery"
            className="group inline-flex items-center space-x-2 gradient-primary text-white px-8 py-4 rounded-full font-semibold shadow-medium hover:shadow-strong transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Camera className="h-5 w-5" />
            <span>Découvrir mon travail</span>
          </motion.a>

          <motion.a
            href="#contact"
            className="group inline-flex items-center space-x-2 glass px-8 py-4 rounded-full font-semibold hover:shadow-medium transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Me contacter</span>
          </motion.a>
        </motion.div>

        {/* Indicateur de scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col items-center"
        >
          <span className="text-sm text-neutral-500 mb-2">Explorez</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="p-2 rounded-full glass hover:shadow-medium transition-all duration-300 cursor-pointer"
          >
            <ArrowDown className="h-5 w-5 text-primary-600" />
          </motion.div>
        </motion.div>
      </div>

      {/* Élément décoratif */}
      <motion.div
        className="absolute bottom-10 left-10 w-20 h-20 gradient-secondary rounded-full opacity-20"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
      />
      
      <motion.div
        className="absolute top-1/4 right-10 w-16 h-16 gradient-accent rounded-full opacity-20"
        animate={{
          scale: [1, 0.8, 1],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
      />
    </section>
  )
}
