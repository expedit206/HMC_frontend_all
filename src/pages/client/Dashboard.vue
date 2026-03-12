<template>
  <DashboardLayout title="Mon Espace Home Cameroon">
<<<<<<< HEAD
    <div class="max-w-[1600px] mx-auto w-full relative">
      <!-- Hero Banner -->
      <div
        class="relative bg-primary rounded-[2.5rem] p-8 lg:p-12 text-primary-foreground overflow-hidden mb-12 shadow-2xl"
      >
        <div class="relative z-10 max-w-2xl">
          <h1 class="text-3xl md:text-4xl lg:text-5xl font-black mb-4">
            Bonjour,
            <span class="text-secondary">{{ userName }}</span> !
          </h1>
          <p
            class="text-primary-foreground/70 text-base md:text-lg font-medium leading-relaxed mb-8"
          >
            Votre espace personnel est prêt. Choisissez votre rôle pour
            maximiser votre expérience immobilière.
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <a
              href="#roles"
              class="px-8 py-4 bg-secondary text-secondary-foreground rounded-2xl font-black hover:bg-secondary/90 transition shadow-lg text-center flex items-center justify-center gap-2"
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
=======
    <div class="max-w-[1600px] mx-auto w-full pb-12">
      <!-- Role Switcher -->
      <DashboardRoleSwitcher />
>>>>>>> 5a2a46c7f02e0d67ceec2d1b8986a306eabf911a

      <!-- HEADER: Greeting & Quick Stats -->
      <header class="mb-10">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 class="text-3xl md:text-4xl font-black text-[#1B0B38] mb-2 flex items-center gap-3">
              Bonjour, {{ userName }} <span class="text-3xl">👋</span>
            </h1>
            <p class="text-gray-500 font-medium">Bienvenue dans votre espace personnel Home Cameroon.</p>
          </div>

          <!-- Stats Cards -->
          <div class="flex flex-wrap gap-4">
            <div
<<<<<<< HEAD
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
            class="w-full md:w-auto px-8 py-4 bg-white text-blue-700 rounded-xl font-black hover:bg-gray-50 dark:hover:bg-gray-100 transition shadow-md whitespace-nowrap text-center"
          >
            Voir mon suivi <i class="fas fa-arrow-right ml-2"></i>
          </RouterLink>
        </div>
      </div>

      <!-- Section Rôles -->
      <section id="roles" class="mb-16">
        <div class="text-center max-w-3xl mx-auto mb-12">
          <h2 class="text-2xl md:text-3xl font-black text-foreground mb-4">
            Choisissez votre rôle
            <span class="text-secondary">HomeCameroon</span>
          </h2>
          <p class="text-muted-foreground">
            Rejoignez notre communauté et bénéficiez d'avantages exclusifs
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div
            v-for="role in roles"
            :key="role.label"
            class="bg-card rounded-3xl p-6 shadow-sm border hover:shadow-lg transition-all group cursor-pointer"
            :class="role.border"
          >
            <div class="flex gap-5 mb-6">
              <div
                :class="`w-14 h-14 ${role.bg} ${role.color} rounded-2xl flex items-center justify-center text-xl flex-shrink-0`"
              >
                <i :class="`fas fa-${role.icon}`"></i>
              </div>
              <div>
                <h3 class="text-lg font-bold text-foreground mb-2">
                  {{ role.title }}
                </h3>
                <p class="text-sm text-muted-foreground">{{ role.desc }}</p>
=======
              class="bg-white px-6 py-4 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4 min-w-[160px]">
              <div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-xl">
                <i class="fas fa-calendar-check"></i>
              </div>
              <div>
                <p class="text-2xl font-black text-[#1B0B38]">{{ stats.visits }}</p>
                <p class="text-xs text-gray-400 font-bold uppercase">Visites</p>
>>>>>>> 5a2a46c7f02e0d67ceec2d1b8986a306eabf911a
              </div>
            </div>

            <div
              class="bg-white px-6 py-4 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4 min-w-[160px]">
              <div class="w-12 h-12 bg-orange-50 text-[#E54801] rounded-2xl flex items-center justify-center text-xl">
                <i class="fas fa-file-invoice"></i>
              </div>
              <div>
                <p class="text-2xl font-black text-[#1B0B38]">{{ stats.apps }}</p>
                <p class="text-xs text-gray-400 font-bold uppercase">Dossiers</p>
              </div>
            </div>

            <div
              class="bg-white px-6 py-4 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4 min-w-[160px]">
              <div class="w-12 h-12 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center text-xl">
                <i class="fas fa-heart"></i>
              </div>
              <div>
                <p class="text-2xl font-black text-[#1B0B38]">{{ stats.favs }}</p>
                <p class="text-xs text-gray-400 font-bold uppercase">Favoris</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div class="grid grid-cols-1 xl:grid-cols-3 gap-8">

        <!-- MAIN COLUMN (LEFT) -->
        <div class="xl:col-span-2 space-y-8">

          <!-- ACTIVE PROCEDURE TRACKER -->
          <section v-if="hasActiveProcedure"
            class="bg-[#1B0B38] rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
            <div class="relative z-10">
              <div class="flex items-center justify-between mb-8">
                <div>
                  <h2 class="text-2xl font-black mb-1">Ma Procédure en cours</h2>
                  <p class="text-white/60 text-sm">Suivez l'avancement de votre recherche de logement</p>
                </div>
                <RouterLink to="/mon-suivi"
                  class="px-5 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl transition font-bold text-sm backdrop-blur-sm border border-white/10">
                  Détails <i class="fas fa-external-link-alt ml-2 text-[10px]"></i>
                </RouterLink>
              </div>

              <!-- Progress Steps -->
              <div class="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-4 relative">
                <!-- Line background -->
                <div class="hidden md:block absolute top-6 left-12 right-12 h-1 bg-white/10 rounded-full"></div>

                <div v-for="(step, idx) in procedureSteps" :key="idx"
                  class="relative z-10 flex md:flex-col items-center gap-4 md:text-center md:flex-1">
                  <div :class="[
                    'w-12 h-12 rounded-2xl flex items-center justify-center text-lg border-2 transition-all duration-500',
                    step.status === 'completed' ? 'bg-[#28d74e] border-[#28d74e] text-white shadow-[0_0_20px_rgba(40,215,78,0.4)]' :
                      step.status === 'active' ? 'bg-[#E54801] border-[#E54801] text-white animate-pulse' :
                        'bg-[#1B0B38] border-white/20 text-white/30'
                  ]">
                    <i :class="step.status === 'completed' ? 'fas fa-check' : step.icon"></i>
                  </div>
                  <div>
                    <p
                      :class="['text-xs font-black uppercase tracking-widest', step.status === 'current' ? 'text-[#E54801]' : 'text-white/40']">
                      {{ step.label }}
                    </p>
                    <p class="font-bold text-sm" :class="step.status === 'pending' ? 'text-white/20' : 'text-white'">{{
                      step.title }}</p>
                  </div>
                </div>
              </div>
            </div>
            <!-- Decor -->
            <i
              class="fas fa-route absolute right-[-20px] bottom-[-20px] text-[150px] text-white/5 transform -rotate-12 pointer-events-none"></i>
          </section>

          <!-- EMPTY STATE / WELCOME CARD (If no procedure) -->
          <section v-else
            class="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-[2.5rem] p-10 border border-indigo-100 flex flex-col md:flex-row items-center gap-8">
            <div
              class="w-32 h-32 bg-white rounded-3xl shadow-xl flex items-center justify-center text-5xl text-indigo-600 flex-shrink-0 border-4 border-indigo-100/50">
              <i class="fas fa-laptop"></i>
            </div>
            <div class="text-center md:text-left">
              <h2 class="text-2xl font-black text-[#1B0B38] mb-3">Prêt à emménager ?</h2>
              <p class="text-gray-600 mb-6 max-w-lg">Commencez par explorer nos annonces vérifiées par nos agents
                terrain pour trouver la perle rare.</p>
              <RouterLink :to="{ name: 'Annonces' }"
                class="inline-flex items-center gap-3 px-8 py-4 bg-[#1B0B38] text-white rounded-2xl font-black hover:bg-[#E54801] transition shadow-lg">
                <i class="fas fa-search"></i> Lancer une recherche
              </RouterLink>
            </div>
          </section>

<<<<<<< HEAD
        <!-- Bannière conseil -->
        <div
          class="bg-gradient-to-r from-secondary/10 to-secondary/20 rounded-3xl p-8 mb-12"
        >
          <div
            class="flex flex-col md:flex-row items-center justify-between gap-4"
          >
            <div>
              <h3 class="text-2xl font-black text-foreground mb-2">
                Vous hésitez sur le rôle à choisir ?
              </h3>
              <p class="text-muted-foreground">
                Nos conseillers sont à votre disposition
              </p>
            </div>
            <RouterLink
              :to="{ name: 'Assistance' }"
              class="px-8 py-4 bg-secondary text-secondary-foreground rounded-2xl font-bold hover:bg-secondary/90 transition shadow-lg whitespace-nowrap flex items-center gap-2"
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
                <h2 class="text-2xl font-black text-foreground italic">
                  Annonces à la une
                </h2>
                <p class="text-sm text-muted-foreground font-medium">
                  Découvrez notre sélection exclusive
                </p>
              </div>
              <RouterLink
                :to="{ name: 'Annonces' }"
                class="text-secondary font-black text-xs uppercase tracking-widest hover:underline"
                >Tout voir</RouterLink
              >
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div
                v-for="listing in featuredListings"
                :key="listing.title"
                class="bg-card p-5 rounded-[2.5rem] shadow-sm border border-border hover:shadow-lg transition group"
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
                    class="absolute top-4 right-4 w-10 h-10 bg-card/90 backdrop-blur rounded-full text-secondary flex items-center justify-center shadow-md border border-border"
                  >
                    <i class="fas fa-heart"></i>
                  </button>
                </div>
                <h3 class="font-bold text-foreground text-lg px-2">
                  {{ listing.title }}
                </h3>
                <p
                  class="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-4 px-2"
                >
                  {{ listing.location }}
                </p>
                <div
                  class="flex justify-between items-center p-4 border-t border-border"
                >
                  <span class="text-secondary font-black">{{
                    listing.price
                  }}</span>
                  <RouterLink
                    :to="{ name: 'DetailAnnonce', params: { id: 1 } }"
                    class="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:bg-secondary transition shadow-md"
                  >
                    <i class="fas fa-arrow-right"></i>
                  </RouterLink>
=======
          <!-- RECOMMENDED LISTINGS -->
          <section>
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-xl font-black text-[#1B0B38] flex items-center gap-3">
                <i class="fas fa-star text-orange-400"></i> Sélectionnés pour vous
              </h3>
              <RouterLink :to="{ name: 'Annonces' }" class="text-sm font-bold text-[#E54801] hover:underline">Tout voir
              </RouterLink>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div v-for="listing in featuredListings" :key="listing.title"
                class="group bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition duration-500">
                <div class="relative h-52 overflow-hidden">
                  <img :src="listing.img" :alt="listing.title"
                    class="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div class="absolute bottom-4 left-4">
                    <span
                      class="bg-[#E54801] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">Exclusivité
                      HMC</span>
                  </div>
                  <button
                    class="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full text-red-500 flex items-center justify-center shadow-md hover:scale-110 transition">
                    <i class="fas fa-heart"></i>
                  </button>
                </div>
                <div class="p-5">
                  <div class="flex justify-between items-start mb-2">
                    <h4 class="font-black text-lg text-[#1B0B38] truncate">{{ listing.title }}</h4>
                    <span class="text-[#E54801] font-black">{{ listing.price }}</span>
                  </div>
                  <p class="text-sm text-gray-400 font-bold mb-4"><i class="fas fa-map-marker-alt mr-2"></i>{{
                    listing.location }}</p>
                  <div class="flex items-center gap-4 text-xs text-gray-500 font-bold border-t border-gray-50 pt-4">
                    <span class="flex items-center gap-2"><i class="fas fa-bed text-blue-500"></i> 3 Ch.</span>
                    <span class="flex items-center gap-2"><i class="fas fa-bath text-blue-500"></i> 2 Sdb.</span>
                    <span class="flex items-center gap-2"><i class="fas fa-vector-square text-blue-500"></i>
                      120m²</span>
                    <RouterLink :to="{ name: 'DetailAnnonce', params: { slug: listing.slug } }"
                      class="ml-auto w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-[#1B0B38] hover:bg-[#1B0B38] hover:text-white transition">
                      <i class="fas fa-chevron-right text-[10px]"></i>
                    </RouterLink>
                  </div>
>>>>>>> 5a2a46c7f02e0d67ceec2d1b8986a306eabf911a
                </div>
              </div>
            </div>
          </section>

          <!-- MARKETPLACE QUICK VIEW -->
          <section class="bg-gradient-to-r from-gray-900 to-[#1B0B38] rounded-[2.5rem] p-8 text-white">
            <div class="flex items-center justify-between mb-8">
              <div>
<<<<<<< HEAD
                <h2 class="text-2xl font-black text-foreground italic">
                  Marketplace HMC
                </h2>
                <p class="text-sm text-muted-foreground font-medium">
                  Équipez votre intérieur en un clic
                </p>
              </div>
              <RouterLink
                :to="{ name: 'MarketplaceIndex' }"
                class="text-secondary font-black text-xs uppercase tracking-widest hover:underline"
                >Accéder au market</RouterLink
              >
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-6">
              <div
                v-for="item in marketItems"
                :key="item.name"
                class="bg-card p-4 rounded-3xl shadow-sm border border-border hover:border-secondary transition text-center group"
              >
                <div class="h-32 rounded-2xl overflow-hidden mb-4 bg-muted/20">
                  <img
                    :src="item.img"
                    :alt="item.name"
                    class="w-full h-full object-cover group-hover:scale-110 transition"
                  />
                </div>
                <h4 class="font-bold text-sm text-foreground">
                  {{ item.name }}
                </h4>
                <p class="text-secondary font-black mt-1">{{ item.price }}</p>
=======
                <h3 class="text-xl font-black italic">Marketplace Home Cameroon</h3>
                <p class="text-white/50 text-sm">Meubles et décoration pour votre futur chez-vous</p>
              </div>
              <RouterLink :to="{ name: 'MarketplaceIndex' }" class="text-sm font-bold text-[#f09f84] hover:underline">
                Accéder au shop</RouterLink>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div v-for="item in marketItems" :key="item.name"
                class="bg-white/5 hover:bg-white/10 p-3 rounded-2xl border border-white/10 transition group text-center">
                <div class="h-24 rounded-xl overflow-hidden mb-3">
                  <img :src="item.img" :alt="item.name"
                    class="w-full h-full object-cover group-hover:scale-110 transition" />
                </div>
                <p class="text-[11px] font-bold truncate opacity-80">{{ item.name }}</p>
                <p class="text-xs font-black text-[#f09f84]">{{ item.price }}</p>
>>>>>>> 5a2a46c7f02e0d67ceec2d1b8986a306eabf911a
              </div>
            </div>
          </section>

        </div>

        <!-- ASIDE COLUMN (RIGHT) -->
        <div class="space-y-8">

          <!-- PROFILE CARD -->
          <section
<<<<<<< HEAD
            class="bg-card p-8 rounded-[2.5rem] shadow-sm border border-border"
          >
            <h3 class="text-xl font-black text-foreground italic mb-6">
              Tendances Immo
=======
            class="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm transition-all hover:shadow-lg">
            <h3 class="text-lg font-black text-[#1B0B38] mb-6 flex items-center gap-3">
              <i class="fas fa-user-circle text-blue-500"></i> Mon Profil
>>>>>>> 5a2a46c7f02e0d67ceec2d1b8986a306eabf911a
            </h3>

            <div class="flex items-center gap-4 mb-6">
              <div class="relative">
                <div
                  class="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center text-3xl text-blue-600 font-black border-4 border-white shadow-xl">
                  {{ userName.charAt(0) }}
                </div>
<<<<<<< HEAD
                <div>
                  <p class="text-sm font-bold text-foreground">
                    {{ trend.city }}
                  </p>
                  <p
                    class="text-xs text-muted-foreground font-bold uppercase tracking-widest mt-1"
                  >
                    {{ trend.stat }}
                  </p>
=======
                <div
                  class="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 border-4 border-white rounded-full flex items-center justify-center text-white text-[10px]">
                  <i class="fas fa-check"></i>
>>>>>>> 5a2a46c7f02e0d67ceec2d1b8986a306eabf911a
                </div>
              </div>
              <div>
                <p class="font-black text-[#1B0B38]">{{ authStore.user?.name }}</p>
                <p class="text-xs text-gray-400 font-bold uppercase tracking-wider">Compte Client Vérifié</p>
              </div>
            </div>

            <!-- Profile Completion -->
            <div class="space-y-4 mb-8">
              <div class="flex justify-between text-xs font-black uppercase mb-1">
                <span class="text-gray-400">Complétion du profil</span>
                <span class="text-[#E54801]">85%</span>
              </div>
              <div class="h-2 bg-gray-50 rounded-full overflow-hidden">
                <div class="h-full bg-gradient-to-r from-orange-400 to-[#E54801] w-[85%] rounded-full"></div>
              </div>
              <p class="text-[11px] text-gray-400 leading-relaxed italic">
                C'est presque fini ! Un profil complet augmente vos chances d'acceptation de dossier.
              </p>
            </div>

            <RouterLink :to="{ name: 'ClientProfil' }"
              class="w-full flex items-center justify-center gap-3 py-4 bg-gray-50 text-[#1B0B38] rounded-xl font-bold hover:bg-[#1B0B38] hover:text-white transition group">
              Éditer le profil <i class="fas fa-chevron-right text-[10px] group-hover:translate-x-1 transition"></i>
            </RouterLink>
          </section>

<<<<<<< HEAD
          <!-- CTA Pro -->
          <section
            class="bg-primary p-8 rounded-[2.5rem] text-primary-foreground relative overflow-hidden shadow-xl"
          >
            <div class="relative z-10">
              <h3 class="text-xl font-black italic mb-3">🚀 Devenir Pro ?</h3>
              <p class="text-primary-foreground/70 text-sm mb-6">
                Maximisez vos revenus avec HomeCameroon
              </p>
              <div class="space-y-4">
                <RouterLink
                  :to="{ name: 'BailleurFormulaire' }"
                  class="block w-full px-6 py-4 bg-secondary text-secondary-foreground text-center rounded-xl font-bold hover:bg-secondary/90 transition shadow-md flex items-center justify-center gap-3"
                >
                  <i class="fas fa-building"></i> Publier un bien
                </RouterLink>
                <RouterLink
                  :to="{ name: 'AgentInscription' }"
                  class="block w-full px-6 py-4 bg-white/20 backdrop-blur text-primary-foreground text-center rounded-xl font-bold hover:bg-white/30 transition flex items-center justify-center gap-3"
                >
                  <i class="fas fa-user-tie"></i> Rejoindre le réseau
                </RouterLink>
=======
          <!-- QUICK ACTIONS -->
          <section class="space-y-4">
            <h3 class="text-xs font-black text-gray-300 uppercase tracking-[0.2em] px-4">Actions Rapides</h3>

            <RouterLink :to="{ name: 'Annonces' }"
              class="flex items-center gap-4 p-5 bg-white rounded-3xl border border-gray-100 shadow-sm hover:translate-x-2 transition-all group">
              <div
                class="w-12 h-12 bg-orange-50 text-[#E54801] rounded-2xl flex items-center justify-center text-xl group-hover:bg-[#E54801] group-hover:text-white transition">
                <i class="fas fa-search-plus"></i>
>>>>>>> 5a2a46c7f02e0d67ceec2d1b8986a306eabf911a
              </div>
              <div>
                <p class="font-black text-[#1B0B38]">Rechercher un bien</p>
                <p class="text-xs text-gray-400 font-medium">Filtrez selon vos envies</p>
              </div>
            </RouterLink>

            <RouterLink :to="{ name: 'ClientAssistance' }"
              class="flex items-center gap-4 p-5 bg-white rounded-3xl border border-gray-100 shadow-sm hover:translate-x-2 transition-all group">
              <div
                class="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-xl group-hover:bg-blue-600 group-hover:text-white transition">
                <i class="fas fa-headset"></i>
              </div>
              <div>
                <p class="font-black text-[#1B0B38]">Assistance HMC</p>
                <p class="text-xs text-gray-400 font-medium">Nos conseillers à votre écoute</p>
              </div>
            </RouterLink>
          </section>



        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { RouterLink } from "vue-router";
import DashboardLayout from "../../layouts/DashboardLayout.vue";
import DashboardRoleSwitcher from "../../components/common/DashboardRoleSwitcher.vue";
import { useAuthStore } from "../../stores/auth";
import { useRentalStore } from "../../stores/rental";

const authStore = useAuthStore();
const rentalStore = useRentalStore();

const userName = computed(() => {
  if (!authStore.user) return "Client";
  return authStore.user.name.split(" ")[0] || "Client";
});

const stats = computed(() => ({
  visits: rentalStore.visits.length || 0,
  apps: rentalStore.applications.length || 0,
  favs: 4 // Mocked for now
}));

const hasActiveProcedure = computed(() => {
<<<<<<< HEAD
  const hasVisits = rentalStore.visits.some((v) =>
    ["pending", "confirmed", "completed"].includes(v.status),
  );
  const hasApps = rentalStore.applications.some((a) =>
    ["pending", "validated", "under_review"].includes(a.status),
  );
  return hasVisits || hasApps;
=======
  return rentalStore.visits.length > 0 || rentalStore.applications.length > 0;
});

// Stepper logic for active procedure
const procedureSteps = computed(() => {
  const currentStep = 2; // Simulé pour l'exemple
  return [
    { label: "Étape 01", title: "Visite programmée", icon: "fas fa-calendar", status: currentStep > 1 ? 'completed' : 'active' },
    { label: "Étape 02", title: "Dépôt dossier", icon: "fas fa-file-upload", status: currentStep === 2 ? 'active' : (currentStep > 2 ? 'completed' : 'pending') },
    { label: "Étape 03", title: "Validation HMC", icon: "fas fa-stamp", status: currentStep === 3 ? 'active' : (currentStep > 3 ? 'completed' : 'pending') },
    { label: "Étape 04", title: "Paiement & Bail", icon: "fas fa-key", status: currentStep === 4 ? 'active' : 'pending' },
  ];
>>>>>>> 5a2a46c7f02e0d67ceec2d1b8986a306eabf911a
});

onMounted(() => {
  rentalStore.fetchVisits();
  rentalStore.fetchApplications();
});

<<<<<<< HEAD
const roles = [
  {
    icon: "key",
    title: "Louer un bien",
    desc: "Trouvez votre logement idéal simplement",
    badge: "Accès gratuit",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    color: "text-blue-600 dark:text-blue-400",
    textColor: "text-blue-600 dark:text-blue-400",
    border: "border-blue-100 dark:border-blue-800/50",
    link: { name: "Annonces", query: { search: "" } },
    cta: "Explorer",
  },
  {
    icon: "building",
    title: "Publier un bien",
    desc: "Générez des revenus avec vos biens",
    badge: "+25% revenus",
    bg: "bg-orange-50 dark:bg-secondary/10",
    color: "text-secondary",
    textColor: "text-secondary",
    border: "border-orange-100 dark:border-secondary/20",
    link: { name: "BailleurFormulaire" },
    cta: "Commencer",
  },
  {
    icon: "tools",
    title: "Proposer un service",
    desc: "Offrez vos services à notre communauté",
    badge: "Nouveaux clients",
    bg: "bg-purple-50 dark:bg-purple-950/30",
    color: "text-purple-600 dark:text-purple-400",
    textColor: "text-purple-600 dark:text-purple-400",
    border: "border-purple-100 dark:border-purple-800/50",
    link: { name: "PrestataireInscription" },
    cta: "Proposer",
  },
  {
    icon: "user-tie",
    title: "Rejoindre le réseau",
    desc: "Rejoignez notre réseau certifié d'agents",
    badge: "Certifié HMC",
    bg: "bg-green-50 dark:bg-green-950/30",
    color: "text-green-600 dark:text-green-400",
    textColor: "text-green-600 dark:text-green-400",
    border: "border-green-100 dark:border-green-800/50",
    link: { name: "AgentInscription" },
    cta: "Postuler",
  },
];

=======
>>>>>>> 5a2a46c7f02e0d67ceec2d1b8986a306eabf911a
const featuredListings = [
  {
    title: "Appartement Grand Luxe",
    slug: "appartement-grand-luxe",
    location: "Yaoundé • Bastos",
    price: "250 000 FCFA/mois",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=500&q=80",
  },
  {
    title: "Villa Contemporaine",
    slug: "villa-contemporaine",
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
  {
<<<<<<< HEAD
    city: "Yaoundé (Bastos)",
    stat: "Prix : +5.2%",
    bg: "bg-orange-50 dark:bg-secondary/10",
    color: "text-secondary",
  },
  {
    city: "Douala (Akwa)",
    stat: "Demande élevée",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    color: "text-blue-500 dark:text-blue-400",
  },
  {
    city: "Douala (Bonapriso)",
    stat: "Prix : +3.1%",
    bg: "bg-green-50 dark:bg-green-950/30",
    color: "text-green-500 dark:text-green-400",
=======
    name: "Table Basse",
    price: "35 000 FCFA",
    img: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=300&q=80",
>>>>>>> 5a2a46c7f02e0d67ceec2d1b8986a306eabf911a
  },
];
</script>

<style scoped>
<<<<<<< HEAD
.sidebar-link.active {
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  box-shadow: 0 4px 15px hsl(var(--primary) / 0.2);
}
.sidebar-link.active i {
  color: hsl(var(--primary-foreground));
}
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: hsl(var(--muted-foreground) / 0.3);
  border-radius: 10px;
=======
.group:hover img {
  transform: scale(1.05);
>>>>>>> 5a2a46c7f02e0d67ceec2d1b8986a306eabf911a
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--muted-foreground) / 0.5);
}
</style>