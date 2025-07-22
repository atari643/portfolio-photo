import { useEffect, useRef, useState } from 'react'
import { cmsToast } from './toast'

interface AutoSaveConfig {
  interval?: number // en millisecondes, défaut: 5 minutes
  enabled?: boolean
  onSave?: () => Promise<void>
}

export function useAutoSave({ 
  interval = 5 * 60 * 1000, // 5 minutes par défaut
  enabled = true,
  onSave
}: AutoSaveConfig = {}) {
  const [hasChanges, setHasChanges] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const intervalRef = useRef<NodeJS.Timeout>()
  const changesRef = useRef(false)

  // Marquer qu'il y a des changements
  const markDirty = () => {
    setHasChanges(true)
    changesRef.current = true
  }

  // Marquer comme sauvegardé
  const markClean = () => {
    setHasChanges(false)
    changesRef.current = false
    setLastSaved(new Date())
  }

  // Fonction de sauvegarde
  const save = async () => {
    if (!changesRef.current || isSaving) return

    setIsSaving(true)
    try {
      if (onSave) {
        await onSave()
      } else {
        // Sauvegarde par défaut
        await fetch('/api/cms/save-changes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            message: `Auto-save: ${new Date().toISOString()}`,
            timestamp: new Date().toISOString()
          })
        })
      }
      
      markClean()
      cmsToast.gitSaved()
    } catch (error) {
      console.error('Auto-save failed:', error)
      cmsToast.error('Erreur lors de la sauvegarde automatique')
    } finally {
      setIsSaving(false)
    }
  }

  // Sauvegarde manuelle
  const saveNow = () => {
    if (hasChanges) {
      save()
    }
  }

  // Effet pour la sauvegarde automatique
  useEffect(() => {
    if (!enabled) return

    intervalRef.current = setInterval(() => {
      if (changesRef.current && !isSaving) {
        save()
      }
    }, interval)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [enabled, interval, isSaving])

  // Sauvegarde avant fermeture de la page
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasChanges) {
        e.preventDefault()
        e.returnValue = 'Vous avez des modifications non sauvegardées. Êtes-vous sûr de vouloir quitter ?'
        return e.returnValue
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [hasChanges])

  return {
    hasChanges,
    isSaving,
    lastSaved,
    markDirty,
    markClean,
    saveNow
  }
}

// Hook pour détecter les changements dans un formulaire
export function useFormAutoSave<T>(
  initialData: T,
  onSave: (data: T) => Promise<void>,
  config?: AutoSaveConfig
) {
  const [data, setData] = useState<T>(initialData)
  const [isDirty, setIsDirty] = useState(false)
  
  const autoSave = useAutoSave({
    ...config,
    onSave: () => onSave(data)
  })

  useEffect(() => {
    const hasChanged = JSON.stringify(data) !== JSON.stringify(initialData)
    setIsDirty(hasChanged)
    
    if (hasChanged) {
      autoSave.markDirty()
    } else {
      autoSave.markClean()
    }
  }, [data, initialData])

  const updateData = (updates: Partial<T>) => {
    setData(prev => ({ ...prev, ...updates }))
  }

  const resetData = () => {
    setData(initialData)
    setIsDirty(false)
    autoSave.markClean()
  }

  return {
    data,
    isDirty,
    updateData,
    resetData,
    saveNow: autoSave.saveNow,
    isSaving: autoSave.isSaving,
    lastSaved: autoSave.lastSaved
  }
}

// Composant indicateur de statut de sauvegarde
export function SaveStatus({ 
  hasChanges, 
  isSaving, 
  lastSaved 
}: { 
  hasChanges: boolean
  isSaving: boolean
  lastSaved: Date | null 
}) {
  if (isSaving) {
    return (
      <div className="flex items-center space-x-2 text-blue-600">
        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-600"></div>
        <span className="text-sm">Sauvegarde en cours...</span>
      </div>
    )
  }

  if (hasChanges) {
    return (
      <div className="flex items-center space-x-2 text-orange-600">
        <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
        <span className="text-sm">Modifications non sauvegardées</span>
      </div>
    )
  }

  if (lastSaved) {
    const timeAgo = Math.floor((Date.now() - lastSaved.getTime()) / 1000 / 60)
    return (
      <div className="flex items-center space-x-2 text-green-600">
        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
        <span className="text-sm">
          Sauvegardé {timeAgo < 1 ? 'à l\'instant' : `il y a ${timeAgo} min`}
        </span>
      </div>
    )
  }

  return null
}
