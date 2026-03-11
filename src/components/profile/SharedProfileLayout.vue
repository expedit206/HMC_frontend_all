<template>
    <DashboardLayout>
        <div class="max-w-7xl mx-auto">
            <!-- Header -->
            <div
                class="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6 animate-fadeIn">
                <div>
                    <h1 class="text-3xl lg:text-4xl font-black text-[#1B0B38] leading-tight flex items-center gap-3">
                        <i class="fas" :class="headerIcon ? headerIcon : 'fa-user-circle'"></i>
                        {{ title }}
                    </h1>
                    <p class="text-gray-500 text-sm mt-2 font-medium">
                        {{ subtitle }}
                    </p>
                </div>
                <div class="flex gap-3 items-center w-full lg:w-auto justify-between lg:justify-end">
                    <button @click="toggleSidebar"
                        class="lg:hidden w-12 h-12 flex items-center justify-center bg-white rounded-2xl shadow-sm text-gray-500 hover:text-[#E54801] transition-colors border border-gray-100">
                        <i class="fas fa-bars text-xl"></i>
                    </button>
                    <slot name="header-actions"></slot>
                </div>
            </div>

            <!-- Optional Stats Grid at the top -->
            <slot name="stats-overview"></slot>

            <div class="grid grid-cols-1 md:grid-cols-12 gap-8 animate-fadeIn" style="animation-delay: 0.2s">
                <!-- Gauche: Avatar & Basic Info -->
                <div class="md:col-span-12 lg:col-span-4 space-y-8">
                    <div
                        class="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 text-center relative overflow-hidden">
                        <!-- Background Decoration -->
                        <div
                            class="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-[#1B0B38] to-[#2a1154] z-0">
                        </div>

                        <div class="relative z-10 pt-4">
                            <div class="relative mb-6 inline-block group">
                                <div class="w-32 h-32 lg:w-40 lg:h-40 mx-auto rounded-full bg-white p-2 shadow-2xl">
                                    <div
                                        class="w-full h-full rounded-full bg-gradient-to-br from-[#E54801] to-[#913327] flex items-center justify-center text-white text-4xl lg:text-5xl font-black">
                                        {{ userInitials }}
                                    </div>
                                </div>
                                <button
                                    class="absolute bottom-2 right-2 w-10 h-10 bg-[#1B0B38] text-white rounded-full flex items-center justify-center shadow-lg group-hover:bg-[#E54801] group-hover:scale-110 transition-all border-4 border-white">
                                    <i class="fas fa-camera text-sm"></i>
                                </button>
                            </div>

                            <h2 class="text-2xl font-black text-[#1B0B38] mb-1">
                                {{ authStore.user?.name || "Utilisateur" }}
                            </h2>
                            <div class="flex items-center justify-center gap-2 mb-4">
                                <span
                                    class="px-3 py-1 bg-[#E54801]/10 text-[#E54801] rounded-full text-[10px] font-black uppercase tracking-widest">{{
                                    roleLabel }}</span>
                                <slot name="badge-icon"></slot>
                            </div>
                            <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-6">
                                Inscrit depuis <span class="text-[#1B0B38]">{{ authDate }}</span>
                            </p>

                            <slot name="left-column-stats"></slot>
                        </div>
                    </div>

                    <slot name="left-column-bottom"></slot>
                </div>

                <!-- Centre et Droite: Formulaires et Extras -->
                <div class="md:col-span-12 lg:col-span-8 space-y-8">
                    <div class="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative overflow-hidden">
                        <!-- Accent Line -->
                        <div class="absolute top-0 left-0 w-1.5 h-full bg-[#E54801]"></div>

                        <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                            <div>
                                <h3 class="text-xl font-black text-[#1B0B38] mb-2">Informations Personnelles</h3>
                                <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Mettez à jour
                                    vos coordonnées publiques et privées</p>
                            </div>
                            <div
                                class="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-xl border border-green-100 self-start sm:self-auto">
                                <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                <span class="text-[9px] font-black text-green-600 uppercase tracking-widest">Compte
                                    Actif</span>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <!-- Nom -->
                            <div class="md:col-span-2">
                                <label
                                    class="block text-[9px] text-gray-400 font-black uppercase tracking-widest mb-2"><i
                                        class="fas fa-user text-[#E54801] mr-1"></i> Nom Complet</label>
                                <input type="text" v-model="form.name"
                                    class="w-full px-5 py-4 bg-[#FAF9F5] border border-gray-100 rounded-2xl text-sm font-bold text-[#1B0B38] focus:border-[#E54801] focus:ring-1 focus:ring-[#E54801] transition-all outline-none"
                                    placeholder="Votre nom complet" />
                            </div>

                            <!-- Email (Readonly) -->
                            <div class="md:col-span-2 relative">
                                <label
                                    class="block text-[9px] text-gray-400 font-black uppercase tracking-widest mb-2"><i
                                        class="fas fa-envelope text-[#E54801] mr-1"></i> Adresse Email</label>
                                <input type="email" v-model="form.email"
                                    class="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-medium text-gray-400 outline-none cursor-not-allowed pr-[90px]"
                                    readonly />
                                <span
                                    class="absolute right-4 top-[38px] px-2 py-1 bg-green-100 text-green-700 rounded-lg text-[9px] font-black uppercase tracking-widest border border-green-200"><i
                                        class="fas fa-check-circle mr-1"></i> Vérifié</span>
                            </div>

                            <!-- Téléphone -->
                            <div>
                                <label
                                    class="block text-[9px] text-gray-400 font-black uppercase tracking-widest mb-2"><i
                                        class="fas fa-phone-alt text-[#E54801] mr-1"></i> Téléphone</label>
                                <input type="tel" v-model="form.phone"
                                    class="w-full px-5 py-4 bg-[#FAF9F5] border border-gray-100 rounded-2xl text-sm font-bold text-[#1B0B38] focus:border-[#E54801] focus:ring-1 focus:ring-[#E54801] transition-all outline-none"
                                    placeholder="+237 ..." />
                            </div>

                            <!-- Ville -->
                            <div>
                                <label
                                    class="block text-[9px] text-gray-400 font-black uppercase tracking-widest mb-2"><i
                                        class="fas fa-map-marker-alt text-[#E54801] mr-1"></i> Ville de
                                    résidence</label>
                                <input type="text" v-model="form.city"
                                    class="w-full px-5 py-4 bg-[#FAF9F5] border border-gray-100 rounded-2xl text-sm font-bold text-[#1B0B38] focus:border-[#E54801] focus:ring-1 focus:ring-[#E54801] transition-all outline-none"
                                    placeholder="Ex: Yaoundé" />
                            </div>

                            <!-- Biographie / Présentation optionnelle -->
                            <div class="md:col-span-2" v-if="showBio">
                                <label
                                    class="block text-[9px] text-gray-400 font-black uppercase tracking-widest mb-2"><i
                                        class="fas fa-comment-dots text-[#E54801] mr-1"></i> Ma Présentation
                                    (Bio)</label>
                                <textarea v-model="form.bio" rows="4"
                                    class="w-full px-5 py-4 bg-[#FAF9F5] border border-gray-100 rounded-2xl text-sm font-bold text-[#1B0B38] focus:border-[#E54801] focus:ring-1 focus:ring-[#E54801] transition-all outline-none resize-none placeholder-gray-300"
                                    placeholder="Décrivez votre profil pour les autres utilisateurs..."></textarea>
                            </div>
                        </div>

                        <!-- Actions du formulaire -->
                        <div class="flex items-center justify-end gap-6 pt-6 border-t border-gray-50">
                            <transition name="fade">
                                <span v-if="saveMessage"
                                    class="text-[10px] font-black uppercase tracking-widest text-green-600 flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-lg">
                                    <i class="fas fa-check-circle text-lg"></i> {{ saveMessage }}
                                </span>
                            </transition>
                            <button @click="onSave" :disabled="isSaving"
                                class="px-8 py-4 bg-[#1B0B38] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#E54801] hover:scale-105 transition-all flex items-center gap-3 shadow-lg disabled:opacity-50 disabled:hover:scale-100">
                                <i v-if="isSaving" class="fas fa-circle-notch fa-spin"></i>
                                <i v-else class="fas fa-save"></i>
                                {{ isSaving ? "Sauvegarde en cours..." : "Sauvegarder le profil" }}
                            </button>
                        </div>
                    </div>

                    <slot name="right-column-extra"></slot>

                    <!-- Securité & Auth par défaut au cas où (si pas redéfini) -->
                    <div v-if="showSecurity"
                        class="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative overflow-hidden">
                        <h3
                            class="text-xs font-black text-[#1B0B38] uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                            <i class="fas fa-shield-halved text-[#E54801]"></i> Sécurité & Connexion
                        </h3>
                        <div class="space-y-4">
                            <div
                                class="flex items-center justify-between p-4 bg-[#FAF9F5] border border-gray-100 rounded-2xl group hover:border-gray-200 transition-colors">
                                <div class="flex items-center gap-4">
                                    <div
                                        class="w-10 h-10 bg-white shadow-sm text-[#E54801] rounded-xl flex items-center justify-center group-hover:bg-[#E54801] group-hover:text-white transition-colors">
                                        <i class="fas fa-lock"></i>
                                    </div>
                                    <div>
                                        <p class="text-[10px] font-black uppercase tracking-widest text-[#1B0B38]">
                                            Mot de passe
                                        </p>
                                        <p class="text-[9px] text-gray-400">Dernière modification : Inconnue</p>
                                    </div>
                                </div>
                                <button
                                    class="w-10 h-10 rounded-xl bg-white border border-gray-100 text-[#1B0B38] flex items-center justify-center hover:bg-[#1B0B38] hover:text-white transition-all shadow-sm">
                                    <i class="fas fa-pen text-sm"></i>
                                </button>
                            </div>
                            <slot name="security-extra"></slot>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </DashboardLayout>
</template>

<script setup>
import { computed } from "vue";
import DashboardLayout from "../../layouts/DashboardLayout.vue";
import { useAuthStore } from "../../stores/auth";

const props = defineProps({
    title: { type: String, default: "Mon Profil Personnel" },
    subtitle: { type: String, default: "Gérez vos informations et préférences" },
    headerIcon: { type: String, default: "" },
    roleLabel: { type: String, default: "Membre" },
    form: { type: Object, required: true },
    isSaving: { type: Boolean, default: false },
    saveMessage: { type: String, default: "" },
    showBio: { type: Boolean, default: false },
    showSecurity: { type: Boolean, default: true },
});

const emit = defineEmits(["save", "toggleSidebar"]);

const authStore = useAuthStore();

const userInitials = computed(() => {
    const name = authStore.user?.name || "U";
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
});

const authDate = computed(() => {
    const date = authStore.user?.created_at ? new Date(authStore.user.created_at) : new Date();
    return date.toLocaleDateString("fr-FR", { year: "numeric", month: "long" });
});

const onSave = () => {
    emit("save");
};

const toggleSidebar = () => {
    emit("toggleSidebar");
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

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
