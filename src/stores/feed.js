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
          this.feedItems      = this._buildInterleavedFeed(data.data)
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
          // Append new items to feed
          const newItems = this._buildInterleavedFeed(data.data, nextPage)
          this.feedItems.push(...newItems)
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

    /**
     * Construit le feed interleaved en mélangeant tous les types de contenu
     * Algorithme : 3 biens → section → 2 produits → section → 2 demandes → 2 prestataires → repeat
     */
    _buildInterleavedFeed(data, page = 1) {
      const items     = []
      const props     = [...(data.properties      || [])]
      const prods     = [...(data.products         || [])]
      const reqs      = [...(data.service_requests || [])]
      const provs     = [...(data.providers        || [])]

      // Page 1 : on commence avec les biens
      let propIdx = 0
      let prodIdx = 0
      let reqIdx  = 0
      let provIdx = 0

      // Ajouter des biens
      const propSlice = props.slice(propIdx, propIdx + 3)
      if (propSlice.length > 0) {
        if (page === 1) {
          items.push({ feed_type: 'section', label: '🏠 Biens à louer', icon: 'fa-home', link: '/annonces', link_label: 'Voir toutes les annonces' })
        }
        items.push(...propSlice)
        propIdx += 3
      }

      // Ajouter des produits marketplace
      const prodSlice = prods.slice(prodIdx, prodIdx + 2)
      if (prodSlice.length > 0) {
        items.push({ feed_type: 'section', label: '🛒 Marketplace', icon: 'fa-store', link: '/marketplace', link_label: 'Voir le marketplace' })
        items.push(...prodSlice)
        prodIdx += 2
      }

      // Ajouter des demandes de service
      const reqSlice = reqs.slice(reqIdx, reqIdx + 2)
      if (reqSlice.length > 0) {
        items.push({ feed_type: 'section', label: '🔧 Demandes de prestataires', icon: 'fa-wrench', link: '/marketplace/demandes', link_label: 'Voir toutes les demandes' })
        items.push(...reqSlice)
        reqIdx += 2
      }

      // Ajouter des prestataires
      const provSlice = provs.slice(provIdx, provIdx + 2)
      if (provSlice.length > 0) {
        items.push({ feed_type: 'section', label: '👷 Prestataires disponibles', icon: 'fa-user-check', link: '/marketplace/prestataires', link_label: 'Voir tous les prestataires' })
        items.push(...provSlice)
        provIdx += 2
      }

      // Suite des biens (si encore des données)
      const propSlice2 = props.slice(propIdx)
      if (propSlice2.length > 0) {
        items.push({ feed_type: 'section', label: '🏠 Plus de biens', icon: 'fa-home', link: '/annonces', link_label: 'Voir toutes les annonces' })
        items.push(...propSlice2)
      }

      // Suite des produits (si encore des données)
      const prodSlice2 = prods.slice(prodIdx)
      if (prodSlice2.length > 0) {
        items.push({ feed_type: 'section', label: '🛒 Plus de produits', icon: 'fa-store', link: '/marketplace', link_label: 'Voir le marketplace' })
        items.push(...prodSlice2)
      }

      return items
    },
  },
})
