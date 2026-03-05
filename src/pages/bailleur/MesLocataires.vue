<template>
    <DashboardLayout>
        <div class="max-w-6xl mx-auto">
            <!-- Header -->
            <div
                class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 animate-fadeIn">
                <div>
                    <h1 class="text-2xl font-bold text-gray-900 leading-tight">Mes Locataires</h1>
                    <p class="text-gray-500 text-sm mt-1 font-medium tracking-wide">
                        Suivi des baux, paiements et communication avec vos résidents.
                    </p>
                </div>
                <div class="flex items-center gap-3">
                    <button @click="mobileMenuOpen = !mobileMenuOpen"
                        class="lg:hidden p-2 text-gray-500 hover:text-[#E54801] transition-colors">
                        <i class="fas fa-bars text-xl"></i>
                    </button>
                    <div class="flex gap-2">
                        <button
                            class="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl text-xs font-bold hover:bg-gray-50 transition-all uppercase tracking-wider flex items-center gap-2">
                            <i class="fas fa-file-export"></i>
                            <span class="hidden sm:inline">Exporter</span>
                        </button>
                        <button @click="openNewBailModal"
                            class="px-5 py-2.5 bg-[#1B0B38] text-white rounded-xl text-xs font-bold hover:scale-105 transition-all shadow-md uppercase tracking-wider flex items-center gap-2">
                            <i class="fas fa-plus font-bold"></i>
                            <span class="hidden sm:inline">Nouveau Bail</span>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Stats Grid -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 animate-fadeIn" style="animation-delay: 0.1s">
                <div v-for="stat in stats" :key="stat.label"
                    class="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center transition-transform hover:-translate-y-1 hover:shadow-md"
                    :class="{ 'border-b-4 border-b-[#E54801]': stat.highlight }">
                    <p class="text-[10px] font-bold uppercase mb-1 tracking-widest leading-none"
                        :class="stat.highlight ? 'text-[#E54801]' : 'text-gray-400'">
                        {{ stat.label }}
                    </p>
                    <p class="text-2xl font-bold leading-none"
                        :class="stat.highlight ? 'text-[#E54801]' : 'text-gray-900'">
                        {{ stat.value }}
                    </p>
                </div>
            </div>

            <!-- Tabs -->
            <div class="flex border-b border-gray-200 mb-6 font-bold text-sm">
                <button @click="activeTab = 'active'"
                    :class="['px-6 py-3 transition-all relative', activeTab === 'active' ? 'text-[#E54801]' : 'text-gray-400 hover:text-gray-600']">
                    Locataires Actifs
                    <div v-if="activeTab === 'active'" class="absolute bottom-0 left-0 w-full h-0.5 bg-[#E54801]"></div>
                </button>
                <button @click="activeTab = 'pending'"
                    :class="['px-6 py-3 transition-all relative', activeTab === 'pending' ? 'text-[#E54801]' : 'text-gray-400 hover:text-gray-600']">
                    Candidatures
                    <span v-if="applications.length"
                        class="ml-2 bg-[#E54801] text-white text-[10px] px-1.5 py-0.5 rounded-full">{{
                        applications.length }}</span>
                    <div v-if="activeTab === 'pending'" class="absolute bottom-0 left-0 w-full h-0.5 bg-[#E54801]">
                    </div>
                </button>
            </div>

            <!-- List Table -->
            <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-fadeIn"
                style="animation-delay: 0.2s">
                <div class="overflow-x-auto">
                    <table class="w-full text-left">
                        <thead class="bg-gray-50/50 border-b border-gray-50">
                            <tr>
                                <th class="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                    {{ activeTab === 'active' ? 'Locataire' : 'Candidat' }}
                                </th>
                                <th class="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Bien
                                </th>
                                <th
                                    class="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">
                                    {{ activeTab === 'active' ? 'Status Logement' : 'Dossier' }}
                                </th>
                                <th class="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                    Loyer</th>
                                <th
                                    class="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">
                                    Actions</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-50">
                            <tr v-if="isLoading">
                                <td colspan="5" class="px-6 py-12 text-center text-gray-400">
                                    <i class="fas fa-circle-notch fa-spin text-2xl mb-2 text-[#E54801]"></i>
                                    <p class="text-xs font-medium">Chargement des données...</p>
                                </td>
                            </tr>
                            <template v-else-if="activeTab === 'active'">
                                <tr v-if="tenants.length === 0">
                                    <td colspan="5" class="px-6 py-12 text-center text-gray-400">Aucun locataire actif.
                                    </td>
                                </tr>
                                <tr v-for="tenant in tenants" :key="tenant.id"
                                    class="hover:bg-gray-50/80 transition-colors group">
                                    <td class="px-6 py-4">
                                        <div class="flex items-center gap-3">
                                            <div
                                                class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs bg-blue-100 text-blue-600">
                                                {{ tenant.initials }}</div>
                                            <div>
                                                <p
                                                    class="text-sm font-bold text-gray-900 group-hover:text-[#E54801] transition-colors">
                                                    {{ tenant.name }}</p>
                                                <p class="text-[11px] text-gray-500 font-medium">{{ tenant.joinDate }}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 text-sm font-medium text-gray-700">{{ tenant.property }}</td>
                                    <td class="px-6 py-4 text-center">
                                        <span
                                            class="px-2.5 py-1 text-[10px] font-bold rounded-lg uppercase tracking-wide inline-block min-w-[80px]"
                                            :class="tenant.statusClass">{{ tenant.status }}</span>
                                    </td>
                                    <td class="px-6 py-4 text-sm font-bold text-gray-900">{{ formatPrice(tenant.rent) }}
                                        <span class="text-[10px] font-normal text-gray-400 italic">CFA</span></td>
                                    <td class="px-6 py-4 text-right flex justify-end gap-2">
                                        <button
                                            class="w-8 h-8 rounded-lg bg-gray-50 text-gray-500 hover:text-[#E54801] hover:bg-[#E54801]/10 flex items-center justify-center"><i
                                                class="fas fa-eye text-xs"></i></button>
                                        <button
                                            class="w-8 h-8 rounded-lg bg-gray-50 text-gray-500 hover:text-[#E54801] hover:bg-[#E54801]/10 flex items-center justify-center"><i
                                                class="fas fa-comment text-xs"></i></button>
                                    </td>
                                </tr>
                            </template>
                            <template v-else-if="activeTab === 'pending'">
                                <tr v-if="applications.length === 0">
                                    <td colspan="5" class="px-6 py-12 text-center text-gray-400">Aucune candidature en
                                        attente.</td>
                                </tr>
                                <tr v-for="app in applications" :key="app.id"
                                    class="hover:bg-gray-50/80 transition-colors group">
                                    <td class="px-6 py-4 font-bold text-sm text-gray-900">
                                        {{ app.tenant?.name }}
                                        <p class="text-[10px] text-gray-400">{{ new
                                            Date(app.created_at).toLocaleDateString() }}</p>
                                    </td>
                                    <td class="px-6 py-4 text-sm font-medium text-gray-700">{{ app.property?.title }}
                                    </td>
                                    <td class="px-6 py-4 text-center"><span
                                            class="px-2 py-1 bg-orange-50 text-orange-600 rounded text-[10px] font-bold uppercase">En
                                            attente</span></td>
                                    <td class="px-6 py-4 font-bold text-sm text-gray-900">{{
                                        formatPrice(app.property?.price) }}</td>
                                    <td class="px-6 py-4 text-right flex justify-end gap-2">
                                        <button @click="handleStatus(app.id, 'active')"
                                            class="h-8 bg-green-50 text-green-600 rounded-lg px-3 flex items-center gap-2 hover:bg-green-100 transition-colors"><i
                                                class="fas fa-check"></i> <span
                                                class="text-[10px] font-bold uppercase">Accepter</span></button>
                                        <button @click="handleStatus(app.id, 'rejected')"
                                            class="h-8 bg-red-50 text-red-600 rounded-lg px-3 flex items-center gap-2 hover:bg-red-100 transition-colors"><i
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
            <div class="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
                <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <div>
                        <h2 class="text-lg font-bold text-[#1B0B38] uppercase tracking-wide">Créer un Nouveau Bail</h2>
                        <p class="text-[10px] text-gray-500 font-bold uppercase mt-1">Liez directement un locataire à
                            l'un de
                            vos biens vacant</p>
                    </div>
                    <button @click="closeNewBailModal"
                        class="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-red-100 hover:text-red-500 transition-colors"><i
                            class="fas fa-times"></i></button>
                </div>
                <form @submit.prevent="submitNewBail" class="p-6 overflow-y-auto space-y-6">
                    <div>
                        <label class="block text-[10px] text-gray-400 font-bold uppercase mb-2">Sélectionnez le
                            bien</label>
                        <select v-model="newBailForm.property_id" required
                            class="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm focus:ring-2 focus:ring-[#E54801]/20 outline-none">
                            <option value="" disabled>-- Choisir un bien vacant --</option>
                            <option v-for="prop in vacantProperties" :key="prop.id" :value="prop.id">{{ prop.title }}
                                ({{
                                formatPrice(prop.price) }})</option>
                        </select>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="space-y-4">
                            <h3 class="text-xs font-black text-[#1B0B38] uppercase border-b pb-2">Locataire</h3>
                            <input v-model="newBailForm.tenant_name" type="text" placeholder="Nom Complet" required
                                class="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm outline-none" />
                            <input v-model="newBailForm.tenant_email" type="email" placeholder="Email" required
                                class="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm outline-none" />
                            <input v-model="newBailForm.tenant_phone" type="tel" placeholder="Téléphone"
                                class="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm outline-none" />
                        </div>
                        <div class="space-y-4">
                            <h3 class="text-xs font-black text-[#1B0B38] uppercase border-b pb-2">Conditions</h3>
                            <input v-model.number="newBailForm.rent" type="number" placeholder="Loyer" required
                                class="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm font-bold outline-none" />
                            <input v-model="newBailForm.start_date" type="date" required
                                class="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm outline-none" />
                            <div class="grid grid-cols-2 gap-4">
                                <input v-model.number="newBailForm.caution_months" type="number"
                                    placeholder="Caution (mois)"
                                    class="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm outline-none" />
                                <input v-model.number="newBailForm.advance_months" type="number"
                                    placeholder="Avance (mois)"
                                    class="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm outline-none" />
                            </div>
                        </div>
                    </div>
                    <div class="pt-6 border-t flex gap-3 justify-end">
                        <button type="button" @click="closeNewBailModal"
                            class="px-6 py-3 text-xs font-bold uppercase text-gray-400 border rounded-xl hover:bg-gray-50 transition-colors">Annuler</button>
                        <button type="submit" :disabled="isSubmittingBail"
                            class="px-8 py-3 bg-[#E54801] text-white rounded-xl text-xs font-bold uppercase hover:bg-red-800 transition-colors">
                            <i v-if="isSubmittingBail" class="fas fa-circle-notch fa-spin mr-2"></i>
                            {{ isSubmittingBail ? 'Création...' : 'Créer le Bail' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </DashboardLayout>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import DashboardLayout from "../../layouts/DashboardLayout.vue";
import axios from "../../axios";

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
        const [propRes, appRes] = await Promise.all([
            axios.get("/api/bailleur/properties"),
            axios.get("/api/bailleur/applications"),
        ]);

        if (propRes.data.success) {
            const allProps = propRes.data.data.data;
            vacantProperties.value = allProps.filter(p => p.status === 'active' || p.status === 'vacant');

            tenants.value = allProps
                .filter((p) => p.rental_status === "occupied")
                .map((p) => ({
                    id: p.id,
                    name: p.tenant?.name || "Locataire inconnu",
                    initials: p.tenant?.name ? p.tenant.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) : "??",
                    joinDate: p.rentals?.[0]?.start_date ? `Depuis le ${new Date(p.rentals[0].start_date).toLocaleDateString()}` : "Installé",
                    property: p.title,
                    rent: p.monthly_rent,
                    status: p.payment_status === "unpaid" ? "Retard" : "À Jour",
                    statusClass: p.payment_status === "unpaid" ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600",
                }));

            stats.value[0].value = tenants.value.length;
            stats.value[1].value = appRes.data.data.length;
            stats.value[3].value = allProps.length;
        }
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

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;
}
</style>
