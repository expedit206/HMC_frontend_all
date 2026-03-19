import re

with open(r'c:\laragon\www\home-cameroon\frontend\src\components\common\UnifiedSidebar.vue', 'r', encoding='utf-8') as f:
    content = f.read()

# Chunk 1
content = re.sub(
    r'<<<<<<< HEAD <p.*?=======.*?<p class="text-\[10px\] text-[^"]+ uppercase tracking-widest font-black truncate">.*?>>>>>>> [a-f0-9]+',
    '<p class="text-[10px] text-muted-foreground uppercase tracking-widest font-black truncate">',
    content, flags=re.DOTALL
)

# Chunk 2
c2_replace = '''<div class="role-switcher-container relative">
                <button v-if="expanded && allRoles.length > 1" @mouseover="showRoleSwitcher = true"
                  @click="showRoleSwitcher = !showRoleSwitcher"
                  class="w-7 h-7 rounded-lg bg-muted/20 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-muted/30 transition-colors shrink-0 outline-none">
                  <i class="fas fa-right-left text-xs transition-transform"
                    :class="{ '-rotate-90': showRoleSwitcher }"></i>
                </button>

                <!-- Menu déroulant des rôles -->
                <div v-if="showRoleSwitcher && expanded"
                  class="absolute top-12 left-2 right-2 md:-left-20 md:w-48 bg-card rounded-xl shadow-xl border border-border p-2 z-50 animate-fadeIn">'''

content = re.sub(
    r'<<<<<<< HEAD.*?bg-muted/20.*?>>>>>>> [a-f0-9]+',
    c2_replace,
    content, flags=re.DOTALL, count=1
)

# Chunk 3
c3_replace = ''':class="r === role ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-muted/20 hover:text-primary'">
            <i :class="[getRoleIcon(r), r === role ? 'text-primary-foreground' : 'text-muted-foreground w-4 text-center']"></i>'''

content = re.sub(
    r'<<<<<<< HEAD :class=.*?>>>>>>> [a-f0-9]+',
    c3_replace,
    content, flags=re.DOTALL
)

with open(r'c:\laragon\www\home-cameroon\frontend\src\components\common\UnifiedSidebar.vue', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed UnifiedSidebar.vue")
