<template>
  <DashboardLayout title="Mon Espace Home Cameroon">
    <div class="max-w-[1600px] mx-auto w-full relative">
      <!-- Hero Banner -->
      <div
        class="relative bg-[#1B0B38] rounded-[2.5rem] p-8 lg:p-12 text-white overflow-hidden mb-12 shadow-2xl"
      >
        <div class="relative z-10 max-w-2xl">
          <h1 class="text-3xl md:text-4xl lg:text-5xl font-black mb-4">
            Bonjour,
            <span class="text-[#E54801]">{{ userName }}</span> !
          </h1>
          <p
            class="text-white/70 text-base md:text-lg font-medium leading-relaxed mb-8"
          >
            Votre espace personnel est prêt. Choisissez votre rôle pour
            maximiser votre expérience immobilière.
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <a
              href="#roles"
              class="px-8 py-4 bg-[#E54801] text-white rounded-2xl font-black hover:bg-[#913327] transition shadow-lg text-center flex items-center justify-center gap-2"
            >
              <i class="fas fa-bolt"></i> Découvrir les rôles
            </a>
            <RouterLink
              :to="{ name: 'Annonces', query: { search: '' } }"
              class="px-8 py-4 bg-white/10 backdrop-blur-md rounded-2xl font-black hover:bg-white/20 transition text-center"
            >
              Explorer les biens
            </RouterLink>
          </div>
        </div>
        <i
          class="fas fa-house-chimney absolute right-12 bottom-0 text-[200px] text-white/5 pointer-events-none transform translate-y-1/4"
        ></i>
      </div>

      <!-- NOTIFICATION PROCÉDURE EN COURS -->
      <div v-if="hasActiveProcedure" class="mb-12">
        <div
          class="bg-gradient-to-r from-blue-600 to-indigo-800 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg shadow-blue-500/20 transform hover:-translate-y-1 transition duration-300"
        >
          <div class="flex items-center gap-6">
            <div
              class="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-white text-2xl backdrop-blur-sm flex-shrink-0 border border-white/30"
            >
              <i class="fas fa-route"></i>
            </div>
            <div>
              <h3 class="text-xl font-black text-white mb-1">
                Vous avez une procédure locative en cours !
              </h3>
              <p class="text-blue-100 text-sm font-medium">
                Suivez l'avancement de vos visites, dossiers et paiements.
              </p>
            </div>
          </div>
          <RouterLink
            to="/mon-suivi"
            class="w-full md:w-auto px-8 py-4 bg-white text-blue-700 rounded-xl font-black hover:bg-gray-50 transition shadow-md whitespace-nowrap text-center"
          >
            Voir mon suivi <i class="fas fa-arrow-right ml-2"></i>
          </RouterLink>
        </div>
      </div>

      <!-- Section Rôles -->
      <section id="roles" class="mb-16">
        <div class="text-center max-w-3xl mx-auto mb-12">
          <h2 class="text-2xl md:text-3xl font-black text-[#1B0B38] mb-4">
            Choisissez votre rôle
            <span class="text-[#E54801]">HomeCameroon</span>
          </h2>
          <p class="text-gray-600">
            Rejoignez notre communauté et bénéficiez d'avantages exclusifs
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div
            v-for="role in roles"
            :key="role.label"
            class="bg-white rounded-3xl p-6 shadow-sm border hover:shadow-lg transition-all group cursor-pointer"
            :class="role.border"
          >
            <div class="flex gap-5 mb-6">
              <div
                :class="`w-14 h-14 ${role.bg} ${role.color} rounded-2xl flex items-center justify-center text-xl flex-shrink-0`"
              >
                <i :class="`fas fa-${role.icon}`"></i>
              </div>
              <div>
                <h3 class="text-lg font-bold text-[#1B0B38] mb-2">
                  {{ role.title }}
                </h3>
                <p class="text-sm text-gray-500">{{ role.desc }}</p>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <span
                :class="`text-xs font-bold ${role.color} ${role.bg} px-3 py-1 rounded-full`"
                >{{ role.badge }}</span
              >
              <RouterLink
                :to="role.link"
                :class="`${role.textColor} font-bold text-sm hover:underline`"
              >
                {{ role.cta }} <i class="fas fa-arrow-right ml-1 text-xs"></i>
              </RouterLink>
            </div>
          </div>
        </div>

        <!-- Bannière conseil -->
        <div
          class="bg-gradient-to-r from-[#E54801]/10 to-[#913327]/10 rounded-3xl p-8 mb-12"
        >
          <div
            class="flex flex-col md:flex-row items-center justify-between gap-4"
          >
            <div>
              <h3 class="text-2xl font-black text-[#1B0B38] mb-2">
                Vous hésitez sur le rôle à choisir ?
              </h3>
              <p class="text-gray-600">
                Nos conseillers sont à votre disposition
              </p>
            </div>
            <RouterLink
              :to="{ name: 'Assistance' }"
              class="px-8 py-4 bg-[#E54801] text-white rounded-2xl font-bold hover:bg-[#913327] transition shadow-lg whitespace-nowrap flex items-center gap-2"
            >
              <i class="fas fa-comment-dots"></i> Parler à un conseiller
            </RouterLink>
          </div>
        </div>
      </section>

      <!-- Grille principale -->
      <div class="grid grid-cols-1 xl:grid-cols-3 gap-12">
        <!-- Colonne principale -->
        <div class="xl:col-span-2 space-y-12">
          <!-- Annonces à la une -->
          <section>
            <div class="flex justify-between items-end mb-8">
              <div>
                <h2 class="text-2xl font-black text-[#1B0B38] italic">
                  Annonces à la une
                </h2>
                <p class="text-sm text-gray-400 font-medium">
                  Découvrez notre sélection exclusive
                </p>
              </div>
              <RouterLink
                :to="{ name: 'Annonces' }"
                class="text-[#E54801] font-black text-xs uppercase tracking-widest hover:underline"
                >Tout voir</RouterLink
              >
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div
                v-for="listing in featuredListings"
                :key="listing.title"
                class="bg-white p-5 rounded-[2.5rem] shadow-sm border border-gray-50 hover:shadow-lg transition group"
              >
                <div
                  class="relative h-56 rounded-[1.8rem] overflow-hidden mb-5"
                >
                  <img
                    :src="listing.img"
                    :alt="listing.title"
                    class="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />
                  <button
                    class="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full text-[#E54801] flex items-center justify-center shadow-md"
                  >
                    <i class="fas fa-heart"></i>
                  </button>
                </div>
                <h3 class="font-bold text-[#1B0B38] text-lg px-2">
                  {{ listing.title }}
                </h3>
                <p
                  class="text-xs text-gray-400 font-bold uppercase tracking-wider mb-4 px-2"
                >
                  {{ listing.location }}
                </p>
                <div
                  class="flex justify-between items-center p-4 border-t border-gray-50"
                >
                  <span class="text-[#E54801] font-black">{{
                    listing.price
                  }}</span>
                  <RouterLink
                    :to="{ name: 'DetailAnnonce', params: { id: 1 } }"
                    class="w-10 h-10 rounded-xl bg-[#1B0B38] text-white flex items-center justify-center hover:bg-[#E54801] transition shadow-md"
                  >
                    <i class="fas fa-arrow-right"></i>
                  </RouterLink>
                </div>
              </div>
            </div>
          </section>

          <!-- Marketplace -->
          <section>
            <div class="flex justify-between items-end mb-8">
              <div>
                <h2 class="text-2xl font-black text-[#1B0B38] italic">
                  Marketplace HMC
                </h2>
                <p class="text-sm text-gray-400 font-medium">
                  Équipez votre intérieur en un clic
                </p>
              </div>
              <RouterLink
                :to="{ name: 'MarketplaceIndex' }"
                class="text-[#E54801] font-black text-xs uppercase tracking-widest hover:underline"
                >Accéder au market</RouterLink
              >
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-6">
              <div
                v-for="item in marketItems"
                :key="item.name"
                class="bg-white p-4 rounded-3xl shadow-sm border border-gray-50 hover:border-[#E54801] transition text-center group"
              >
                <div class="h-32 rounded-2xl overflow-hidden mb-4 bg-gray-50">
                  <img
                    :src="item.img"
                    :alt="item.name"
                    class="w-full h-full object-cover group-hover:scale-110 transition"
                  />
                </div>
                <h4 class="font-bold text-sm text-[#1B0B38]">
                  {{ item.name }}
                </h4>
                <p class="text-[#E54801] font-black mt-1">{{ item.price }}</p>
              </div>
            </div>
          </section>
        </div>

        <!-- Sidebar droite -->
        <div class="space-y-12">
          <!-- Tendances Immo -->
          <section
            class="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-50"
          >
            <h3 class="text-xl font-black text-[#1B0B38] italic mb-6">
              Tendances Immo
            </h3>
            <div class="space-y-6">
              <div v-for="trend in trends" :key="trend.city" class="flex gap-4">
                <div
                  :class="`w-12 h-12 ${trend.bg} ${trend.color} rounded-2xl flex items-center justify-center flex-shrink-0`"
                >
                  <i class="fas fa-location-dot"></i>
                </div>
                <div>
                  <p class="text-sm font-bold text-[#1B0B38]">
                    {{ trend.city }}
                  </p>
                  <p
                    class="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1"
                  >
                    {{ trend.stat }}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <!-- CTA Pro -->
          <section
            class="bg-[#1B0B38] p-8 rounded-[2.5rem] text-white relative overflow-hidden shadow-xl"
          >
            <div class="relative z-10">
              <h3 class="text-xl font-black italic mb-3">🚀 Devenir Pro ?</h3>
              <p class="text-white/70 text-sm mb-6">
                Maximisez vos revenus avec HomeCameroon
              </p>
              <div class="space-y-4">
                <RouterLink
                  :to="{ name: 'BailleurFormulaire' }"
                  class="block w-full px-6 py-4 bg-[#E54801] text-white text-center rounded-xl font-bold hover:bg-[#913327] transition shadow-md flex items-center justify-center gap-3"
                >
                  <i class="fas fa-building"></i> Publier un bien
                </RouterLink>
                <RouterLink
                  :to="{ name: 'AgentInscription' }"
                  class="block w-full px-6 py-4 bg-white/20 backdrop-blur text-white text-center rounded-xl font-bold hover:bg-white/30 transition flex items-center justify-center gap-3"
                >
                  <i class="fas fa-user-tie"></i> Rejoindre le réseau
                </RouterLink>
              </div>
            </div>
            <i
              class="fas fa-chart-line absolute -right-4 -bottom-4 text-7xl text-white/10 transform rotate-12"
            ></i>
          </section>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { RouterLink, useRouter } from "vue-router";
import DashboardLayout from "../../layouts/DashboardLayout.vue";
import { useAuthStore } from "../../stores/auth";
import { useRentalStore } from "../../stores/rental";

const router = useRouter();

const authStore = useAuthStore();
const rentalStore = useRentalStore();

const userName = computed(() => {
  if (!authStore.user) return "Client";
  return authStore.user.name.split(" ")[0] || "Client";
});

const hasActiveProcedure = computed(() => {
  // A-t-il des visites ou dossiers en cours ?
  const hasVisits = rentalStore.visits.some((v) =>
    ["pending", "confirmed", "completed"].includes(v.status),
  );
  const hasApps = rentalStore.applications.some((a) =>
    ["pending", "validated", "under_review"].includes(a.status),
  );
  return hasVisits || hasApps;
});

onMounted(() => {
  rentalStore.fetchVisits();
  rentalStore.fetchApplications();
});

const roles = [
  {
    icon: "key",
    title: "Louer un bien",
    desc: "Trouvez votre logement idéal simplement",
    badge: "Accès gratuit",
    bg: "bg-blue-50",
    color: "text-blue-600",
    textColor: "text-blue-600",
    border: "border-blue-100",
    link: { name: "Annonces", query: { search: "" } },
    cta: "Explorer",
  },
  {
    icon: "building",
    title: "Publier un bien",
    desc: "Générez des revenus avec vos biens",
    badge: "+25% revenus",
    bg: "bg-orange-50",
    color: "text-[#E54801]",
    textColor: "text-[#E54801]",
    border: "border-orange-100",
    link: { name: "BailleurFormulaire" },
    cta: "Commencer",
  },
  {
    icon: "tools",
    title: "Proposer un service",
    desc: "Offrez vos services à notre communauté",
    badge: "Nouveaux clients",
    bg: "bg-purple-50",
    color: "text-purple-600",
    textColor: "text-purple-600",
    border: "border-purple-100",
    link: { name: "PrestataireInscription" },
    cta: "Proposer",
  },
  {
    icon: "user-tie",
    title: "Rejoindre le réseau",
    desc: "Rejoignez notre réseau certifié d'agents",
    badge: "Certifié HMC",
    bg: "bg-green-50",
    color: "text-green-600",
    textColor: "text-green-600",
    border: "border-green-100",
    link: { name: "AgentInscription" },
    cta: "Postuler",
  },
];

const featuredListings = [
  {
    title: "Appartement Grand Luxe",
    location: "Yaoundé • Bastos",
    price: "250 000 FCFA/mois",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=500&q=80",
  },
  {
    title: "Villa Contemporaine",
    location: "Douala • Akwa",
    price: "600 000 FCFA/mois",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=500&q=80",
  },
];

const marketItems = [
  {
    name: "Canapé Nordique",
    price: "185 000 FCFA",
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Luminaire Design",
    price: "45 000 FCFA",
    img: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Bureau Minimaliste",
    price: "75 000 FCFA",
    img: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=300&q=80",
  },
];

const trends = [
  {
    city: "Yaoundé (Bastos)",
    stat: "Prix : +5.2%",
    bg: "bg-orange-50",
    color: "text-[#E54801]",
  },
  {
    city: "Douala (Akwa)",
    stat: "Demande élevée",
    bg: "bg-blue-50",
    color: "text-blue-500",
  },
  {
    city: "Douala (Bonapriso)",
    stat: "Prix : +3.1%",
    bg: "bg-green-50",
    color: "text-green-500",
  },
];
</script>

<style scoped>
.sidebar-link.active {
  background-color: #1b0b38;
  color: white;
  box-shadow: 0 4px 15px rgba(27, 11, 56, 0.2);
}
.sidebar-link.active i {
  color: white;
}
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 10px;
}
</style>
