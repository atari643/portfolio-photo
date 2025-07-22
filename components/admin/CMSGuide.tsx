'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  BookOpen, 
  Upload, 
  Palette, 
  Settings, 
  Users, 
  Camera,
  ChevronRight,
  ChevronDown,
  Play,
  FileText,
  HelpCircle,
  ExternalLink,
  Lightbulb,
  Star
} from 'lucide-react'

interface GuideStep {
  id: string
  title: string
  description: string
  icon: any
  steps: string[]
  tips?: string[]
}

const guideSteps: GuideStep[] = [
  {
    id: 'getting-started',
    title: 'Premiers pas',
    description: 'Découvrez les bases du CMS Studio',
    icon: BookOpen,
    steps: [
      'Connectez-vous avec vos identifiants d\'administration',
      'Explorez le tableau de bord pour voir les statistiques',
      'Familiarisez-vous avec la navigation par onglets',
      'Consultez l\'aperçu de votre site public'
    ],
    tips: [
      'Les changements sont automatiquement sauvegardés',
      'Vous pouvez toujours voir un aperçu avant publication'
    ]
  },
  {
    id: 'upload-photos',
    title: 'Ajouter des photos',
    description: 'Téléchargez et organisez vos photos',
    icon: Upload,
    steps: [
      'Allez dans l\'onglet "Gérer Photos"',
      'Cliquez sur "Ajouter Photos" ou glissez-déposez vos images',
      'Attendez la fin du téléchargement automatique',
      'Ajoutez des titres, descriptions et catégories',
      'Marquez vos meilleures photos comme "En vedette"'
    ],
    tips: [
      'Formats acceptés: JPG, PNG, WebP (max 10MB)',
      'Les images sont automatiquement optimisées',
      'Utilisez des noms descriptifs pour le SEO'
    ]
  },
  {
    id: 'create-galleries',
    title: 'Créer des galeries',
    description: 'Organisez vos photos en collections thématiques',
    icon: Camera,
    steps: [
      'Rendez-vous dans l\'onglet "Galeries"',
      'Cliquez sur "Nouvelle Galerie"',
      'Donnez un titre et une description',
      'Sélectionnez les photos à inclure',
      'Choisissez une photo de couverture',
      'Définissez la catégorie et les options'
    ],
    tips: [
      'Vous pouvez réorganiser les galeries par glisser-déposer',
      'Les galeries en "brouillon" ne sont pas visibles publiquement'
    ]
  },
  {
    id: 'customize-design',
    title: 'Personnaliser l\'apparence',
    description: 'Adaptez les couleurs et le style à votre image',
    icon: Palette,
    steps: [
      'Accédez à l\'onglet "Personnalisation"',
      'Choisissez une palette de couleurs prédéfinie',
      'Ou personnalisez chaque couleur individuellement',
      'Sélectionnez la police de caractères',
      'Ajustez les options de mise en page',
      'Prévisualisez en temps réel sur différents écrans'
    ],
    tips: [
      'Les changements sont visibles instantanément',
      'Sauvegardez régulièrement vos modifications'
    ]
  },
  {
    id: 'site-settings',
    title: 'Configurer le site',
    description: 'Paramètres généraux et informations de contact',
    icon: Settings,
    steps: [
      'Ouvrez l\'onglet "Paramètres"',
      'Renseignez les informations de base (nom, slogan)',
      'Ajoutez vos coordonnées de contact',
      'Configurez les réseaux sociaux',
      'Optimisez les paramètres SEO',
      'Définissez les options de galerie'
    ],
    tips: [
      'Le SEO est crucial pour être trouvé sur Google',
      'Ajoutez des mots-clés pertinents'
    ]
  },
  {
    id: 'collaboration',
    title: 'Gestion collaborative',
    description: 'Invitez d\'autres utilisateurs et gérez les accès',
    icon: Users,
    steps: [
      'Créez des comptes pour vos collaborateurs',
      'Définissez les niveaux d\'accès (admin, éditeur)',
      'Partagez les liens d\'accès sécurisés',
      'Suivez l\'activité dans l\'historique',
      'Gérez les permissions par section'
    ],
    tips: [
      'Chaque action est tracée et réversible',
      'Les collaborateurs peuvent travailler simultanément'
    ]
  }
]

const quickTips = [
  {
    title: 'Raccourcis clavier',
    content: 'Ctrl+S pour sauvegarder, Ctrl+Z pour annuler, Ctrl+Shift+P pour aperçu'
  },
  {
    title: 'Upload en lot',
    content: 'Sélectionnez plusieurs fichiers en maintenant Ctrl+clic'
  },
  {
    title: 'Recherche rapide',
    content: 'Utilisez la barre de recherche pour trouver rapidement photos et galeries'
  },
  {
    title: 'Aperçu mobile',
    content: 'Testez toujours l\'affichage sur mobile avec l\'aperçu responsive'
  }
]

export function CMSGuide() {
  const [activeStep, setActiveStep] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('guide')

  const toggleStep = (stepId: string) => {
    setActiveStep(activeStep === stepId ? null : stepId)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
          <BookOpen className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Guide d'utilisation CMS Studio
        </h1>
        <p className="text-lg text-slate-600">
          Apprenez à maîtriser votre système de gestion de contenu en quelques minutes
        </p>
      </div>

      {/* Navigation */}
      <div className="flex justify-center">
        <div className="flex bg-slate-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('guide')}
            className={`px-4 py-2 rounded font-medium transition-colors ${
              activeTab === 'guide' ? 'bg-white shadow text-blue-600' : 'text-slate-600'
            }`}
          >
            Guide pas à pas
          </button>
          <button
            onClick={() => setActiveTab('tips')}
            className={`px-4 py-2 rounded font-medium transition-colors ${
              activeTab === 'tips' ? 'bg-white shadow text-blue-600' : 'text-slate-600'
            }`}
          >
            Astuces rapides
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className={`px-4 py-2 rounded font-medium transition-colors ${
              activeTab === 'faq' ? 'bg-white shadow text-blue-600' : 'text-slate-600'
            }`}
          >
            FAQ
          </button>
        </div>
      </div>

      {/* Contenu */}
      <AnimatePresence mode="wait">
        {activeTab === 'guide' && (
          <motion.div
            key="guide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {guideSteps.map((step, index) => {
              const Icon = step.icon
              const isActive = activeStep === step.id
              
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white rounded-xl border-2 transition-all duration-300 ${
                    isActive ? 'border-blue-500 shadow-lg' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <button
                    onClick={() => toggleStep(step.id)}
                    className="w-full p-6 text-left flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg ${
                        isActive ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">
                          {index + 1}. {step.title}
                        </h3>
                        <p className="text-slate-600">{step.description}</p>
                      </div>
                    </div>
                    {isActive ? (
                      <ChevronDown className="h-5 w-5 text-slate-400" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-slate-400" />
                    )}
                  </button>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 border-t border-slate-100">
                          <div className="grid md:grid-cols-2 gap-6 mt-4">
                            {/* Étapes */}
                            <div>
                              <h4 className="font-medium text-slate-900 mb-3">Étapes à suivre :</h4>
                              <ol className="space-y-2">
                                {step.steps.map((stepText, stepIndex) => (
                                  <li key={stepIndex} className="flex items-start space-x-3">
                                    <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mt-0.5">
                                      {stepIndex + 1}
                                    </span>
                                    <span className="text-slate-700">{stepText}</span>
                                  </li>
                                ))}
                              </ol>
                            </div>

                            {/* Conseils */}
                            {step.tips && (
                              <div>
                                <h4 className="font-medium text-slate-900 mb-3 flex items-center">
                                  <Lightbulb className="h-4 w-4 text-yellow-500 mr-2" />
                                  Conseils utiles :
                                </h4>
                                <ul className="space-y-2">
                                  {step.tips.map((tip, tipIndex) => (
                                    <li key={tipIndex} className="flex items-start space-x-2">
                                      <Star className="h-4 w-4 text-yellow-500 mt-1 flex-shrink-0" />
                                      <span className="text-slate-600 text-sm">{tip}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </motion.div>
        )}

        {activeTab === 'tips' && (
          <motion.div
            key="tips"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid md:grid-cols-2 gap-6"
          >
            {quickTips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Lightbulb className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">{tip.title}</h4>
                    <p className="text-slate-600 text-sm">{tip.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === 'faq' && (
          <motion.div
            key="faq"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {/* FAQ à implémenter */}
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Questions fréquentes</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-slate-900 mb-2">Comment modifier les couleurs de mon site ?</h4>
                  <p className="text-slate-600 text-sm">
                    Rendez-vous dans l'onglet "Personnalisation", choisissez une palette prédéfinie ou personnalisez chaque couleur individuellement.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-slate-900 mb-2">Mes photos sont-elles automatiquement sauvegardées ?</h4>
                  <p className="text-slate-600 text-sm">
                    Oui, toutes vos photos et modifications sont automatiquement sauvegardées dans votre espace de stockage sécurisé.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-slate-900 mb-2">Puis-je inviter d'autres personnes à collaborer ?</h4>
                  <p className="text-slate-600 text-sm">
                    Absolument ! Vous pouvez créer des comptes collaborateurs avec différents niveaux d'accès selon leurs besoins.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer avec liens utiles */}
      <div className="bg-slate-50 rounded-xl p-6 text-center">
        <h3 className="font-semibold text-slate-900 mb-4">Besoin d'aide supplémentaire ?</h3>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-200 rounded-lg hover:shadow-md transition-all duration-300">
            <FileText className="h-4 w-4 text-slate-600" />
            <span className="text-slate-700">Documentation complète</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-200 rounded-lg hover:shadow-md transition-all duration-300">
            <Play className="h-4 w-4 text-slate-600" />
            <span className="text-slate-700">Tutoriels vidéo</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-200 rounded-lg hover:shadow-md transition-all duration-300">
            <HelpCircle className="h-4 w-4 text-slate-600" />
            <span className="text-slate-700">Support technique</span>
          </button>
        </div>
      </div>
    </div>
  )
}
