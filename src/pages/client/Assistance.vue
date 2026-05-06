<template>
  <SharedAssistanceLayout title="Comment pouvons-nous vous aider ?"
    subtitle="Notre équipe est là pour vous accompagner dans tous vos projets immobiliers." :faqs="faqs">
    <!-- Services -->
    <template #services>
      <!-- Aide à la recherche -->
      <div class="bg-card rounded-[2rem] p-8 shadow-sm border border-border hover:shadow-lg transition group">
        <div
          class="w-14 h-14 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
          <i class="fas fa-magnifying-glass-location text-2xl"></i>
        </div>
        <h3 class="text-xl font-bold text-foreground mb-3">Recherche Assistée</h3>
        <p class="text-muted-foreground text-sm mb-6 leading-relaxed">
          Nos agents dénichent pour vous les meilleures pépites selon vos critères spécifiques.
        </p>
        <button
          class="w-full py-3 bg-secondary text-secondary-foreground font-bold rounded-xl hover:bg-secondary/90 transition shadow-md">
          Lancer une recherche
        </button>
      </div>

      <!-- Conseil Juridique -->
      <div class="bg-card rounded-[2rem] p-8 shadow-sm border border-border hover:shadow-lg transition group">
        <div
          class="w-14 h-14 bg-blue-100 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
          <i class="fas fa-file-contract text-2xl"></i>
        </div>
        <h3 class="text-xl font-bold text-foreground mb-3">Vérification Documents</h3>
        <p class="text-muted-foreground text-sm mb-6 leading-relaxed">
          Sécurisez vos transactions en faisant vérifier vos titres fonciers et contrats.
        </p>
        <button class="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition shadow-md">
          Vérifier un dossier
        </button>
      </div>

      <!-- Suivi Personnel -->
      <div class="bg-card rounded-[2rem] p-8 shadow-sm border border-border hover:shadow-lg transition group">
        <div
          class="w-14 h-14 bg-purple-100 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
          <i class="fas fa-crown text-2xl"></i>
        </div>
        <h3 class="text-xl font-bold text-foreground mb-3">Coaching VIP</h3>
        <p class="text-muted-foreground text-sm mb-6 leading-relaxed">
          Un conseiller personnel vous guide à chaque étape : visites, négociation, achat.
        </p>
        <button
          class="w-full py-3 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition shadow-md">
          Devenir Membre VIP
        </button>
      </div>
    </template>
  </SharedAssistanceLayout>
</template>

<script setup>
import { reactive } from "vue";
import SharedAssistanceLayout from "@/support/SharedAssistanceLayout.vue";

const faqs = reactive([
  {
    question: "Comment rechercher un bien spécifique ?",
    answer: "Utilisez la barre de recherche en haut de la page 'Annonces'. Vous pouvez filtrer par ville, type de bien, prix et superficie. Si vous ne trouvez pas, utilisez notre service de Recherche Assistée.",
    open: false,
  },
  {
    question: "Les annonces sont-elles vérifiées ?",
    answer: "Oui, toutes les annonces publiées par nos agents certifiés et bailleurs partenaires sont vérifiées. Pour plus de sécurité, nous recommandons toujours de visiter les lieux avec un de nos agents.",
    open: false,
  },
  {
    question: "Comment contacter un agent ?",
    answer: "Sur chaque page de détail d'une annonce, vous trouverez un bouton 'Contacter' ou 'Programmer une visite'. Vous pouvez également discuter via notre messagerie intégrée.",
    open: false,
  },
  {
    question: "Est-ce payant ?",
    answer: "L'inscription et la recherche de biens sont 100% gratuites pour les clients. Des frais peuvent s'appliquer uniquement lors de la finalisation d'une transaction (frais d'agence ou de notaire).",
    open: false,
  },
]);
</script>
