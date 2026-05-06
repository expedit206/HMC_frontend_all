<template>
  <div class="bg-background min-h-screen py-8 lg:py-12 px-4 sm:px-6">
    <div class="max-w-4xl mx-auto">
      
      <!-- Header -->
      <div class="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <nav class="flex items-center gap-2 mb-4 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
            <router-link :to="{ name: 'MarketplaceIndex' }" class="hover:text-primary transition-colors">Marketplace</router-link>
            <i class="fas fa-chevron-right text-[8px] opacity-30"></i>
            <span class="text-foreground">Vendre un article</span>
          </nav>
          <h1 class="text-3xl lg:text-4xl font-black text-foreground leading-tight">
            Publier un <span class="text-primary italic">Produit</span>
          </h1>
          <p class="text-muted-foreground font-medium text-sm mt-2 max-w-lg">
            Remplissez les détails ci-dessous pour rendre votre article visible par des milliers d'acheteurs potentiels.
          </p>
        </div>
        
        <RouterLink 
          :to="{ name: 'MarketplaceIndex' }"
          class="group flex items-center gap-3 px-5 py-2.5 rounded-full bg-card border border-border hover:border-red-500/30 hover:bg-red-500/5 transition-all"
        >
          <span class="text-xs font-black uppercase tracking-widest text-muted-foreground group-hover:text-red-500">Annuler</span>
          <div class="w-8 h-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-all">
            <i class="fas fa-times text-xs"></i>
          </div>
        </RouterLink>
      </div>

      <!-- Step Indicator -->
      <div class="mb-12">
        <div class="flex items-center justify-between mb-4 px-2">
          <div v-for="step in steps" :key="step.number" 
               class="flex flex-col items-center flex-1 relative">
            <!-- Line -->
            <div v-if="step.number < steps.length" 
                 class="absolute top-5 left-1/2 w-full h-[2px] bg-border -z-0">
                 <div class="h-full bg-primary transition-all duration-500" 
                      :style="{ width: currentStep > step.number ? '100%' : '0%' }"></div>
            </div>
            
            <div 
              class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm relative z-10 transition-all duration-500 border-2"
              :class="currentStep >= step.number 
                ? 'bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/20' 
                : 'bg-card border-border text-muted-foreground'"
            >
              <i v-if="currentStep > step.number" class="fas fa-check"></i>
              <span v-else>{{ step.number }}</span>
            </div>
            <span class="mt-3 text-[9px] font-black uppercase tracking-widest transition-colors duration-500"
                  :class="currentStep >= step.number ? 'text-foreground' : 'text-muted-foreground'">
              {{ step.title }}
            </span>
          </div>
        </div>
      </div>

      <!-- Form Content -->
      <form @submit.prevent="submitForm" class="space-y-8">
        
        <!-- STEP 1: INFORMATIONS DE BASE -->
        <div v-if="currentStep === 1" class="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div class="bg-card rounded-3xl p-6 lg:p-10 border border-border shadow-2xl shadow-black/5">
            <div class="flex items-center gap-4 mb-8">
              <div class="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-inner">
                <i class="fas fa-tag text-lg"></i>
              </div>
              <div>
                <h3 class="text-lg font-black text-foreground uppercase tracking-tight">Informations de base</h3>
                <p class="text-xs text-muted-foreground font-medium">L'essentiel sur votre produit</p>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="md:col-span-2">
                <label class="flex items-center justify-between mb-2">
                  <span class="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Nom du produit *</span>
                  <span class="text-[9px] text-primary font-bold uppercase tracking-widest italic">{{ 60 - form.name.length }} caractères restants</span>
                </label>
                <input 
                  v-model="form.name" 
                  type="text" 
                  required 
                  maxlength="60"
                  placeholder="Ex: iPhone 13 Pro Max - 256GB - Bleu Alpin"
                  class="w-full px-6 py-4 bg-muted/30 border border-border/50 rounded-2xl text-sm font-bold focus:bg-card focus:border-primary/40 focus:ring-4 focus:ring-primary/5 outline-none transition-all placeholder:text-muted-foreground/40"
                />
              </div>

              <div>
                <label class="block text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2 ml-1">Catégorie *</label>
                <div class="relative group">
                  <select 
                    v-model="form.category" 
                    required
                    class="w-full px-6 py-4 bg-muted/30 border border-border/50 rounded-2xl text-sm font-bold focus:bg-card focus:border-primary/40 focus:ring-4 focus:ring-primary/5 outline-none transition-all appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Sélectionner une catégorie</option>
                    <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
                    <option value="Autre">Autre</option>
                  </select>
                  <i class="fas fa-chevron-down absolute right-6 top-1/2 -translate-y-1/2 text-muted-foreground/50 group-hover:text-primary transition-colors pointer-events-none"></i>
                </div>
              </div>

              <div>
                <label class="block text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2 ml-1">État du produit *</label>
                <div class="grid grid-cols-2 gap-2">
                  <button 
                    v-for="cond in ['Neuf', 'Excellent', 'Bon état', 'Occasion']" 
                    :key="cond"
                    type="button"
                    @click="form.condition = cond"
                    class="px-4 py-3 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all"
                    :class="form.condition === cond 
                      ? 'bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/20' 
                      : 'bg-muted/30 border-border/50 text-muted-foreground hover:border-primary/30 hover:text-foreground'"
                  >
                    {{ cond }}
                  </button>
                </div>
              </div>

              <div>
                <label class="block text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2 ml-1">Stock disponible *</label>
                <div class="flex items-center gap-4">
                  <div class="flex items-center bg-muted/30 border border-border/50 rounded-2xl overflow-hidden h-14">
                    <button @click="form.stock = Math.max(0, form.stock - 1)" type="button" class="w-14 h-full flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-colors">
                      <i class="fas fa-minus text-xs"></i>
                    </button>
                    <input 
                      v-model.number="form.stock" 
                      type="number" 
                      required
                      class="w-16 h-full text-center bg-transparent border-none text-sm font-black focus:ring-0"
                    />
                    <button @click="form.stock++" type="button" class="w-14 h-full flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-colors">
                      <i class="fas fa-plus text-xs"></i>
                    </button>
                  </div>
                  <span class="text-[10px] font-bold text-muted-foreground italic">Unités en vente</span>
                </div>
              </div>

              <div>
                <label class="block text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2 ml-1">Localisation (Ville) *</label>
                <div class="relative group">
                  <i class="fas fa-map-marker-alt absolute left-6 top-1/2 -translate-y-1/2 text-primary/40 group-focus-within:text-primary transition-colors pointer-events-none"></i>
                  <input 
                    v-model="form.location" 
                    type="text" 
                    required 
                    placeholder="Ex: Douala, Akwa"
                    class="w-full pl-12 pr-6 py-4 bg-muted/30 border border-border/50 rounded-2xl text-sm font-bold focus:bg-card focus:border-primary/40 focus:ring-4 focus:ring-primary/5 outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- STEP 2: PRIX & LOGISTIQUE -->
        <div v-if="currentStep === 2" class="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div class="bg-card rounded-3xl p-6 lg:p-10 border border-border shadow-2xl shadow-black/5">
            <div class="flex items-center gap-4 mb-8">
              <div class="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center shadow-inner">
                <i class="fas fa-coins text-lg"></i>
              </div>
              <div>
                <h3 class="text-lg font-black text-foreground uppercase tracking-tight">Prix & Logistique</h3>
                <p class="text-xs text-muted-foreground font-medium">Définissez vos tarifs et modes de livraison</p>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label class="block text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2 ml-1">Prix de vente (FCFA) *</label>
                <div class="relative group">
                  <span class="absolute left-6 top-1/2 -translate-y-1/2 text-sm font-black text-primary group-focus-within:scale-110 transition-transform">XAF</span>
                  <input 
                    v-model.number="form.price" 
                    type="number" 
                    required 
                    placeholder="0"
                    class="w-full pl-16 pr-6 py-4 bg-muted/30 border border-border/50 rounded-2xl text-lg font-black text-primary focus:bg-card focus:border-primary/40 focus:ring-4 focus:ring-primary/5 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label class="block text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2 ml-1">Ancien prix (Optionnel)</label>
                <div class="relative group opacity-80 hover:opacity-100 transition-opacity">
                  <span class="absolute left-6 top-1/2 -translate-y-1/2 text-sm font-bold text-muted-foreground/40">XAF</span>
                  <input 
                    v-model.number="form.old_price" 
                    type="number" 
                    placeholder="Ex: 120 000"
                    class="w-full pl-16 pr-6 py-4 bg-muted/30 border border-border/50 rounded-2xl text-sm font-bold text-muted-foreground focus:bg-card focus:border-primary/40 focus:ring-4 focus:ring-primary/5 outline-none transition-all line-through decoration-red-500/50"
                  />
                </div>
                <p class="text-[9px] text-muted-foreground/60 mt-2 font-medium italic">Sert à afficher une réduction sur votre produit.</p>
              </div>

              <div class="md:col-span-2 p-6 rounded-2xl bg-muted/20 border border-border/50">
                <div class="flex items-center justify-between mb-6">
                  <div>
                    <h4 class="text-sm font-black text-foreground uppercase tracking-tight">Options de livraison</h4>
                    <p class="text-[10px] text-muted-foreground font-medium">Proposez-vous la livraison à domicile ?</p>
                  </div>
                  <button 
                    type="button"
                    @click="form.delivery_available = !form.delivery_available"
                    class="w-14 h-7 rounded-full transition-all duration-300 relative px-1 border border-border"
                    :class="form.delivery_available ? 'bg-primary' : 'bg-muted'"
                  >
                    <div class="w-5 h-5 bg-white rounded-full transition-all duration-300 shadow-sm"
                         :style="{ transform: form.delivery_available ? 'translateX(28px)' : 'translateX(0)' }"></div>
                  </button>
                </div>

                <div v-if="form.delivery_available" class="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in zoom-in-95 duration-300">
                  <div>
                    <label class="block text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2 ml-1">Frais de livraison (FCFA)</label>
                    <input 
                      v-model.number="form.delivery_fee" 
                      type="number" 
                      placeholder="0 pour gratuit"
                      class="w-full px-6 py-4 bg-card border border-border/50 rounded-2xl text-sm font-bold focus:border-primary/40 focus:ring-4 focus:ring-primary/5 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- STEP 3: MÉDIAS & CONTACT -->
        <div v-if="currentStep === 3" class="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div class="bg-card rounded-3xl p-6 lg:p-10 border border-border shadow-2xl shadow-black/5">
            <div class="flex items-center gap-4 mb-8">
              <div class="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center shadow-inner">
                <i class="fas fa-camera text-lg"></i>
              </div>
              <div>
                <h3 class="text-lg font-black text-foreground uppercase tracking-tight">Médias & Contact</h3>
                <p class="text-xs text-muted-foreground font-medium">L'aspect visuel et comment vous joindre</p>
              </div>
            </div>

            <div class="space-y-8">
              <!-- Image Upload -->
              <div>
                <label class="block text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-4 ml-1">Photo du produit *</label>
                <div 
                  @click="$refs.fileInput.click()"
                  class="aspect-video lg:aspect-[21/9] rounded-3xl border-3 border-dashed border-border flex flex-col items-center justify-center cursor-pointer group hover:border-primary/40 hover:bg-primary/5 transition-all overflow-hidden relative"
                >
                  <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="handleFileChange" />
                  
                  <template v-if="!imagePreview">
                    <div class="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-card transition-all duration-500">
                      <i class="fas fa-image text-2xl text-muted-foreground/40 group-hover:text-primary transition-colors"></i>
                    </div>
                    <div class="text-center px-6">
                      <p class="text-sm font-black text-foreground uppercase tracking-tight">Ajouter une photo principale</p>
                      <p class="text-[10px] text-muted-foreground font-bold uppercase mt-1">PNG, JPG ou WEBP. Max 5Mo</p>
                    </div>
                  </template>

                  <template v-else>
                    <img :src="imagePreview" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                      <div class="w-12 h-12 rounded-full bg-white text-primary flex items-center justify-center shadow-xl">
                        <i class="fas fa-sync-alt"></i>
                      </div>
                      <div @click.stop="imagePreview = null; form.image = null" class="w-12 h-12 rounded-full bg-white text-red-500 flex items-center justify-center shadow-xl">
                        <i class="fas fa-trash-alt"></i>
                      </div>
                    </div>
                  </template>
                </div>
              </div>

              <!-- Description -->
              <div>
                <label class="flex items-center justify-between mb-2">
                  <span class="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Description détaillée *</span>
                  <span class="text-[10px] text-primary font-bold uppercase italic tracking-widest">{{ form.description.length }} caractères</span>
                </label>
                <textarea 
                  v-model="form.description" 
                  rows="6"
                  required
                  placeholder="Décrivez précisément votre produit (caractéristiques, état, raisons de la vente...)"
                  class="w-full px-6 py-4 bg-muted/30 border border-border/50 rounded-2xl text-sm font-medium focus:bg-card focus:border-primary/40 focus:ring-4 focus:ring-primary/5 outline-none transition-all placeholder:text-muted-foreground/40"
                ></textarea>
              </div>

              <!-- Contact -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2 ml-1">Téléphone (Optionnel)</label>
                  <div class="relative group">
                    <i class="fas fa-phone-alt absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground/40 pointer-events-none transition-colors group-focus-within:text-foreground"></i>
                    <input 
                      v-model="form.contact_phone" 
                      type="tel" 
                      placeholder="Ex: +237 6xx xxx xxx"
                      class="w-full pl-12 pr-6 py-4 bg-muted/30 border border-border/50 rounded-2xl text-sm font-bold focus:bg-card focus:border-primary/40 focus:ring-4 focus:ring-primary/5 outline-none transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label class="block text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2 ml-1">WhatsApp (Recommandé)</label>
                  <div class="relative group">
                    <i class="fab fa-whatsapp absolute left-6 top-1/2 -translate-y-1/2 text-green-500/40 pointer-events-none transition-colors group-focus-within:text-green-500"></i>
                    <input 
                      v-model="form.contact_whatsapp" 
                      type="tel" 
                      placeholder="Identique au téléphone ?"
                      class="w-full pl-12 pr-6 py-4 bg-muted/30 border border-border/50 rounded-2xl text-sm font-bold focus:bg-card focus:border-primary/40 focus:ring-4 focus:ring-primary/5 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- NAVIGATION -->
        <div class="flex flex-col sm:flex-row gap-4 pt-10">
          <button 
            v-if="currentStep > 1" 
            type="button" 
            @click="currentStep--"
            class="flex-1 px-8 py-5 rounded-2xl bg-card border border-border text-xs font-black uppercase tracking-[0.2em] hover:bg-muted transition-all active:scale-95"
          >
            <i class="fas fa-arrow-left mr-2"></i> Précédent
          </button>
          
          <button 
            v-if="currentStep < 3" 
            type="button" 
            @click="nextStep"
            class="flex-[2] px-8 py-5 rounded-2xl bg-[#1B0B38] text-white text-xs font-black uppercase tracking-[0.2em] hover:bg-primary hover:shadow-2xl hover:shadow-primary/20 transition-all hover:-translate-y-1 active:scale-95"
          >
            Suivant <i class="fas fa-arrow-right ml-2 opacity-50"></i>
          </button>
          
          <button 
            v-else 
            type="submit" 
            :disabled="isSubmitting"
            class="flex-[2] px-8 py-5 rounded-2xl bg-primary text-primary-foreground text-xs font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 hover:bg-primary/90 transition-all hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            <i v-if="isSubmitting" class="fas fa-circle-notch fa-spin"></i>
            <i v-else class="fas fa-rocket text-sm"></i>
            <span>{{ isSubmitting ? 'Publication en cours...' : 'Publier mon annonce' }}</span>
          </button>
        </div>

      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from '../axios';

const router = useRouter();

// UI State
const currentStep = ref(1);
const isSubmitting = ref(false);
const imagePreview = ref(null);
const categories = ref([]);

const steps = [
  { number: 1, title: 'Basiques' },
  { number: 2, title: 'Prix & Livraison' },
  { number: 3, title: 'Photos & Détails' }
];

// Form Data - Complet
const form = reactive({
  name: '',
  category: '',
  condition: 'Neuf',
  stock: 1,
  location: '',
  price: null,
  old_price: null,
  delivery_available: false,
  delivery_fee: null,
  description: '',
  image: null,
  contact_phone: '',
  contact_whatsapp: ''
});

const fetchCategories = async () => {
    try {
        const { data } = await axios.get('/api/marketplace/categories');
        if (data.success) {
            // Filtrer "Tout" si présent
            categories.value = data.data.filter(c => c.id !== 'all');
        }
    } catch (err) {
        console.error('Erreur chargement catégories:', err);
        // Fallback default categories
        categories.value = [
            { id: 'Électronique', name: 'Électronique' },
            { id: 'Mode & Beauté', name: 'Mode & Beauté' },
            { id: 'Maison', name: 'Maison' },
            { id: 'Automobile', name: 'Automobile' },
            { id: 'Informatique', name: 'Informatique' }
        ];
    }
};

const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  if (file.size > 5 * 1024 * 1024) {
    return alert('L\'image est trop lourde (Max 5Mo)');
  }

  form.image = file;
  
  const reader = new FileReader();
  reader.onload = (e) => {
    imagePreview.value = e.target.result;
  };
  reader.readAsDataURL(file);
};

const nextStep = () => {
  if (currentStep.value === 1) {
    if (!form.name || !form.category || !form.location) {
      return alert('Veuillez remplir tous les champs obligatoires.');
    }
  }
  if (currentStep.value === 2) {
    if (!form.price) {
      return alert('Le prix de vente est obligatoire.');
    }
  }
  currentStep.value++;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const submitForm = async () => {
  if (isSubmitting.value) return;
  
  if (!form.description || !form.image) {
    return alert('La description et une photo sont obligatoires pour publier une annonce.');
  }

  isSubmitting.value = true;
  
  try {
    const formData = new FormData();
    // Append all fields
    Object.keys(form).forEach(key => {
      if (form[key] !== null && form[key] !== undefined && form[key] !== '') {
          // Convert boolean to number for Laravel compatibility
          if (typeof form[key] === 'boolean') {
              formData.append(key, form[key] ? 1 : 0);
          } else {
              formData.append(key, form[key]);
          }
      }
    });

    const { data } = await axios.post('/api/marketplace/items', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    if (data.success) {
      alert('Félicitations ! Votre produit est maintenant en ligne.');
      router.push({ name: 'MarketplaceIndex' });
    }
  } catch (err) {
    console.error('Erreur publication produit:', err.response?.data);
    alert(err.response?.data?.message || 'Une erreur est survenue lors de la publication.');
  } finally {
    isSubmitting.value = false;
  }
};

onMounted(() => {
    fetchCategories();
});
</script>

<style scoped>
.animate-in {
  animation-fill-mode: both;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}

::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-thumb {
  background: hsl(var(--muted-foreground) / 0.2);
  border-radius: 10px;
}
</style>
