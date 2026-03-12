import { defineStore } from 'pinia';
import axios from '../axios';

export const usePropertyStore = defineStore('properties', {
  state: () => ({
    properties: [],
    pagination: {
      total: 0,
      last_page: 1,
      current_page: 1,
      per_page: 15
    },
    aggregates: {
      types: [],
      cities: [],
      etats: [],
      amenities: []
    },
    filters: {
      search: "",
      cities: [],
      types: [],
      minPrice: null,
      maxPrice: null,
      minRooms: 0,
      etats: [],
      amenities: [],
      sortBy: "recent"
    },
    agentProperties: [],
    agentPagination: {
      total: 0,
      last_page: 1,
      current_page: 1
    },
    favoriteProperties: [],
    isLoading: false,
    error: null,
    // Store for full property details to avoid repeated fetches
    propertyDetailsCache: {}
  }),

  getters: {
    activeFiltersCount: (state) => {
      let c = 0;
      if (state.filters.cities.length) c++;
      if (state.filters.types.length) c++;
      if (state.filters.etats.length) c++;
      if (state.filters.amenities.length) c++;
      if (state.filters.minPrice || state.filters.maxPrice) c++;
      if (state.filters.minRooms && state.filters.minRooms !== 0) c++;
      return c;
    },
    totalPages: (state) => state.pagination.last_page,
    pageNumbers: (state) => {
      const pages = [];
      for (let i = 1; i <= state.pagination.last_page; i++) pages.push(i);
      return pages;
    }
  },

  actions: {
    async fetchProperties(page = 1) {
      this.isLoading = true;
      this.error = null;
      this.pagination.current_page = page;

      try {
        const params = {
          page: this.pagination.current_page,
          sort: this.filters.sortBy,
          search: this.filters.search || undefined,
          min_price: this.filters.minPrice || undefined,
          max_price: this.filters.maxPrice || undefined,
          min_rooms: this.filters.minRooms > 0 ? this.filters.minRooms : undefined,
        };

        if (this.filters.types.length > 0) params.types = this.filters.types.join(",");
        if (this.filters.cities.length > 0) params.cities = this.filters.cities.join(",");
        if (this.filters.etats.length > 0) params.etats = this.filters.etats.join(",");
        if (this.filters.amenities.length > 0) params.amenities = this.filters.amenities.join(",");

        const { data } = await axios.get("/api/properties", { params });

        this.properties = data.data.data || [];
        this.pagination = {
          total: data.data.total || 0,
          last_page: data.data.last_page || 1,
          current_page: data.data.current_page || 1,
          per_page: data.data.per_page || 15
        };

        if (data.aggregates) {
          this.aggregates = data.aggregates;
        }
      } catch (err) {
        console.error("Erreur chargement annonces:", err);
        this.error = "Erreur lors du chargement des annonces.";
      } finally {
        this.isLoading = false;
      }
    },

    async fetchAgentProperties(page = 1) {
      this.isLoading = true;
      try {
        const { data } = await axios.get("/api/agent/properties", { params: { page } });
        if (data.success) {
          this.agentProperties = data.data.data || [];
          this.agentPagination = {
            total: data.data.total || 0,
            last_page: data.data.last_page || 1,
            current_page: data.data.current_page || 1
          };
        }
      } catch (err) {
        console.error("Erreur biens agent:", err);
      } finally {
        this.isLoading = false;
      }
    },

    async fetchFavorites() {
      this.isLoading = true;
      try {
        const { data } = await axios.get("/api/tenant/favorites");
        if (data.success) {
          this.favoriteProperties = data.data;
        }
      } catch (err) {
        console.error("Erreur chargement favoris:", err);
      } finally {
        this.isLoading = false;
      }
    },

    async fetchPropertyDetails(slug) {
      // Return from cache if available
      if (this.propertyDetailsCache[slug]) {
        return this.propertyDetailsCache[slug];
      }

      this.isLoading = true;
      try {
        const { data } = await axios.get(`/api/properties/${slug}`);
        if (data.success) {
          this.propertyDetailsCache[slug] = data.data;
          return data.data;
        }
      } catch (err) {
        console.error("Erreur chargement détails propriété:", err);
        throw err;
      } finally {
        this.isLoading = false;
      }
    },

    setFilters(newFilters) {
      this.filters = { ...this.filters, ...newFilters };
      this.fetchProperties(1);
    },

    resetFilters() {
      this.filters = {
        search: "",
        cities: [],
        types: [],
        minPrice: null,
        maxPrice: null,
        minRooms: 0,
        etats: [],
        amenities: [],
        sortBy: "recent"
      };
      this.fetchProperties(1);
    },

    async toggleFavorite(propertyId) {
      try {
        const { data } = await axios.post("/api/tenant/favorites/toggle", {
          property_id: propertyId,
        });

        if (data.success) {
          const isAdded = data.status === "added";
          
          // Update properties list
          const prop = this.properties.find((p) => p.id === propertyId);
          if (prop) prop.is_favorite = isAdded;

          // Update cache if present
          Object.values(this.propertyDetailsCache).forEach(p => {
            if (p.id === propertyId) p.is_favorite = isAdded;
          });

          return data;
        }
      } catch (err) {
        console.error("Erreur favoris:", err);
        throw err;
      }
    }
  }
});
