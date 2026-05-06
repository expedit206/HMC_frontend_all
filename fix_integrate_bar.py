
# Integrate PropertyActionBar component into Accueil.vue and Annonces.vue

# ============================================================
# ACCUEIL.VUE
# ============================================================
with open('src/pages/public/Accueil.vue', encoding='utf-8') as f:
    accueil = f.read()

# 1. Add import at the top of <script setup>
if "PropertyActionBar" not in accueil:
    accueil = accueil.replace(
        'import SkeletonLoader from "@/SkeletonLoader.vue";',
        'import SkeletonLoader from "@/SkeletonLoader.vue";\nimport PropertyActionBar from "@/PropertyActionBar.vue";'
    )

# 2. Replace the entire action bar in the image section with the component
old_bar_accueil = '''              <!-- Barre d'actions style TikTok horizontale -->
              <div class="absolute bottom-2 right-2 flex flex-col items-center gap-3 z-20">
                
                <!-- Favoris -->
                <button @click.prevent="toggleFavoriteAccueil(property.id)" class="flex flex-col items-center group/btn focus:outline-none">
                  <div class=" rounded-full  flex items-center justify-center text-white  transition-all shadow-md">
                    <i :class="[ favoritesAccueil.has(property.id) ? 'fas text-red-400' : 'far', 'fa-heart text-sm' ]"></i>
                  </div>
                  <span class="text-[10px] text-white font-bold drop-shadow-md mt-0.5">{{ property.favorites_count || 0 }}</span>
                </button>

                <!-- Commenter / Avis -->
                <RouterLink :to="`/annonces/${property.slug}#reviews`" class="flex flex-col items-center group/btn focus:outline-none">
                  <div class=" rounded-full  flex items-center justify-center text-white  transition-all shadow-md">
                    <i class="fas fa-comment-dots text-sm"></i>
                  </div>
                  <span class="text-[10px] text-white font-bold drop-shadow-md mt-0.5">{{ property.review_count || 0 }}</span>
                </RouterLink>

                <!-- Partager -->
                <button @click.prevent="shareItem(property, 'property')" class="flex flex-col items-center group/btn focus:outline-none">
                  <div class=" rounded-full  flex items-center justify-center text-white  transition-all shadow-md">
                    <i class="fas fa-share text-sm"></i>
                  </div>
                  <span class="text-[10px] text-white font-bold drop-shadow-md mt-0.5">Partager</span>
                </button>

                <!-- 3 dots -->
                <div class="relative">
                  <button @click.prevent="toggleMenu('prop_' + property.id)" 
                    class=" rounded-full  flex items-center justify-center text-white  transition-all shadow-md">
                    <i class="fas fa-ellipsis-v text-sm"></i>
                  </button>
                  
                  <div v-if="activeMenu === 'prop_' + property.id" @click.prevent.stop="activeMenu = null" class="fixed inset-0 z-30"></div>
                  
                  <div v-if="activeMenu === 'prop_' + property.id" 
                    class="absolute right-0 bottom-full mb-1 w-48 bg-card border border-border shadow-2xl rounded-xl overflow-hidden py-1 z-40">
                    <RouterLink :to="{ path: '/annonces', query: { type: property.type, city: property.city, rooms: property.rooms, max_price: Math.floor(property.price * 1.5), min_area: Math.max(0, (property.area || 0) - 10) } }" class="w-full text-left px-4 py-2.5 hover:bg-muted text-sm text-foreground flex items-center gap-3 transition-colors">
                      <i class="fas fa-clone text-muted-foreground w-4"></i> Biens similaires
                    </RouterLink>
                    <button @click.prevent="hideItem(property.id)" class="w-full text-left px-4 py-2.5 hover:bg-muted text-sm text-foreground flex items-center gap-3 transition-colors">
                      <i class="fas fa-eye-slash text-muted-foreground w-4"></i> Masquer
                    </button>
                    <div class="h-px bg-border my-1"></div>
                    <button @click.prevent="reportItem(property.id)" class="w-full text-left px-4 py-2.5 hover:bg-red-50 dark:hover:bg-red-900/20 text-sm text-destructive flex items-center gap-3 transition-colors">
                      <i class="fas fa-flag w-4"></i> Signaler
                    </button>
                  </div>
                </div>
              </div>'''

new_bar_accueil = '''              <!-- Barre d'actions TikTok via composant réutilisable -->
              <PropertyActionBar
                :property="property"
                :is-fav="favoritesAccueil.has(property.id)"
                btn-size="sm"
                position="absolute right-2 bottom-2"
                @toggle-favorite="toggleFavoriteAccueil"
                @share="(p) => shareItem(p, 'property')"
              />'''

if old_bar_accueil in accueil:
    accueil = accueil.replace(old_bar_accueil, new_bar_accueil)
    print("Accueil.vue action bar replaced")
else:
    print("WARNING: could not find old action bar in Accueil.vue - manual fix needed")

# Clean up unused toggleMenu / activeMenu / hideItem / reportItem from Accueil if they exist
# (Keep favoritesAccueil, toggleFavoriteAccueil, shareItem)

with open('src/pages/public/Accueil.vue', 'w', encoding='utf-8') as f:
    f.write(accueil)

# ============================================================
# ANNONCES.VUE
# ============================================================
with open('src/pages/public/Annonces.vue', encoding='utf-8') as f:
    annonces = f.read()

# 1. Add import
if "PropertyActionBar" not in annonces:
    annonces = annonces.replace(
        'import { usePropertyStore }',
        'import PropertyActionBar from "@/PropertyActionBar.vue";\nimport { usePropertyStore }'
    )

# 2. Replace the TikTok action bar section
old_bar_annonces = '''                    <!-- Barre d'actions TikTok : horizontale sur mobile, verticale sur desktop -->
                    <!-- Mobile: en bas de l'image, Desktop: à droite -->
                    <div class="absolute flex flex-row md:flex-col gap-2 md:gap-3 items-center z-20
                                bottom-2 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:right-3 md:bottom-4">'''

# try the actual current content from earlier vertical restore
old_bar_annonces_v2 = '                    <!-- Barre d\'actions TikTok : horizontale sur mobile, verticale sur desktop -->'

# Find what's actually there
import re
match = re.search(r'<!-- (Menu Vertical Style TikTok|Barre d\'actions TikTok)[^\n]*\n\s+<div class="absolute [^"]*">', annonces)
if match:
    print("Found bar comment at:", match.start())

# Use a broader search: find the entire block from comment to the closing </div></div>
# The block starts with the TikTok comment and ends after the menu 3dots closes
bar_pattern = re.compile(
    r'(\s+<!-- (?:Menu Vertical Style TikTok|Barre d\'actions TikTok[^\n]*)-->.*?</div>\s*\n\s+</div>\s*\n\s+</div>)',
    re.DOTALL
)

replacement_annonces = '''
                    <!-- Barre d'actions TikTok via composant réutilisable -->
                    <PropertyActionBar
                      :property="property"
                      :is-fav="isFavorite(property.id)"
                      btn-size="md"
                      position="absolute right-3 bottom-4"
                      @toggle-favorite="toggleFavorite"
                      @share="shareProperty"
                    />
                  </div>'''

m = bar_pattern.search(annonces)
if m:
    annonces = annonces[:m.start()] + replacement_annonces + annonces[m.end():]
    print("Annonces.vue bar replaced via regex")
else:
    print("WARNING: could not find TikTok bar block in Annonces.vue via regex")

with open('src/pages/public/Annonces.vue', 'w', encoding='utf-8') as f:
    f.write(annonces)

print("Done!")
