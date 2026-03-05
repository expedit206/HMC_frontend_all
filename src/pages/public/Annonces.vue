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
          class="flex-1 flex items-center justify-center gap-2 bg-background border border-border rounded-lg px-4 py-2 shadow-sm">
          <i class="fas fa-filter text-primary"></i>
          <span class="font-semibold text-foreground">Filtres</span>
        </button>
        <button
          class="flex-1 flex items-center justify-center gap-2 bg-background border border-border rounded-lg px-4 py-2 shadow-sm">
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
                  class="w-full bg-background border border-input rounded-[.45rem] pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all" />
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
                      class="flex items-center p-2 hover:bg-muted/50 rounded-[.45rem] cursor-pointer transition-colors">
                      <input type="checkbox" :value="type.value" v-model="filters.types"
                        class="mr-2 w-4 h-4 rounded border-input text-secondary focus:ring-secondary" />
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
                      class="w-full bg-background border border-input rounded-[.45rem] pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent" />
                  </div>
                  <div class="max-h-40 overflow-y-auto custom-scrollbar">
                    <label v-for="city in cities" :key="city.value"
                      class="flex items-center justify-between p-2 hover:bg-muted/50 rounded-[.45rem] cursor-pointer transition-colors">
                      <div class="flex items-center">
                        <input type="checkbox" :value="city.value" v-model="filters.cities"
                          class="mr-3 w-4 h-4 rounded border-input text-secondary focus:ring-secondary" />
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
                      class="w-full bg-background border border-input rounded-[.45rem] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent" />
                    <input v-model.number="filters.maxPrice" type="number" placeholder="Max"
                      class="w-full bg-background border border-input rounded-[.45rem] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent" />
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
                      class="w-full bg-background border border-input rounded-[.45rem] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent" />
                    <input type="number" placeholder="Max"
                      class="w-full bg-background border border-input rounded-[.45rem] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent" />
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
                        : 'border-border hover:border-secondary hover:text-secondary bg-background',
                    ]">
                      Toutes
                    </button>
                    <button @click="filters.minRooms = -1" :class="[
                      'px-4 py-2 border rounded-full text-sm font-medium transition-colors',
                      filters.minRooms === -1
                        ? 'bg-secondary border-secondary text-white'
                        : 'border-border hover:border-secondary hover:text-secondary bg-background',
                    ]">
                      Studio
                    </button>
                    <button v-for="room in [1, 2, 3, 4]" :key="room" @click="
                      filters.minRooms = filters.minRooms === room ? 0 : room
                      " :class="[
                        'px-4 py-2 border rounded-full text-sm font-medium transition-colors',
                        filters.minRooms === room
                          ? 'bg-secondary border-secondary text-white'
                          : 'border-border hover:border-secondary hover:text-secondary bg-background',
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
                      :class="filters.etats.includes(e.value) ? 'bg-secondary/10' : ''
                        ">
                      <input type="checkbox" :value="e.value" v-model="filters.etats"
                        class="mr-2 w-4 h-4 rounded border-input text-secondary focus:ring-secondary" />
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
                      :class="filters.amenities.includes(a.value)
                          ? 'bg-secondary/10'
                          : ''
                        ">
                      <input type="checkbox" :value="a.value" v-model="filters.amenities"
                        class="mr-2 w-4 h-4 rounded border-input text-secondary focus:ring-secondary" />
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
                class="text-xs text-red-500 hover:text-red-600 font-medium flex items-center gap-1 transition-colors">
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
                <p class="text-foreground/60 mt-1">
                  Affinez votre recherche avec les filtres pour trouver le
                  logement idéal
                </p>
              </div>
              <div class="flex items-center gap-3">
                <!-- Bouton Trier avec dropdown -->
                <div class="relative">
                  <button @click="showSortDropdown = !showSortDropdown"
                    class="flex items-center gap-2 border border-border rounded-[.45rem] px-4 py-2.5 text-sm font-medium hover:border-secondary hover:text-secondary transition-colors bg-background">
                    <i class="fas fa-sort-amount-down"></i>
                    Trier par: {{ sortLabels[sortBy] }}
                    <i class="fas fa-chevron-down ml-1 text-xs"></i>
                  </button>
                  <div v-if="showSortDropdown"
                    class="absolute right-0 mt-1 w-48 bg-card border border-border rounded-[.45rem] shadow-lg z-10">
                    <div class="py-1">
                      <button v-for="opt in sortOptions" :key="opt.value" @click="
                        sortBy = opt.value;
                      showSortDropdown = false;
                      "
                        class="w-full text-left px-4 py-2 text-sm hover:bg-muted/50 flex justify-between items-center">
                        {{ opt.label }}
                        <i v-if="sortBy === opt.value" class="fas fa-check text-secondary"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  class="flex items-center gap-2 border border-border rounded-[.45rem] px-4 py-2.5 text-sm font-medium hover:border-secondary hover:text-secondary transition-colors bg-background">
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
                <button class="text-white hover:text-gray-200" @click="
                  filters.cities = filters.cities.filter((c) => c !== city)
                  ">
                  <i class="fas fa-times text-xs"></i>
                </button>
              </span>

              <span v-for="type in filters.types" :key="type"
                class="px-3 py-1.5 bg-secondary text-white text-sm rounded-full flex items-center gap-2">
                {{ type }}
                <button class="text-white hover:text-gray-200" @click="
                  filters.types = filters.types.filter((t) => t !== type)
                  ">
                  <i class="fas fa-times text-xs"></i>
                </button>
              </span>

              <span v-if="filters.minRooms"
                class="px-3 py-1.5 bg-secondary text-white text-sm rounded-full flex items-center gap-2">
                {{ filters.minRooms }}+ chambres
                <button class="text-white hover:text-gray-200" @click="filters.minRooms = 0">
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
                  <div class="md:w-2/5 h-56 md:h-48 sk"></div>
                  <div class="md:w-3/5 p-6 space-y-3">
                    <div class="sk h-6 w-3/4 rounded"></div>
                    <div class="sk h-4 w-full rounded"></div>
                    <div class="sk h-4 w-4/5 rounded"></div>
                    <div class="flex gap-4 pt-2">
                      <div class="sk h-4 w-20 rounded"></div>
                      <div class="sk h-4 w-20 rounded"></div>
                      <div class="sk h-4 w-20 rounded"></div>
                    </div>
                    <div class="flex justify-end pt-2">
                      <div class="sk h-10 w-36 rounded-[.45rem]"></div>
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
                          class="text-muted-foreground hover:text-red-500 transition-colors">
                          <i :class="[
                            isFavorite(property.id)
                              ? 'fas text-red-500'
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
                          class="w-6 h-6 rounded-full object-cover" />
                        <i v-else class="fas fa-user-circle text-lg"></i>
                        <span>{{ property.owner.name }}</span>
                      </div>
                    </div>

                    <div class="flex justify-between items-center mt-4">
                      <div>
                        <div class="text-secondary font-bold text-2xl">
                          {{ formatPrice(property.price) }} F
                          <span class="text-foreground/60 font-normal text-base">/ mois</span>
                        </div>
                        <p class="text-sm text-foreground/50">
                          Charges incluses
                        </p>
                      </div>
                      <RouterLink :to="`/annonces/${property.id}`"
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
            <button @click="currentPage = Math.max(1, currentPage - 1)" :disabled="currentPage === 1"
              class="w-10 h-10 rounded-[.45rem] border border-border flex items-center justify-center disabled:opacity-50 hover:bg-muted transition-colors">
              <i class="fas fa-chevron-left text-muted-foreground"></i>
            </button>
            <button v-for="page in pageNumbers" :key="page" @click="currentPage = page" :class="[
              'w-10 h-10 rounded-[.45rem] font-medium transition-colors',
              currentPage === page
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-background border border-border hover:bg-muted text-foreground',
            ]">
              {{ page }}
            </button>
            <button @click="currentPage = Math.min(totalPages, currentPage + 1)" :disabled="currentPage === totalPages"
              class="w-10 h-10 rounded-[.45rem] border border-border flex items-center justify-center disabled:opacity-50 hover:bg-muted transition-colors">
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
import { useAuthStore } from "../../stores/auth";
import axios from "../../axios";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const isLoading = ref(true);
const currentPage = ref(1);
const sortBy = ref("recent");
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

// ─── Données API ──────────────────────────────────────────────────
const properties = ref([]);
const pagination = ref({ total: 0, last_page: 1, current_page: 1 });
const propertyTypes = ref([]);
const cities = ref([]);
const etats = ref([]);
const amenitiesList = ref([]);

// ─── Filtres ──────────────────────────────────────────────────────
const filters = ref({
  search: "",
  cities: [],
  types: [],
  minPrice: null,
  maxPrice: null,
  minRooms: 0,
  etats: [],
  amenities: [],
});

// ─── Options de tri ───────────────────────────────────────────────
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

// ─── Fetch principal ──────────────────────────────────────────────
const fetchProperties = async () => {
  isLoading.value = true;
  try {
    const params = {
      page: currentPage.value,
      sort: sortBy.value,
      search: filters.value.search || undefined,
      min_price: filters.value.minPrice || undefined,
      max_price: filters.value.maxPrice || undefined,
      min_rooms:
        filters.value.minRooms > 0 ? filters.value.minRooms : undefined,
    };
    if (filters.value.types.length > 0)
      params.types = filters.value.types.join(",");
    if (filters.value.cities.length > 0)
      params.cities = filters.value.cities.join(",");
    if (filters.value.etats.length > 0)
      params.etats = filters.value.etats.join(",");
    if (filters.value.amenities.length > 0)
      params.amenities = filters.value.amenities.join(",");

    const { data } = await axios.get("/api/properties", { params });

    properties.value = data.data.data || [];
    pagination.value = {
      total: data.data.total || 0,
      last_page: data.data.last_page || 1,
      current_page: data.data.current_page || 1,
    };

    if (data.aggregates) {
      propertyTypes.value = data.aggregates.types || [];
      cities.value = data.aggregates.cities || [];
      etats.value = data.aggregates.etats || [];
      amenitiesList.value = data.aggregates.amenities || [];
    }
  } catch (err) {
    console.error("Erreur chargement annonces:", err);
  } finally {
    isLoading.value = false;
  }
};

// ─── Debounce universel ───────────────────────────────────────────
let filterTimer = null;
const scheduleRefetch = (delay = 300) => {
  clearTimeout(filterTimer);
  filterTimer = setTimeout(() => {
    currentPage.value = 1;
    fetchProperties();
  }, delay);
};

// Recherche texte → debounce plus long
watch(
  () => filters.value.search,
  () => scheduleRefetch(450),
);

// Checkboxes → petit délai pour les sélections groupées
watch(
  () => filters.value.types,
  () => scheduleRefetch(200),
  { deep: true },
);
watch(
  () => filters.value.cities,
  () => scheduleRefetch(200),
  { deep: true },
);
watch(
  () => filters.value.etats,
  () => scheduleRefetch(200),
  { deep: true },
);
watch(
  () => filters.value.amenities,
  () => scheduleRefetch(200),
  { deep: true },
);

// Prix & chambres → debounce normal
watch(
  () => filters.value.minPrice,
  () => scheduleRefetch(450),
);
watch(
  () => filters.value.maxPrice,
  () => scheduleRefetch(450),
);
watch(
  () => filters.value.minRooms,
  () => scheduleRefetch(200),
);

// Tri → immédiat
watch(sortBy, () => {
  currentPage.value = 1;
  fetchProperties();
});

// Pagination → immédiat
watch(currentPage, fetchProperties);

onMounted(() => {
  // Initialisation du filtre de recherche depuis l'URL si présent
  if (route.query.search) {
    filters.value.search = route.query.search;
  }
  // advanced search query parameters from home page
  if (route.query.neighborhood) {
    // on l'ajoute à la recherche texte globale si elle était vide
    filters.value.search = filters.value.search
      ? filters.value.search + ' ' + route.query.neighborhood
      : route.query.neighborhood;
  }
  if (route.query.city) {
    filters.value.cities = [route.query.city];
  }
  if (route.query.type) {
    filters.value.types = [route.query.type];
  }
  if (route.query.max_price) {
    filters.value.maxPrice = Number(route.query.max_price);
  }

  fetchProperties();
});

// Observation des changements de recherche depuis le header
watch(
  () => route.query.search,
  (newSearch) => {
    if (newSearch !== undefined) {
      filters.value.search = newSearch;
      fetchProperties();
    } else if (newSearch === undefined) {
      filters.value.search = "";
      fetchProperties();
    }
  },
);

// ─── Computed ─────────────────────────────────────────────────────
const activeFiltersCount = computed(() => {
  let c = 0;
  if (filters.value.cities.length) c++;
  if (filters.value.types.length) c++;
  if (filters.value.etats.length) c++;
  if (filters.value.amenities.length) c++;
  if (filters.value.minPrice || filters.value.maxPrice) c++;
  if (filters.value.minRooms > 0) c++;
  return c;
});

const totalPages = computed(() => pagination.value.last_page);
const pageNumbers = computed(() => {
  const pages = [];
  for (let i = 1; i <= totalPages.value; i++) pages.push(i);
  return pages;
});

// ─── Actions ──────────────────────────────────────────────────────
const applyFilters = () => {
  currentPage.value = 1;
  fetchProperties();
};

const resetFilters = () => {
  filters.value = {
    search: "",
    cities: [],
    types: [],
    minPrice: null,
    maxPrice: null,
    minRooms: 0,
    etats: [],
    amenities: [],
  };
  sortBy.value = "recent";
  currentPage.value = 1;
};

const toggleFavorite = async (id) => {
  if (!authStore.user) {
    router.push({ name: "Connexion" });
    return;
  }

  try {
    const { data } = await axios.post("/api/tenant/favorites/toggle", {
      property_id: id,
    });
    if (data.success) {
      // Mettre à jour localement l'état is_favorite de la propriété
      const prop = properties.value.find((p) => p.id === id);
      if (prop) prop.is_favorite = data.status === "added";
    }
  } catch (err) {
    console.error("Erreur favoris:", err);
  }
};

const isFavorite = (id) => {
  const prop = properties.value.find((p) => p.id === id);
  return prop?.is_favorite || false;
};

// ─── Formatage ────────────────────────────────────────────────────
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

/* Skeleton shimmer */
.sk {
  background: linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%);
  background-size: 200% 100%;
  animation: shimmer 1.6s ease-in-out infinite;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }

  100% {
    background-position: -200% 0;
  }
}
</style>
