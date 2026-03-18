<template>
    <div class="bg-background overflow-y-auto h-full py-12 px-6">
        <div class="max-w-3xl mx-auto">
            <!-- En-tête -->
            <div class="mb-10 flex justify-between items-end">
                <div>
                    <h1 class="text-3xl font-black text-foreground leading-tight uppercase relative">
                        Éditer le bien
                        <span class="absolute -bottom-2 left-0 w-20 h-1 bg-secondary"></span>
                    </h1>
                    <p class="text-muted-foreground font-bold uppercase tracking-widest text-[11px] mt-4">
                        Modifier les informations de votre bien immobilier
                    </p>
                </div>
                <RouterLink :to="{ name: 'BailleurMesBiens' }"
                    class="group flex items-center gap-2 text-xs font-black text-muted-foreground hover:text-secondary transition-all uppercase tracking-widest">
                    <span>Retour</span>
                    <div
                        class="w-8 h-8 rounded-full bg-muted/20 flex items-center justify-center group-hover:bg-secondary group-hover:text-secondary-foreground transition-all">
                        <i class="fas fa-arrow-left"></i>
                    </div>
                </RouterLink>
            </div>

            <div v-if="isLoading" class="flex justify-center py-20">
                <i class="fas fa-spinner fa-spin text-4xl text-secondary"></i>
            </div>

            <form v-else @submit.prevent="updateProperty" class="space-y-8 animate-fadeIn">
                <section class="bg-card p-8 rounded-3xl shadow-sm border border-border">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <!-- Titre -->
                        <div class="col-span-1 md:col-span-2">
                            <label class="block text-[10px] text-muted-foreground font-bold uppercase mb-2 ml-2">Titre du
                                bien</label>
                            <input v-model="form.title" type="text" required
                                class="w-full px-5 py-4 bg-muted/20 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-secondary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground" />
                        </div>

                        <!-- Type -->
                        <div>
                            <label class="block text-[10px] text-muted-foreground font-bold uppercase mb-2 ml-2">Type
                                d'offre</label>
                            <select v-model="form.type"
                                class="w-full px-5 py-4 bg-muted/20 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-secondary/20 outline-none transition-all cursor-pointer text-foreground">
                                <option value="rent" class="bg-card">À Louer</option>
                                <option value="sale" class="bg-card">À Vendre</option>
                            </select>
                        </div>

                        <!-- Catégorie -->
                        <div>
                            <label
                                class="block text-[10px] text-muted-foreground font-bold uppercase mb-2 ml-2">Catégorie</label>
                            <select v-model="form.category"
                                class="w-full px-5 py-4 bg-muted/20 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-secondary/20 outline-none transition-all cursor-pointer text-foreground">
                                <option value="Villa" class="bg-card">Villa</option>
                                <option value="Appartement" class="bg-card">Appartement</option>
                                <option value="Studio" class="bg-card">Studio</option>
                                <option value="Chambre" class="bg-card">Chambre</option>
                                <option value="Bureau" class="bg-card">Bureau / Local Pro</option>
                                <option value="Terrain" class="bg-card">Terrain</option>
                            </select>
                        </div>

                        <!-- Prix -->
                        <div>
                            <label class="block text-[10px] text-muted-foreground font-bold uppercase mb-2 ml-2">Loyer / Prix
                                (XAF)</label>
                            <input v-model.number="form.price" type="number" required
                                class="w-full px-5 py-4 bg-muted/20 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-secondary/20 outline-none transition-all text-foreground" />
                        </div>

                        <!-- Ville -->
                        <div>
                            <label class="block text-[10px] text-muted-foreground font-bold uppercase mb-2 ml-2">Ville</label>
                            <input v-model="form.city" type="text" required
                                class="w-full px-5 py-4 bg-muted/20 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-secondary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground" />
                        </div>

                        <!-- Quartier -->
                        <div class="col-span-1 md:col-span-2">
                            <label class="block text-[10px] text-muted-foreground font-bold uppercase mb-2 ml-2">Quartier /
                                Adresse précise</label>
                            <input v-model="form.location" type="text" required
                                class="w-full px-5 py-4 bg-muted/20 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-secondary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground" />
                        </div>

                        <!-- Chambres / SDB -->
                        <div>
                            <label
                                class="block text-[10px] text-muted-foreground font-bold uppercase mb-2 ml-2">Chambres</label>
                            <input v-model.number="form.bedrooms" type="number"
                                class="w-full px-5 py-4 bg-muted/20 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-secondary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground" />
                        </div>

                        <div>
                            <label class="block text-[10px] text-muted-foreground font-bold uppercase mb-2 ml-2">Salles de
                                bain</label>
                            <input v-model.number="form.bathrooms" type="number"
                                class="w-full px-5 py-4 bg-muted/20 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-secondary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground" />
                        </div>

                        <!-- Surface -->
                        <div>
                            <label class="block text-[10px] text-muted-foreground font-bold uppercase mb-2 ml-2">Surface
                                (m²)</label>
                            <input v-model.number="form.area" type="number"
                                class="w-full px-5 py-4 bg-muted/20 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-secondary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground" />
                        </div>

                        <!-- Etat -->
                        <div>
                            <label class="block text-[10px] text-muted-foreground font-bold uppercase mb-2 ml-2">État du
                                bien</label>
                            <select v-model="form.etat"
                                class="w-full px-5 py-4 bg-muted/20 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-secondary/20 outline-none transition-all cursor-pointer text-foreground">
                                <option value="Neuf" class="bg-card">Neuf</option>
                                <option value="Rénové" class="bg-card">Rénové</option>
                                <option value="Bon état" class="bg-card">Bon état</option>
                                <option value="À rafraîchir" class="bg-card">À rafraîchir</option>
                            </select>
                        </div>

                        <!-- Description -->
                        <div class="col-span-1 md:col-span-2">
                            <label
                                class="block text-[10px] text-muted-foreground font-bold uppercase mb-2 ml-2">Description</label>
                            <textarea v-model="form.description" rows="5"
                                class="w-full px-5 py-4 bg-muted/20 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-secondary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground"></textarea>
                        </div>
                    </div>
                </section>

                <div class="flex gap-4">
                    <RouterLink :to="{ name: 'BailleurMesBiens' }"
                        class="flex-1 text-center py-4 bg-card border border-border text-muted-foreground rounded-2xl font-black uppercase tracking-widest hover:bg-muted/20 transition-all text-xs">
                        Annuler
                    </RouterLink>

                    <button type="submit" :disabled="isSubmitting"
                        class="flex-[2] py-4 bg-secondary text-secondary-foreground rounded-2xl font-black uppercase tracking-widest hover:bg-secondary/90 hover:shadow-lg hover:-translate-y-1 transition-all shadow-xl shadow-secondary/20 text-xs flex items-center justify-center gap-2">
                        <i v-if="isSubmitting" class="fas fa-circle-notch fa-spin"></i>
                        <i v-else class="fas fa-save"></i>
                        {{ isSubmitting ? "Enregistrement..." : "Enregistrer les modifications" }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { usePropertyStore } from "../../stores/properties";
import axios from "../../axios";

const route = useRoute();
const router = useRouter();
const propertyStore = usePropertyStore();

const isLoading = ref(true);
const isSubmitting = ref(false);

const form = reactive({
    title: "",
    type: "rent",
    category: "",
    price: null,
    city: "",
    location: "",
    description: "",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    etat: "Bon état",
});

const fetchProperty = async () => {
    try {
        const payload = await propertyStore.fetchPropertyDetails(route.params.id.toString());
        if (payload && payload.success) {
            const p = payload.data;
            form.title = p.title || "";
            form.type = p.type || "rent";
            form.category = p.category || "";
            form.price = p.price || null;
            form.city = p.city || "";
            form.location = p.location || "";
            form.description = p.description || "";
            form.bedrooms = p.bedrooms || 0;
            form.bathrooms = p.bathrooms || 0;
            form.area = p.area || 0;
            form.etat = p.etat || "Bon état";
        }
    } catch (error) {
        console.error("Erreur lors du chargement du bien", error);
        alert("Impossible de charger les détails du bien.");
        router.push({ name: 'BailleurMesBiens' });
    } finally {
        isLoading.value = false;
    }
};

onMounted(() => {
    fetchProperty();
});

const updateProperty = async () => {
    if (isSubmitting.value) return;
    isSubmitting.value = true;

    try {
        const { data } = await axios.put(`/api/properties/${route.params.id}`, form);
        if (data.success) {
            alert("Votre bien a été mis à jour avec succès.");
            router.push({ name: 'BailleurMesBiens' });
        }
    } catch (error) {
        console.error("Erreur lors de la mise à jour", error);
        alert(error.response?.data?.message || "Une erreur est survenue lors de la mise à jour.");
    } finally {
        isSubmitting.value = false;
    }
};
</script>

<style scoped>
.animate-fadeIn {
    animation: fadeIn 0.4s ease-out forwards;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

input:focus,
select:focus,
textarea:focus {
    background-color: hsl(var(--card));
    box-shadow: 0 10px 15px -3px hsl(var(--foreground) / 0.05);
}
</style>