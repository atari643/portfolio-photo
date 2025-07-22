'use client'

import { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, X, Image as ImageIcon, Check, AlertTriangle, FileImage } from 'lucide-react'
import Image from 'next/image'

interface UploadedFile {
  id: string
  file: File
  preview: string
  progress: number
  status: 'uploading' | 'completed' | 'error'
  error?: string
}

interface PhotoUploadProps {
  onUploadComplete?: (files: UploadedFile[]) => void
  maxFiles?: number
  maxSize?: number // en MB
  acceptedTypes?: string[]
  multiple?: boolean
}

export function PhotoUpload({
  onUploadComplete,
  maxFiles = 10,
  maxSize = 10,
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp'],
  multiple = true
}: PhotoUploadProps) {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Fonction pour valider les fichiers
  const validateFile = (file: File): string | null => {
    if (!acceptedTypes.includes(file.type)) {
      return 'Type de fichier non supporté'
    }
    if (file.size > maxSize * 1024 * 1024) {
      return `Fichier trop volumineux (max ${maxSize}MB)`
    }
    return null
  }

  // Fonction pour traiter les fichiers
  const processFiles = useCallback((fileList: FileList) => {
    const newFiles: UploadedFile[] = []
    const filesToProcess = Array.from(fileList).slice(0, maxFiles - files.length)

    filesToProcess.forEach((file) => {
      const error = validateFile(file)
      const preview = URL.createObjectURL(file)
      
      const uploadedFile: UploadedFile = {
        id: crypto.randomUUID(),
        file,
        preview,
        progress: 0,
        status: error ? 'error' : 'uploading',
        error: error || undefined
      }
      
      newFiles.push(uploadedFile)
    })

    setFiles(prev => [...prev, ...newFiles])

    // Simuler l'upload pour chaque fichier valide
    newFiles
      .filter(file => !file.error)
      .forEach(uploadedFile => {
        simulateUpload(uploadedFile.id)
      })
  }, [files.length, maxFiles, maxSize, acceptedTypes])

  // Simulation d'upload (à remplacer par votre logique d'upload réelle)
  const simulateUpload = (fileId: string) => {
    const interval = setInterval(() => {
      setFiles(prev => prev.map(file => {
        if (file.id === fileId) {
          const newProgress = Math.min(file.progress + Math.random() * 30, 100)
          const completed = newProgress >= 100
          
          return {
            ...file,
            progress: newProgress,
            status: completed ? 'completed' : 'uploading'
          }
        }
        return file
      }))
    }, 200)

    // Nettoyer l'interval quand l'upload est terminé
    setTimeout(() => {
      clearInterval(interval)
      setFiles(prev => prev.map(file => 
        file.id === fileId 
          ? { ...file, progress: 100, status: 'completed' }
          : file
      ))
    }, 3000)
  }

  // Gestion du drag & drop
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const droppedFiles = e.dataTransfer.files
    if (droppedFiles.length > 0) {
      processFiles(droppedFiles)
    }
  }, [processFiles])

  // Gestion du click pour ouvrir le sélecteur
  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files
    if (selectedFiles && selectedFiles.length > 0) {
      processFiles(selectedFiles)
    }
    // Reset l'input pour permettre de sélectionner le même fichier
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [processFiles])

  // Supprimer un fichier
  const removeFile = useCallback((fileId: string) => {
    setFiles(prev => {
      const updated = prev.filter(file => file.id !== fileId)
      // Libérer l'URL de preview
      const fileToRemove = prev.find(file => file.id === fileId)
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.preview)
      }
      return updated
    })
  }, [])

  // Stats des uploads
  const completedFiles = files.filter(file => file.status === 'completed')
  const errorFiles = files.filter(file => file.status === 'error')
  const uploadingFiles = files.filter(file => file.status === 'uploading')

  return (
    <div className="w-full space-y-6">
      {/* Zone de drop */}
      <motion.div
        className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
          isDragOver
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
            : files.length > 0
            ? 'border-green-300 bg-green-50 dark:bg-green-900/20'
            : 'border-neutral-300 dark:border-neutral-600 hover:border-blue-400 dark:hover:border-blue-500'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          accept={acceptedTypes.join(',')}
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        <div className="space-y-4">
          {/* Icône */}
          <motion.div
            animate={{
              scale: isDragOver ? 1.1 : 1,
              rotate: isDragOver ? 5 : 0
            }}
            className="mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center"
          >
            <Upload className="h-8 w-8 text-white" />
          </motion.div>

          {/* Texte */}
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
              {isDragOver ? 'Déposez vos images ici' : 'Uploadez vos photos'}
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Glissez-déposez vos images ou{' '}
              <span className="text-blue-500 font-medium cursor-pointer hover:underline">
                cliquez pour parcourir
              </span>
            </p>
            <p className="text-sm text-neutral-500 dark:text-neutral-500 mt-2">
              {acceptedTypes.map(type => type.split('/')[1]).join(', ').toUpperCase()} • 
              Max {maxSize}MB • Max {maxFiles} fichiers
            </p>
          </div>

          {/* Stats rapides */}
          {files.length > 0 && (
            <div className="flex justify-center space-x-6 pt-4 border-t border-neutral-200 dark:border-neutral-700">
              <div className="text-center">
                <div className="text-lg font-semibold text-green-600">
                  {completedFiles.length}
                </div>
                <div className="text-xs text-neutral-500">Terminés</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-blue-600">
                  {uploadingFiles.length}
                </div>
                <div className="text-xs text-neutral-500">En cours</div>
              </div>
              {errorFiles.length > 0 && (
                <div className="text-center">
                  <div className="text-lg font-semibold text-red-600">
                    {errorFiles.length}
                  </div>
                  <div className="text-xs text-neutral-500">Erreurs</div>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>

      {/* Liste des fichiers */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            {files.map((file) => (
              <FilePreview
                key={file.id}
                file={file}
                onRemove={() => removeFile(file.id)}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actions */}
      {completedFiles.length > 0 && (
        <div className="flex justify-end space-x-4">
          <motion.button
            onClick={() => setFiles([])}
            className="px-6 py-3 rounded-xl border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Effacer tout
          </motion.button>
          <motion.button
            onClick={() => onUploadComplete?.(completedFiles)}
            className="gradient-primary text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Confirmer ({completedFiles.length})
          </motion.button>
        </div>
      )}
    </div>
  )
}

// Composant pour l'aperçu de chaque fichier
interface FilePreviewProps {
  file: UploadedFile
  onRemove: () => void
}

function FilePreview({ file, onRemove }: FilePreviewProps) {
  const getStatusIcon = () => {
    switch (file.status) {
      case 'completed':
        return <Check className="h-5 w-5 text-green-500" />
      case 'error':
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      default:
        return <FileImage className="h-5 w-5 text-blue-500" />
    }
  }

  const getStatusColor = () => {
    switch (file.status) {
      case 'completed':
        return 'border-green-200 bg-green-50 dark:bg-green-900/20'
      case 'error':
        return 'border-red-200 bg-red-50 dark:bg-red-900/20'
      default:
        return 'border-blue-200 bg-blue-50 dark:bg-blue-900/20'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`flex items-center space-x-4 p-4 rounded-xl border ${getStatusColor()}`}
    >
      {/* Aperçu de l'image */}
      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-neutral-200 dark:bg-neutral-700">
        <Image
          src={file.preview}
          alt={file.file.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Informations du fichier */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2 mb-1">
          {getStatusIcon()}
          <h4 className="text-sm font-medium text-neutral-900 dark:text-white truncate">
            {file.file.name}
          </h4>
        </div>
        
        <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-2">
          {(file.file.size / 1024 / 1024).toFixed(2)} MB
        </div>

        {/* Barre de progression */}
        {file.status === 'uploading' && (
          <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-1.5">
            <motion.div
              className="bg-blue-500 h-1.5 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${file.progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        )}

        {/* Message d'erreur */}
        {file.status === 'error' && file.error && (
          <div className="text-xs text-red-600 dark:text-red-400 mt-1">
            {file.error}
          </div>
        )}
      </div>

      {/* Bouton de suppression */}
      <motion.button
        onClick={onRemove}
        className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <X className="h-4 w-4" />
      </motion.button>
    </motion.div>
  )
}
