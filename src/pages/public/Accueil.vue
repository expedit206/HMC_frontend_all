<template>
  <div class="accueil-page bg-background">
    <!-- ═══════════════════════════════════════════════════════════
         HERO SECTION — Cinematic Multi-Role Slider
    ═══════════════════════════════════════════════════════════ -->
    <section class="hero-root relative overflow-hidden">

      <!-- ── Ambient Particles ── -->
      <div class="particles-layer" aria-hidden="true">
        <span v-for="n in 18" :key="n" :class="`hpt-particle hpt-${n}`"></span>
      </div>

      <!-- ── Background slides (crossfade images) ── -->
      <transition-group name="hero-bg" tag="div" class="absolute inset-0">
        <div
          v-for="(slide, i) in heroSlides"
          v-show="currentSlide === i"
          :key="slide.role"
          class="absolute inset-0 hero-bg-item"
          :style="{ backgroundImage: `url(${slide.bg})` }"
        ></div>
      </transition-group>

      <!-- ── Multi-layer overlay ── -->
      <div class="hero-overlay"></div>

      <!-- ── Main Content ── -->
      <div class="relative z-10  px-4 sm:px-6 lg:px-8 pt-8 pb-6 lg:pt-12 lg:pb-8">

        <!-- Layout: content left + card right -->
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-center">

          <!-- ───────────── LEFT: Slide Content ───────────── -->
          <div class="lg:col-span-3">

            <!-- Role badge -->
            <transition name="badge-pop" mode="out-in">
              <div :key="currentSlide" class="inline-flex items-center gap-2 mb-4">
                <span
                  class="role-badge px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2"
                  :style="{ background: heroSlides[currentSlide].accentBg, color: heroSlides[currentSlide].accentText, borderColor: heroSlides[currentSlide].accentBorder }"
                >
                  <i :class="'fas fa-' + heroSlides[currentSlide].icon"></i>
                  {{ heroSlides[currentSlide].role }}
                </span>
                <span class="h-px w-8 bg-white/30"></span>
                <span class="text-white/50 text-[10px] uppercase tracking-widest">HomeCameroon</span>
              </div>
            </transition>

            <!-- Main headline -->
            <transition name="slide-up" mode="out-in">
              <h1 :key="'h-' + currentSlide" class="hero-headline text-white">
                {{ heroSlides[currentSlide].headline }}
                <span :style="{ color: heroSlides[currentSlide].accentText }" class="headline-accent">
                  {{ heroSlides[currentSlide].headlineAccent }}
                </span>
              </h1>
            </transition>

            <!-- Subtitle -->
            <transition name="slide-up-delay" mode="out-in">
              <p :key="'p-' + currentSlide" class="hero-subtitle text-white/80 mt-3 mb-6 max-w-lg">
                {{ heroSlides[currentSlide].subtitle }}
              </p>
            </transition>

            
            <!-- ── Floating Stat Chips ── -->
            <transition name="slide-up-delay3" mode="out-in">
              <div :key="'stats-' + currentSlide" class="flex flex-wrap gap-3">
                <div
                  v-for="stat in heroSlides[currentSlide].stats"
                  :key="stat.label"
                  class="stat-chip flex items-center gap-2"
                >
                  <div class="stat-chip-icon" :style="{ background: heroSlides[currentSlide].accentBg }">
                    <i :class="'fas fa-' + stat.icon" :style="{ color: heroSlides[currentSlide].accentText }"></i>
                  </div>
                  <div>
                    <div class="text-white font-bold text-sm leading-none">{{ stat.value }}</div>
                    <div class="text-white/55 text-[10px] leading-none mt-0.5">{{ stat.label }}</div>
                  </div>
                </div>
              </div>
            </transition>
          </div>

          <!-- ───────────── RIGHT: Search Card ───────────── -->
          <div class="lg:col-span-2">
            <div class="hero-search-card">
              <div class="flex items-center gap-2 mb-4">
                <div class="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                  <i class="fas fa-search text-primary text-xs"></i>
                </div>
                <h3 class="text-sm font-bold text-foreground">Trouver un bien</h3>
              </div>

              <div class="space-y-3">
                <div class="hero-field">
                  <i class="fas fa-map-marker-alt text-muted-foreground text-xs w-4"></i>
                  <select v-model="searchFilters.city" class="hero-select">
                    <option value="" class="bg-card">Toutes les villes</option>
                    <option v-for="city in cities" :key="city" :value="city.toLowerCase()" class="bg-card">{{ city }}</option>
                  </select>
                  <i class="fas fa-chevron-down text-muted-foreground/50 text-[10px]"></i>
                </div>

                <div class="hero-field">
                  <i class="fas fa-home text-muted-foreground text-xs w-4"></i>
                  <select v-model="searchFilters.type" class="hero-select">
                    <option value="" class="bg-card">Type de bien</option>
                    <option v-for="type in propertyTypes" :key="type" :value="type.toLowerCase()" class="bg-card">{{ type }}</option>
                  </select>
                  <i class="fas fa-chevron-down text-muted-foreground/50 text-[10px]"></i>
                </div>

                <div class="hero-field">
                  <i class="fas fa-street-view text-muted-foreground text-xs w-4"></i>
                  <input v-model="searchFilters.neighborhood" list="quartiers-hero" placeholder="Quartier..."
                    class="hero-select" />
                  <datalist id="quartiers-hero">
                    <option v-for="q in neighborhoods" :key="q" :value="q" />
                  </datalist>
                </div>

                <div>
                  <div class="flex justify-between mb-1.5">
                    <span class="text-muted-foreground text-[11px]">Budget max</span>
                    <span class="text-foreground text-[11px] font-semibold">{{ formatBudget(searchFilters.budget) }} FCFA</span>
                  </div>
                  <input v-model="searchFilters.budget" type="range" min="15000" max="500000" step="5000"
                    class="hero-range w-full" />
                </div>

                <button @click="handleSearch" class="hero-search-btn w-full">
                  <i class="fas fa-search text-xs"></i>
                  Rechercher
                  <i class="fas fa-arrow-right text-xs ml-auto"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- ══ Role Navigator Tabs (bottom) ══ -->
        <div class="role-nav-bar mt-8">
          <button
            v-for="(slide, i) in heroSlides"
            :key="slide.role"
            @click="goToSlide(i)"
            :class="['role-nav-btn', { active: currentSlide === i }]"
            :style="currentSlide === i ? { borderColor: slide.accentText, color: slide.accentText } : {}"
          >
            <span class="role-nav-icon" :style="currentSlide === i ? { background: slide.accentBg } : {}">
              <i :class="'fas fa-' + slide.icon"
                :style="currentSlide === i ? { color: slide.accentText } : {}"></i>
            </span>
            <span class="hidden sm:inline text-xs font-semibold text-white">{{ slide.role }}</span>
            <!-- Active progress bar -->
            <span v-if="currentSlide === i" class="role-nav-progress"
              :style="{ background: slide.accentText, animationDuration: slideDuration + 'ms' }"
            ></span>
          </button>
        </div>
      </div>
    </section>
    <!-- CATÉGORIES en scroll horizontal -->
    <section class="py-6 md:py-4 bg-card border-b border-border">
      <div class=" mx-auto px-4">
        <!-- Squelettes catégories -->
        <div v-if="isLoading" class="flex gap-4 py-2 overflow-hidden">
          <SkeletonLoader v-for="n in 6" :key="n" type="category" />
        </div>

        <!-- Conteneur de défilement horizontal -->
        <div v-else class="relative overflow-hidden">
          <div class="animate-scroll gap-4 py-2">
            <a v-for="category in [...categories, ...categories]"
              :key="category.uniqueKey || category.id + '_' + Math.random()" href="#"
              class="group flex items-center gap-3 bg-card rounded-[.45rem] px-5 py-3 shadow-sm hover:shadow-md border border-border hover:border-secondary transition-all flex-shrink-0 min-w-[200px]">
              <div
                class="w-10 h-10 rounded-[.45rem] bg-linear-to-br from-primary/10 to-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <i :class="`fas fa-${category.icon} text-lg text-primary`"></i>
              </div>
              <div class="pr-2">
                <h3 class="text-sm font-semibold text-foreground group-hover:text-primary whitespace-nowrap">
                  {{ category.name }}
                </h3>
                <p class="text-xs text-muted-foreground">
                  {{ category.count }} annonces
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- PROPRIÉTÉS POPULAIRES - Nouveaux biens disponibles -->
    <section class="py-8 md:py-12 bg-background">
      <div class=" mx-auto px-4">
        <!-- En-tête -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-6 md:mb-10">
          <div class="text-center sm:text-left">
            <h2 class="text-2xl md:text-3xl font-bold text-foreground">
              Nouveaux biens disponibles
            </h2>
            <p class="text-muted-foreground mt-2">
              Découvrez les dernières annonces ajoutées par nos bailleurs
              vérifiés
            </p>
          </div>
        </div>

        <!-- Squelettes propriétés -->
        <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <SkeletonLoader v-for="n in 5" :key="n" type="property" />
        </div>

        <!-- Grille des biens -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <div v-for="property in newProperties" :key="property.id"
            class="property-card bg-card rounded-[.45rem] overflow-hidden shadow-sm border border-border hover:shadow-lg relative">
            <!-- Image Container with Slider -->
            <div class="h-36 relative overflow-hidden group/image">
              <!-- Slider Images -->
              <div class="absolute inset-0 flex transition-transform duration-500 ease-in-out"
                :style="{ transform: `translateX(-${(property.currentImageIndex || 0) * 100}%)` }">
                <div v-for="(img, idx) in (property.all_images?.length ? property.all_images : [property.image])" :key="idx"
                  class="min-w-full h-full bg-cover bg-center"
                  :style="{ backgroundImage: `url('${prepareImageUrl(img)}')` }">
                </div>
              </div>

              <!-- Gradient overlay -->
              <!-- <div class="absolute inset-0 bg-gradient-to-t from-black/10 via-black/20 to-transparent pointer-events-none"></div> -->
              
              <!-- Badge Nouveau -->
              <div class="absolute top-2 left-2 pointer-events-none">
                <span class="bg-secondary text-secondary-foreground text-[10px] font-semibold px-2 py-0.5 rounded-full">Nouveau</span>
              </div>

              <!-- Navigation Arrows (only if multi images) -->
              <template v-if="property.all_images && property.all_images.length > 1">
                <button @click.prevent="prevPropertyImage(property)"
                  class="absolute left-8 top-1/2 -translate-y-1/2 w-6 h-6 bg-black/30 hover:bg-black/60 text-white rounded-full flex items-center justify-center transition-all  group-hover/image:opacity-100 z-30">
                  <i class="fas fa-chevron-left text-[10px]"></i>
                </button>
                <button @click.prevent="nextPropertyImage(property)"
                  class="absolute right-8 top-1/2 -translate-y-1/2 w-6 h-6 bg-black/30 hover:bg-black/60 text-white rounded-full flex items-center justify-center transition-all  group-hover/image:opacity-100 z-30">
                  <i class="fas fa-chevron-right text-[10px]"></i>
                </button>

                <!-- Pagination Dots -->
                <div class="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1 z-30 pointer-events-none">
                  <div v-for="(_, idx) in property.all_images" :key="idx"
                    class="w-1 h-1 rounded-full transition-all"
                    :class="idx === (property.currentImageIndex || 0) ? 'bg-secondary w-2' : 'bg-white/50'">
                  </div>
                </div>
              </template>

              <!-- Barre d'actions TikTok via composant réutilisable -->
              <PropertyActionBar
                :property="property"
                :is-fav="favoritesAccueil.has(property.id)"
                btn-size="sm"
                position="absolute right-2 bottom-1.5"
                @toggle-favorite="toggleFavoriteAccueil"
                @share="(p) => shareItem(p, 'property')"
              />
            </div>
            <div class="p-2">
              <div class="flex-col justify-between items-start mb-1">
                <h3 class="text-sm font-semibold text-foreground  line-clamp-1">
                  {{ property.title }}
                </h3>
                <span class="text-sm font-bold text-secondary">{{ formatPrice(property.price) }} FCFA</span>
              </div>
              <p class="text-muted-foreground text-sm mb-1 line-clamp-1">
                Par {{ property.owner }} • {{ property.date }}
              </p>
              <div class="flex items-center gap-4 text-muted-foreground text-xs mb-1">
                <div class="flex items-center gap-1">
                  <i class="fas fa-bed text-primary"></i><span>{{ property.rooms }} ch.</span>
                </div>
                <div class="flex items-center gap-1">
                  <i class="fas fa-bath text-primary"></i><span>{{ property.bathrooms }} SdB</span>
                </div>
                <div class="flex items-center gap-1">
                  <i class="fas fa-ruler text-primary"></i><span>{{ property.area }} m²</span>
                </div>
              </div>
              <RouterLink :to="{ name: 'DetailAnnonce', params: { slug: property.slug } }"
                class="text-sm block text-center w-full bg-secondary hover:bg-primary text-secondary-foreground hover:text-primary-foreground py-1 rounded-[.45rem] font-medium hover:shadow-lg transition-all border border-secondary">
                Voir plus
              </RouterLink>
            </div>
          </div>
        </div>

        <div class="mt-8 md:mt-12 text-center">
          <RouterLink :to="{ name: 'Annonces' }"
            class="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-primary text-primary-foreground font-semibold rounded-[.45rem] hover:bg-primary/90 transition-all group">
            <span>Voir toutes les annonces</span>
            <i class="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
          </RouterLink>
        </div>
      </div>
    </section>
    <!-- SECTION 2: AGENTS IMMOBILIERS -->
    <section class="py-12 md:py-16 ">
      <div class=" mx-auto px-4">
        <!-- En-tête -->
        <div class=" mb-10 md:mb-16">
          <h2 class="text-2xl md:text-4xl font-bold text-foreground mb-2 md:mb-4">
            Nos agents immobiliers
          </h2>
          <p class="text-muted-foreground max-w-2xl  text-base md:text-lg">
            Découvrez les professionnels qui gèrent les meilleures propriétés
          </p>
        </div>

        <!-- Squelettes agents -->
        <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4">
          <SkeletonLoader v-for="n in 4" :key="n" type="agent" />
        </div>

        <!-- Cartes agents -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4">
          <div v-for="agent in agents" :key="agent.id" class="group h-full">
            <div
              class="rounded-[.45rem] shadow-lg hover:shadow-2xl transition-all duration-500 border border-border overflow-hidden h-full flex flex-col hover:-translate-y-2 bg-card">
              <!-- Header avec image en fond -->
              <div class="relative h-48 md:h-56 overflow-hidden">
                <div class="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  :style="{ backgroundImage: `url(${agent.image})` }"></div>
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div class="absolute bottom-3 left-3 text-white z-10">
                  <h4 class="font-bold text-sm">{{ agent.name }}</h4>
                  <p class="text-xs opacity-90">{{ agent.location }}</p>
                </div>
              </div>

              <!-- Contenu -->
              <div class="px-3 py-3 pb-2 md:p-3 flex flex-col flex-grow">
                <h3
                  class="text-md md:text-lg font-bold text-foreground mb-1 group-hover:text-secondary transition-colors">
                  {{ agent.name }}
                </h3>
                <div class="flex items-center gap-2 mb-3">
                  <span
                    class="inline-block px-2.5 py-1 bg-primary/10 text-secondary text-xs font-semibold rounded-full">
                    {{ agent.role }}
                  </span>
                  <span class="text-xs text-muted-foreground font-medium">{{
                    agent.location
                  }}</span>
                </div>
                <p class="text-xs md:text-xs text-muted-foreground mb-1 leading-relaxed">
                  {{ agent.description }}
                </p>

                <!-- Stats -->
                <div class="flex gap-2 mb-4 py-1 border-y border-border">
                  <div class="flex-1">
                    <div class="text-xs font-bold text-secondary">
                      {{ agent.propertiesCount }}
                    </div>
                    <div class="text-xs text-muted-foreground">Propriétés</div>
                  </div>
                  <div class="h-8 w-px bg-border"></div>
                  <div class="flex-1">
                    <div class="flex items-center gap-0.5">
                      <i class="fas fa-star text-yellow-500 text-xs"></i>
                      <span class="text-xs font-bold text-secondary">{{
                        agent.rating
                      }}</span>
                    </div>
                    <div class="text-xs text-muted-foreground">
                      {{ agent.reviews }} avis
                    </div>
                  </div>
                </div>

                <!-- CTA -->
                <a href="#"
                  class="text-sm w-full mt-auto bg-secondary text-secondary-foreground font-semibold py-2 rounded-[.45rem] hover:bg-secondary/90 transition-all duration-300 flex items-center justify-center gap-2 group/btn">
                  <span>Voir profil</span>
                  <i class="fas fa-arrow-right text-sm group-hover/btn:translate-x-1 transition-transform"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- CTA Agents -->
        <div class="mt-8 md:mt-12 text-center">
          <RouterLink :to="{ name: 'AgentInscription' }"
            class="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-primary text-primary-foreground font-semibold rounded-[.45rem] hover:bg-primary/90 transition-all group">
            <i class="fas fa-user-plus"></i>
            <span>Devenir agent immobilier</span>
            <i class="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- SECTION PRESTATAIRES DE SERVICES -->
    <section class="py-12 md:py-16 bg-background">
      <div class=" mx-auto px-4 sm:px-6">
        <!-- En-tête -->
        <div class=" mb-10 md:mb-12">
          <span class="inline-block px-3 py-1 bg-secondary/10 text-secondary text-xs font-semibold rounded-full mb-3">
            Experts à votre service
          </span>
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
            Nos prestataires de services
          </h2>
          <p class="text-sm sm:text-base text-muted-foreground max-w-2xl ">
            Des professionnels qualifiés pour entretenir, rénover et améliorer
            votre logement.
          </p>
        </div>

        <!-- Squelettes services -->
        <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <SkeletonLoader v-for="n in 6" :key="n" type="service" />
        </div>

        <!-- Grille de cartes services -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <div v-for="service in services" :key="service.id"
            class="group bg-card rounded-[.45rem] shadow-sm hover:shadow-xl border border-border hover:border-secondary/30 transition-all duration-300 overflow-hidden">
            <div class="p-5 sm:p-6">
              <div class="flex items-start gap-3 mb-3">
                <div
                  class="w-10 h-10 sm:w-12 sm:h-12 rounded-[.45rem] bg-gradient-to-br from-secondary/10 to-secondary/20 flex items-center justify-center group-hover:from-secondary/20 group-hover:to-secondary/30 transition-colors shrink-0">
                  <i :class="`fas fa-${service.icon} text-base sm:text-lg text-secondary`"></i>
                </div>
                <div>
                  <h3 class="text-sm sm:text-base font-bold text-foreground leading-tight">
                    {{ service.title }}
                  </h3>
                  <p class="text-xs sm:text-sm text-muted-foreground">
                    {{ service.subtitle }}
                  </p>
                </div>
              </div>

              <p class="text-xs sm:text-sm text-muted-foreground mb-3 line-clamp-2">
                {{ service.description }}
              </p>

              <div class="flex flex-wrap gap-1.5 mb-4">
                <span v-for="tag in service.tags.slice(0, 3)" :key="tag"
                  class="px-2 py-0.5 bg-muted text-muted-foreground text-[10px] sm:text-xs rounded border border-border">{{
                    tag }}</span>
                <span v-if="service.tags.length > 3"
                  class="px-2 py-0.5 bg-muted text-muted-foreground text-[10px] sm:text-xs rounded">+{{
                    service.tags.length - 3 }}</span>
              </div>

              <a href="#"
                class="block w-full text-center px-3 py-2 sm:px-4 sm:py-2.5 bg-secondary/10 hover:bg-secondary text-secondary hover:text-primary rounded-[.45rem] font-medium text-xs sm:text-sm transition-all group/btn">
                <span class="flex items-center justify-center gap-1.5">
                  <i class="fas fa-envelope text-xs"></i>
                  Contacter
                  <i
                    class="fas fa-arrow-right text-xs opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all"></i>
                </span>
              </a>
            </div>
          </div>
        </div>

        <!-- CTA inscription -->
        <div class="mt-10 md:mt-12 text-center">
          <RouterLink :to="{ name: 'PrestataireInscription' }"
            class="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-primary text-primary-foreground font-semibold rounded-[.45rem] shadow-md hover:bg-primary/90 transition-all group">
            <i class="fas fa-briefcase text-sm"></i>
            <span class="text-sm sm:text-base">Rejoindre nos prestataires</span>
            <i class="fas fa-arrow-right text-sm group-hover:translate-x-1 transition-transform"></i>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- SECTION 4: MARKETPLACE -->
    <section class="py-8 md:py-6 md:pt-12 ">
      <div class=" mx-auto px-4">
        <div class=" mb-10 md:mb-4">
          <h2 class="text-2xl md:text-4xl font-bold text-foreground mb-2 md:mb-4">
            Marketplace - Articles pour votre maison
          </h2>
          <p class="text-muted-foreground max-w-2xl text-base md:text-lg">
            Équipez et rénovez votre logement avec nos sélections
          </p>
        </div>

        <!-- Squelettes produits -->
        <div v-if="isLoading" class="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
          <SkeletonLoader v-for="n in 5" :key="n" type="product" />
        </div>

        <div v-else class="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
          <RouterLink v-for="product in products" :key="product.id" :to="{ name: 'MarketplaceIndex' }"
            class="group bg-card rounded-[.45rem] shadow-sm hover:shadow-lg transition-all border border-border overflow-hidden">
            <div
              class="relative h-32 md:h-42 bg-muted overflow-hidden flex items-center justify-center rounded-t-[.45rem]">
              <img :src="product.image" :alt="product.name"
                class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300" />
              <div v-if="product.badge"
                class="absolute top-2 right-2 md:top-3 md:right-3 bg-secondary text-secondary-foreground text-[10px] md:text-xs font-bold px-2 py-1 rounded">
                {{ product.badge }}
              </div>
            </div>
            <div class="p-3 md:p-5">
              <h3 class="text-xs md:text-sm font-semibold text-foreground mb-1 group-hover:text-secondary truncate">
                {{ product.name }}
              </h3>
              <p class="text-[10px] md:text-xs text-muted-foreground mb-2 md:mb-3 truncate">
                {{ product.description }}
              </p>
              <div class="flex items-center justify-between">
                <div class="text-xs md:text-base font-bold text-secondary">
                  {{ formatPrice(product.price) }}
                  <span class="text-[10px] md:text-xs">FCFA</span>
                </div>
                <div
                  class="w-6 h-6 md:w-8 md:h-8 bg-secondary/10 rounded-full flex items-center justify-center group-hover:bg-secondary transition-colors">
                  <i
                    class="fas fa-arrow-right text-secondary group-hover:text-secondary-foreground text-[10px] md:text-sm transition-colors"></i>
                </div>
              </div>
            </div>
          </RouterLink>
        </div>

        <div class="mt-8 md:mt-12 text-center">
          <RouterLink :to="{ name: 'MarketplaceIndex' }"
            class="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-primary text-primary-foreground font-semibold rounded-[.45rem] shadow-md hover:bg-primary/90 transition-all group">
            <i class="fas fa-shopping-bag"></i>
            <span>Visiter la marketplace</span>
            <i class="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- SECTION AVANTAGES & CONFIANCE -->
    <section class="py-12 md:py-8 bg-card">
      <div class=" mx-auto px-4">
        <div class=" mb-10 md:mb-2">
          <h2 class="text-2xl md:text-4xl font-bold text-foreground mb-2 md:mb-4">
            Pourquoi choisir Home Cameroon ?
          </h2>
          <p class="text-muted-foreground max-w-2xl text-base md:text-lg">
            Une plateforme fiable, sécurisée et pensée pour vous
          </p>
        </div>

        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <div v-for="benefit in benefits" :key="benefit.title"
            class="bg-card rounded-[.45rem] p-6 border border-border hover:border-secondary hover:shadow-md transition-all group text-center md:text-left">
            <div
              class="w-12 h-12 bg-gradient-to-br from-primary to-primary/90 rounded-[.45rem] flex items-center justify-center mb-4 text-primary-foreground mx-auto md:mx-0 group-hover:scale-110 transition-transform shadow-sm">
              <i :class="`fas fa-${benefit.icon} text-lg`"></i>
            </div>
            <h3 class="text-sm md:text-lg font-bold text-foreground mb-2">
              {{ benefit.title }}
            </h3>
            <p class="text-xs md:text-sm text-muted-foreground">
              {{ benefit.description }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { RouterLink, useRouter } from "vue-router";
import axios from "../../axios";
import SkeletonLoader from "@/SkeletonLoader.vue";
import PropertyActionBar from "@/PropertyActionBar.vue";

const router = useRouter();

// State
const isLoading = ref(true);
const error = ref(null);

const searchFilters = ref({
  city: "",
  type: "",
  budget: 500000,
  neighborhood: "",
});

// ═══════════════════════════════════════════════
// HERO SLIDER
// ═══════════════════════════════════════════════
const currentSlide = ref(0);
const slideDuration = 6000;
let sliderInterval = null;

const heroSlides = [
  {
    role: "Locataire",
    icon: "user",
    bg: "/images/categoriebien/appart.jfif",
    headline: "Trouvez votre",
    headlineAccent: "appartement idéal",
    subtitle: "Des milliers de biens vérifiés à Douala, Yaoundé et partout au Cameroun. Visitez, postulez et emménagez en toute sérénité.",
    accentBg: "hsl(var(--secondary) / 0.2)",
    accentText: "hsl(var(--secondary))",
    accentBorder: "hsl(var(--secondary) / 0.4)",
    ctaPrimary: { label: "Parcourir les biens", icon: "th-large", link: "/annonces" },
    ctaSecondary: { label: "Comment ça marche", icon: "play-circle", link: "/comment-ca-marche" },
    stats: [
      { value: "1 200+", label: "Biens disponibles", icon: "building" },
      { value: "98%", label: "Locataires satisfaits", icon: "smile" },
      { value: "48h", label: "Délai moyen de réponse", icon: "clock" },
    ],
  },
  {
    role: "Bailleur",
    icon: "key",
    bg: "/images/categoriebien/villj.jfif",
    headline: "Gérez et rentabilisez",
    headlineAccent: "vos propriétés",
    subtitle: "Publiez vos annonces gratuitement, suivez vos locations et encaissez vos loyers — tout depuis un tableau de bord centralisé.",
    accentBg: "hsl(var(--secondary) / 0.2)",
    accentText: "hsl(var(--secondary))",
    accentBorder: "hsl(var(--secondary) / 0.4)",
    ctaPrimary: { label: "Publier une annonce", icon: "plus-circle", link: "/bailleur/dashboard" },
    ctaSecondary: { label: "Estimez votre loyer", icon: "chart-line", link: "/annonces" },
    stats: [
      { value: "300+", label: "Propriétaires actifs", icon: "users" },
      { value: "0 FCFA", label: "Publication gratuite", icon: "tag" },
      { value: "95%", label: "Taux d'occupation", icon: "percentage" },
    ],
  },
  {
    role: "Prestataire",
    icon: "tools",
    bg: "/images/categoriebien/studio.jfif",
    headline: "Développez votre",
    headlineAccent: "activité de services",
    subtitle: "Plombiers, électriciens, peintres, agents de nettoyage — rejoignez notre réseau et connectez-vous à des clients qualifiés.",
    accentBg: "hsl(var(--secondary) / 0.2)",
    accentText: "hsl(var(--secondary))",
    accentBorder: "hsl(var(--secondary) / 0.4)",
    ctaPrimary: { label: "Rejoindre le réseau", icon: "handshake", link: "/marketplace" },
    ctaSecondary: { label: "Voir les services", icon: "list", link: "/marketplace" },
    stats: [
      { value: "150+", label: "Prestataires certifiés", icon: "certificate" },
      { value: "20+", label: "Catégories de service", icon: "th", },
      { value: "4.8★", label: "Note moyenne", icon: "star" },
    ],
  },
  {
    role: "Agent immobilier",
    icon: "briefcase",
    bg: "/images/categoriebien/dupp.jfif",
    headline: "Boostez vos",
    headlineAccent: "commissions & transactions",
    subtitle: "Un espace professionnel dédié pour gérer vos mandats, planifier vos visites et suivre chaque dossier locatif de A à Z.",
    accentBg: "hsl(var(--secondary) / 0.2)",
    accentText: "hsl(var(--secondary))",
    accentBorder: "hsl(var(--secondary) / 0.4)",
    ctaPrimary: { label: "Mon espace agent", icon: "tachometer-alt", link: "/agent/dashboard" },
    ctaSecondary: { label: "Voir les missions", icon: "map-marked-alt", link: "/annonces" },
    stats: [
      { value: "80+", label: "Agents certifiés HMC", icon: "id-badge" },
      { value: "500+", label: "Transactions réussies", icon: "handshake" },
      { value: "10", label: "Régions couvertes", icon: "map" },
    ],
  },
];

const goToSlide = (i) => {
  currentSlide.value = i;
  resetSliderTimer();
};

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % heroSlides.length;
};

const resetSliderTimer = () => {
  if (sliderInterval) clearInterval(sliderInterval);
  sliderInterval = setInterval(nextSlide, slideDuration);
};

// Mock data for selects
const cities = ["Douala", "Yaoundé", "Bafoussam", "Bamenda", "Garoua", "Maroua", "Ngaoundéré", "Bertoua", "Limbe", "Kribi"];
const propertyTypes = ["Studio", "Appartement", "Chambre moderne", "Villa", "Duplex", "Immeuble", "Terrain", "Bureau", "Local commercial"];

// Mock Categories (Static for visual consistency)
const categories = ref([]);

// Data from API
const newProperties = ref([]);
const agents = ref([]);
const services = ref([]);
const products = ref([]);

// Mock Benefits (Static)
const benefits = [
  {
    title: "Fiabilité",
    description: "Des annonces vérifiées et des agents certifiés.",
    icon: "check-circle",
  },
  {
    title: "Sécurité",
    description: "Transactions sécurisées et protection des données.",
    icon: "lock",
  },
  {
    title: "Support",
    description: "Une équipe dédiée à votre écoute 7j/7.",
    icon: "headset",
  },
  {
    title: "Innovation",
    description: "Des outils modernes pour faciliter votre recherche.",
    icon: "lightbulb",
  },
];

const formatBudget = (value) => {
  return new Intl.NumberFormat("fr-FR").format(value);
};

const formatPrice = (price) => {
  return new Intl.NumberFormat("fr-FR").format(price);
};

// 3-dots Menu Logic
const activeMenu = ref(null);

// Local favorites state for Accueil (without auth store dependency)
const favoritesAccueil = ref(new Set());

// ─── Image Slider Helpers ───────────────────────────────────────────
const nextPropertyImage = (property) => {
  if (!property.all_images) return;
  const count = property.all_images.length;
  property.currentImageIndex = ((property.currentImageIndex || 0) + 1) % count;
};

const prevPropertyImage = (property) => {
  if (!property.all_images) return;
  const count = property.all_images.length;
  property.currentImageIndex = ((property.currentImageIndex || 0) - 1 + count) % count;
};

const prepareImageUrl = (path) => {
  if (!path) return '/images/categoriebien/appart.jfif';
  if (path.startsWith('http')) return path;
  return `/storage/${path}`;
};

const toggleFavoriteAccueil = async (propertyId) => {
  if (favoritesAccueil.value.has(propertyId)) {
    favoritesAccueil.value.delete(propertyId);
  } else {
    favoritesAccueil.value.add(propertyId);
  }
  // Force reactivity
  favoritesAccueil.value = new Set(favoritesAccueil.value);
};

const toggleMenu = (id) => {
  activeMenu.value = activeMenu.value === id ? null : id;
};

const shareItem = async (item, type) => {
  activeMenu.value = null;
  const baseUrl = window.location.origin;
  const url = type === 'property' ? `${baseUrl}/annonces/${item.slug}` : `${baseUrl}/marketplace/items/${item.id}`;

  if (navigator.share) {
    try {
      await navigator.share({
        title: item.title || item.name,
        text: 'Découvrez ceci sur Home Cameroon!',
        url: url
      });
    } catch (err) {
      console.log('Erreur de partage:', err);
    }
  } else {
    navigator.clipboard.writeText(url);
    alert('Lien copié dans le presse-papiers !');
  }
};

const hideItem = (id) => {
  activeMenu.value = null;
  alert("Cet élément sera masqué de vos recommandations.");
};

const reportItem = (id) => {
  activeMenu.value = null;
  alert("Merci. Notre équipe va examiner ce signalement.");
};

const neighborhoods = computed(() => {
  switch (searchFilters.value.city) {
    case "douala":
      return [
        "Akwa",
        "Bonapriso",
        "Bonamoussadi",
        "Makepe",
        "Logpom",
        "Deido",
        "Yassa",
        "PK14",
      ];
    case "yaoundé":
      return [
        "Bastos",
        "Mvan",
        "Essos",
        "Emombo",
        "Nkolbisson",
        "Odza",
        "Mfandena",
        "Ngousso",
      ];
    case "bafoussam":
      return ["Tamdja", "Djeleng", "Tchitchap", "Famla"];
    case "limbe":
      return ["Mile 2", "Mile 4", "Down Beach", "Bota"];
    case "kribi":
      return ["Dombe", "Mpangou", "Londji", "Ngoye"];
    default:
      return [];
  }
});

const handleSearch = () => {
  const query = {};

  if (searchFilters.value.city) {
    query.city = searchFilters.value.city;
  }
  if (searchFilters.value.type) {
    query.type = searchFilters.value.type;
  }
  if (searchFilters.value.neighborhood) {
    query.neighborhood = searchFilters.value.neighborhood;
  }
  if (searchFilters.value.budget && searchFilters.value.budget < 500000) {
    query.max_price = searchFilters.value.budget;
  }

  router.push({ name: 'Annonces', query });
};

const fetchData = async () => {
  isLoading.value = true;
  try {
    const response = await axios.get("api/home");
    const data = response.data;

    newProperties.value = data.newProperties || [];
    agents.value = data.agents || [];
    services.value = data.services || [];
    products.value = data.products || [];
    categories.value = data.categories || [];
  } catch (err) {
    console.error("Error fetching home data:", err);
    error.value = "Impossible de charger les données.";
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchData();
  resetSliderTimer();
});

onBeforeUnmount(() => {
  if (sliderInterval) clearInterval(sliderInterval);
});
</script>

<style scoped>
/* ══════════════════════════════════════════════════════
   HERO ROOT
══════════════════════════════════════════════════════ */
.hero-root {
  min-height: 92vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
}

@media (max-width: 768px) {
  .hero-root { min-height: 100svh; }
}

/* ── Background slides ── */
.hero-bg-item {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.hero-bg-enter-active,
.hero-bg-leave-active {
  transition: opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.hero-bg-enter-from { opacity: 0; }
.hero-bg-leave-to   { opacity: 0; }

/* ── Overlay ── */
.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(0,0,0,0.78) 0%,
    rgba(0,0,0,0.55) 40%,
    rgba(0,0,0,0.35) 70%,
    rgba(0,0,0,0.65) 100%
  );
  z-index: 1;
}

/* ══════════════════════════════════════════════════════
   PARTICLES
══════════════════════════════════════════════════════ */
.particles-layer {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  overflow: hidden;
}

.hpt-particle {
  position: absolute;
  border-radius: 50%;
  opacity: 0;
  animation: particle-float linear infinite;
}

/* Hero particles — prefixed hpt- to avoid clashing with Tailwind p-* padding utilities */
.hpt-1  { width:4px;  height:4px;  left:5%;   bottom:-10px; animation-duration:18s; animation-delay:0s;   background:hsl(var(--secondary) / 0.6); }
.hpt-2  { width:6px;  height:6px;  left:12%;  bottom:-10px; animation-duration:22s; animation-delay:2s;   background:hsl(var(--chart-1) / 0.5); }
.hpt-3  { width:3px;  height:3px;  left:20%;  bottom:-10px; animation-duration:15s; animation-delay:5s;   background:hsl(var(--foreground) / 0.2); }
.hpt-4  { width:5px;  height:5px;  left:30%;  bottom:-10px; animation-duration:20s; animation-delay:1s;   background:hsl(var(--chart-4) / 0.5); }
.hpt-5  { width:4px;  height:4px;  left:38%;  bottom:-10px; animation-duration:17s; animation-delay:8s;   background:hsl(var(--chart-5) / 0.5); }
.hpt-6  { width:7px;  height:7px;  left:45%;  bottom:-10px; animation-duration:25s; animation-delay:3s;   background:hsl(var(--secondary) / 0.4); }
.hpt-7  { width:3px;  height:3px;  left:55%;  bottom:-10px; animation-duration:19s; animation-delay:6s;   background:hsl(var(--foreground) / 0.15); }
.hpt-8  { width:5px;  height:5px;  left:62%;  bottom:-10px; animation-duration:23s; animation-delay:0.5s; background:hsl(var(--chart-1) / 0.4); }
.hpt-9  { width:4px;  height:4px;  left:70%;  bottom:-10px; animation-duration:16s; animation-delay:4s;   background:hsl(var(--chart-4) / 0.6); }
.hpt-10 { width:6px;  height:6px;  left:78%;  bottom:-10px; animation-duration:21s; animation-delay:9s;   background:hsl(var(--secondary) / 0.5); }
.hpt-11 { width:3px;  height:3px;  left:85%;  bottom:-10px; animation-duration:14s; animation-delay:2.5s; background:hsl(var(--chart-5) / 0.4); }
.hpt-12 { width:5px;  height:5px;  left:92%;  bottom:-10px; animation-duration:28s; animation-delay:7s;   background:hsl(var(--foreground) / 0.3); }
.hpt-13 { width:4px;  height:4px;  left:8%;   bottom:-10px; animation-duration:20s; animation-delay:11s;  background:hsl(var(--chart-1) / 0.6); }
.hpt-14 { width:6px;  height:6px;  left:25%;  bottom:-10px; animation-duration:24s; animation-delay:1.5s; background:hsl(var(--secondary) / 0.3); }
.hpt-15 { width:3px;  height:3px;  left:48%;  bottom:-10px; animation-duration:17s; animation-delay:10s;  background:hsl(var(--chart-4) / 0.4); }
.hpt-16 { width:5px;  height:5px;  left:65%;  bottom:-10px; animation-duration:22s; animation-delay:3.5s; background:hsl(var(--chart-5) / 0.6); }
.hpt-17 { width:4px;  height:4px;  left:82%;  bottom:-10px; animation-duration:19s; animation-delay:6.5s; background:hsl(var(--foreground) / 0.2); }
.hpt-18 { width:7px;  height:7px;  left:95%;  bottom:-10px; animation-duration:26s; animation-delay:13s;  background:hsl(var(--secondary) / 0.5); }

@keyframes particle-float {
  0%   { transform: translateY(0) rotate(0deg);   opacity: 0; }
  10%  { opacity: 0.8; }
  90%  { opacity: 0.3; }
  100% { transform: translateY(-100vh) rotate(720deg); opacity: 0; }
}

/* ══════════════════════════════════════════════════════
   TYPOGRAPHY
══════════════════════════════════════════════════════ */
.hero-headline {
  font-size: clamp(1.75rem, 4vw, 3rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.headline-accent {
  display: block;
  font-size: clamp(2rem, 5vw, 3.75rem);
  font-weight: 900;
  line-height: 1;
  text-shadow: 0 0 60px currentColor;
}

.hero-subtitle {
  font-size: clamp(0.85rem, 1.5vw, 1rem);
  line-height: 1.65;
}

/* ══════════════════════════════════════════════════════
   ROLE BADGE
══════════════════════════════════════════════════════ */
.role-badge {
  border: 1px solid;
  border-radius: 999px;
  backdrop-filter: blur(8px);
  letter-spacing: 0.12em;
}

/* ══════════════════════════════════════════════════════
   STAT CHIPS
══════════════════════════════════════════════════════ */
.stat-chip {
  background: rgba(255,255,255,0.07);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 0.75rem;
  padding: 0.5rem 0.875rem;
}

.stat-chip-icon {
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  flex-shrink: 0;
}

/* ══════════════════════════════════════════════════════
   BUTTONS
══════════════════════════════════════════════════════ */
.hero-btn-primary {
  transition: transform 0.2s, box-shadow 0.2s;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.15);
  box-shadow: 0 4px 24px rgba(0,0,0,0.3);
}
.hero-btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(0,0,0,0.4);
}

.hero-btn-secondary {
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(8px);
  color: white;
  border: 1px solid rgba(255,255,255,0.2);
  transition: all 0.2s;
}
.hero-btn-secondary:hover {
  background: rgba(255,255,255,0.2);
  transform: translateY(-2px);
}

/* ══════════════════════════════════════════════════════
   SEARCH CARD
══════════════════════════════════════════════════════ */
.hero-search-card {
  background: hsl(var(--card) / 0.82);
  backdrop-filter: blur(28px);
  -webkit-backdrop-filter: blur(28px);
  border: 1px solid hsl(var(--border) / 0.25);
  border-radius: 1.25rem;
  padding: 1.25rem;
  box-shadow: 
    0 20px 50px -10px rgba(0,0,0,0.5),
    0 4px 12px hsl(var(--foreground) / 0.05);
  transition: all 0.3s ease;
}

.hero-field {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: hsl(var(--background) / 0.7);
  border: 1px solid hsl(var(--border) / 0.6);
  border-radius: 0.65rem;
  padding: 0.45rem 0.75rem;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.hero-field:focus-within {
  border-color: hsl(var(--ring));
  background: hsl(var(--background));
  box-shadow: 0 0 0 4px hsl(var(--ring) / 0.1);
}

.hero-select {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: hsl(var(--foreground));
  font-size: 0.8rem;
  padding: 0.25rem 0;
  min-width: 0;
}
.hero-select option { background: hsl(var(--card)); color: hsl(var(--foreground)); }
.hero-select::placeholder { 
  color: hsl(var(--muted-foreground)); 
}

.hero-range {
  -webkit-appearance: none;
  appearance: none;
  height: 4px;
  border-radius: 2px;
  background: hsl(var(--secondary) / 0.3);
  cursor: pointer;
}
.hero-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 16px; height: 16px;
  border-radius: 50%;
  background: hsl(var(--secondary));
  border: 2px solid hsl(var(--background));
  cursor: pointer;
  box-shadow: 0 0 8px hsl(var(--secondary) / 0.4);
}

.hero-search-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary) / 0.8));
  color: hsl(var(--primary-foreground));
  font-size: 0.85rem;
  font-weight: 700;
  padding: 0.65rem 1rem;
  border-radius: 0.65rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
}
.hero-search-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 28px rgba(0,0,0,0.4);
}

/* ══════════════════════════════════════════════════════
   ROLE NAV BAR
══════════════════════════════════════════════════════ */
.role-nav-bar {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.role-nav-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: hsl(var(--card) / 0.15);
  backdrop-filter: blur(8px);
  border: 1px solid hsl(var(--border) / 0.2);
  color: hsl(var(--foreground) / 0.6);
  border-radius: 0.65rem;
  padding: 0.5rem 0.875rem;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
}
.role-nav-btn:hover {
  background: hsl(var(--card) / 0.25);
  color: hsl(var(--foreground));
}
.role-nav-btn.active {
  background: hsl(var(--background) / 0.4);
  color: hsl(var(--foreground));
}

.role-nav-icon {
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 0.4rem;
  background: hsl(var(--foreground) / 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  transition: background 0.3s;
  color: hsl(var(--foreground) / 0.7);
}
.role-nav-btn.active .role-nav-icon { color: hsl(var(--foreground)); }

.role-nav-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  width: 0;
  border-radius: 1px;
  animation: progress-fill linear forwards;
}
@keyframes progress-fill {
  from { width: 0; }
  to   { width: 100%; }
}

/* ══════════════════════════════════════════════════════
   SLIDE TRANSITIONS
══════════════════════════════════════════════════════ */
.badge-pop-enter-active { animation: badge-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
.badge-pop-leave-active { animation: badge-out 0.25s ease-in; }
@keyframes badge-in  { from { opacity:0; transform:scale(0.7) translateY(10px); } to { opacity:1; transform:scale(1) translateY(0); } }
@keyframes badge-out { from { opacity:1; } to { opacity:0; transform:translateY(-8px); } }

.slide-up-enter-active { animation: slide-in 0.5s cubic-bezier(0.22, 1, 0.36, 1); }
.slide-up-leave-active { animation: slide-out 0.3s ease-in; }
@keyframes slide-in  { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
@keyframes slide-out { from { opacity:1; } to { opacity:0; transform:translateY(-16px); } }

.slide-up-delay-enter-active  { animation: slide-in  0.55s 0.08s cubic-bezier(0.22,1,0.36,1) both; }
.slide-up-delay-leave-active  { animation: slide-out 0.25s ease-in; }
.slide-up-delay2-enter-active { animation: slide-in  0.6s  0.15s cubic-bezier(0.22,1,0.36,1) both; }
.slide-up-delay2-leave-active { animation: slide-out 0.25s ease-in; }
.slide-up-delay3-enter-active { animation: slide-in  0.65s 0.22s cubic-bezier(0.22,1,0.36,1) both; }
.slide-up-delay3-leave-active { animation: slide-out 0.25s ease-in; }

/* ══════════════════════════════════════════════════════
   CARRIED OVER STYLES
══════════════════════════════════════════════════════ */
.image-bg {
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

.property-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.property-card:hover {
  transform: translateY(-8px);
}

.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-50%);
  }
}

.animate-scroll {
  animation: scroll 40s linear infinite;
  display: flex;
  width: max-content;
}

.animate-scroll:hover {
  animation-play-state: paused;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.snap-x {
  scroll-snap-type: x mandatory;
}

.snap-start {
  scroll-snap-align: start;
}

/* ── Range slider : HERO ONLY (scoped to .hero-range) ── */
.hero-range::-webkit-slider-runnable-track {
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background: rgba(255,255,255,0.2);
}
.hero-range::-moz-range-track {
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background: rgba(255,255,255,0.2);
}
</style>