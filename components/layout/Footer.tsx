'use client'

import { motion } from 'framer-motion'
import { Camera, Heart, Mail, Instagram, Facebook, Twitter, ArrowUp } from 'lucide-react'
import { useState, useEffect } from 'react'

export function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-neutral-900 text-neutral-300">
      {/* Scroll to top button */}
      {showScrollTop && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-4 gradient-primary text-white rounded-full shadow-strong hover:shadow-medium transition-all duration-300"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowUp className="h-6 w-6" />
        </motion.button>
      )}

      {/* Background décoratif */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 gradient-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 gradient-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative">
        {/* Main footer content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
            {/* Brand section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 gradient-primary rounded-2xl">
                  <Camera className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-bold text-white">
                    Portfolio Photographe
                  </h3>
                  <p className="text-neutral-400 text-sm">
                    Art & Émotion
                  </p>
                </div>
              </div>
              
              <p className="text-neutral-400 leading-relaxed mb-6 max-w-md">
                Passionnée par l'art de capturer l'émotion pure, je transforme chaque instant 
                en souvenir éternel. Découvrez un univers où la lumière danse avec les émotions.
              </p>

              {/* Newsletter */}
              <div className="glass rounded-2xl p-6">
                <h4 className="text-lg font-semibold text-white mb-3">
                  Restez inspiré(e)
                </h4>
                <p className="text-neutral-400 text-sm mb-4">
                  Recevez mes derniers travaux et conseils photo.
                </p>
                <div className="flex space-x-3">
                  <input
                    type="email"
                    placeholder="Votre email"
                    className="flex-1 px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  />
                  <motion.button
                    className="px-4 py-2 gradient-primary text-white rounded-lg font-medium hover:shadow-medium transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Mail className="h-5 w-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Navigation links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold text-white mb-6">Navigation</h4>
              <ul className="space-y-3">
                {[
                  { name: 'Accueil', href: '#home' },
                  { name: 'À propos', href: '#about' },
                  { name: 'Galerie', href: '#gallery' },
                  { name: 'Services', href: '#services' },
                  { name: 'Contact', href: '#contact' }
                ].map((link) => (
                  <li key={link.name}>
                    <motion.a
                      href={link.href}
                      className="text-neutral-400 hover:text-white transition-colors duration-200"
                      whileHover={{ x: 5 }}
                    >
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold text-white mb-6">Services</h4>
              <ul className="space-y-3">
                {[
                  'Mariage',
                  'Portrait & Famille',
                  'Corporate',
                  'Voyage & Destination',
                  'Événements'
                ].map((service) => (
                  <li key={service}>
                    <motion.span
                      className="text-neutral-400 hover:text-white transition-colors duration-200 cursor-pointer"
                      whileHover={{ x: 5 }}
                    >
                      {service}
                    </motion.span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-neutral-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              {/* Copyright */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="flex items-center space-x-2 text-neutral-400"
              >
                <span>&copy; 2025 Portfolio Photographe.</span>
                <span>Créé avec</span>
                <Heart className="h-4 w-4 text-red-500 fill-current" />
                <span>à Paris</span>
              </motion.div>

              {/* Social links */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex items-center space-x-4"
              >
                {[
                  { icon: Instagram, href: '#', color: 'hover:text-pink-400' },
                  { icon: Facebook, href: '#', color: 'hover:text-blue-400' },
                  { icon: Twitter, href: '#', color: 'hover:text-blue-300' }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    className={`p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-all duration-300 ${social.color}`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <social.icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </motion.div>

              {/* Legal links */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="flex items-center space-x-6 text-sm text-neutral-400"
              >
                <motion.a
                  href="/mentions-legales"
                  className="hover:text-white transition-colors duration-200"
                  whileHover={{ y: -1 }}
                >
                  Mentions légales
                </motion.a>
                <motion.a
                  href="/confidentialite"
                  className="hover:text-white transition-colors duration-200"
                  whileHover={{ y: -1 }}
                >
                  Confidentialité
                </motion.a>
                <motion.a
                  href="/cgv"
                  className="hover:text-white transition-colors duration-200"
                  whileHover={{ y: -1 }}
                >
                  CGV
                </motion.a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
