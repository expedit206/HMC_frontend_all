<template>
    <div class="dashboard-page-content">
        <div class="max-w-6xl mx-auto">
            <!-- Header -->
            <div
                class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 animate-fadeIn">
                <div>
                    <h1 class="text-2xl font-bold text-foreground leading-tight">Mes Locataires</h1>
                    <p class="text-muted-foreground text-sm mt-1 font-medium tracking-wide">
                        Suivi des baux, paiements et communication avec vos résidents.
                    </p>
                </div>
                <div class="flex items-center gap-3">
                    <button @click="mobileMenuOpen = !mobileMenuOpen"
                        class="lg:hidden p-2 text-muted-foreground hover:text-secondary transition-colors">
                        <i class="fas fa-bars text-xl"></i>
                    </button>
                    <div class="flex gap-2">
                        <button
                            class="px-4 py-2 bg-card border border-border text-foreground rounded-xl text-xs font-bold hover:bg-muted/20 transition-all uppercase tracking-wider flex items-center gap-2">
                            <i class="fas fa-file-export"></i>
                            <span class="hidden sm:inline">Exporter</span>
                        </button>
                        <button @click="openNewBailModal"
                            class="px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-xs font-bold hover:scale-105 transition-all shadow-md uppercase tracking-wider flex items-center gap-2">
                            <i class="fas fa-plus font-bold"></i>
                            <span class="hidden sm:inline">Nouveau Bail</span>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Stats Grid -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 animate-fadeIn" style="animation-delay: 0.1s">
                <div v-for="stat in stats" :key="stat.label"
                    class="bg-card p-5 rounded-2xl shadow-sm border border-border flex flex-col items-center justify-center text-center transition-transform hover:-translate-y-1 hover:shadow-md"
                    :class="{ 'border-b-4 border-b-secondary': stat.highlight }">
                    <p class="text-[10px] font-bold uppercase mb-1 tracking-widest leading-none"
                        :class="stat.highlight ? 'text-secondary' : 'text-muted-foreground'">
                        {{ stat.label }}
                    </p>
                    <p class="text-2xl font-bold leading-none"
                        :class="stat.highlight ? 'text-secondary' : 'text-foreground'">
                        {{ stat.value }}
                    </p>
                </div>
            </div>

            <!-- Tabs -->
            <div class="flex border-b border-border mb-6 font-bold text-sm">
                <button @click="activeTab = 'active'"
                    :class="['px-6 py-3 transition-all relative', activeTab === 'active' ? 'text-secondary' : 'text-muted-foreground hover:text-foreground']">
                    Locataires Actifs
                    <div v-if="activeTab === 'active'" class="absolute bottom-0 left-0 w-full h-0.5 bg-secondary"></div>
                </button>
                <button @click="activeTab = 'pending'"
                    :class="['px-6 py-3 transition-all relative', activeTab === 'pending' ? 'text-secondary' : 'text-muted-foreground hover:text-foreground']">
                    Candidatures
                    <span v-if="applications.length"
                        class="ml-2 bg-secondary text-secondary-foreground text-[10px] px-1.5 py-0.5 rounded-full">{{
                        applications.length }}</span>
                    <div v-if="activeTab === 'pending'" class="absolute bottom-0 left-0 w-full h-0.5 bg-secondary">
                    </div>
                </button>
            </div>

            <!-- List Table -->
            <div class="bg-card rounded-2xl shadow-sm border border-border overflow-hidden animate-fadeIn"
                style="animation-delay: 0.2s">
                <div class="overflow-x-auto">
                    <table class="w-full text-left">
                        <thead class="bg-muted/10 border-b border-border">
                            <tr>
                                <th class="px-6 py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                    {{ activeTab === 'active' ? 'Locataire' : 'Candidat' }}
                                </th>
                                <th class="px-6 py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Bien
                                </th>
                                <th
                                    class="px-6 py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-center">
                                    {{ activeTab === 'active' ? 'Status Logement' : 'Dossier' }}
                                </th>
                                <th class="px-6 py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                    Loyer</th>
                                <th
                                    class="px-6 py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-right">
                                    Actions</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-border">
                            <tr v-if="isLoading">
                                <td colspan="5" class="px-6 py-12 text-center text-muted-foreground">
                                    <i class="fas fa-circle-notch fa-spin text-2xl mb-2 text-secondary"></i>
                                    <p class="text-xs font-medium">Chargement des données...</p>
                                </td>
                            </tr>
                            <template v-else-if="activeTab === 'active'">
                                <tr v-if="tenants.length === 0">
                                    <td colspan="5" class="px-6 py-12 text-center text-muted-foreground">Aucun locataire actif.
                                    </td>
                                </tr>
                                <tr v-for="tenant in tenants" :key="tenant.id"
                                    class="hover:bg-muted/5 transition-colors group">
                                    <td class="px-6 py-4">
                                        <div class="flex items-center gap-3">
                                            <div
                                                class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs bg-blue-100 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400">
                                                {{ tenant.initials }}</div>
                                            <div>
                                                <p
                                                    class="text-sm font-bold text-foreground group-hover:text-secondary transition-colors">
                                                    {{ tenant.name }}</p>
                                                <p class="text-[11px] text-muted-foreground font-medium">{{ tenant.joinDate }}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 text-sm font-medium text-foreground">{{ tenant.property }}</td>
                                    <td class="px-6 py-4 text-center">
                                        <span
                                            class="px-2.5 py-1 text-[10px] font-bold rounded-lg uppercase tracking-wide inline-block min-w-[80px]"
                                            :class="tenant.statusClass">{{ tenant.status }}</span>
                                    </td>
                                    <td class="px-6 py-4 text-sm font-bold text-foreground">{{ formatPrice(tenant.rent) }}
                                        <span class="text-[10px] font-normal text-muted-foreground italic">CFA</span></td>
                                    <td class="px-6 py-4 text-right flex justify-end gap-2">
                                        <button
                                            class="w-8 h-8 rounded-lg bg-muted/20 text-muted-foreground hover:text-secondary hover:bg-secondary/10 flex items-center justify-center"><i
                                                class="fas fa-eye text-xs"></i></button>
                                        <button
                                            class="w-8 h-8 rounded-lg bg-muted/20 text-muted-foreground hover:text-secondary hover:bg-secondary/10 flex items-center justify-center"><i
                                                class="fas fa-comment text-xs"></i></button>
                                    </td>
                                </tr>
                            </template>
                            <template v-else-if="activeTab === 'pending'">
                                <tr v-if="applications.length === 0">
                                    <td colspan="5" class="px-6 py-12 text-center text-muted-foreground">Aucune candidature en
                                        attente.</td>
                                </tr>
                                <tr v-for="app in applications" :key="app.id"
                                    class="hover:bg-muted/5 transition-colors group">
                                    <td class="px-6 py-4 font-bold text-sm text-foreground">
                                        {{ app.tenant?.name }}
                                        <p class="text-[10px] text-muted-foreground">{{ formatDate(app.created_at) }}</p>
                                    </td>
                                    <td class="px-6 py-4 text-sm font-medium text-foreground">{{ app.property?.title }}
                                    </td>
                                    <td class="px-6 py-4 text-center"><span
                                            class="px-2 py-1 bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 rounded text-[10px] font-bold uppercase">En
                                            attente</span></td>
                                    <td class="px-6 py-4 font-bold text-sm text-foreground">{{
                                        formatPrice(app.property?.price) }}</td>
                                    <td class="px-6 py-4 text-right flex justify-end gap-2">
                                        <button @click="handleStatus(app.id, 'active')"
                                            class="h-8 bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 rounded-lg px-3 flex items-center gap-2 hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors"><i
                                                class="fas fa-check"></i> <span
                                                class="text-[10px] font-bold uppercase">Accepter</span></button>
                                        <button @click="handleStatus(app.id, 'rejected')"
                                            class="h-8 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 rounded-lg px-3 flex items-center gap-2 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"><i
                                                class="fas fa-times"></i> <span
                                                class="text-[10px] font-bold uppercase">Refuser</span></button>
                                    </td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- MODAL NOUVEAU BAIL -->
        <div v-if="isNewBailModalOpen"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn">
            <div class="bg-card rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] border border-border">
                <div class="px-6 py-4 border-b border-border flex justify-between items-center bg-muted/10">
                    <div>
                        <h2 class="text-lg font-bold text-foreground uppercase tracking-wide">Créer un Nouveau Bail</h2>
                        <p class="text-[10px] text-muted-foreground font-bold uppercase mt-1">Liez directement un locataire à
                            l'un de vos biens vacant</p>
                    </div>
                    <button @click="closeNewBailModal"
                        class="w-8 h-8 flex items-center justify-center rounded-full bg-muted/20 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"><i
                            class="fas fa-times"></i></button>
                </div>
                <form @submit.prevent="submitNewBail" class="p-6 overflow-y-auto space-y-6">
                    <div>
                        <label class="block text-[10px] text-muted-foreground font-bold uppercase mb-2">Sélectionnez le
                            bien</label>
                        <select v-model="newBailForm.property_id" required
                            class="w-full px-4 py-3 bg-muted/20 rounded-xl text-sm text-foreground focus:ring-2 focus:ring-secondary/20 outline-none">
                            <option value="" disabled class="bg-card">-- Choisir un bien vacant --</option>
                            <option v-for="prop in vacantProperties" :key="prop.id" :value="prop.id" class="bg-card">{{ prop.title }}
                                ({{ formatPrice(prop.price) }})</option>
                        </select>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="space-y-4">
                            <h3 class="text-xs font-black text-foreground uppercase border-b border-border pb-2">Locataire</h3>
                            <input v-model="newBailForm.tenant_name" type="text" placeholder="Nom Complet" required
                                class="w-full px-4 py-3 bg-muted/20 rounded-xl text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-secondary/20" />
                            <input v-model="newBailForm.tenant_email" type="email" placeholder="Email" required
                                class="w-full px-4 py-3 bg-muted/20 rounded-xl text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-secondary/20" />
                            <input v-model="newBailForm.tenant_phone" type="tel" placeholder="Téléphone"
                                class="w-full px-4 py-3 bg-muted/20 rounded-xl text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-secondary/20" />
                        </div>
                        <div class="space-y-4">
                            <h3 class="text-xs font-black text-foreground uppercase border-b border-border pb-2">Conditions</h3>
                            <input v-model.number="newBailForm.rent" type="number" placeholder="Loyer" required
                                class="w-full px-4 py-3 bg-muted/20 rounded-xl text-sm font-bold text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-secondary/20" />
                            <input v-model="newBailForm.start_date" type="date" required
                                class="w-full px-4 py-3 bg-muted/20 rounded-xl text-sm text-foreground outline-none focus:ring-2 focus:ring-secondary/20" />
                            <div class="grid grid-cols-2 gap-4">
                                <input v-model.number="newBailForm.caution_months" type="number"
                                    placeholder="Caution (mois)"
                                    class="w-full px-4 py-3 bg-muted/20 rounded-xl text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-secondary/20" />
                                <input v-model.number="newBailForm.advance_months" type="number"
                                    placeholder="Avance (mois)"
                                    class="w-full px-4 py-3 bg-muted/20 rounded-xl text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-secondary/20" />
                            </div>
                        </div>
                    </div>
                    <div class="pt-6 border-t border-border flex gap-3 justify-end">
                        <button type="button" @click="closeNewBailModal"
                            class="px-6 py-3 text-xs font-bold uppercase text-muted-foreground border border-border rounded-xl hover:bg-muted/20 transition-colors">Annuler</button>
                        <button type="submit" :disabled="isSubmittingBail"
                            class="px-8 py-3 bg-secondary text-secondary-foreground rounded-xl text-xs font-bold uppercase hover:bg-secondary/90 transition-colors">
                            <i v-if="isSubmittingBail" class="fas fa-circle-notch fa-spin mr-2"></i>
                            {{ isSubmittingBail ? 'Création...' : 'Créer le Bail' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { usePropertyStore } from "../../stores/properties";
import axios from "../../axios";

const propertyStore = usePropertyStore();
const mobileMenuOpen = ref(false);
const activeTab = ref("active");
const isLoading = ref(true);
const stats = ref([
    { label: "Actifs", value: 0, highlight: false },
    { label: "En attente", value: 0, highlight: true },
    { label: "Impayés", value: 0, highlight: false },
    { label: "Total Biens", value: 0, highlight: false },
]);

const tenants = ref([]);
const applications = ref([]);
const vacantProperties = ref([]);

// Nouveau Bail Logic
const isNewBailModalOpen = ref(false);
const isSubmittingBail = ref(false);
const newBailForm = ref({
    property_id: "",
    tenant_name: "",
    tenant_email: "",
    tenant_phone: "",
    rent: 0,
    start_date: new Date().toISOString().split('T')[0],
    caution_months: 2,
    advance_months: 2,
});

const openNewBailModal = () => {
    isNewBailModalOpen.value = true;
};

const closeNewBailModal = () => {
    isNewBailModalOpen.value = false;
};

watch(() => newBailForm.value.property_id, (id) => {
    const p = vacantProperties.value.find(p => p.id === id);
    if (p) newBailForm.value.rent = p.price;
});

const submitNewBail = async () => {
    if (isSubmittingBail.value) return;
    isSubmittingBail.value = true;
    try {
        await axios.post("/api/bailleur/rentals", newBailForm.value);
        alert("Bail créé avec succès !");
        closeNewBailModal();
        fetchData();
    } catch (err) {
        alert(err.response?.data?.message || "Erreur de création du bail");
    } finally {
        isSubmittingBail.value = false;
    }
};

const fetchData = async () => {
    isLoading.value = true;
    try {
        await propertyStore.fetchBailleurProperties();
        const appRes = await axios.get("/api/bailleur/applications");

        const allProps = propertyStore.bailleurProperties;
        vacantProperties.value = allProps.filter(p => p.status === 'active' || p.status === 'vacant');

            tenants.value = allProps
                .filter((p) => p.rental_status === "occupied")
                .map((p) => ({
                    id: p.id,
                    name: p.tenant?.name || "Locataire inconnu",
                    initials: p.tenant?.name ? p.tenant.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) : "??",
                    joinDate: p.rentals?.[0]?.start_date ? `Depuis le ${formatDate(p.rentals[0].start_date)}` : "Installé",
                    property: p.title,
                    rent: p.monthly_rent,
                    status: p.payment_status === "unpaid" ? "Retard" : "À Jour",
                    statusClass: p.payment_status === "unpaid" 
                        ? "bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400" 
                        : "bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400",
                }));

            stats.value[0].value = tenants.value.length;
            stats.value[1].value = appRes.data.data.length;
            stats.value[3].value = allProps.length;

        if (appRes.data.success) {
            applications.value = appRes.data.data;
        }
    } catch (err) {
        console.error(err);
    } finally {
        isLoading.value = false;
    }
};

const handleStatus = async (id, status) => {
    try {
        const { data } = await axios.post(`/api/bailleur/applications/${id}/status`, { status });
        if (data.success) {
            alert(status === "active" ? "Candidature acceptée !" : "Candidature refusée.");
            fetchData();
        }
    } catch (err) {
        alert("Une erreur est survenue.");
    }
};

onMounted(fetchData);

const formatPrice = (p) => new Intl.NumberFormat("fr-FR").format(p || 0) + ' FCFA';
const formatDate = (date) => {
    return new Date(date).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
};
</script>

<style scoped>
.animate-fadeIn {
    animation: fadeIn 0.5s ease-out forwards;
    opacity: 0;
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

.custom-scrollbar::-webkit-scrollbar {
    width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: hsl(var(--muted-foreground) / 0.3);
    border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: hsl(var(--muted-foreground) / 0.5);
}
</style>