<template>
  <div class="bg-background min-h-screen page-enter pb-20">

    <!-- ═══════════════════ SKELETON ═══════════════════ -->
    <div v-if="isLoading">
      <div class="w-full h-[50vh] bg-muted animate-pulse"></div>
      <div class="max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 space-y-4">
          <div class="h-5 w-1/3 bg-muted rounded animate-pulse"></div>
          <div class="h-8 w-2/3 bg-muted rounded animate-pulse"></div>
          <div class="h-4 w-1/2 bg-muted rounded animate-pulse"></div>
          <div class="flex gap-4 mt-4">
            <div class="h-10 w-24 bg-muted rounded-full animate-pulse" v-for="i in 4" :key="i"></div>
          </div>
          <div class="h-32 w-full bg-muted rounded animate-pulse mt-4"></div>
        </div>
        <div class="space-y-4">
          <div class="h-64 w-full bg-muted rounded-xl animate-pulse"></div>
        </div>
      </div>
    </div>

    <!-- ═══════════════════ 404 ═══════════════════════ -->
    <div v-else-if="!property" class="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <i class="fas fa-home text-6xl text-muted-foreground/20 mb-6"></i>
      <h2 class="text-2xl font-bold text-foreground mb-2">Annonce introuvable</h2>
      <p class="text-muted-foreground mb-6">Ce bien n'existe pas ou a été supprimé.</p>
      <RouterLink :to="{ name: 'Annonces' }"
        class="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-xl font-semibold hover:bg-primary hover:text-primary-foreground transition-colors">
        <i class="fas fa-arrow-left"></i> Retour aux annonces
      </RouterLink>
    </div>

    <!-- ═══════════════════ CONTENU ════════════════════ -->
    <div v-else class="relative overflow-x-hidden">

      <!-- ─── HERO GALERIE (pleine largeur) ─────────────────────────── -->
      <div class="relative w-full h-[50vh] md:h-[65vh] bg-black overflow-hidden group">

        <!-- Image principale -->
        <img :src="activeImage" :alt="property.title"
          class="w-full h-full object-cover transition-all duration-700 cursor-zoom-in" @click="showLightbox = true" />

        <!-- Overlay dégradé bas -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none">
        </div>

        <!-- Badge procédure en cours -->
        <div v-if="activeProcess"
          class="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-orange-500/90 text-white text-xs font-bold rounded-full backdrop-blur-sm animate-pulse">
          <i class="fas fa-spinner animate-spin"></i> Procédure en cours
        </div>

        <!-- Bouton retour (haut gauche) -->
        <button @click="$router.back()"
          class="absolute top-4 left-4 w-9 h-9 bg-black/40 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-all"
          :class="activeProcess ? 'left-48' : 'left-4'">
          <i class="fas fa-arrow-left text-sm"></i>
        </button>

        <!-- Actions (haut droite) -->
        <div class="absolute top-4 right-4 flex items-center gap-2">
          <button @click="toggleFavorite" :class="[
            'w-9 h-9 rounded-full backdrop-blur-sm flex items-center justify-center transition-all text-sm',
            property.is_favorite
              ? 'bg-red-500 text-white shadow-lg shadow-red-500/40'
              : 'bg-black/40 text-white hover:bg-red-500/80'
          ]">
            <i :class="property.is_favorite ? 'fas fa-heart' : 'far fa-heart'"></i>
          </button>
          <button @click="shareProperty"
            class="w-9 h-9 bg-black/40 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-all text-sm">
            <i class="fas fa-share-alt"></i>
          </button>
          <button @click="showLightbox = true"
            class="hidden sm:flex w-9 h-9 bg-black/40 backdrop-blur-sm text-white rounded-full items-center justify-center hover:bg-black/70 transition-all text-sm">
            <i class="fas fa-expand"></i>
          </button>
        </div>

        <!-- Compteur photos (haut droite bas) -->
        <div
          class="absolute top-4 right-32 sm:right-36 flex items-center gap-1.5 px-3 py-1.5 bg-black/40 backdrop-blur-sm text-white text-xs rounded-full">
          <i class="fas fa-camera"></i>
          <span>{{ galleryImages.length }} photo{{ galleryImages.length > 1 ? 's' : '' }}</span>
        </div>

        <!-- Overlay contenu bas : titre + prix + badges -->
        <div class="absolute bottom-0 left-0 right-0 p-4 md:p-6">
          <!-- Fil d'Ariane discret -->
          <nav class="hidden md:flex items-center gap-1.5 text-xs text-white/60 mb-3">
            <RouterLink :to="{ name: 'Accueil' }" class="hover:text-white transition-colors">Accueil</RouterLink>
            <i class="fas fa-chevron-right text-[10px]"></i>
            <RouterLink :to="{ name: 'Annonces' }" class="hover:text-white transition-colors">Annonces</RouterLink>
            <i class="fas fa-chevron-right text-[10px]"></i>
            <span class="text-white/80 line-clamp-1 max-w-xs">{{ property.title }}</span>
          </nav>

          <!-- Badges -->
          <div class="flex items-center flex-wrap gap-2 mb-2">
            <span class="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-bold rounded-full">
              {{ property.type === 'rent' ? 'À louer' : 'À vendre' }}
            </span>
            <span v-if="property.category"
              class="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
              {{ property.category }}
            </span>
            <span v-if="property.etat"
              class="px-3 py-1 bg-green-500/80 text-white text-xs font-semibold rounded-full flex items-center gap-1">
              <i class="fas fa-check-circle"></i> {{ property.etat }}
            </span>
          </div>

          <!-- Titre -->
          <h1 class="text-xl md:text-3xl font-black text-white mb-1 leading-tight drop-shadow-md line-clamp-2">
            {{ property.title }}
          </h1>

          <!-- Localisation + vues -->
          <div class="flex items-center gap-4 text-white/80 text-sm">
            <span class="flex items-center gap-1.5">
              <i class="fas fa-map-marker-alt text-secondary"></i>
              {{ property.location }}
            </span>
            <span class="flex items-center gap-1 text-white/50 text-xs">
              <i class="fas fa-eye"></i> {{ property.views_count }}
            </span>
          </div>
        </div>

        <!-- Navigation fléchée galerie -->
        <button v-if="galleryImages.length > 1" @click="prevImage"
          class="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/80 transition-all opacity-0 group-hover:opacity-100">
          <i class="fas fa-chevron-left text-sm"></i>
        </button>
        <button v-if="galleryImages.length > 1" @click="nextImage"
          class="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/80 transition-all opacity-0 group-hover:opacity-100">
          <i class="fas fa-chevron-right text-sm"></i>
        </button>

        <!-- Miniatures (strip bas) -->
        <div v-if="galleryImages.length > 1"
          class="absolute bottom-0 left-0 right-0 flex gap-1.5 px-3 pb-2 overflow-x-auto no-scrollbar justify-end">
          <button v-for="(img, i) in galleryImages" :key="i" @click="activeImage = img; activeIndex = i"
            class="shrink-0 w-12 h-9 rounded overflow-hidden border-2 transition-all duration-200"
            :class="activeImage === img ? 'border-secondary scale-105' : 'border-transparent opacity-60 hover:opacity-100'">
            <img :src="img" class="w-full h-full object-cover" />
          </button>
        </div>
      </div>

      <!-- ─── CORPS PRINCIPAL ────────────────────────────────────────── -->
      <div class="max-w-7xl mx-auto px-4 py-6 md:py-8 ">
        <div class="grid lg:grid-cols-3 gap-6 lg:gap-8">

          <!-- ════ COLONNE PRINCIPALE (2/3) ════════════════════════════ -->
          <div class="lg:col-span-2 space-y-0 bg-card border border-border rounded-xl overflow-hidden">

            <!-- CTA mobile — visible uniquement sur mobile, en haut du contenu -->
            <div class="lg:hidden border-b border-border p-4">
              <div class="flex items-baseline gap-2 mb-3">
                <span class="text-3xl font-black text-secondary">{{ formatPrice(property.price) }}</span>
                <span class="text-muted-foreground text-sm">FCFA / mois</span>
              </div>
              <div class="grid grid-cols-2 gap-2">
                <RouterLink v-if="!activeProcess && property.type === 'rent'"
                  :to="`/locataire/formulaire-location?property_id=${property.id}`"
                  class="py-2.5 bg-primary text-primary-foreground rounded-lg font-bold text-sm flex items-center justify-center gap-2">
                  <i class="fas fa-key"></i> Louer
                </RouterLink>
                <RouterLink v-if="!activeProcess"
                  :to="`/programmer-visite?slug=${property.slug}&property_id=${property.id}`"
                  class="py-2.5 bg-secondary text-secondary-foreground rounded-lg font-bold text-sm flex items-center justify-center gap-2">
                  <i class="fas fa-calendar-check"></i> Visiter
                </RouterLink>
                <RouterLink v-if="activeProcess" :to="`/mon-suivi?property_id=${property.id}`"
                  class="col-span-2 py-2.5 bg-orange-500 text-white rounded-lg font-bold text-sm flex items-center justify-center gap-2">
                  <i class="fas fa-spinner animate-spin"></i> Suivre ma procédure
                </RouterLink>
              </div>
            </div>

            <!-- Stats rapides -->
            <div class="px-4 py-4 border-b border-border">
              <div class="flex flex-wrap gap-x-6 gap-y-3">
                <div v-if="property.bedrooms" class="flex items-center gap-2 text-sm">
                  <div class="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center">
                    <i class="fas fa-bed text-secondary text-xs"></i>
                  </div>
                  <span class="font-semibold text-foreground">{{ property.bedrooms }}</span>
                  <span class="text-muted-foreground">chambre{{ property.bedrooms > 1 ? 's' : '' }}</span>
                </div>
                <div v-if="property.bathrooms" class="flex items-center gap-2 text-sm">
                  <div class="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center">
                    <i class="fas fa-bath text-secondary text-xs"></i>
                  </div>
                  <span class="font-semibold text-foreground">{{ property.bathrooms }}</span>
                  <span class="text-muted-foreground">salle{{ property.bathrooms > 1 ? 's' : '' }} de bain</span>
                </div>
                <div v-if="property.area" class="flex items-center gap-2 text-sm">
                  <div class="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center">
                    <i class="fas fa-ruler-combined text-secondary text-xs"></i>
                  </div>
                  <span class="font-semibold text-foreground">{{ property.area }} m²</span>
                </div>
                <div v-if="property.city" class="flex items-center gap-2 text-sm">
                  <div class="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center">
                    <i class="fas fa-city text-secondary text-xs"></i>
                  </div>
                  <span class="text-foreground">{{ property.city }}</span>
                </div>
                <div v-if="property.construction_year" class="flex items-center gap-2 text-sm">
                  <div class="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center">
                    <i class="fas fa-calendar text-secondary text-xs"></i>
                  </div>
                  <span class="text-muted-foreground">{{ property.construction_year }}</span>
                </div>
              </div>
            </div>

            <!-- Description -->
            <div class="px-4 py-5 border-b border-border">
              <h2 class="text-base font-bold text-foreground mb-3 flex items-center gap-2">
                <span class="w-1 h-4 bg-secondary rounded-full inline-block"></span>
                Description
              </h2>
              <p class="text-foreground/75 leading-relaxed text-sm md:text-base whitespace-pre-line">
                {{ property.description }}
              </p>
            </div>

            <!-- Commodités (pills) -->
            <div v-if="amenities.length" class="px-4 py-5 border-b border-border">
              <h2 class="text-base font-bold text-foreground mb-4 flex items-center gap-2">
                <span class="w-1 h-4 bg-secondary rounded-full inline-block"></span>
                Équipements inclus
              </h2>
              <div class="flex flex-wrap gap-2">
                <span v-for="a in amenities" :key="a"
                  class="inline-flex items-center gap-2 px-3 py-1.5 bg-muted/60 border border-border text-sm text-foreground rounded-full hover:bg-secondary/10 hover:border-secondary/30 transition-colors">
                  <i :class="`fas ${amenityIcon(a)} text-secondary text-xs`"></i>
                  {{ a }}
                </span>
              </div>
            </div>

            <!-- Processus locatif info -->
            <div class="px-4 py-5 border-b border-border">
              <h2 class="text-base font-bold text-foreground mb-4 flex items-center gap-2">
                <span class="w-1 h-4 bg-secondary rounded-full inline-block"></span>
                Comment ça marche ?
              </h2>
              <div class="flex flex-col sm:flex-row gap-4">
                <div v-for="(step, i) in locatifSteps" :key="i" class="flex-1 flex gap-3 items-start">
                  <div
                    class="w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-xs font-black shrink-0">
                    {{ i + 1 }}
                  </div>
                  <div>
                    <p class="text-sm font-bold text-foreground">{{ step.title }}</p>
                    <p class="text-xs text-muted-foreground mt-0.5">{{ step.desc }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- ── Section Commentaires (En remplacement des Avis) ── -->
            <div class="px-4 py-5" id="commentaires">
              <div class="flex items-center justify-between mb-5">
                <h2 class="text-base font-bold text-foreground flex items-center gap-2">
                  <span class="w-1 h-4 bg-secondary rounded-full inline-block"></span>
                  Commentaires
                  <span class="text-sm font-normal text-muted-foreground ml-1">({{ comments.length }})</span>
                </h2>
                <button v-if="authStore.user && !showReviewForm" @click="showReviewForm = true"
                  class="text-xs font-bold text-secondary border border-secondary/30 px-3 py-1.5 rounded-full hover:bg-secondary hover:text-secondary-foreground transition-colors">
                  <i class="fas fa-pen mr-1"></i> Laisser un commentaire
                </button>
              </div>

              <!-- Formulaire commentaire (Réutilisation du design du formulaire d'avis) -->
              <div v-if="showReviewForm" class="mb-5 p-4  rounded-xl ">
                <h3 class="text-sm font-bold text-foreground mb-3">Votre commentaire</h3>
                <textarea v-model="newComment" rows="3" placeholder="Écrivez votre commentaire ici..."
                  class="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-secondary/30 text-foreground placeholder:text-muted-foreground"></textarea>
                <div class="flex gap-2 mt-3">
                  <button @click="submitComment" :disabled="isSubmittingComment || !newComment.trim()"
                    class="flex-1 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-bold hover:bg-primary hover:text-primary-foreground transition-colors disabled:opacity-50">
                    <i v-if="isSubmittingComment" class="fas fa-circle-notch fa-spin mr-1"></i>
                    {{ isSubmittingComment ? 'Publication...' : 'Publier' }}
                  </button>
                  <button @click="showReviewForm = false"
                    class="px-4 py-2 border border-border text-muted-foreground rounded-lg text-sm hover:bg-muted/20 transition-colors">
                    Annuler
                  </button>
                </div>
              </div>

              <!-- Liste commentaires -->
              <div v-if="commentsLoading" class="space-y-4">
                <div v-for="n in 3" :key="n" class="flex gap-3 animate-pulse">
                  <div class="w-9 h-9 bg-muted rounded-full shrink-0"></div>
                  <div class="flex-1 space-y-2">
                    <div class="h-3 w-24 bg-muted rounded"></div>
                    <div class="h-3 w-full bg-muted rounded"></div>
                  </div>
                </div>
              </div>
              <div v-else-if="comments.length === 0 && !showReviewForm" class="py-8 text-center">
                <i class="far fa-comment-dots text-3xl text-muted-foreground/30 mb-2"></i>
                <p class="text-sm text-muted-foreground">Aucun commentaire pour le moment.</p>
                <p v-if="!authStore.user" class="text-xs text-muted-foreground mt-1">
                  <RouterLink :to="{ name: 'Connexion' }" class="text-secondary hover:underline">Connectez-vous
                  </RouterLink>
                  pour laisser un commentaire.
                </p>
              </div>
              <div v-else class="space-y-4">
                <div v-for="c in comments" :key="c.id"
                  class="flex gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
                  <div class="shrink-0">
                    <UserAvatar :user="c.user" size="sm" />
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center justify-between mb-0.5">
                      <span class="text-sm font-semibold text-foreground">{{ c.user?.name }}</span>
                      <div class="flex items-center gap-3">
                        <span class="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-tight">
                          {{ new Date(c.created_at).toLocaleString('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) }}
                        </span>
                        
                        <div v-if="authStore.user?.id === c.user_id || authStore.user?.role === 'admin'" class="relative comment-menu-container">
                          <button @click.stop="toggleCommentMenu(c.id)" 
                            class="w-7 h-7 flex items-center justify-center rounded-full hover:bg-muted/40 transition-colors text-muted-foreground hover:text-foreground">
                            <i class="fas fa-ellipsis-h text-xs"></i>
                          </button>
                          
                          <!-- Dropdown -->
                          <div v-if="activeMenuId === c.id" 
                            class="absolute  bottom-5 right-5 mt-1 w-32 bg-card border border-border rounded-lg shadow-xl  overflow-hidden py-1 z-250">
                            <button v-if="authStore.user?.id === c.user_id && canEditComment(c)" 
                              @click="startEditingComment(c)"
                              class="w-full px-3 py-2 text-left text-xs font-semibold hover:bg-muted/50 flex items-center gap-2 transition-colors">
                              <i class="fas fa-edit text-secondary"></i> Modifier
                            </button>
                            <button @click="deleteComment(c.id)"
                              class="w-full px-3 py-2 text-left text-xs font-semibold hover:bg-muted/50 text-destructive flex items-center gap-2 transition-colors">
                              <i class="fas fa-trash-alt"></i> Supprimer
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div v-if="editingCommentId === c.id" class="mt-2">
                      <textarea v-model="editingContent" rows="3"
                        class="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-secondary/30 text-foreground"></textarea>
                      <div class="flex gap-2 mt-2">
                        <button @click="updateComment" :disabled="isUpdatingComment || !editingContent.trim()"
                          class="px-4 py-1.5 bg-secondary text-secondary-foreground rounded-lg text-xs font-bold hover:bg-primary hover:text-primary-foreground transition-colors disabled:opacity-50">
                          <i v-if="isUpdatingComment" class="fas fa-circle-notch fa-spin mr-1"></i>
                          Enregistrer
                        </button>
                        <button @click="cancelEditingComment" class="px-4 py-1.5 border border-border text-muted-foreground rounded-lg text-xs hover:bg-muted/20 transition-colors">
                          Annuler
                        </button>
                      </div>
                    </div>
                    <p v-else class="text-sm text-foreground/70 leading-relaxed">{{ c.content }}</p>
                  </div>
                </div>
                <!-- Pagination -->
                <div v-if="commentPagination.last_page > 1" class="flex justify-center gap-1.5 pt-2">
                  <button v-for="p in commentPagination.last_page" :key="p" @click="fetchComments(p)"
                    :class="p === commentPagination.current_page ? 'bg-secondary text-secondary-foreground' : 'bg-muted/30 text-muted-foreground hover:bg-muted/60'"
                    class="w-8 h-8 rounded-lg text-xs font-bold transition-colors">{{ p }}</button>
                </div>
              </div>
            </div>
          </div>

          <!-- ════ SIDEBAR (1/3) ════════════════════════════════════════ -->
          <div class="hidden lg:block">
            <div class="sticky top-24 space-y-4">

              <!-- Card principale : prix + CTA + propriétaire + carte -->
              <div class="bg-card border border-border rounded-2xl overflow-hidden shadow-lg">

                <!-- Prix + infos financières -->
                <div class="p-5 border-b border-border">
                  <div class="flex items-baseline gap-2 mb-1">
                    <span class="text-3xl font-black text-secondary">{{ formatPrice(property.price) }}</span>
                    <span class="text-muted-foreground text-sm">FCFA / mois</span>
                  </div>
                  <div class="flex items-center gap-4 text-xs text-muted-foreground">
                    <span class="flex items-center gap-1">
                      <i class="fas fa-shield-alt text-secondary/60"></i>
                      Caution : <strong class="text-foreground ml-1">{{ formatPrice(property.price * 2) }}
                        FCFA</strong>
                    </span>
                    <span class="flex items-center gap-1">
                      <i class="fas fa-calendar text-secondary/60"></i>
                      Avance : <strong class="text-foreground ml-1">1 mois</strong>
                    </span>
                  </div>
                </div>

                <!-- CTA -->
                <div class="p-5 space-y-2.5 border-b border-border">
                  <!-- Procédure en cours -->
                  <div v-if="activeProcess"
                    class="p-3 bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 rounded-xl text-center">
                    <p
                      class="text-xs text-orange-600 dark:text-orange-400 font-bold uppercase tracking-wide mb-2 flex items-center justify-center gap-1">
                      <i class="fas fa-spinner animate-spin"></i> Procédure en cours
                    </p>
                    <p class="text-sm font-bold text-foreground mb-3">{{ activeProcess.label }}</p>
                    <RouterLink :to="`/mon-suivi?property_id=${property.id}`"
                      class="w-full py-2.5 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-all flex items-center justify-center gap-2 text-sm">
                      Suivre ma demande <i class="fas fa-arrow-right"></i>
                    </RouterLink>
                  </div>

                  <template v-else>
                    <RouterLink v-if="property.type === 'rent'"
                      :to="`/locataire/formulaire-location?property_id=${property.id}`"
                      class="w-full py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg group text-sm">
                      <i class="fas fa-key group-hover:scale-110 transition-transform"></i>
                      Louer ce bien
                    </RouterLink>
                    <RouterLink :to="`/programmer-visite?slug=${property.slug}&property_id=${property.id}`"
                      class="w-full py-3 bg-secondary text-secondary-foreground rounded-xl font-bold hover:bg-primary hover:text-primary-foreground transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md group text-sm">
                      <i class="fas fa-calendar-check group-hover:scale-110 transition-transform"></i>
                      Programmer une visite
                    </RouterLink>
                  </template>

                  <RouterLink :to="{ name: 'Assistance' }"
                    class="w-full py-2.5 border border-border text-muted-foreground rounded-xl font-semibold hover:bg-muted/20 transition-all flex items-center justify-center gap-2 text-sm">
                    <i class="fas fa-headset"></i> Assistance
                  </RouterLink>

                  <p class="text-center text-xs text-muted-foreground flex items-center justify-center gap-1.5">
                    <i class="fas fa-clock text-secondary/60"></i>
                    Réponse moyenne en <strong class="text-foreground">2h</strong>
                  </p>
                </div>

                <!-- Agent immobilier -->
                <div class="p-5 border-b border-border">
                  <p class="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Agent immobilier
                  </p>
                  <div class="flex items-center gap-3">
                    <UserAvatar v-if="property.agent" :user="property.agent" size="md" />
                    <div v-else
                      class="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center text-primary-foreground font-bold shrink-0">
                      <i class="fas fa-user-tie text-sm"></i>
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="font-bold text-foreground text-sm">{{ property.agent?.name ?? 'Agent HMC' }}</p>
                      <span class="inline-flex items-center gap-1 text-[11px] text-secondary font-semibold">
                        <i class="fas fa-id-badge text-[10px]"></i> Agent certifié HMC
                      </span>
                    </div>
                    <span class="text-xs text-muted-foreground shrink-0">~2h</span>
                  </div>
                </div>

                <!-- Carte Leaflet -->
                <div class="p-5">
                  <p
                    class="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <i class="fas fa-map-marker-alt text-secondary"></i> Localisation
                  </p>
                  <PropertyMap :city="property.city" :region="property.region" :address="property.location"
                    height="180px" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ══════ BIENS SIMILAIRES ══════════════════════════════════════ -->
        <div v-if="similarProperties.length" class="mt-10 pb-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-base font-bold text-foreground">
              Biens similaires à <span class="text-secondary">{{ property.city }}</span>
            </h2>
            <RouterLink :to="{ name: 'Annonces' }"
              class="text-secondary text-xs font-semibold hover:underline flex items-center gap-1">
              Voir tout <i class="fas fa-arrow-right text-[10px]"></i>
            </RouterLink>
          </div>

          <!-- Scroll horizontal sur mobile, grille sur sm+ -->
          <div class="similar-scroll">
            <div v-for="s in similarProperties" :key="s.id" class="similar-card">
              <PropertyFeedCard :item="s" />
            </div>
          </div>
        </div>
      </div>

      <!-- ─── LIGHTBOX ──────────────────────────────────────────────── -->
      <Transition name="fade">
        <div v-if="showLightbox"
          class="fixed inset-0 z-[999] bg-black flex items-center justify-center p-4 h-screen w-full"
          @click.self="showLightbox = false">
          <!-- Fermer -->
          <button @click="showLightbox = false"
            class="absolute top-4 right-4 w-10 h-10 bg-white/10 text-white rounded-full flex items-center justify-center hover:bg-white/20 transition-all z-10">
            <i class="fas fa-times"></i>
          </button>
          <!-- Compteur -->
          <div class="absolute top-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            {{ activeIndex + 1 }} / {{ galleryImages.length }}
          </div>
          <!-- Image -->
          <img :src="activeImage" class="max-h-[90vh] max-w-full object-cover rounded-lg select-none" />
          <!-- Nav -->
          <button v-if="galleryImages.length > 1" @click="prevImage"
            class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 text-white rounded-full flex items-center justify-center hover:bg-white/20 transition-all">
            <i class="fas fa-chevron-left"></i>
          </button>
          <button v-if="galleryImages.length > 1" @click="nextImage"
            class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 text-white rounded-full flex items-center justify-center hover:bg-white/20 transition-all">
            <i class="fas fa-chevron-right"></i>
          </button>
          <!-- Miniatures -->
          <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-full px-4">
            <button v-for="(img, i) in galleryImages" :key="i" @click="activeImage = img; activeIndex = i"
              class="shrink-0 w-14 h-10 rounded overflow-hidden border-2 transition-all"
              :class="activeImage === img ? 'border-secondary' : 'border-transparent opacity-50 hover:opacity-100'">
              <img :src="img" class="w-full h-full object-cover" />
            </button>
          </div>
        </div>
      </Transition>

    </div> 
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";
import { useRentalStore } from "../../stores/rental";
import { usePropertyStore } from "../../stores/properties";
import axios from "../../axios";
import UserAvatar from "@/common/UserAvatar.vue";
import PropertyMap from "@/common/PropertyMap.vue";
import PropertyFeedCard from "@/social/PropertyFeedCard.vue";

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
const showLightbox = ref(false);

const comments = ref([]);
const commentsLoading = ref(false);
const isSubmittingComment = ref(false);
const newComment = ref('');
const commentPagination = ref({ last_page: 1, current_page: 1 });

watch(showLightbox, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

// État du processus locatif
const activeProcess = computed(() => {
  if (!property.value || !authStore.user) return null;
  const process = rentalStore.processPhaseForProperty(property.value.id);
  if (!process) return null;
  if (process.status === "cancelled") return null;
  return process;
});

// Étapes locatives explicatives
const locatifSteps = [
  { title: 'Visite (10 000 FCFA)', desc: "Réservez une visite avec un agent HMC. Les frais garantissent votre sérieux." },
  { title: 'Dossier de candidature', desc: "Après la visite, soumettez vos documents. L'agent les étudie et valide ou rejette." },
  { title: 'Contrat & Paiement', desc: "Dossier validé ? Payez la caution et l'avance via NotchPay pour devenir locataire officiel." },
];

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

// ─── Commentaires — Nouveau système indépendant ──────────────────────
const fetchComments = async (page = 1) => {
  if (!property.value) return;
  commentsLoading.value = true;
  try {
    const { data } = await axios.get(`/api/properties/${property.value.slug}/comments`, { params: { page } });
    if (data.success) {
      comments.value = data.data.data;
      commentPagination.value = { last_page: data.data.last_page, current_page: data.data.current_page };
    }
  } catch (err) {
    console.error('Erreur chargement commentaires:', err);
  } finally {
    commentsLoading.value = false;
  }
};

const submitComment = async () => {
  if (!newComment.value.trim()) return;
  isSubmittingComment.value = true;
  try {
    const { data } = await axios.post(`/api/properties/${property.value.slug}/comments`, { content: newComment.value });
    if (data.success) {
      newComment.value = '';
      await fetchComments();
    }
  } catch (err) {
    console.error('Erreur publication commentaire:', err);
  } finally {
    isSubmittingComment.value = false;
  }
};

const deleteComment = async (id) => {
  if (!confirm('Supprimer ce commentaire ?')) return;
  try {
    await axios.delete(`/api/comments/${id}`);
    await fetchComments();
  } catch {
    alert('Erreur lors de la suppression du commentaire.');
  }
};

const editingCommentId = ref(null);
const editingContent = ref('');
const isUpdatingComment = ref(false);

const startEditingComment = (comment) => {
  editingCommentId.value = comment.id;
  editingContent.value = comment.content;
};

const cancelEditingComment = () => {
  editingCommentId.value = null;
  editingContent.value = '';
};

const updateComment = async () => {
  if (!editingCommentId.value || !editingContent.value.trim()) return;
  isUpdatingComment.value = true;
  try {
    const { data } = await axios.put(`/api/comments/${editingCommentId.value}`, {
      content: editingContent.value
    });
    if (data.success) {
      cancelEditingComment();
      await fetchComments();
    }
  } catch (err) {
    alert(err.response?.data?.message || 'Erreur lors de la modification.');
  } finally {
    isUpdatingComment.value = false;
  }
};

const canEditComment = (comment) => {
  const created = new Date(comment.created_at);
  const now = new Date();
  const diffInHours = (now - created) / (1000 * 60 * 60);
  return diffInHours < 24;
};

const activeMenuId = ref(null);
const toggleCommentMenu = (id) => {
  activeMenuId.value = activeMenuId.value === id ? null : id;
};

const handleClickOutside = (e) => {
  if (activeMenuId.value && !e.target.closest('.comment-menu-container')) {
    activeMenuId.value = null;
  }
};

onMounted(() => {
  window.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside);
});

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
    try { return JSON.parse(a); } catch { return []; }
  }
  return [];
});

const ownerInitials = computed(() => {
  const name = property.value?.owner?.name ?? "";
  return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
});

// ─── Icônes commodités ───────────────────────────────────────────────
const amenityIconMap = {
  Climatisation: "fa-snowflake", Parking: "fa-parking", "Sécurité 24/7": "fa-shield-alt",
  "Wi-Fi": "fa-wifi", "Eau courante": "fa-faucet", "Électricité permanente": "fa-bolt",
  Gardiennage: "fa-user-shield", "Groupe électrogène": "fa-car-battery",
  Balcon: "fa-tree", Jardin: "fa-seedling", "Cuisine équipée": "fa-utensils",
};
const amenityIcon = (name) => amenityIconMap[name] ?? "fa-check-circle";

// ─── Fetch ───────────────────────────────────────────────────────────
const fetchProperty = async (slug) => {
  isLoading.value = true;
  property.value = null;
  similarProperties.value = [];
  try {
    const payload = await propertyStore.fetchPropertyDetails(slug);
    if (!payload) return;
    const propData = payload.data;
    if (!propData) return;

    property.value = propData;
    similarProperties.value = payload.similar ?? [];

    const imgs = propData.all_images;
    activeImage.value = imgs?.length ? imgs[0] : (propData.image ?? "");
    activeIndex.value = 0;
    document.title = `${propData.title} | Home Cameroun`;

    fetchReviews();
    fetchMyReview();
    fetchComments();

    if (authStore.user) {
      await Promise.all([rentalStore.fetchVisits(), rentalStore.fetchApplications()]);
    }
  } catch (err) {
    if (err.message !== 'PROPERTY_NOT_FOUND') console.error("Erreur chargement annonce:", err);
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
  if (!authStore.user) { router.push({ name: "Connexion" }); return; }
  await propertyStore.toggleFavorite(target.id);
  if (!p) {
    const cached = propertyStore.propertyDetailsCache[target.slug];
    target.is_favorite = cached?.data ? cached.data.is_favorite : !target.is_favorite;
  } else {
    target.is_favorite = !target.is_favorite;
  }
};

const shareProperty = async (p = null) => {
  const target = p || property.value;
  if (!target) return;
  await propertyStore.shareProperty(target.id);
  const url = p ? `${window.location.origin}/annonces/${p.slug || p.id}` : window.location.href;
  if (navigator.share) {
    try { await navigator.share({ title: target.title, url }); } catch { }
  } else {
    navigator.clipboard.writeText(url);
    alert("Lien copié dans le presse-papiers !");
  }
};

const formatPrice = (price) => new Intl.NumberFormat("fr-FR").format(price);

// ─── Raccourci clavier lightbox ──────────────────────────────────────
const handleKeydown = (e) => {
  if (!showLightbox.value) return;
  if (e.key === 'Escape') showLightbox.value = false;
  if (e.key === 'ArrowLeft') prevImage();
  if (e.key === 'ArrowRight') nextImage();
};

// ─── Mount & watch ───────────────────────────────────────────────────
onMounted(() => {
  fetchProperty(route.params.slug);
  window.addEventListener('keydown', handleKeydown);
});
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
  document.body.style.overflow = '';
});

watch(() => route.params.slug, (newId) => {
  if (newId) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetchProperty(newId);
  }
});
</script>

<style scoped>
.page-enter {
  animation: pageFadeIn 0.4s ease both;
}

@keyframes pageFadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Skeleton shimmer */
@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }

  100% {
    background-position: -200% 0;
  }
}

/* Biens similaires – scroll snap mobile, grille sm+ */
.similar-scroll {
  display: flex;
  gap: 0.75rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -ms-overflow-style: none;
  scrollbar-width: none;
  padding-bottom: 4px;
}

.similar-scroll::-webkit-scrollbar {
  display: none;
}

.similar-card {
  flex-shrink: 0;
  width: 72vw;
  max-width: 280px;
  scroll-snap-align: start;
}

/* Override my-2 from PropertyFeedCard inside similar section */
.similar-card :deep(article) {
  margin-top: 0;
  margin-bottom: 0;
}

@media (min-width: 640px) {
  .similar-scroll {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    overflow-x: visible;
    scroll-snap-type: none;
  }

  .similar-card {
    width: auto;
    max-width: none;
  }
}

@media (min-width: 1024px) {
  .similar-scroll {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>