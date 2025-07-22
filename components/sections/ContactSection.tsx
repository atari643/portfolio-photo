'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Send, Phone, Mail, MapPin, Clock, Instagram, Facebook, Twitter } from 'lucide-react'
import toast from 'react-hot-toast'

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    date: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulation d'envoi (remplacez par votre logique d'envoi)
    await new Promise(resolve => setTimeout(resolve, 2000))

    toast.success('Message envoyé avec succès ! Je vous recontacterai rapidement.', {
      icon: '📧',
      duration: 5000,
    })

    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      message: '',
      date: ''
    })
    setIsSubmitting(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">
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
              Contactez-moi
            </span>
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            Prêt(e) à donner vie à votre projet ? Parlons de votre vision et créons ensemble 
            des souvenirs qui vous ressemblent.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Informations de contact */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h3 className="text-2xl font-serif font-bold mb-6 text-neutral-800 dark:text-neutral-200">
                Parlons de votre projet
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
                N'hésitez pas à me contacter pour discuter de vos besoins. 
                Je serais ravie d'échanger avec vous sur votre vision et vos attentes.
              </p>
            </div>

            {/* Coordonnées */}
            <div className="space-y-6">
              {[
                {
                  icon: Phone,
                  title: 'Téléphone',
                  content: '+33 6 12 34 56 78',
                  action: 'tel:+33612345678'
                },
                {
                  icon: Mail,
                  title: 'Email',
                  content: 'contact@votre-domaine.com',
                  action: 'mailto:contact@votre-domaine.com'
                },
                {
                  icon: MapPin,
                  title: 'Localisation',
                  content: 'Paris & Île-de-France',
                  action: null
                },
                {
                  icon: Clock,
                  title: 'Disponibilité',
                  content: 'Lun-Sam, 9h-19h',
                  action: null
                }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4"
                >
                  <div className="p-3 gradient-primary rounded-2xl">
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
                      {item.title}
                    </h4>
                    {item.action ? (
                      <a
                        href={item.action}
                        className="text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                      >
                        {item.content}
                      </a>
                    ) : (
                      <p className="text-neutral-600 dark:text-neutral-400">
                        {item.content}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Réseaux sociaux */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="pt-8 border-t border-neutral-200 dark:border-neutral-700"
            >
              <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
                Suivez-moi
              </h4>
              <div className="flex space-x-4">
                {[
                  { icon: Instagram, href: '#', color: 'hover:text-pink-500' },
                  { icon: Facebook, href: '#', color: 'hover:text-blue-500' },
                  { icon: Twitter, href: '#', color: 'hover:text-blue-400' }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    className={`p-3 glass rounded-xl transition-all duration-300 ${social.color}`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <social.icon className="h-6 w-6" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Formulaire de contact */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="glass rounded-3xl p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-600 glass focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    placeholder="Votre nom"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-600 glass focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-600 glass focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    placeholder="06 12 34 56 78"
                  />
                </div>
                
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Type de prestation
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-600 glass focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Choisissez un service</option>
                    <option value="mariage">Mariage</option>
                    <option value="portrait">Portrait & Famille</option>
                    <option value="entreprise">Photographie Corporate</option>
                    <option value="voyage">Destination & Voyage</option>
                    <option value="autre">Autre / Projet personnalisé</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="date" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Date souhaitée
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-600 glass focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-600 glass focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Parlez-moi de votre projet, vos attentes, votre vision..."
                ></textarea>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center space-x-2 gradient-primary text-white py-4 px-8 rounded-2xl font-semibold hover:shadow-medium transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <div className="loading-dots">Envoi en cours</div>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>Envoyer le message</span>
                  </>
                )}
              </motion.button>

              <p className="text-xs text-neutral-500 text-center">
                * Champs obligatoires. Vos données sont protégées et ne seront jamais partagées.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
