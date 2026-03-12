
import { defineStore } from 'pinia'
import axios from '../axios'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
    availableRoles: JSON.parse(localStorage.getItem('availableRoles') || 'null'),
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    userRole: (state) => state.user?.role || null,
    userActiveRole: (state) => state.user?.role || null,
    currentUser: (state) => state.user,
    // Tous les rôles disponibles pour cet utilisateur
    allRoles: (state) => {
      const roles = state.availableRoles || state.user?.roles || [];
      // Toujours inclure le rôle actif au minimum
      const active = state.user?.role;
      if (active && !roles.includes(active)) return [active, ...roles];
      return roles;
    },
  },

  actions: {
    // --- CONNEXION ---
    async login(email, password) {
      this.loading = true
      this.error = null

      try {
        // Appeler CSRF avant de faire la requête de login
        await axios.get('/sanctum/csrf-cookie')

        // Appel à l'API de login
        const response = await axios.post('/api/login', { email, password })

        if (response.data.success) {
          this.token = response.data.data.token
          this.user  = response.data.data.user
          // Initialiser les rôles disponibles
          this.availableRoles = this.user.roles || [this.user.role]
          
          localStorage.setItem('token', this.token)
          localStorage.setItem('availableRoles', JSON.stringify(this.availableRoles))
          axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`

          return true
        }
      } catch (err) {
        // Gérer les erreurs (ex: mauvais mot de passe)
        this.error = err.response?.data?.message || 'Identifiants incorrects.'
        return false // Connexion échouée
      } finally {
        this.loading = false
      }
    },

    // --- INSCRIPTION ---
    async register(userData) {
      this.loading = true
      this.error = null

      try {
        await axios.get('/sanctum/csrf-cookie')

        // Default role is client to be safe, but backend sets it automatically
        const payload = { ...userData, role: 'client' }
        const response = await axios.post('/api/register', payload)

        if (response.data.success) {
          this.token = response.data.data.token
          this.user = response.data.data.user
          
          localStorage.setItem('token', this.token)
          axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`

          return true
        }
      } catch (err) {
        this.error = err.response?.data?.message || err.response?.data?.errors || 'Erreur lors de l\'inscription.'
        return false
      } finally {
        this.loading = false
      }
    },

    // --- DECONNEXION ---
    async logout() {
      try {
        if (this.token) {
           // Envoyer une requête de logout à l'API pour invalider le token côté serveur
           axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
           await axios.post('/api/logout')
        }
      } catch (e) {
        console.error('Erreur lors de la déconnexion', e)
      } finally {
        this.user          = null
        this.token         = null
        this.availableRoles = null
        localStorage.removeItem('token')
        localStorage.removeItem('availableRoles')
        delete axios.defaults.headers.common['Authorization']
      }
    },

    // --- SWITCH DE RÔLE ---
    async switchRole(newRole) {
      try {
        const { data } = await axios.post('/api/roles/switch', { role: newRole })
        if (data.success) {
          // Mettre à jour le rôle actif sans refetch complet
          this.user = { ...this.user, role: data.data.active_role }
          this.availableRoles = data.data.available_roles
          localStorage.setItem('availableRoles', JSON.stringify(this.availableRoles))
          return { success: true }
        }
        return { success: false, message: data.message }
      } catch (err) {
        return { success: false, message: err.response?.data?.message || 'Erreur lors du changement de rôle.' }
      }
    },

    // --- ACQUERIR UN NOUVEAU RÔLE ---
    async acquireRole(newRole) {
      try {
        const { data } = await axios.post('/api/roles/acquire', { role: newRole })
        if (data.success) {
          // Mettre à jour les rôles disponibles
          this.availableRoles = data.data.available_roles
          this.user = { ...this.user, roles: data.data.available_roles }
          localStorage.setItem('availableRoles', JSON.stringify(this.availableRoles))
          return { success: true, message: data.message }
        }
        return { success: false, message: data.message }
      } catch (err) {
        return { success: false, message: err.response?.data?.message || 'Erreur lors de l\'activation du rôle.' }
      }
    },

    // --- RECUPERER L'UTILISATEUR CONNECTE ---
    async fetchUser() {
      if (!this.token) return 

      try {
        // Ajouter le token à l'en-tête de la requête
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
        
        // Appeler l'endpoint /api/user pour récupérer les infos de l'utilisateur
        const response = await axios.get('/api/user')

        // Mettre à jour le state user
        // Note: L'endpoint /api/user renvoie directement l'objet user dans response.data.data ou response.data selon l'implementation du controlleur
        // Backend AuthController::user renvoie { success: true, data: $request->user() }
        if (response.data.success) {
             this.user = response.data.data
             // Synchroniser les rôles depuis la réponse serveur
             if (this.user.roles) {
               this.availableRoles = this.user.roles
               localStorage.setItem('availableRoles', JSON.stringify(this.availableRoles))
             }
        } else {
             this.user = response.data
        }
        
      } catch (err) {
        // Si le token est invalide ou expiré, déconnecter l'utilisateur
        console.error('Erreur lors de la récupération de l\'utilisateur', err)
        this.logout()
      }
    },

    // --- MISE À JOUR DE L'AVATAR ---
    async updateAvatar(file) {
      this.loading = true
      const formData = new FormData()
      formData.append('avatar', file)

      try {
        const response = await axios.post('/api/profile/avatar', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })

        if (response.data.success) {
          this.user = response.data.user
          return { success: true, message: response.data.message }
        }
        return { success: false, message: response.data.message }
      } catch (err) {
        console.error('Erreur upload avatar:', err)
        return { 
          success: false, 
          message: err.response?.data?.message || 'Erreur lors de l\'upload de la photo.' 
        }
      } finally {
        this.loading = false
      }
    }
  }
})
