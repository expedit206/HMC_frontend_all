<template>
  <DashboardLayout title="Espace Prestataire Pro">
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
    <div
      v-if="isLoading"
      class="flex flex-col items-center justify-center h-full min-h-[60vh]"
    >
      <div
        class="w-16 h-16 border-4 border-secondary border-t-transparent rounded-full animate-spin mb-4"
      ></div>
      <p class="text-muted-foreground font-bold uppercase tracking-widest text-xs">
<<<<<<< HEAD
=======
    <div v-if="isLoading" class="flex flex-col items-center justify-center h-full min-h-[60vh]">
      <div class="w-16 h-16 border-4 border-[#E54801] border-t-transparent rounded-full animate-spin mb-4"></div>
      <p class="text-gray-500 font-bold uppercase tracking-widest text-xs">
>>>>>>> 5a2a46c7f02e0d67ceec2d1b8986a306eabf911a
=======
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
        Chargement de votre espace...
      </p>
    </div>

    <div v-else class="max-w-7xl mx-auto h-full">
      <!-- Role Switcher -->
      <DashboardRoleSwitcher />
      <!-- Header -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 animate-fadeIn">
        <div>
          <h1 class="text-2xl font-bold text-foreground leading-tight">
            Bonjour,
            <span class="text-secondary">{{ user.firstName }}</span> 🛠️
          </h1>
          <p class="text-muted-foreground text-sm mt-1 font-medium tracking-wide">
            Vous avez
<<<<<<< HEAD
<<<<<<< HEAD
            <span class="text-foreground font-bold"
              >{{ dashboardData.stats.pending }} nouvelles demandes</span
            >
=======
            <span class="text-[#1B0B38] font-bold">{{ dashboardData.stats.pending }} nouvelles demandes</span>
>>>>>>> 5a2a46c7f02e0d67ceec2d1b8986a306eabf911a
=======
            <span class="text-foreground font-bold"
              >{{ dashboardData.stats.pending }} nouvelles demandes</span>
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
            d'intervention.
          </p>
        </div>
        <div class="flex gap-3">
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
          <RouterLink
            :to="{ name: 'PrestataireAgenda' }"
            class="px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-xs font-bold hover:scale-105 transition-all shadow-md uppercase tracking-wider flex items-center gap-2"
          >
            <i class="fas fa-calendar-plus"></i> Mon Planning
          </RouterLink>
          <RouterLink
            :to="{ name: 'PrestataireServices' }"
            class="px-5 py-2.5 bg-secondary text-secondary-foreground rounded-xl text-xs font-bold hover:scale-105 transition-all shadow-md uppercase tracking-wider flex items-center gap-2"
          >
<<<<<<< HEAD
=======
          <RouterLink :to="{ name: 'PrestataireAgenda' }"
            class="px-5 py-2.5 bg-[#1B0B38] text-white rounded-xl text-xs font-bold hover:scale-105 transition-all shadow-md uppercase tracking-wider flex items-center gap-2">
            <i class="fas fa-calendar-plus"></i> Mon Planning
          </RouterLink>
          <RouterLink :to="{ name: 'PrestataireServices' }"
            class="px-5 py-2.5 bg-[#E54801] text-white rounded-xl text-xs font-bold hover:scale-105 transition-all shadow-md uppercase tracking-wider flex items-center gap-2">
>>>>>>> 5a2a46c7f02e0d67ceec2d1b8986a306eabf911a
=======
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
            <i class="fas fa-plus"></i> Nouveau Service
          </RouterLink>
        </div>
      </div>

      <!-- Stats Pro -->
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
      <div
        class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-fadeIn"
        style="animation-delay: 0.1s"
      >
        <div
          class="bg-card p-5 rounded-2xl shadow-sm border border-border transition-all hover:shadow-lg"
        >
          <p
            class="text-[10px] text-muted-foreground font-bold uppercase mb-2 tracking-widest"
          >
<<<<<<< HEAD
=======
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-fadeIn" style="animation-delay: 0.1s">
        <div class="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-lg">
          <p class="text-[10px] text-gray-400 font-bold uppercase mb-2 tracking-widest">
>>>>>>> 5a2a46c7f02e0d67ceec2d1b8986a306eabf911a
=======
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
            Attente
          </p>
          <div class="flex items-center justify-between">
            <p class="text-2xl font-bold text-orange-500 dark:text-orange-400">
              {{ dashboardData.stats.pending }}
            </p>
<<<<<<< HEAD
<<<<<<< HEAD
            <div
              class="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-950/30 flex items-center justify-center text-orange-500 dark:text-orange-400"
            >
=======
            <div class="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500">
>>>>>>> 5a2a46c7f02e0d67ceec2d1b8986a306eabf911a
=======
            <div
              class="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-950/30 flex items-center justify-center text-orange-500 dark:text-orange-400"
            >
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
              <i class="fas fa-clock"></i>
            </div>
          </div>
        </div>

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
        <div
          class="bg-card p-5 rounded-2xl shadow-sm border border-border transition-all hover:shadow-lg"
        >
          <p
            class="text-[10px] text-muted-foreground font-bold uppercase mb-2 tracking-widest"
          >
<<<<<<< HEAD
=======
        <div class="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-lg">
          <p class="text-[10px] text-gray-400 font-bold uppercase mb-2 tracking-widest">
>>>>>>> 5a2a46c7f02e0d67ceec2d1b8986a306eabf911a
=======
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
            En cours
          </p>
          <div class="flex items-center justify-between">
            <p class="text-2xl font-bold text-blue-500 dark:text-blue-400">
              {{ dashboardData.stats.active }}
            </p>
<<<<<<< HEAD
<<<<<<< HEAD
            <div
              class="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950/30 flex items-center justify-center text-blue-500 dark:text-blue-400"
            >
=======
            <div class="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500">
>>>>>>> 5a2a46c7f02e0d67ceec2d1b8986a306eabf911a
=======
            <div
              class="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950/30 flex items-center justify-center text-blue-500 dark:text-blue-400"
            >
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
              <i class="fas fa-tools"></i>
            </div>
          </div>
        </div>

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
        <div
          class="bg-card p-5 rounded-2xl shadow-sm border border-border transition-all hover:shadow-lg"
        >
          <p
            class="text-[10px] text-muted-foreground font-bold uppercase mb-2 tracking-widest"
          >
<<<<<<< HEAD
=======
        <div class="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-lg">
          <p class="text-[10px] text-gray-400 font-bold uppercase mb-2 tracking-widest">
>>>>>>> 5a2a46c7f02e0d67ceec2d1b8986a306eabf911a
=======
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
            Terminées
          </p>
          <div class="flex items-center justify-between">
            <p class="text-2xl font-bold text-green-500 dark:text-green-400">
              {{ dashboardData.stats.completed }}
            </p>
<<<<<<< HEAD
<<<<<<< HEAD
            <div
              class="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-950/30 flex items-center justify-center text-green-500 dark:text-green-400"
            >
=======
            <div class="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-green-500">
>>>>>>> 5a2a46c7f02e0d67ceec2d1b8986a306eabf911a
=======
            <div
              class="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-950/30 flex items-center justify-center text-green-500 dark:text-green-400"
            >
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
              <i class="fas fa-check-circle"></i>
            </div>
          </div>
        </div>

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
        <div
          class="bg-card p-5 rounded-2xl shadow-sm border border-secondary/30 transition-all hover:shadow-lg"
        >
          <p
            class="text-[10px] text-secondary font-bold uppercase mb-2 tracking-widest"
          >
<<<<<<< HEAD
=======
        <div class="bg-white p-5 rounded-2xl shadow-sm border border-[#E54801]/30 transition-all hover:shadow-lg">
          <p class="text-[10px] text-[#E54801] font-bold uppercase mb-2 tracking-widest">
>>>>>>> 5a2a46c7f02e0d67ceec2d1b8986a306eabf911a
=======
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
            Revenus
          </p>
          <div class="flex items-center justify-between">
            <p class="text-2xl font-bold text-foreground">
              {{ formatPrice(dashboardData.stats.earnings) }}
            </p>
            <span class="text-[10px] font-bold text-muted-foreground">XAF</span>
          </div>
        </div>
      </div>

      <!-- Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeIn" style="animation-delay: 0.2s">
        <!-- Column Left (Demandes + Agenda) -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Nouvelles Demandes -->
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
          <div
            class="bg-card rounded-3xl shadow-sm border border-border overflow-hidden"
          >
            <div
              class="p-6 border-b border-border flex justify-between items-center bg-muted/10"
            >
              <h3
                class="text-sm font-black text-foreground uppercase tracking-widest"
              >
                Demandes Récentes
              </h3>
              <RouterLink
                :to="{ name: 'PrestataireInterventions' }"
                class="text-[10px] font-black text-secondary uppercase tracking-widest hover:underline"
                >Voir tout</RouterLink
              >
            </div>
            <div
              v-if="dashboardData.recent_interventions.length === 0"
              class="p-10 text-center text-muted-foreground"
            >
<<<<<<< HEAD
=======
          <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div class="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/20">
              <h3 class="text-sm font-black text-[#1B0B38] uppercase tracking-widest">
                Demandes Récentes
              </h3>
              <RouterLink :to="{ name: 'PrestataireInterventions' }"
                class="text-[10px] font-black text-[#E54801] uppercase tracking-widest hover:underline">Voir tout
              </RouterLink>
            </div>
            <div v-if="dashboardData.recent_interventions.length === 0" class="p-10 text-center text-gray-400">
>>>>>>> 5a2a46c7f02e0d67ceec2d1b8986a306eabf911a
=======
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
              <i class="fas fa-inbox text-4xl mb-3 opacity-20"></i>
              <p class="text-xs font-bold uppercase tracking-widest">
                Aucune demande pour le moment
              </p>
            </div>
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
            <div v-else class="divide-y divide-border">
              <div
                v-for="request in dashboardData.recent_interventions"
                :key="request.id"
                class="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-muted/10 transition-all group"
              >
                <div class="flex items-center gap-4">
                  <div
                    class="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center font-black shadow-sm group-hover:scale-110 transition-transform"
                  >
                    <i
                      :class="`fas fa-${getInterventionIcon(request.service?.category)}`"
                    ></i>
<<<<<<< HEAD
=======
            <div v-else class="divide-y divide-gray-50">
              <div v-for="request in dashboardData.recent_interventions" :key="request.id"
                class="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-gray-50/50 transition-all group">
                <div class="flex items-center gap-4">
                  <div
                    class="w-12 h-12 rounded-2xl bg-orange-50 text-[#E54801] flex items-center justify-center font-black shadow-sm group-hover:scale-110 transition-transform">
                    <i :class="`fas fa-${getInterventionIcon(request.service?.category)}`"></i>
>>>>>>> 5a2a46c7f02e0d67ceec2d1b8986a306eabf911a
=======
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
                  </div>
                  <div>
                    <h4 class="text-sm font-bold text-foreground">
                      {{ request.service?.title }}
                    </h4>
                    <div class="flex items-center gap-3 mt-1">
<<<<<<< HEAD
<<<<<<< HEAD
                      <span class="text-[10px] text-muted-foreground"
                        ><i class="fas fa-map-marker-alt mr-1"></i>
                        {{ request.property?.city || "Cameroun" }}</span
                      >
                      <span class="w-1 h-1 bg-border rounded-full"></span>
                      <span
                        class="text-[10px] text-secondary font-bold uppercase"
                        >{{ request.status }}</span
                      >
=======
                      <span class="text-[10px] text-gray-400"><i class="fas fa-map-marker-alt mr-1"></i>
                        {{ request.property?.city || "Cameroun" }}</span>
                      <span class="w-1 h-1 bg-gray-200 rounded-full"></span>
                      <span class="text-[10px] text-[#E54801] font-bold uppercase">{{ request.status }}</span>
>>>>>>> 5a2a46c7f02e0d67ceec2d1b8986a306eabf911a
=======
                      <span class="text-[10px] text-muted-foreground"
                        ><i class="fas fa-map-marker-alt mr-1"></i>
                        {{ request.property?.city || "Cameroun" }}</span>
                      <span class="w-1 h-1 bg-border rounded-full"></span>
                      <span
                        class="text-[10px] text-secondary font-bold uppercase"
                        >{{ request.status }}</span>
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
                    </div>
                  </div>
                </div>
                <div class="flex items-center gap-3 w-full md:w-auto">
                  <button
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
                    class="flex-1 md:flex-none px-4 py-2 bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-secondary hover:text-secondary-foreground transition-all"
                  >
                    Détails
                  </button>
                  <button
                    v-if="request.status === 'pending'"
                    class="flex-1 md:flex-none px-4 py-2 bg-card text-muted-foreground border border-border text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-destructive/10 hover:text-destructive transition-all"
                  >
<<<<<<< HEAD
=======
                    class="flex-1 md:flex-none px-4 py-2 bg-[#1B0B38] text-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-[#E54801] transition-all">
                    Détails
                  </button>
                  <button v-if="request.status === 'pending'"
                    class="flex-1 md:flex-none px-4 py-2 bg-white text-gray-400 border border-gray-100 text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-red-50 hover:text-red-500 transition-all">
>>>>>>> 5a2a46c7f02e0d67ceec2d1b8986a306eabf911a
=======
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
                    Refuser
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Mon Planning -->
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
          <div
            class="bg-card rounded-3xl shadow-sm border border-border p-6"
          >
            <div class="flex justify-between items-center mb-6">
              <h3
                class="text-xs font-black text-foreground uppercase tracking-widest"
              >
<<<<<<< HEAD
=======
          <div class="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-xs font-black text-[#1B0B38] uppercase tracking-widest">
>>>>>>> 5a2a46c7f02e0d67ceec2d1b8986a306eabf911a
=======
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
                Mon Planning - Aujourd'hui
              </h3>
              <span class="text-xs font-bold text-muted-foreground uppercase">{{
                todayDate
              }}</span>
            </div>
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
            <div
              v-if="dashboardData.today_schedule.length === 0"
              class="py-10 text-center text-muted-foreground"
            >
<<<<<<< HEAD
=======
            <div v-if="dashboardData.today_schedule.length === 0" class="py-10 text-center text-gray-400">
>>>>>>> 5a2a46c7f02e0d67ceec2d1b8986a306eabf911a
=======
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
              <p class="text-xs font-bold uppercase tracking-widest">
                Rien au planning aujourd'hui
              </p>
            </div>
            <div v-else class="space-y-4">
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
              <div
                v-for="slot in dashboardData.today_schedule"
                :key="slot.id"
                class="flex items-start gap-4"
              >
                <span class="text-xs font-black text-muted-foreground w-12 pt-1">
<<<<<<< HEAD
=======
              <div v-for="slot in dashboardData.today_schedule" :key="slot.id" class="flex items-start gap-4">
                <span class="text-xs font-black text-gray-400 w-12 pt-1">
>>>>>>> 5a2a46c7f02e0d67ceec2d1b8986a306eabf911a
=======
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
                  {{ new Date(slot.scheduled_at).getHours() }}:{{
                    new Date(slot.scheduled_at)
                      .getMinutes()
                      .toString()
                      .padStart(2, "0")
                  }}
                </span>
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
                <div
                  class="flex-1 p-4 rounded-xl border-l-4 border-blue-500 bg-blue-50/30 dark:bg-blue-950/30"
                >
                  <h5 class="text-xs font-black text-foreground uppercase mb-1">
<<<<<<< HEAD
=======
                <div class="flex-1 p-4 rounded-xl border-l-4 border-blue-500 bg-blue-50/50">
                  <h5 class="text-xs font-black text-[#1B0B38] uppercase mb-1">
>>>>>>> 5a2a46c7f02e0d67ceec2d1b8986a306eabf911a
=======
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
                    {{ slot.service?.title }}
                  </h5>
                  <p class="text-[10px] text-muted-foreground">
                    Client: {{ slot.requester?.name }} •
                    <i class="fas fa-map-marker-alt"></i>
                    {{ slot.property?.title || "Lieu non spécifié" }}
                  </p>
                </div>
              </div>
            </div>
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
            <RouterLink
              :to="{ name: 'PrestataireAgenda' }"
              class="block w-full mt-6 py-3 bg-primary/5 text-foreground text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-primary hover:text-primary-foreground transition-all text-center"
            >
<<<<<<< HEAD
=======
            <RouterLink :to="{ name: 'PrestataireAgenda' }"
              class="block w-full mt-6 py-3 bg-[#1B0B38]/5 text-[#1B0B38] text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-[#1B0B38] hover:text-white transition-all text-center">
>>>>>>> 5a2a46c7f02e0d67ceec2d1b8986a306eabf911a
=======
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
              Ouvrir l'agenda complet
            </RouterLink>
          </div>
        </div>

        <!-- Column Right -->
        <div class="space-y-6">
          <!-- Profile Card -->
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
          <div
            class="bg-primary rounded-3xl p-6 text-primary-foreground shadow-lg relative overflow-hidden group"
          >
            <div class="relative z-10 text-center">
              <div
                class="w-16 h-16 rounded-2xl bg-secondary mx-auto mb-4 flex items-center justify-center text-2xl font-black shadow-lg text-secondary-foreground"
              >
<<<<<<< HEAD
=======
          <div class="bg-[#1B0B38] rounded-3xl p-6 text-white shadow-lg relative overflow-hidden group">
            <div class="relative z-10 text-center">
              <div
                class="w-16 h-16 rounded-2xl bg-[#E54801] mx-auto mb-4 flex items-center justify-center text-2xl font-black shadow-lg">
>>>>>>> 5a2a46c7f02e0d67ceec2d1b8986a306eabf911a
=======
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
                {{ user.initials }}
              </div>
              <h4 class="text-sm font-bold">
                {{ user.firstName }} {{ user.lastName }}
              </h4>
<<<<<<< HEAD
<<<<<<< HEAD
              <p
                class="text-[10px] text-primary-foreground/60 uppercase tracking-widest mt-1"
              >
=======
              <p class="text-[10px] text-gray-400 uppercase tracking-widest mt-1">
>>>>>>> 5a2a46c7f02e0d67ceec2d1b8986a306eabf911a
=======
              <p
                class="text-[10px] text-primary-foreground/60 uppercase tracking-widest mt-1"
              >
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
                Prestataire Certifié
              </p>

              <div class="grid grid-cols-2 gap-2 mt-6">
                <div class="bg-white/10 p-3 rounded-xl border border-white/10">
                  <p class="text-[9px] text-primary-foreground/60 font-bold uppercase mb-1">
                    Interventions
                  </p>
                  <p class="text-xs font-black">
                    {{ dashboardData.stats.completed }}
                  </p>
                </div>
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
                <div
                  class="bg-white/10 p-3 rounded-xl border border-white/10 flex flex-col items-center justify-center"
                >
                  <p class="text-[9px] text-primary-foreground/60 font-bold uppercase mb-1">
<<<<<<< HEAD
=======
                <div class="bg-white/5 p-3 rounded-xl border border-white/10 flex flex-col items-center justify-center">
                  <p class="text-[9px] text-gray-400 font-bold uppercase mb-1">
>>>>>>> 5a2a46c7f02e0d67ceec2d1b8986a306eabf911a
=======
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
                    Status
                  </p>
                  <i class="fas fa-check-circle text-secondary text-xs"></i>
                </div>
              </div>
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
              <RouterLink
                :to="{ name: 'PrestataireDashboard' }"
                class="block w-full mt-4 py-2 text-[9px] font-black uppercase tracking-widest bg-white/10 hover:bg-white/20 rounded-lg transition-all text-center text-primary-foreground"
              >
<<<<<<< HEAD
=======
              <RouterLink :to="{ name: 'PrestataireDashboard' }"
                class="block w-full mt-4 py-2 text-[9px] font-black uppercase tracking-widest bg-white/10 hover:bg-white/20 rounded-lg transition-all text-center">
>>>>>>> 5a2a46c7f02e0d67ceec2d1b8986a306eabf911a
=======
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
                Gérer mon profil
              </RouterLink>
            </div>
            <i
              class="fas fa-hammer absolute -right-4 -bottom-4 text-6xl text-white/5 rotate-12 group-hover:scale-110 transition-transform"></i>
          </div>

          <!-- Mes Services Actifs -->
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
          <div
            class="bg-card rounded-3xl p-6 shadow-sm border border-border"
          >
            <h3
              class="text-xs font-black text-foreground uppercase tracking-[0.2em] mb-6"
            >
              Mes Services
            </h3>
            <div
              v-if="services.length === 0"
              class="text-center py-4 text-muted-foreground text-[10px] uppercase font-bold"
            >
              Aucun service créé
            </div>
            <div v-else class="space-y-3">
              <div
                v-for="service in services"
                :key="service.id"
                class="flex items-center justify-between p-3 bg-muted/20 rounded-xl"
              >
                <span class="text-[10px] font-bold text-foreground uppercase">{{
<<<<<<< HEAD
=======
          <div class="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h3 class="text-xs font-black text-[#1B0B38] uppercase tracking-[0.2em] mb-6">
              Mes Services
            </h3>
            <div v-if="services.length === 0" class="text-center py-4 text-gray-400 text-[10px] uppercase font-bold">
              Aucun service créé
            </div>
            <div v-else class="space-y-3">
              <div v-for="service in services" :key="service.id"
                class="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <span class="text-[10px] font-bold text-[#1B0B38] uppercase">{{
>>>>>>> 5a2a46c7f02e0d67ceec2d1b8986a306eabf911a
=======
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
                  service.title
                }}</span>
                <span class="text-[10px] font-black text-secondary">
                  {{ formatPrice(service.base_price) }}
                </span>
              </div>
            </div>
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
            <RouterLink
              :to="{ name: 'PrestataireServices' }"
              class="block w-full mt-4 py-2 text-[10px] font-black text-secondary uppercase tracking-widest text-center hover:underline"
            >
<<<<<<< HEAD
=======
            <RouterLink :to="{ name: 'PrestataireServices' }"
              class="block w-full mt-4 py-2 text-[10px] font-black text-[#E54801] uppercase tracking-widest text-center hover:underline">
>>>>>>> 5a2a46c7f02e0d67ceec2d1b8986a306eabf911a
=======
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
              Gérer mes services
            </RouterLink>
          </div>

          <!-- Promo Marketplace -->
          <div
<<<<<<< HEAD
<<<<<<< HEAD
            class="bg-gradient-to-br from-secondary to-secondary/80 rounded-3xl p-6 text-secondary-foreground shadow-lg relative overflow-hidden group"
          >
=======
            class="bg-gradient-to-br from-[#E54801] to-[#913327] rounded-3xl p-6 text-white shadow-lg relative overflow-hidden group">
>>>>>>> 5a2a46c7f02e0d67ceec2d1b8986a306eabf911a
=======
            class="bg-gradient-to-br from-secondary to-secondary/80 rounded-3xl p-6 text-secondary-foreground shadow-lg relative overflow-hidden group"
          >
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
            <div class="relative z-10">
              <h4 class="text-xs font-black uppercase tracking-widest mb-2">
                Marketplace Pro
              </h4>
              <p class="text-[11px] text-secondary-foreground/80 mb-4 leading-relaxed">
                Achetez votre matériel pro et outillage au meilleur prix sur
                HMC.
              </p>
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
              <RouterLink
                :to="{ name: 'MarketplaceIndex' }"
                class="inline-block px-4 py-2 bg-background text-secondary text-[9px] font-black uppercase tracking-widest rounded-lg shadow-md hover:scale-105 transition-all text-center"
                >Explorer</RouterLink
              >
<<<<<<< HEAD
=======
              <RouterLink :to="{ name: 'MarketplaceIndex' }"
                class="inline-block px-4 py-2 bg-white text-[#E54801] text-[9px] font-black uppercase tracking-widest rounded-lg shadow-md hover:scale-105 transition-all text-center">
                Explorer</RouterLink>
>>>>>>> 5a2a46c7f02e0d67ceec2d1b8986a306eabf911a
=======
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
            </div>
            <i
              class="fas fa-tools absolute -right-4 -bottom-4 text-6xl text-white/10 group-hover:scale-110 transition-transform"></i>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { RouterLink, useRouter } from "vue-router";
import axios from "../../axios";
import DashboardLayout from "../../layouts/DashboardLayout.vue";
import DashboardRoleSwitcher from "../../components/common/DashboardRoleSwitcher.vue";

const router = useRouter();
const isLoading = ref(true);

const user = ref({
  firstName: "Cher",
  lastName: "Utilisateur",
  initials: "CU",
});

const dashboardData = ref({
  stats: {
    pending: 0,
    active: 0,
    completed: 0,
    earnings: 0,
  },
  recent_interventions: [],
  today_schedule: [],
});

const services = ref([]);

const fetchData = async () => {
  isLoading.value = true;
  try {
    const [dashRes, userRes, servicesRes] = await Promise.all([
      axios.get("/api/prestataire/dashboard"),
      axios.get("/api/user"),
      axios.get("/api/prestataire/services"),
    ]);

    if (dashRes.data.success) {
      dashboardData.value = dashRes.data.data;
    }

    if (userRes.data) {
      const u = userRes.data;
      const names = u.name.split(" ");
      user.value = {
        firstName: names[0],
        lastName: names.slice(1).join(" "),
        initials: u.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase(),
      };
    }

    if (servicesRes.data.success) {
      services.value = servicesRes.data.data;
    }
  } catch (err) {
    console.error("Erreur chargement dashboard prestataire:", err);
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchData);

const todayDate = new Date().toLocaleDateString("fr-FR", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

const formatPrice = (p) => new Intl.NumberFormat("fr-FR").format(p || 0);

const getInterventionIcon = (category) => {
  const map = {
    plomberie: "faucet",
    electricite: "bolt",
    climatisation: "wind",
    peinture: "paint-roller",
  };
  return map[category?.slug] || "tools";
};
</script>

<style scoped>
.animate-fadeIn {
  animation: fadeIn 0.4s ease-out forwards;
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
</style>