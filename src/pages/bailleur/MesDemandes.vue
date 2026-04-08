<template>
  <DashboardLayout>
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="mb-10 flex justify-between items-end">
        <div>
          <h1 class="text-2xl font-black text-foreground uppercase relative">
            Mes Demandes de Publication
<<<<<<< HEAD
            <span
              class="absolute -bottom-2 left-0 w-20 h-1 bg-secondary"
            ></span>
          </h1>
          <p
            class="text-muted-foreground text-[10px] font-black uppercase tracking-widest mt-4"
          >
            Suivi de l'audit terrain et vérification HMC
          </p>
        </div>
        <RouterLink
          :to="{ name: 'BailleurPublierBien' }"
          class="px-4 py-2 bg-secondary text-secondary-foreground rounded-xl text-xs font-black uppercase tracking-widest hover:bg-secondary/90 transition-all flex items-center gap-2 shadow-sm"
        >
=======
            <span class="absolute -bottom-2 left-0 w-20 h-1 bg-secondary"></span>
          </h1>
          <p class="text-muted-foreground text-[10px] font-black uppercase tracking-widest mt-4">
            Suivi de l'audit terrain et vérification HMC
          </p>
        </div>
        <RouterLink :to="{ name: 'PublierBien' }"
          class="px-4 py-2 bg-secondary text-secondary-foreground rounded-xl text-xs font-black uppercase tracking-widest hover:bg-secondary/90 transition-all flex items-center gap-2 shadow-sm">
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
          <i class="fas fa-plus"></i> Nouvelle demande
        </RouterLink>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
<<<<<<< HEAD
        <div
          class="bg-card p-6 rounded-2xl shadow-sm border border-border flex items-center gap-4"
        >
          <div
            class="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center text-xl"
          >
            <i class="fas fa-clipboard-list"></i>
          </div>
          <div>
            <p
              class="text-[10px] font-black text-muted-foreground uppercase tracking-widest"
            >
=======
        <div class="bg-card p-6 rounded-2xl shadow-sm border border-border flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center text-xl">
            <i class="fas fa-clipboard-list"></i>
          </div>
          <div>
            <p class="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
              Total
            </p>
            <p class="text-xl font-black text-foreground">
              {{ requests.length }}
            </p>
          </div>
        </div>
<<<<<<< HEAD
        <div
          class="bg-card p-6 rounded-2xl shadow-sm border border-border flex items-center gap-4"
        >
          <div
            class="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xl"
          >
            <i class="fas fa-user-shield"></i>
          </div>
          <div>
            <p
              class="text-[10px] font-black text-muted-foreground uppercase tracking-widest"
            >
=======
        <div class="bg-card p-6 rounded-2xl shadow-sm border border-border flex items-center gap-4">
          <div
            class="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xl">
            <i class="fas fa-user-shield"></i>
          </div>
          <div>
            <p class="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
              En cours d'audit
            </p>
            <p class="text-xl font-black text-foreground">{{ pendingCount }}</p>
          </div>
        </div>
<<<<<<< HEAD
        <div
          class="bg-card p-6 rounded-2xl shadow-sm border border-border flex items-center gap-4"
        >
          <div
            class="w-12 h-12 rounded-xl bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 flex items-center justify-center text-xl"
          >
            <i class="fas fa-check-double"></i>
          </div>
          <div>
            <p
              class="text-[10px] font-black text-muted-foreground uppercase tracking-widest"
            >
=======
        <div class="bg-card p-6 rounded-2xl shadow-sm border border-border flex items-center gap-4">
          <div
            class="w-12 h-12 rounded-xl bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 flex items-center justify-center text-xl">
            <i class="fas fa-check-double"></i>
          </div>
          <div>
            <p class="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
              Publiés
            </p>
            <p class="text-xl font-black text-foreground">
              {{ publishedCount }}
            </p>
          </div>
        </div>
      </div>

      <!-- Loading -->
<<<<<<< HEAD
      <div
        v-if="isLoading"
        class="flex flex-col items-center justify-center h-64"
      >
        <div
          class="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin mb-4"
        ></div>
        <p
          class="text-muted-foreground font-bold uppercase tracking-widest text-[10px]"
        >
=======
      <div v-if="isLoading" class="flex flex-col items-center justify-center h-64">
        <div class="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin mb-4"></div>
        <p class="text-muted-foreground font-bold uppercase tracking-widest text-[10px]">
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
          Chargement de vos demandes...
        </p>
      </div>

      <!-- Empty -->
<<<<<<< HEAD
      <div
        v-else-if="requests.length === 0"
        class="bg-card p-20 rounded-3xl border border-dashed border-border text-center"
      >
=======
      <div v-else-if="requests.length === 0"
        class="bg-card p-20 rounded-3xl border border-dashed border-border text-center">
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
        <i class="fas fa-file-contract text-5xl text-muted-foreground/30 mb-6"></i>
        <h3 class="text-lg font-bold text-foreground mb-2">
          Aucune demande trouvée
        </h3>
        <p class="text-sm text-muted-foreground mb-8 max-w-sm mx-auto">
          Vous n'avez pas encore soumis de demande de publication. Un agent doit
          auditer votre bien avant qu'il ne soit visible.
        </p>
<<<<<<< HEAD
        <RouterLink
          :to="{ name: 'BailleurPublierBien' }"
          class="px-8 py-4 bg-primary text-primary-foreground rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-secondary hover:text-secondary-foreground transition-all"
        >
=======
        <RouterLink :to="{ name: 'PublierBien' }"
          class="px-8 py-4 bg-primary text-primary-foreground rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-secondary hover:text-secondary-foreground transition-all">
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
          Soumettre un bien pour audit
        </RouterLink>
      </div>

      <!-- List -->
      <div v-else class="space-y-4">
<<<<<<< HEAD
        <div
          v-for="req in requests"
          :key="req.id"
          class="bg-card p-6 rounded-3xl shadow-sm border border-border hover:shadow-md transition-all group overflow-hidden relative"
        >
          <!-- Barre latérale colorée -->
          <div
            :class="[
              'absolute top-0 left-0 w-1.5 h-full transition-all',
              getStatusBarColor(req.status),
            ]"
          ></div>

          <div
            class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
          >
            <!-- Infos principale -->
            <div class="flex items-start gap-4 flex-1">
              <div
                class="w-14 h-14 rounded-2xl bg-muted/20 flex items-center justify-center text-muted-foreground/50 text-2xl shrink-0 group-hover:bg-secondary/10 group-hover:text-secondary transition-all"
              >
=======
        <div v-for="req in requests" :key="req.id"
          class="bg-card p-6 rounded-3xl shadow-sm border border-border hover:shadow-md transition-all group overflow-hidden relative">
          <!-- Barre latérale colorée -->
          <div :class="[
            'absolute top-0 left-0 w-1.5 h-full transition-all',
            getStatusBarColor(req.status),
          ]"></div>

          <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <!-- Infos principale -->
            <div class="flex items-start gap-4 flex-1">
              <div
                class="w-14 h-14 rounded-2xl bg-muted/20 flex items-center justify-center text-muted-foreground/50 text-2xl shrink-0 group-hover:bg-secondary/10 group-hover:text-secondary transition-all">
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
                <i :class="getCategoryIcon(req.category)"></i>
              </div>
              <div>
                <div class="flex items-center gap-3 mb-1">
                  <h3 class="font-black text-foreground text-lg">
                    {{ req.title }}
                  </h3>
<<<<<<< HEAD
                  <span
                    :class="[
                      'px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter',
                      getStatusClass(req.status),
                    ]"
                  >
=======
                  <span :class="[
                    'px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter',
                    getStatusClass(req.status),
                  ]">
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
                    {{ getStatusLabel(req.status) }}
                  </span>
                </div>
                <p class="text-xs text-muted-foreground flex items-center gap-2">
                  <i class="fas fa-map-marker-alt text-secondary"></i>
                  {{ req.city }}, {{ req.location }}
                </p>
<<<<<<< HEAD
                <p
                  class="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-2"
                >
=======
                <p class="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-2">
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
                  Estimé à {{ formatPrice(req.price_estimate) }} FCFA
                </p>
              </div>
            </div>

            <!-- Agent Info -->
<<<<<<< HEAD
            <div
              class="bg-muted/10 p-4 rounded-2xl border border-border/50 flex items-center gap-4 min-w-[240px]"
            >
              <div v-if="req.agent" class="flex items-center gap-3 w-full">
                <div
                  class="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center text-secondary-foreground font-bold text-sm shrink-0"
                >
                  {{ req.agent.name.charAt(0) }}
                </div>
                <div class="flex-1 min-w-0">
                  <p
                    class="text-[9px] font-black text-muted-foreground uppercase tracking-widest leading-none mb-1"
                  >
=======
            <div class="bg-muted/10 p-4 rounded-2xl border border-border/50 flex items-center gap-4 min-w-[240px]">
              <div v-if="req.agent" class="flex items-center gap-3 w-full">
                <div
                  class="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center text-secondary-foreground font-bold text-sm shrink-0">
                  {{ req.agent.name.charAt(0) }}
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-[9px] font-black text-muted-foreground uppercase tracking-widest leading-none mb-1">
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
                    Agent Responsable
                  </p>
                  <p class="text-xs font-black text-foreground truncate">
                    {{ req.agent.name }}
                  </p>
                  <p class="text-[10px] text-secondary font-bold">
                    {{ req.agent.phone }}
                  </p>
                </div>
                <div
<<<<<<< HEAD
                  class="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shadow-sm border border-secondary/20"
                >
=======
                  class="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shadow-sm border border-secondary/20">
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
                  <i class="fas fa-phone-alt text-xs"></i>
                </div>
              </div>
              <div v-else class="flex flex-col w-full">
<<<<<<< HEAD
                <p
                  class="text-[9px] font-black text-muted-foreground uppercase tracking-widest leading-none mb-2"
                >
                  Agent Responsable
                </p>
                <div
                  class="flex items-center gap-2 text-blue-500 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 px-3 py-1.5 rounded-lg border border-blue-100 dark:border-blue-800"
                >
                  <i class="fas fa-spinner fa-spin text-[10px]"></i>
                  <span class="text-[10px] font-black uppercase tracking-tight"
                    >En attente d'affectation</span
                  >
=======
                <p class="text-[9px] font-black text-muted-foreground uppercase tracking-widest leading-none mb-2">
                  Agent Responsable
                </p>
                <div
                  class="flex items-center gap-2 text-blue-500 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 px-3 py-1.5 rounded-lg border border-blue-100 dark:border-blue-800">
                  <i class="fas fa-spinner fa-spin text-[10px]"></i>
                  <span class="text-[10px] font-black uppercase tracking-tight">En attente d'affectation</span>
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
                </div>
              </div>
            </div>

            <!-- Actions -->
<<<<<<< HEAD
            <div
              class="flex md:flex-col gap-2 shrink-0 w-full md:w-auto items-end"
            >
              <!-- Audit programmé -->
              <div
                v-if="req.scheduled_at && !req.visited_at"
                class="bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-800 p-3 rounded-2xl mb-2 w-full max-w-[220px] shadow-sm"
              >
                <p
                  class="text-[9px] font-black text-blue-500 dark:text-blue-400 uppercase tracking-widest leading-none mb-1 text-right"
                >
=======
            <div class="flex md:flex-col gap-2 shrink-0 w-full md:w-auto items-end">
              <!-- Audit programmé -->
              <div v-if="req.scheduled_at && !req.visited_at"
                class="bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-800 p-3 rounded-2xl mb-2 w-full max-w-[220px] shadow-sm">
                <p
                  class="text-[9px] font-black text-blue-500 dark:text-blue-400 uppercase tracking-widest leading-none mb-1 text-right">
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
                  📅 RDV Audit Terrain
                </p>
                <p class="text-xs font-black text-blue-800 dark:text-blue-300 text-right">
                  {{ formatDateFull(req.scheduled_at) }}
                </p>
<<<<<<< HEAD
                <p
                  v-if="req.agent_notes"
                  class="text-[9px] text-blue-600 dark:text-blue-400 italic text-right mt-1.5 border-t border-blue-100 dark:border-blue-800 pt-1"
                >
                  <i class="fas fa-quote-left mr-1 opacity-50"></i
                  >{{ req.agent_notes }}
                </p>
              </div>
              <button
                @click="openDetail(req)"
                class="flex-1 md:flex-none px-4 py-2 bg-primary text-primary-foreground text-xs font-black uppercase tracking-widest rounded-xl hover:bg-secondary hover:text-secondary-foreground transition-all flex items-center justify-center gap-2"
              >
                <i class="fas fa-eye"></i> Détails
              </button>
              <span
                v-if="req.visited_at"
                class="text-[9px] font-bold text-green-600 dark:text-green-400 text-center uppercase tracking-widest"
              >
=======
                <p v-if="req.agent_notes"
                  class="text-[9px] text-blue-600 dark:text-blue-400 italic text-right mt-1.5 border-t border-blue-100 dark:border-blue-800 pt-1">
                  <i class="fas fa-quote-left mr-1 opacity-50"></i>{{ req.agent_notes }}
                </p>
              </div>
              <button @click="openDetail(req)"
                class="flex-1 md:flex-none px-4 py-2 bg-primary text-primary-foreground text-xs font-black uppercase tracking-widest rounded-xl hover:bg-secondary hover:text-secondary-foreground transition-all flex items-center justify-center gap-2">
                <i class="fas fa-eye"></i> Détails
              </button>
              <span v-if="req.visited_at"
                class="text-[9px] font-bold text-green-600 dark:text-green-400 text-center uppercase tracking-widest">
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
                Audit Réalisé le {{ formatDate(req.visited_at) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Détails -->
    <Teleport to="body">
<<<<<<< HEAD
      <div
        v-if="selectedRequest"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-black/60 backdrop-blur-sm"
          @click="closeDetail"
        ></div>

        <!-- Modal Content -->
        <div
          class="relative bg-card rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden animate-modal"
        >
          <div
            class="px-6 py-4 border-b border-border flex items-center justify-between bg-card"
          >
=======
      <div v-if="selectedRequest" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="closeDetail"></div>

        <!-- Modal Content -->
        <div class="relative bg-card rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden animate-modal">
          <div class="px-6 py-4 border-b border-border flex items-center justify-between bg-card">
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
            <h3 class="font-black text-foreground text-lg flex items-center gap-2">
              <i class="fas fa-file-contract text-secondary"></i>
              Détails de la demande
            </h3>
<<<<<<< HEAD
            <button
              @click="closeDetail"
              class="w-8 h-8 rounded-full bg-muted/20 text-muted-foreground hover:bg-muted/30 hover:text-destructive flex items-center justify-center transition-colors"
            >
=======
            <button @click="closeDetail"
              class="w-8 h-8 rounded-full bg-muted/20 text-muted-foreground hover:bg-muted/30 hover:text-destructive flex items-center justify-center transition-colors">
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
              <i class="fas fa-times"></i>
            </button>
          </div>

          <div class="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
            <!-- Timeline -->
            <div class="mb-8">
              <h4 class="text-xs font-black text-foreground uppercase tracking-widest mb-4">
                Avancement
              </h4>
              <div class="flex items-center justify-between">
<<<<<<< HEAD
                <div
                  v-for="(step, idx) in statusSteps"
                  :key="step.key"
                  class="flex flex-col items-center relative flex-1"
                >
                  <div
                    class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold z-10 transition-all"
                    :class="
                      isStepDone(step.key)
=======
                <div v-for="(step, idx) in statusSteps" :key="step.key"
                  class="flex flex-col items-center relative flex-1">
                  <div
                    class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold z-10 transition-all"
                    :class="isStepDone(step.key)
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
                        ? 'bg-secondary text-secondary-foreground'
                        : isCurrentStep(step.key)
                          ? 'bg-secondary/30 text-secondary border-2 border-secondary'
                          : 'bg-muted/20 text-muted-foreground'
<<<<<<< HEAD
                    "
                  >
                    <i :class="step.icon"></i>
                  </div>
                  <p
                    class="text-[9px] font-bold text-center mt-2"
                    :class="
                      isStepDone(step.key)
                        ? 'text-secondary'
                        : isCurrentStep(step.key)
                          ? 'text-secondary'
                          : 'text-muted-foreground'
                    "
                  >
=======
                      ">
                    <i :class="step.icon"></i>
                  </div>
                  <p class="text-[9px] font-bold text-center mt-2" :class="isStepDone(step.key)
                      ? 'text-secondary'
                      : isCurrentStep(step.key)
                        ? 'text-secondary'
                        : 'text-muted-foreground'
                    ">
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
                    {{ step.label }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Infos -->
            <div class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div class="bg-muted/20 rounded-xl p-3">
                  <p class="text-[9px] text-muted-foreground uppercase font-bold mb-1">Titre</p>
                  <p class="text-sm font-bold text-foreground">{{ selectedRequest.title }}</p>
                </div>
                <div class="bg-muted/20 rounded-xl p-3">
                  <p class="text-[9px] text-muted-foreground uppercase font-bold mb-1">Catégorie</p>
                  <p class="text-sm font-bold text-foreground">{{ selectedRequest.category }}</p>
                </div>
              </div>

              <div class="bg-muted/20 rounded-xl p-3">
                <p class="text-[9px] text-muted-foreground uppercase font-bold mb-1">Description</p>
                <p class="text-sm text-foreground">{{ selectedRequest.description }}</p>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div class="bg-muted/20 rounded-xl p-3">
                  <p class="text-[9px] text-muted-foreground uppercase font-bold mb-1">Ville</p>
                  <p class="text-sm font-bold text-foreground">{{ selectedRequest.city }}</p>
                </div>
                <div class="bg-muted/20 rounded-xl p-3">
                  <p class="text-[9px] text-muted-foreground uppercase font-bold mb-1">Localisation</p>
                  <p class="text-sm font-bold text-foreground">{{ selectedRequest.location }}</p>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div class="bg-muted/20 rounded-xl p-3">
                  <p class="text-[9px] text-muted-foreground uppercase font-bold mb-1">Prix estimé</p>
                  <p class="text-sm font-bold text-secondary">
                    {{ formatPrice(selectedRequest.price_estimate) }} FCFA
                  </p>
                </div>
                <div class="bg-muted/20 rounded-xl p-3">
                  <p class="text-[9px] text-muted-foreground uppercase font-bold mb-1">Date de soumission</p>
                  <p class="text-sm font-bold text-foreground">
                    {{ formatDateFull(selectedRequest.created_at) }}
                  </p>
                </div>
              </div>

              <!-- Agent info -->
              <div v-if="selectedRequest.agent" class="bg-muted/20 rounded-xl p-4">
                <p class="text-[9px] text-muted-foreground uppercase font-bold mb-3">Agent assigné</p>
                <div class="flex items-center gap-3">
                  <div
<<<<<<< HEAD
                    class="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center text-secondary-foreground font-bold text-sm"
                  >
=======
                    class="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center text-secondary-foreground font-bold text-sm">
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
                    {{ selectedRequest.agent.name.charAt(0) }}
                  </div>
                  <div>
                    <p class="text-sm font-bold text-foreground">{{ selectedRequest.agent.name }}</p>
                    <p class="text-xs text-muted-foreground">{{ selectedRequest.agent.phone }}</p>
                  </div>
                </div>
              </div>

              <!-- Documents -->
              <div v-if="selectedRequest.documents?.length" class="mt-4">
                <p class="text-[9px] text-muted-foreground uppercase font-bold mb-2">Documents</p>
                <div class="flex flex-wrap gap-2">
<<<<<<< HEAD
                  <a
                    v-for="(doc, idx) in selectedRequest.documents"
                    :key="idx"
                    :href="`/storage/${doc}`"
                    target="_blank"
                    class="px-3 py-2 bg-muted/20 hover:bg-secondary/10 text-foreground rounded-lg text-xs font-bold transition-colors flex items-center gap-2"
                  >
=======
                  <a v-for="(doc, idx) in selectedRequest.documents" :key="idx" :href="`/storage/${doc}`"
                    target="_blank"
                    class="px-3 py-2 bg-muted/20 hover:bg-secondary/10 text-foreground rounded-lg text-xs font-bold transition-colors flex items-center gap-2">
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
                    <i class="fas fa-file-pdf text-secondary"></i>
                    Document {{ idx + 1 }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </DashboardLayout>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import DashboardLayout from "../../layouts/DashboardLayout.vue";
import { RouterLink } from "vue-router";
import axios from "../../axios";

const isLoading = ref(true);
const requests = ref([]);
const selectedRequest = ref(null);

const fetchData = async () => {
  isLoading.value = true;
  try {
    const { data } = await axios.get("/api/bailleur/publication-requests");
    if (data.success) requests.value = data.data;
  } catch (err) {
    console.error("Erreur chargement demandes bailleur:", err);
  } finally {
    isLoading.value = false;
  }
};

// ── Modale Détail ──
const openDetail = (req) => {
  selectedRequest.value = req;
};
const closeDetail = () => {
  selectedRequest.value = null;
};

// ── Timeline statut ──
const statusSteps = [
  { key: "pending", label: "Soumis", icon: "fas fa-paper-plane" },
  { key: "assigned", label: "Affecté", icon: "fas fa-user-shield" },
  { key: "visited", label: "Audité", icon: "fas fa-camera" },
  { key: "published", label: "Publié", icon: "fas fa-globe" },
];

const stepOrder = ["pending", "assigned", "visited", "published"];

const isStepDone = (key) => {
  const current = selectedRequest.value?.status;
  if (current === "rejected") return false;
  return stepOrder.indexOf(current) > stepOrder.indexOf(key);
};

const isCurrentStep = (key) => {
  const current = selectedRequest.value?.status;
  if (current === "rejected") return false;
  return current === key;
};

// ── Computed ──
const pendingCount = computed(
  () =>
    requests.value.filter(
      (r) => r.status !== "published" && r.status !== "rejected",
    ).length,
);
const publishedCount = computed(
  () => requests.value.filter((r) => r.status === "published").length,
);

// ── Formatters ──
const formatPrice = (p) => new Intl.NumberFormat("fr-FR").format(p || 0);
const formatDate = (d) =>
  d
    ? new Date(d).toLocaleDateString("fr-FR", {
<<<<<<< HEAD
        day: "numeric",
        month: "short",
      })
=======
      day: "numeric",
      month: "short",
    })
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
    : "—";
const formatDateFull = (d) =>
  d
    ? new Date(d).toLocaleDateString("fr-FR", {
<<<<<<< HEAD
        day: "numeric",
        month: "long",
        year: "numeric",
      })
=======
      day: "numeric",
      month: "long",
      year: "numeric",
    })
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
    : "—";

// ── Status helpers ──
const getStatusClass = (status) => {
  const map = {
    pending: "bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 border border-orange-100 dark:border-orange-800",
    assigned: "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800",
    visited: "bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 border border-purple-100 dark:border-purple-800",
    published: "bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 border border-green-100 dark:border-green-800",
    rejected: "bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-800",
  };
  return map[status] ?? "bg-muted/20 text-muted-foreground";
};

const getStatusBarColor = (status) => {
  const map = {
    pending: "bg-orange-400",
    assigned: "bg-blue-400",
    visited: "bg-purple-400",
    published: "bg-green-400",
    rejected: "bg-red-400",
  };
  return map[status] ?? "bg-muted-foreground/30";
};

const getStatusLabel = (status) => {
  const labels = {
    pending: "En attente",
    assigned: "Agent affecté",
    visited: "Audit effectué",
    published: "Publié",
    rejected: "Rejeté",
  };
  return labels[status] || status;
};

const getCategoryIcon = (cat) => {
  if (!cat) return "fas fa-building";
  const c = cat.toLowerCase();
  if (c.includes("villa")) return "fas fa-home";
  if (c.includes("studio")) return "fas fa-door-open";
  if (c.includes("terrain")) return "fas fa-mountain";
  return "fas fa-building";
};

onMounted(fetchData);
</script>

<style scoped>
@keyframes modalIn {
  from {
    opacity: 0;
    transform: translateY(24px) scale(0.97);
  }
<<<<<<< HEAD
=======

>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
<<<<<<< HEAD
=======

>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
.animate-modal {
  animation: modalIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
<<<<<<< HEAD
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
=======

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: hsl(var(--muted-foreground) / 0.3);
  border-radius: 4px;
}
<<<<<<< HEAD
=======

>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--muted-foreground) / 0.5);
}
</style>