import toast from 'react-hot-toast'
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react'

// Notifications personnalisées pour CMS Studio
export const cmsToast = {
  success: (message: string) => {
    toast.custom((t) => (
      <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} 
        max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <CheckCircle className="h-6 w-6 text-green-400" />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">
                Succès
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {message}
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-gray-500 hover:text-gray-600 focus:outline-none"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    ), {
      duration: 4000,
      position: 'top-right'
    })
  },

  error: (message: string) => {
    toast.custom((t) => (
      <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} 
        max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <AlertCircle className="h-6 w-6 text-red-400" />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">
                Erreur
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {message}
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-gray-500 hover:text-gray-600 focus:outline-none"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    ), {
      duration: 6000,
      position: 'top-right'
    })
  },

  info: (message: string) => {
    toast.custom((t) => (
      <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} 
        max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <Info className="h-6 w-6 text-blue-400" />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">
                Information
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {message}
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-gray-500 hover:text-gray-600 focus:outline-none"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    ), {
      duration: 4000,
      position: 'top-right'
    })
  },

  gitSaved: () => {
    toast.custom((t) => (
      <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} 
        max-w-md w-full bg-gradient-to-r from-green-500 to-green-600 shadow-lg rounded-lg pointer-events-auto flex text-white`}>
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-white">
                💾 Sauvegardé dans Git
              </p>
              <p className="mt-1 text-sm text-green-100">
                Vos modifications ont été versionnées automatiquement
              </p>
            </div>
          </div>
        </div>
        <div className="flex">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-green-100 hover:text-white focus:outline-none"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    ), {
      duration: 5000,
      position: 'top-right'
    })
  },

  uploading: (fileName: string) => {
    return toast.loading(`Téléchargement de ${fileName}...`, {
      position: 'top-right',
      style: {
        background: '#3B82F6',
        color: '#fff',
      },
    })
  },

  uploadSuccess: (count: number) => {
    cmsToast.success(`${count} photo(s) téléchargée(s) avec succès`)
  },

  uploadError: (error: string) => {
    cmsToast.error(`Erreur de téléchargement: ${error}`)
  }
}

// Styles CSS pour les animations (à ajouter dans globals.css)
export const toastStyles = `
  @keyframes enter {
    0% {
      transform: translate3d(0, -200%, 0) scale(.6);
      opacity: 0;
    }
    100% {
      transform: translate3d(0, 0, 0) scale(1);
      opacity: 1;
    }
  }

  @keyframes leave {
    0% {
      transform: translate3d(0, 0, 0) scale(1);
      opacity: 1;
    }
    100% {
      transform: translate3d(0, -200%, 0) scale(.6);
      opacity: 0;
    }
  }

  .animate-enter {
    animation: enter 0.2s ease-out;
  }

  .animate-leave {
    animation: leave 0.15s ease-in forwards;
  }
`
