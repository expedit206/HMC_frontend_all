<template>
  <DashboardLayout>
    <div class="bg-background min-h-screen py-12 px-6">
      <div class="max-w-3xl mx-auto">
        <!-- Header of the form page -->
        <div class="mb-10 flex justify-between items-end">
          <div>
            <h1
              class="text-3xl font-black text-foreground leading-tight uppercase relative"
            >
              Demander une publication
              <span
                class="absolute -bottom-2 left-0 w-20 h-1 bg-secondary"
              ></span>
            </h1>
            <p
              class="text-muted-foreground font-bold uppercase tracking-[0.2em] text-[11px] mt-4 italic"
            >
              Étape {{ currentStep }} sur 3 : {{ stepTitles[currentStep - 1] }}
            </p>
          </div>
          <RouterLink
            :to="{ name: 'BailleurDashboard' }"
            class="group flex items-center gap-2 text-xs font-black text-muted-foreground hover:text-secondary transition-all uppercase tracking-widest"
          >
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
            <span>Annuler</span>
            <div
              class="w-8 h-8 rounded-full bg-muted/20 flex items-center justify-center group-hover:bg-secondary group-hover:text-secondary-foreground transition-all"
            >
              <i class="fas fa-times"></i>
            </div>
          </RouterLink>
<<<<<<< HEAD
=======
            Demander de publication
            <span
              class="absolute -bottom-2 left-0 w-20 h-1 bg-[#E54801]"
            ></span>
          </h1>
          <p
            class="text-gray-500 font-bold uppercase tracking-[0.2em] text-[11px] mt-4 italic"
          >
            Étape {{ currentStep }} sur 3 : {{ stepTitles[currentStep - 1] }}
          </p>
>>>>>>> 5a2a46c7f02e0d67ceec2d1b8986a306eabf911a
=======
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
        </div>

        <!-- Info Alert -->
        <div class="mb-8 bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-500 p-4 rounded-xl">
          <div class="flex items-start gap-3">
            <i class="fas fa-info-circle text-blue-500 dark:text-blue-400 mt-1"></i>
            <p
              class="text-xs text-blue-700 dark:text-blue-300 font-bold uppercase tracking-wide leading-relaxed"
            >
              Note : Vous ne postez pas de photos vous-même. Un agent HMC sera
              assigné pour auditer votre bien, prendre des photos professionnelles
              et finaliser l'annonce pour vous.
            </p>
          </div>
        </div>

        <!-- Progress Bar -->
        <div class="mb-10 flex gap-2">
          <div
            v-for="step in 3"
            :key="step"
            class="h-1.5 flex-1 rounded-full transition-all duration-500"
            :class="step <= currentStep ? 'bg-secondary' : 'bg-muted'"
          ></div>
        </div>

        <form @submit.prevent="submitForm" class="space-y-8 animate-fadeIn">
          <!-- Section 1 : Informations de base -->
          <section
            v-if="currentStep === 1"
            class="bg-card p-8 rounded-3xl shadow-sm border border-border hover:shadow-md transition-shadow duration-300"
          >
            <div class="flex items-center gap-3 mb-6">
              <div
                class="w-8 h-8 rounded-full bg-secondary/10 text-secondary flex items-center justify-center font-bold text-sm"
              >
                1
              </div>
              <h3
                class="text-xs font-black text-foreground uppercase tracking-widest"
              >
                Informations de base
              </h3>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="col-span-1 md:col-span-2">
                <label
                  class="block text-[10px] text-muted-foreground font-bold uppercase mb-2 ml-2"
                  >Titre du bien</label
                >
                <input
                  v-model="form.title"
                  type="text"
                  required
                  placeholder="Ex: Villa de luxe à Bastos"
                  class="w-full px-5 py-4 bg-muted/20 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-secondary/20 outline-none transition-all placeholder:text-muted-foreground text-foreground"
                />
              </div>
              <div>
                <label
                  class="block text-[10px] text-muted-foreground font-bold uppercase mb-2 ml-2"
                  >Type d'offre</label
                >
                <select
                  v-model="form.type"
                  class="w-full px-5 py-4 bg-muted/20 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-secondary/20 outline-none transition-all cursor-pointer text-foreground"
                >
                  <option value="rent" class="bg-card">À Louer</option>
                  <option value="sale" class="bg-card">À Vendre</option>
                </select>
              </div>
              <div>
                <label
                  class="block text-[10px] text-muted-foreground font-bold uppercase mb-2 ml-2"
                  >Catégorie</label
                >
                <select
                  v-model="form.category"
                  class="w-full px-5 py-4 bg-muted/20 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-secondary/20 outline-none transition-all cursor-pointer text-foreground"
                >
                  <option value="Villa" class="bg-card">Villa</option>
                  <option value="Appartement" class="bg-card">Appartement</option>
                  <option value="Studio" class="bg-card">Studio</option>
                  <option value="Chambre" class="bg-card">Chambre</option>
                  <option value="Bureau" class="bg-card">Bureau / Local Pro</option>
                  <option value="Terrain" class="bg-card">Terrain</option>
                </select>
              </div>
              <div>
                <label
                  class="block text-[10px] text-muted-foreground font-bold uppercase mb-2 ml-2"
                  >Prix estimé (XAF)</label
                >
                <input
                  v-model.number="form.price_estimate"
                  type="number"
                  required
                  placeholder="0"
                  class="w-full px-5 py-4 bg-muted/20 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-secondary/20 outline-none transition-all text-foreground"
                />
              </div>
            </div>
          </section>

          <!-- Section 2 : Détails & Localisation -->
          <section
            v-if="currentStep === 2"
            class="bg-card p-8 rounded-3xl shadow-sm border border-border hover:shadow-md transition-shadow duration-300"
          >
            <div class="flex items-center gap-3 mb-6">
              <div
                class="w-8 h-8 rounded-full bg-secondary/10 text-secondary flex items-center justify-center font-bold text-sm"
              >
                2
              </div>
              <h3
                class="text-xs font-black text-foreground uppercase tracking-widest"
              >
                Détails & Localisation
              </h3>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  class="block text-[10px] text-muted-foreground font-bold uppercase mb-2 ml-2"
                  >Ville</label
                >
                <input
                  v-model="form.city"
                  type="text"
                  required
                  placeholder="Ex: Yaoundé"
                  class="w-full px-5 py-4 bg-muted/20 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-secondary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <div>
                <label
                  class="block text-[10px] text-muted-foreground font-bold uppercase mb-2 ml-2"
                  >Quartier / Adresse précise</label
                >
                <input
                  v-model="form.location"
                  type="text"
                  required
                  placeholder="Ex: Bastos, Rue de l'Ambassade"
                  class="w-full px-5 py-4 bg-muted/20 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-secondary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <div class="col-span-1 md:col-span-2">
                <label
                  class="block text-[10px] text-muted-foreground font-bold uppercase mb-2 ml-2"
                  >Description sommaire</label
                >
                <textarea
                  v-model="form.description"
                  rows="4"
                  placeholder="Décrivez brièvement votre bien (nombre de pièces, état général...)"
                  class="w-full px-5 py-4 bg-muted/20 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-secondary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground"
                ></textarea>
              </div>
            </div>
          </section>

          <!-- Section 3 : Documents d'audit -->
          <section
            v-if="currentStep === 3"
            class="bg-card p-8 rounded-3xl shadow-sm border border-border hover:shadow-md transition-shadow duration-300"
          >
            <div class="flex items-center gap-3 mb-6">
              <div
                class="w-8 h-8 rounded-full bg-secondary/10 text-secondary flex items-center justify-center font-bold text-sm"
              >
                3
              </div>
              <h3
                class="text-xs font-black text-foreground uppercase tracking-widest"
              >
                Documents de vérification
              </h3>
            </div>

            <div class="mb-8">
              <label
                class="block text-[10px] text-muted-foreground font-bold uppercase mb-4"
                >Documents (CNI, Titre foncier, Mandat...)</label
              >
              <div
                @click="$refs.fileInput.click()"
                class="border-2 border-dashed border-border rounded-3xl p-8 text-center group hover:border-secondary/50 hover:bg-secondary/5 transition-all cursor-pointer relative overflow-hidden"
              >
                <input
                  ref="fileInput"
                  type="file"
                  multiple
                  accept="application/pdf,image/*"
                  class="hidden"
                  @change="handleFileChange"
                />
                <div class="relative z-10">
                  <div
                    class="w-12 h-12 mx-auto bg-muted/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-card transition-colors"
                  >
                    <i
                      class="fas fa-file-contract text-xl text-muted-foreground/50 group-hover:text-secondary"
                    ></i>
                  </div>
                  <p
                    class="text-[11px] font-bold text-muted-foreground group-hover:text-foreground"
                  >
                    Ajouter des justificatifs (PDF ou Images)
                  </p>
                  <p class="text-[9px] text-muted-foreground mt-2 font-bold uppercase">
                    Max 10MB par fichier
                  </p>
                </div>
              </div>

              <!-- Previews -->
              <div
                v-if="previews.length"
                class="grid grid-cols-4 sm:grid-cols-6 gap-3 mt-4"
              >
                <div
                  v-for="(src, idx) in previews"
                  :key="idx"
                  class="relative aspect-square group"
                >
                  <div
                    v-if="src.isPdf"
                    class="w-full h-full bg-red-50 dark:bg-red-950/30 rounded-xl border border-red-100 dark:border-red-800 flex items-center justify-center"
                  >
                    <i class="fas fa-file-pdf text-red-400 dark:text-red-500 text-2xl"></i>
                    <p
                      class="absolute bottom-1 w-full text-center text-[8px] font-black text-red-500 dark:text-red-400 truncate px-1"
                    >
                      {{ src.name }}
                    </p>
                  </div>
                  <img
                    v-else
                    :src="src.url"
                    class="w-full h-full object-cover rounded-xl border border-border shadow-sm"
                  />
                  <button
                    @click.stop="removeFile(idx)"
                    class="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                  >
                    <i class="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
          </section>

          <!-- Navigation Buttons -->
          <div class="flex gap-4 pt-4">
            <button
              v-if="currentStep > 1"
              type="button"
              @click="currentStep--"
              class="flex-1 py-4 bg-card border border-border text-muted-foreground rounded-2xl font-black uppercase tracking-widest hover:bg-muted/20 transition-all text-xs"
            >
              Précédent
            </button>

            <button
              v-if="currentStep < 3"
              type="button"
              @click="nextStep"
              class="flex-1 py-4 bg-primary text-primary-foreground rounded-2xl font-black uppercase tracking-widest hover:bg-secondary hover:text-secondary-foreground transition-all text-xs shadow-lg"
            >
              Suivant
            </button>

            <button
              v-else
              type="submit"
              :disabled="isSubmitting"
              class="flex-2 py-4 bg-secondary text-secondary-foreground rounded-2xl font-black uppercase tracking-widest hover:bg-secondary/90 hover:shadow-lg hover:-translate-y-1 transition-all shadow-xl shadow-secondary/20 text-xs flex items-center justify-center gap-2"
              style="flex: 2"
            >
              <i v-if="isSubmitting" class="fas fa-circle-notch fa-spin"></i>
              <i v-else class="fas fa-paper-plane"></i>
              {{ isSubmitting ? "Envoi de la demande..." : "Envoyer ma demande" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, reactive } from "vue";
import { RouterLink, useRouter } from "vue-router";
import axios from "../../axios";
import DashboardLayout from "../../layouts/DashboardLayout.vue";

const router = useRouter();

// Step Management
const currentStep = ref(1);
const stepTitles = [
  "Informations Globales",
  "Localisation & Description",
  "Pièces Justificatives",
];

const nextStep = () => {
  if (currentStep.value === 1 && (!form.title || !form.price_estimate))
    return alert("Veuillez remplir les champs obligatoires.");
  if (currentStep.value === 2 && (!form.city || !form.location))
    return alert("Veuillez renseigner l'emplacement.");
  currentStep.value++;
};

// Form State
const form = reactive({
  title: "",
  type: "rent",
  category: "Appartement",
  price_estimate: null,
  city: "Yaoundé",
  location: "",
  description: "",
  bedrooms: 0,
  bathrooms: 0,
  area: 0,
  documents: [],
});

const previews = ref([]);
const isSubmitting = ref(false);

const handleFileChange = (e) => {
  const files = Array.from(e.target.files);
  files.forEach((file) => {
    form.documents.push(file);

    if (file.type === "application/pdf") {
      previews.value.push({
        isPdf: true,
        name: file.name,
      });
    } else {
      const reader = new FileReader();
      reader.onload = (e) =>
        previews.value.push({
          url: e.target.result,
          isPdf: false,
        });
      reader.readAsDataURL(file);
    }
  });
};

const removeFile = (idx) => {
  form.documents.splice(idx, 1);
  previews.value.splice(idx, 1);
};

const submitForm = async () => {
  if (isSubmitting.value) return;
  if (form.documents.length === 0) {
    return alert(
      "Veuillez joindre au moins un document (CNI ou justificatif de propriété).",
    );
  }

  isSubmitting.value = true;
  try {
    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      if (key === "documents") {
        form.documents.forEach((doc) => formData.append("documents[]", doc));
      } else {
        formData.append(key, form[key] || "");
      }
    });

    const { data } = await axios.post(
      "/api/bailleur/publication-requests",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );

    if (data.success) {
      alert(
        "Votre demande de publication a été soumise avec succès. Un agent HMC vous contactera très prochainement pour l'audit terrain.",
      );
      router.push({ name: "BailleurDashboard" });
    }
  } catch (err) {
    console.error("Erreur demande publication:", err);
    alert(
      err.response?.data?.message ||
        "Une erreur est survenue lors de l'envoi de la demande.",
    );
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.animate-fadeIn {
  animation: fadeIn 0.6s ease-out forwards;
  opacity: 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

input:focus,
select:focus,
textarea:focus {
  background-color: hsl(var(--card));
  box-shadow: 0 10px 15px -3px hsl(var(--foreground) / 0.05);
}
</style>