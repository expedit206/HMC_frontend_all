
# Fix 1: Annonces.vue - Revert to always-vertical TikTok bar (works on mobile too)
with open('src/pages/public/Annonces.vue', encoding='utf-8') as f:
    content = f.read()

# Restore vertical layout (remove responsive flex-row)
old = 'absolute flex flex-row md:flex-col gap-2 md:gap-3 items-center z-20 bottom-2 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-3 md:bottom-4'
new = 'absolute right-3 bottom-4 flex flex-col gap-2 md:gap-3 items-center z-20'
content = content.replace(old, new)

# Show all labels on all screens (remove hidden md:block)
content = content.replace(
    '<span class="hidden md:block text-[10px] text-white font-bold drop-shadow-md mt-1">{{ property.favorites_count || 0 }}</span>',
    '<span class="text-[10px] text-white font-bold drop-shadow-md mt-1">{{ property.favorites_count || 0 }}</span>'
)
content = content.replace(
    '<span class="hidden md:block text-[10px] text-white font-bold drop-shadow-md mt-1">{{ property.review_count || 0 }}</span>',
    '<span class="text-[10px] text-white font-bold drop-shadow-md mt-1">{{ property.review_count || 0 }}</span>'
)
content = content.replace(
    '<span class="hidden md:block text-[10px] text-white font-bold drop-shadow-md mt-1">Partager</span>',
    '<span class="text-[10px] text-white font-bold drop-shadow-md mt-1">Partager</span>'
)

with open('src/pages/public/Annonces.vue', 'w', encoding='utf-8') as f:
    f.write(content)

print("Annonces.vue fixed - vertical bar restored")

# Fix 2: Accueil.vue - Add performance indicators (counters) on each action button
with open('src/pages/public/Accueil.vue', encoding='utf-8') as f:
    content2 = f.read()

# Replace Favoris button to add counter below
old_fav = '''                <!-- Favoris -->
                <button @click.prevent="toggleFavoriteAccueil(property.id)" class="flex flex-col items-center group/btn focus:outline-none">
                  <div class="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white border border-white/20 group-hover/btn:bg-destructive/80 transition-all shadow-md">
                    <i :class="[ favoritesAccueil.has(property.id) ? 'fas text-red-400' : 'far', 'fa-heart text-sm' ]"></i>
                  </div>
                </button>'''

new_fav = '''                <!-- Favoris -->
                <button @click.prevent="toggleFavoriteAccueil(property.id)" class="flex flex-col items-center group/btn focus:outline-none">
                  <div class="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white border border-white/20 group-hover/btn:bg-destructive/80 transition-all shadow-md">
                    <i :class="[ favoritesAccueil.has(property.id) ? 'fas text-red-400' : 'far', 'fa-heart text-sm' ]"></i>
                  </div>
                  <span class="text-[10px] text-white font-bold drop-shadow-md mt-0.5">{{ property.favorites_count || 0 }}</span>
                </button>'''

content2 = content2.replace(old_fav, new_fav)

# Replace Commenter/Avis button to add counter below
old_comment = '''                <!-- Commenter / Avis -->
                <RouterLink :to="`/annonces/${property.slug}#reviews`" class="flex flex-col items-center group/btn focus:outline-none">
                  <div class="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white border border-white/20 group-hover/btn:bg-primary/80 transition-all shadow-md">
                    <i class="fas fa-comment-dots text-sm"></i>
                  </div>
                </RouterLink>'''

new_comment = '''                <!-- Commenter / Avis -->
                <RouterLink :to="`/annonces/${property.slug}#reviews`" class="flex flex-col items-center group/btn focus:outline-none">
                  <div class="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white border border-white/20 group-hover/btn:bg-primary/80 transition-all shadow-md">
                    <i class="fas fa-comment-dots text-sm"></i>
                  </div>
                  <span class="text-[10px] text-white font-bold drop-shadow-md mt-0.5">{{ property.review_count || 0 }}</span>
                </RouterLink>'''

content2 = content2.replace(old_comment, new_comment)

# Replace Partager button to add "Partager" label below
old_share = '''                <!-- Partager -->
                <button @click.prevent="shareItem(property, 'property')" class="flex flex-col items-center group/btn focus:outline-none">
                  <div class="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white border border-white/20 group-hover/btn:bg-green-500/80 transition-all shadow-md">
                    <i class="fas fa-share text-sm"></i>
                  </div>
                </button>'''

new_share = '''                <!-- Partager -->
                <button @click.prevent="shareItem(property, 'property')" class="flex flex-col items-center group/btn focus:outline-none">
                  <div class="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white border border-white/20 group-hover/btn:bg-green-500/80 transition-all shadow-md">
                    <i class="fas fa-share text-sm"></i>
                  </div>
                  <span class="text-[10px] text-white font-bold drop-shadow-md mt-0.5">Partager</span>
                </button>'''

content2 = content2.replace(old_share, new_share)

with open('src/pages/public/Accueil.vue', 'w', encoding='utf-8') as f:
    f.write(content2)

print("Accueil.vue fixed - counters added to action buttons")
