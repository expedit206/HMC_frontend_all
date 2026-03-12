<template>
  <DashboardLayout>
    <div class="max-w-6xl mx-auto">
      <div
        class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
      >
        <div>
          <h1 class="text-2xl font-bold text-foreground leading-tight">
            Interventions & Réparations
          </h1>
          <p class="text-muted-foreground text-sm mt-1 font-medium tracking-wide">
            Déclarez un incident ou suivez l'avancement des réparations dans
            votre logement.
          </p>
        </div>
        <div>
          <button
            @click="showCreateModal = true"
            class="px-6 py-3 bg-primary text-primary-foreground rounded-xl text-xs font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-md flex items-center gap-2"
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
          class="bg-card rounded-3xl w-full max-w-lg relative z-10 shadow-2xl overflow-hidden transition-all transform scale-100 border border-border"
        >
          <div
            class="px-8 py-6 border-b border-border flex justify-between items-center"
          >
            <div>
              <h3 class="text-xl font-bold text-foreground">
                Signaler un incident
              </h3>
              <p class="text-xs text-muted-foreground mt-1">
                Expliquez-nous le problème rencontré dans votre logement.
              </p>
            </div>
            <button
              @click="showCreateModal = false"
              class="text-muted-foreground hover:text-foreground"
            >
              <i class="fas fa-times text-xl"></i>
            </button>
          </div>

          <form @submit.prevent="submitIntervention" class="p-8 space-y-6">
            <div
              v-if="!activeProperty"
              class="p-4 bg-orange-50 dark:bg-orange-950/30 text-orange-700 dark:text-orange-400 rounded-2xl text-xs border border-orange-200 dark:border-orange-800"
            >
              <i class="fas fa-exclamation-triangle mr-2"></i>
              Vous n'avez pas de location active enregistrée pour soumettre
              une demande.
            </div>

            <div>
              <label
                class="block text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2"
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
                      ? 'border-secondary bg-secondary/10'
                      : 'border-border hover:border-muted-foreground/20 bg-muted/10',
                  ]"
                >
                  <i
                    :class="[
                      service.category?.icon || 'fas fa-tools',
                      form.service_id === service.id
                        ? 'text-secondary'
                        : 'text-muted-foreground',
                    ]"
                    class="text-xl mb-2 block transition-colors"
                  ></i>
                  <span
                    class="text-sm font-bold block"
                    :class="
                      form.service_id === service.id
                        ? 'text-secondary'
                        : 'text-foreground'
                    "
                    >{{ service.title }}</span
                  >
                </button>
              </div>
            </div>

            <div>
              <label
                class="block text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2"
                >Date souhaitée pour l'intervention</label
              >
              <input
                type="datetime-local"
                v-model="form.scheduled_at"
                required
                class="w-full px-5 py-4 bg-muted/20 border border-border rounded-2xl focus:ring-2 focus:ring-secondary outline-none text-sm text-foreground"
              />
            </div>

            <div>
              <label
                class="block text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2"
                >Description du problème</label
              >
              <textarea
                rows="4"
                v-model="form.notes"
                placeholder="Détaillez le problème au maximum (ex: fuite d'eau sous l'évier de la cuisine)..."
                required
                class="w-full px-5 py-4 bg-muted/20 border border-border rounded-2xl focus:ring-2 focus:ring-secondary outline-none text-sm resize-none text-foreground placeholder:text-muted-foreground"
              ></textarea>
            </div>

            <div class="flex gap-4 pt-4">
              <button
                type="button"
                @click="showCreateModal = false"
                class="flex-1 py-4 text-xs font-bold text-muted-foreground uppercase tracking-widest hover:bg-muted/20 rounded-2xl transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                :disabled="isSubmitting || !activeProperty"
                class="flex-1 py-4 bg-primary text-primary-foreground rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-secondary hover:text-secondary-foreground transition-all shadow-lg disabled:opacity-50"
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
            class="text-xs font-black text-muted-foreground uppercase tracking-[0.2em] mb-4"
          >
            Historique des demandes
          </h3>

          <div
            v-if="isLoading"
            class="text-center py-12 bg-card rounded-3xl border border-border italic text-muted-foreground"
          >
            <i class="fas fa-circle-notch fa-spin mr-2"></i> Chargement...
          </div>

          <template v-else-if="interventions.length > 0">
            <div
              v-for="item in interventions"
              :key="item.id"
              class="bg-card p-6 rounded-3xl shadow-sm border border-border flex gap-6 hover:shadow-md transition-all"
            >
              <div
                class="w-14 h-14 rounded-2xl flex items-center justify-center text-xl shrink-0"
                :class="
                  item.status === 'completed'
                    ? 'bg-green-100 dark:bg-green-950/30 text-green-600 dark:text-green-400'
                    : 'bg-secondary/10 text-secondary'
                "
              >
                <i
                  :class="item.service?.category?.icon || 'fas fa-tools'"
                ></i>
              </div>
              <div class="flex-1">
                <div class="flex justify-between items-start mb-2">
                  <div>
                    <h4 class="text-base font-bold text-foreground">
                      {{ item.service?.title }}
                    </h4>
                    <p
                      class="text-[10px] text-secondary font-bold uppercase tracking-widest mt-0.5"
                    >
                      {{ item.property?.title || "Bien non spécifié" }}
                    </p>
                    <p class="text-xs text-muted-foreground font-medium mt-1">
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
                <p class="text-sm text-muted-foreground mb-6">
                  {{ item.notes }}
                </p>
                <div
                  class="flex items-center justify-between pt-4 border-t border-border"
                >
                  <div class="flex items-center gap-3">
                    <div
                      class="w-8 h-8 rounded-full bg-muted/20 overflow-hidden flex items-center justify-center text-muted-foreground"
                    >
                      <i class="fas fa-hard-hat"></i>
                    </div>
                    <div>
                      <p
                        class="text-[10px] text-muted-foreground font-bold uppercase"
                      >
                        Catégorie
                      </p>
                      <p class="text-xs font-bold text-foreground">
                        {{ item.service?.category?.name || "Général" }}
                      </p>
                    </div>
                  </div>
                  <button
                    v-if="item.status !== 'completed'"
                    class="text-[10px] font-black text-secondary uppercase tracking-widest hover:underline"
                  >
                    Suivre en temps réel
                  </button>
                  <span
                    v-else
                    class="text-[10px] text-green-600 dark:text-green-400 font-bold uppercase"
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
            class="bg-card rounded-3xl p-16 text-center border border-dashed border-border"
          >
            <div
              class="w-20 h-20 bg-muted/20 rounded-full flex items-center justify-center text-muted-foreground/50 text-3xl mx-auto mb-6"
            >
              <i class="fas fa-tools"></i>
            </div>
            <h3
              class="text-xl font-bold text-muted-foreground uppercase tracking-tight"
            >
              Aucune intervention
            </h3>
            <p class="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">
              Vous n'avez pas encore déclaré d'incident ou de besoin de
              réparation.
            </p>
            <button
              @click="showCreateModal = true"
              class="inline-block mt-8 px-10 py-4 bg-secondary text-secondary-foreground rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg"
            >
              Nouvelle demande
            </button>
          </div>
        </div>

        <!-- Right Panel: Guide & Contact -->
        <div class="space-y-6">
          <div class="bg-primary rounded-3xl p-8 text-primary-foreground shadow-xl">
            <h3 class="text-sm font-black uppercase tracking-tight mb-4">
              Urgence 24h/24
            </h3>
            <p class="text-xs text-primary-foreground/70 mb-6 font-medium">
              Pour toute urgence vitale ou risque d'inondation grave en dehors
              des heures ouvrées.
            </p>
            <a
              href="tel:+237000000000"
              class="flex items-center justify-center gap-3 w-full py-4 bg-secondary text-secondary-foreground rounded-2xl font-black uppercase tracking-widest hover:bg-secondary/90 transition-all"
            >
              <i class="fas fa-phone-alt"></i> Appeler Support
            </a>
          </div>

          <div
            class="bg-card rounded-3xl p-6 border border-border shadow-sm"
          >
            <h3
              class="text-xs font-black text-foreground uppercase tracking-[0.2em] mb-6"
            >
              Que couvrir ?
            </h3>
            <ul class="space-y-4">
              <li
                class="flex gap-3 text-xs text-muted-foreground font-medium leading-relaxed"
              >
                <i
                  class="fas fa-check-circle text-green-500 dark:text-green-400 mt-0.5 shrink-0"
                ></i>
                <span>Plomberie & Sanitaires</span>
              </li>
              <li
                class="flex gap-3 text-xs text-muted-foreground font-medium leading-relaxed"
              >
                <i
                  class="fas fa-check-circle text-green-500 dark:text-green-400 mt-0.5 shrink-0"
                ></i>
                <span>Électricité & Éclairage</span>
              </li>
              <li
                class="flex gap-3 text-xs text-muted-foreground font-medium leading-relaxed"
              >
                <i
                  class="fas fa-check-circle text-green-500 dark:text-green-400 mt-0.5 shrink-0"
                ></i>
                <span>Climatisation & VMC</span>
              </li>
              <li
                class="flex gap-3 text-xs text-muted-foreground font-medium leading-relaxed"
              >
                <i
                  class="fas fa-check-circle text-green-500 dark:text-green-400 mt-0.5 shrink-0"
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
      return "bg-orange-100 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400";
    case "accepted":
      return "bg-blue-100 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400";
    case "completed":
      return "bg-green-100 dark:bg-green-950/30 text-green-600 dark:text-green-400";
    case "rejected":
      return "bg-red-100 dark:bg-red-950/30 text-red-600 dark:text-red-400";
    default:
      return "bg-muted text-muted-foreground";
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
  background-color: hsl(var(--secondary));
  color: hsl(var(--secondary-foreground));
  box-shadow: 0 4px 12px hsl(var(--secondary) / 0.2);
}
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: hsl(var(--muted));
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: hsl(var(--secondary));
  border-radius: 10px;
}
</style>