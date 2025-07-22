import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Statistiques de démonstration
    const stats = {
      photos: {
        total: 45,
        thisWeek: 8,
        thisMonth: 23,
        trending: [
          { name: 'Portraits', count: 18 },
          { name: 'Paysages', count: 15 },
          { name: 'Événements', count: 12 }
        ]
      },
      galleries: {
        total: 12,
        published: 8,
        draft: 4,
        recent: [
          { id: '1', title: 'Portraits Studio', views: 234 },
          { id: '2', title: 'Mariage Sarah & Tom', views: 189 },
          { id: '3', title: 'Paysages Automne', views: 156 }
        ]
      },
      traffic: {
        totalViews: 2847,
        uniqueVisitors: 1654,
        thisWeek: 423,
        topPages: [
          { page: '/galerie', views: 890 },
          { page: '/blog', views: 567 },
          { page: '/contact', views: 432 }
        ]
      },
      performance: {
        loadTime: 1.2,
        seoScore: 95,
        mobileScore: 88,
        accessibility: 92
      },
      recent: {
        uploads: [
          {
            id: '1',
            name: 'Portrait_Studio_01.jpg',
            uploadedAt: new Date(Date.now() - 3600000).toISOString()
          },
          {
            id: '2', 
            name: 'Paysage_Montagne_02.jpg',
            uploadedAt: new Date(Date.now() - 7200000).toISOString()
          }
        ],
        comments: [
          {
            id: '1',
            author: 'Marie L.',
            text: 'Magnifiques photos !',
            createdAt: new Date(Date.now() - 1800000).toISOString()
          }
        ]
      }
    }

    return NextResponse.json(stats)

  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des statistiques' },
      { status: 500 }
    )
  }
}
