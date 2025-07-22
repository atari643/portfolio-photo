import { NextRequest, NextResponse } from 'next/server'
import { writeFile, readFile } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

interface Category {
  id: string
  name: string
  description: string
  slug: string
  color: string
  icon: string
  order: number
  createdAt: string
  photoCount: number
}

export async function GET() {
  try {
    const categoriesPath = join(process.cwd(), 'data', 'categories.json')
    
    if (!existsSync(categoriesPath)) {
      // Créer des catégories par défaut
      const defaultCategories: Category[] = [
        {
          id: '1',
          name: 'Mariage',
          description: 'Photos de mariage et céremonies',
          slug: 'mariage',
          color: '#FF6B6B',
          icon: '💒',
          order: 0,
          createdAt: new Date().toISOString(),
          photoCount: 0
        },
        {
          id: '2',
          name: 'Portrait',
          description: 'Portraits individuels et de famille',
          slug: 'portrait',
          color: '#4ECDC4',
          icon: '👤',
          order: 1,
          createdAt: new Date().toISOString(),
          photoCount: 0
        },
        {
          id: '3',
          name: 'Nature',
          description: 'Paysages et photographie nature',
          slug: 'nature',
          color: '#45B7D1',
          icon: '🌿',
          order: 2,
          createdAt: new Date().toISOString(),
          photoCount: 0
        },
        {
          id: '4',
          name: 'Architecture',
          description: 'Bâtiments et structures urbaines',
          slug: 'architecture',
          color: '#F39C12',
          icon: '🏛️',
          order: 3,
          createdAt: new Date().toISOString(),
          photoCount: 0
        }
      ]
      
      const dataDir = join(process.cwd(), 'data')
      if (!existsSync(dataDir)) {
        const { mkdir } = await import('fs/promises')
        await mkdir(dataDir, { recursive: true })
      }
      
      await writeFile(categoriesPath, JSON.stringify(defaultCategories, null, 2))
      return NextResponse.json({ categories: defaultCategories })
    }

    const data = await readFile(categoriesPath, 'utf-8')
    const categories = JSON.parse(data)

    return NextResponse.json({ categories })
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories:', error)
    return NextResponse.json({ categories: [] })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, color, icon } = body

    if (!name) {
      return NextResponse.json({
        success: false,
        error: 'Le nom de la catégorie est requis'
      }, { status: 400 })
    }

    const categoriesPath = join(process.cwd(), 'data', 'categories.json')
    const dataDir = join(process.cwd(), 'data')
    
    if (!existsSync(dataDir)) {
      const { mkdir } = await import('fs/promises')
      await mkdir(dataDir, { recursive: true })
    }

    let existingCategories: Category[] = []
    if (existsSync(categoriesPath)) {
      const data = await readFile(categoriesPath, 'utf-8')
      existingCategories = JSON.parse(data)
    }

    const newCategory: Category = {
      id: Date.now().toString(),
      name,
      description: description || '',
      slug: name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-'),
      color: color || '#6366F1',
      icon: icon || '📸',
      order: existingCategories.length,
      createdAt: new Date().toISOString(),
      photoCount: 0
    }

    const updatedCategories = [...existingCategories, newCategory]
    await writeFile(categoriesPath, JSON.stringify(updatedCategories, null, 2))

    return NextResponse.json({
      success: true,
      category: newCategory
    })

  } catch (error) {
    console.error('Erreur lors de la création de la catégorie:', error)
    return NextResponse.json({
      success: false,
      error: 'Erreur interne du serveur'
    }, { status: 500 })
  }
}
