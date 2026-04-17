import { defineStore } from 'pinia'
import axios from '../axios'

export const useFeedStore = defineStore('feed', {
  state: () => ({
    // Feed items interleaved
    feedItems: [],
    // Sections raw data
    properties: [],
    products: [],
    serviceRequests: [],
    providers: [],
    stories: [],
    stats: null,
    // Pagination
    currentPage: 1,
    hasMore: true,
    // UI state
    loading: false,
    loadingMore: false,
    error: null,
    initialized: false,
  }),

  getters: {
    isEmpty: (state) => !state.loading && state.feedItems.length === 0,
  },

  actions: {
    /**
     * Charge la première page du feed (reset complet)
     */
    async loadFeed() {
      if (this.loading) return
      this.loading = true
      this.error = null
      this.currentPage = 1

      try {
        const { data } = await axios.get('/api/feed?page=1')
        if (data.success) {
          this.properties     = data.data.properties     || []
          this.products       = data.data.products       || []
          this.serviceRequests= data.data.service_requests || []
          this.providers      = data.data.providers      || []
          this.stories        = data.data.stories        || []
          this.stats          = data.data.stats          || null
          this.hasMore        = data.meta?.has_more      ?? false
          this.feedItems      = data.data.items          || []
          this.initialized    = true
        }
      } catch (err) {
        this.error = err.response?.data?.message || 'Erreur lors du chargement du feed.'
        console.error('[FeedStore] loadFeed error:', err)
      } finally {
        this.loading = false
      }
    },

    /**
     * Charge la page suivante (infinite scroll)
     */
    async loadMore() {
      if (this.loadingMore || !this.hasMore) return
      this.loadingMore = true

      try {
        const nextPage = this.currentPage + 1
        const { data } = await axios.get(`/api/feed?page=${nextPage}`)
        if (data.success) {
          this.currentPage = nextPage
          this.hasMore     = data.meta?.has_more ?? false
          // Append new items to feed organically
          this.feedItems.push(...(data.data.items || []))
          // Update raw arrays
          this.properties     = [...this.properties, ...(data.data.properties || [])]
          this.products       = [...this.products, ...(data.data.products || [])]
          this.serviceRequests= [...this.serviceRequests, ...(data.data.service_requests || [])]
          this.providers      = [...this.providers, ...(data.data.providers || [])]
        }
      } catch (err) {
        console.error('[FeedStore] loadMore error:', err)
      } finally {
        this.loadingMore = false
      }
    },

    /**
     * Rafraîchit le feed sans perdre le scroll (reload page 1 seulement)
     */
    async refreshFeed() {
      await this.loadFeed()
    },
  },
})
