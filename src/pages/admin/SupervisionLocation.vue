<template>
  <div class="dashboard-page-content">

        <div class="max-w-7xl mx-auto space-y-6">
          <!-- ══ KPI CARDS ══════════════════════════════════════════════════ -->
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div
              v-for="kpi in kpiCards"
              :key="kpi.label"
              class="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <div class="text-3xl font-black mb-1" :class="kpi.color">
                {{ statsLoading ? "…" : kpi.value }}
              </div>
              <div
                class="text-xs font-semibold text-gray-500 uppercase tracking-wide"
              >
                {{ kpi.label }}
              </div>
              <div
                :class="['inline-block mt-2 w-2 h-2 rounded-full', kpi.dot]"
              ></div>
            </div>
          </div>

          <!-- ══ FILTRES ═════════════════════════════════════════════════════ -->
          <div
            class="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm"
          >
            <div class="flex flex-wrap gap-3 items-end">
              <!-- Recherche -->
              <div class="flex-1 min-w-48">
                <label class="block text-xs font-semibold text-gray-500 mb-1"
                  >Recherche</label
                >
                <div class="relative">
                  <i
                    class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"
                  ></i>
                  <input
                    v-model="filters.search"
                    @input="debouncedFetch"
                    type="text"
                    placeholder="Nom, email, bien, ville..."
                    class="w-full pl-8 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E54801]/30 focus:border-[#E54801]"
                  />
                </div>
              </div>

              <!-- Statut -->
              <div class="min-w-40">
                <label class="block text-xs font-semibold text-gray-500 mb-1"
                  >Statut</label
                >
                <select
                  v-model="filters.status"
                  @change="fetchRentals"
                  class="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E54801]/30 focus:border-[#E54801]"
                >
                  <option value="">Tous</option>
                  <option value="pending">En attente</option>
                  <option value="active">Actifs</option>
                  <option value="finished">Terminés</option>
                  <option value="cancelled">Annulés</option>
                </select>
              </div>

              <!-- Date de -->
              <div class="min-w-36">
                <label class="block text-xs font-semibold text-gray-500 mb-1"
                  >Du</label
                >
                <input
                  v-model="filters.date_from"
                  @change="fetchRentals"
                  type="date"
                  class="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E54801]/30 focus:border-[#E54801]"
                />
              </div>

              <!-- Date au -->
              <div class="min-w-36">
                <label class="block text-xs font-semibold text-gray-500 mb-1"
                  >Au</label
                >
                <input
                  v-model="filters.date_to"
                  @change="fetchRentals"
                  type="date"
                  class="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E54801]/30 focus:border-[#E54801]"
                />
              </div>

              <!-- Reset -->
              <button
                @click="resetFilters"
                class="px-4 py-2.5 text-sm text-gray-500 hover:text-[#E54801] hover:bg-orange-50 rounded-xl border border-gray-200 transition-all font-medium"
              >
                <i class="fas fa-times mr-1.5"></i>Réinitialiser
              </button>
            </div>
          </div>

          <!-- ══ TABLE ═══════════════════════════════════════════════════════ -->
          <div
            class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
          >
            <!-- Entête table -->
            <div
              class="flex items-center justify-between px-6 py-4 border-b border-gray-100"
            >
              <h2 class="font-bold text-gray-800 flex items-center gap-2">
                <i class="fas fa-list text-[#E54801]"></i>
                Toutes les demandes
                <span
                  class="text-xs bg-gray-100 text-gray-500 font-semibold px-2 py-0.5 rounded-full"
                >
                  {{ pagination.total ?? "…" }}
                </span>
              </h2>
            </div>

            <!-- Loading -->
            <div v-if="isLoading" class="py-16 text-center">
              <div
                class="w-10 h-10 border-4 border-[#E54801] border-t-transparent rounded-full animate-spin mx-auto mb-3"
              ></div>
              <p class="text-sm text-gray-400">Chargement...</p>
            </div>

            <!-- Empty -->
            <div v-else-if="!rentals.length" class="py-20 text-center">
              <i class="fas fa-inbox text-5xl text-gray-200 mb-4"></i>
              <p class="text-gray-400 font-medium">
                Aucune demande de location trouvée
              </p>
              <p class="text-xs text-gray-300 mt-1">
                Modifiez vos filtres ou attendez de nouvelles demandes
              </p>
            </div>

            <!-- Table -->
            <div v-else class="overflow-x-auto">
              <table class="w-full text-sm">
                <thead class="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th
                      class="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                    >
                      #
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                    >
                      Locataire
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                    >
                      Bien immobilier
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                    >
                      Loyer
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                    >
                      Période
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                    >
                      Progression
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                    >
                      Statut
                    </th>
                    <th
                      class="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-50">
                  <tr
                    v-for="rental in rentals"
                    :key="rental.id"
                    class="hover:bg-gray-50/60 transition-colors group"
                  >
                    <!-- ID -->
                    <td class="px-6 py-4">
                      <span class="text-xs font-bold text-gray-400"
                        >#{{ rental.id }}</span
                      >
                    </td>

                    <!-- Locataire -->
                    <td class="px-6 py-4">
                      <div class="flex items-center gap-3">
                        <div
                          class="w-9 h-9 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                        >
                          {{
                            rental.tenant?.name?.charAt(0)?.toUpperCase() ?? "?"
                          }}
                        </div>
                        <div>
                          <p class="font-semibold text-gray-800 text-sm">
                            {{ rental.tenant?.name ?? "N/A" }}
                          </p>
                          <p class="text-xs text-gray-400">
                            {{
                              rental.tenant?.phone ?? rental.tenant?.email ?? ""
                            }}
                          </p>
                        </div>
                      </div>
                    </td>

                    <!-- Bien -->
                    <td class="px-6 py-4">
                      <div>
                        <p
                          class="font-semibold text-gray-800 text-sm line-clamp-1 max-w-48"
                        >
                          {{ rental.property?.title ?? "N/A" }}
                        </p>
                        <p
                          class="text-xs text-gray-400 flex items-center gap-1 mt-0.5"
                        >
                          <i class="fas fa-map-marker-alt text-[#E54801]"></i>
                          {{ rental.property?.city ?? "" }}
                        </p>
                      </div>
                    </td>

                    <!-- Loyer -->
                    <td class="px-6 py-4">
                      <span class="font-bold text-[#E54801]">{{
                        formatPrice(rental.price)
                      }}</span>
                      <span class="text-xs text-gray-400 ml-1">F/mois</span>
                    </td>

                    <!-- Période -->
                    <td class="px-6 py-4">
                      <div class="text-xs text-gray-600 space-y-0.5">
                        <div>
                          <i
                            class="fas fa-play text-green-400 mr-1 text-[10px]"
                          ></i
                          >{{ formatDate(rental.start_date) }}
                        </div>
                        <div v-if="rental.end_date">
                          <i
                            class="fas fa-stop text-red-400 mr-1 text-[10px]"
                          ></i
                          >{{ formatDate(rental.end_date) }}
                        </div>
                      </div>
                    </td>

                    <!-- Progression -->
                    <td class="px-6 py-4">
                      <div class="flex items-center gap-2 min-w-28">
                        <div
                          class="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden"
                        >
                          <div
                            class="h-2 rounded-full transition-all duration-500"
                            :class="progressColor(rental.status)"
                            :style="{
                              width: (rental.progress_percent ?? 0) + '%',
                            }"
                          ></div>
                        </div>
                        <span
                          class="text-xs font-bold text-gray-400 w-8 text-right"
                          >{{ rental.progress_percent ?? 0 }}%</span
                        >
                      </div>
                    </td>

                    <!-- Statut -->
                    <td class="px-6 py-4">
                      <span
                        :class="statusBadge(rental.status)"
                        class="px-2.5 py-1 rounded-full text-xs font-bold"
                      >
                        {{ rental.status_label ?? rental.status }}
                      </span>
                    </td>

                    <!-- Actions -->
                    <td class="px-6 py-4">
                      <div
                        class="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <!-- Voir détail -->
                        <button
                          @click="openDetail(rental)"
                          class="p-2 text-gray-400 hover:text-[#E54801] hover:bg-orange-50 rounded-lg transition-all"
                          title="Voir le détail"
                        >
                          <i class="fas fa-eye text-xs"></i>
                        </button>

                        <!-- Activer -->
                        <button
                          v-if="rental.status === 'pending'"
                          @click="changeStatus(rental, 'active')"
                          class="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all"
                          title="Activer la location"
                        >
                          <i class="fas fa-check text-xs"></i>
                        </button>

                        <!-- Terminer -->
                        <button
                          v-if="rental.status === 'active'"
                          @click="changeStatus(rental, 'finished')"
                          class="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                          title="Marquer comme terminée"
                        >
                          <i class="fas fa-flag-checkered text-xs"></i>
                        </button>

                        <!-- Annuler -->
                        <button
                          v-if="['pending', 'active'].includes(rental.status)"
                          @click="openCancelModal(rental)"
                          class="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          title="Annuler"
                        >
                          <i class="fas fa-ban text-xs"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Pagination -->
            <div
              v-if="pagination.last_page > 1"
              class="flex items-center justify-between px-6 py-4 border-t border-gray-100"
            >
              <p class="text-sm text-gray-500">
                Page {{ pagination.current_page }} / {{ pagination.last_page }}
                <span class="text-gray-400"
                  >({{ pagination.total }} au total)</span
                >
              </p>
              <div class="flex gap-2">
                <button
                  @click="changePage(pagination.current_page - 1)"
                  :disabled="pagination.current_page <= 1"
                  class="px-3 py-1.5 text-sm border border-gray-200 rounded-lg disabled:opacity-40 hover:border-[#E54801] hover:text-[#E54801] transition-all"
                >
                  <i class="fas fa-chevron-left text-xs"></i>
                </button>
                <button
                  v-for="p in paginationPages"
                  :key="p"
                  @click="changePage(p)"
                  :class="[
                    'px-3 py-1.5 text-sm rounded-lg border transition-all',
                    p === pagination.current_page
                      ? 'bg-[#E54801] text-white border-[#E54801]'
                      : 'border-gray-200 hover:border-[#E54801] hover:text-[#E54801]',
                  ]"
                >
                  {{ p }}
                </button>
                <button
                  @click="changePage(pagination.current_page + 1)"
                  :disabled="pagination.current_page >= pagination.last_page"
                  class="px-3 py-1.5 text-sm border border-gray-200 rounded-lg disabled:opacity-40 hover:border-[#E54801] hover:text-[#E54801] transition-all"
                >
                  <i class="fas fa-chevron-right text-xs"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      

    <transition name="modal">
      <div
        v-if="detailModal.open"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div
          class="absolute inset-0 bg-black/50 backdrop-blur-sm"
          @click="detailModal.open = false"
        ></div>
        <div
          class="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        >
          <!-- Entête modal -->
          <div
            class="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl"
          >
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center"
              >
                <i class="fas fa-file-contract text-[#E54801]"></i>
              </div>
              <div>
                <h3 class="text-lg font-bold text-gray-800">
                  Détail de la location #{{ detailModal.rental?.id }}
                </h3>
                <p class="text-xs text-gray-400">Supervision admin</p>
              </div>
            </div>
            <button
              @click="detailModal.open = false"
              class="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
            >
              <i class="fas fa-times"></i>
            </button>
          </div>

          <div v-if="detailModal.rental" class="p-6 space-y-6">
            <!-- Statut + progression -->
            <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <span
                :class="statusBadge(detailModal.rental.status)"
                class="px-3 py-1.5 rounded-full text-sm font-bold"
              >
                {{
                  detailModal.rental.status_label ?? detailModal.rental.status
                }}
              </span>
              <div class="flex-1">
                <div
                  class="flex justify-between text-xs font-semibold text-gray-500 mb-1"
                >
                  <span>Progression</span>
                  <span>{{ detailModal.rental.progress_percent ?? 0 }}%</span>
                </div>
                <div class="bg-gray-200 rounded-full h-2">
                  <div
                    :class="progressColor(detailModal.rental.status)"
                    class="h-2 rounded-full transition-all"
                    :style="{
                      width: (detailModal.rental.progress_percent ?? 0) + '%',
                    }"
                  ></div>
                </div>
              </div>
            </div>

            <!-- Locataire & Bailleur -->
            <div class="grid grid-cols-2 gap-4">
              <div class="p-4 bg-purple-50 rounded-xl border border-purple-100">
                <p
                  class="text-xs font-bold text-purple-600 uppercase tracking-wide mb-2"
                >
                  <i class="fas fa-user-circle mr-1"></i>Locataire
                </p>
                <p class="font-bold text-gray-800">
                  {{ detailModal.rental.tenant?.name }}
                </p>
                <p class="text-xs text-gray-500 mt-1">
                  {{ detailModal.rental.tenant?.email }}
                </p>
                <p class="text-xs text-gray-500">
                  {{ detailModal.rental.tenant?.phone }}
                </p>
              </div>
              <div class="p-4 bg-orange-50 rounded-xl border border-orange-100">
                <p
                  class="text-xs font-bold text-[#E54801] uppercase tracking-wide mb-2"
                >
                  <i class="fas fa-home mr-1"></i>Bailleur
                </p>
                <p class="font-bold text-gray-800">
                  {{ detailModal.rental.property?.owner?.name ?? "N/A" }}
                </p>
                <p class="text-xs text-gray-500 mt-1">
                  {{ detailModal.rental.property?.owner?.email }}
                </p>
                <p class="text-xs text-gray-500">
                  {{ detailModal.rental.property?.owner?.phone }}
                </p>
              </div>
            </div>

            <!-- Bien -->
            <div class="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <p
                class="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3"
              >
                Bien immobilier
              </p>
              <p class="font-bold text-gray-800 text-base">
                {{ detailModal.rental.property?.title }}
              </p>
              <p class="text-sm text-gray-500 flex items-center gap-1 mt-1">
                <i class="fas fa-map-marker-alt text-[#E54801] text-xs"></i>
                {{
                  detailModal.rental.property?.location ??
                  detailModal.rental.property?.city
                }}
              </p>
              <div class="mt-3 flex items-center justify-between">
                <span class="text-2xl font-black text-[#E54801]"
                  >{{ formatPrice(detailModal.rental.price) }}
                  <span class="text-sm font-normal text-gray-400"
                    >F/mois</span
                  ></span
                >
                <span
                  class="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-lg"
                  >{{
                    detailModal.rental.property?.type === "rent"
                      ? "Location"
                      : "Vente"
                  }}</span
                >
              </div>
            </div>

            <!-- Dates -->
            <div class="grid grid-cols-2 gap-3">
              <div
                class="p-3 bg-green-50 rounded-xl text-center border border-green-100"
              >
                <p class="text-xs font-semibold text-green-600 mb-1">
                  Date de début
                </p>
                <p class="font-bold text-gray-800">
                  {{ formatDate(detailModal.rental.start_date) }}
                </p>
              </div>
              <div
                class="p-3 bg-red-50 rounded-xl text-center border border-red-100"
              >
                <p class="text-xs font-semibold text-red-600 mb-1">
                  Date de fin
                </p>
                <p class="font-bold text-gray-800">
                  {{ formatDate(detailModal.rental.end_date) }}
                </p>
              </div>
            </div>

            <!-- Notes -->
            <div
              v-if="detailModal.rental.notes"
              class="p-4 bg-amber-50 rounded-xl border border-amber-100"
            >
              <p class="text-xs font-bold text-amber-600 mb-2">
                <i class="fas fa-sticky-note mr-1"></i>Notes
              </p>
              <p class="text-sm text-gray-700 whitespace-pre-line">
                {{ detailModal.rental.notes }}
              </p>
            </div>

            <!-- Actions dans modal -->
            <div class="flex flex-wrap gap-3 pt-2 border-t border-gray-100">
              <button
                v-if="detailModal.rental.status === 'pending'"
                @click="
                  changeStatus(detailModal.rental, 'active');
                  detailModal.open = false;
                "
                class="flex-1 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2"
              >
                <i class="fas fa-check-circle"></i> Activer la location
              </button>
              <button
                v-if="detailModal.rental.status === 'active'"
                @click="
                  changeStatus(detailModal.rental, 'finished');
                  detailModal.open = false;
                "
                class="flex-1 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2"
              >
                <i class="fas fa-flag-checkered"></i> Marquer terminée
              </button>
              <button
                v-if="['pending', 'active'].includes(detailModal.rental.status)"
                @click="
                  openCancelModal(detailModal.rental);
                  detailModal.open = false;
                "
                class="flex-1 py-2.5 bg-red-50 hover:bg-red-500 text-red-600 hover:text-white border border-red-200 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2"
              >
                <i class="fas fa-ban"></i> Annuler la demande
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="modal">
      <div
        v-if="cancelModal.open"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div
          class="absolute inset-0 bg-black/50 backdrop-blur-sm"
          @click="cancelModal.open = false"
        ></div>
        <div
          class="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6"
        >
          <div class="text-center mb-6">
            <div
              class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <i class="fas fa-ban text-red-500 text-2xl"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-800">Annuler la demande</h3>
            <p class="text-gray-500 text-sm mt-1">
              Cette action est irréversible.
            </p>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-semibold text-gray-700 mb-1"
              >Motif de l'annulation
              <span class="text-gray-400 font-normal">(optionnel)</span></label
            >
            <textarea
              v-model="cancelModal.reason"
              rows="3"
              placeholder="Ex: Locataire a retiré sa demande..."
              class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-400 resize-none"
            ></textarea>
          </div>
          <div class="flex gap-3">
            <button
              @click="cancelModal.open = false"
              class="flex-1 py-3 border border-gray-200 text-gray-600 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-all"
            >
              Annuler
            </button>
            <button
              @click="confirmCancel"
              :disabled="cancelModal.loading"
              class="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <i
                v-if="cancelModal.loading"
                class="fas fa-spinner animate-spin"
              ></i>
              <i v-else class="fas fa-ban"></i>
              Confirmer
            </button>
          </div>
        </div>
      </div>
    </transition>
    <transition name="toast">
      <div
        v-if="toast.show"
        :class="[
          'fixed bottom-6 right-6 z-[100] px-5 py-4 rounded-2xl shadow-xl flex items-center gap-3 text-white text-sm font-semibold max-w-sm min-w-72',
          toast.type === 'success' ? 'bg-green-500' : 'bg-red-500',
        ]"
      >
        <i
          :class="
            toast.type === 'success'
              ? 'fas fa-check-circle'
              : 'fas fa-exclamation-circle'
          "
        ></i>
        {{ toast.message }}
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "../../axios";

// ─── State ────────────────────────────────────────────────────────────────────
const isLoading = ref(false);
const statsLoading = ref(false);
const rentals = ref([]);
const stats = ref({});
const pagination = ref({ current_page: 1, last_page: 1, total: 0 });

const filters = ref({
  search: "",
  status: "",
  date_from: "",
  date_to: "",
  page: 1,
});

const detailModal = ref({ open: false, rental: null });
const cancelModal = ref({
  open: false,
  rental: null,
  reason: "",
  loading: false,
});
const toast = ref({ show: false, type: "success", message: "" });

let searchTimeout = null;

// ─── KPI Cards ────────────────────────────────────────────────────────────────
const kpiCards = computed(() => [
  {
    label: "Total",
    value: stats.value.total ?? 0,
    color: "text-gray-800",
    dot: "bg-gray-400",
  },
  {
    label: "En attente",
    value: stats.value.pending ?? 0,
    color: "text-amber-600",
    dot: "bg-amber-400",
  },
  {
    label: "Actives",
    value: stats.value.active ?? 0,
    color: "text-green-600",
    dot: "bg-green-400",
  },
  {
    label: "Terminées",
    value: stats.value.finished ?? 0,
    color: "text-blue-600",
    dot: "bg-blue-400",
  },
  {
    label: "Annulées",
    value: stats.value.cancelled ?? 0,
    color: "text-red-500",
    dot: "bg-red-400",
  },
  {
    label: "Loyers/mois",
    value: stats.value.monthly_rental_revenue
      ? formatPrice(stats.value.monthly_rental_revenue) + " F"
      : "0 F",
    color: "text-[#E54801]",
    dot: "bg-[#E54801]",
  },
]);

// Pages pagination
const paginationPages = computed(() => {
  const total = pagination.value.last_page;
  const current = pagination.value.current_page;
  const pages = [];
  for (let p = Math.max(1, current - 2); p <= Math.min(total, current + 2); p++)
    pages.push(p);
  return pages;
});

// ─── Helpers ──────────────────────────────────────────────────────────────────
const formatPrice = (v) => Number(v).toLocaleString("fr-FR");

const formatDate = (d) => {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const statusBadge = (status) =>
  ({
    pending: "bg-amber-100 text-amber-700",
    active: "bg-green-100 text-green-700",
    finished: "bg-blue-100 text-blue-700",
    cancelled: "bg-red-100 text-red-600",
  })[status] ?? "bg-gray-100 text-gray-500";

const progressColor = (status) =>
  ({
    pending: "bg-amber-400",
    active: "bg-green-500",
    finished: "bg-blue-500",
    cancelled: "bg-red-400",
  })[status] ?? "bg-gray-300";

// ─── Fetch ────────────────────────────────────────────────────────────────────
const fetchStats = async () => {
  statsLoading.value = true;
  try {
    const { data } = await axios.get("/api/admin/rental-stats");
    if (data.success) stats.value = data.data.stats;
  } catch (err) {
    console.error("Erreur stats:", err);
  } finally {
    statsLoading.value = false;
  }
};

const fetchRentals = async () => {
  isLoading.value = true;
  try {
    const params = {};
    if (filters.value.search) params.search = filters.value.search;
    if (filters.value.status) params.status = filters.value.status;
    if (filters.value.date_from) params.date_from = filters.value.date_from;
    if (filters.value.date_to) params.date_to = filters.value.date_to;
    params.page = filters.value.page;

    const { data } = await axios.get("/api/admin/rental-procedures", {
      params,
    });
    if (data.success) {
      rentals.value = data.data.data ?? [];
      pagination.value = {
        current_page: data.data.current_page,
        last_page: data.data.last_page,
        total: data.data.total,
      };
    }
  } catch (err) {
    console.error("Erreur rentals:", err);
    showToast("Erreur lors du chargement des données", "error");
  } finally {
    isLoading.value = false;
  }
};

const fetchAll = () => {
  fetchStats();
  fetchRentals();
};

const debouncedFetch = () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(fetchRentals, 400);
};

const changePage = (p) => {
  if (p < 1 || p > pagination.value.last_page) return;
  filters.value.page = p;
  fetchRentals();
};

const resetFilters = () => {
  filters.value = {
    search: "",
    status: "",
    date_from: "",
    date_to: "",
    page: 1,
  };
  fetchRentals();
};

// ─── Actions ──────────────────────────────────────────────────────────────────
const openDetail = (rental) => {
  detailModal.value = { open: true, rental };
};

const openCancelModal = (rental) => {
  cancelModal.value = { open: true, rental, reason: "", loading: false };
};

const changeStatus = async (rental, newStatus, reason = "") => {
  try {
    const payload = { status: newStatus };
    if (reason) payload.reason = reason;

    const { data } = await axios.post(
      `/api/admin/rental-procedures/${rental.id}/status`,
      payload,
    );
    if (data.success) {
      // Mettre à jour localement
      const idx = rentals.value.findIndex((r) => r.id === rental.id);
      if (idx !== -1) {
        rentals.value[idx] = {
          ...rentals.value[idx],
          status: newStatus,
          status_label: {
            pending: "En attente",
            active: "Location active",
            finished: "Terminée",
            cancelled: "Annulée",
          }[newStatus],
          progress_percent: {
            pending: 25,
            active: 100,
            finished: 100,
            cancelled: 0,
          }[newStatus],
        };
      }
      showToast(data.message || "Statut mis à jour avec succès", "success");
      fetchStats();
    }
  } catch (err) {
    showToast(
      err.response?.data?.message || "Erreur lors de la mise à jour",
      "error",
    );
  }
};

const confirmCancel = async () => {
  cancelModal.value.loading = true;
  await changeStatus(
    cancelModal.value.rental,
    "cancelled",
    cancelModal.value.reason,
  );
  cancelModal.value = { open: false, rental: null, reason: "", loading: false };
};

// ─── Toast ────────────────────────────────────────────────────────────────────
const showToast = (message, type = "success") => {
  toast.value = { show: true, type, message };
  setTimeout(() => {
    toast.value.show = false;
  }, 4000);
};

// ─── Lifecycle ────────────────────────────────────────────────────────────────
onMounted(fetchAll);
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.toast-enter-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.toast-leave-active {
  transition: all 0.2s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.9);
}
.toast-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>

