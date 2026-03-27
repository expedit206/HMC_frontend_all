<template>
  <div class="bg-background min-h-screen">
    <!-- ═══════════════════════════════ SKELETON ═══════════════════════════════ -->
    <div v-if="isLoading" class="max-w-7xl mx-auto px-4 py-8">
      <div class="h-4 w-64 bg-muted rounded mb-6"></div>
      <div class="grid lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 space-y-6">
          <div class="rounded-2xl p-6 border border-border bg-card">
            <div class="h-8 w-3/4 bg-muted rounded mb-4"></div>
            <div class="h-4 w-1/2 bg-muted rounded mb-6"></div>
            <div class="flex gap-6">
              <div class="h-4 w-24 bg-muted rounded"></div>
              <div class="h-4 w-24 bg-muted rounded"></div>
              <div class="h-4 w-24 bg-muted rounded"></div>
            </div>
          </div>
          <div class="rounded-2xl p-6 border border-border bg-card">
            <div class="h-72 w-full bg-muted rounded-xl mb-4"></div>
            <div class="grid grid-cols-4 gap-3">
              <div v-for="i in 4" :key="i" class="h-20 bg-muted rounded-lg"></div>
            </div>
          </div>
          <div class="rounded-2xl p-6 border border-border bg-card space-y-3">
            <div class="h-5 w-40 bg-muted rounded"></div>
            <div class="h-4 w-full bg-muted rounded"></div>
            <div class="h-4 w-5/6 bg-muted rounded"></div>
            <div class="h-4 w-4/6 bg-muted rounded"></div>
          </div>
        </div>
        <div class="lg:col-span-1 space-y-6">
          <div class="rounded-2xl p-6 border border-border bg-card">
            <div class="h-10 w-2/3 bg-muted rounded mb-6"></div>
            <div class="h-12 w-full bg-muted rounded-xl mb-3"></div>
            <div class="h-12 w-full bg-muted rounded-xl"></div>
          </div>
          <div class="rounded-2xl p-6 border border-border bg-card">
            <div class="flex gap-4 mb-4">
              <div class="w-16 h-16 bg-muted rounded-full"></div>
              <div class="space-y-2 flex-1">
                <div class="h-4 w-32 bg-muted rounded"></div>
                <div class="h-3 w-24 bg-muted rounded"></div>
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
      <RouterLink :to="{ name: 'Annonces' }"
        class="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-xl font-semibold hover:bg-primary hover:text-primary-foreground transition-colors">
        <i class="fas fa-arrow-left"></i> Retour aux annonces
      </RouterLink>
    </div>

    <!-- ═══════════════════════════════ CONTENU ════════════════════════════════ -->
    <div v-else class="max-w-7xl mx-auto px-4 py-8">
      <!-- Fil d'Ariane -->
      <nav class="text-sm text-muted-foreground flex items-center gap-2 mb-6 flex-wrap">
        <RouterLink :to="{ name: 'Accueil' }" class="hover:text-secondary transition-colors">Accueil</RouterLink>
        <i class="fas fa-chevron-right text-xs text-muted-foreground/40"></i>
        <RouterLink :to="{ name: 'Annonces' }" class="hover:text-secondary transition-colors">Annonces</RouterLink>
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
                  <span class="px-4 py-1.5 bg-secondary text-secondary-foreground text-sm font-bold rounded-full">
                    {{ property.type === "rent" ? "À louer" : "À vendre" }}
                  </span>
                  <span v-if="property.category"
                    class="px-3 py-1.5 bg-primary/10 text-primary text-xs font-medium rounded-full">{{ property.category
                    }}</span>
                  <span v-if="property.etat"
                    class="px-3 py-1.5 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs font-medium rounded-full flex items-center gap-1">
                    <i class="fas fa-check-circle"></i> {{ property.etat }}
                  </span>
                </div>
                <h1 class="text-2xl md:text-3xl font-bold text-primary mb-2 leading-tight">
                  {{ property.title }}
                </h1>
                <p class="text-muted-foreground flex items-center gap-2">
                  <i class="fas fa-map-marker-alt text-secondary"></i>
                  {{ property.location }}
                </p>
              </div>

              <!-- Actions fav + partage -->
              <div class="flex items-center gap-3 shrink-0">
                <button v-if="property" @click="toggleFavorite" :class="[
                  'p-3 rounded-xl transition-all flex items-center gap-1.5',
                  property.is_favorite
                    ? 'bg-destructive text-destructive-foreground shadow-md'
                    : 'text-muted-foreground hover:bg-destructive/10 hover:text-destructive',
                ]" title="Ajouter aux favoris">
                  <i :class="property.is_favorite ? 'fas fa-heart' : 'far fa-heart'
                    " class="text-lg"></i>
                </button>
                <button @click="shareProperty"
                  class="p-3 text-muted-foreground rounded-xl hover:bg-secondary/10 hover:text-secondary transition-all"
                  title="Partager">
                  <i class="fas fa-share-alt text-lg"></i>
                </button>
              </div>
            </div>

            <!-- Stats rapides -->
            <div
              class="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-muted-foreground pt-4 border-t border-border">
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
              <img :src="activeImage" :alt="property.title"
                class="w-full h-64 md:h-[420px] object-cover transition-all duration-500" />
              <!-- Badge photos -->
              <div
                class="absolute top-4 right-4 px-3 py-1.5 bg-black/70 text-white text-sm rounded-full backdrop-blur-sm flex items-center gap-2">
                <i class="fas fa-camera"></i>
                {{ galleryImages.length }} photo{{
                  galleryImages.length > 1 ? "s" : ""
                }}
              </div>
              <!-- Nav fléchée -->
              <button v-if="galleryImages.length > 1" @click="prevImage"
                class="absolute left-8 md:left-12 top-1/2 -translate-y-1/2 w-7 h-7 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/80 transition-all group-hover:opacity-100">
                <i class="fas fa-chevron-left text-sm"></i>
              </button>
              <button v-if="galleryImages.length > 1" @click="nextImage"
                class="absolute  right-8 md:right-12 top-1/2 -translate-y-1/2 w-7 h-7 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/80 transition-all group-hover:opacity-100">
                <i class="fas fa-chevron-right text-sm"></i>
              </button>

              <!-- Barre d'actions TikTok sur l'image principale -->
              <PropertyActionBar
                :property="property"
                :is-fav="property.is_favorite"
                btn-size="md"
                position="absolute right-0   bottom-2  md:bottom-2"
                @toggle-favorite="toggleFavorite"
                @share="shareProperty"
              />
            </div>
            <!-- Miniatures -->
            <div v-if="galleryImages.length > 1" class="grid grid-cols-4 sm:grid-cols-5 gap-2">
              <img v-for="(img, i) in galleryImages" :key="i" :src="img" :alt="`Photo ${i + 1}`" @click="
                activeImage = img;
              activeIndex = i;
              " :class="[
                'w-full h-16 md:h-20 object-cover rounded-lg cursor-pointer transition-all duration-200 border-2',
                activeImage === img
                  ? 'border-secondary scale-105'
                  : 'border-transparent opacity-70 hover:opacity-100 hover:scale-105',
              ]" />
            </div>
          </div>

          <!-- ── Description ── -->
          <div class="bg-card rounded-2xl p-6 shadow-sm border border-border">
            <h2 class="text-xl font-bold text-primary mb-4 flex items-center gap-2">
              <i class="fas fa-file-alt text-secondary"></i>
              Description
            </h2>
            <p class="text-foreground/80 leading-relaxed">
              {{ property.description }}
            </p>

            <!-- Caractéristiques de base -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-border">
              <div class="p-4 rounded-xl bg-muted/10">
                <h4 class="font-bold text-primary mb-3 flex items-center gap-2">
                  <i class="fas fa-list-ul text-secondary text-sm"></i>
                  Caractéristiques
                </h4>
                <ul class="space-y-2 text-sm">
                  <li v-if="property.area" class="flex items-center gap-2 text-foreground/80">
                    <i class="fas fa-check text-secondary text-xs"></i> Surface
                    : {{ property.area }} m²
                  </li>
                  <li v-if="property.bedrooms" class="flex items-center gap-2 text-foreground/80">
                    <i class="fas fa-check text-secondary text-xs"></i>
                    {{ property.bedrooms }} chambre{{
                      property.bedrooms > 1 ? "s" : ""
                    }}
                  </li>
                  <li v-if="property.bathrooms" class="flex items-center gap-2 text-foreground/80">
                    <i class="fas fa-check text-secondary text-xs"></i>
                    {{ property.bathrooms }} salle{{
                      property.bathrooms > 1 ? "s" : ""
                    }}
                    de bain
                  </li>
                  <li v-if="property.construction_year" class="flex items-center gap-2 text-foreground/80">
                    <i class="fas fa-check text-secondary text-xs"></i> Année de
                    construction : {{ property.construction_year }}
                  </li>
                  <li v-if="property.etat" class="flex items-center gap-2 text-foreground/80">
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
              <div class="p-4 rounded-xl bg-muted/10">
                <h4 class="font-bold text-primary mb-3 flex items-center gap-2">
                  <i class="fas fa-star text-secondary text-sm"></i> Commodités
                </h4>
                <ul v-if="amenities.length" class="space-y-2 text-sm">
                  <li v-for="a in amenities" :key="a" class="flex items-center gap-2 text-foreground/80">
                    <i :class="`fas ${amenityIcon(a)} text-secondary text-xs`"></i>
                    {{ a }}
                  </li>
                </ul>
                <p v-else class="text-sm text-muted-foreground italic">
                  Non renseignées
                </p>
              </div>
            </div>

            <!-- Grille icônes commodités -->
            <div v-if="amenities.length" class="mt-6 pt-6 border-t border-border">
              <h3 class="text-lg font-bold text-primary mb-4">
                Équipements inclus
              </h3>
              <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                <div v-for="a in amenities" :key="a"
                  class="p-3  rounded-xl text-center hover:-translate-y-1 hover:shadow-md transition-all duration-300 group cursor-default border border-border">
                  <i
                    :class="`fas ${amenityIcon(a)} text-2xl text-secondary mb-2 group-hover:scale-110 transition-transform inline-block`"></i>
                  <p class="text-xs font-medium text-foreground/80 leading-tight">
                    {{ a }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- ── Section Avis ── -->
          <div class="bg-card rounded-2xl p-6 shadow-sm border border-border" id="avis">
            <!-- En-tête avis -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
              <h2 class="text-xl font-bold text-primary flex items-center gap-2">
                <i class="fas fa-star text-amber-500"></i>
                Avis des visiteurs
                <span class="text-base font-normal text-muted-foreground">({{ reviewStats?.total ?? 0 }})</span>
              </h2>
              <div v-if="reviewStats?.total" class="flex items-center gap-2">
                <div class="flex items-center gap-0.5">
                  <i v-for="s in 5" :key="s" :class="s <= Math.round(reviewStats.average) ? 'fas fa-star' : 'far fa-star'"
                    class="text-amber-500 text-sm"></i>
                </div>
                <span class="font-bold text-primary text-lg">{{ reviewStats.average }}</span>
                <span class="text-muted-foreground text-xs">/5</span>
              </div>
            </div>

            <!-- Barre de distribution des notes -->
            <div v-if="reviewStats?.total" class="mb-6 space-y-1.5">
              <div v-for="star in [5,4,3,2,1]" :key="star" class="flex items-center gap-2 text-xs">
                <span class="w-3 text-right font-medium text-muted-foreground">{{ star }}</span>
                <i class="fas fa-star text-amber-400 text-[10px]"></i>
                <div class="flex-1 bg-muted/30 rounded-full h-2 overflow-hidden">
                  <div class="h-2 bg-amber-400 rounded-full transition-all duration-500"
                    :style="{ width: reviewStats.total ? ((reviewStats[['one','two','three','four','five'][star-1]] / reviewStats.total) * 100) + '%' : '0%' }"></div>
                </div>
                <span class="w-6 text-muted-foreground">{{ reviewStats[['one','two','three','four','five'][star-1]] }}</span>
              </div>
            </div>

            <!-- Formulaire avis -->
            <div v-if="authStore.user && !myReview && !showReviewForm"
              class="mb-6 p-4 bg-muted/10 rounded-xl border border-dashed border-border">
              <p class="text-sm text-muted-foreground mb-3">Vous avez visité ce bien ? Partagez votre expérience !</p>
              <button @click="showReviewForm = true"
                class="px-5 py-2 bg-secondary text-secondary-foreground rounded-xl text-xs font-bold hover:bg-primary hover:text-primary-foreground transition-colors">
                <i class="fas fa-pen mr-2"></i> Écrire un avis
              </button>
            </div>

            <!-- Formulaire complet -->
            <div v-if="showReviewForm && !myReview"
              class="mb-6 bg-muted/10 rounded-xl border border-secondary/30 p-5 animate-fadeIn">
              <h3 class="text-sm font-bold text-foreground mb-4">Votre évaluation</h3>

              <!-- Étoiles interactives -->
              <div class="flex items-center gap-1 mb-4">
                <button v-for="s in 5" :key="s"
                  @click="newReview.rating = s"
                  @mouseover="reviewHover = s"
                  @mouseleave="reviewHover = 0"
                  class="text-2xl transition-transform hover:scale-110 focus:outline-none">
                  <i :class="s <= (reviewHover || newReview.rating) ? 'fas fa-star text-amber-400' : 'far fa-star text-muted-foreground'"></i>
                </button>
                <span class="ml-2 text-sm font-medium text-foreground">
                  {{ ['','Médiocre','Passable','Bien','Très bien','Excellent'][newReview.rating] }}
                </span>
              </div>

              <input v-model="newReview.title" type="text" placeholder="Titre de votre avis (optionnel)"
                class="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-secondary/30 mb-3" />

              <textarea v-model="newReview.comment" rows="4"
                placeholder="Décrivez votre expérience avec ce bien... (min. 10 caractères)"
                class="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-secondary/30 resize-none"></textarea>
              <p v-if="newReview.comment.length > 0" class="text-right text-xs text-muted-foreground mt-1">{{ newReview.comment.length }}/1000</p>

              <div class="flex gap-3 mt-4">
                <button @click="submitReview" :disabled="isSubmittingReview || !newReview.rating || newReview.comment.length < 10"
                  class="flex-1 py-2.5 bg-secondary text-secondary-foreground rounded-xl text-sm font-bold hover:bg-primary hover:text-primary-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  <i v-if="isSubmittingReview" class="fas fa-circle-notch fa-spin mr-2"></i>
                  {{ isSubmittingReview ? 'Publication...' : 'Publier mon avis' }}
                </button>
                <button @click="showReviewForm = false"
                  class="px-5 py-2.5 border border-border text-muted-foreground rounded-xl text-sm hover:bg-muted/20 transition-colors">
                  Annuler
                </button>
              </div>
              <p v-if="reviewError" class="text-red-500 text-xs mt-2">{{ reviewError }}</p>
            </div>

            <!-- Mon avis existant -->
            <div v-if="myReview" class="mb-6 p-4 bg-secondary/5 border border-secondary/20 rounded-xl">
              <div class="flex items-center justify-between mb-2">
                <p class="text-xs font-bold text-secondary uppercase tracking-wide">Votre avis</p>
                <button @click="deleteMyReview" class="text-xs text-destructive hover:text-destructive/80 transition-colors">
                  <i class="fas fa-trash mr-1"></i> Supprimer
                </button>
              </div>
              <div class="flex items-center gap-0.5 mb-1">
                <i v-for="s in 5" :key="s" :class="s <= myReview.rating ? 'fas fa-star' : 'far fa-star'"
                  class="text-amber-400 text-xs"></i>
              </div>
              <p class="text-sm text-foreground/80">{{ myReview.comment }}</p>
            </div>

            <!-- Liste des avis -->
            <div v-if="reviewsLoading" class="space-y-4">
              <div v-for="n in 3" :key="n" class="animate-pulse">
                <div class="flex gap-3">
                  <div class="w-10 h-10 bg-muted rounded-full"></div>
                  <div class="flex-1 space-y-2">
                    <div class="h-3 w-28 bg-muted rounded"></div>
                    <div class="h-3 w-full bg-muted rounded"></div>
                    <div class="h-3 w-4/5 bg-muted rounded"></div>
                  </div>
                </div>
              </div>
            </div>

            <div v-else-if="reviews.length === 0 && !showReviewForm" class="py-10 text-center">
              <i class="far fa-comment-dots text-4xl text-muted-foreground/30 mb-3"></i>
              <p class="text-sm text-muted-foreground">Aucun avis pour le moment.</p>
              <p v-if="!authStore.user" class="text-xs text-muted-foreground mt-1">
                <RouterLink :to="{ name: 'Connexion' }" class="text-secondary hover:underline">Connectez-vous</RouterLink>
                pour laisser votre avis.
              </p>
            </div>

            <div v-else class="space-y-5">
              <div v-for="r in reviews" :key="r.id" class="border-b border-border pb-5 last:border-0 last:pb-0">
                <div class="flex items-start justify-between mb-2">
                  <div class="flex items-center gap-3">
                    <div v-if="r.user?.avatar"
                      class="w-10 h-10 rounded-full overflow-hidden shrink-0">
              <UserAvatar :user="r.user" size="sm" />
                    
                      <!-- <img :src="r.user.avatar" :alt="r.user.name" class="w-full h-full object-cover" /> -->
                    </div>
                    <div v-else
                      class="w-10 h-10 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm shrink-0">
                      {{ r.user?.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2) }}
                    </div>
                    <div>
                      <div class="flex items-center gap-2">
                        <h4 class="font-semibold text-foreground text-sm">{{ r.user?.name }}</h4>
                        <span v-if="r.is_verified_tenant"
                          class="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400 text-[10px] font-bold rounded-full">
                          <i class="fas fa-check-circle text-[10px]"></i> Locataire vérifié
                        </span>
                      </div>
                      <div class="flex items-center gap-0.5 mt-0.5">
                        <i v-for="s in 5" :key="s" :class="s <= r.rating ? 'fas fa-star' : 'far fa-star'"
                          class="text-amber-400 text-xs"></i>
                      </div>
                    </div>
                  </div>
                  <span class="text-xs text-muted-foreground whitespace-nowrap">
                    {{ new Date(r.created_at).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }) }}
                  </span>
                </div>
                <p v-if="r.title" class="text-sm font-semibold text-foreground mb-1 pl-13">{{ r.title }}</p>
                <p class="text-foreground/70 text-sm leading-relaxed pl-13">{{ r.comment }}</p>
              </div>

              <!-- Pagination -->
              <div v-if="reviewPagination.last_page > 1" class="flex justify-center gap-2 pt-2">
                <button v-for="p in reviewPagination.last_page" :key="p"
                  @click="fetchReviews(p)"
                  :class="p === reviewPagination.current_page ? 'bg-secondary text-secondary-foreground' : 'bg-muted/20 text-muted-foreground hover:bg-muted/40'"
                  class="w-8 h-8 rounded-lg text-xs font-bold transition-colors">{{ p }}</button>
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
                <div class="text-sm text-muted-foreground  rounded-lg p-3 space-y-1 border border-border">
                  <div class="flex items-center gap-2">
                    <i class="fas fa-shield-alt text-secondary/60 w-4"></i>
                    <span>Caution :
                      <strong>{{ formatPrice(property.price * 2) }} FCFA</strong></span>
                  </div>
                  <div class="flex items-center gap-2">
                    <i class="fas fa-calendar-alt text-secondary/60 w-4"></i>
                    <span>Avance : <strong>1 mois</strong></span>
                  </div>
                </div>
              </div>

              <div class="space-y-3">
                <!-- Bloc de Poursuite de la procédure locative (s'il y en a une en cours) -->
                <div v-if="activeProcess"
                  class="bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 p-4 rounded-xl shadow-sm text-center">
                  <p
                    class="text-[10px] text-orange-600 dark:text-orange-400 font-black uppercase tracking-widest mb-1.5 flex items-center justify-center gap-1.5">
                    <i class="fas fa-spinner animate-spin"></i> Procédure en
                    cours
                  </p>
                  <p class="text-sm font-bold text-foreground mb-4">
                    {{ activeProcess.label }}
                  </p>

                  <RouterLink :to="`/mon-suivi?property_id=${property.id}`"
                    class="w-full py-2.5 bg-orange-600 text-white rounded-lg font-bold hover:bg-orange-700 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg text-sm">
                    Suivre ma demande
                    <i class="fas fa-arrow-right ml-1"></i>
                  </RouterLink>
                </div>

                <!-- Boutons standards (si aucune procédure active) -->
                <template v-else>
                  <RouterLink v-if="property.type === 'rent'"
                    :to="`/locataire/formulaire-location?property_id=${property.id}`"
                    class="w-full py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg group">
                    <i class="fas fa-key group-hover:scale-110 transition-transform"></i>
                    Louer ce bien
                  </RouterLink>
                  <RouterLink :to="`/programmer-visite?slug=${property.slug}&property_id=${property.id}`"
                    class="w-full py-3 bg-secondary text-secondary-foreground rounded-xl font-bold hover:bg-primary hover:text-primary-foreground transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg group">
                    <i class="fas fa-calendar-check group-hover:scale-110 transition-transform"></i>
                    Programmer une visite
                  </RouterLink>
                </template>

                <a :href="`tel:${ownerPhone}`" v-if="ownerPhone"
                  class="w-full py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all flex items-center justify-center gap-2 shadow-sm">
                  <i class="fas fa-phone"></i> Appeler le propriétaire
                </a>
                <RouterLink :to="{ name: 'Assistance' }"
                  class="w-full py-3 border-2 border-secondary text-secondary rounded-xl font-bold hover:bg-secondary hover:text-primary transition-all flex items-center justify-center gap-2">
                  <i class="fas fa-headset"></i> Assistance
                </RouterLink>
              </div>

              <div
                class="mt-4 p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900 rounded-xl">
                <p class="text-sm text-blue-800 dark:text-blue-300 flex items-center gap-2">
                  <i class="fas fa-clock text-blue-600 dark:text-blue-400"></i>
                  Réponse moyenne : <strong>2 heures</strong>
                </p>
              </div>
            </div>

            <!-- Propriétaire -->
            <div class="bg-card rounded-2xl p-6 shadow-sm border border-border">
              <h3 class="text-base font-bold text-primary mb-4 flex items-center gap-2">
                <i class="fas fa-user-circle text-secondary"></i> Propriétaire
              </h3>
              <div class="flex items-center gap-4 mb-4">
                <div
                  class="w-14 h-14 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center text-primary-foreground text-lg font-bold shrink-0 overflow-hidden">
                  <!-- <img v-if="property.owner?.avatar_url" :src="property.owner.avatar_url"
                    class="w-full h-full object-cover" /> -->
              <UserAvatar v-if="property.owner" :user="property.owner" size="sm" />

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
                    class="px-2 py-0.5 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs font-medium rounded-full flex items-center gap-1">
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
              <h3 class="text-base font-bold text-primary mb-4 flex items-center gap-2">
                <i class="fas fa-map-marker-alt text-secondary"></i>
                Localisation
              </h3>
              <!-- Mini carte placeholder stylisée -->
              <div
                class="rounded-xl overflow-hidden mb-4 relative bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/30 h-44 flex items-center justify-center border border-green-200/50 dark:border-green-800/30">
                <div class="text-center">
                  <div
                    class="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg animate-bounce-slow">
                    <i class="fas fa-map-marker-alt text-secondary-foreground text-xl"></i>
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
          <RouterLink :to="{ name: 'Annonces' }"
            class="text-secondary hover:text-primary font-medium flex items-center gap-2 transition-colors text-sm">
            Voir tout <i class="fas fa-arrow-right"></i>
          </RouterLink>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="s in similarProperties" :key="s.id"
            class="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group border border-border hover:border-secondary relative">
            <div class="relative overflow-hidden h-48">
              <RouterLink :to="`/annonces/${s.slug || s.id}`">
                <img :src="s.image" :alt="s.title"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </RouterLink>
              
              <span
                class="absolute top-3 left-3 px-3 py-1 bg-secondary text-secondary-foreground text-xs font-bold rounded-full">
                {{ formatPrice(s.price) }} F
              </span>
              
              <!-- Barre d'actions TikTok sur les biens similaires -->
              <PropertyActionBar
                :property="s"
                :is-fav="s.is_favorite"
                btn-size="sm"
                position="absolute right-2 bottom-2"
                @toggle-favorite="(id) => toggleFavorite(s)"
                @share="(p) => shareProperty(p)"
              />
            </div>
            <div class="p-4">
              <RouterLink :to="`/annonces/${s.slug || s.id}`">
                <h3
                  class="font-bold text-foreground mb-1 line-clamp-1 group-hover:text-secondary transition-colors text-sm">
                  {{ s.title }}
                </h3>
              </RouterLink>
              <p class="text-xs text-muted-foreground mb-3 flex items-center gap-1.5">
                <i class="fas fa-map-marker-alt text-secondary"></i>
                {{ s.location }}
              </p>
              <div class="flex items-center justify-between text-xs text-muted-foreground">
                <div class="flex items-center gap-3">
                  <span><i class="fas fa-bed text-secondary mr-1"></i>{{ s.rooms }}</span>
                  <span><i class="fas fa-bath text-secondary mr-1"></i>{{ s.bathrooms }}</span>
                  <span><i class="fas fa-ruler-combined text-secondary mr-1"></i>{{ s.area }}m²</span>
                </div>
              </div>
            </div>
          </div>
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
import { usePropertyStore } from "../../stores/properties";
import axios from "../../axios";
import PropertyActionBar from "../../components/PropertyActionBar.vue";
import UserAvatar from "../../components/common/UserAvatar.vue";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const rentalStore = useRentalStore();
const propertyStore = usePropertyStore();

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
  if (!process) return null;
  if (process.status === "cancelled") return null;
  return process;
});

// ─── Avis (reviews) — données réelles depuis l'API ────────────────────
const reviews = ref([]);
const reviewStats = ref(null);
const reviewsLoading = ref(false);
const myReview = ref(null);
const showReviewForm = ref(false);
const isSubmittingReview = ref(false);
const reviewError = ref('');
const reviewHover = ref(0);
const reviewPagination = ref({ last_page: 1, current_page: 1 });
const newReview = ref({ rating: 0, title: '', comment: '' });

const fetchReviews = async (page = 1) => {
  if (!property.value) return;
  reviewsLoading.value = true;
  try {
    const { data } = await axios.get(`/api/properties/${property.value.slug}/reviews`, { params: { page } });
    if (data.success) {
      reviews.value = data.data.data;
      reviewStats.value = data.stats;
      reviewPagination.value = { last_page: data.data.last_page, current_page: data.data.current_page };
    }
  } catch (err) {
    console.error('Erreur chargement avis:', err);
  } finally {
    reviewsLoading.value = false;
  }
};

const fetchMyReview = async () => {
  if (!authStore.user || !property.value) return;
  try {
    const { data } = await axios.get(`/api/properties/${property.value.slug}/reviews/my`);
    if (data.success) myReview.value = data.data;
  } catch { /* silence */ }
};

const submitReview = async () => {
  reviewError.value = '';
  if (!newReview.value.rating) { reviewError.value = 'Veuillez sélectionner une note.'; return; }
  if (newReview.value.comment.length < 10) { reviewError.value = 'Le commentaire doit faire au moins 10 caractères.'; return; }
  isSubmittingReview.value = true;
  try {
    const { data } = await axios.post(`/api/properties/${property.value.slug}/reviews`, newReview.value);
    if (data.success) {
      myReview.value = data.data;
      showReviewForm.value = false;
      newReview.value = { rating: 0, title: '', comment: '' };
      await fetchReviews();
    }
  } catch (err) {
    reviewError.value = err.response?.data?.message || 'Une erreur est survenue.';
  } finally {
    isSubmittingReview.value = false;
  }
};

const deleteMyReview = async () => {
  if (!myReview.value || !confirm('Supprimer votre avis ?')) return;
  try {
    await axios.delete(`/api/reviews/${myReview.value.id}`);
    myReview.value = null;
    await fetchReviews();
  } catch {
    alert('Erreur lors de la suppression.');
  }
};


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
    // Note: On utilise le store pour bénéficier du cache
    const payload = await propertyStore.fetchPropertyDetails(slug);

    if (!payload) {
      console.warn('[DetailAnnonce] fetchPropertyDetails returned nothing for slug:', slug);
      return;
    }

    const propData = payload.data;
    if (!propData) {
      console.warn('[DetailAnnonce] payload.data est null. payload reçu:', payload);
      return;
    }

    property.value = propData;
    similarProperties.value = payload.similar ?? [];

    const imgs = propData.all_images;
    activeImage.value = imgs?.length ? imgs[0] : (propData.image ?? "");
    activeIndex.value = 0;
    document.title = `${propData.title} | Home Cameroun`;

    // Charger les avis en parallèle (non bloquant)
    fetchReviews();
    fetchMyReview();

    if (authStore.user) {
      await Promise.all([
        rentalStore.fetchVisits(),
        rentalStore.fetchApplications(),
      ]);
    }
  } catch (err) {
    if (err.message === 'PROPERTY_NOT_FOUND') {
      console.warn('[DetailAnnonce] Bien introuvable:', slug);
    } else {
      console.error("Erreur chargement annonce:", err);
    }
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
const toggleFavorite = async (p = null) => {
  const target = p || property.value;
  if (!target) return;

  if (!authStore.user) {
    router.push({ name: "Connexion" });
    return;
  }
  await propertyStore.toggleFavorite(target.id);

  // If main property, sync with cache
  if (!p) {
    const cachedPayload = propertyStore.propertyDetailsCache[target.slug];
    if (cachedPayload && cachedPayload.data) {
      target.is_favorite = cachedPayload.data.is_favorite;
    } else {
      target.is_favorite = !target.is_favorite;
    }
  } else {
    // If similar property, just toggle boolean
    target.is_favorite = !target.is_favorite;
  }
};

const shareProperty = async (p = null) => {
  const target = p || property.value;
  if (!target) return;

  // Track share in backend
  await propertyStore.shareProperty(target.id);

  const url = p ? `${window.location.origin}/annonces/${p.slug || p.id}` : window.location.href;
  const title = target.title;

  if (navigator.share) {
    try {
      await navigator.share({ title, url });
    } catch (err) {
      console.log('Erreur de partage:', err);
    }
  } else {
    navigator.clipboard.writeText(url);
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
.bg-muted {
  background-color: rgba(233, 228, 222, 0.456);
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