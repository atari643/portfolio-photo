import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    // Galeries de démonstration
    const demoGalleries = [
      {
        id: '1',
        title: 'Portraits Studio',
        description: 'Collection de portraits professionnels réalisés en studio',
        slug: 'portraits-studio',
        coverImage: '/api/placeholder/400/300',
        photoCount: 12,
        isPublished: true,
        createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
        updatedAt: new Date(Date.now() - 86400000).toISOString(),
        tags: ['portrait', 'studio', 'professionnel'],
        category: 'portraits'
      },
      {
        id: '2',
        title: 'Paysages Naturels',
        description: 'Exploration de la beauté des paysages français',
        slug: 'paysages-naturels',
        coverImage: '/api/placeholder/400/300',
        photoCount: 8,
        isPublished: false,
        createdAt: new Date(Date.now() - 86400000 * 14).toISOString(),
        updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        tags: ['paysage', 'nature', 'france'],
        category: 'paysages'
      }
    ]

    return NextResponse.json({
      galleries: demoGalleries,
      total: demoGalleries.length
    })

  } catch (error) {
    console.error('Erreur lors de la récupération des galeries:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des galeries' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, description, category, tags = [] } = await request.json()

    if (!title || !description) {
      return NextResponse.json(
        { error: 'Titre et description requis' },
        { status: 400 }
      )
    }

    const newGallery = {
      id: Date.now().toString(),
      title,
      description,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').trim('-'),
      coverImage: '/api/placeholder/400/300',
      photoCount: 0,
      isPublished: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: Array.isArray(tags) ? tags : [],
      category: category || 'uncategorized'
    }

    return NextResponse.json({
      message: 'Galerie créée avec succès',
      gallery: newGallery
    })

  } catch (error) {
    console.error('Erreur lors de la création de la galerie:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la création de la galerie' },
      { status: 500 }
    )
  }
}
