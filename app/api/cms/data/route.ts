import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import fs from 'fs'
import path from 'path'

// Simulation d'une base de données en fichier JSON
const DATA_DIR = path.join(process.cwd(), 'data')
const DATA_FILE = path.join(DATA_DIR, 'cms-data.json')

// Créer le dossier data s'il n'existe pas
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}

// Structure de données par défaut
const defaultData = {
  photos: [],
  galleries: [
    {
      id: 'default',
      title: 'Galerie par défaut',
      description: 'Galerie principale pour vos photos',
      slug: 'default',
      coverImage: '',
      photos: [],
      order: 0,
      published: true,
      createdAt: new Date().toISOString()
    }
  ],
  settings: {
    siteName: 'Portfolio Photographe',
    tagline: 'Capturer les moments précieux',
    description: 'Portfolio professionnel de photographie',
    contact: {
      email: 'contact@photographe.com',
      phone: '+33 6 12 34 56 78',
      address: 'Paris, France',
      social: {
        instagram: '@photographe',
        facebook: 'photographe',
        twitter: '@photographe'
      }
    },
    seo: {
      metaTitle: 'Portfolio Photographe - Photographie Professionnelle',
      metaDescription: 'Découvrez mon travail de photographe professionnel',
      keywords: ['photographie', 'portrait', 'mariage', 'événementiel']
    }
  },
  theme: {
    primaryColor: '#1f2937',
    secondaryColor: '#f9fafb',
    accentColor: '#ef4444',
    fontPrimary: 'Inter',
    fontSecondary: 'Playfair Display',
    headerStyle: 'modern',
    galleryLayout: 'grid'
  }
}

function loadData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf8')
      return JSON.parse(data)
    }
  } catch (error) {
    console.error('Erreur lors du chargement des données:', error)
  }
  return defaultData
}

function saveData(data: any) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2))
    return true
  } catch (error) {
    console.error('Erreur lors de la sauvegarde:', error)
    return false
  }
}

export async function GET() {
  try {
    // Vérifier l'authentification
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const data = loadData()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Erreur API:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const body = await request.json()
    const { type, data: updateData } = body

    const currentData = loadData()

    switch (type) {
      case 'UPDATE_SETTINGS':
        currentData.settings = { ...currentData.settings, ...updateData }
        break
      
      case 'UPDATE_THEME':
        currentData.theme = { ...currentData.theme, ...updateData }
        break
      
      default:
        return NextResponse.json({ error: 'Type de mise à jour non supporté' }, { status: 400 })
    }

    if (saveData(currentData)) {
      return NextResponse.json({ success: true, data: currentData })
    } else {
      return NextResponse.json({ error: 'Erreur lors de la sauvegarde' }, { status: 500 })
    }
  } catch (error) {
    console.error('Erreur API:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
