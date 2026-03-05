<template>
  <div class="bg-background min-h-screen py-8">
    <div class="max-w-6xl mx-auto px-4">
      <!-- En-tête -->
      <div class="mb-10">
        <h1
          class="text-3xl font-bold text-primary mb-2 flex items-center gap-3"
        >
          <i class="fas fa-headset text-secondary"></i>
          Assistance & Support
        </h1>
        <p class="text-foreground/60">
          Notre équipe est disponible pour vous aider à tout moment.
        </p>
      </div>

      <!-- Canaux de contact -->
      <div class="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10">
        <a
          v-for="channel in contactChannels"
          :key="channel.label"
          :href="channel.href"
          class="bg-card rounded-2xl p-6 border border-border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group text-center"
        >
          <div
            :class="`w-14 h-14 ${channel.bg} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`"
          >
            <i :class="`fas fa-${channel.icon} text-2xl ${channel.color}`"></i>
          </div>
          <h3 class="font-bold text-primary mb-1">{{ channel.label }}</h3>
          <p class="text-secondary font-medium text-sm mb-1 text-center">
            {{ channel.value }}
          </p>
          <p class="text-xs text-muted-foreground">{{ channel.note }}</p>
        </a>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Formulaire de contact -->
        <div class="lg:col-span-2">
          <div
            class="bg-card rounded-2xl p-6 md:p-8 border border-border shadow-sm"
          >
            <h2
              class="text-xl font-bold text-primary mb-6 flex items-center gap-2"
            >
              <i class="fas fa-paper-plane text-secondary"></i>
              Envoyer un message
            </h2>

            <form @submit.prevent="submitContact" class="space-y-5">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label
                    class="block text-sm font-medium text-foreground/80 mb-2"
                    >Nom complet</label
                  >
                  <input
                    v-model="form.name"
                    type="text"
                    placeholder="Votre nom"
                    required
                    class="w-full px-4 py-3 border border-border rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
                  />
                </div>
                <div>
                  <label
                    class="block text-sm font-medium text-foreground/80 mb-2"
                    >Email</label
                  >
                  <input
                    v-model="form.email"
                    type="email"
                    placeholder="votre@email.com"
                    required
                    class="w-full px-4 py-3 border border-border rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-foreground/80 mb-2"
                  >Sujet</label
                >
                <select
                  v-model="form.subject"
                  class="w-full px-4 py-3 border border-border rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
                >
                  <option value="">Sélectionnez un sujet</option>
                  <option v-for="s in subjects" :key="s" :value="s">
                    {{ s }}
                  </option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-foreground/80 mb-2"
                  >Message</label
                >
                <textarea
                  v-model="form.message"
                  rows="5"
                  placeholder="Décrivez votre problème ou question..."
                  required
                  class="w-full px-4 py-3 border border-border rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-secondary transition-all resize-none"
                ></textarea>
              </div>

              <div
                v-if="sent"
                class="p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm flex items-center gap-2"
              >
                <i class="fas fa-check-circle"></i>
                Message envoyé ! Nous vous répondrons dans les 24h.
              </div>

              <button
                type="submit"
                :disabled="isLoading"
                class="w-full py-3 bg-secondary text-white rounded-xl font-bold hover:bg-primary transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-60"
              >
                <span v-if="!isLoading">
                  <i class="fas fa-paper-plane mr-2"></i>
                  Envoyer le message
                </span>
                <span v-else class="flex items-center gap-2">
                  <i class="fas fa-spinner animate-spin"></i>
                  Envoi en cours...
                </span>
              </button>
            </form>
          </div>
        </div>

        <!-- Sidebar FAQ + Horaires -->
        <div class="space-y-6">
          <!-- Horaires -->
          <div class="bg-card rounded-2xl p-6 border border-border shadow-sm">
            <h3 class="font-bold text-primary mb-4 flex items-center gap-2">
              <i class="fas fa-clock text-secondary"></i>
              Horaires d'ouverture
            </h3>
            <div class="space-y-3 text-sm">
              <div
                v-for="h in hours"
                :key="h.day"
                class="flex justify-between items-center py-2 border-b border-border last:border-0"
              >
                <span class="text-foreground/70">{{ h.day }}</span>
                <span
                  :class="[
                    'font-medium',
                    h.open ? 'text-secondary' : 'text-muted-foreground',
                  ]"
                >
                  {{ h.time }}
                </span>
              </div>
            </div>
          </div>

          <!-- FAQ rapide -->
          <div class="bg-card rounded-2xl p-6 border border-border shadow-sm">
            <h3 class="font-bold text-primary mb-4 flex items-center gap-2">
              <i class="fas fa-question-circle text-secondary"></i>
              Questions fréquentes
            </h3>
            <div class="space-y-2">
              <button
                v-for="faq in faqs"
                :key="faq.q"
                @click="faq.open = !faq.open"
                class="w-full text-left"
              >
                <div
                  class="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors"
                >
                  <span class="text-sm text-foreground/80 font-medium">{{
                    faq.q
                  }}</span>
                  <i
                    :class="[
                      'fas fa-chevron-down text-secondary text-xs transition-transform duration-200',
                      faq.open ? 'rotate-180' : '',
                    ]"
                  ></i>
                </div>
                <div
                  v-if="faq.open"
                  class="px-3 pb-3 text-xs text-foreground/60 leading-relaxed"
                >
                  {{ faq.a }}
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";

const isLoading = ref(false);
const sent = ref(false);

const form = reactive({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const subjects = [
  "Problème avec une annonce",
  "Question sur une visite",
  "Paiement et facturation",
  "Signaler un contenu",
  "Devenir agent partenaire",
  "Autre",
];

const contactChannels = [
  {
    icon: "phone-alt",
    label: "Téléphone",
    value: "+237 600 00 00 00",
    note: "Lun-Ven : 8h - 18h",
    href: "tel:+237600000000",
    bg: "bg-secondary/10",
    color: "text-secondary",
  },
  {
    icon: "envelope",
    label: "Email",
    value: "support@hmc.cm",
    note: "Réponse sous 24h",
    href: "mailto:support@hmc.cm",
    bg: "bg-primary/10",
    color: "text-primary",
  },
  {
    icon: "map-marker-alt",
    label: "Bureau",
    value: "Bastos, Yaoundé",
    note: "Sur rendez-vous",
    href: "#",
    bg: "bg-green-100",
    color: "text-green-700",
  },
];

const hours = [
  { day: "Lundi - Vendredi", time: "8h00 - 18h00", open: true },
  { day: "Samedi", time: "9h00 - 13h00", open: true },
  { day: "Dimanche", time: "Fermé", open: false },
];

const faqs = reactive([
  {
    q: "Comment devenir agent partenaire ?",
    a: "Contactez-nous par email avec votre CV et une lettre de motivation. Nous vous recontacterons sous 48h.",
    open: false,
  },
  {
    q: "Comment publier une annonce ?",
    a: 'Créez un compte bailleur, puis cliquez sur "Publier une annonce" depuis votre tableau de bord.',
    open: false,
  },
  {
    q: "Sécurité et paiements",
    a: "Tous les paiements sont sécurisés via Mobile Money (Orange/MTN). Nous ne stockons aucune donnée bancaire.",
    open: false,
  },
  {
    q: "Comment annuler une visite ?",
    a: "Contactez-nous au moins 48h avant la visite pour un remboursement. Passé ce délai, les frais ne sont pas remboursables.",
    open: false,
  },
]);

const submitContact = async () => {
  isLoading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 1500));
  sent.value = true;
  isLoading.value = false;
  form.name = "";
  form.email = "";
  form.subject = "";
  form.message = "";
};
</script>

<style scoped>
.animate-spin {
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
