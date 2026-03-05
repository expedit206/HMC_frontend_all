<template>
  <div class="bg-gray-50 min-h-screen pb-20">
    <!-- Header -->
    <div
      class="bg-primary py-16 text-center text-white relative overflow-hidden"
    >
      <div
        class="absolute inset-0 opacity-10 pointer-events-none"
        style="
          background-image: radial-gradient(#fff 2px, transparent 2px);
          background-size: 30px 30px;
        "
      ></div>
      <div class="max-w-4xl mx-auto px-4 relative z-10">
        <h1
          class="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tight"
        >
          Comment pouvons-nous vous aider ?
        </h1>
        <p class="text-white/80 text-lg max-w-2xl mx-auto">
          Trouvez des réponses rapides à vos questions sur le Marketplace Home
          Cameroon.
        </p>
      </div>
    </div>

    <!-- FAQ Content -->
    <div class="max-w-4xl mx-auto px-4 -mt-10 relative z-20">
      <div class="grid gap-6">
        <div
          v-for="(faq, index) in faqs"
          :key="index"
          class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group"
        >
          <details class="group">
            <summary
              class="flex items-center justify-between p-6 cursor-pointer list-none"
            >
              <div class="flex items-center gap-4">
                <div
                  class="w-10 h-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center transition-colors group-hover:bg-primary group-hover:text-white"
                >
                  <i :class="faq.icon"></i>
                </div>
                <h3
                  class="font-bold text-gray-900 group-hover:text-primary transition-colors"
                >
                  {{ faq.question }}
                </h3>
              </div>
              <i
                class="fas fa-chevron-down text-gray-400 group-open:rotate-180 transition-transform"
              ></i>
            </summary>
            <div class="px-6 pb-6 pt-2 border-t border-gray-50">
              <p class="text-gray-600 leading-relaxed">{{ faq.answer }}</p>
            </div>
          </details>
        </div>
      </div>

      <!-- Still Need Help -->
      <div
        class="mt-16 text-center bg-white p-10 rounded-3xl border border-gray-100 shadow-xl"
      >
        <div
          class="w-20 h-20 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mx-auto mb-6 text-3xl"
        >
          <i class="fas fa-envelope-open-text"></i>
        </div>
        <h2 class="text-2xl font-black text-gray-900 mb-2">
          Vous ne trouvez pas votre réponse ?
        </h2>
        <p class="text-gray-500 mb-8">
          Notre équipe de support est là pour vous accompagner 7j/7.
        </p>
        <router-link
          :to="{ name: 'MarketplaceContact' }"
          class="inline-flex items-center px-8 py-4 bg-secondary text-white font-black uppercase tracking-widest rounded-xl hover:bg-secondary/90 transition-all hover:-translate-y-1 shadow-lg active:scale-95"
        >
          Nous contacter
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
const faqs = [
  {
    icon: "fas fa-shopping-bag",
    question: "Comment effectuer un achat ?",
    answer:
      "Parcourez notre catalogue, ajoutez les articles souhaités à votre panier, puis cliquez sur 'Finaliser la commande'. Vous pourrez alors choisir votre mode de paiement (Orange Money, MTN MoMo, ou Carte) et votre adresse de livraison.",
  },
  {
    icon: "fas fa-truck",
    question: "Quels sont les délais de livraison ?",
    answer:
      "Pour les articles en stock vendus par Home Cameroon, la livraison s'effectue sous 24h à 48h à Douala et Yaoundé. Pour les autres régions, prévoyez 3 à 5 jours ouvrés.",
  },
  {
    icon: "fas fa-undo",
    question: "Quelle est la politique de retour ?",
    answer:
      "Vous disposez de 7 jours après réception pour retourner un article défectueux ou non conforme. L'article doit être dans son emballage d'origine et ne pas avoir été utilisé.",
  },
  {
    icon: "fas fa-store-alt",
    question: "Comment devenir vendeur ?",
    answer:
      "Si vous êtes un bailleur ou un prestataire de services premium, vous pouvez demander l'activation de votre boutique via votre tableau de bord. Une vérification de vos produits sera effectuée avant validation.",
  },
  {
    icon: "fas fa-shield-alt",
    question: "Mes paiements sont-ils sécurisés ?",
    answer:
      "Absolument. Home Cameroon utilise les passerelles de paiement les plus sécurisées du pays. Nous ne stockons jamais vos informations bancaires.",
  },
];
</script>

<style scoped>
details summary::-webkit-details-marker {
  display: none;
}
</style>
