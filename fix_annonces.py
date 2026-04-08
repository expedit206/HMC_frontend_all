
with open('src/pages/public/Annonces.vue', encoding='utf-8') as f:
    content = f.read()

# 1. Make the TikTok container responsive: horizontal on mobile, vertical on desktop
old_class = 'absolute right-3 bottom-4 flex flex-col gap-3 items-center z-20'
new_class = 'absolute flex flex-row md:flex-col gap-2 md:gap-3 items-center z-20 bottom-2 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-3 md:bottom-4'
content = content.replace(old_class, new_class, 1)

# 2. Smaller buttons on mobile
for old_btn, new_btn in [
    ('w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white border border-white/20 group-hover/btn:bg-destructive/90 transition-all shadow-lg',
     'w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white border border-white/20 group-hover/btn:bg-destructive/90 transition-all shadow-lg'),
    ('w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white border border-white/20 group-hover/btn:bg-primary/90 transition-all shadow-lg',
     'w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white border border-white/20 group-hover/btn:bg-primary/90 transition-all shadow-lg'),
    ('w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white border border-white/20 group-hover/btn:bg-green-500/90 transition-all shadow-lg',
     'w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white border border-white/20 group-hover/btn:bg-green-500/90 transition-all shadow-lg'),
    ('w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white border border-white/20 hover:bg-white hover:text-black transition-all shadow-lg',
     'w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white border border-white/20 hover:bg-white hover:text-black transition-all shadow-lg'),
]:
    content = content.replace(old_btn, new_btn)

# 3. Dropdown opens upward on mobile (bottom-full), sideways on desktop
content = content.replace(
    'class="absolute right-12 bottom-0 w-48 bg-card border border-border shadow-2xl rounded-xl overflow-hidden py-1 z-40 animate-fadeIn"',
    'class="absolute bottom-full mb-1 right-0 md:right-12 md:bottom-0 md:mb-0 w-48 bg-card border border-border shadow-2xl rounded-xl overflow-hidden py-1 z-40"'
)

# 4. Hide counters labels on mobile
content = content.replace(
    '<span class="text-[10px] text-white font-bold drop-shadow-md mt-1">{{ isFavorite(property.id) ? property.favorites_count + 1 || 1 : property.favorites_count || 0 }}</span>',
    '<span class="hidden md:block text-[10px] text-white font-bold drop-shadow-md mt-1">{{ property.favorites_count || 0 }}</span>'
)
content = content.replace(
    '<span class="text-[10px] text-white font-bold drop-shadow-md mt-1">{{ property.review_count || 0 }}</span>',
    '<span class="hidden md:block text-[10px] text-white font-bold drop-shadow-md mt-1">{{ property.review_count || 0 }}</span>'
)
content = content.replace(
    '<span class="text-[10px] text-white font-bold drop-shadow-md mt-1">Partager</span>',
    '<span class="hidden md:block text-[10px] text-white font-bold drop-shadow-md mt-1">Partager</span>'
)

with open('src/pages/public/Annonces.vue', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done successfully!")
