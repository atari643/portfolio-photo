# CMS Studio - Guide d'implémentation

## 🎯 Vue d'ensemble

CMS Studio est un système de gestion de contenu personnalisé et collaboratif spécialement conçu pour les portfolios de photographes. Il s'interface parfaitement avec des sites statiques hébergés sur GitHub, où toute modification est versionnée automatiquement.

## 🏗️ Architecture

### Composants principaux

1. **CMSDashboard** - Tableau de bord principal avec statistiques
2. **AdvancedPhotoManager** - Gestion avancée des photos avec sélection multiple
3. **GalleryManager** - Création et gestion des galeries avec drag & drop
4. **VisualCustomizer** - Personnalisation visuelle (couleurs, polices, styles)
5. **CMSGuide** - Guide d'utilisation interactif

### Hooks personnalisés

- `usePhotos()` - Gestion des photos
- `useGalleries()` - Gestion des galeries  
- `useSettings()` - Paramètres du site
- `useStats()` - Statistiques et analytics
- `useAutoSave()` - Sauvegarde automatique
- `useFormAutoSave()` - Sauvegarde de formulaires

### APIs

- `/api/cms/photos` - CRUD photos
- `/api/cms/galleries` - CRUD galeries
- `/api/cms/settings` - Paramètres généraux
- `/api/cms/save-changes` - Sauvegarde Git automatique

## 🚀 Installation et configuration

### 1. Installation des dépendances

```bash
npm install framer-motion react-hot-toast
```

### 2. Configuration des variables d'environnement

```env
# Authentification admin
ADMIN_USERNAME=admin
ADMIN_PASSWORD=votre_mot_de_passe_securise

# Configuration Git (optionnel)
GIT_AUTHOR_NAME="CMS Studio"
GIT_AUTHOR_EMAIL="cms@votre-domaine.com"
```

### 3. Structure des dossiers

```
project/
├── components/admin/          # Composants CMS
├── lib/cms/                   # Hooks et utilitaires
├── app/api/cms/              # APIs backend
└── data/                     # Stockage des données
```

## 📋 Utilisation

### Interface d'administration

1. **Accès** : `/admin` (protégé par authentification)
2. **Navigation** : Sidebar avec toutes les sections
3. **Sauvegarde** : Automatique toutes les 5 minutes + manuelle

### Gestion des photos

```typescript
import { AdvancedPhotoManager } from '@/components/admin/AdvancedPhotoManager'

// Utilisation dans une page admin
function PhotosPage() {
  return <AdvancedPhotoManager />
}
```

**Fonctionnalités :**
- Upload par glisser-déposer
- Sélection multiple avec actions de lot
- Édition des métadonnées (titre, description, tags)
- Filtrage et recherche
- Organisation par catégories

### Gestion des galeries

```typescript
import { GalleryManager } from '@/components/admin/GalleryManager'

// Utilisation
function GalleriesPage() {
  return <GalleryManager />
}
```

**Fonctionnalités :**
- Création de galeries thématiques
- Réorganisation par drag & drop
- Gestion des photos par galerie
- Publication/dépublication
- Mise en vedette

### Personnalisation visuelle

```typescript
import { VisualCustomizer } from '@/components/admin/VisualCustomizer'

// Configuration des couleurs et polices
function CustomizePage() {
  return <VisualCustomizer />
}
```

**Options :**
- Palettes de couleurs prédéfinies
- Sélecteur de couleurs personnalisé
- Choix de polices Google Fonts
- Prévisualisation en temps réel

## 🔧 Personnalisation

### Ajouter une nouvelle section CMS

1. **Créer le composant** :

```typescript
// components/admin/MonNouveauManager.tsx
export function MonNouveauManager() {
  // Votre logique ici
  return <div>Mon nouveau gestionnaire</div>
}
```

2. **Ajouter l'API correspondante** :

```typescript
// app/api/cms/ma-nouvelle-section/route.ts
export async function GET() {
  // Logic pour récupérer les données
}

export async function POST() {
  // Logic pour créer/modifier
}
```

3. **Créer un hook personnalisé** :

```typescript
// lib/cms/hooks/useMonNouveau.ts
export function useMonNouveau() {
  // État et fonctions
  return { data, loading, create, update }
}
```

### Personnaliser les notifications

```typescript
import { cmsToast } from '@/lib/cms/toast'

// Utilisation
cmsToast.success('Action réussie !')
cmsToast.error('Erreur survenue')
cmsToast.gitSaved() // Notification spéciale Git
```

## 🔐 Sécurité

### Authentification

Le système utilise une authentification simple par middleware :

```typescript
// middleware.ts - Protection des routes admin
export function middleware(request: NextRequest) {
  // Vérification des credentials
  // Redirection vers /admin/login si non authentifié
}
```

### Protection des APIs

Toutes les APIs CMS sont protégées par Basic Auth :

```javascript
Authorization: Basic base64(username:password)
```

## 🔄 Workflow Git

### Sauvegarde automatique

1. **Auto-save** : Toutes les 5 minutes si modifications
2. **Commits** : Générés automatiquement avec timestamps
3. **Push** : Optionnel vers le dépôt distant

### Gestion des versions

```typescript
// Récupérer l'historique
const history = await fetch('/api/cms/save-changes')

// Créer un point de sauvegarde manuel
await fetch('/api/cms/save-changes', {
  method: 'POST',
  body: JSON.stringify({
    message: 'Point de sauvegarde manuel'
  })
})
```

## 📊 Analytics et statistiques

```typescript
import { useStats } from '@/lib/cms/hooks/useCMS'

function Dashboard() {
  const { stats } = useStats()
  
  return (
    <div>
      <p>Photos: {stats.totalPhotos}</p>
      <p>Vues: {stats.monthlyViews}</p>
      <p>Engagement: {stats.engagementRate}%</p>
    </div>
  )
}
```

## 🎨 Thèmes et personnalisation

### Variables CSS dynamiques

Le système génère automatiquement des variables CSS :

```css
:root {
  --cms-primary: #6366F1;
  --cms-secondary: #8B5CF6;
  --cms-accent: #EC4899;
}
```

### Application des thèmes

```typescript
// Mise à jour automatique via VisualCustomizer
const updateTheme = (colors: ColorPalette) => {
  document.documentElement.style.setProperty('--cms-primary', colors.primary)
  // ... autres variables
}
```

## 🤝 Collaboration

### Gestion des utilisateurs

```typescript
interface User {
  id: string
  username: string
  role: 'admin' | 'editor' | 'viewer'
  permissions: Permission[]
}
```

### Permissions

- `photos.create` - Ajouter des photos
- `photos.edit` - Modifier les métadonnées
- `galleries.manage` - Gérer les galeries
- `settings.edit` - Modifier les paramètres
- `theme.customize` - Personnaliser l'apparence

## 📱 Responsive et mobile

Toutes les interfaces sont optimisées pour :
- Desktop (1200px+)
- Tablette (768px - 1199px)  
- Mobile (< 768px)

## 🔍 SEO et optimisation

### Métadonnées automatiques

```typescript
// Génération automatique des balises meta
const seoData = {
  title: `${photo.title} - ${siteName}`,
  description: photo.description,
  image: photo.url,
  alt: photo.alt
}
```

### Structured Data

```json
{
  "@type": "Photograph",
  "name": "Titre de la photo",
  "description": "Description",
  "creator": "Nom du photographe"
}
```

## 🐛 Debugging et logs

### Mode développement

```bash
# Activer les logs détaillés
DEBUG=cms:* npm run dev
```

### Monitoring des erreurs

```typescript
// Capture automatique des erreurs
window.addEventListener('error', (error) => {
  console.error('CMS Error:', error)
  // Optionnel: envoyer à un service de monitoring
})
```

## 📚 Ressources supplémentaires

- [Documentation complète](./TECHNICAL_DOCS.md)
- [Guide de déploiement](./DEPLOYMENT.md)
- [Exemples d'utilisation](./examples/)
- [FAQ](./FAQ.md)

## 🤝 Support

- **Email** : support@cms-studio.com
- **Documentation** : [docs.cms-studio.com](https://docs.cms-studio.com)
- **Issues GitHub** : [github.com/votre-repo/issues](https://github.com/votre-repo/issues)

---

**CMS Studio** - La solution Git-based pour photographes modernes 📸✨
