<template>
  <DashboardLayout>

      <div class="max-w-6xl mx-auto">
        <div
          class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
        >
          <div>
            <h1 class="text-2xl font-bold text-gray-900 leading-tight">
              Interventions & Réparations
            </h1>
            <p class="text-gray-500 text-sm mt-1 font-medium tracking-wide">
              Déclarez un incident ou suivez l'avancement des réparations dans
              votre logement.
            </p>
          </div>
          <div>
            <button
              @click="showCreateModal = true"
              class="px-6 py-3 bg-[#1B0B38] text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-md flex items-center gap-2"
            >
              <i class="fas fa-plus"></i> Nouvelle demande
            </button>
          </div>
        </div>

        <!-- NEW INTERVENTION MODAL -->
        <div
          v-if="showCreateModal"
          class="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div
            class="absolute inset-0 bg-black/60 backdrop-blur-sm"
            @click="showCreateModal = false"
          ></div>
          <div
            class="bg-white rounded-3xl w-full max-w-lg relative z-10 shadow-2xl overflow-hidden transition-all transform scale-100"
          >
            <div
              class="px-8 py-6 border-b border-gray-100 flex justify-between items-center"
            >
              <div>
                <h3 class="text-xl font-bold text-gray-900">
                  Signaler un incident
                </h3>
                <p class="text-xs text-gray-500 mt-1">
                  Expliquez-nous le problème rencontré dans votre logement.
                </p>
              </div>
              <button
                @click="showCreateModal = false"
                class="text-gray-400 hover:text-gray-600"
              >
                <i class="fas fa-times text-xl"></i>
              </button>
            </div>

            <form @submit.prevent="submitIntervention" class="p-8 space-y-6">
              <div
                v-if="!activeProperty"
                class="p-4 bg-orange-50 text-orange-700 rounded-2xl text-xs"
              >
                <i class="fas fa-exclamation-triangle mr-2"></i>
                Vous n'avez pas de location active enregistrée pour soumettre
                une demande.
              </div>

              <div>
                <label
                  class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2"
                  >Choisir une catégorie</label
                >
                <div class="grid grid-cols-2 gap-3">
                  <button
                    v-for="service in availableServices"
                    :key="service.id"
                    type="button"
                    @click="form.service_id = service.id"
                    :class="[
                      'p-4 rounded-2xl border-2 text-left transition-all group',
                      form.service_id === service.id
                        ? 'border-[#E54801] bg-orange-50'
                        : 'border-gray-50 hover:border-gray-200 bg-gray-50/50',
                    ]"
                  >
                    <i
                      :class="[
                        service.category?.icon || 'fas fa-tools',
                        form.service_id === service.id
                          ? 'text-[#E54801]'
                          : 'text-gray-400',
                      ]"
                      class="text-xl mb-2 block transition-colors"
                    ></i>
                    <span
                      class="text-sm font-bold block"
                      :class="
                        form.service_id === service.id
                          ? 'text-[#E54801]'
                          : 'text-gray-700'
                      "
                      >{{ service.title }}</span
                    >
                  </button>
                </div>
              </div>

              <div>
                <label
                  class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2"
                  >Date souhaitée pour l'intervention</label
                >
                <input
                  type="datetime-local"
                  v-model="form.scheduled_at"
                  required
                  class="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#E54801] outline-none text-sm"
                />
              </div>

              <div>
                <label
                  class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2"
                  >Description du problème</label
                >
                <textarea
                  rows="4"
                  v-model="form.notes"
                  placeholder="Détaillez le problème au maximum (ex: fuite d'eau sous l'évier de la cuisine)..."
                  required
                  class="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#E54801] outline-none text-sm resize-none"
                ></textarea>
              </div>

              <div class="flex gap-4 pt-4">
                <button
                  type="button"
                  @click="showCreateModal = false"
                  class="flex-1 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest hover:bg-gray-50 rounded-2xl transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  :disabled="isSubmitting || !activeProperty"
                  class="flex-1 py-4 bg-[#1B0B38] text-white rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-[#E54801] transition-all shadow-lg shadow-purple-100 disabled:opacity-50"
                >
                  <span v-if="!isSubmitting">Envoyer la demande</span>
                  <span v-else
                    ><i class="fas fa-circle-notch fa-spin mr-2"></i
                    >Envoi...</span
                  >
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Interventions Content -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Active List -->
          <div class="lg:col-span-2 space-y-6">
            <h3
              class="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4"
            >
              Historique des demandes
            </h3>

            <div
              v-if="isLoading"
              class="text-center py-12 bg-white rounded-3xl border border-gray-100 italic text-gray-400"
            >
              <i class="fas fa-circle-notch fa-spin mr-2"></i> Chargement...
            </div>

            <template v-else-if="interventions.length > 0">
              <div
                v-for="item in interventions"
                :key="item.id"
                class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex gap-6 hover:shadow-md transition-all"
              >
                <div
                  class="w-14 h-14 rounded-2xl flex items-center justify-center text-xl shrink-0"
                  :class="
                    item.status === 'completed'
                      ? 'bg-green-50 text-green-600'
                      : 'bg-orange-50 text-[#E54801]'
                  "
                >
                  <i
                    :class="item.service?.category?.icon || 'fas fa-tools'"
                  ></i>
                </div>
                <div class="flex-1">
                  <div class="flex justify-between items-start mb-2">
                    <div>
                      <h4 class="text-base font-bold text-[#1B0B38]">
                        {{ item.service?.title }}
                      </h4>
                      <p
                        class="text-[10px] text-[#E54801] font-bold uppercase tracking-widest mt-0.5"
                      >
                        {{ item.property?.title || "Bien non spécifié" }}
                      </p>
                      <p class="text-xs text-gray-400 font-medium mt-1">
                        Réf: #INT-{{ String(item.id).padStart(4, "0") }} •
                        {{ new Date(item.scheduled_at).toLocaleDateString() }}
                      </p>
                    </div>
                    <span
                      class="px-2.5 py-1 text-[10px] font-bold rounded-lg uppercase tracking-wide"
                      :class="getStatusClass(item.status)"
                      >{{ getStatusLabel(item.status) }}</span
                    >
                  </div>
                  <p class="text-sm text-gray-500 mb-6">
                    {{ item.notes }}
                  </p>
                  <div
                    class="flex items-center justify-between pt-4 border-t border-gray-50"
                  >
                    <div class="flex items-center gap-3">
                      <div
                        class="w-8 h-8 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center text-gray-400"
                      >
                        <i class="fas fa-hard-hat"></i>
                      </div>
                      <div>
                        <p
                          class="text-[10px] text-gray-400 font-bold uppercase"
                        >
                          Catégorie
                        </p>
                        <p class="text-xs font-bold text-[#1B0B38]">
                          {{ item.service?.category?.name || "Général" }}
                        </p>
                      </div>
                    </div>
                    <button
                      v-if="item.status !== 'completed'"
                      class="text-[10px] font-black text-[#E54801] uppercase tracking-widest hover:underline"
                    >
                      Suivre en temps réel
                    </button>
                    <span
                      v-else
                      class="text-[10px] text-green-600 font-bold uppercase"
                    >
                      Terminé le
                      {{ new Date(item.completed_at).toLocaleDateString() }}
                    </span>
                  </div>
                </div>
              </div>
            </template>

            <div
              v-else
              class="bg-white rounded-3xl p-16 text-center border border-dashed border-gray-200"
            >
              <div
                class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 text-3xl mx-auto mb-6"
              >
                <i class="fas fa-tools"></i>
              </div>
              <h3
                class="text-xl font-bold text-gray-400 uppercase tracking-tight"
              >
                Aucune intervention
              </h3>
              <p class="text-sm text-gray-400 mt-2 max-w-xs mx-auto">
                Vous n'avez pas encore déclaré d'incident ou de besoin de
                réparation.
              </p>
              <button
                class="inline-block mt-8 px-10 py-4 bg-[#E54801] text-white rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg"
              >
                Nouvelle demande
              </button>
            </div>
          </div>

          <!-- Right Panel: Guide & Contact -->
          <div class="space-y-6">
            <div class="bg-[#1B0B38] rounded-3xl p-8 text-white shadow-xl">
              <h3 class="text-sm font-black uppercase tracking-tight mb-4">
                Urgence 24h/24
              </h3>
              <p class="text-xs text-gray-400 mb-6 font-medium">
                Pour toute urgence vitale ou risque d'inondation grave en dehors
                des heures ouvrées.
              </p>
              <a
                href="tel:+237000000000"
                class="flex items-center justify-center gap-3 w-full py-4 bg-[#E54801] text-white rounded-2xl font-black uppercase tracking-widest hover:bg-[#913327] transition-all"
              >
                <i class="fas fa-phone-alt"></i> Appeler Support
              </a>
            </div>

            <div
              class="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm"
            >
              <h3
                class="text-xs font-black text-[#1B0B38] uppercase tracking-[0.2em] mb-6"
              >
                Que couvrir ?
              </h3>
              <ul class="space-y-4">
                <li
                  class="flex gap-3 text-xs text-gray-500 font-medium leading-relaxed"
                >
                  <i
                    class="fas fa-check-circle text-green-500 mt-0.5 shrink-0"
                  ></i>
                  <span>Plomberie & Sanitaires</span>
                </li>
                <li
                  class="flex gap-3 text-xs text-gray-500 font-medium leading-relaxed"
                >
                  <i
                    class="fas fa-check-circle text-green-500 mt-0.5 shrink-0"
                  ></i>
                  <span>Électricité & Éclairage</span>
                </li>
                <li
                  class="flex gap-3 text-xs text-gray-500 font-medium leading-relaxed"
                >
                  <i
                    class="fas fa-check-circle text-green-500 mt-0.5 shrink-0"
                  ></i>
                  <span>Climatisation & VMC</span>
                </li>
                <li
                  class="flex gap-3 text-xs text-gray-500 font-medium leading-relaxed"
                >
                  <i
                    class="fas fa-check-circle text-green-500 mt-0.5 shrink-0"
                  ></i>
                  <span>Serrures & Sécurité</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    

  </DashboardLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import DashboardLayout from "../../layouts/DashboardLayout.vue";
import { RouterLink, useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";
import axios from "../../axios";

const router = useRouter();
const authStore = useAuthStore();
const isLoading = ref(true);
const interventions = ref([]);

const showCreateModal = ref(false);
const isSubmitting = ref(false);
const activeProperty = ref(null);
const availableServices = ref([]);

const form = ref({
  service_id: null,
  scheduled_at: "",
  notes: "",
});

const fetchData = async () => {
  isLoading.value = true;
  try {
    // 1. Fetch Interventions
    const intResponse = await axios.get("/api/tenant/interventions");
    if (intResponse.data.success) {
      interventions.value = intResponse.data.data;
    }

    // 2. Fetch Active Property (from dashboard)
    const dashResponse = await axios.get("/api/tenant/dashboard");
    if (dashResponse.data.success && dashResponse.data.data.active_rental) {
      activeProperty.value = dashResponse.data.data.active_rental.property;
    }

    // 3. Fetch Services for the form
    const servicesResponse = await axios.get("/api/services");
    if (servicesResponse.data.success) {
      // Filter only relevant services for tenants (repair/maintenance)
      availableServices.value = servicesResponse.data.data.slice(0, 4);
    }
  } catch (err) {
    console.error("Erreur chargement données:", err);
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchData);

const submitIntervention = async () => {
  if (!form.value.service_id || !form.value.scheduled_at || !form.value.notes) {
    alert("Veuillez remplir tous les champs.");
    return;
  }

  isSubmitting.value = true;
  try {
    const payload = {
      property_id: activeProperty.value.id,
      service_id: form.value.service_id,
      scheduled_at: form.value.scheduled_at.replace("T", " "),
      notes: form.value.notes,
    };

    const { data } = await axios.post("/api/tenant/interventions", payload);

    if (data.success) {
      alert("Votre demande a été envoyée !");
      showCreateModal.value = false;
      // Reset form
      form.value = { service_id: null, scheduled_at: "", notes: "" };
      // Reload list
      await fetchData();
    }
  } catch (err) {
    console.error("Erreur envoi intervention:", err);
    alert(err.response?.data?.message || "Une erreur est survenue.");
  } finally {
    isSubmitting.value = false;
  }
};

const logout = async () => {
  await authStore.logout();
  router.push("/auth/connexion");
};

const getStatusClass = (status) => {
  switch (status) {
    case "pending":
      return "bg-orange-50 text-orange-600";
    case "accepted":
      return "bg-blue-50 text-blue-600";
    case "completed":
      return "bg-green-50 text-green-600";
    case "rejected":
      return "bg-red-50 text-red-600";
    default:
      return "bg-gray-50 text-gray-600";
  }
};

const getStatusLabel = (status) => {
  switch (status) {
    case "pending":
      return "En attente";
    case "accepted":
      return "Acceptée";
    case "completed":
      return "Terminée";
    case "rejected":
      return "Rejetée";
    default:
      return status;
  }
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

