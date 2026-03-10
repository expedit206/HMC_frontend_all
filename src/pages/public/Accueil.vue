<template>
  <div class="accueil-page bg-background">
    <!-- HERO SECTION avec image de fond -->
    <section class="relative overflow-hidden">
      <div class="absolute inset-0 image-bg" style="
          background-image: url(&quot;/images/categoriebien/villj.jfif&quot;);
        "></div>
      <div class="absolute inset-0 bg-black/50"></div>

      <div class="relative max-w-7xl mx-auto px-4 py-6 lg:py-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10 items-center">
          <!-- Texte -->
          <div class="lg:col-span-2">
            <h1 class="text-lg md:text-2xl lg:text-3xl font-semibold text-white mb-4 leading-snug">
              Trouvez votre logement
              <span class="text-secondary">au cœur du Cameroun</span>
            </h1>

            <p class="text-sm md:text-base text-white/85 mb-6 max-w-xl">
              Une plateforme immobilière locale pour rechercher, louer et gérer
              facilement vos biens.
            </p>

            <!-- Stats réduites -->
            <div class="flex flex-wrap gap-4 mt-8">
              <div
                class="bg-card/10 backdrop-blur-sm rounded-[.45rem] p-3 min-w-25 text-center border border-white/20">
                <div class="text-lg font-semibold text-ring">1 200+</div>
                <div class="text-xs text-white/80">Biens</div>
              </div>

              <div
                class="bg-card/10 backdrop-blur-sm rounded-[.45rem] p-3 min-w-25 text-center border border-white/20">
                <div class="text-lg font-semibold text-ring">300+</div>
                <div class="text-xs text-white/80">Propriétaires</div>
              </div>

              <div
                class="bg-card/10 backdrop-blur-sm rounded-[.45rem] p-3 min-w-25 text-center border border-white/20">
                <div class="text-lg font-semibold text-ring">10</div>
                <div class="text-xs text-white/80">Régions</div>
              </div>
            </div>
          </div>

          <!-- Carte filtre -->
          <div class="lg:col-span-1 rounded-[.45rem]">
            <div class="bg-card/95 backdrop-blur-sm rounded-[.45rem] p-4 shadow-xl border border-white/30">
              <div class="text-center mb-2">
                <h3 class="text-sm font-semibold text-primary">
                  <i class="fas fa-search text-secondary mr-1"></i>
                  Recherche avancée
                </h3>
              </div>

              <div class="space-y-3">
                <!-- Selects plus fins -->
                <div class="relative group flex items-center bg-background rounded-[.45rem] px-2 border border-border">
                  <i class="fas fa-map-marker-alt text-secondary text-sm"></i>
                  <select v-model="searchFilters.city"
                    class="appearance-none w-full px-3 py-2 pr-8 text-xs bg-transparent outline-none text-foreground">
                    <option selected class="bg-card">Sélectionnez une ville</option>
                    <option v-for="city in cities" :key="city" :value="city.toLowerCase()" class="bg-card">{{ city }}</option>
                  </select>
                  <i class="fas fa-chevron-down absolute right-2 text-secondary text-[10px]"></i>
                </div>

                <div class="relative group flex items-center bg-background rounded-[.45rem] px-2 border border-border">
                  <i class="fas fa-street-view text-secondary text-sm"></i>
                  <input v-model="searchFilters.neighborhood" list="quartiers" placeholder="Tous les quartiers"
                    class="w-full px-3 py-2 text-xs bg-transparent outline-none text-foreground placeholder:text-muted-foreground" />
                  <datalist id="quartiers">
                    <option v-for="quartier in neighborhoods" :key="quartier" :value="quartier" />
                  </datalist>
                </div>

                <div class="relative group flex items-center bg-background rounded-[.45rem] px-2 border border-border">
                  <i class="fas fa-home text-secondary text-sm"></i>
                  <select v-model="searchFilters.type"
                    class="appearance-none w-full px-3 py-2 pr-8 text-xs bg-transparent outline-none text-foreground">
                    <option selected class="bg-card">Sélectionnez un type</option>
                    <option v-for="type in propertyTypes" :key="type" :value="type.toLowerCase()" class="bg-card">{{ type }}</option>
                  </select>
                  <i class="fas fa-chevron-down absolute right-2 text-secondary text-[10px]"></i>
                </div>

                <!-- Budget plus compact -->
                <div>
                  <label class="block text-xs text-primary mb-1">
                    Budget
                  </label>
                  <input ref="budgetSlider" v-model="searchFilters.budget" type="range" min="15000" max="500000"
                    step="5000" class="w-full h-1 bg-secondary rounded-lg appearance-none cursor-pointer" />
                  <div class="text-center text-xs text-secondary mt-1">
                    {{ formatBudget(searchFilters.budget) }} FCFA
                  </div>
                </div>

                <!-- Bouton léger -->
                <button @click="handleSearch"
                  class="w-full bg-primary text-primary-foreground text-xs py-2 rounded-[.45rem] flex items-center justify-center gap-2 hover:bg-primary/90 transition font-bold">
                  Trouver
                  <i class="fas fa-arrow-right text-secondary text-[12px]"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CATÉGORIES en scroll horizontal -->
    <section class="py-6 md:py-4 bg-card border-b border-border">
      <div class="max-w-7xl mx-auto px-4">
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
      <div class="max-w-7xl mx-auto px-4">
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
            class="property-card bg-card rounded-[.45rem] overflow-hidden shadow-sm border border-border hover:shadow-lg">
            <div class="h-32 relative image-bg" :style="{ backgroundImage: `url('${property.image}')` }">
              <div class="absolute top-3 left-3">
                <span class="bg-secondary text-secondary-foreground text-xs font-medium px-3 py-1 rounded-full">Nouveau</span>
              </div>
            </div>
            <div class="p-2">
              <div class="flex-col justify-between items-start mb-1">
                <h3 class="text-sm font-semibold text-foreground">
                  {{ property.title }}
                </h3>
                <span class="text-sm font-bold text-secondary">{{ formatPrice(property.price) }} FCFA</span>
              </div>
              <p class="text-muted-foreground text-sm mb-1">
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
              <RouterLink :to="`/annonces/${property.id}`"
                class="text-sm block text-center w-full bg-secondary hover:bg-primary text-secondary-foreground hover:text-primary-foreground py-1 rounded-[.45rem] font-medium hover:shadow-lg transition-all border border-secondary">
                Voir détails
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
    <section class="py-12 md:py-16 bg-muted/20">
      <div class="max-w-7xl mx-auto px-4">
        <!-- En-tête -->
        <div class="text-center mb-10 md:mb-16">
          <h2 class="text-2xl md:text-4xl font-bold text-foreground mb-2 md:mb-4">
            Nos agents immobiliers
          </h2>
          <p class="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
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
                <h3 class="text-md md:text-lg font-bold text-foreground mb-1 group-hover:text-secondary transition-colors">
                  {{ agent.name }}
                </h3>
                <div class="flex items-center gap-2 mb-3">
                  <span class="inline-block px-2.5 py-1 bg-primary/10 text-secondary text-xs font-semibold rounded-full">
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
      <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <!-- En-tête -->
        <div class="text-center mb-10 md:mb-12">
          <span class="inline-block px-3 py-1 bg-secondary/10 text-secondary text-xs font-semibold rounded-full mb-3">
            Experts à votre service
          </span>
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
            Nos prestataires de services
          </h2>
          <p class="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
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
    <section class="py-8 md:py-6 md:pt-12 bg-muted/20">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-10 md:mb-4">
          <h2 class="text-2xl md:text-4xl font-bold text-foreground mb-2 md:mb-4">
            Marketplace - Articles pour votre maison
          </h2>
          <p class="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
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
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-10 md:mb-2">
          <h2 class="text-2xl md:text-4xl font-bold text-foreground mb-2 md:mb-4">
            Pourquoi choisir Home Cameroon ?
          </h2>
          <p class="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
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
import { ref, onMounted, computed } from "vue";
import { RouterLink, useRouter } from "vue-router";
import axios from "../../axios";
import SkeletonLoader from "../../components/SkeletonLoader.vue";

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
});
</script>

<style scoped>
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