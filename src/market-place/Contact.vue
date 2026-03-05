<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Hero Section -->
    <div
      class="bg-secondary py-20 text-center text-white relative overflow-hidden"
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
          class="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tight"
        >
          Nous Contacter
        </h1>
        <p class="text-white/80 text-xl max-w-2xl mx-auto">
          Une question sur une commande ou un partenariat ? Notre équipe est
          prête à vous aider.
        </p>
      </div>
    </div>

    <div class="max-w-[1200px] mx-auto px-4 -mt-12 pb-24 relative z-20">
      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Contact Info Cards -->
        <div class="lg:col-span-1 space-y-6">
          <div
            class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-start gap-4"
          >
            <div
              class="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-xl shrink-0"
            >
              <i class="fas fa-phone-alt"></i>
            </div>
            <div>
              <h3 class="font-bold text-gray-900 mb-1">Téléphone</h3>
              <p class="text-gray-500 text-sm mb-2">Du lun. au ven. 8h - 18h</p>
              <a
                href="tel:+237600000000"
                class="text-primary font-bold hover:underline"
                >+237 600 000 000</a
              >
            </div>
          </div>

          <div
            class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-start gap-4"
          >
            <div
              class="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center text-xl shrink-0"
            >
              <i class="fas fa-envelope"></i>
            </div>
            <div>
              <h3 class="font-bold text-gray-900 mb-1">Email</h3>
              <p class="text-gray-500 text-sm mb-2">Généralement sous 24h</p>
              <a
                href="mailto:market@home-cameroon.com"
                class="text-secondary font-bold hover:underline"
                >market@home-cameroon.com</a
              >
            </div>
          </div>

          <div
            class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-start gap-4"
          >
            <div
              class="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center text-xl shrink-0"
            >
              <i class="fab fa-whatsapp"></i>
            </div>
            <div>
              <h3 class="font-bold text-gray-900 mb-1">WhatsApp</h3>
              <p class="text-gray-500 text-sm mb-2">Réponse instantanée</p>
              <a href="#" class="text-blue-500 font-bold hover:underline"
                >Démarrer le chat</a
              >
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="lg:col-span-2">
          <div
            class="bg-white p-8 lg:p-12 rounded-[2rem] shadow-xl border border-gray-50"
          >
            <h2
              class="text-2xl font-black text-gray-900 mb-8 uppercase tracking-tight"
            >
              Envoyez un message
            </h2>
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <div class="grid md:grid-cols-2 gap-6">
                <div class="space-y-2">
                  <label
                    class="text-xs font-black text-gray-400 uppercase tracking-widest px-1"
                    >Nom complet</label
                  >
                  <input
                    type="text"
                    class="w-full px-6 py-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    placeholder="Jean Dupont"
                  />
                </div>
                <div class="space-y-2">
                  <label
                    class="text-xs font-black text-gray-400 uppercase tracking-widest px-1"
                    >Email</label
                  >
                  <input
                    type="email"
                    class="w-full px-6 py-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    placeholder="jean@email.com"
                  />
                </div>
              </div>

              <div class="space-y-2">
                <label
                  class="text-xs font-black text-gray-400 uppercase tracking-widest px-1"
                  >Sujet</label
                >
                <select
                  class="w-full px-6 py-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all cursor-pointer"
                >
                  <option>Question sur un produit</option>
                  <option>Suivi de commande</option>
                  <option>Devenir vendeur</option>
                  <option>Signaler un problème</option>
                  <option>Autre</option>
                </select>
              </div>

              <div class="space-y-2">
                <label
                  class="text-xs font-black text-gray-400 uppercase tracking-widest px-1"
                  >Votre message</label
                >
                <textarea
                  rows="5"
                  class="w-full px-6 py-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                  placeholder="Dites-nous en plus..."
                ></textarea>
              </div>

              <button
                type="submit"
                class="w-full py-5 bg-gray-900 text-white font-black uppercase tracking-widest rounded-xl shadow-xl hover:bg-black hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-3"
              >
                Envoyer le message
                <i class="fas fa-paper-plane text-sm"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const handleSubmit = () => {
  alert("Message envoyé ! Notre équipe vous répondra très prochainement.");
};
</script>
