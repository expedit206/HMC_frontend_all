<template>
  <div class="min-h-screen bg-background pb-12">
    <!-- Header Mobile (visible uniquement sur mobile/tablette) -->
    <div class="lg:hidden bg-card border-b border-border p-4 sticky top-16 z-40">
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-xl font-bold text-foreground">
          <span class="text-primary font-semibold">{{ pagination.total }} annonces</span>
          trouvées
        </h1>
      </div>
      <div class="flex gap-3">
        <button @click="showMobileFilters = true"
          class="flex-1 flex items-center justify-center gap-2 bg-background border border-border rounded-lg px-4 py-2 shadow-sm hover: transition-colors">
          <i class="fas fa-filter text-primary"></i>
          <span class="font-semibold text-foreground">Filtres</span>
        </button>
        <button @click="showSortDropdown = !showSortDropdown"
          class="flex-1 flex items-center justify-center gap-2 bg-background border border-border rounded-lg px-4 py-2 shadow-sm hover: transition-colors">
          <i class="fas fa-sort-amount-down text-primary"></i>
          <span class="font-semibold text-foreground">Trier</span>
        </button>
      </div>
    </div>

    <div class="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex flex-col lg:flex-row gap-6">
        <!-- SIDEBAR FILTRES (Desktop) -->
        <aside class="hidden lg:block w-1/4">
          <div
            class="bg-card rounded-[.45rem] shadow-lg p-6 py-2 pt-6 border border-border sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar">
            <!-- En-tête du filtre -->
            <div class="flex justify-between items-center mb-6 pb-4 border-b border-border">
              <h2 class="text-xl font-bold text-foreground">Filtrer par</h2>
              <button @click="resetFilters"
                class="text-secondary text-sm font-medium hover:text-primary transition-colors">
                <i class="fas fa-redo-alt mr-1"></i> Tout effacer
              </button>
            </div>

            <!-- Recherche rapide -->
            <div class="mb-6">
              <div class="relative">
                <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"></i>
                <input v-model="filters.search" type="text" placeholder="Rechercher un bien..."
                  class="w-full bg-background border border-input rounded-[.45rem] pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all" />
              </div>
            </div>

            <!-- Sections de filtres -->
            <div class="space-y-0">
              <!-- Type de bien -->
              <div class="mb-6 pb-4 border-b border-border">
                <button @click="openSections.types = !openSections.types"
                  class="w-full flex justify-between items-center mb-3">
                  <h3 class="font-bold text-foreground">Type de bien</h3>
                  <i :class="[
                    'fas fa-chevron-down text-secondary transition-transform duration-200',
                    openSections.types ? 'rotate-180' : '',
                  ]"></i>
                </button>
                <div v-show="openSections.types">
                  <div class="grid grid-cols-2 gap-1">
                    <label v-for="type in propertyTypes" :key="type.value"
                      class="flex items-center p-2 hover:bg-muted/50 rounded-[.45rem] cursor-pointer transition-colors"
                      :class="{ 'bg-secondary/10': filters.types.includes(type.value) }">
                      <input type="checkbox" :value="type.value" v-model="filters.types"
                        class="mr-2 w-4 h-4 rounded border-input text-secondary focus:ring-secondary focus:ring-2 bg-background" />
                      <span class="text-foreground/80 text-sm">{{
                        type.label
                      }}</span>
                    </label>
                  </div>
                </div>
              </div>

              <!-- Ville -->
              <div class="mb-6 pb-4 border-b border-border">
                <button @click="openSections.cities = !openSections.cities"
                  class="w-full flex justify-between items-center mb-3">
                  <h3 class="font-bold text-foreground">Ville</h3>
                  <i :class="[
                    'fas fa-chevron-down text-secondary transition-transform duration-200',
                    openSections.cities ? 'rotate-180' : '',
                  ]"></i>
                </button>
                <div v-show="openSections.cities">
                  <div class="relative mb-3">
                    <i
                      class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-sm"></i>
                    <input type="text" placeholder="Rechercher une ville..."
                      class="w-full bg-background border border-input rounded-[.45rem] pl-10 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent" />
                  </div>
                  <div class="max-h-40 overflow-y-auto custom-scrollbar">
                    <label v-for="city in cities" :key="city.value"
                      class="flex items-center justify-between p-2 hover:bg-muted/50 rounded-[.45rem] cursor-pointer transition-colors"
                      :class="{ 'bg-secondary/10': filters.cities.includes(city.value) }">
                      <div class="flex items-center">
                        <input type="checkbox" :value="city.value" v-model="filters.cities"
                          class="mr-3 w-4 h-4 rounded border-input text-secondary focus:ring-secondary focus:ring-2 bg-background" />
                        <span class="text-foreground/80 text-sm">{{
                          city.label
                        }}</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <!-- Prix -->
              <div class="mb-6 pb-4 border-b border-border">
                <button @click="openSections.price = !openSections.price"
                  class="w-full flex justify-between items-center mb-3">
                  <h3 class="font-bold text-foreground">Prix (FCFA/mois)</h3>
                  <i :class="[
                    'fas fa-chevron-down text-secondary transition-transform duration-200',
                    openSections.price ? 'rotate-180' : '',
                  ]"></i>
                </button>
                <div v-show="openSections.price">
                  <div class="flex space-x-3 mb-3">
                    <input v-model.number="filters.minPrice" type="number" placeholder="Min"
                      class="w-full bg-background border border-input rounded-[.45rem] px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent" />
                    <input v-model.number="filters.maxPrice" type="number" placeholder="Max"
                      class="w-full bg-background border border-input rounded-[.45rem] px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent" />
                  </div>
                  <div class="mb-2">
                    <input type="range" min="10000" max="1000000" step="10000"
                      class="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-secondary" />
                    <div class="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>10k</span><span>500k</span><span>1M</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Surface -->
              <div class="mb-6 pb-4 border-b border-border">
                <button @click="openSections.surface = !openSections.surface"
                  class="w-full flex justify-between items-center mb-3">
                  <h3 class="font-bold text-foreground">Surface (m²)</h3>
                  <i :class="[
                    'fas fa-chevron-down text-secondary transition-transform duration-200',
                    openSections.surface ? 'rotate-180' : '',
                  ]"></i>
                </button>
                <div v-show="openSections.surface">
                  <div class="flex space-x-3 mb-3">
                    <input type="number" placeholder="Min"
                      class="w-full bg-background border border-input rounded-[.45rem] px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent" />
                    <input type="number" placeholder="Max"
                      class="w-full bg-background border border-input rounded-[.45rem] px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent" />
                  </div>
                  <div class="mb-2">
                    <input type="range" min="10" max="500" step="10"
                      class="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-secondary" />
                    <div class="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>10</span><span>250</span><span>500</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Chambres -->
              <div class="mb-6 pb-4 border-b border-border">
                <button @click="openSections.rooms = !openSections.rooms"
                  class="w-full flex justify-between items-center mb-3">
                  <h3 class="font-bold text-foreground">Chambres</h3>
                  <i :class="[
                    'fas fa-chevron-down text-secondary transition-transform duration-200',
                    openSections.rooms ? 'rotate-180' : '',
                  ]"></i>
                </button>
                <div v-show="openSections.rooms">
                  <div class="flex flex-wrap gap-2">
                    <button @click="filters.minRooms = 0" :class="[
                      'px-4 py-2 border rounded-full text-sm font-medium transition-colors',
                      filters.minRooms === 0
                        ? 'bg-secondary border-secondary text-white'
                        : 'border-border hover:border-secondary hover:text-secondary bg-background text-foreground',
                    ]">
                      Toutes
                    </button>
                    <button @click="filters.minRooms = -1" :class="[
                      'px-4 py-2 border rounded-full text-sm font-medium transition-colors',
                      filters.minRooms === -1
                        ? 'bg-secondary border-secondary text-white'
                        : 'border-border hover:border-secondary hover:text-secondary bg-background text-foreground',
                    ]">
                      Studio
                    </button>
                    <button v-for="room in [1, 2, 3, 4]" :key="room" @click="
                      filters.minRooms = filters.minRooms === room ? 0 : room
                      " :class="[
                        'px-4 py-2 border rounded-full text-sm font-medium transition-colors',
                        filters.minRooms === room
                          ? 'bg-secondary border-secondary text-white'
                          : 'border-border hover:border-secondary hover:text-secondary bg-background text-foreground',
                      ]">
                      {{ room }}{{ room === 4 ? "+" : "" }}
                    </button>
                  </div>
                </div>
              </div>

              <!-- État du bien -->
              <div class="mb-6 pb-4 border-b border-border">
                <button @click="openSections.etat = !openSections.etat"
                  class="w-full flex justify-between items-center mb-3">
                  <h3 class="font-bold text-foreground">État du bien</h3>
                  <i :class="[
                    'fas fa-chevron-down text-secondary transition-transform duration-200',
                    openSections.etat ? 'rotate-180' : '',
                  ]"></i>
                </button>
                <div v-show="openSections.etat">
                  <div class="grid grid-cols-2 gap-1">
                    <label v-for="e in etats" :key="e.value"
                      class="flex items-center p-2 hover:bg-muted/50 rounded-[.45rem] cursor-pointer transition-colors"
                      :class="{ 'bg-secondary/10': filters.etats.includes(e.value) }">
                      <input type="checkbox" :value="e.value" v-model="filters.etats"
                        class="mr-2 w-4 h-4 rounded border-input text-secondary focus:ring-secondary focus:ring-2 bg-background" />
                      <span class="text-foreground/80 text-sm">{{
                        e.label
                      }}</span>
                    </label>
                  </div>
                </div>
              </div>

              <!-- Commodités -->
              <div class="mb-6">
                <button @click="openSections.commodites = !openSections.commodites"
                  class="w-full flex justify-between items-center mb-3">
                  <h3 class="font-bold text-foreground">Commodités</h3>
                  <i :class="[
                    'fas fa-chevron-down text-secondary transition-transform duration-200',
                    openSections.commodites ? 'rotate-180' : '',
                  ]"></i>
                </button>
                <div v-show="openSections.commodites">
                  <div class="grid grid-cols-2 gap-1">
                    <label v-for="a in amenitiesList" :key="a.value"
                      class="flex items-center p-2 hover:bg-muted/50 rounded-[.45rem] cursor-pointer transition-colors"
                      :class="{ 'bg-secondary/10': filters.amenities.includes(a.value) }">
                      <input type="checkbox" :value="a.value" v-model="filters.amenities"
                        class="mr-2 w-4 h-4 rounded border-input text-secondary focus:ring-secondary focus:ring-2 bg-background" />
                      <span class="text-foreground/80 text-sm">{{
                        a.label
                      }}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <!-- Indicateur temps réel -->
            <div class="pt-3 pb-1 flex items-center justify-between border-t border-border mt-2">
              <div class="flex items-center gap-2 text-xs text-muted-foreground">
                <span v-if="isLoading" class="flex items-center gap-1.5">
                  <svg class="animate-spin h-3.5 w-3.5 text-secondary" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Recherche en cours…
                </span>
                <span v-else-if="activeFiltersCount > 0 || filters.search" class="text-secondary font-medium">
                  {{ pagination.total }} résultat{{
                    pagination.total > 1 ? "s" : ""
                  }}
                </span>
              </div>
              <button v-if="activeFiltersCount > 0" @click="resetFilters"
                class="text-xs text-destructive hover:text-destructive/80 font-medium flex items-center gap-1 transition-colors">
                <i class="fas fa-times"></i> Effacer
              </button>
            </div>
          </div>
        </aside>

        <!-- MAIN CONTENT -->
        <main class="lg:w-3/4 w-full">
          <!-- En-tête Desktop -->
          <div class="hidden lg:block mb-6">
            <div class="flex justify-between items-center">
              <div>
                <h1 class="text-2xl font-bold text-foreground">
                  <span class="text-secondary font-semibold">{{ pagination.total }} annonces</span>
                  trouvées
                </h1>
                <p class="text-muted-foreground mt-1">
                  Affinez votre recherche avec les filtres pour trouver le
                  logement idéal
                </p>
              </div>
              <div class="flex items-center gap-3">
                <!-- Bouton Trier avec dropdown -->
                <div class="relative">
                  <button @click="showSortDropdown = !showSortDropdown"
                    class="flex items-center gap-2 border border-border rounded-[.45rem] px-4 py-2.5 text-sm font-medium hover:border-secondary hover:text-secondary transition-colors bg-background text-foreground">
                    <i class="fas fa-sort-amount-down"></i>
                    Trier par: {{ sortLabels[filters.sortBy] }}
                    <i class="fas fa-chevron-down ml-1 text-xs"></i>
                  </button>
                  <div v-if="showSortDropdown"
                    class="absolute right-0 mt-1 w-48 bg-card border border-border rounded-[.45rem] shadow-lg z-10">
                    <div class="py-1">
                      <button v-for="opt in sortOptions" :key="opt.value" @click="
                        filters.sortBy = opt.value;
                      showSortDropdown = false;
                      "
                        class="w-full text-left px-4 py-2 text-sm hover:bg-muted/50 text-foreground flex justify-between items-center">
                        {{ opt.label }}
                        <i v-if="filters.sortBy === opt.value" class="fas fa-check text-secondary"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  class="flex items-center gap-2 border border-border rounded-[.45rem] px-4 py-2.5 text-sm font-medium hover:border-secondary hover:text-secondary transition-colors bg-background text-foreground">
                  <i class="fas fa-map-marker-alt"></i>
                  Carte
                </button>
              </div>
            </div>
          </div>

          <!-- Filtres actifs (Tags) -->
          <div class="mb-6" v-if="activeFiltersCount > 0">
            <div class="flex flex-wrap gap-2">
              <span v-for="city in filters.cities" :key="city"
                class="px-3 py-1.5 bg-secondary text-white text-sm rounded-full flex items-center gap-2">
                {{ city }}
                <button class="text-white hover:text-white/80" @click="
                  filters.cities = filters.cities.filter((c) => c !== city)
                  ">
                  <i class="fas fa-times text-xs"></i>
                </button>
              </span>

              <span v-for="type in filters.types" :key="type"
                class="px-3 py-1.5 bg-secondary text-white text-sm rounded-full flex items-center gap-2">
                {{ type }}
                <button class="text-white hover:text-white/80" @click="
                  filters.types = filters.types.filter((t) => t !== type)
                  ">
                  <i class="fas fa-times text-xs"></i>
                </button>
              </span>

              <span v-if="filters.minRooms && filters.minRooms !== 0"
                class="px-3 py-1.5 bg-secondary text-white text-sm rounded-full flex items-center gap-2">
                {{ filters.minRooms === -1 ? 'Studio' : filters.minRooms + '+ chambres' }}
                <button class="text-white hover:text-white/80" @click="filters.minRooms = 0">
                  <i class="fas fa-times text-xs"></i>
                </button>
              </span>

              <span class="px-3 py-1.5 bg-muted text-foreground/70 text-sm rounded-full flex items-center gap-2">
                <i class="fas fa-sliders-h"></i>
                {{ activeFiltersCount }} filtre{{
                  activeFiltersCount > 1 ? "s" : ""
                }}
                actif{{ activeFiltersCount > 1 ? "s" : "" }}
              </span>

              <button @click="resetFilters" class="text-sm text-secondary hover:text-primary font-medium ml-2">
                <i class="fas fa-times mr-1"></i> Tout effacer
              </button>
            </div>
          </div>

          <!-- Liste des annonces -->
          <div class="space-y-6">
            <!-- Squelettes chargement -->
            <template v-if="isLoading">
              <div v-for="n in 4" :key="n"
                class="bg-card rounded-[.45rem] shadow-lg overflow-hidden border border-border">
                <div class="flex flex-col md:flex-row">
                  <div class="md:w-2/5 h-56 md:h-48 bg-muted/50"></div>
                  <div class="md:w-3/5 p-6 space-y-3">
                    <div class="h-6 w-3/4 bg-muted rounded"></div>
                    <div class="h-4 w-full bg-muted rounded"></div>
                    <div class="h-4 w-4/5 bg-muted rounded"></div>
                    <div class="flex gap-4 pt-2">
                      <div class="h-4 w-20 bg-muted rounded"></div>
                      <div class="h-4 w-20 bg-muted rounded"></div>
                      <div class="h-4 w-20 bg-muted rounded"></div>
                    </div>
                    <div class="flex justify-end pt-2">
                      <div class="h-10 w-36 bg-muted rounded-[.45rem]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </template>

            <!-- État vide -->
            <div v-else-if="properties.length === 0"
              class="text-center py-20 bg-card rounded-[.45rem] border border-border">
              <i class="fas fa-search text-4xl text-muted-foreground mb-4"></i>
              <h3 class="text-xl font-bold text-foreground mb-2">
                Aucune annonce trouvée
              </h3>
              <p class="text-muted-foreground mb-4">
                Essayez de modifier vos critères de recherche.
              </p>
              <button @click="resetFilters"
                class="bg-secondary text-white px-6 py-2 rounded-[.45rem] font-semibold hover:bg-primary transition-colors">
                Réinitialiser les filtres
              </button>
            </div>

            <!-- Résultats -->
            <template v-else>
              <div v-for="property in properties" :key="property.id"
                class="bg-card rounded-[.45rem] shadow-lg overflow-hidden border border-border hover:border-secondary transition-all group property-card">
                <div class="flex flex-col md:flex-row">
                  <!-- Image Section -->
                  <div class="md:w-2/5 relative h-56 md:h-auto md:self-stretch overflow-hidden">
                    <img :src="property.image" :alt="property.title"
                      class="w-full h-full md:absolute md:inset-0 object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:bg-gradient-to-r">
                    </div>
                    <div
                      class="absolute top-3 right-3 bg-secondary text-white px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
                      {{ property.type === "rent" ? "À louer" : "À vendre" }}
                    </div>
                    <div
                      class="absolute bottom-3 right-3 bg-black/60 text-white px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">
                      <i class="fas fa-camera mr-1"></i> Photos
                    </div>
                  </div>

                  <!-- Content Section -->
                  <div class="md:w-3/5 p-6 flex flex-col justify-between">
                    <div>
                      <div class="flex justify-between items-start mb-2">
                        <h2
                          class="text-xl md:text-2xl font-bold text-foreground group-hover:text-secondary transition-colors line-clamp-1">
                          {{ property.title }}
                        </h2>
                        <button @click.prevent="toggleFavorite(property.id)"
                          class="text-muted-foreground hover:text-destructive transition-colors">
                          <i :class="[
                            isFavorite(property.id)
                              ? 'fas text-destructive'
                              : 'far',
                            'fa-heart text-xl',
                          ]"></i>
                        </button>
                      </div>

                      <p class="text-foreground/80 mb-4 line-clamp-2 text-sm md:text-base">
                        {{ property.description }}
                      </p>

                      <div class="flex items-center text-secondary mb-4 text-sm font-medium">
                        <i class="fas fa-map-marker-alt mr-2"></i>
                        <span>{{ property.location }}</span>
                        <span v-if="property.city"
                          class="hidden sm:inline-block ml-4 text-xs text-muted-foreground px-2 py-0.5 rounded bg-muted">
                          {{ property.city }}
                        </span>
                      </div>

                      <!-- Détails -->
                      <div class="flex flex-wrap gap-4 mb-4 pb-4 border-b border-border">
                        <div class="flex items-center text-foreground/80 text-sm">
                          <i class="fas fa-check-circle text-secondary mr-1.5"></i>
                          <span>{{ property.rooms || 0 }} Chambres</span>
                        </div>
                        <div class="flex items-center text-foreground/80 text-sm">
                          <i class="fas fa-check-circle text-secondary mr-1.5"></i>
                          <span>{{ property.bathrooms || 0 }} Douches</span>
                        </div>
                        <div v-if="property.area" class="flex items-center text-foreground/80 text-sm">
                          <i class="fas fa-check-circle text-secondary mr-1.5"></i>
                          <span>{{ property.area }} m²</span>
                        </div>
                        <div v-if="property.category" class="flex items-center text-foreground/80 text-sm">
                          <i class="fas fa-check-circle text-secondary mr-1.5"></i>
                          <span>{{ property.category }}</span>
                        </div>
                      </div>

                      <!-- Bailleur -->
                      <div v-if="property.owner" class="flex items-center gap-2 text-sm text-muted-foreground mr-auto">
                        <img v-if="property.owner.avatar_url" :src="property.owner.avatar_url"
                          class="w-6 h-6 rounded-full object-cover border border-border" />
                        <i v-else class="fas fa-user-circle text-lg text-muted-foreground"></i>
                        <span>{{ property.owner.name }}</span>
                      </div>
                    </div>

                    <div class="flex justify-between items-center mt-4">
                      <div>
                        <div class="text-secondary font-bold text-2xl">
                          {{ formatPrice(property.price) }} F
                          <span class="text-muted-foreground font-normal text-base">/ mois</span>
                        </div>
                        <p class="text-sm text-muted-foreground/70">
                          Charges incluses
                        </p>
                      </div>
                      <RouterLink :to="`/annonces/${property.slug}`"
                        class="bg-secondary text-white px-6 py-3 rounded-[.45rem] font-semibold hover:bg-primary transition-colors shadow-md hover:shadow-lg">
                        Voir les détails
                      </RouterLink>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>

          <!-- Pagination -->
          <div v-if="totalPages > 1" class="flex items-center justify-center gap-2 mt-10">
            <button @click="propertyStore.fetchProperties(Math.max(1, pagination.current_page - 1))"
              :disabled="pagination.current_page === 1"
              class="w-10 h-10 rounded-[.45rem] border border-border flex items-center justify-center disabled:opacity-50 hover:bg-muted transition-colors bg-background text-foreground">
              <i class="fas fa-chevron-left text-muted-foreground"></i>
            </button>
            <button v-for="page in pageNumbers" :key="page" @click="propertyStore.fetchProperties(page)" :class="[
              'w-10 h-10 rounded-[.45rem] font-medium transition-colors',
              pagination.current_page === page
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-background border border-border hover:bg-muted text-foreground',
            ]">
              {{ page }}
            </button>
            <button @click="propertyStore.fetchProperties(Math.min(totalPages, pagination.current_page + 1))"
              :disabled="pagination.current_page === totalPages"
              class="w-10 h-10 rounded-[.45rem] border border-border flex items-center justify-center disabled:opacity-50 hover:bg-muted transition-colors bg-background text-foreground">
              <i class="fas fa-chevron-right text-muted-foreground"></i>
            </button>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useAuthStore } from "../../stores/auth";
import { usePropertyStore } from "../../stores/properties";
import axios from "../../axios";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const propertyStore = usePropertyStore();

// UI State
const showMobileFilters = ref(false);
const showSortDropdown = ref(false);
const openSections = ref({
  types: true,
  cities: true,
  price: true,
  surface: true,
  rooms: true,
  etat: true,
  commodites: true,
});

// Store State & Getters
const {
  properties,
  pagination,
  aggregates,
  filters,
  isLoading,
  activeFiltersCount,
  totalPages,
  pageNumbers
} = storeToRefs(propertyStore);

const propertyTypes = computed(() => aggregates.value.types || []);
const cities = computed(() => aggregates.value.cities || []);
const etats = computed(() => aggregates.value.etats || []);
const amenitiesList = computed(() => aggregates.value.amenities || []);

// Sorting options
const sortOptions = [
  { label: "Pertinence", value: "recent" },
  { label: "Prix croissant", value: "price-asc" },
  { label: "Prix décroissant", value: "price-desc" },
  { label: "Surface", value: "area" },
];
const sortLabels = {
  recent: "Pertinence",
  "price-asc": "Prix croissant",
  "price-desc": "Prix décroissant",
  area: "Surface",
};

// Debounce logic
let filterTimer = null;
const scheduleRefetch = (delay = 300) => {
  clearTimeout(filterTimer);
  filterTimer = setTimeout(() => {
    propertyStore.fetchProperties(1);
  }, delay);
};

// Watchers for filtering
watch(() => filters.value.search, () => scheduleRefetch(450));
watch(() => filters.value.types, () => scheduleRefetch(200), { deep: true });
watch(() => filters.value.cities, () => scheduleRefetch(200), { deep: true });
watch(() => filters.value.etats, () => scheduleRefetch(200), { deep: true });
watch(() => filters.value.amenities, () => scheduleRefetch(200), { deep: true });
watch(() => filters.value.minPrice, () => scheduleRefetch(450));
watch(() => filters.value.maxPrice, () => scheduleRefetch(450));
watch(() => filters.value.minRooms, () => scheduleRefetch(200));
watch(() => filters.value.sortBy, () => propertyStore.fetchProperties(1));

// Watch route for header search
watch(
  () => route.query.search,
  (newSearch) => {
    filters.value.search = newSearch || "";
    propertyStore.fetchProperties(1);
  }
);

onMounted(() => {
  // Sync filters with URL
  if (route.query.search) filters.value.search = route.query.search;
  if (route.query.neighborhood) {
    filters.value.search = filters.value.search
      ? filters.value.search + ' ' + route.query.neighborhood
      : route.query.neighborhood;
  }
  if (route.query.city) filters.value.cities = [route.query.city];
  if (route.query.type) filters.value.types = [route.query.type];
  if (route.query.max_price) filters.value.maxPrice = Number(route.query.max_price);

  propertyStore.fetchProperties();
});

const resetFilters = () => propertyStore.resetFilters();

const toggleFavorite = async (id) => {
  if (!authStore.user) {
    router.push({ name: "Connexion" });
    return;
  }
  await propertyStore.toggleFavorite(id);
};

const isFavorite = (id) => {
  const prop = properties.value.find((p) => p.id === id);
  return prop?.is_favorite || false;
};

const formatPrice = (price) => new Intl.NumberFormat("fr-FR").format(price);
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: hsl(var(--muted));
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: hsl(var(--primary));
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--primary) / 0.8);
}

/* Animation de chargement */
@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }

  100% {
    background-position: 200% 0;
  }
}

.bg-muted\/50 {
  background: linear-gradient(90deg, hsl(var(--muted)) 25%, hsl(var(--muted)/0.3) 50%, hsl(var(--muted)) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
}

/* Style pour l'input range */
input[type=range] {
  -webkit-appearance: none;
  background: transparent;
}

input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background: hsl(var(--secondary));
  cursor: pointer;
  margin-top: -6px;
  border: 2px solid hsl(var(--background));
}

input[type=range]::-moz-range-thumb {
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background: hsl(var(--secondary));
  cursor: pointer;
  border: 2px solid hsl(var(--background));
}

input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 4px;
  background: hsl(var(--secondary) / 0.3);
  border-radius: 2px;
}

input[type=range]::-moz-range-track {
  width: 100%;
  height: 4px;
  background: hsl(var(--secondary) / 0.3);
  border-radius: 2px;
}
</style>