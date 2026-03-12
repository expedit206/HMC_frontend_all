<template>
    <div v-if="allRoles.length > 1 || missingRoles.length > 0" class="mb-8 animate-fadeIn">
        <div class="bg-white rounded-[2rem] p-4 shadow-sm border border-gray-100 flex flex-wrap items-center gap-4">
            <!-- Label -->
            <div class="px-4 py-2 bg-gray-50 rounded-xl flex items-center gap-2">
                <i class="fas fa-user-shield text-[#1B0B38]"></i>
                <span class="text-xs font-black text-[#1B0B38] uppercase tracking-widest">Espaces disponibles</span>
            </div>

            <!-- Roles Actuels (Switch) -->
            <div class="flex flex-wrap items-center gap-2">
                <button v-for="r in allRoles" :key="r" @click="handleSwitch(r)" :disabled="r === currentRole" :class="[
                    'px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 group',
                    r === currentRole
                        ? 'bg-[#1B0B38] text-white shadow-lg scale-105'
                        : 'bg-white border border-gray-100 text-gray-500 hover:border-[#1B0B38] hover:text-[#1B0B38]'
                ]">
                    <i
                        :class="[getRoleIcon(r), r === currentRole ? 'text-white' : 'text-gray-400 group-hover:text-[#1B0B38]']"></i>
                    <span class="capitalize">{{ getRoleName(r) }}</span>
                    <i v-if="r === currentRole" class="fas fa-check-circle ml-1 opacity-70"></i>
                </button>
            </div>

            <!-- Divider if needed -->
            <div v-if="allRoles.length > 0 && missingRoles.length > 0"
                class="h-8 w-px bg-gray-100 hidden sm:block mx-1"></div>

            <!-- Roles à acquérir (Join) -->
            <div class="flex flex-wrap items-center gap-2">
                <button v-for="r in missingRoles" :key="r" @click="handleAcquire(r)"
                    class="px-4 py-2.5 bg-orange-50 text-[#E54801] border border-orange-100 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#E54801] hover:text-white transition-all flex items-center gap-2">
                    <i class="fas fa-plus-circle"></i>
                    <span>Devenir {{ getRoleName(r) }}</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore } from '../../stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const currentRole = computed(() => authStore.userRole);
const allRoles = computed(() => authStore.allRoles);

// Liste des rôles que l'on peut "activer" soi-même
const eligibleRoles = ['bailleur', 'prestataire', 'locataire'];

const missingRoles = computed(() => {
    return eligibleRoles.filter(r => !allRoles.value.includes(r));
});

const getRoleIcon = (r) => {
    const icons = {
        admin: "fas fa-shield-halved",
        agent: "fas fa-user-tie",
        bailleur: "fas fa-house-chimney-user",
        prestataire: "fas fa-tools",
        client: "fas fa-search",
        locataire: "fas fa-key",
    };
    return icons[r] || "fas fa-user-circle";
};

const getRoleName = (r) => {
    const names = {
        admin: "Administrateur",
        agent: "Agent Terrain",
        bailleur: "Bailleur",
        prestataire: "Prestataire",
        client: "Client",
        locataire: "Locataire",
    };
    return names[r] || r;
};

const handleSwitch = async (newRole) => {
    if (newRole === currentRole.value) return;

    const res = await authStore.switchRole(newRole);
    if (res.success) {
        const dashboards = {
            admin: "AdminDashboard",
            agent: "AgentDashboard",
            bailleur: "BailleurDashboard",
            prestataire: "PrestataireDashboard",
            client: "ClientDashboard",
            locataire: "LocataireDashboard",
        };
        if (dashboards[newRole]) {
            router.push({ name: dashboards[newRole] });
        }
    } else {
        alert(res.message);
    }
};

const handleAcquire = async (role) => {
    const confirmMsg = {
        bailleur: "Voulez-vous activer votre espace Bailleur pour publier et gérer vos biens ?",
        prestataire: "Voulez-vous devenir Prestataire pour proposer vos services sur la plateforme ?",
        locataire: "Souhaitez-vous activer votre espace Locataire pour vos locations en cours ?"
    };

    if (confirm(confirmMsg[role] || `Activer le rôle ${role} ?`)) {
        const res = await authStore.acquireRole(role);
        if (res.success) {
            alert(`Félicitations ! Votre espace ${getRoleName(role)} est maintenant activé.`);
            await handleSwitch(role);
        } else {
            alert(res.message);
        }
    }
};
</script>

<style scoped>
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fadeIn {
    animation: fadeIn 0.4s ease-out forwards;
}
</style>
