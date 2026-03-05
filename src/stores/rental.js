import { defineStore } from 'pinia'
import axios from '../axios'

/**
 * Store du processus locatif HomeCameroon.
 * Gère les visites, dossiers et locations du futur locataire.
 */
export const useRentalStore = defineStore('rental', {
  state: () => ({
    // Visites
    visits: [],
    loadingVisits: false,

    // Dossiers de candidature
    applications: [],
    loadingApplications: false,

    // Locations actives (une fois locataire)
    rentals: [],
    loadingRentals: false,

    error: null,
  }),

  getters: {
    // Visite en cours (pending ou confirmed) pour un bien donné
    activeVisitForProperty: (state) => (propertyId) => {
      return state.visits.find(
        (v) =>
          v.property_id == propertyId &&
          ['pending', 'confirmed'].includes(v.status)
      ) || null
    },

    // Dossier en cours pour un bien donné
    activeApplicationForProperty: (state) => (propertyId) => {
      return state.applications.find(
        (a) => a.property_id == propertyId
      ) || null
    },

    // Phase actuelle du processus pour un bien donné
    processPhaseForProperty: (state) => (propertyId) => {
      const visit = state.visits.find((v) => v.property_id == propertyId)
      if (!visit) return null

      const app = state.applications.find(
        (a) => a.property_id == propertyId
      )

      if (!app) {
        return {
          step: 1,
          label: 'Visite programmée',
          status: visit.status,
          visitId: visit.id,
          canApply: visit.status === 'completed',
        }
      }

      if (app.rental) {
        const r = app.rental
        if (r.status === 'active') return { step: 4, label: 'Location active ✓', applicationId: app.id }
        return { step: 3, label: 'Paiement en attente', applicationId: app.id, rental: r }
      }

      return {
        step: 2,
        label: app.status === 'pending' ? 'Dossier en examen' : 'Dossier traité',
        applicationId: app.id,
        appStatus: app.status,
      }
    },
  },

  actions: {
    // ── VISITES ──────────────────────────────────────────────────────────────

    async fetchVisits() {
      this.loadingVisits = true
      this.error = null
      try {
        const { data } = await axios.get('/api/visits')
        if (data.success) this.visits = data.data
      } catch (err) {
        this.error = err.response?.data?.message || 'Erreur chargement visites'
      } finally {
        this.loadingVisits = false
      }
    },

    async bookVisit(payload) {
      this.error = null
      try {
        const { data } = await axios.post('/api/visits', payload)
        if (data.success) {
          this.visits.unshift(data.data)
          return { success: true, data: data.data, message: data.message }
        }
      } catch (err) {
        const message = err.response?.data?.message || 'Erreur lors de la réservation'
        this.error = message
        return { success: false, message }
      }
    },

    async confirmVisit(visitId) {
      this.error = null
      try {
        const { data } = await axios.post(`/api/visits/${visitId}/confirm`)
        if (data.success) {
          const idx = this.visits.findIndex((v) => v.id === visitId)
          if (idx !== -1) this.visits[idx] = data.data
          return { success: true, data: data.data, canApply: data.can_apply }
        }
      } catch (err) {
        const message = err.response?.data?.message || 'Erreur confirmation visite'
        this.error = message
        return { success: false, message }
      }
    },

    async cancelVisit(visitId) {
      try {
        const { data } = await axios.post(`/api/visits/${visitId}/cancel`)
        if (data.success) {
          const idx = this.visits.findIndex((v) => v.id === visitId)
          if (idx !== -1) this.visits[idx].status = 'cancelled'
          return { success: true }
        }
      } catch (err) {
        return { success: false, message: err.response?.data?.message }
      }
    },

    // ── DOSSIERS DE CANDIDATURE ───────────────────────────────────────────────

    async fetchApplications() {
      this.loadingApplications = true
      this.error = null
      try {
        const { data } = await axios.get('/api/rental-applications')
        if (data.success) this.applications = data.data
      } catch (err) {
        this.error = err.response?.data?.message || 'Erreur chargement dossiers'
      } finally {
        this.loadingApplications = false
      }
    },

    async submitApplication(payload) {
      this.error = null
      try {
        const { data } = await axios.post('/api/rental-applications', payload)
        if (data.success) {
          this.applications.unshift(data.data)
          return { success: true, data: data.data, message: data.message }
        }
      } catch (err) {
        const message = err.response?.data?.message || 'Erreur soumission dossier'
        this.error = message
        return { success: false, message }
      }
    },

    async signContract(applicationId) {
      try {
        const { data } = await axios.post(`/api/rental-applications/${applicationId}/sign`)
        if (data.success) {
          const idx = this.applications.findIndex((a) => a.id === applicationId)
          if (idx !== -1) this.applications[idx] = data.data
          return { success: true }
        }
      } catch (err) {
        return { success: false, message: err.response?.data?.message }
      }
    },

    // ── LOCATIONS (LOCATAIRE) ─────────────────────────────────────────────────

    async fetchRentals() {
      this.loadingRentals = true
      try {
        const { data } = await axios.get('/api/tenant/rentals')
        if (data.success) this.rentals = data.data
      } catch (err) {
        this.error = err.response?.data?.message
      } finally {
        this.loadingRentals = false
      }
    },
  },
})
