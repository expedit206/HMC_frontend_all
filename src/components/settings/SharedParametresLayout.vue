<template>
    <DashboardLayout :title="title">
        <div class="max-w-3xl mx-auto">
            <div
                class="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-fadeIn">
                <div>
                    <h1 class="text-2xl font-black text-[#1B0B38] mb-2">
                        {{ title }}
                    </h1>
                    <p class="text-gray-500">
                        {{ subtitle }}
                    </p>
                </div>
                <button @click="toggleSidebar"
                    class="lg:hidden w-12 h-12 flex items-center justify-center bg-white rounded-2xl shadow-sm border border-gray-100 text-gray-500 hover:text-[#E54801] transition-colors">
                    <i class="fas fa-bars text-xl"></i>
                </button>
            </div>

            <!-- Tabs -->
            <div class="flex flex-wrap border-b border-gray-200 mb-8 animate-slide-up overflow-x-auto no-scrollbar">
                <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id" :class="[
                    'px-6 py-4 font-bold text-sm transition-colors relative whitespace-nowrap',
                    activeTab === tab.id
                        ? 'text-[#E54801]'
                        : 'text-gray-500 hover:text-gray-900',
                ]">
                    {{ tab.label }}
                    <div v-if="activeTab === tab.id" class="absolute bottom-0 left-0 w-full h-0.5 bg-[#E54801]"></div>
                </button>
            </div>

            <!-- Dynamic Tab Content -->
            <div class="animate-slide-up" style="animation-delay: 0.1s">
                <slot :name="activeTab"></slot>

                <!-- SECURITY DEFAULT TAB CONTENT -->
                <div v-if="activeTab === 'security'" class="space-y-6">
                    <slot name="security-content">
                        <div class="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-50">
                            <h2 class="text-lg font-bold text-[#1B0B38] mb-6 flex items-center gap-3">
                                <div
                                    class="w-10 h-10 rounded-xl bg-orange-50 text-[#E54801] flex items-center justify-center">
                                    <i class="fas fa-lock"></i>
                                </div>
                                Mot de passe
                            </h2>
                            <form @submit.prevent="$emit('updatePassword', passwordForm)" class="space-y-4">
                                <div>
                                    <label class="block text-sm font-bold text-[#1B0B38] mb-2">Mot de passe
                                        actuel</label>
                                    <input v-model="passwordForm.current" type="password"
                                        class="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E54801] transition" />
                                </div>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label class="block text-sm font-bold text-[#1B0B38] mb-2">Nouveau mot de
                                            passe</label>
                                        <input v-model="passwordForm.new" type="password"
                                            class="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E54801] transition" />
                                    </div>
                                    <div>
                                        <label class="block text-sm font-bold text-[#1B0B38] mb-2">Confirmer</label>
                                        <input v-model="passwordForm.confirm" type="password"
                                            class="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E54801] transition" />
                                    </div>
                                </div>
                                <div class="pt-4 flex justify-end">
                                    <button type="submit"
                                        class="px-6 py-3 bg-[#1B0B38] text-white font-bold rounded-xl hover:bg-opacity-90 transition shadow-lg flex items-center gap-2">
                                        <span v-if="isUpdatingPassword"><i
                                                class="fas fa-spinner animate-spin"></i></span>
                                        Mettre à jour
                                    </button>
                                </div>
                            </form>
                        </div>

                        <!-- Danger Zone -->
                        <div class="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-50 mt-6">
                            <h2 class="text-lg font-bold text-red-600 mb-6 flex items-center gap-3">
                                <div
                                    class="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center">
                                    <i class="fas fa-user-slash"></i>
                                </div>
                                Zone de danger
                            </h2>
                            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                    <p class="font-bold text-gray-900">Supprimer mon compte</p>
                                    <p class="text-sm text-gray-500">
                                        Cette action est irréversible et supprimera toutes vos données.
                                    </p>
                                </div>
                                <button @click="$emit('deleteAccount')"
                                    class="whitespace-nowrap px-4 py-2 border border-red-200 text-red-600 font-bold rounded-xl hover:bg-red-50 transition">
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    </slot>
                </div>

                <!-- NOTIFICATIONS DEFAULT TAB CONTENT -->
                <div v-if="activeTab === 'notifications'" class="space-y-6">
                    <slot name="notifications-content">
                        <div class="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-50">
                            <h2 class="text-lg font-bold text-[#1B0B38] mb-6 flex items-center gap-3">
                                <div
                                    class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                    <i class="fas fa-bell"></i>
                                </div>
                                Préférences email
                            </h2>

                            <div class="space-y-4">
                                <label v-for="(pref, key) in notificationPrefs" :key="key"
                                    class="flex items-center justify-between p-4 bg-gray-50 rounded-2xl cursor-pointer hover:bg-gray-100 transition">
                                    <div class="flex items-center gap-4">
                                        <input type="checkbox" v-model="pref.checked"
                                            class="w-5 h-5 text-[#E54801] rounded border-gray-300 focus:ring-[#E54801]" />
                                        <div>
                                            <p class="font-bold text-[#1B0B38]">{{ pref.title }}</p>
                                            <p class="text-xs text-gray-500">{{ pref.desc }}</p>
                                        </div>
                                    </div>
                                </label>
                            </div>

                            <div class="pt-6 flex justify-end">
                                <button @click="$emit('saveNotifications', notificationPrefs)"
                                    class="px-6 py-3 bg-[#E54801] text-white font-bold rounded-xl hover:bg-[#913327] transition shadow-lg flex items-center gap-2">
                                    <span v-if="isSavingNotifications"><i
                                            class="fas fa-spinner animate-spin"></i></span>
                                    Enregistrer les préférences
                                </button>
                            </div>
                        </div>
                    </slot>
                </div>
            </div>
        </div>
    </DashboardLayout>
</template>

<script setup>
import { ref, reactive } from "vue";
import DashboardLayout from "../../layouts/DashboardLayout.vue";

const props = defineProps({
    title: { type: String, default: "Paramètres" },
    subtitle: { type: String, default: "Gérez vos préférences et sécurisez votre accès." },
    tabs: {
        type: Array,
        default: () => [
            { id: "security", label: "Sécurité" },
            { id: "notifications", label: "Notifications" }
        ]
    },
    defaultTab: { type: String, default: "security" },
    isUpdatingPassword: { type: Boolean, default: false },
    isSavingNotifications: { type: Boolean, default: false },
    // Default values for standard notifications
    defaultNotificationPrefs: {
        type: Object,
        default: () => ({
            alerts: { checked: true, title: "Nouvelles annonces", desc: "Recevoir des alertes pour les biens correspondants" },
            newsletter: { checked: true, title: "Newsletter HMC", desc: "Actualités du marché et conseils immo" },
            partners: { checked: false, title: "Offres partenaires", desc: "Promotions exclusives de nos partenaires" }
        })
    }
});

const emit = defineEmits(["toggleSidebar", "updatePassword", "deleteAccount", "saveNotifications"]);

const activeTab = ref(props.defaultTab);

const passwordForm = reactive({
    current: "",
    new: "",
    confirm: ""
});

const notificationPrefs = reactive({ ...props.defaultNotificationPrefs });

const toggleSidebar = () => {
    emit("toggleSidebar");
};
</script>

<style scoped>
.animate-fadeIn {
    animation: fadeIn 0.5s ease-out forwards;
    opacity: 0;
}

.animate-slide-up {
    animation: slideUp 0.5s ease-out forwards;
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

@keyframes slideUp {
    from {
        transform: translateY(20px);
        opacity: 0;
    }

    to {
        transform: translateY(0);
        opacity: 1;
    }
}
</style>
