import { NextRequest, NextResponse } from 'next/server'
import { writeFile, readFile } from 'fs/promises'
import { join } from 'path'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

// Interface pour les changements CMS
interface CMSChange {
  type: 'photo' | 'gallery' | 'settings' | 'content'
  action: 'create' | 'update' | 'delete'
  data: any
  timestamp: string
}

export async function POST(request: NextRequest) {
  try {
    const { message, changes } = await request.json()

    // Créer un commit Git avec les changements
    const commitMessage = message || `CMS Update: ${new Date().toISOString()}`
    
    // Ajouter tous les fichiers modifiés
    await execAsync('git add .')
    
    // Créer le commit
    await execAsync(`git commit -m "${commitMessage}"`)
    
    // Optionnel : pousser vers le dépôt distant
    try {
      await execAsync('git push origin main')
    } catch (pushError) {
      console.warn('Push failed, but commit was successful:', pushError)
    }

    // Enregistrer les métadonnées du changement
    const changeLog: CMSChange = {
      type: 'content',
      action: 'update',
      data: changes,
      timestamp: new Date().toISOString()
    }

    const changeLogPath = join(process.cwd(), 'data', 'cms', 'change-log.json')
    try {
      const existingLog = await readFile(changeLogPath, 'utf-8')
      const log = JSON.parse(existingLog)
      log.changes.push(changeLog)
      await writeFile(changeLogPath, JSON.stringify(log, null, 2))
    } catch {
      // Créer le fichier de log s'il n'existe pas
      await writeFile(changeLogPath, JSON.stringify({
        changes: [changeLog]
      }, null, 2))
    }

    return NextResponse.json({
      success: true,
      message: 'Changes saved successfully',
      commitHash: await getLatestCommitHash()
    })

  } catch (error) {
    console.error('Error saving changes:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to save changes'
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    // Récupérer l'historique des commits
    const { stdout } = await execAsync('git log --oneline -n 20')
    const commits = stdout.trim().split('\n').map(line => {
      const [hash, ...messageParts] = line.split(' ')
      return {
        hash,
        message: messageParts.join(' '),
        date: new Date().toISOString() // En réalité, il faudrait parser la date du commit
      }
    })

    return NextResponse.json({
      success: true,
      commits
    })

  } catch (error) {
    console.error('Error fetching git history:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch git history'
    }, { status: 500 })
  }
}

async function getLatestCommitHash(): Promise<string> {
  try {
    const { stdout } = await execAsync('git rev-parse HEAD')
    return stdout.trim()
  } catch {
    return 'unknown'
  }
}
