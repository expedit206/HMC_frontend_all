<template>
  <DashboardLayout>
    <div class="max-w-7xl mx-auto h-full">
      <!-- HEADER SECTION -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 animate-fadeIn">
        <div>
          <h1 class="text-2xl font-bold text-foreground">
            Mes Missions (Validation)
          </h1>
          <p class="text-muted-foreground text-sm mt-1">
            Gérez les demandes entrantes et faites avancer le processus locatif.
          </p>
        </div>
        <div class="flex gap-2">
          <button @click="fetchMissions"
            class="px-4 py-2 bg-card border border-border text-muted-foreground rounded-lg hover:bg-muted/20 hover:text-secondary transition-colors text-sm font-bold flex items-center gap-2">
            <i class="fas fa-sync-alt" :class="{ 'fa-spin': isLoading }"></i>
            Actualiser
          </button>
        </div>
      </div>

      <!-- Erreur globale -->
      <div v-if="errorMessage"
        class="mb-6 p-4 bg-destructive/10 text-destructive rounded-xl border border-destructive/20 flex items-center gap-3">
        <i class="fas fa-exclamation-triangle"></i>
        <p class="text-sm font-bold">{{ errorMessage }}</p>
      </div>

      <!-- STATS CARDS -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-slide-up">
        <div @click="activeTab = 'visits'" :class="[
          'cursor-pointer bg-card p-5 rounded-2xl shadow-sm border transition-all flex items-center gap-4',
          activeTab === 'visits'
            ? 'border-secondary ring-1 ring-secondary'
            : 'border-border hover:border-muted-foreground',
        ]">
          <div class="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center text-xl">
            <i class="fas fa-calendar-check"></i>
          </div>
          <div>
            <p class="text-muted-foreground text-xs font-black uppercase tracking-widest">
              Visites à valider
            </p>
            <p class="text-2xl font-black text-foreground">
              {{ stats.visits }}
            </p>
          </div>
        </div>

        <div @click="activeTab = 'applications'" :class="[
          'cursor-pointer bg-card p-5 rounded-2xl shadow-sm border transition-all flex items-center gap-4',
          activeTab === 'applications'
            ? 'border-blue-500 ring-1 ring-blue-500'
            : 'border-border hover:border-muted-foreground',
        ]">
          <div
            class="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xl">
            <i class="fas fa-folder-open"></i>
          </div>
          <div>
            <p class="text-muted-foreground text-xs font-black uppercase tracking-widest">
              Dossiers à examiner
            </p>
            <p class="text-2xl font-black text-foreground">
              {{ stats.applications }}
            </p>
          </div>
        </div>

        <div @click="activeTab = 'payments'" :class="[
          'cursor-pointer bg-card p-5 rounded-2xl shadow-sm border transition-all flex items-center gap-4',
          activeTab === 'payments'
            ? 'border-green-500 ring-1 ring-green-500'
            : 'border-border hover:border-muted-foreground',
        ]">
          <div
            class="w-12 h-12 rounded-xl bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 flex items-center justify-center text-xl">
            <i class="fas fa-money-bill-wave"></i>
          </div>
          <div>
            <p class="text-muted-foreground text-xs font-black uppercase tracking-widest">
              Paiements attendus
            </p>
            <p class="text-2xl font-black text-foreground">
              {{ stats.payments }}
            </p>
          </div>
        </div>

        <div @click="activeTab = 'audit'" :class="[
          'cursor-pointer bg-card p-5 rounded-2xl shadow-sm border transition-all flex items-center gap-4',
          activeTab === 'audit'
            ? 'border-purple-500 ring-1 ring-purple-500'
            : 'border-border hover:border-muted-foreground',
        ]">
          <div
            class="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 flex items-center justify-center text-xl">
            <i class="fas fa-camera-retro"></i>
          </div>
          <div>
            <p class="text-muted-foreground text-xs font-black uppercase tracking-widest">
              Audits Terrain
            </p>
            <p class="text-2xl font-black text-foreground">
              {{ stats.audit }}
            </p>
          </div>
        </div>
      </div>

      <!-- LOADING STATE -->
      <div v-if="isLoading" class="py-20 text-center">
        <div class="w-12 h-12 border-4 border-secondary/20 border-t-secondary rounded-full animate-spin mx-auto mb-4">
        </div>
        <p class="text-muted-foreground text-sm font-bold uppercase tracking-widest">
          Chargement de vos missions...
        </p>
      </div>

      <div v-else>
        <!-- TAB 1 : VISITES -->
        <div v-if="activeTab === 'visits'" class="animate-fadeIn">
          <h2 class="text-lg font-black text-foreground mb-4">
            Visites en attente de confirmation agent
          </h2>
          <div v-if="missions.visits.length === 0" class="bg-card p-10 rounded-2xl border border-border text-center">
            <div
              class="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-3 text-muted-foreground/30 text-2xl">
              <i class="fas fa-calendar-times"></i>
            </div>
            <p class="text-muted-foreground font-bold">Aucune visite en attente.</p>
          </div>
          <div v-else class="space-y-4">
            <div v-for="v in missions.visits" :key="v.id"
              class="bg-card p-5 rounded-2xl border border-border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div class="flex items-start gap-4">
                <div
                  class="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex flex-shrink-0 items-center justify-center text-xl">
                  <i class="fas fa-home"></i>
                </div>
                <div>
                  <p class="font-black text-foreground">
                    {{ v.property?.title }}
                  </p>
                  <p class="text-xs text-muted-foreground mb-1">
                    <i class="fas fa-user text-muted-foreground/50 mr-1"></i> Client :
                    <strong class="text-foreground">{{ v.visitor?.name }}</strong>
                  </p>
                  <p class="text-xs text-muted-foreground">
                    <i class="fas fa-calendar-alt text-muted-foreground/50 mr-1"></i>
                    Date prévue : {{ formatDate(v.scheduled_at) }}
                  </p>
                  <!-- Badge Paiement -->
                  <div class="mt-2 flex items-center gap-2">
                    <span :class="[
                      'px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm',
                      v.fee_payment_status === 'paid' || v.fee_payment_status === 'waived'
                        ? 'bg-green-100 text-green-700 border border-green-200'
                        : 'bg-orange-100 text-orange-700 border border-orange-200'
                    ]">
                      <i :class="v.fee_payment_status === 'paid' ? 'fas fa-check-circle' : 'fas fa-clock'"></i>
                      {{ v.fee_payment_status === 'paid' ? 'Frais de visite réglés' : 'Frais de visite en attente' }}
                    </span>
                  </div>
                </div>
              </div>
              <div class="flex gap-2 w-full md:w-auto mt-2 md:mt-0">
                <button @click="cancelVisit(v.id)" :disabled="actionLoading"
                  class="flex-1 md:flex-none px-4 py-2 border border-destructive/20 text-destructive rounded-lg hover:bg-destructive/10 text-sm font-bold transition-colors disabled:opacity-50">
                  Annuler
                </button>
                <button @click="confirmVisit(v.id)" :disabled="actionLoading"
                  class="flex-1 md:flex-none px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 text-sm font-bold transition-colors disabled:opacity-50 shadow-md flex items-center justify-center gap-2">
                  <i class="fas fa-check"></i> Confirmer la visite
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- TAB 2 : DOSSIERS -->
        <div v-if="activeTab === 'applications'" class="animate-fadeIn">
          <h2 class="text-lg font-black text-foreground mb-4">
            Dossiers de candidature à examiner
          </h2>
          <div v-if="missions.applications.length === 0"
            class="bg-card p-10 rounded-2xl border border-border text-center">
            <div
              class="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-3 text-muted-foreground/30 text-2xl">
              <i class="fas fa-folder"></i>
            </div>
            <p class="text-muted-foreground font-bold">Aucun dossier en attente.</p>
          </div>
          <div v-else class="space-y-4">
            <div v-for="app in missions.applications" :key="app.id"
              class="bg-card p-5 rounded-2xl border border-border shadow-sm">
              <div class="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
                <div class="flex items-start gap-4">
                  <div
                    class="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 flex flex-shrink-0 items-center justify-center text-xl">
                    <i class="fas fa-file-contract"></i>
                  </div>
                  <div>
                    <h3 class="font-black text-foreground">
                      Candidature de {{ app.applicant?.name }}
                    </h3>
                    <p class="text-xs text-muted-foreground mb-1">
                      Bien :
                      <span class="font-bold text-foreground">{{
                        app.property?.title
                      }}</span>
                    </p>
                    <p class="text-xs text-muted-foreground">
                      Loyer mensuel du bien :
                      {{ formatPrice(app.property?.price) }} FCFA
                    </p>
                  </div>
                </div>
                <div class="text-right w-full md:w-auto bg-muted/20 p-3 rounded-xl border border-border">
                  <p class="text-[10px] text-muted-foreground uppercase font-black tracking-wider mb-1">
                    Profil postulant
                  </p>
                  <p class="text-xs font-bold text-foreground capitalize">
                    {{ app.situation_professionnelle }}
                  </p>
                  <p class="text-xs text-muted-foreground mt-0.5">
                    Revenus :
                    {{
                      app.revenus_mensuels
                        ? formatPrice(app.revenus_mensuels) + " FCFA"
                        : "Non précisé"
                    }}
                  </p>
                  <p v-if="app.has_garant" class="text-xs text-green-600 dark:text-green-400 font-bold mt-1">
                    <i class="fas fa-shield-alt"></i> A un garant
                  </p>
                </div>
              </div>

              <div class="flex flex-col sm:flex-row gap-3 mt-4 pt-4 border-t border-border">
                <button @click="openDocumentsModal(app)"
                  class="px-4 py-2 border border-border text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/30 text-sm font-bold flex flex-1 items-center justify-center gap-2 transition-colors">
                  <i class="fas fa-folder-open"></i> Voir les documents
                </button>
                <button @click="rejectAppPrompt(app)" :disabled="actionLoading"
                  class="px-4 py-2 border border-destructive/20 text-destructive rounded-lg hover:bg-destructive/10 text-sm font-bold flex flex-1 items-center justify-center gap-2 transition-colors disabled:opacity-50">
                  <i class="fas fa-times"></i> Rejeter
                </button>
                <button @click="openValidateForm(app)" :disabled="actionLoading"
                  class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-bold flex flex-1 items-center justify-center gap-2 transition-colors disabled:opacity-50 shadow-md">
                  <i class="fas fa-check-double"></i> Valider Dossier
                </button>
              </div>

              <!-- Formulaire de validation (Inline) -->
              <div v-if="validatingAppId === app.id"
                class="mt-4 p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-800 rounded-xl">
                <h5 class="text-xs font-black text-blue-800 dark:text-blue-300 mb-3 flex items-center gap-1">
                  <i class="fas fa-file-signature"></i> Paramètres de la
                  location
                </h5>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label class="block text-xs font-bold text-foreground mb-1">Mois d'avance *</label>
                    <input v-model="validateForm.advance_months" type="number" min="1" max="12"
                      class="w-full text-sm p-2.5 rounded-lg border border-blue-200 dark:border-blue-800 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-400/40" />
                  </div>
                  <div>
                    <label class="block text-xs font-bold text-foreground mb-1">Date de début *</label>
                    <input v-model="validateForm.start_date" type="date"
                      class="w-full text-sm p-2.5 rounded-lg border border-blue-200 dark:border-blue-800 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-400/40" />
                  </div>
                  <div>
                    <label class="block text-xs font-bold text-foreground mb-1">Notes (optionnel)</label>
                    <input v-model="validateForm.notes" type="text"
                      class="w-full text-sm p-2.5 rounded-lg border border-blue-200 dark:border-blue-800 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-400/40"
                      placeholder="Remarques..." />
                  </div>
                </div>
                <div v-if="validateError" class="mt-2 text-xs text-destructive font-bold flex items-center gap-1">
                  <i class="fas fa-exclamation-triangle"></i>
                  {{ validateError }}
                </div>
                <div class="flex justify-end gap-2 mt-3">
                  <button @click="
                    validatingAppId = null;
                  validateError = '';
                  " class="px-3 py-1.5 text-xs font-bold text-muted-foreground hover:bg-muted/20 rounded-md">
                    Annuler
                  </button>
                  <button @click="validateApp(app.id)" :disabled="actionLoading"
                    class="px-4 py-1.5 text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 rounded-md disabled:opacity-50 flex items-center gap-1">
                    <i class="fas fa-check-double"></i> Confirmer la validation
                  </button>
                </div>
              </div>

              <!-- Raison du rejet (Inline) -->
              <div v-if="rejectingAppId === app.id"
                class="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-xl">
                <label class="block text-xs font-bold text-destructive mb-2">Motif du rejet (obligatoire)</label>
                <textarea v-model="rejectReason"
                  class="w-full text-sm p-3 rounded-lg border border-destructive/20 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-destructive/30"
                  rows="2" placeholder="Ex: Revenus insuffisants..."></textarea>
                <div class="flex justify-end gap-2 mt-2">
                  <button @click="rejectingAppId = null"
                    class="px-3 py-1.5 text-xs font-bold text-muted-foreground hover:bg-muted/20 rounded-md">
                    Annuler
                  </button>
                  <button @click="confirmRejectApp(app.id)" :disabled="!rejectReason || actionLoading"
                    class="px-3 py-1.5 text-xs font-bold bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-md disabled:opacity-50">
                    Confirmer le rejet
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- TAB 3 : PAIEMENTS -->
        <div v-if="activeTab === 'payments'" class="animate-fadeIn">
          <h2 class="text-lg font-black text-foreground mb-4">
            Paiements / Locataires à confirmer
          </h2>
          <div v-if="missions.payments.length === 0" class="bg-card p-10 rounded-2xl border border-border text-center">
            <div
              class="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-3 text-muted-foreground/30 text-2xl">
              <i class="fas fa-check-circle"></i>
            </div>
            <p class="text-muted-foreground font-bold">
              Aucun paiement en attente. Tout est à jour.
            </p>
          </div>
          <div v-else class="space-y-4">
            <div v-for="rent in missions.payments" :key="rent.id"
              class="bg-card p-5 rounded-2xl border-l-4 border-l-green-500 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div class="flex items-start gap-4">
                <div
                  class="w-12 h-12 rounded-xl bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 flex flex-shrink-0 items-center justify-center text-xl">
                  <i class="fas fa-hand-holding-usd"></i>
                </div>
                <div>
                  <p class="font-black text-foreground">
                    {{ rent.property?.title }}
                  </p>
                  <p class="text-xs text-muted-foreground mb-1">
                    Futur Locataire : <strong class="text-foreground">{{ rent.tenant?.name }}</strong>
                  </p>
                  <p class="text-sm font-bold text-green-600 dark:text-green-400 mt-2">
                    Montant attendu :
                    {{ formatPrice(rent.monthly_rent) }} FCFA
                  </p>
                </div>
              </div>
              <div class="w-full md:w-auto mt-2 md:mt-0">
                <button @click="confirmPayment(rent.id)" :disabled="actionLoading"
                  class="w-full md:w-auto px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 text-sm font-bold transition-all shadow-lg hover:-translate-y-1 disabled:opacity-50 disabled:transform-none flex items-center justify-center gap-2">
                  <i class="fas fa-check-circle"></i> Confirmer Paiement
                </button>
                <p class="text-[10px] text-center text-muted-foreground mt-2 max-w-[200px]">
                  En confirmant, vous attribuez le rôle "Locataire" à ce client.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- TAB 4 : AUDITS TERRAIN -->
        <div v-if="activeTab === 'audit'" class="animate-fadeIn">
          <h2 class="text-lg font-black text-foreground mb-4">
            Missions d'audit &amp; publication terrain
          </h2>

          <!-- Liste vide -->
          <div v-if="missions.audit.length === 0" class="bg-card p-10 rounded-2xl border border-border text-center">
            <div
              class="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-3 text-muted-foreground/30 text-2xl">
              <i class="fas fa-camera-retro"></i>
            </div>
            <p class="text-muted-foreground font-bold">
              Aucune mission d'audit assignée.
            </p>
            <p class="text-xs text-muted-foreground/70 mt-1">
              Les demandes de bailleurs vous seront assignées par
              l'administration.
            </p>
          </div>

          <!-- Cartes de missions -->
          <div v-else class="space-y-4">
            <div v-for="mission in missions.audit" :key="mission?.id"
              class="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
              <!-- En-tête carte -->
              <div class="flex flex-col md:flex-row gap-4 p-5">
                <div
                  class="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 flex flex-shrink-0 items-center justify-center text-xl">
                  <i class="fas fa-map-marker-alt"></i>
                </div>
                <div class="flex-1">
                  <div class="flex items-start justify-between gap-2 flex-wrap">
                    <div>
                      <h3 class="font-black text-foreground">
                        {{ mission?.title }}
                      </h3>
                      <p class="text-xs text-muted-foreground mt-0.5">
                        <i class="fas fa-user mr-1 text-muted-foreground/50"></i>
                        Bailleur :
                        <strong class="text-foreground">{{ mission?.bailleur?.name }}</strong>
                      </p>
                    </div>
                    <span
                      class="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-800 whitespace-nowrap">
                      {{
                        mission?.status === "assigned"
                          ? "À visiter"
                          : mission?.status === "visited"
                            ? "Visité"
                            : mission?.status
                      }}
                    </span>
                  </div>

                  <!-- Notification Report Bailleur -->
                  <div v-if="mission?.bailleur_declined_at"
                    class="mt-3 bg-red-50 border border-red-100 p-3 rounded-xl flex items-center justify-between gap-4">
                    <div class="flex items-center gap-3">
                      <div class="w-8 h-8 bg-red-100 text-red-600 rounded-lg flex items-center justify-center">
                        <i class="fas fa-calendar-times"></i>
                      </div>
                      <div>
                        <p class="text-[10px] font-black text-red-800 uppercase leading-none">Report demandé</p>
                        <p v-if="mission?.bailleur_suggested_at" class="text-xs font-bold text-red-600 mt-1">
                          Suggère : {{ formatDate(mission?.bailleur_suggested_at) }}
                        </p>
                      </div>
                    </div>
                    <p v-if="mission?.bailleur_notes"
                      class="hidden sm:block text-[10px] text-red-400 italic bg-white/50 px-2 py-1 rounded max-w-[200px] truncate">
                      "{{ mission?.bailleur_notes }}"
                    </p>
                  </div>

                  <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
                    <div class="bg-muted/20 rounded-lg p-2">
                      <p class="text-[10px] text-muted-foreground uppercase font-bold">
                        Ville
                      </p>
                      <p class="text-xs font-bold text-foreground truncate">
                        {{ mission?.city }}
                      </p>
                    </div>
                    <div class="bg-muted/20 rounded-lg p-2">
                      <p class="text-[10px] text-muted-foreground uppercase font-bold">
                        Catégorie
                      </p>
                      <p class="text-xs font-bold text-foreground capitalize">
                        {{ mission?.category }}
                      </p>
                    </div>
                    <div class="bg-muted/20 rounded-lg p-2">
                      <p class="text-[10px] text-muted-foreground uppercase font-bold">
                        Type
                      </p>
                      <p class="text-xs font-bold text-foreground">
                        {{ mission?.type === "rent" ? "Location" : "Vente" }}
                      </p>
                    </div>
                    <div class="bg-muted/20 rounded-lg p-2">
                      <p class="text-[10px] text-muted-foreground uppercase font-bold">
                        Prix estimé
                      </p>
                      <p class="text-xs font-bold text-purple-600 dark:text-purple-400">
                        {{
                          mission?.price_estimate
                            ? formatPrice(mission?.price_estimate) + " F"
                            : "Non défini"
                        }}
                      </p>
                    </div>
                  </div>

                  <p v-if="mission?.location" class="text-xs text-muted-foreground mt-2">
                    <i class="fas fa-map-pin mr-1 text-muted-foreground/50"></i>{{ mission?.location }}
                  </p>
                  <p v-if="mission?.description" class="text-xs text-muted-foreground/70 mt-1 line-clamp-2">
                    {{ mission?.description }}
                  </p>
                </div>
              </div>

              <!-- Action -->
              <div class="border-t border-border px-5 py-3 bg-muted/10 flex justify-between items-center gap-2">
                <div class="flex gap-2">
                  <button v-if="
                    mission?.status === 'assigned' && (!mission?.scheduled_at || mission?.bailleur_declined_at)
                  " @click="openScheduleModal(mission)"
                    class="px-4 py-2.5 bg-blue-600/10 text-blue-700 rounded-xl hover:bg-blue-600 hover:text-white text-sm font-bold transition-all flex items-center gap-2">
                    <i class="fas fa-calendar-plus"></i>
                    Programmer l'audit
                  </button>
                  <div v-else-if="mission?.scheduled_at"
                    class="px-4 py-2.5 bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800 rounded-xl text-xs font-bold flex items-center gap-2">
                    <i class="fas fa-calendar-check"></i>
                    Audit : {{ formatDate(mission?.scheduled_at) }}
                  </div>

                  <button @click="
                    $router.push({
                      name: 'AgentPublierBien',
                      params: { id: mission?.id },
                    })
                    "
                    class="px-4 py-2.5 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-400 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-950/30 text-sm font-bold transition-colors flex items-center gap-2">
                    <i class="fas fa-eye"></i>
                    Détails
                  </button>
                </div>
                <button @click="openAuditForm(mission)" :disabled="actionLoading"
                  class="px-5 py-2.5 bg-purple-600 text-white rounded-xl hover:bg-purple-700 text-sm font-bold transition-all shadow-md hover:-translate-y-0.5 disabled:opacity-50 disabled:transform-none flex items-center gap-2">
                  <i class="fas fa-camera"></i>
                  Publier
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Formulaire de Programmation (Inline) -->
      <div v-if="schedulingMissionId === mission?.id"
        class="border-t border-blue-100 dark:border-blue-800 bg-blue-50/30 dark:bg-blue-950/20 p-5 animate-slide-down">
        <h4 class="text-sm font-black text-blue-800 dark:text-blue-300 mb-4 flex items-center gap-2">
          <i class="fas fa-calendar-day"></i>
          Fixer un rendez-vous avec le bailleur
        </h4>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold text-foreground mb-1">Date et heure de l'audit *</label>
            <input v-model="scheduleForm.scheduled_at" type="datetime-local"
              class="w-full text-sm p-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-400/40" />
          </div>
          <div>
            <label class="block text-xs font-bold text-foreground mb-1">Notes pour le bailleur (optionnel)</label>
            <input v-model="scheduleForm.agent_notes" type="text"
              class="w-full text-sm p-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-400/40"
              placeholder="Ex: Confirmez-moi votre disponibilité..." />
          </div>
        </div>
        <div class="flex justify-end gap-3 mt-4">
          <button @click="schedulingMissionId = null"
            class="px-4 py-2 text-sm font-bold text-muted-foreground hover:bg-muted/20 rounded-lg">
            Annuler
          </button>
          <button @click="submitSchedule(mission?.id)" :disabled="!scheduleForm.scheduled_at || actionLoading"
            class="px-6 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg shadow-lg hover:bg-blue-700 disabled:opacity-50 transition-all">
            <span v-if="actionLoading">Envoi...</span>
            <span v-else>Enregistrer le rendez-vous</span>
          </button>
        </div>
      </div>

      <!-- Formulaire de publication inline -->
      <div v-if="auditingMissionId === mission?.id"
        class="border-t-2 border-purple-200 dark:border-purple-800 bg-purple-50/30 dark:bg-purple-950/20 p-5">
        <h4 class="text-sm font-black text-purple-800 dark:text-purple-300 mb-4 flex items-center gap-2">
          <i class="fas fa-clipboard-list"></i>
          Rapport de terrain — Publication du bien
        </h4>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <!-- Titre -->
          <div class="sm:col-span-2">
            <label class="block text-xs font-bold text-foreground mb-1">Titre du bien *</label>
            <input v-model="auditForm.title" type="text"
              class="w-full text-sm p-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-400/40"
              placeholder="Ex: Appartement 3P lumineux, Bastos" />
          </div>

          <!-- Infos Form -->
          <div class="space-y-4">
            <div>
              <label class="block text-xs font-bold text-foreground mb-1">Catégorie *</label>
              <select v-model="auditForm.category"
                class="w-full text-sm p-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-400/40">
                <option value="" class="bg-card">-- Choisir --</option>
                <option value="appartement" class="bg-card">Appartement</option>
                <option value="villa" class="bg-card">Villa</option>
                <option value="studio" class="bg-card">Studio</option>
                <option value="duplex" class="bg-card">Duplex</option>
                <option value="bureau" class="bg-card">Bureau</option>
                <option value="commerce" class="bg-card">Commerce</option>
                <option value="terrain" class="bg-card">Terrain</option>
                <option value="autre" class="bg-card">Autre</option>
              </select>
            </div>

            <!-- Type -->
            <div>
              <label class="block text-xs font-bold text-foreground mb-1">Type *</label>
              <select v-model="auditForm.type"
                class="w-full text-sm p-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-400/40">
                <option value="rent" class="bg-card">Location</option>
                <option value="sale" class="bg-card">Vente</option>
              </select>
            </div>

            <!-- Prix -->
            <div>
              <label class="block text-xs font-bold text-foreground mb-1">Prix (FCFA) *</label>
              <input v-model="auditForm.price" type="number"
                class="w-full text-sm p-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-400/40"
                placeholder="Ex: 150000" />
            </div>

            <!-- Ville -->
            <div>
              <label class="block text-xs font-bold text-foreground mb-1">Ville *</label>
              <input v-model="auditForm.city" type="text"
                class="w-full text-sm p-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-400/40"
                placeholder="Ex: Yaoundé" />
            </div>

            <!-- Localisation -->
            <div class="sm:col-span-2">
              <label class="block text-xs font-bold text-foreground mb-1">Localisation précise *</label>
              <input v-model="auditForm.location" type="text"
                class="w-full text-sm p-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-400/40"
                placeholder="Ex: Quartier Bastos, rue des Ministres, face à l'école" />
            </div>

            <!-- Chambres / Salles de bain / Surface -->
            <div>
              <label class="block text-xs font-bold text-foreground mb-1">Chambres</label>
              <input v-model="auditForm.bedrooms" type="number" min="0"
                class="w-full text-sm p-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-400/40"
                placeholder="0" />
            </div>
            <div>
              <label class="block text-xs font-bold text-foreground mb-1">Salles de bain</label>
              <input v-model="auditForm.bathrooms" type="number" min="0"
                class="w-full text-sm p-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-400/40"
                placeholder="0" />
            </div>
            <div>
              <label class="block text-xs font-bold text-foreground mb-1">Surface (m²)</label>
              <input v-model="auditForm.area" type="number" min="0"
                class="w-full text-sm p-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-400/40"
                placeholder="Ex: 80" />
            </div>

            <!-- État du bien -->
            <div>
              <label class="block text-xs font-bold text-foreground mb-1">État du bien *</label>
              <select v-model="auditForm.etat"
                class="w-full text-sm p-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-400/40">
                <option value="" class="bg-card">-- Choisir --</option>
                <option value="neuf" class="bg-card">Neuf</option>
                <option value="bon" class="bg-card">Bon état</option>
                <option value="moyen" class="bg-card">État moyen</option>
                <option value="a_renover" class="bg-card">À rénover</option>
              </select>
            </div>

            <!-- Description -->
            <div class="sm:col-span-2">
              <label class="block text-xs font-bold text-foreground mb-1">Description *</label>
              <textarea v-model="auditForm.description" rows="3"
                class="w-full text-sm p-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-400/40"
                placeholder="Décrivez le bien tel que vous l'avez constaté sur place..."></textarea>
            </div>

            <!-- Photos -->
            <div class="sm:col-span-2">
              <label class="block text-xs font-bold text-foreground mb-1">Photos terrain *
                <span class="text-muted-foreground font-normal">(min. 1 photo, max 10)</span></label>
              <div
                class="border-2 border-dashed border-purple-200 dark:border-purple-800 rounded-xl p-4 text-center cursor-pointer hover:border-purple-400 transition-colors"
                @click="triggerFileInput(mission?.id)">
                <i class="fas fa-cloud-upload-alt text-purple-300 dark:text-purple-600 text-3xl mb-2"></i>
                <p class="text-xs text-muted-foreground">
                  Cliquer pour ajouter des photos JPEG / PNG / WebP (max 5
                  Mo chacune)
                </p>
                <input :id="'audit-input-' + mission?.id" type="file" multiple accept="image/jpeg,image/png,image/webp"
                  class="hidden" @change="onAuditImagesChange" />
              </div>
              <!-- Prévisualisation -->
              <div v-if="auditImagePreviews.length > 0" class="mt-3 flex flex-wrap gap-2">
                <div v-for="(preview, idx) in auditImagePreviews" :key="idx"
                  class="relative w-20 h-20 rounded-lg overflow-hidden border-2 border-purple-200 dark:border-purple-800">
                  <img :src="preview" class="w-full h-full object-cover" />
                  <button @click.stop="removeAuditImage(idx)"
                    class="absolute top-0.5 right-0.5 w-5 h-5 bg-destructive text-destructive-foreground rounded-full text-xs flex items-center justify-center hover:bg-destructive/90">
                    <i class="fas fa-times"></i>
                  </button>
                  <span v-if="idx === 0"
                    class="absolute bottom-0 left-0 right-0 text-center text-[8px] font-bold bg-purple-600 text-white py-0.5">Principale</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Erreur audit -->
          <div v-if="auditError"
            class="mt-3 p-3 bg-destructive/10 text-destructive rounded-lg text-xs flex items-center gap-2">
            <i class="fas fa-exclamation-triangle"></i>
            {{ auditError }}
          </div>

          <!-- Boutons -->
          <div class="mt-4 flex justify-end gap-3">
            <button @click="closeAuditForm"
              class="px-4 py-2 text-sm font-bold text-muted-foreground hover:bg-muted/20 rounded-lg transition-colors">
              Annuler
            </button>
            <button @click="submitAuditReport(mission?.id)" :disabled="actionLoading || auditImageFiles.length === 0"
              class="px-6 py-2.5 bg-purple-600 text-white text-sm font-bold rounded-xl hover:bg-purple-700 transition-all disabled:opacity-50 shadow-md flex items-center gap-2">
              <i class="fas fa-paper-plane"></i>
              <span v-if="actionLoading">Publication en cours...</span>
              <span v-else>Publier le bien</span>
            </button>
          </div>
        </div>
      </div>
    </div>
   

    <!-- Modal des documents -->
    <Teleport to="body">
      <div v-if="viewingDocsApp" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog"
        aria-modal="true">
        <div class="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <div class="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" aria-hidden="true"
            @click="viewingDocsApp = null"></div>

          <span class="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">&#8203;</span>

          <div
            class="relative inline-block transform overflow-hidden rounded-2xl bg-card text-left align-bottom shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:align-middle">
            <div class="bg-card px-6 pt-6 pb-4">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-black text-foreground" id="modal-title">
                  Documents de {{ viewingDocsApp.applicant?.name }}
                </h3>
                <button @click="viewingDocsApp = null"
                  class="rounded-full p-1 text-muted-foreground hover:bg-muted/20 transition-colors">
                  <i class="fas fa-times text-xl"></i>
                </button>
              </div>

              <div class="grid grid-cols-1 gap-3 max-h-[60vh] overflow-y-auto custom-scrollbar p-1">
                <a v-for="(path, type) in viewingDocsApp.documents" :key="type" :href="getDocumentUrl(path)"
                  target="_blank"
                  class="flex items-center gap-4 p-4 rounded-xl border border-border hover:bg-muted/10 transition-colors">
                  <div
                    class="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xl">
                    <i :class="getDocumentIcon(type)"></i>
                  </div>
                  <div class="flex-1">
                    <p class="text-sm font-bold text-foreground">
                      {{ getDocumentLabel(type) }}
                    </p>
                    <p class="text-xs text-muted-foreground mt-0.5">
                      Cliquer pour ouvrir
                    </p>
                  </div>
                  <i class="fas fa-external-link-alt text-muted-foreground"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </DashboardLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import DashboardLayout from "../../layouts/DashboardLayout.vue";
import { useRouter } from "vue-router";
import axios from "../../axios";

const router = useRouter();

const activeTab = ref("visits");

const isLoading = ref(true);
const actionLoading = ref(false);
const errorMessage = ref("");

const missions = ref({
  visits: [],
  applications: [],
  payments: [],
  audit: [],
});

const stats = ref({
  visits: 0,
  applications: 0,
  payments: 0,
  audit: 0,
});

const rejectingAppId = ref(null);
const rejectReason = ref("");

// ── Audit Form ──
const auditingMissionId = ref(null);
const auditError = ref("");
const auditImageFiles = ref([]);
const auditImagePreviews = ref([]);
const auditForm = ref({
  title: "",
  category: "",
  type: "rent",
  price: "",
  city: "",
  location: "",
  description: "",
  bedrooms: "",
  bathrooms: "",
  area: "",
  etat: "",
});

const fetchMissions = async () => {
  isLoading.value = true;
  errorMessage.value = "";
  try {
    const { data } = await axios.get("/api/agent/missions");
    if (data.success) {
      missions.value.visits = data.data.pending_visits || [];
      missions.value.applications = data.data.pending_applications || [];
      missions.value.payments = data.data.pending_payments || [];
      missions.value.audit = data.data.publication_missions || [];

      stats.value.visits = missions.value.visits.length;
      stats.value.applications = missions.value.applications.length;
      stats.value.payments = missions.value.payments.length;
      stats.value.audit = missions.value.audit.length;

      // Auto-basculer sur un tab qui a du contenu si le tab actuel est vide
      if (stats.value[activeTab.value] === 0) {
        if (stats.value.visits > 0) activeTab.value = "visits";
        else if (stats.value.applications > 0) activeTab.value = "applications";
        else if (stats.value.payments > 0) activeTab.value = "payments";
        else if (stats.value.audit > 0) activeTab.value = "audit";
        // sinon on laisse le tab actuel vide
      }
    }
  } catch (err) {
    errorMessage.value = "Erreur lors du chargement des missions.";
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};

// ── Actions Visites ──
const confirmVisit = async (visitId) => {
  actionLoading.value = true;
  errorMessage.value = "";
  try {
    const { data } = await axios.post(`/api/agent/visits/${visitId}/confirm`);
    if (data.success) await fetchMissions();
  } catch (err) {
    errorMessage.value =
      err.response?.data?.message || "Erreur lors de la confirmation.";
  } finally {
    actionLoading.value = false;
  }
};

const cancelVisit = async (visitId) => {
  if (!confirm("Êtes-vous sûr de vouloir annuler cette visite ?")) return;
  actionLoading.value = true;
  errorMessage.value = "";
  try {
    const { data } = await axios.post(`/api/agent/visits/${visitId}/cancel`);
    if (data.success) await fetchMissions();
  } catch (err) {
    errorMessage.value =
      err.response?.data?.message || "Erreur lors de l'annulation.";
  } finally {
    actionLoading.value = false;
  }
};

// ── Actions Dossiers ──

// Modale des documents
const viewingDocsApp = ref(null);
const openDocumentsModal = (app) => {
  viewingDocsApp.value = app;
};
const getDocumentLabel = (type) => {
  const labels = {
    cni: "Pièce d'identité (Recto)",
    cni_back: "Pièce d'identité (Verso)",
    address_proof: "Justificatif de domicile",
    payslip: "Fiche de paie / Justificatif de revenus",
    employment_contract: "Contrat de travail",
    tax_notice: "Avis d'imposition",
    guarantor_id: "Pièce d'identité du garant",
    guarantor_income: "Justificatif de revenus du garant",
  };
  return labels[type] || "Document divers";
};
const getDocumentIcon = (type) => {
  if (type === "cni" || type === "cni_back" || type === "guarantor_id")
    return "fas fa-id-card";
  if (
    type === "payslip" ||
    type === "tax_notice" ||
    type === "guarantor_income"
  )
    return "fas fa-file-invoice-dollar";
  if (type === "employment_contract") return "fas fa-file-signature";
  if (type === "address_proof") return "fas fa-home";
  return "fas fa-file-alt";
};

const getDocumentUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  const baseUrl = axios.defaults.baseURL
    ? axios.defaults.baseURL.replace(/\/$/, "")
    : "http://localhost:8000";
  return `${baseUrl}${path}`;
};

// Formulaire de validation de dossier
const validatingAppId = ref(null);
const validateForm = ref({ advance_months: 2, start_date: "", notes: "" });
const validateError = ref("");

const schedulingMissionId = ref(null);
const scheduleForm = ref({
  scheduled_at: "",
  agent_notes: "",
});

const openValidateForm = (app) => {
  validatingAppId.value = app.id;
  validateError.value = "";
  const d = new Date();
  d.setDate(d.getDate() + 7);
  validateForm.value = {
    advance_months: 2,
    start_date: d.toISOString().split("T")[0],
    notes: "",
  };
};

const validateApp = async (appId) => {
  const f = validateForm.value;
  if (!f.start_date) {
    validateError.value = "Veuillez saisir une date de début.";
    return;
  }
  actionLoading.value = true;
  errorMessage.value = "";
  validateError.value = "";
  try {
    const { data } = await axios.post(
      `/api/agent/applications/${appId}/validate`,
      {
        advance_months: f.advance_months,
        start_date: f.start_date,
        notes: f.notes || null,
      },
    );
    if (data.success) {
      validatingAppId.value = null;
      await fetchMissions();
    }
  } catch (err) {
    validateError.value =
      err.response?.data?.message || "Erreur lors de la validation.";
  } finally {
    actionLoading.value = false;
  }
};

const rejectAppPrompt = (app) => {
  rejectingAppId.value = app.id;
  rejectReason.value = "";
};

const confirmRejectApp = async (appId) => {
  actionLoading.value = true;
  errorMessage.value = "";
  try {
    const { data } = await axios.post(
      `/api/agent/applications/${appId}/reject`,
      { reason: rejectReason.value },
    );
    if (data.success) {
      rejectingAppId.value = null;
      rejectReason.value = "";
      await fetchMissions();
    }
  } catch (err) {
    errorMessage.value = err.response?.data?.message || "Erreur lors du rejet.";
  } finally {
    actionLoading.value = false;
  }
};

// ── Actions Paiements ──
const confirmPayment = async (rentalId) => {
  if (
    !confirm(
      "Confirmer la réception de ce paiement ? Cela activera la location et attribuera le rôle de locataire.",
    )
  )
    return;
  actionLoading.value = true;
  errorMessage.value = "";
  try {
    const { data } = await axios.post(
      `/api/agent/rentals/${rentalId}/confirm-payment`,
    );
    if (data.success) await fetchMissions();
  } catch (err) {
    errorMessage.value =
      err.response?.data?.message ||
      "Erreur lors de la confirmation du paiement.";
  } finally {
    actionLoading.value = false;
  }
};

// ── Actions Audit ──
const triggerFileInput = (missionId) => {
  const el = document.getElementById("audit-input-" + missionId);
  if (el) el.click();
};

const openAuditForm = (mission) => {
  auditingMissionId.value = mission?.id;
  schedulingMissionId.value = null;
  auditError.value = "";
  auditImageFiles.value = [];
  auditImagePreviews.value = [];
  auditForm.value = {
    title: mission?.title || "",
    category: mission?.category || "",
    type: mission?.type || "rent",
    price: mission?.price_estimate || "",
    city: mission?.city || "",
    location: mission?.location || "",
    description: mission?.description || "",
    bedrooms: mission?.bedrooms || "",
    bathrooms: mission?.bathrooms || "",
    area: mission?.area || "",
    etat: "",
  };
};

const openScheduleModal = (m) => {
  schedulingMissionId.value = m.id;
  auditingMissionId.value = null;
  scheduleForm.value = {
    scheduled_at: m.scheduled_at
      ? new Date(m.scheduled_at).toISOString().slice(0, 16)
      : "",
    agent_notes: m.agent_notes || "",
  };
};

const submitSchedule = async (missionId) => {
  if (!scheduleForm.value.scheduled_at) return;
  actionLoading.value = true;
  try {
    const { data } = await axios.post(
      `/api/agent/publication-missions/${missionId}/schedule`,
      scheduleForm.value,
    );
    if (data.success) {
      alert("Demande de rendez-vous enregistrée !");
      schedulingMissionId.value = null;
      await fetchMissions();
    }
  } catch (err) {
    console.error("Erreur programmation:", err);
    alert(err.response?.data?.message || "Erreur lors de la programmation.");
  } finally {
    actionLoading.value = false;
  }
};

const closeAuditForm = () => {
  auditingMissionId.value = null;
  auditError.value = "";
  auditImageFiles.value = [];
  auditImagePreviews.value = [];
};

const onAuditImagesChange = (event) => {
  const files = Array.from(event.target.files || []);
  const remaining = 10 - auditImageFiles.value.length;
  const toAdd = files.slice(0, remaining);
  toAdd.forEach((file) => {
    auditImageFiles.value.push(file);
    const reader = new FileReader();
    reader.onload = (e) => auditImagePreviews.value.push(e.target.result);
    reader.readAsDataURL(file);
  });
  event.target.value = "";
};

const removeAuditImage = (idx) => {
  auditImageFiles.value.splice(idx, 1);
  auditImagePreviews.value.splice(idx, 1);
};

const submitAuditReport = async (missionId) => {
  auditError.value = "";
  const f = auditForm.value;

  if (
    !f.title ||
    !f.category ||
    !f.type ||
    !f.price ||
    !f.city ||
    !f.location ||
    !f.description ||
    !f.etat
  ) {
    auditError.value = "Veuillez remplir tous les champs obligatoires (*)";
    return;
  }
  if (auditImageFiles.value.length === 0) {
    auditError.value = "Veuillez ajouter au moins une photo du bien.";
    return;
  }

  actionLoading.value = true;
  try {
    const formData = new FormData();
    formData.append("title", f.title);
    formData.append("category", f.category);
    formData.append("type", f.type);
    formData.append("price", f.price);
    formData.append("city", f.city);
    formData.append("location", f.location);
    formData.append("description", f.description);
    formData.append("etat", f.etat);
    if (f.bedrooms) formData.append("bedrooms", f.bedrooms);
    if (f.bathrooms) formData.append("bathrooms", f.bathrooms);
    if (f.area) formData.append("area", f.area);
    auditImageFiles.value.forEach((file) => formData.append("images[]", file));

    const { data } = await axios.post(
      `/api/agent/publication-missions/${missionId}/complete`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } },
    );

    if (data.success) {
      closeAuditForm();
      await fetchMissions();
    }
  } catch (err) {
    const msgs = err.response?.data?.errors
      ? Object.values(err.response.data.errors).flat().join(" ")
      : null;
    auditError.value =
      msgs || err.response?.data?.message || "Erreur lors de la publication.";
  } finally {
    actionLoading.value = false;
  }
};

// ── Utilitaires ──
const formatPrice = (p) => new Intl.NumberFormat("fr-CM").format(p || 0);
const formatDate = (d) => {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("fr-CM", {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });
};

onMounted(fetchMissions);
</script>

<style scoped>
.animate-fadeIn {
  animation: fadeIn 0.4s ease-out backwards;
}

.animate-slide-up {
  animation: slideUp 0.4s ease-out backwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(10px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: hsl(var(--muted) / 0.2);
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: hsl(var(--muted-foreground) / 0.3);
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--muted-foreground) / 0.5);
}
</style>