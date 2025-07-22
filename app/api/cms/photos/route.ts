import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

// Configuration pour l'upload de fichiers
export const runtime = 'nodejs'

interface UploadResponse {
  success: boolean
  files?: {
    id: string
    filename: string
    path: string
    size: number
    type: string
    url: string
  }[]
  error?: string
}

export async function POST(request: NextRequest): Promise<NextResponse<UploadResponse>> {
  try {
    const formData = await request.formData()
    const files = formData.getAll('files') as File[]
    
    if (!files || files.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Aucun fichier reçu'
      }, { status: 400 })
    }

    // Créer le dossier d'upload s'il n'existe pas
    const uploadDir = join(process.cwd(), 'public', 'uploads', 'photos')
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    const uploadedFiles: {
      id: string
      filename: string
      path: string
      size: number
      type: string
      url: string
    }[] = []

    for (const file of files) {
      // Validation du type de fichier
      if (!file.type.startsWith('image/')) {
        return NextResponse.json({
          success: false,
          error: `Type de fichier non supporté: ${file.type}`
        }, { status: 400 })
      }

      // Validation de la taille (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        return NextResponse.json({
          success: false,
          error: 'Fichier trop volumineux (max 10MB)'
        }, { status: 400 })
      }

      // Générer un nom de fichier unique
      const timestamp = Date.now()
      const randomId = Math.random().toString(36).substring(2)
      const extension = file.name.split('.').pop()
      const filename = `${timestamp}-${randomId}.${extension}`
      
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      
      const filePath = join(uploadDir, filename)
      await writeFile(filePath, buffer)
      
      uploadedFiles.push({
        id: `${timestamp}-${randomId}`,
        filename: file.name,
        path: filePath,
        size: file.size,
        type: file.type,
        url: `/uploads/photos/${filename}`
      })
    }

    // Sauvegarder les métadonnées dans un fichier JSON
    await updatePhotosMetadata(uploadedFiles)

    return NextResponse.json({
      success: true,
      files: uploadedFiles
    })

  } catch (error) {
    console.error('Erreur lors de l\'upload:', error)
    return NextResponse.json({
      success: false,
      error: 'Erreur interne du serveur'
    }, { status: 500 })
  }
}

// Fonction pour mettre à jour les métadonnées des photos
async function updatePhotosMetadata(newFiles: any[]) {
  const metadataPath = join(process.cwd(), 'data', 'photos.json')
  const metadataDir = join(process.cwd(), 'data')
  
  if (!existsSync(metadataDir)) {
    await mkdir(metadataDir, { recursive: true })
  }

  let existingData = []
  if (existsSync(metadataPath)) {
    const fs = await import('fs/promises')
    const data = await fs.readFile(metadataPath, 'utf-8')
    existingData = JSON.parse(data)
  }

  const enhancedFiles = newFiles.map(file => ({
    ...file,
    title: file.filename.replace(/\.[^/.]+$/, ""), // nom sans extension
    description: '',
    category: 'Non catégorisé',
    tags: [],
    featured: false,
    published: true,
    uploadedAt: new Date().toISOString(),
    views: 0,
    // Nouvelles métadonnées pour portfolio
    subtitle: '',
    location: '',
    dateTaken: '',
    camera: '',
    lens: '',
    settings: {
      aperture: '',
      shutter: '',
      iso: '',
      focalLength: ''
    },
    client: '',
    project: '',
    mood: '',
    colorPalette: [],
    technicalNotes: '',
    seoAlt: '',
    socialDescription: '',
    price: null,
    license: 'personal',
    keywords: [],
    rating: null,
    isPrivate: false
  }))

  const updatedData = [...existingData, ...enhancedFiles]
  
  const fs = await import('fs/promises')
  await fs.writeFile(metadataPath, JSON.stringify(updatedData, null, 2))
}

export async function GET() {
  try {
    const metadataPath = join(process.cwd(), 'data', 'photos.json')
    
    if (!existsSync(metadataPath)) {
      return NextResponse.json({ photos: [] })
    }

    const fs = await import('fs/promises')
    const data = await fs.readFile(metadataPath, 'utf-8')
    const photos = JSON.parse(data)

    return NextResponse.json({ photos })
  } catch (error) {
    console.error('Erreur lors de la récupération des photos:', error)
    return NextResponse.json({ photos: [] })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, ...updateData } = await request.json()
    
    if (!id) {
      return NextResponse.json({
        success: false,
        error: 'ID de la photo requis'
      }, { status: 400 })
    }

    const metadataPath = join(process.cwd(), 'data', 'photos.json')
    
    if (!existsSync(metadataPath)) {
      return NextResponse.json({
        success: false,
        error: 'Aucune photo trouvée'
      }, { status: 404 })
    }

    const fs = await import('fs/promises')
    const data = await fs.readFile(metadataPath, 'utf-8')
    const photos = JSON.parse(data)

    const photoIndex = photos.findIndex((photo: any) => photo.id === id)
    
    if (photoIndex === -1) {
      return NextResponse.json({
        success: false,
        error: 'Photo non trouvée'
      }, { status: 404 })
    }

    // Mettre à jour la photo avec les nouvelles données
    photos[photoIndex] = {
      ...photos[photoIndex],
      ...updateData,
      updatedAt: new Date().toISOString()
    }

    await fs.writeFile(metadataPath, JSON.stringify(photos, null, 2))

    return NextResponse.json({
      success: true,
      photo: photos[photoIndex]
    })
  } catch (error) {
    console.error('Erreur lors de la mise à jour:', error)
    return NextResponse.json({
      success: false,
      error: 'Erreur interne du serveur'
    }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({
        success: false,
        error: 'ID de la photo requis'
      }, { status: 400 })
    }

    const metadataPath = join(process.cwd(), 'data', 'photos.json')
    
    if (!existsSync(metadataPath)) {
      return NextResponse.json({
        success: false,
        error: 'Aucune photo trouvée'
      }, { status: 404 })
    }

    const fs = await import('fs/promises')
    const data = await fs.readFile(metadataPath, 'utf-8')
    const photos = JSON.parse(data)

    const photoIndex = photos.findIndex((photo: any) => photo.id === id)
    
    if (photoIndex === -1) {
      return NextResponse.json({
        success: false,
        error: 'Photo non trouvée'
      }, { status: 404 })
    }

    // Supprimer la photo du tableau
    const deletedPhoto = photos.splice(photoIndex, 1)[0]
    
    await fs.writeFile(metadataPath, JSON.stringify(photos, null, 2))

    // Optionnel: supprimer le fichier physique
    try {
      await fs.unlink(deletedPhoto.path)
    } catch (fileError) {
      console.warn('Erreur lors de la suppression du fichier:', fileError)
    }

    return NextResponse.json({
      success: true,
      message: 'Photo supprimée avec succès'
    })
  } catch (error) {
    console.error('Erreur lors de la suppression:', error)
    return NextResponse.json({
      success: false,
      error: 'Erreur interne du serveur'
    }, { status: 500 })
  }
}
