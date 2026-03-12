<template>
  <div
    class="font-inter bg-background text-foreground min-h-screen flex flex-col"
  >
    <!-- Hero Mobile -->
    <section class="lg:hidden gradient-bg relative overflow-hidden">
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          class="absolute -top-20 -left-20 w-40 h-40 bg-secondary/10 rounded-full blur-xl"
        ></div>
        <div
          class="absolute -bottom-20 -right-20 w-60 h-60 bg-secondary/5 rounded-full blur-xl"
        ></div>
        <div
          class="absolute top-1/2 left-1/4 w-32 h-32 bg-primary/30 rounded-full blur-lg"
        ></div>
      </div>
      <div class="relative z-10 py-12 px-6">
        <div
          class="flex flex-col items-center justify-center mb-10 animate-fadeInUp"
        >
          <div class="w-24 h-24 mb-4 logo-glow animate-float">
            <div class="relative w-full h-full">
              <div
                class="absolute inset-0 bg-gradient-to-br from-primary to-secondary/80 rounded-2xl transform rotate-6"
              ></div>
              <div
                class="absolute inset-2 bg-gradient-to-br from-card to-muted rounded-xl flex items-center justify-center"
              >
<<<<<<< HEAD
                <i class="fas fa-home text-secondary text-3xl"></i>
=======
              <img src="/images/logo/image.png" alt="">
>>>>>>> 5a2a46c7f02e0d67ceec2d1b8986a306eabf911a
              </div>
            </div>
          </div>
          <div class="text-center">
            <div class="text-primary-foreground text-4xl font-bold mb-2">
              Home<span class="highlight-text">Cameroon</span>
            </div>
            <p class="text-primary-foreground/70 text-sm font-medium">
              vivre en paix, vivre heureux avec Home Cameroon
            </p>
          </div>
        </div>
        <div class="flex justify-center mt-6">
          <div class="relative">
            <div
              class="w-20 h-20 bg-gradient-to-br from-secondary to-secondary/80 rounded-2xl flex items-center justify-center pulse-glow"
            >
              <i class="fas fa-key text-secondary-foreground text-3xl"></i>
            </div>
            <div
              class="absolute -top-2 -right-2 w-8 h-8 bg-card rounded-full flex items-center justify-center border border-border"
            >
              <i class="fas fa-lock text-secondary text-sm"></i>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Layout principal -->
    <div class="flex flex-col lg:flex-row flex-1">
      <!-- Panneau gauche (desktop uniquement) -->
      <div class="hidden lg:flex lg:w-1/2 gradient-bg relative overflow-hidden">
        <!-- Décorations -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            class="absolute top-10 left-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"
          ></div>
          <div
            class="absolute bottom-10 right-10 w-80 h-80 bg-primary/40 rounded-full blur-3xl"
          ></div>
          <div
            class="absolute top-1/3 right-1/4 w-48 h-48 bg-secondary/5 rounded-full blur-2xl"
          ></div>
        </div>
        <!-- Motifs géométriques -->
        <div class="absolute inset-0 opacity-10 pointer-events-none">
          <div
            class="absolute top-20 left-20 w-32 h-32 border-2 border-secondary rounded-lg transform rotate-45"
          ></div>
          <div
            class="absolute bottom-40 right-32 w-24 h-24 border-2 border-primary-foreground rounded-full"
          ></div>
          <div
            class="absolute top-1/2 left-1/3 w-16 h-16 border-2 border-secondary/80 transform -rotate-12"
          ></div>
        </div>

        <div
          class="relative z-10 p-12 flex flex-col justify-between text-primary-foreground w-full"
        >
          <!-- Logo -->
          <div class="flex items-center gap-6 mb-16 animate-fadeInUp">
            <div class="relative w-20 h-20 logo-glow">
              <div
                class="absolute inset-0 bg-gradient-to-br from-primary to-secondary/80 rounded-2xl transform rotate-3"
              ></div>
              <div
<<<<<<< HEAD
                class="absolute inset-2 bg-gradient-to-br from-card to-muted rounded-xl flex items-center justify-center"
              >
                <i class="fas fa-home text-secondary text-2xl"></i>
=======
                class="absolute inset-2 bg-gradient-to-br from-white to-gray-100 rounded-xl flex items-center justify-center p-1"
              >
              <img src="/images/logo/image.png" alt="">
                <!-- <i class="fas fa-home text-[#E54801] text-2xl"></i> -->
>>>>>>> 5a2a46c7f02e0d67ceec2d1b8986a306eabf911a
              </div>
            </div>
            <div>
              <div class="text-4xl font-bold">
                Home<span class="highlight-text">Cameroon</span>
              </div>
              <p class="text-primary-foreground/70 text-sm font-medium mt-1">
                L'excellence immobilière camerounaise
              </p>
            </div>
          </div>

          <!-- Contenu -->
          <div class="max-w-2xl flex-1">
            <div
              class="inline-block mb-6 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/30 animate-fadeInUp"
              style="animation-delay: 0.2s"
            >
              <span class="text-primary-foreground font-bold"
                ><i class="fas fa-star mr-2 text-yellow-300"></i>Bienvenue chez
                vous !</span
              >
            </div>
            <h2
              class="text-5xl font-bold mb-8 leading-tight animate-fadeInUp"
              style="animation-delay: 0.3s"
            >
              Reconnectez-vous à votre
              <span class="highlight-text">espace privilégié</span>
            </h2>
            <p
              class="text-primary-foreground/70 text-xl mb-12 leading-relaxed animate-fadeInUp"
              style="animation-delay: 0.4s"
            >
              Accédez à votre tableau de bord personnel, gérez vos réservations
              et découvrez nos nouvelles offres exclusives réservées aux
              membres.
            </p>

            <!-- Avantages -->
            <div class="space-y-8 mb-16">
              <div
                v-for="(item, i) in features"
                :key="i"
                class="flex items-center gap-6 animate-fadeInUp"
                :style="`animation-delay:${0.5 + i * 0.1}s`"
              >
                <div
                  :class="`w-14 h-14 rounded-xl ${item.bg} flex items-center justify-center shadow-lg`"
                >
                  <i :class="`fas fa-${item.icon} text-white text-xl`"></i>
                </div>
                <div>
                  <h3 class="text-xl font-bold mb-1">{{ item.title }}</h3>
                  <p class="text-primary-foreground/70">{{ item.desc }}</p>
                </div>
              </div>
            </div>

            <!-- Témoignage -->
            <div
              class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-12 animate-fadeInUp"
              style="animation-delay: 0.8s"
            >
              <div class="flex items-center gap-4 mb-4">
                <div
                  class="w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center"
                >
                  <i class="fas fa-quote-left text-secondary-foreground"></i>
                </div>
                <div>
                  <div class="font-bold">Marie T.</div>
                  <div class="text-primary-foreground/70 text-sm">Membre depuis 2022</div>
                </div>
              </div>
              <p class="text-primary-foreground/80 italic">
                "HomeCameroon a transformé mon expérience de location. La
                connexion est fluide et l'interface me permet de tout gérer en
                quelques clics !"
              </p>
            </div>

            <!-- Réseaux sociaux -->
            <div class="animate-fadeInUp" style="animation-delay: 0.9s">
              <h3 class="text-xl font-semibold mb-6">Restez connectés</h3>
              <div class="flex gap-4">
                <a
                  v-for="s in socials"
                  :key="s.icon"
                  href="#"
                  :class="`w-12 h-12 rounded-xl bg-white/10 ${s.hover} flex items-center justify-center text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg`"
                >
                  <i :class="`fab fa-${s.icon}`"></i>
                </a>
              </div>
            </div>
          </div>

          <!-- Footer gauche -->
          <div class="pt-8 border-t border-white/10 text-white/70 text-sm mt-8">
            <div class="flex justify-between items-center">
              <div>© 2025 Home Cameroon (HMC). Tous droits réservés.</div>
              <div class="flex gap-4">
                <RouterLink
                  :to="{ name: 'PolitiqueConfidentialite' }"
                  class="hover:text-secondary transition-colors"
                  >Confidentialité</RouterLink
                >
                <a href="#" class="hover:text-secondary transition-colors"
                  >Conditions</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Panneau droit — Formulaire -->
      <div
        class="lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-12 xl:p-16"
      >
        <div class="w-full max-w-md animate-fadeInUp">
          <div class="mb-10 text-center">
            <h2 class="text-2xl sm:text-3xl font-bold text-foreground mb-3">
              Connexion à votre compte
            </h2>
            <div class="w-20 h-1 bg-secondary mx-auto rounded-full"></div>
          </div>

          <!-- Message erreur/succès -->
          <div
            v-if="message.text"
            :class="[
              'mb-6 px-6 py-4 rounded-xl text-white font-semibold text-center shadow-lg animate-fadeIn',
              message.type === 'error' ? 'bg-destructive' : 'bg-green-600',
            ]"
          >
            {{ message.text }}
          </div>

          <form @submit.prevent="handleLogin" class="space-y-6">
            <!-- Email -->
            <div
              class="space-y-2 animate-fadeInUp"
              style="animation-delay: 0.1s"
            >
              <label class="block text-foreground font-semibold text-sm"
                >Adresse email</label
              >
              <div class="relative">
                <i
                  class="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                ></i>
                <input
                  v-model="form.email"
                  type="email"
                  placeholder="email@hmc.com"
                  required
                  class="w-full pl-12 pr-4 py-3 border-2 border-border bg-background text-foreground placeholder:text-muted-foreground rounded-xl focus:border-secondary focus:ring-4 focus:ring-secondary/10 outline-none transition-all duration-300"
                />
              </div>
            </div>

            <!-- Mot de passe -->
            <div
              class="space-y-2 animate-fadeInUp"
              style="animation-delay: 0.2s"
            >
              <label class="block text-foreground font-semibold text-sm"
                >Mot de passe</label
              >
              <div class="relative">
                <i
                  class="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                ></i>
                <input
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Votre mot de passe"
                  required
                  class="w-full pl-12 pr-12 py-3 border-2 border-border bg-background text-foreground placeholder:text-muted-foreground rounded-xl focus:border-secondary focus:ring-4 focus:ring-secondary/10 outline-none transition-all duration-300"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-secondary transition-colors"
                >
                  <i
                    :class="`fas fa-${showPassword ? 'eye-slash' : 'eye'}`"
                  ></i>
                </button>
              </div>
            </div>

            <!-- Options -->
            <div
              class="flex justify-between items-center animate-fadeInUp"
              style="animation-delay: 0.3s"
            >
              <label class="flex items-center cursor-pointer gap-2">
                <input
                  v-model="form.remember"
                  type="checkbox"
                  class="w-4 h-4 text-secondary rounded focus:ring-secondary bg-background border-border"
                />
                <span class="text-sm text-foreground">Se souvenir de moi</span>
              </label>
              <RouterLink
                :to="{ name: 'MotDePasseOublie' }"
                class="text-sm text-secondary font-semibold hover:text-secondary/80 hover:underline transition-colors"
              >
                Mot de passe oublié ?
              </RouterLink>
            </div>

            <!-- Bouton connexion -->
            <button
              type="submit"
              :disabled="isLoading"
              class="w-full bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 animate-fadeInUp disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
              style="animation-delay: 0.4s"
            >
              <span v-if="!isLoading"
                ><i class="fas fa-sign-in-alt mr-2"></i>Se connecter</span
              >
              <span v-else class="flex items-center gap-2"
                ><i class="fas fa-spinner animate-spin"></i>Connexion en
                cours...</span
              >
            </button>

            <!-- Séparateur -->
            <div
              class="flex items-center my-8 animate-fadeInUp"
              style="animation-delay: 0.5s"
            >
              <div class="flex-1 h-px bg-border"></div>
              <div class="px-4 text-sm text-muted-foreground">ou continuer avec</div>
              <div class="flex-1 h-px bg-border"></div>
            </div>

            <!-- Google -->
            <button
              type="button"
              class="w-full border-2 border-border hover:border-secondary bg-card text-foreground font-semibold py-3 rounded-xl hover:shadow-md transition-all duration-300 flex items-center justify-center gap-3 animate-fadeInUp"
              style="animation-delay: 0.6s"
            >
              <i class="fab fa-google text-red-500"></i>
              Se connecter avec Google
            </button>

            <!-- Lien inscription -->
            <div
              class="mt-8 p-6 bg-muted/20 rounded-xl text-center animate-fadeInUp"
              style="animation-delay: 0.7s"
            >
              <p class="text-foreground">
                Vous n'avez pas de compte ?
                <RouterLink
                  :to="{ name: 'Inscription' }"
                  class="text-secondary font-bold hover:text-secondary/80 hover:underline transition-colors ml-1"
                >
                  Créer un compte
                </RouterLink>
              </p>
            </div>
          </form>

          <!-- Réseaux sociaux mobile -->
          <div class="lg:hidden mt-12 pt-8 border-t border-border">
            <h3 class="text-center text-foreground font-semibold mb-6">
              Suivez-nous
            </h3>
            <div class="flex justify-center gap-4">
              <a
                v-for="s in socials"
                :key="s.icon"
                href="#"
                :class="`w-10 h-10 rounded-full bg-primary ${s.hover} flex items-center justify-center text-primary-foreground transition-all duration-300 transform hover:-translate-y-1`"
              >
                <i :class="`fab fa-${s.icon}`"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer mobile -->
    <footer class="lg:hidden bg-primary text-muted-foreground py-8 px-4 text-center">
      <div class="text-sm mb-4">
        © 2025 Home Cameroon (HMC). Tous droits réservés.
      </div>
      <div class="flex flex-wrap justify-center gap-4">
        <a
          href="#"
          class="text-muted-foreground hover:text-secondary text-sm transition-colors"
          >Conditions d'utilisation</a
        >
        <span class="text-border">|</span>
        <RouterLink
          :to="{ name: 'PolitiqueConfidentialite' }"
          class="text-muted-foreground hover:text-secondary text-sm transition-colors"
          >Politique de confidentialité</RouterLink
        >
        <span class="text-border">|</span>
        <RouterLink
          :to="{ name: 'Assistance' }"
          class="text-muted-foreground hover:text-secondary text-sm transition-colors"
          >Aide</RouterLink
        >
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const isLoading = ref(false);
const showPassword = ref(false);
const message = reactive({ text: "", type: "" });

const form = reactive({
  email: "",
  password: "",
  remember: false,
});

const features = [
  {
    icon: "home",
    title: "Gestion simplifiée",
    desc: "Suivez et gérez tous vos logements en un seul endroit",
    bg: "bg-gradient-to-br from-secondary to-secondary/80",
  },
  {
    icon: "shield-alt",
    title: "Sécurité maximale",
    desc: "Paiements 100% sécurisés et données cryptées",
    bg: "bg-gradient-to-br from-primary to-primary/80",
  },
  {
    icon: "headset",
    title: "Support premium",
    desc: "Notre équipe est disponible 24h/24 pour vous assister",
    bg: "bg-gradient-to-br from-secondary/80 to-secondary",
  },
];

const socials = [
  { icon: "youtube", hover: "hover:bg-[#E54801]" },
  { icon: "facebook-f", hover: "hover:bg-blue-600" },
  { icon: "whatsapp", hover: "hover:bg-green-500" },
  { icon: "twitter", hover: "hover:bg-sky-400" },
];

const handleLogin = async () => {
  message.text = "";
  if (!form.email || !form.password) {
    message.text = "Veuillez remplir tous les champs obligatoires.";
    message.type = "error";
    return;
  }

  isLoading.value = true;

  try {
    const success = await authStore.login(form.email, form.password);

    if (success) {
      message.text = "Connexion réussie ! Redirection...";
      message.type = "success";

      // Determiner la redirection en fonction du rôle
      const role = authStore.user?.role;
      let redirectPath = "/";

      switch (role) {
        case "admin":
          redirectPath = "/admin/dashboard";
          break;
        case "bailleur":
          redirectPath = "/bailleur/dashboard";
          break;
        case "locataire":
          redirectPath = "/locataire/dashboard";
          break;
        case "prestataire":
          redirectPath = "/prestataire/dashboard";
          break;
        case "agent":
          redirectPath = "/agent/dashboard";
          break;
        default:
          redirectPath = "/";
      }

      setTimeout(() => router.push(redirectPath), 1000);
    } else {
      message.text = authStore.error || "Erreur lors de la connexion.";
      message.type = "error";
    }
  } catch (err) {
    console.error(err);
    message.text = "Une erreur technique est survenue.";
    message.type = "error";
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.gradient-bg {
  background: linear-gradient(135deg, hsl(var(--primary)) 0%, #2c1b3d 50%, #4a2c5d 100%);
}
.logo-glow {
  filter: drop-shadow(0 0 15px hsl(var(--secondary) / 0.4));
}
.highlight-text {
  background: linear-gradient(90deg, hsl(var(--secondary)), #ff7b4d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.pulse-glow {
  animation: pulseGlow 2s ease-in-out infinite;
}
@keyframes pulseGlow {
  0%,
  100% {
    box-shadow: 0 0 20px hsl(var(--secondary) / 0.3);
  }
  50% {
    box-shadow: 0 0 30px hsl(var(--secondary) / 0.5);
  }
}
.animate-float {
  animation: float 6s ease-in-out infinite;
}
@keyframes float {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}
.animate-fadeInUp {
  animation: fadeInUp 0.8s ease-out forwards;
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fadeIn {
  animation: fadeIn 0.5s ease-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
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