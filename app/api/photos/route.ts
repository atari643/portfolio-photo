import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll('files') as File[]
    
    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'Aucun fichier fourni' },
        { status: 400 }
      )
    }

    const uploadDir = join(process.cwd(), 'public', 'uploads', 'photos')
    
    // Créer le dossier s'il n'existe pas
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    const uploadedFiles = []

    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        continue // Ignorer les fichiers non-image
      }

      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      // Générer un nom de fichier unique
      const timestamp = Date.now()
      const filename = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
      const filepath = join(uploadDir, filename)

      await writeFile(filepath, buffer)

      const photoData = {
        id: timestamp.toString(),
        filename,
        originalName: file.name,
        size: file.size,
        type: file.type,
        url: `/uploads/photos/${filename}`,
        uploadedAt: new Date().toISOString(),
        alt: '',
        description: '',
        tags: [],
        category: 'uncategorized'
      }

      uploadedFiles.push(photoData)
    }

    return NextResponse.json({
      message: `${uploadedFiles.length} fichier(s) uploadé(s) avec succès`,
      photos: uploadedFiles
    })

  } catch (error) {
    console.error('Erreur lors de l\'upload:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'upload des fichiers' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const metadataPath = join(process.cwd(), 'data', 'photos.json')
    
    if (!existsSync(metadataPath)) {
      // Si pas de fichier, retourner des photos de démo
      const demoPhotos = [
        {
          id: '1',
          title: 'Portrait Studio',
          description: 'Portrait professionnel en studio avec éclairage naturel',
          url: '/api/placeholder/400/600',
          category: 'portraits',
          tags: ['portrait', 'studio', 'professionnel'],
          featured: true,
          published: true,
          alt: 'Portrait en studio',
          views: 45
        },
        {
          id: '2',
          title: 'Paysage Montagne',
          description: 'Vue panoramique des montagnes au coucher du soleil',
          url: '/api/placeholder/600/400',
          category: 'paysages',
          tags: ['paysage', 'montagne', 'coucher de soleil'],
          featured: true,
          published: true,
          alt: 'Paysage de montagne',
          views: 73
        },
        {
          id: '3',
          title: 'Portrait Couple',
          description: 'Séance photo de couple dans la nature',
          url: '/api/placeholder/500/600',
          category: 'portraits',
          tags: ['portrait', 'couple', 'nature'],
          featured: false,
          published: true,
          alt: 'Portrait de couple',
          views: 28
        }
      ]

      return NextResponse.json({
        photos: demoPhotos,
        total: demoPhotos.length
      })
    }

    const fs = await import('fs/promises')
    const data = await fs.readFile(metadataPath, 'utf-8')
    const allPhotos = JSON.parse(data)

    // Filtrer seulement les photos publiées
    const publishedPhotos = allPhotos.filter((photo: any) => photo.published !== false)

    // Formater les données pour l'API publique
    const publicPhotos = publishedPhotos.map((photo: any) => ({
      id: photo.id,
      title: photo.title || photo.filename || 'Sans titre',
      description: photo.description || '',
      url: photo.url,
      thumbnail: photo.thumbnail || photo.url,
      category: photo.category || 'general',
      tags: photo.tags || [],
      featured: photo.featured || false,
      alt: photo.alt || photo.title || photo.filename || '',
      views: photo.views || 0
    }))

    return NextResponse.json({
      photos: publicPhotos,
      total: publicPhotos.length
    })

  } catch (error) {
    console.error('Erreur lors de la récupération des photos:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des photos' },
      { status: 500 }
    )
  }
}
