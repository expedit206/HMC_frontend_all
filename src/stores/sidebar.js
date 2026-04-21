import { defineStore } from 'pinia'
import axios from '../axios'
import { ref } from 'vue'
import { useAuthStore } from './auth'

export const useSidebarStore = defineStore('sidebar', () => {
    const badges = ref({})
    const isLoading = ref(false)
    const isMobileOpen = ref(false)
    const authStore = useAuthStore()

    const fetchBadges = async () => {
        if (!authStore.isAuthenticated) return
        
        isLoading.value = true
        try {
            const { data } = await axios.get('/api/user/sidebar-stats', {
                headers: {
                    'X-Current-Role': authStore.userRole
                }
            })
            if (data.success) {
                badges.value = data.data
            }
        } catch (error) {
            console.error('Erreur lors du chargement des badges sidebar:', error)
        } finally {
            isLoading.value = false
        }
    }

    const toggleMobile = () => {
        isMobileOpen.value = !isMobileOpen.value
    }

    return {
        badges,
        isLoading,
        isMobileOpen,
        fetchBadges,
        toggleMobile
    }
})
