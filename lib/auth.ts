// Configuration simplifiée pour l'authentification CMS
export interface AdminUser {
  id: string
  email: string
  name: string
  role: 'admin' | 'photographer' | 'editor'
  permissions: string[]
  avatar?: string
}

// Utilisateurs de démonstration
const demoUsers: AdminUser[] = [
  {
    id: '1',
    email: 'admin@portfolio.com',
    name: 'Administrateur Principal',
    role: 'admin',
    permissions: ['*'], // Toutes les permissions
    avatar: '/avatars/admin.jpg'
  },
  {
    id: '2', 
    email: 'photographe@portfolio.com',
    name: 'Photographe',
    role: 'photographer',
    permissions: [
      'photos.create',
      'photos.edit',
      'photos.delete',
      'galleries.create',
      'galleries.edit',
      'galleries.delete',
      'content.edit',
      'theme.edit'
    ],
    avatar: '/avatars/photographer.jpg'
  }
]

// Fonction de validation simple (temporaire)
export function validateUser(email: string, password: string): AdminUser | null {
  // Validation simple pour la démo (mot de passe: portfolio2024)
  if (password !== 'portfolio2024') return null
  
  return demoUsers.find(user => user.email === email) || null
}

// Vérification des permissions
export function hasPermission(userPermissions: string[], requiredPermission: string): boolean {
  if (!userPermissions || userPermissions.length === 0) return false
  if (userPermissions.includes('*')) return true
  return userPermissions.includes(requiredPermission)
}

// Configuration simplifiée pour NextAuth (sans provider pour l'instant)
export const authConfig = {
  pages: {
    signIn: '/admin/login',
    error: '/admin/login'
  },
  session: {
    strategy: 'jwt' as const,
    maxAge: 24 * 60 * 60, // 24 heures
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.permissions = user.permissions
        token.avatar = user.avatar
      }
      return token
    },
    async session({ session, token }: any) {
      if (session.user && token) {
        session.user.id = token.id as string
        session.user.role = token.role as string
        session.user.permissions = token.permissions as string[]
        session.user.avatar = token.avatar as string
      }
      return session
    }
  }
}
