<template>
  <div class="font-inter bg-[#FAF9F5] text-[#333333] min-h-screen flex flex-col">

    <!-- Hero Mobile -->
    <section class="lg:hidden gradient-bg relative overflow-hidden">
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute -top-20 -left-20 w-40 h-40 bg-[#E54801]/10 rounded-full blur-xl"></div>
        <div class="absolute -bottom-20 -right-20 w-60 h-60 bg-[#E54801]/5 rounded-full blur-xl"></div>
        <div class="absolute top-1/2 left-1/4 w-32 h-32 bg-[#1B0B38]/30 rounded-full blur-lg"></div>
      </div>
      <div class="relative z-10 py-12 px-6">
        <div class="flex flex-col items-center justify-center mb-10 animate-fadeInUp">
          <div class="w-24 h-24 mb-4 logo-glow animate-float">
            <div class="relative w-full h-full">
              <div class="absolute inset-0 bg-gradient-to-br from-[#1B0B38] to-[#913327] rounded-2xl transform rotate-6"></div>
              <div class="absolute inset-2 bg-gradient-to-br from-white to-gray-100 rounded-xl flex items-center justify-center">
                <i class="fas fa-home text-[#E54801] text-3xl"></i>
              </div>
            </div>
          </div>
          <div class="text-center">
            <div class="text-white text-4xl font-bold mb-2">Home<span class="highlight-text">Cameroon</span></div>
            <p class="text-gray-300 text-sm font-medium">vivre en paix, vivre heureux avec Home Cameroon</p>
          </div>
        </div>
        <div class="flex justify-center mt-6">
          <div class="relative">
            <div class="w-20 h-20 bg-gradient-to-br from-[#E54801] to-[#913327] rounded-2xl flex items-center justify-center pulse-glow">
              <i class="fas fa-user-plus text-white text-3xl"></i>
            </div>
            <div class="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <i class="fas fa-star text-[#E54801] text-sm"></i>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Layout principal -->
    <div class="flex flex-col lg:flex-row flex-1">

      <!-- Panneau gauche (desktop uniquement) -->
      <div class="hidden lg:flex lg:w-1/2 gradient-bg relative overflow-hidden">
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
          <div class="absolute top-10 left-10 w-64 h-64 bg-[#E54801]/10 rounded-full blur-3xl"></div>
          <div class="absolute bottom-10 right-10 w-80 h-80 bg-[#1B0B38]/40 rounded-full blur-3xl"></div>
          <div class="absolute top-1/3 right-1/4 w-48 h-48 bg-[#E54801]/5 rounded-full blur-2xl"></div>
        </div>
        <div class="absolute inset-0 opacity-10 pointer-events-none">
          <div class="absolute top-20 left-20 w-32 h-32 border-2 border-[#E54801] rounded-lg transform rotate-45"></div>
          <div class="absolute bottom-40 right-32 w-24 h-24 border-2 border-white rounded-full"></div>
          <div class="absolute top-1/2 left-1/3 w-16 h-16 border-2 border-[#913327] transform -rotate-12"></div>
        </div>

        <div class="relative z-10 p-12 flex flex-col justify-between text-white w-full">
          <!-- Logo -->
          <div class="flex items-center gap-6 mb-16 animate-fadeInUp">
            <div class="relative w-20 h-20 logo-glow">
              <div class="absolute inset-0 bg-gradient-to-br from-[#1B0B38] to-[#913327] rounded-2xl transform rotate-3"></div>
              <div class="absolute inset-2 bg-gradient-to-br from-white to-gray-100 rounded-xl flex items-center justify-center">
                <i class="fas fa-home text-[#E54801] text-2xl"></i>
              </div>
            </div>
            <div>
              <div class="text-4xl font-bold">Home<span class="highlight-text">Cameroon</span></div>
              <p class="text-gray-300 text-sm font-medium mt-1">L'excellence immobilière camerounaise</p>
            </div>
          </div>

          <div class="max-w-2xl flex-1">
            <div class="inline-block mb-6 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/30 animate-fadeInUp" style="animation-delay:0.2s">
              <span class="text-white font-bold"><i class="fas fa-rocket mr-2 text-yellow-300"></i>Commencez votre aventure !</span>
            </div>
            <h2 class="text-5xl font-bold mb-8 leading-tight animate-fadeInUp" style="animation-delay:0.3s">
              Rejoignez notre
              <span class="highlight-text">communauté exclusive</span>
            </h2>
            <p class="text-gray-300 text-xl mb-12 leading-relaxed animate-fadeInUp" style="animation-delay:0.4s">
              Créez votre compte en moins de 2 minutes et accédez à des milliers
              d'annonces vérifiées, des outils de gestion avancés et un support dédié.
            </p>

            <!-- Avantages -->
            <div class="space-y-8 mb-16">
              <div v-for="(item, i) in features" :key="i" class="flex items-center gap-6 animate-fadeInUp" :style="`animation-delay:${0.5 + i * 0.1}s`">
                <div :class="`w-14 h-14 rounded-xl ${item.bg} flex items-center justify-center shadow-lg`">
                  <i :class="`fas fa-${item.icon} text-white text-xl`"></i>
                </div>
                <div>
                  <h3 class="text-xl font-bold mb-1">{{ item.title }}</h3>
                  <p class="text-gray-300">{{ item.desc }}</p>
                </div>
              </div>
            </div>

            <!-- Témoignage -->
            <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-12 animate-fadeInUp" style="animation-delay:0.8s">
              <div class="flex items-center gap-4 mb-4">
                <div class="w-12 h-12 rounded-full bg-gradient-to-br from-[#E54801] to-[#913327] flex items-center justify-center">
                  <i class="fas fa-user-check text-white"></i>
                </div>
                <div>
                  <div class="font-bold">Jean K.</div>
                  <div class="text-gray-300 text-sm">Membre depuis 2023</div>
                </div>
              </div>
              <p class="text-gray-200 italic">
                "Inscrit en 5 minutes, j'ai trouvé mon appartement idéal à Douala en 48h.
                La plateforme est intuitive et les propriétaires sont vérifiés !"
              </p>
            </div>

            <!-- Réseaux sociaux -->
            <div class="animate-fadeInUp" style="animation-delay:0.9s">
              <h3 class="text-xl font-semibold mb-6">Rejoignez-nous aussi sur</h3>
              <div class="flex gap-4">
                <a v-for="s in socials" :key="s.icon" href="#" :class="`w-12 h-12 rounded-xl bg-white/10 ${s.hover} flex items-center justify-center text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg`">
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
                <RouterLink :to="{ name: 'PolitiqueConfidentialite' }" class="hover:text-[#E54801] transition-colors">Confidentialité</RouterLink>
                <a href="#" class="hover:text-[#E54801] transition-colors">Conditions</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Panneau droit — Formulaire -->
      <div class="lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-12 xl:p-16 overflow-y-auto">
        <div class="w-full max-w-md animate-fadeInUp">

          <div class="mb-10 text-center">
            <h2 class="text-2xl sm:text-3xl font-bold text-[#1B0B38] mb-3">Créer votre compte</h2>
            <p class="text-[#666666] text-sm">Remplissez le formulaire ci-dessous pour commencer</p>
          </div>

          <!-- Message -->
          <div v-if="message.text" :class="['mb-6 px-6 py-4 rounded-xl text-white font-semibold text-center shadow-lg animate-fadeIn', message.type === 'error' ? 'bg-red-500' : 'bg-green-500']">
            {{ message.text }}
          </div>

          <form @submit.prevent="handleRegister" class="space-y-6">

            <!-- Nom & Prénom -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fadeInUp" style="animation-delay:0.1s">
              <div class="space-y-2">
                <label class="block text-[#1B0B38] font-semibold text-sm">Nom</label>
                <div class="relative">
                  <i class="fas fa-user absolute left-4 top-1/2 -translate-y-1/2 text-[#666666]"></i>
                  <input v-model="form.lastName" type="text" placeholder="Etienne Dee" required class="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#E54801] focus:ring-4 focus:ring-[#E54801]/10 outline-none transition-all duration-300" />
                </div>
              </div>
              <div class="space-y-2">
                <label class="block text-[#1B0B38] font-semibold text-sm">Prénom</label>
                <div class="relative">
                  <i class="fas fa-user absolute left-4 top-1/2 -translate-y-1/2 text-[#666666]"></i>
                  <input v-model="form.firstName" type="text" placeholder="Votre prénom" required class="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#E54801] focus:ring-4 focus:ring-[#E54801]/10 outline-none transition-all duration-300" />
                </div>
              </div>
            </div>

            <!-- Téléphone -->
            <div class="space-y-2 animate-fadeInUp" style="animation-delay:0.2s">
              <label class="block text-[#1B0B38] font-semibold text-sm">Téléphone</label>
              <div class="relative">
                <i class="fas fa-phone absolute left-4 top-1/2 -translate-y-1/2 text-[#666666]"></i>
                <input v-model="form.phone" type="tel" placeholder="Votre numéro de téléphone" required class="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#E54801] focus:ring-4 focus:ring-[#E54801]/10 outline-none transition-all duration-300" />
              </div>
            </div>

            <!-- Email -->
            <div class="space-y-2 animate-fadeInUp" style="animation-delay:0.3s">
              <label class="block text-[#1B0B38] font-semibold text-sm">Mail</label>
              <div class="relative">
                <i class="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-[#666666]"></i>
                <input v-model="form.email" type="email" placeholder="email@hmc.com" required class="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#E54801] focus:ring-4 focus:ring-[#E54801]/10 outline-none transition-all duration-300" />
              </div>
            </div>

            <!-- Mot de passe -->
            <div class="space-y-2 animate-fadeInUp" style="animation-delay:0.4s">
              <label class="block text-[#1B0B38] font-semibold text-sm">Mot de passe</label>
              <div class="relative">
                <i class="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-[#666666]"></i>
                <input
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Créez un mot de passe sécurisé"
                  required
                  @input="checkStrength"
                  class="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-[#E54801] focus:ring-4 focus:ring-[#E54801]/10 outline-none transition-all duration-300"
                />
                <button type="button" @click="showPassword = !showPassword" class="absolute right-4 top-1/2 -translate-y-1/2 text-[#666666] hover:text-[#E54801] transition-colors">
                  <i :class="`fas fa-${showPassword ? 'eye-slash' : 'eye'}`"></i>
                </button>
              </div>

              <!-- Indicateur de force -->
              <div class="mt-2">
                <div class="flex justify-between text-xs text-[#666666] mb-1">
                  <span>Force du mot de passe :</span>
                  <span :class="strengthColor">{{ strengthLabel }}</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-1.5">
                  <div :class="['h-1.5 rounded-full transition-all duration-300', strengthBarClass]" :style="`width: ${strengthWidth}`"></div>
                </div>
              </div>

              <!-- Conseils -->
              <div class="text-xs text-[#666666] mt-2 space-y-1">
                <p class="flex items-center gap-2">
                  <i :class="`fas fa-check-circle ${form.password.length >= 8 ? 'text-green-500' : 'text-gray-300'}`"></i>
                  Minimum 8 caractères
                </p>
                <p class="flex items-center gap-2">
                  <i :class="`fas fa-check-circle ${/[a-z]/.test(form.password) && /[A-Z]/.test(form.password) ? 'text-green-500' : 'text-gray-300'}`"></i>
                  Lettres majuscules et minuscules
                </p>
                <p class="flex items-center gap-2">
                  <i :class="`fas fa-check-circle ${/[0-9]/.test(form.password) ? 'text-green-500' : 'text-gray-300'}`"></i>
                  Au moins un chiffre
                </p>
              </div>
            </div>

            <!-- Confirmation Mot de passe -->
            <div class="space-y-2 animate-fadeInUp" style="animation-delay:0.45s">
              <label class="block text-[#1B0B38] font-semibold text-sm">Confirmer le mot de passe</label>
              <div class="relative">
                <i class="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-[#666666]"></i>
                <input
                  v-model="form.password_confirmation"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Répétez votre mot de passe"
                  required
                  class="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-[#E54801] focus:ring-4 focus:ring-[#E54801]/10 outline-none transition-all duration-300"
                />
              </div>
              <p v-if="form.password_confirmation && form.password !== form.password_confirmation" class="text-xs text-red-500 mt-1">
                Les mots de passe ne correspondent pas.
              </p>
            </div>

            <!-- Conditions -->
            <div class="p-4 bg-gradient-to-r from-[#E54801]/5 to-[#913327]/5 rounded-xl border-l-4 border-[#E54801] animate-fadeInUp" style="animation-delay:0.5s">
              <div class="flex items-start gap-3">
                <input v-model="form.terms" type="checkbox" required class="w-5 h-5 text-[#E54801] rounded focus:ring-[#E54801] mt-1 flex-shrink-0" />
                <label class="text-sm text-[#333333]">
                  J'accepte les
                  <a href="#" class="text-[#E54801] font-semibold hover:underline">Conditions d'utilisation</a>,
                  confirme avoir pris connaissance de la
                  <RouterLink :to="{ name: 'PolitiqueConfidentialite' }" class="text-[#E54801] font-semibold hover:underline">Politique de confidentialité</RouterLink>
                  et
                  <a href="#" class="text-[#E54801] font-semibold hover:underline">Politique de cookies</a>
                  de Home Cameroon.
                </label>
              </div>
            </div>

            <!-- Bouton créer compte -->
            <button
              type="submit"
              :disabled="isLoading"
              class="w-full bg-gradient-to-r from-[#E54801] to-[#913327] text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 animate-fadeInUp disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
              style="animation-delay:0.6s"
            >
              <span v-if="!isLoading"><i class="fas fa-user-plus mr-2"></i>Créer mon compte</span>
              <span v-else class="flex items-center gap-2"><i class="fas fa-spinner animate-spin"></i>Création en cours...</span>
            </button>

            <!-- Séparateur -->
            <div class="flex items-center my-8 animate-fadeInUp" style="animation-delay:0.7s">
              <div class="flex-1 h-px bg-gray-200"></div>
              <div class="px-4 text-sm text-[#666666]">ou continuer avec</div>
              <div class="flex-1 h-px bg-gray-200"></div>
            </div>

            <!-- Google -->
            <button type="button" class="w-full border-2 border-gray-200 hover:border-[#E54801] bg-white text-[#333333] font-semibold py-3 rounded-xl hover:shadow-md transition-all duration-300 flex items-center justify-center gap-3 animate-fadeInUp" style="animation-delay:0.8s">
              <i class="fab fa-google text-red-500"></i>
              S'inscrire avec Google
            </button>

            <!-- Lien connexion -->
            <div class="mt-8 p-6 bg-gradient-to-r from-gray-50 to-white rounded-xl text-center border border-gray-100 shadow-sm animate-fadeInUp" style="animation-delay:0.9s">
              <p class="text-[#333333]">
                Vous avez déjà un compte ?
                <RouterLink :to="{ name: 'Connexion' }" class="text-[#E54801] font-bold hover:text-[#913327] hover:underline transition-colors ml-1">
                  Se connecter
                </RouterLink>
              </p>
            </div>
          </form>

          <!-- Réseaux sociaux mobile -->
          <div class="lg:hidden mt-12 pt-8 border-t border-gray-200">
            <h3 class="text-center text-[#1B0B38] font-semibold mb-6">Suivez-nous</h3>
            <div class="flex justify-center gap-4">
              <a v-for="s in socials" :key="s.icon" href="#" :class="`w-10 h-10 rounded-full bg-[#1B0B38] ${s.hover} flex items-center justify-center text-white transition-all duration-300 transform hover:-translate-y-1`">
                <i :class="`fab fa-${s.icon}`"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer mobile -->
    <footer class="lg:hidden bg-[#1B0B38] text-gray-300 py-8 px-4 text-center">
      <div class="text-sm mb-4">© 2025 Home Cameroon (HMC). Tous droits réservés.</div>
      <div class="flex flex-wrap justify-center gap-4">
        <a href="#" class="text-gray-300 hover:text-[#E54801] text-sm transition-colors">Conditions d'utilisation</a>
        <span class="text-gray-600">|</span>
        <RouterLink :to="{ name: 'PolitiqueConfidentialite' }" class="text-gray-300 hover:text-[#E54801] text-sm transition-colors">Politique de confidentialité</RouterLink>
        <span class="text-gray-600">|</span>
        <RouterLink :to="{ name: 'Assistance' }" class="text-gray-300 hover:text-[#E54801] text-sm transition-colors">Aide</RouterLink>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const isLoading = ref(false)
const showPassword = ref(false)
const message = reactive({ text: '', type: '' })
const passwordStrength = ref(0)

const form = reactive({
  lastName: '',
  firstName: '',
  phone: '',
  email: '',
  password: '',
  password_confirmation: '',
  terms: false,
})

const features = [
  { icon: 'search', title: 'Accès illimité', desc: 'Explorez des milliers d\'annonces vérifiées dans tout le Cameroun', bg: 'bg-gradient-to-br from-[#E54801] to-[#913327]' },
  { icon: 'bell', title: 'Alertes personnalisées', desc: 'Recevez des notifications pour les nouvelles annonces correspondant à vos critères', bg: 'bg-gradient-to-br from-[#1B0B38] to-[#1B0B38]/80' },
  { icon: 'chart-line', title: 'Gestion avancée', desc: 'Publiez et gérez vos propres annonces avec des outils professionnels', bg: 'bg-gradient-to-br from-[#913327] to-[#E54801]' },
]

const socials = [
  { icon: 'youtube', hover: 'hover:bg-[#E54801]' },
  { icon: 'facebook-f', hover: 'hover:bg-blue-600' },
  { icon: 'whatsapp', hover: 'hover:bg-green-500' },
  { icon: 'twitter', hover: 'hover:bg-sky-400' },
]

const strengthLabel = computed(() => ['', 'Faible', 'Moyen', 'Bon', 'Fort'][passwordStrength.value] || '')
const strengthColor = computed(() => ['', 'text-red-500', 'text-yellow-500', 'text-blue-500', 'text-green-500'][passwordStrength.value] || '')
const strengthBarClass = computed(() => ['', 'bg-red-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'][passwordStrength.value] || '')
const strengthWidth = computed(() => ['0%', '25%', '50%', '75%', '100%'][passwordStrength.value] || '0%')

const checkStrength = () => {
  const p = form.password
  let s = 0
  if (p.length >= 8) s++
  if (/[a-z]/.test(p) && /[A-Z]/.test(p)) s++
  if (/[0-9]/.test(p)) s++
  if (/[^A-Za-z0-9]/.test(p)) s++
  passwordStrength.value = s
}

const handleRegister = async () => {
  message.text = ''
  if (!form.lastName || !form.firstName || !form.phone || !form.email || !form.password || !form.password_confirmation) {
    message.text = 'Veuillez remplir tous les champs obligatoires.'
    message.type = 'error'
    return
  }
  if (form.password !== form.password_confirmation) {
    message.text = 'Les mots de passe ne correspondent pas.'
    message.type = 'error'
    return
  }
  if (!form.terms) {
    message.text = 'Vous devez accepter les conditions d\'utilisation pour continuer.'
    message.type = 'error'
    return
  }
  if (form.password.length < 8) {
    message.text = 'Le mot de passe doit contenir au moins 8 caractères.'
    message.type = 'error'
    return
  }
  isLoading.value = true
  
  const payload = {
    name: `${form.firstName} ${form.lastName}`,
    email: form.email,
    password: form.password,
    password_confirmation: form.password_confirmation,
    phone: form.phone,
  }

  const success = await authStore.register(payload)

  if (success) {
    message.text = `Compte créé avec succès pour ${form.firstName} ! Redirection...`
    message.type = 'success'
    setTimeout(() => router.push({ name: 'ClientDashboard' }), 1000)
  } else {
    message.text = authStore.error || 'Erreur lors de la création du compte. Vérifiez que cet email n\'est pas déjà utilisé.'
    message.type = 'error'
  }
  
  isLoading.value = false
}
</script>

<style scoped>
.gradient-bg {
  background: linear-gradient(135deg, #1B0B38 0%, #2c1b3d 50%, #4a2c5d 100%);
}
.logo-glow {
  filter: drop-shadow(0 0 15px rgba(229, 72, 1, 0.4));
}
.highlight-text {
  background: linear-gradient(90deg, #E54801, #ff7b4d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.pulse-glow {
  animation: pulseGlow 2s ease-in-out infinite;
}
@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 20px rgba(229, 72, 1, 0.3); }
  50% { box-shadow: 0 0 30px rgba(229, 72, 1, 0.5); }
}
.animate-float {
  animation: float 6s ease-in-out infinite;
}
@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
}
.animate-fadeInUp {
  animation: fadeInUp 0.8s ease-out forwards;
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn {
  animation: fadeIn 0.5s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-spin {
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
