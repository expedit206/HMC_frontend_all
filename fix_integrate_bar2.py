
import re

# ============================================================
# ACCUEIL.VUE - Replace action bar with PropertyActionBar component
# ============================================================
with open('src/pages/public/Accueil.vue', encoding='utf-8') as f:
    accueil = f.read()

# Add import if not present
if "PropertyActionBar" not in accueil:
    accueil = accueil.replace(
        'import SkeletonLoader from "../../components/SkeletonLoader.vue";',
        'import SkeletonLoader from "../../components/SkeletonLoader.vue";\nimport PropertyActionBar from "../../components/PropertyActionBar.vue";'
    )

# Find the action bar block between the badge and the closing </div></div>
# We look for the comment line and replace until the closing </div> of the image div
bar_pattern = re.compile(
    r"([ \t]+<!-- Barre d'actions style TikTok horizontale -->.*?</div>\n[ \t]+</div>)",
    re.DOTALL
)

new_bar = """              <!-- Barre d'actions TikTok via composant réutilisable -->
              <PropertyActionBar
                :property="property"
                :is-fav="favoritesAccueil.has(property.id)"
                btn-size="sm"
                position="absolute right-2 bottom-2"
                @toggle-favorite="toggleFavoriteAccueil"
                @share="(p) => shareItem(p, 'property')"
              />
            </div>"""

m = bar_pattern.search(accueil)
if m:
    accueil = accueil[:m.start(1)] + new_bar + accueil[m.end(1):]
    print("Accueil.vue: action bar replaced successfully")
else:
    print("WARNING: Accueil.vue pattern not found, searching manually...")
    # Try to find by line numbers
    lines = accueil.split('\n')
    start = None
    end = None
    for i, line in enumerate(lines):
        if "Barre d'actions style TikTok horizontale" in line:
            start = i
        if start and i > start and line.strip() == '</div>' and not end:
            # Count closing divs
            depth = 0
            for j in range(start, i+1):
                depth += lines[j].count('<div') - lines[j].count('</div')
            if depth <= 0:
                end = i
                break
    if start and end:
        print(f"Found at lines {start}-{end}")
        lines[start:end+1] = new_bar.split('\n')
        accueil = '\n'.join(lines)
        print("Accueil.vue: replaced via line search")
    else:
        print("ERROR: could not find block in Accueil.vue")

with open('src/pages/public/Accueil.vue', 'w', encoding='utf-8') as f:
    f.write(accueil)

# ============================================================
# ANNONCES.VUE - Replace action bar with PropertyActionBar component
# ============================================================
with open('src/pages/public/Annonces.vue', encoding='utf-8') as f:
    annonces = f.read()

# Add import if not present
if "PropertyActionBar" not in annonces:
    annonces = annonces.replace(
        'import { usePropertyStore }',
        'import PropertyActionBar from "../../components/PropertyActionBar.vue";\nimport { usePropertyStore }'
    )

# Find and replace the TikTok bar section in Annonces.vue
# It starts with "<!-- Menu Vertical Style TikTok -->" and ends with closing </div> of the image section
bar_pattern2 = re.compile(
    r"([ \t]+<!-- Menu Vertical Style TikTok -->.*?</div>\n[ \t]+</div>)\n",
    re.DOTALL
)

new_bar2 = """                    <!-- Barre d'actions TikTok via composant réutilisable -->
                    <PropertyActionBar
                      :property="property"
                      :is-fav="isFavorite(property.id)"
                      btn-size="md"
                      position="absolute right-3 bottom-4"
                      @toggle-favorite="toggleFavorite"
                      @share="shareProperty"
                    />
                  </div>\n"""

m2 = bar_pattern2.search(annonces)
if m2:
    annonces = annonces[:m2.start()] + new_bar2 + annonces[m2.end():]
    print("Annonces.vue: action bar replaced successfully")
else:
    print("WARNING: Annonces.vue pattern not found")
    # fallback: replace lines 436-486 range
    lines = annonces.split('\n')
    start = None
    img_close = None
    for i, line in enumerate(lines):
        if "Menu Vertical Style TikTok" in line:
            start = i
        # After start, find the end of the image section (2 closing divs at lower indent)
        if start and i > start + 40:
            stripped = line.strip()
            if stripped == '</div>':
                img_close = i
                # Check if next non-empty line is content section
                for j in range(i+1, min(i+5, len(lines))):
                    if '<!-- Content Section -->' in lines[j]:
                        break
                else:
                    img_close = None
                if img_close:
                    break
    if start and img_close:
        print(f"Found Annonces bar at lines {start}-{img_close}")
        replacement_lines = new_bar2.split('\n')
        lines[start:img_close+1] = replacement_lines
        annonces = '\n'.join(lines)
        print("Annonces.vue: replaced via line search")
    else:
        print("ERROR: could not replace Annonces.vue bar")

# Clean up now-unused functions from Annonces.vue (togglePropertyMenu, hideProperty, reportProperty, activeMenu)
# We keep shareProperty and toggleFavorite (still used elsewhere or by component)

with open('src/pages/public/Annonces.vue', 'w', encoding='utf-8') as f:
    f.write(annonces)

print("\nAll done!")
