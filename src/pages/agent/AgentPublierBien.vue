<template>
  <DashboardLayout>
<<<<<<< HEAD
    <div class="bg-background min-h-screen py-12 px-6">
      <div class="max-w-4xl mx-auto">
        <header class="mb-10 flex justify-between items-end">
          <div>
            <h1 class="text-3xl font-black text-foreground uppercase relative">
              Réaliser l'audit & Publier
              <span
                class="absolute -bottom-2 left-0 w-20 h-1 bg-secondary"
              ></span>
            </h1>
            <p
              class="text-muted-foreground text-[10px] font-black uppercase tracking-widest mt-4"
            >
=======

    <div class="bg-[#FAF9F5] min-h-screen py-12 px-6">
      <div class="max-w-4xl mx-auto">
        <header class="mb-10 flex justify-between items-end">
          <div>
            <h1 class="text-3xl font-black text-[#1B0B38] uppercase relative">
              Réaliser l'audit & Publier
              <span class="absolute -bottom-2 left-0 w-20 h-1 bg-[#E54801]"></span>
            </h1>
            <p class="text-gray-400 text-[10px] font-black uppercase tracking-widest mt-4">
>>>>>>> 5a2a46c7f02e0d67ceec2d1b8986a306eabf911a
              Mission ID: #{{ route.params.id }} | Bailleur:
              {{ propRequest?.bailleur?.name }}
            </p>
          </div>
<<<<<<< HEAD
          <button
            @click="router.back()"
            class="text-xs font-black text-muted-foreground uppercase tracking-widest hover:text-secondary transition-colors"
          >
=======
          <button @click="router.back()"
            class="text-xs font-black text-gray-400 uppercase tracking-widest hover:text-[#E54801]">
>>>>>>> 5a2a46c7f02e0d67ceec2d1b8986a306eabf911a
            Annuler l'audit
          </button>
        </header>

        <div v-if="isLoading" class="py-20 text-center">
<<<<<<< HEAD
          <div
            class="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin mx-auto mb-4"
          ></div>
          <p class="text-muted-foreground font-bold uppercase tracking-widest text-xs">
=======
          <div class="w-12 h-12 border-4 border-[#E54801] border-t-transparent rounded-full animate-spin mx-auto mb-4">
          </div>
          <p class="text-gray-500 font-bold uppercase tracking-widest text-xs">
>>>>>>> 5a2a46c7f02e0d67ceec2d1b8986a306eabf911a
            Chargement de la mission...
          </p>
        </div>

        <form v-else @submit.prevent="submitAudit" class="space-y-8">
<<<<<<< HEAD
          <!-- Section: Recap Bailleur -->
          <div
            class="bg-purple-50 dark:bg-purple-950/30 p-6 rounded-3xl border border-purple-100 dark:border-purple-800 flex items-start gap-4"
          >
            <i class="fas fa-info-circle text-purple-500 dark:text-purple-400 mt-1"></i>
            <div>
              <h4
                class="text-xs font-black text-purple-900 dark:text-purple-300 uppercase tracking-widest mb-1"
              >
                Résumé de la demande bailleur
              </h4>
              <p class="text-sm text-purple-800 dark:text-purple-200 leading-relaxed">
                {{ propRequest.description }}
              </p>
              <div class="mt-4 flex gap-2">
                <a
                  v-for="(doc, idx) in propRequest.documents"
                  :key="idx"
                  :href="`/storage/${doc}`"
                  target="_blank"
                  class="px-3 py-1.5 bg-background rounded-lg text-[9px] font-black uppercase text-purple-600 dark:text-purple-400 shadow-sm border border-purple-100 dark:border-purple-800 flex items-center gap-2"
                >
=======
          <!-- Section: Confirmation Bailleur -->
          <div v-if="propRequest.bailleur_confirmed_at"
            class="bg-green-50 p-6 rounded-3xl border border-green-100 flex items-start gap-4">
            <i class="fas fa-check-circle text-green-500 mt-1"></i>
            <div>
              <h4 class="text-xs font-black text-green-900 uppercase tracking-widest mb-1">
                Rendez-vous confirmé
              </h4>
              <p class="text-sm text-green-800 leading-relaxed">
                Le bailleur a confirmé sa présence pour l'audit prévu le <span class="font-bold underline">{{
                  formatDate(propRequest.scheduled_at) }}</span>.
              </p>
            </div>
          </div>
          <div v-else-if="propRequest.bailleur_declined_at"
            class="bg-red-50 p-6 rounded-3xl border border-red-100 flex items-start gap-4">
            <i class="fas fa-exclamation-triangle text-red-500 mt-1"></i>
            <div>
              <h4 class="text-xs font-black text-red-900 uppercase tracking-widest mb-1">
                Report demandé par le bailleur
              </h4>
              <p class="text-sm text-red-800 leading-relaxed">
                Le bailleur a demandé de reporter l'audit. <br />Note : <span class="italic">"{{
                  propRequest.bailleur_notes || 'Aucune note fournie.' }}"</span>
              </p>
            </div>
          </div>

          <!-- Section: Recap Bailleur -->
          <div class="bg-purple-50 p-6 rounded-3xl border border-purple-100 flex items-start gap-4">
            <i class="fas fa-info-circle text-purple-500 mt-1"></i>
            <div>
              <h4 class="text-xs font-black text-purple-900 uppercase tracking-widest mb-1">
                Résumé de la demande bailleur
              </h4>
              <p class="text-sm text-purple-800 leading-relaxed">
                {{ propRequest.description }}
              </p>
              <div class="mt-4 flex gap-2">
                <a v-for="(doc, idx) in propRequest.documents" :key="idx" :href="getFileUrl(doc)" target="_blank"
                  class="px-3 py-1.5 bg-white rounded-lg text-[9px] font-black uppercase text-purple-600 shadow-sm border border-purple-100 flex items-center gap-2">
>>>>>>> 5a2a46c7f02e0d67ceec2d1b8986a306eabf911a
                  <i class="fas fa-file-contract"></i> Justificatif {{ idx + 1 }}
                </a>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Col 1: Photos Réelles (Prises par l'agent) -->
<<<<<<< HEAD
            <div
              class="bg-card p-8 rounded-3xl shadow-sm border border-border"
            >
              <h3
                class="text-xs font-black text-foreground uppercase tracking-widest mb-6 flex items-center gap-2"
              >
                <i class="fas fa-camera text-secondary"></i> Photos
                Professionnelles
              </h3>

              <div
                @click="$refs.fileInput.click()"
                class="border-2 border-dashed border-border rounded-3xl p-10 text-center hover:bg-secondary/5 hover:border-secondary/30 transition-all cursor-pointer"
              >
                <input
                  ref="fileInput"
                  type="file"
                  multiple
                  accept="image/*"
                  class="hidden"
                  @change="handleFileChange"
                />
                <i
                  class="fas fa-cloud-upload-alt text-3xl text-muted-foreground mb-3"
                ></i>
                <p
                  class="text-[10px] font-black text-muted-foreground uppercase tracking-widest"
                >
=======
            <div class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 class="text-xs font-black text-[#1B0B38] uppercase tracking-widest mb-6 flex items-center gap-2">
                <i class="fas fa-camera text-[#E54801]"></i> Photos
                Professionnelles
              </h3>

              <div @click="$refs.fileInput.click()"
                class="border-2 border-dashed border-gray-100 rounded-3xl p-10 text-center hover:bg-orange-50/30 hover:border-[#E54801]/30 transition-all cursor-pointer">
                <input ref="fileInput" type="file" multiple accept="image/*" class="hidden"
                  @change="handleFileChange" />
                <i class="fas fa-cloud-upload-alt text-3xl text-gray-200 mb-3"></i>
                <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest">
>>>>>>> 5a2a46c7f02e0d67ceec2d1b8986a306eabf911a
                  Glisser ou cliquer pour uploader les photos de l'audit
                </p>
              </div>

              <div class="grid grid-cols-3 gap-3 mt-6">
<<<<<<< HEAD
                <div
                  v-for="(src, idx) in previews"
                  :key="idx"
                  class="relative aspect-square group"
                >
                  <img
                    :src="src"
                    class="w-full h-full object-cover rounded-xl shadow-sm border border-border"
                  />
                  <button
                    @click.stop="removeImage(idx)"
                    class="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-all"
                  >
=======
                <div v-for="(src, idx) in previews" :key="idx" class="relative aspect-square group">
                  <img :src="src" class="w-full h-full object-cover rounded-xl shadow-sm border border-gray-50" />
                  <button @click.stop="removeImage(idx)"
                    class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-all">
>>>>>>> 5a2a46c7f02e0d67ceec2d1b8986a306eabf911a
                    <i class="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>

            <!-- Col 2: Infos Validées -->
<<<<<<< HEAD
            <div
              class="bg-card p-8 rounded-3xl shadow-sm border border-border space-y-4"
            >
              <h3
                class="text-xs font-black text-foreground uppercase tracking-widest mb-6 flex items-center gap-2"
              >
=======
            <div class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-4">
              <h3 class="text-xs font-black text-[#1B0B38] uppercase tracking-widest mb-6 flex items-center gap-2">
>>>>>>> 5a2a46c7f02e0d67ceec2d1b8986a306eabf911a
                <i class="fas fa-check-double text-green-500"></i> Données Finales
              </h3>

              <div>
<<<<<<< HEAD
                <label class="text-[9px] font-black text-muted-foreground uppercase ml-2"
                  >Titre de l'annonce</label
                >
                <input
                  v-model="form.title"
                  type="text"
                  class="w-full px-5 py-3 bg-muted/20 rounded-xl text-sm font-bold text-foreground outline-none focus:ring-2 focus:ring-secondary/20"
                />
=======
                <label class="text-[9px] font-black text-gray-400 uppercase ml-2">Titre de l'annonce</label>
                <input v-model="form.title" type="text"
                  class="w-full px-5 py-3 bg-gray-50 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-[#E54801]/20" />
>>>>>>> 5a2a46c7f02e0d67ceec2d1b8986a306eabf911a
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
<<<<<<< HEAD
                  <label
                    class="text-[9px] font-black text-muted-foreground uppercase ml-2"
                    >Prix (XAF)</label
                  >
                  <input
                    v-model.number="form.price"
                    type="number"
                    class="w-full px-5 py-3 bg-muted/20 rounded-xl text-sm font-black text-secondary"
                  />
                </div>
                <div>
                  <label
                    class="text-[9px] font-black text-muted-foreground uppercase ml-2"
                    >État Global</label
                  >
                  <select
                    v-model="form.etat"
                    class="w-full px-5 py-3 bg-muted/20 rounded-xl text-sm font-bold text-foreground"
                  >
                    <option class="bg-card">Neuf</option>
                    <option class="bg-card">Très bon état</option>
                    <option class="bg-card">Bon état</option>
                    <option class="bg-card">À rénover</option>
=======
                  <label class="text-[9px] font-black text-gray-400 uppercase ml-2">Prix (XAF)</label>
                  <input v-model.number="form.price" type="number"
                    class="w-full px-5 py-3 bg-gray-50 rounded-xl text-sm font-black text-[#E54801]" />
                </div>
                <div>
                  <label class="text-[9px] font-black text-gray-400 uppercase ml-2">État Global</label>
                  <select v-model="form.etat" class="w-full px-5 py-3 bg-gray-50 rounded-xl text-sm font-bold">
                    <option>Neuf</option>
                    <option>Très bon état</option>
                    <option>Bon état</option>
                    <option>À rénover</option>
>>>>>>> 5a2a46c7f02e0d67ceec2d1b8986a306eabf911a
                  </select>
                </div>
              </div>

              <div class="grid grid-cols-3 gap-4">
                <div>
<<<<<<< HEAD
                  <label
                    class="text-[9px] font-black text-muted-foreground uppercase text-center block"
                    >Chambres</label
                  >
                  <input
                    v-model.number="form.bedrooms"
                    type="number"
                    class="w-full px-3 py-3 bg-muted/20 rounded-xl text-sm font-bold text-center text-foreground"
                  />
                </div>
                <div>
                  <label
                    class="text-[9px] font-black text-muted-foreground uppercase text-center block"
                    >Douches</label
                  >
                  <input
                    v-model.number="form.bathrooms"
                    type="number"
                    class="w-full px-3 py-3 bg-muted/20 rounded-xl text-sm font-bold text-center text-foreground"
                  />
                </div>
                <div>
                  <label
                    class="text-[9px] font-black text-muted-foreground uppercase text-center block"
                    >m²</label
                  >
                  <input
                    v-model.number="form.area"
                    type="number"
                    class="w-full px-3 py-3 bg-muted/20 rounded-xl text-sm font-bold text-center text-foreground"
                  />
=======
                  <label class="text-[9px] font-black text-gray-400 uppercase text-center block">Chambres</label>
                  <input v-model.number="form.bedrooms" type="number"
                    class="w-full px-3 py-3 bg-gray-50 rounded-xl text-sm font-bold text-center" />
                </div>
                <div>
                  <label class="text-[9px] font-black text-gray-400 uppercase text-center block">Douches</label>
                  <input v-model.number="form.bathrooms" type="number"
                    class="w-full px-3 py-3 bg-gray-50 rounded-xl text-sm font-bold text-center" />
                </div>
                <div>
                  <label class="text-[9px] font-black text-gray-400 uppercase text-center block">m²</label>
                  <input v-model.number="form.area" type="number"
                    class="w-full px-3 py-3 bg-gray-50 rounded-xl text-sm font-bold text-center" />
>>>>>>> 5a2a46c7f02e0d67ceec2d1b8986a306eabf911a
                </div>
              </div>
            </div>
          </div>

          <!-- Description Complète -->
<<<<<<< HEAD
          <div class="bg-card p-8 rounded-3xl shadow-sm border border-border">
            <label
              class="text-[9px] font-black text-muted-foreground uppercase ml-2 mb-2 block"
              >Description commerciale (Sera vue par les clients)</label
            >
            <textarea
              v-model="form.description"
              rows="6"
              class="w-full px-5 py-4 bg-muted/20 rounded-2xl text-sm font-medium text-foreground outline-none focus:ring-2 focus:ring-secondary/20"
              placeholder="Décrivez le bien en détail après votre visite..."
            ></textarea>
=======
          <div class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <label class="text-[9px] font-black text-gray-400 uppercase ml-2 mb-2 block">Description commerciale (Sera
              vue par les clients)</label>
            <textarea v-model="form.description" rows="6"
              class="w-full px-5 py-4 bg-gray-50 rounded-2xl text-sm font-medium outline-none focus:ring-2 focus:ring-[#E54801]/20"
              placeholder="Décrivez le bien en détail après votre visite..."></textarea>
>>>>>>> 5a2a46c7f02e0d67ceec2d1b8986a306eabf911a
          </div>

          <!-- Submit -->
          <div class="flex justify-end gap-4">
<<<<<<< HEAD
            <button
              type="submit"
              :disabled="isSubmitting"
              class="px-10 py-5 bg-secondary text-secondary-foreground rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-secondary/20 hover:-translate-y-1 transition-all disabled:opacity-50"
            >
              <i
                class="fas"
                :class="
                  isSubmitting ? 'fa-circle-notch fa-spin' : 'fa-paper-plane'
                "
              ></i>
=======
            <button type="submit" :disabled="isSubmitting"
              class="px-10 py-5 bg-[#E54801] text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-[#E54801]/20 hover:-translate-y-1 transition-all disabled:opacity-50">
              <i class="fas" :class="isSubmitting ? 'fa-circle-notch fa-spin' : 'fa-paper-plane'
                "></i>
>>>>>>> 5a2a46c7f02e0d67ceec2d1b8986a306eabf911a
              {{
                isSubmitting
                  ? "Publication en cours..."
                  : "Finaliser & Publier le bien"
              }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "../../axios";
import DashboardLayout from "../../layouts/DashboardLayout.vue";

const route = useRoute();
const router = useRouter();

const getFileUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  const baseUrl = axios.defaults.baseURL?.replace(/\/$/, "") || "http://localhost:8000";
  return `${baseUrl}/storage/${path.replace(/^\//, "").replace(/^storage\//, "")}`;
};

const formatDate = (d) => {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const isLoading = ref(true);
const isSubmitting = ref(false);
const propRequest = ref(null);

const form = reactive({
  title: "",
  category: "",
  type: "",
  price: 0,
  city: "",
  location: "",
  description: "",
  bedrooms: 0,
  bathrooms: 0,
  area: 0,
  etat: "Bon état",
  amenities: "",
  images: [],
});

const previews = ref([]);

const fetchRequest = async () => {
  try {
    const { data } = await axios.get(
      `/api/agent/publication-missions/${route.params.id}`,
    );
    const found = data.data;
    if (!found) {
      alert("Mission introuvable");
      return router.push({ name: "AgentMissions" });
    }
    propRequest.value = found;

    // Autofill
    form.title = found.title;
    form.category = found.category;
    form.type = found.type;
    form.price = found.price_estimate;
    form.city = found.city;
    form.location = found.location;
    form.bedrooms = found.bedrooms;
    form.bathrooms = found.bathrooms;
    form.area = found.area;
    form.description = found.description;
  } catch (err) {
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};

const handleFileChange = (e) => {
  const files = Array.from(e.target.files);
  files.forEach((file) => {
    form.images.push(file);
    const reader = new FileReader();
    reader.onload = (e) => previews.value.push(e.target.result);
    reader.readAsDataURL(file);
  });
};

const removeImage = (idx) => {
  form.images.splice(idx, 1);
  previews.value.splice(idx, 1);
};

const submitAudit = async () => {
  if (form.images.length === 0)
    return alert("Veuillez prendre au moins une photo réelle du bien.");
  isSubmitting.value = true;
  try {
    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      if (key === "images") {
        form.images.forEach((img) => formData.append("images[]", img));
      } else {
        formData.append(key, form[key] || "");
      }
    });

    const { data } = await axios.post(
      `/api/agent/publication-missions/${route.params.id}/complete`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );

    if (data.success) {
      alert("Le bien a été publié avec succès !");
      router.push({ name: "AgentMissions" });
    }
  } catch (err) {
    alert(err.response?.data?.message || "Erreur lors de la publication.");
  } finally {
    isSubmitting.value = false;
  }
};

onMounted(fetchRequest);
</script>