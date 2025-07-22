import { NextRequest, NextResponse } from 'next/server'
import { writeFile, readFile } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

interface SiteSettings {
  id: string
  siteName: string
  tagline: string
  description: string
  logo?: string
  favicon?: string
  primaryColor: string
  secondaryColor: string
  accentColor: string
  fontFamily: string
  socialLinks: {
    instagram?: string
    facebook?: string
    twitter?: string
    linkedin?: string
    pinterest?: string
  }
  contactInfo: {
    email: string
    phone?: string
    address?: string
    city?: string
    country?: string
  }
  seoSettings: {
    metaTitle: string
    metaDescription: string
    keywords: string[]
    ogImage?: string
  }
  gallerySettings: {
    itemsPerPage: number
    showMetadata: boolean
    enableLightbox: boolean
    enableDownload: boolean
  }
  updatedAt: string
}

const defaultSettings: SiteSettings = {
  id: 'main-settings',
  siteName: 'Portfolio Photographe',
  tagline: 'Capturer les moments précieux',
  description: 'Portfolio professionnel de photographie spécialisé dans les mariages, portraits et nature.',
  primaryColor: '#6366F1',
  secondaryColor: '#8B5CF6',
  accentColor: '#EC4899',
  fontFamily: 'Inter',
  socialLinks: {
    instagram: '',
    facebook: '',
    twitter: '',
    linkedin: '',
    pinterest: ''
  },
  contactInfo: {
    email: 'contact@photographe.com',
    phone: '',
    address: '',
    city: '',
    country: 'France'
  },
  seoSettings: {
    metaTitle: 'Portfolio Photographe Professionnel',
    metaDescription: 'Découvrez le portfolio d\'une photographe professionnelle spécialisée dans les mariages, portraits et photographie artistique.',
    keywords: ['photographe', 'mariage', 'portrait', 'photographie', 'professionnel'],
    ogImage: ''
  },
  gallerySettings: {
    itemsPerPage: 12,
    showMetadata: true,
    enableLightbox: true,
    enableDownload: false
  },
  updatedAt: new Date().toISOString()
}

export async function GET() {
  try {
    const settingsPath = join(process.cwd(), 'data', 'settings.json')
    
    if (!existsSync(settingsPath)) {
      const dataDir = join(process.cwd(), 'data')
      if (!existsSync(dataDir)) {
        const { mkdir } = await import('fs/promises')
        await mkdir(dataDir, { recursive: true })
      }
      
      await writeFile(settingsPath, JSON.stringify(defaultSettings, null, 2))
      return NextResponse.json({ settings: defaultSettings })
    }

    const data = await readFile(settingsPath, 'utf-8')
    const settings = JSON.parse(data)

    return NextResponse.json({ settings })
  } catch (error) {
    console.error('Erreur lors de la récupération des paramètres:', error)
    return NextResponse.json({ settings: defaultSettings })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const updates = body.settings || body

    const settingsPath = join(process.cwd(), 'data', 'settings.json')
    const dataDir = join(process.cwd(), 'data')
    
    if (!existsSync(dataDir)) {
      const { mkdir } = await import('fs/promises')
      await mkdir(dataDir, { recursive: true })
    }

    let currentSettings = defaultSettings
    if (existsSync(settingsPath)) {
      const data = await readFile(settingsPath, 'utf-8')
      currentSettings = JSON.parse(data)
    }

    const updatedSettings = {
      ...currentSettings,
      ...updates,
      updatedAt: new Date().toISOString()
    }

    await writeFile(settingsPath, JSON.stringify(updatedSettings, null, 2))

    return NextResponse.json({
      success: true,
      settings: updatedSettings
    })

  } catch (error) {
    console.error('Erreur lors de la mise à jour des paramètres:', error)
    return NextResponse.json({
      success: false,
      error: 'Erreur interne du serveur'
    }, { status: 500 })
  }
}
