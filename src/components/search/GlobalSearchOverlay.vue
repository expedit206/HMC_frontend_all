<template>
  <transition name="fade">
    <div v-if="isOpen" class="fixed inset-0 z-[100] bg-background/80 backdrop-blur-xl flex flex-col pt-2 px-4">
      <!-- Search Container -->
      <div class="max-w-5xl w-full mx-auto animate-in slide-in-from-top-4 duration-300">
        <div class="bg-card border border-border shadow-2xl rounded-sm overflow-hidden relative">
          <!-- Header / Input -->
          <div class="p-4 border-b border-border flex items-center gap-4">
            <i class="fas fa-search text-muted-foreground ml-2"></i>
            <input 
              ref="searchInput"
              v-model="query" 
              type="text" 
              :placeholder="placeholderText"
              class="flex-1 bg-transparent border-none outline-none text-lg placeholder:text-muted-foreground/60 w-full"
              @keydown.esc="close"
              @keydown.enter="handleQuerySubmit(query)"
            />
            <button @click="close" class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors">
              <i class="fas fa-times text-muted-foreground"></i>
            </button>
          </div>

          <!-- Content Area -->
          <div class="max-h-[70vh] overflow-y-auto p-2 custom-scrollbar">
            <!-- Empty state / History -->
            <div v-if="!query && history.length > 0" class="p-2">
              <div class="flex items-center justify-between px-3 py-2 mb-1">
                <span class="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Recherches récentes</span>
                <button @click="clearHistory" class="text-[10px] font-bold text-primary hover:underline">Effacer tout</button>
              </div>
              <div class="flex flex-wrap gap-2 px-2 pb-4">
                <button 
                  v-for="h in history" :key="h" 
                  @click="handleQuerySubmit(h)"
                  class="flex items-center gap-2 px-3 py-1.5 bg-muted/50 hover:bg-primary/10 hover:text-primary rounded-full text-sm transition-colors border border-border"
                >
                  <i class="fas fa-history text-[10px] opacity-60"></i>
                  {{ h }}
                </button>
              </div>
            </div>

            <!-- Suggestions / Results -->
            <div v-if="loading" class="p-8 text-center">
              <i class="fas fa-circle-notch fa-spin text-primary text-2xl"></i>
            </div>

            <div v-else-if="query">
              <!-- No Results -->
              <div v-if="!hasSuggestions" class="p-12 text-center text-muted-foreground">
                <i class="fas fa-search-minus text-4xl mb-4 block opacity-20"></i>
                <p>Aucune suggestion trouvée pour "{{ query }}"</p>
                <button @click="handleQuerySubmit(query)" class="mt-4 text-primary font-bold hover:underline">
                  Lancer une recherche globale
                </button>
              </div>

              <!-- Categorized Suggestions -->
              <div v-else class="space-y-4 p-2">
                <!-- Properties -->
                <div v-if="suggestions.properties.length > 0">
                  <div class="px-3 py-1.5 text-[10px] font-black uppercase text-muted-foreground tracking-widest">Immobilier</div>
                  <div class="space-y-1">
                    <button 
                      v-for="p in suggestions.properties" :key="p.id"
                      @click="navigateToDetail('property', p)"
                      class="w-full text-left p-3 rounded-xl hover:bg-muted transition-colors flex items-center gap-4 group"
                    >
                      <div class="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center text-primary shrink-0">
                        <i class="fas fa-building"></i>
                      </div>
                      <div class="flex-1 min-w-0">
                        <div class="font-bold text-sm truncate group-hover:text-primary transition-colors">{{ p.title }}</div>
                        <div class="text-[10px] text-muted-foreground">{{ p.city }} • {{ formatPrice(p.price) }}</div>
                      </div>
                    </button>
                  </div>
                </div>

                <!-- Products -->
                <div v-if="suggestions.products.length > 0">
                  <div class="px-3 py-1.5 text-[10px] font-black uppercase text-muted-foreground tracking-widest">Boutique</div>
                   <div class="space-y-1">
                    <button 
                      v-for="p in suggestions.products" :key="p.id"
                      @click="navigateToDetail('product', p)"
                      class="w-full text-left p-3 rounded-xl hover:bg-muted transition-colors flex items-center gap-4 group"
                    >
                      <div class="w-12 h-12 rounded-lg bg-secondary/5 flex items-center justify-center text-secondary shrink-0">
                        <i class="fas fa-tag"></i>
                      </div>
                      <div class="flex-1 min-w-0">
                        <div class="font-bold text-sm truncate group-hover:text-secondary transition-colors">{{ p.name }}</div>
                        <div class="text-[10px] text-muted-foreground">{{ p.category }} • {{ formatPrice(p.price) }}</div>
                      </div>
                    </button>
                  </div>
                </div>

                <!-- Providers -->
                <div v-if="suggestions.providers.length > 0">
                  <div class="px-3 py-1.5 text-[10px] font-black uppercase text-muted-foreground tracking-widest">Prestataires</div>
                   <div class="space-y-1">
                    <button 
                      v-for="p in suggestions.providers" :key="p.id"
                      @click="navigateToDetail('provider', p)"
                      class="w-full text-left p-3 rounded-xl hover:bg-muted transition-colors flex items-center gap-4 group"
                    >
                      <div class="w-12 h-12 rounded-full border border-border overflow-hidden shrink-0">
                        <img v-if="p.avatar" :src="p.avatar" class="w-full h-full object-cover">
                        <div v-else class="w-full h-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                          {{ p.name.charAt(0) }}
                        </div>
                      </div>
                      <div class="flex-1 min-w-0">
                        <div class="font-bold text-sm truncate group-hover:text-primary transition-colors">{{ p.name }}</div>
                        <div class="text-[10px] text-muted-foreground">Professionnel vérifié</div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

       
        </div>
      </div>

      <!-- Click to close -->
      <div class="flex-1 cursor-pointer" @click="close"></div>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch, onMounted, computed, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from '../../axios'

const props = defineProps({
  isOpen: Boolean
})

const emit = defineEmits(['close'])

const router = useRouter()
const route = useRoute()
const searchInput = ref(null)

const query = ref('')
const loading = ref(false)
const history = ref([])
const suggestions = ref({
  properties: [],
  products: [],
  services: [],
  providers: []
})

const hasSuggestions = computed(() => {
  return suggestions.value.properties.length > 0 || 
         suggestions.value.products.length > 0 || 
         suggestions.value.services.length > 0 || 
         suggestions.value.providers.length > 0
})

const placeholderText = computed(() => {
  const path = route.path
  if (path.includes('annonces')) return "Rechercher une ville, un quartier ou une annonce..."
  if (path.includes('marketplace')) return "Qu'achetez-vous aujourd'hui ?"
  if (path.includes('services')) return "Trouvez un technicien ou un service..."
  return "Rechercher partout sur Home Cameroon..."
})

// Focus fix
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    query.value = ''
    loadHistory()
    nextTick(() => {
      searchInput.value?.focus()
    })
  }
})

// Native Debounce Function
function debounce(fn, delay) {
  let timeoutId
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}

// Debounced Search
const fetchSuggestions = debounce(async (val) => {
  if (val.length < 2) {
    suggestions.value = { properties: [], products: [], services: [], providers: [] }
    return
  }
  loading.value = true
  try {
    const { data } = await axios.get(`/api/search/suggest?q=${val}`)
    if (data.success) {
      suggestions.value = data.data
    }
  } catch (err) {
    console.error('Search error:', err)
  } finally {
    loading.value = false
  }
}, 300)

watch(query, (newVal) => {
  fetchSuggestions(newVal)
})

const handleQuerySubmit = (q) => {
  if (!q.trim()) return
  addToHistory(q.trim())
  
  // Intelligence: Redirect based on context or query
  const path = route.path
  let targetPath = '/annonces'
  
  if (path.includes('marketplace')) targetPath = '/marketplace'
  else if (path.includes('services')) targetPath = '/services/prestataires'
  
  router.push({ path: targetPath, query: { search: q.trim() } })
  close()
}

const navigateToDetail = (type, item) => {
  addToHistory(query.value || item.title || item.name)
  let url = ''
  switch(type) {
    case 'property': url = `/annonces/${item.slug}`; break;
    case 'product': url = `/marketplace`; break; // Should go to detail if existed
    case 'provider': url = `/services/prestataires`; break;
  }
  if (url) router.push(url)
  close()
}

const close = () => {
  emit('close')
}

// History logic
const loadHistory = () => {
  const h = localStorage.getItem('hmc_search_history')
  history.value = h ? JSON.parse(h) : []
}

const addToHistory = (q) => {
  if (!q) return
  let h = [...history.value]
  h = [q, ...h.filter(i => i !== q)].slice(0, 8)
  history.value = h
  localStorage.setItem('hmc_search_history', JSON.stringify(h))
}

const clearHistory = () => {
  history.value = []
  localStorage.removeItem('hmc_search_history')
}

const formatPrice = (price) => {
  if (!price) return ''
  return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA'
}

onMounted(() => {
  loadHistory()
  window.addEventListener('keydown', (e) => {
    if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      if (!props.isOpen) emit('open') // Optional global shortcut
    }
  })
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: hsl(var(--border)); border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: hsl(var(--muted-foreground)/0.3); }
</style>
