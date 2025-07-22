import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ dimensions: string }> }
) {
  try {
    const { dimensions } = await params
    const [width, height] = dimensions.split('x').map(d => parseInt(d) || 400)
    
    // Créer une SVG simple comme placeholder
    const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#6366f1;stop-opacity:0.8" />
            <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:0.8" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad)" />
        <text x="50%" y="50%" text-anchor="middle" dy=".3em" 
              font-family="Arial, sans-serif" font-size="16" fill="white" opacity="0.9">
          ${width} × ${height}
        </text>
        <circle cx="25%" cy="25%" r="20" fill="white" opacity="0.2" />
        <circle cx="75%" cy="75%" r="15" fill="white" opacity="0.1" />
      </svg>
    `

    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })

  } catch (error) {
    console.error('Erreur lors de la génération du placeholder:', error)
    
    // Fallback simple
    const fallbackSvg = `
      <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#e5e7eb" />
        <text x="50%" y="50%" text-anchor="middle" dy=".3em" 
              font-family="Arial, sans-serif" font-size="14" fill="#9ca3af">
          Image
        </text>
      </svg>
    `

    return new NextResponse(fallbackSvg, {
      headers: {
        'Content-Type': 'image/svg+xml',
      },
    })
  }
}
