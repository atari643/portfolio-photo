import { NextRequest, NextResponse } from 'next/server'
import { writeFile, readFile } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

interface Gallery {
  id: string
  title: string
  description: string
  category: string
  photos: string[] // IDs des photos
  coverPhoto?: string
  featured: boolean
  published: boolean
  createdAt: string
  updatedAt: string
  order: number
  slug: string
}

export async function GET() {
  try {
    const galleriesPath = join(process.cwd(), 'data', 'galleries.json')
    
    if (!existsSync(galleriesPath)) {
      return NextResponse.json({ galleries: [] })
    }

    const data = await readFile(galleriesPath, 'utf-8')
    const galleries = JSON.parse(data)

    return NextResponse.json({ galleries })
  } catch (error) {
    console.error('Erreur lors de la récupération des galeries:', error)
    return NextResponse.json({ galleries: [] })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, category, photos = [], featured = false, published = true } = body

    if (!title) {
      return NextResponse.json({
        success: false,
        error: 'Le titre est requis'
      }, { status: 400 })
    }

    const galleriesPath = join(process.cwd(), 'data', 'galleries.json')
    const dataDir = join(process.cwd(), 'data')
    
    if (!existsSync(dataDir)) {
      await writeFile(galleriesPath, JSON.stringify([]))
    }

    let existingGalleries: Gallery[] = []
    if (existsSync(galleriesPath)) {
      const data = await readFile(galleriesPath, 'utf-8')
      existingGalleries = JSON.parse(data)
    }

    const newGallery: Gallery = {
      id: Date.now().toString(),
      title,
      description: description || '',
      category: category || 'Général',
      photos,
      coverPhoto: photos[0] || undefined,
      featured,
      published,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      order: existingGalleries.length,
      slug: title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')
    }

    const updatedGalleries = [...existingGalleries, newGallery]
    await writeFile(galleriesPath, JSON.stringify(updatedGalleries, null, 2))

    return NextResponse.json({
      success: true,
      gallery: newGallery
    })

  } catch (error) {
    console.error('Erreur lors de la création de la galerie:', error)
    return NextResponse.json({
      success: false,
      error: 'Erreur interne du serveur'
    }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updates } = body

    if (!id) {
      return NextResponse.json({
        success: false,
        error: 'ID de galerie requis'
      }, { status: 400 })
    }

    const galleriesPath = join(process.cwd(), 'data', 'galleries.json')
    
    if (!existsSync(galleriesPath)) {
      return NextResponse.json({
        success: false,
        error: 'Aucune galerie trouvée'
      }, { status: 404 })
    }

    const data = await readFile(galleriesPath, 'utf-8')
    const galleries = JSON.parse(data)

    const galleryIndex = galleries.findIndex((g: Gallery) => g.id === id)
    if (galleryIndex === -1) {
      return NextResponse.json({
        success: false,
        error: 'Galerie non trouvée'
      }, { status: 404 })
    }

    galleries[galleryIndex] = {
      ...galleries[galleryIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    }

    await writeFile(galleriesPath, JSON.stringify(galleries, null, 2))

    return NextResponse.json({
      success: true,
      gallery: galleries[galleryIndex]
    })

  } catch (error) {
    console.error('Erreur lors de la mise à jour de la galerie:', error)
    return NextResponse.json({
      success: false,
      error: 'Erreur interne du serveur'
    }, { status: 500 })
  }
}
