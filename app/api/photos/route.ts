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
    // Pour la démo, retourner des photos exemples
    const demoPhotos = [
      {
        id: '1',
        filename: 'demo-1.jpg',
        originalName: 'Portrait_Studio.jpg',
        size: 2048000,
        type: 'image/jpeg',
        url: '/api/placeholder/400/600',
        uploadedAt: new Date(Date.now() - 86400000).toISOString(),
        alt: 'Portrait en studio',
        description: 'Portrait professionnel en studio avec éclairage naturel',
        tags: ['portrait', 'studio', 'professionnel'],
        category: 'portraits'
      },
      {
        id: '2',
        filename: 'demo-2.jpg',
        originalName: 'Paysage_Montagne.jpg',
        size: 3072000,
        type: 'image/jpeg',
        url: '/api/placeholder/600/400',
        uploadedAt: new Date(Date.now() - 172800000).toISOString(),
        alt: 'Paysage de montagne',
        description: 'Vue panoramique des montagnes au coucher du soleil',
        tags: ['paysage', 'montagne', 'coucher de soleil'],
        category: 'paysages'
      }
    ]

    return NextResponse.json({
      photos: demoPhotos,
      total: demoPhotos.length
    })

  } catch (error) {
    console.error('Erreur lors de la récupération des photos:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des photos' },
      { status: 500 }
    )
  }
}
