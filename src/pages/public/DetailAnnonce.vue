<template>
  <div class="bg-background min-h-screen">
    <!-- ═══════════════════════════════ SKELETON ═══════════════════════════════ -->
    <div v-if="isLoading" class="max-w-7xl mx-auto px-4 py-8">
      <div class="sk h-4 w-64 rounded mb-6"></div>
      <div class="grid lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 space-y-6">
          <div class=" rounded-2xl p-6 border border-border">
            <div class="sk h-8 w-3/4 rounded mb-4"></div>
            <div class="sk h-4 w-1/2 rounded mb-6"></div>
            <div class="flex gap-6">
              <div class="sk h-4 w-24 rounded"></div>
              <div class="sk h-4 w-24 rounded"></div>
              <div class="sk h-4 w-24 rounded"></div>
            </div>
          </div>
          <div class=" rounded-2xl p-6 border border-border">
            <div class="sk h-72 w-full rounded-xl mb-4"></div>
            <div class="grid grid-cols-4 gap-3">
              <div v-for="i in 4" :key="i" class="sk h-20 rounded-lg"></div>
            </div>
          </div>
          <div class=" rounded-2xl p-6 border border-border space-y-3">
            <div class="sk h-5 w-40 rounded"></div>
            <div class="sk h-4 w-full rounded"></div>
            <div class="sk h-4 w-5/6 rounded"></div>
            <div class="sk h-4 w-4/6 rounded"></div>
          </div>
        </div>
        <div class="lg:col-span-1 space-y-6">
          <div class=" rounded-2xl p-6 border border-border">
            <div class="sk h-10 w-2/3 rounded mb-6"></div>
            <div class="sk h-12 w-full rounded-xl mb-3"></div>
            <div class="sk h-12 w-full rounded-xl"></div>
          </div>
          <div class=" rounded-2xl p-6 border border-border">
            <div class="flex gap-4 mb-4">
              <div class="sk w-16 h-16 rounded-full"></div>
              <div class="space-y-2 flex-1">
                <div class="sk h-4 w-32 rounded"></div>
                <div class="sk h-3 w-24 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ═══════════════════════════════ 404 ═══════════════════════════════════ -->
    <div v-else-if="!property" class="max-w-7xl mx-auto px-4 py-32 text-center">
      <i class="fas fa-home text-6xl text-muted-foreground/30 mb-6"></i>
      <h2 class="text-2xl font-bold text-foreground mb-2">
        Annonce introuvable
      </h2>
      <p class="text-muted-foreground mb-6">
        Ce bien n'existe pas ou a été supprimé.
      </p>
      <RouterLink
        :to="{ name: 'Annonces' }"
        class="inline-flex items-center gap-2 bg-secondary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary transition-colors"
      >
        <i class="fas fa-arrow-left"></i> Retour aux annonces
      </RouterLink>
    </div>

    <!-- ═══════════════════════════════ CONTENU ════════════════════════════════ -->
    <div v-else class="max-w-7xl mx-auto px-4 py-8">
      <!-- Fil d'Ariane -->
      <nav
        class="text-sm text-muted-foreground flex items-center gap-2 mb-6 flex-wrap"
      >
        <RouterLink
          :to="{ name: 'Accueil' }"
          class="hover:text-secondary transition-colors"
          >Accueil</RouterLink
        >
        <i class="fas fa-chevron-right text-xs text-muted-foreground/40"></i>
        <RouterLink
          :to="{ name: 'Annonces' }"
          class="hover:text-secondary transition-colors"
          >Annonces</RouterLink
        >
        <i class="fas fa-chevron-right text-xs text-muted-foreground/40"></i>
        <span class="text-foreground font-medium line-clamp-1 max-w-xs">{{
          property.title
        }}</span>
      </nav>

      <div class="grid lg:grid-cols-3 gap-8">
        <!-- ════════════════════ COLONNE GAUCHE ════════════════════ -->
        <div class="lg:col-span-2 space-y-6">
          <!-- ── Titre & badges ── -->
          <div class="bg-card rounded-2xl p-6 shadow-sm border border-border">
            <div class="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div class="flex-1 min-w-0">
                <div class="flex items-center flex-wrap gap-2 mb-3">
                  <span
                    class="px-4 py-1.5 bg-secondary text-white text-sm font-bold rounded-full"
                  >
                    {{ property.type === "rent" ? "À louer" : "À vendre" }}
                  </span>
                  <span
                    v-if="property.category"
                    class="px-3 py-1.5 bg-primary/10 text-primary text-xs font-medium rounded-full"
                    >{{ property.category }}</span
                  >
                  <span
                    v-if="property.etat"
                    class="px-3 py-1.5 bg-green-100 text-green-800 text-xs font-medium rounded-full flex items-center gap-1"
                  >
                    <i class="fas fa-check-circle"></i> {{ property.etat }}
                  </span>
                </div>
                <h1
                  class="text-2xl md:text-3xl font-bold text-primary mb-2 leading-tight"
                >
                  {{ property.title }}
                </h1>
                <p class="text-muted-foreground flex items-center gap-2">
                  <i class="fas fa-map-marker-alt text-secondary"></i>
                  {{ property.location }}
                </p>
              </div>

              <!-- Actions fav + partage -->
              <div class="flex items-center gap-3 shrink-0">
                <button
                  v-if="property"
                  @click="toggleFavorite"
                  :class="[
                    'p-3 rounded-xl transition-all flex items-center gap-1.5',
                    property.is_favorite
                      ? 'bg-red-500 text-white shadow-md'
                      : ' text-muted-foreground hover:bg-red-50 hover:text-red-500',
                  ]"
                  title="Ajouter aux favoris"
                >
                  <i
                    :class="
                      property.is_favorite ? 'fas fa-heart' : 'far fa-heart'
                    "
                    class="text-lg"
                  ></i>
                </button>
                <button
                  @click="shareProperty"
                  class="p-3 text-muted-foreground rounded-xl hover:bg-secondary/10 hover:text-secondary transition-all"
                  title="Partager"
                >
                  <i class="fas fa-share-alt text-lg"></i>
                </button>
              </div>
            </div>

            <!-- Stats rapides -->
            <div
              class="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-muted-foreground pt-4 border-t border-border"
            >
              <span v-if="property.bedrooms">
                <i class="fas fa-bed text-secondary mr-1.5"></i>
                {{ property.bedrooms }} chambre{{
                  property.bedrooms > 1 ? "s" : ""
                }}
              </span>
              <span v-if="property.bathrooms">
                <i class="fas fa-bath text-secondary mr-1.5"></i>
                {{ property.bathrooms }} salle{{
                  property.bathrooms > 1 ? "s" : ""
                }}
                de bain
              </span>
              <span v-if="property.area">
                <i class="fas fa-ruler-combined text-secondary mr-1.5"></i>
                {{ property.area }} m²
              </span>
              <span v-if="property.construction_year">
                <i class="fas fa-calendar-alt text-secondary mr-1.5"></i>
                Construit en {{ property.construction_year }}
              </span>
              <span class="ml-auto flex items-center gap-1 text-xs">
                <i class="fas fa-eye text-secondary/60"></i>
                {{ property.views_count }} vues
              </span>
            </div>
          </div>

          <!-- ── Galerie d'images ── -->
          <div class="bg-card rounded-2xl p-6 shadow-sm border border-border">
            <!-- Image principale -->
            <div class="relative rounded-xl overflow-hidden mb-4 group">
              <img
                :src="activeImage"
                :alt="property.title"
                class="w-full h-64 md:h-[420px] object-cover transition-all duration-500"
              />
              <!-- Badge photos -->
              <div
                class="absolute top-4 right-4 px-3 py-1.5 bg-black/70 text-white text-sm rounded-full backdrop-blur-sm flex items-center gap-2"
              >
                <i class="fas fa-camera"></i>
                {{ galleryImages.length }} photo{{
                  galleryImages.length > 1 ? "s" : ""
                }}
              </div>
              <!-- Nav fléchée -->
              <button
                v-if="galleryImages.length > 1"
                @click="prevImage"
                class="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/80 transition-all opacity-0 group-hover:opacity-100"
              >
                <i class="fas fa-chevron-left text-sm"></i>
              </button>
              <button
                v-if="galleryImages.length > 1"
                @click="nextImage"
                class="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/80 transition-all opacity-0 group-hover:opacity-100"
              >
                <i class="fas fa-chevron-right text-sm"></i>
              </button>
            </div>
            <!-- Miniatures -->
            <div
              v-if="galleryImages.length > 1"
              class="grid grid-cols-4 sm:grid-cols-5 gap-2"
            >
              <img
                v-for="(img, i) in galleryImages"
                :key="i"
                :src="img"
                :alt="`Photo ${i + 1}`"
                @click="
                  activeImage = img;
                  activeIndex = i;
                "
                :class="[
                  'w-full h-16 md:h-20 object-cover rounded-lg cursor-pointer transition-all duration-200',
                  activeImage === img
                    ? 'ring-2 ring-secondary ring-offset-2 scale-105'
                    : 'opacity-70 hover:opacity-100 hover:scale-105',
                ]"
              />
            </div>
          </div>

          <!-- ── Description ── -->
          <div class="bg-card rounded-2xl p-6 shadow-sm border border-border">
            <h2
              class="text-xl font-bold text-primary mb-4 flex items-center gap-2"
            >
              <i class="fas fa-file-alt text-secondary"></i>
              Description
            </h2>
            <p class="text-foreground/80 leading-relaxed">
              {{ property.description }}
            </p>

            <!-- Caractéristiques de base -->
            <div
              class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-border"
            >
              <div class="p-4 rounded-xl">
                <h4 class="font-bold text-primary mb-3 flex items-center gap-2">
                  <i class="fas fa-list-ul text-secondary text-sm"></i>
                  Caractéristiques
                </h4>
                <ul class="space-y-2 text-sm">
                  <li
                    v-if="property.area"
                    class="flex items-center gap-2 text-foreground/80"
                  >
                    <i class="fas fa-check text-secondary text-xs"></i> Surface
                    : {{ property.area }} m²
                  </li>
                  <li
                    v-if="property.bedrooms"
                    class="flex items-center gap-2 text-foreground/80"
                  >
                    <i class="fas fa-check text-secondary text-xs"></i>
                    {{ property.bedrooms }} chambre{{
                      property.bedrooms > 1 ? "s" : ""
                    }}
                  </li>
                  <li
                    v-if="property.bathrooms"
                    class="flex items-center gap-2 text-foreground/80"
                  >
                    <i class="fas fa-check text-secondary text-xs"></i>
                    {{ property.bathrooms }} salle{{
                      property.bathrooms > 1 ? "s" : ""
                    }}
                    de bain
                  </li>
                  <li
                    v-if="property.construction_year"
                    class="flex items-center gap-2 text-foreground/80"
                  >
                    <i class="fas fa-check text-secondary text-xs"></i> Année de
                    construction : {{ property.construction_year }}
                  </li>
                  <li
                    v-if="property.etat"
                    class="flex items-center gap-2 text-foreground/80"
                  >
                    <i class="fas fa-check text-secondary text-xs"></i> État :
                    {{ property.etat }}
                  </li>
                  <li class="flex items-center gap-2 text-foreground/80">
                    <i class="fas fa-check text-secondary text-xs"></i> Ville :
                    {{ property.city }}
                  </li>
                </ul>
              </div>

              <!-- Commodités -->
              <div class="p-4 rounded-xl">
                <h4 class="font-bold text-primary mb-3 flex items-center gap-2">
                  <i class="fas fa-star text-secondary text-sm"></i> Commodités
                </h4>
                <ul v-if="amenities.length" class="space-y-2 text-sm">
                  <li
                    v-for="a in amenities"
                    :key="a"
                    class="flex items-center gap-2 text-foreground/80"
                  >
                    <i
                      :class="`fas ${amenityIcon(a)} text-secondary text-xs`"
                    ></i>
                    {{ a }}
                  </li>
                </ul>
                <p v-else class="text-sm text-muted-foreground italic">
                  Non renseignées
                </p>
              </div>
            </div>

            <!-- Grille icônes commodités -->
            <div
              v-if="amenities.length"
              class="mt-6 pt-6 border-t border-border"
            >
              <h3 class="text-lg font-bold text-primary mb-4">
                Équipements inclus
              </h3>
              <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                <div
                  v-for="a in amenities"
                  :key="a"
                  class="p-3 bg-gray-100 rounded-xl text-center hover:-translate-y-1 hover:shadow-md transition-all duration-300 group cursor-default"
                >
                  <i
                    :class="`fas ${amenityIcon(a)} text-2xl text-secondary mb-2 group-hover:scale-110 transition-transform inline-block`"
                  ></i>
                  <p
                    class="text-xs font-medium text-foreground/80 leading-tight"
                  >
                    {{ a }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- ── Avis clients (fictifs mais réalistes) ── -->
          <div class="bg-card rounded-2xl p-6 shadow-sm border border-border">
            <div
              class="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3"
            >
              <h2
                class="text-xl font-bold text-primary flex items-center gap-2"
              >
                <i class="fas fa-star text-amber-500"></i>
                Avis locataires
                <span class="text-base font-normal text-muted-foreground"
                  >({{ reviews.length }})</span
                >
              </h2>
              <div class="flex items-center gap-1">
                <i
                  v-for="s in 5"
                  :key="s"
                  :class="s <= avgRating ? 'fas fa-star' : 'far fa-star'"
                  class="text-amber-500 text-sm"
                ></i>
                <span class="ml-2 font-bold text-primary"
                  >{{ avgRating }}/5</span
                >
              </div>
            </div>

            <div class="space-y-5">
              <div
                v-for="r in reviews"
                :key="r.id"
                class="border-b border-border pb-5 last:border-0 last:pb-0"
              >
                <div class="flex items-start justify-between mb-2">
                  <div class="flex items-center gap-3">
                    <div
                      class="w-10 h-10 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                    >
                      {{ r.initials }}
                    </div>
                    <div>
                      <h4 class="font-semibold text-foreground text-sm">
                        {{ r.name }}
                      </h4>
                      <div class="flex items-center gap-0.5">
                        <i
                          v-for="s in 5"
                          :key="s"
                          :class="s <= r.rating ? 'fas fa-star' : 'far fa-star'"
                          class="text-amber-400 text-xs"
                        ></i>
                      </div>
                    </div>
                  </div>
                  <span
                    class="text-xs text-muted-foreground whitespace-nowrap"
                    >{{ r.date }}</span
                  >
                </div>
                <p class="text-foreground/70 text-sm leading-relaxed pl-13">
                  {{ r.comment }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- ════════════════════ SIDEBAR DROITE ════════════════════ -->
        <div class="lg:col-span-1">
          <div class="sticky top-24 space-y-5">
            <!-- Carte prix & actions -->
            <div class="bg-card rounded-2xl p-6 shadow-lg border border-border">
              <div class="mb-5">
                <div class="flex items-baseline gap-2 mb-1">
                  <span class="text-3xl font-bold text-secondary">{{
                    formatPrice(property.price)
                  }}</span>
                  <span class="text-muted-foreground text-sm">FCFA / mois</span>
                </div>
                <div
                  class="text-sm text-muted-foreground bg-muted/50 rounded-lg p-3 space-y-1"
                >
                  <div class="flex items-center gap-2">
                    <i class="fas fa-shield-alt text-secondary/60 w-4"></i>
                    <span
                      >Caution :
                      <strong
                        >{{ formatPrice(property.price * 2) }} FCFA</strong
                      ></span
                    >
                  </div>
                  <div class="flex items-center gap-2">
                    <i class="fas fa-calendar-alt text-secondary/60 w-4"></i>
                    <span>Avance : <strong>1 mois</strong></span>
                  </div>
                </div>
              </div>

              <div class="space-y-3">
                <!-- Bloc de Poursuite de la procédure locative (s'il y en a une en cours) -->
                <div
                  v-if="activeProcess"
                  class="bg-orange-50/80 border border-orange-200 p-4 rounded-xl shadow-sm text-center"
                >
                  <p
                    class="text-[10px] text-[#E54801] font-black uppercase tracking-widest mb-1.5 flex items-center justify-center gap-1.5"
                  >
                    <i class="fas fa-spinner animate-spin"></i> Procédure en
                    cours
                  </p>
                  <p class="text-sm font-bold text-gray-800 mb-4">
                    {{ activeProcess.label }}
                  </p>

                  <RouterLink
                    :to="`/mon-suivi?property_id=${property.id}`"
                    class="w-full py-2.5 bg-[#E54801] text-white rounded-lg font-bold hover:bg-[#c73d01] transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg text-sm"
                  >
                    Suivre ma demande
                    <i class="fas fa-arrow-right ml-1"></i>
                  </RouterLink>
                </div>

                <!-- Boutons standards (si aucune procédure active) -->
                <template v-else>
                  <RouterLink
                    v-if="property.type === 'rent'"
                    :to="`/locataire/formulaire-location?property_id=${property.id}`"
                    class="w-full py-3 bg-[#1B0B38] text-white rounded-xl font-bold hover:bg-opacity-90 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg group"
                  >
                    <i
                      class="fas fa-key group-hover:scale-110 transition-transform"
                    ></i>
                    Louer ce bien
                  </RouterLink>
                  <RouterLink
                    :to="`/programmer-visite?property_id=${property.id}`"
                    class="w-full py-3 bg-secondary text-white rounded-xl font-bold hover:bg-primary transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg group"
                  >
                    <i
                      class="fas fa-calendar-check group-hover:scale-110 transition-transform"
                    ></i>
                    Programmer une visite
                  </RouterLink>
                </template>

                <a
                  :href="`tel:${ownerPhone}`"
                  v-if="ownerPhone"
                  class="w-full py-3 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <i class="fas fa-phone"></i> Appeler le propriétaire
                </a>
                <RouterLink
                  :to="{ name: 'Assistance' }"
                  class="w-full py-3 border-2 border-secondary text-secondary rounded-xl font-bold hover:bg-secondary hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  <i class="fas fa-headset"></i> Assistance
                </RouterLink>
              </div>

              <div
                class="mt-4 p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900 rounded-xl"
              >
                <p
                  class="text-sm text-blue-800 dark:text-blue-300 flex items-center gap-2"
                >
                  <i class="fas fa-clock text-blue-600"></i>
                  Réponse moyenne : <strong>2 heures</strong>
                </p>
              </div>
            </div>

            <!-- Propriétaire -->
            <div class="bg-card rounded-2xl p-6 shadow-sm border border-border">
              <h3
                class="text-base font-bold text-primary mb-4 flex items-center gap-2"
              >
                <i class="fas fa-user-circle text-secondary"></i> Propriétaire
              </h3>
              <div class="flex items-center gap-4 mb-4">
                <div
                  class="w-14 h-14 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center text-white text-lg font-bold shrink-0 overflow-hidden"
                >
                  <img
                    v-if="property.owner?.avatar_url"
                    :src="property.owner.avatar_url"
                    class="w-full h-full object-cover"
                  />
                  <span v-else>{{ ownerInitials }}</span>
                </div>
                <div>
                  <h4 class="font-bold text-foreground">
                    {{ property.owner?.name ?? "N/A" }}
                  </h4>
                  <p class="text-sm text-muted-foreground">Bailleur vérifié</p>
                </div>
              </div>

              <div class="space-y-2.5 text-sm">
                <div class="flex items-center justify-between">
                  <span class="text-muted-foreground">Vérification</span>
                  <span
                    class="px-2 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded-full flex items-center gap-1"
                  >
                    <i class="fas fa-check-circle"></i> Vérifié
                  </span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-muted-foreground">Taux de réponse</span>
                  <span class="font-medium text-foreground">97%</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-muted-foreground">Délai de réponse</span>
                  <span class="font-medium text-foreground">~2h</span>
                </div>
              </div>
            </div>

            <!-- Localisation -->
            <div class="bg-card rounded-2xl p-6 shadow-sm border border-border">
              <h3
                class="text-base font-bold text-primary mb-4 flex items-center gap-2"
              >
                <i class="fas fa-map-marker-alt text-secondary"></i>
                Localisation
              </h3>
              <!-- Mini carte placeholder stylisée -->
              <div
                class="rounded-xl overflow-hidden mb-4 relative bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/30 h-44 flex items-center justify-center border border-green-200/50"
              >
                <div class="text-center">
                  <div
                    class="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg animate-bounce-slow"
                  >
                    <i class="fas fa-map-marker-alt text-white text-xl"></i>
                  </div>
                  <p class="text-sm font-semibold text-foreground">
                    {{ property.city }}
                  </p>
                  <p class="text-xs text-muted-foreground">
                    {{ property.region }}
                  </p>
                </div>
              </div>
              <p class="text-sm text-muted-foreground leading-relaxed">
                <i class="fas fa-info-circle text-secondary mr-1.5"></i>
                {{ property.location }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- ═══════════════════ BIENS SIMILAIRES ═══════════════════ -->
      <div v-if="similarProperties.length" class="mt-14">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-primary">
            Biens similaires à
            <span class="text-secondary">{{ property.city }}</span>
          </h2>
          <RouterLink
            :to="{ name: 'Annonces' }"
            class="text-secondary hover:text-primary font-medium flex items-center gap-2 transition-colors text-sm"
          >
            Voir tout <i class="fas fa-arrow-right"></i>
          </RouterLink>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <RouterLink
            v-for="s in similarProperties"
            :key="s.id"
            :to="`/annonces/${s.id}`"
            class="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group border border-border hover:border-secondary"
          >
            <div class="relative overflow-hidden">
              <img
                :src="s.image"
                :alt="s.title"
                class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span
                class="absolute top-3 left-3 px-3 py-1 bg-secondary text-white text-xs font-bold rounded-full"
              >
                {{ formatPrice(s.price) }} F
              </span>
              <span
                class="absolute top-3 right-3 px-2 py-0.5 bg-black/60 text-white text-xs rounded-full"
              >
                {{ s.category }}
              </span>
            </div>
            <div class="p-4">
              <h3
                class="font-bold text-foreground mb-1 line-clamp-1 group-hover:text-secondary transition-colors text-sm"
              >
                {{ s.title }}
              </h3>
              <p
                class="text-xs text-muted-foreground mb-3 flex items-center gap-1.5"
              >
                <i class="fas fa-map-marker-alt text-secondary"></i>
                {{ s.location }}
              </p>
              <div
                class="flex items-center justify-between text-xs text-muted-foreground"
              >
                <div class="flex items-center gap-3">
                  <span
                    ><i class="fas fa-bed text-secondary mr-1"></i
                    >{{ s.rooms }}</span
                  >
                  <span
                    ><i class="fas fa-bath text-secondary mr-1"></i
                    >{{ s.bathrooms }}</span
                  >
                  <span
                    ><i class="fas fa-ruler-combined text-secondary mr-1"></i
                    >{{ s.area }}m²</span
                  >
                </div>
                <span
                  class="px-2.5 py-1 bg-secondary/10 text-secondary rounded-lg font-medium group-hover:bg-secondary group-hover:text-white transition-all"
                >
                  Voir
                </span>
              </div>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
    <!-- fin v-else -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";
import { useRentalStore } from "../../stores/rental";
import axios from "../../axios";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const rentalStore = useRentalStore();

// ─── État ────────────────────────────────────────────────────────────
const isLoading = ref(true);
const property = ref(null);
const similarProperties = ref([]);
const activeImage = ref("");
const activeIndex = ref(0);

// État du processus locatif
const activeProcess = computed(() => {
  if (!property.value || !authStore.user) return null;
  const process = rentalStore.processPhaseForProperty(property.value.id);
  // Retourner null s'il n'y a pas de visite ou si la visite a été annulée/rejetée et pas de contrat.
  if (!process) return null;
  if (process.status === "cancelled") return null; // Pas pertinent de bloquer
  return process;
});

// ─── Avis fictifs mais réalistes (camerounais) ───────────────────────
const reviews = [
  {
    id: 1,
    initials: "AM",
    name: "Aline Mbozo",
    rating: 5,
    date: "Janvier 2026",
    comment:
      "Appartement impeccable, très bien entretenu. Le bailleur est réactif et arrangeant. Je recommande vivement !",
  },
  {
    id: 2,
    initials: "EK",
    name: "Emmanuel Kamdem",
    rating: 4,
    date: "Décembre 2025",
    comment:
      "Bon rapport qualité-prix. Quartier calme et sécurisé. Eau et électricité stables. Quelques petites réparations à faire mais globalement satisfait.",
  },
];
const avgRating = computed(() =>
  Math.round(reviews.reduce((s, r) => s + r.rating, 0) / reviews.length),
);

// ─── Données dérivées ────────────────────────────────────────────────
const galleryImages = computed(() => {
  if (!property.value) return [];
  return property.value.all_images?.length
    ? property.value.all_images
    : property.value.image
      ? [property.value.image]
      : [];
});

const amenities = computed(() => {
  if (!property.value) return [];
  const a = property.value.amenities;
  if (Array.isArray(a)) return a;
  if (typeof a === "string") {
    try {
      return JSON.parse(a);
    } catch {
      return [];
    }
  }
  return [];
});

const ownerInitials = computed(() => {
  const name = property.value?.owner?.name ?? "";
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
});

const ownerPhone = computed(() => property.value?.owner?.phone ?? null);

// ─── Icônes commodités ───────────────────────────────────────────────
const amenityIconMap = {
  Climatisation: "fa-snowflake",
  Parking: "fa-parking",
  "Sécurité 24/7": "fa-shield-alt",
  "Wi-Fi": "fa-wifi",
  "Eau courante": "fa-faucet",
  "Électricité permanente": "fa-bolt",
  Gardiennage: "fa-user-shield",
  "Groupe électrogène": "fa-car-battery",
  Balcon: "fa-tree",
  Jardin: "fa-seedling",
  "Cuisine équipée": "fa-utensils",
};
const amenityIcon = (name) => amenityIconMap[name] ?? "fa-check-circle";

// ─── Fetch ───────────────────────────────────────────────────────────
const fetchProperty = async (slug) => {
  isLoading.value = true;
  property.value = null;
  similarProperties.value = [];
  try {
    const { data } = await axios.get(`/api/properties/${slug}`);
    if (data.success) {
      property.value = data.data;
      similarProperties.value = data.similar ?? [];
      // Initialiser la galerie
      const imgs = data.data.all_images;
      activeImage.value = imgs?.length ? imgs[0] : (data.data.image ?? "");
      activeIndex.value = 0;
      // Mettre à jour le titre de la page
      document.title = `${data.data.title} | Home Cameroun`;

      // Si connecté, charger les informations du suivi locatif
      if (authStore.user) {
        await Promise.all([
          rentalStore.fetchVisits(),
          rentalStore.fetchApplications(),
        ]);
      }
    }
  } catch (err) {
    console.error("Erreur chargement annonce:", err);
  } finally {
    isLoading.value = false;
  }
};

// ─── Navigation galerie ──────────────────────────────────────────────
const prevImage = () => {
  const imgs = galleryImages.value;
  if (!imgs.length) return;
  activeIndex.value = (activeIndex.value - 1 + imgs.length) % imgs.length;
  activeImage.value = imgs[activeIndex.value];
};
const nextImage = () => {
  const imgs = galleryImages.value;
  if (!imgs.length) return;
  activeIndex.value = (activeIndex.value + 1) % imgs.length;
  activeImage.value = imgs[activeIndex.value];
};

// ─── Actions ─────────────────────────────────────────────────────────
const toggleFavorite = async () => {
  if (!authStore.user) {
    router.push({ name: "Connexion" });
    return;
  }

  try {
    const { data } = await axios.post("/api/tenant/favorites/toggle", {
      property_id: property.value.id,
    });
    if (data.success) {
      property.value.is_favorite = data.status === "added";
    }
  } catch (err) {
    console.error("Erreur favoris:", err);
  }
};
const shareProperty = () => {
  if (navigator.share) {
    navigator.share({
      title: property.value?.title,
      url: window.location.href,
    });
  } else {
    navigator.clipboard.writeText(window.location.href);
    alert("Lien copié dans le presse-papiers !");
  }
};

const formatPrice = (price) => new Intl.NumberFormat("fr-FR").format(price);

// ─── Mount & watch route change ──────────────────────────────────────
onMounted(() => fetchProperty(route.params.slug));

watch(
  () => route.params.slug,
  (newId) => {
    if (newId) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      fetchProperty(newId);
    }
  },
);
</script>

<style scoped>
/* Skeleton shimmer */
.sk {
  background-color: rgba(200, 200, 200, 0.264);
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

/* Bounce lent pour le marker carte */
@keyframes bounce-slow {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
}
.animate-bounce-slow {
  animation: bounce-slow 2.5s ease-in-out infinite;
}
</style>
