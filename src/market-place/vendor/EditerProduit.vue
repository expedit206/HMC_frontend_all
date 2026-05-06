<template>
    <div class="bg-background min-h-screen py-8 lg:py-12 px-4 sm:px-6">
        <div class="max-w-4xl mx-auto">

            <!-- Header -->
            <div class="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <nav
                        class="flex items-center gap-2 mb-4 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
                        <router-link :to="{ name: 'VendeurProduits' }" class="hover:text-primary transition-colors">Mes
                            Produits</router-link>
                        <i class="fas fa-chevron-right text-[8px] opacity-30"></i>
                        <span class="text-foreground">Édition</span>
                    </nav>
                    <h1 class="text-3xl lg:text-4xl font-black text-foreground leading-tight">
                        Modifier l'<span class="text-primary italic">Article</span>
                    </h1>
                    <p class="text-muted-foreground font-medium text-sm mt-2 max-w-lg">
                        Mettez à jour les informations de votre annonce. Les changements seront visibles immédiatement.
                    </p>
                </div>

                <RouterLink :to="{ name: 'VendeurProduits' }"
                    class="group flex items-center gap-3 px-5 py-2.5 rounded-full bg-card border border-border hover:border-red-500/30 hover:bg-red-500/5 transition-all">
                    <span
                        class="text-xs font-black uppercase tracking-widest text-muted-foreground group-hover:text-red-500">Annuler</span>
                    <div
                        class="w-8 h-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-all">
                        <i class="fas fa-times text-xs"></i>
                    </div>
                </RouterLink>
            </div>

            <!-- Loading State -->
            <div v-if="isLoadingData" class="py-20 flex flex-col items-center justify-center">
                <div class="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
                <p class="text-xs font-black uppercase tracking-widest text-muted-foreground">Chargement des données...
                </p>
            </div>

            <!-- Form Content -->
            <form v-else @submit.prevent="submitForm" class="space-y-8">

                <!-- SECTION 1: INFORMATIONS DE BASE -->
                <div
                    class="bg-card rounded-3xl p-6 lg:p-10 border border-border shadow-2xl shadow-black/5 animate-in fade-in duration-500">
                    <div class="flex items-center gap-4 mb-8">
                        <div
                            class="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-inner">
                            <i class="fas fa-tag text-lg"></i>
                        </div>
                        <div>
                            <h3 class="text-lg font-black text-foreground uppercase tracking-tight">Informations de base
                            </h3>
                            <p class="text-xs text-muted-foreground font-medium">Nom, catégorie et état</p>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div class="md:col-span-2">
                            <label
                                class="block text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2 ml-1">Nom
                                du produit *</label>
                            <input v-model="form.name" type="text" required maxlength="60"
                                class="w-full px-6 py-4 bg-muted/30 border border-border/50 rounded-2xl text-sm font-bold focus:bg-card focus:border-primary/40 focus:ring-4 focus:ring-primary/5 outline-none transition-all" />
                        </div>

                        <div>
                            <label
                                class="block text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2 ml-1">Catégorie
                                *</label>
                            <select v-model="form.category" required
                                class="w-full px-6 py-4 bg-muted/30 border border-border/50 rounded-2xl text-sm font-bold focus:bg-card focus:border-primary/40 focus:ring-4 focus:ring-primary/5 outline-none transition-all appearance-none cursor-pointer">
                                <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
                            </select>
                        </div>

                        <div>
                            <label
                                class="block text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2 ml-1">État
                                *</label>
                            <div class="grid grid-cols-2 gap-2">
                                <button v-for="cond in ['Neuf', 'Excellent', 'Bon état', 'Occasion']" :key="cond"
                                    type="button" @click="form.condition = cond"
                                    class="px-4 py-3 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all"
                                    :class="form.condition === cond ? 'bg-primary border-primary text-primary-foreground' : 'bg-muted/30 border-border/50 text-muted-foreground'">
                                    {{ cond }}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label
                                class="block text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2 ml-1">Stock
                                disponible</label>
                            <div class="flex items-center gap-4">
                                <input v-model.number="form.stock" type="number" required
                                    class="w-32 px-6 py-4 bg-muted/30 border border-border/50 rounded-2xl text-sm font-black focus:ring-4 focus:ring-primary/5 outline-none" />
                            </div>
                        </div>

                        <div>
                            <label
                                class="block text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2 ml-1">Statut
                                de l'annonce</label>
                            <div
                                class="flex items-center gap-2 bg-muted/30 p-1 rounded-xl w-fit border border-border/50">
                                <button type="button" @click="form.status = 'active'"
                                    class="px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all"
                                    :class="form.status === 'active' ? 'bg-white text-primary shadow-sm' : 'text-muted-foreground'">
                                    Actif
                                </button>
                                <button type="button" @click="form.status = 'inactive'"
                                    class="px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all"
                                    :class="form.status === 'inactive' ? 'bg-white text-orange-500 shadow-sm' : 'text-muted-foreground'">
                                    Inactif
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- SECTION 2: PRIX & MÉDIAS -->
                <div
                    class="bg-card rounded-3xl p-6 lg:p-10 border border-border shadow-2xl shadow-black/5 animate-in fade-in duration-500">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label
                                class="block text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2 ml-1">Prix
                                de vente (FCFA) *</label>
                            <input v-model.number="form.price" type="number" required
                                class="w-full px-6 py-4 bg-muted/30 border border-border/50 rounded-2xl text-lg font-black text-primary focus:bg-card focus:border-primary/40 outline-none transition-all" />
                        </div>

                        <div>
                            <label
                                class="block text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-4 ml-1">Photo
                                (Laisser vide pour garder l'actuelle)</label>
                            <div @click="$refs.fileInput.click()"
                                class="aspect-video rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center cursor-pointer group hover:border-primary/40 bg-muted/20 relative overflow-hidden">
                                <input ref="fileInput" type="file" accept="image/*" class="hidden"
                                    @change="handleFileChange" />
                                <img v-if="imagePreview" :src="imagePreview"
                                    class="absolute inset-0 w-full h-full object-cover" />
                                <img v-else-if="existingImage" :src="existingImage"
                                    class="absolute inset-0 w-full h-full object-cover opacity-50" />

                                <div class="relative z-10 flex flex-col items-center p-4">
                                    <i class="fas fa-camera text-2xl mb-2 text-primary"></i>
                                    <span
                                        class="text-[9px] font-black uppercase tracking-widest text-foreground">Changer
                                        la photo</span>
                                </div>
                            </div>
                        </div>

                        <div class="md:col-span-2">
                            <label
                                class="block text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2 ml-1">Description
                                *</label>
                            <textarea v-model="form.description" rows="5" required
                                class="w-full px-6 py-4 bg-muted/30 border border-border/50 rounded-2xl text-sm font-medium focus:bg-card focus:border-primary/40 outline-none transition-all"></textarea>
                        </div>
                    </div>
                </div>

                <div class="flex gap-4">
                    <button type="submit" :disabled="isSubmitting"
                        class="flex-1 px-8 py-5 rounded-2xl bg-primary text-primary-foreground text-xs font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 hover:bg-primary/90 transition-all hover:-translate-y-1 disabled:opacity-50 flex items-center justify-center gap-3">
                        <i v-if="isSubmitting" class="fas fa-circle-notch fa-spin"></i>
                        <span>{{ isSubmitting ? 'Enregistrement...' : 'Enregistrer les modifications' }}</span>
                    </button>
                </div>

            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from '@/../axios';

const router = useRouter();
const route = useRoute();

const isLoadingData = ref(true);
const isSubmitting = ref(false);
const imagePreview = ref(null);
const existingImage = ref(null);
const categories = ref([]);

const form = reactive({
    name: '',
    category: '',
    condition: 'Neuf',
    stock: 1,
    price: null,
    description: '',
    image: null,
    status: 'active'
});

const fetchCategories = async () => {
    try {
        const { data } = await axios.get('/api/marketplace/categories');
        if (data.success) {
            categories.value = data.data.filter(c => c.id !== 'all');
        }
    } catch (err) {
        console.error(err);
    }
};

const fetchItemData = async () => {
    try {
        const { data } = await axios.get(`/api/marketplace/items/${route.params.id}`);
        if (data.success) {
            const item = data.data;
            form.name = item.name;
            form.category = item.category;
            form.condition = item.condition;
            form.stock = item.stock;
            form.price = item.price;
            form.description = item.description;
            form.status = item.status || 'active';
            existingImage.value = item.image;
        }
    } catch (err) {
        console.error(err);
        alert('Impossible de charger le produit.');
        router.push({ name: 'VendeurProduits' });
    } finally {
        isLoadingData.value = false;
    }
};

const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    form.image = file;
    const reader = new FileReader();
    reader.onload = (e) => { imagePreview.value = e.target.result; };
    reader.readAsDataURL(file);
};

const submitForm = async () => {
    if (isSubmitting.value) return;
    isSubmitting.value = true;

    try {
        const formData = new FormData();
        formData.append('_method', 'PUT'); // Laravel requirement for PUT with Multipart

        Object.keys(form).forEach(key => {
            if (form[key] !== null && form[key] !== undefined && form[key] !== '') {
                formData.append(key, form[key]);
            }
        });

        const { data } = await axios.post(`/api/marketplace/items/${route.params.id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        if (data.success) {
            alert('Produit mis à jour avec succès.');
            router.push({ name: 'VendeurProduits' });
        }
    } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || 'Erreur lors de la mise à jour.');
    } finally {
        isSubmitting.value = false;
    }
};

onMounted(() => {
    fetchCategories();
    fetchItemData();
});
</script>
