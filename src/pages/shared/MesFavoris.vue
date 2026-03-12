<template>
  <DashboardLayout>

    <div class="max-w-6xl mx-auto">
      <div class="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 class="text-2xl font-bold text-gray-900 leading-tight">
            Mes Coups de Cœur
          </h1>
          <p class="text-gray-500 text-sm mt-1 font-medium tracking-wide">
            Retrouvez les annonces que vous avez sauvegardées pour plus tard.
          </p>
        </div>
        <div class="flex gap-2" v-if="favorites.length > 0">
          <span class="px-5 py-2.5 bg-[#E54801]/10 text-[#E54801] rounded-xl text-xs font-bold uppercase">{{
            favorites.length }}
            {{
              favorites.length > 1
                ? "Favoris Enregistrés"
                : "Favori Enregistré"
            }}</span>
        </div>
      </div>

      <!-- Favorites Grid -->
      <div v-if="isLoading"
        class="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-gray-100 italic text-gray-400">
        <i class="fas fa-circle-notch fa-spin text-2xl mb-2 text-[#E54801]"></i>
        Chargement de vos favoris...
      </div>

      <template v-else-if="favorites.length > 0">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="fav in favorites" :key="fav.id"
            class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden group relative">
            <div class="h-48 overflow-hidden relative">
              <img :src="fav.property?.primary_image?.path ||
                'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80'
                " class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <button @click="removeFavorite(fav.property_id)"
                class="absolute top-4 right-4 w-10 h-10 bg-white text-red-500 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-all outline-none"
                title="Retirer des favoris">
                <i class="fas fa-heart"></i>
              </button>
            </div>
            <div class="p-6">
              <div class="flex justify-between items-start mb-2">
                <h3 class="text-base font-bold text-[#1B0B38] leading-tight line-clamp-1">
                  {{ fav.property?.title }}
                </h3>
                <div class="text-right">
                  <p class="text-md font-black text-[#E54801]">
                    {{ formatPrice(fav.property?.price) }}
                    <span class="text-[8px]">XAF</span>
                  </p>
                </div>
              </div>
              <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-4">
                <i class="fas fa-map-marker-alt text-[#E54801] mr-1"></i>
                {{ fav.property?.location }}
              </p>
              <div class="flex items-center gap-4 text-xs text-gray-500 font-medium mb-6 pt-4 border-t border-gray-50">
                <span><i class="fas fa-bed text-[#E54801] mr-1"></i>
                  {{ fav.property?.bedrooms || 0 }}</span>
                <span><i class="fas fa-bath text-[#E54801] mr-1"></i>
                  {{ fav.property?.bathrooms || 0 }}</span>
                <span><i class="fas fa-ruler-combined text-[#E54801] mr-1"></i>
                  {{ fav.property?.area || 0 }}m²</span>
              </div>
              <RouterLink :to="`/annonces/${fav.property_id}`"
                class="block w-full py-3 bg-[#1B0B38] text-white rounded-xl text-[10px] font-black uppercase tracking-widest text-center hover:bg-[#E54801] transition-all">
                Voir l'annonce</RouterLink>
            </div>
          </div>
        </div>
      </template>

      <!-- Empty State -->
      <div v-else class="bg-white rounded-3xl p-20 text-center border border-dashed border-gray-200">
        <div
          class="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center text-[#E54801] text-3xl mx-auto mb-8 animate-pulse">
          <i class="fas fa-heart-broken"></i>
        </div>
        <h3 class="text-2xl font-black text-[#1B0B38] uppercase tracking-tight">
          Aucun favori pour l'instant
        </h3>
        <p class="text-gray-400 mt-4 max-w-sm mx-auto font-medium leading-relaxed">
          Parcourez nos annonces et cliquez sur le petit cœur pour sauvegarder
          vos propriétés préférées ici.
        </p>
        <RouterLink to="/annonces"
          class="inline-block mt-10 px-10 py-4 bg-[#E54801] text-white rounded-xl text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-orange-100">
          Découvrir des annonces
        </RouterLink>
      </div>
    </div>


  </DashboardLayout>
</template>

<script setup>
const logout = async () => {
  await authStore.logout();
  router.push("/auth/connexion");
};
</script>

<style scoped>
.sidebar-link.active {
  background-color: #e54801;
  color: white;
  box-shadow: 0 4px 12px rgba(229, 72, 1, 0.2);
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e54801;
  border-radius: 10px;
}
</style>
