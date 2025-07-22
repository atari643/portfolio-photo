# 🎯 Guide de Déploiement GitHub Pages

## Configuration GitHub Pages

### 1. Activation GitHub Pages

1. Allez dans **Settings** de votre repository
2. Scrollez jusqu'à **Pages**
3. Dans **Source**, sélectionnez **GitHub Actions**

### 2. Création du Workflow

Créez `.github/workflows/deploy.yml` :

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./out
```

### 3. Configuration Next.js

Le fichier `next.config.js` est déjà configuré pour GitHub Pages.

### 4. Déploiement

1. **Pushez votre code** sur la branche `main`
2. **GitHub Actions** va automatiquement :
   - Installer les dépendances
   - Construire le projet
   - Déployer sur GitHub Pages

### 5. Accès au site

Votre site sera disponible à :
```
https://[votre-username].github.io/portfolio-photo
```

## 🎨 Personnalisation avant déploiement

### Images

1. Ajoutez vos photos dans `/public/images/`
2. Remplacez les URLs de placeholder dans les composants
3. Optimisez vos images (format WebP recommandé)

### Contenu

1. **Métadonnées SEO** dans `app/layout.tsx`
2. **Informations personnelles** dans les sections
3. **Services et tarifs** dans `ServicesSection.tsx`
4. **Coordonnées** dans `ContactSection.tsx`

### Domaine personnalisé (optionnel)

1. Créez un fichier `public/CNAME` avec votre domaine
2. Configurez vos DNS pour pointer vers GitHub Pages

## ⚡ Optimisations

- **Images** : Utilisez le format WebP
- **Lazy loading** : Déjà implémenté avec Next.js Image
- **SEO** : Métadonnées complètes configurées
- **Performance** : Optimisations Next.js activées

Votre portfolio sera prêt en quelques minutes ! 🚀
