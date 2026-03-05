<template>
  <div class="auth-page min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5 py-8">
    <div class="max-w-md w-full mx-4">
      <!-- Card -->
      <div class="card p-8 border-2 border-secondary/20">
        <!-- En-tête -->
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-primary mb-2">
            Home<span class="text-secondary">Cameroon</span>
          </h1>
          <p class="text-muted-foreground">Réinitialiser votre mot de passe</p>
        </div>

        <!-- Étapes -->
        <div class="flex items-center justify-center gap-2 mb-8">
          <div 
            v-for="step in 3"
            :key="step"
            :class="[
              'w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all',
              currentStep >= step 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-input text-muted-foreground'
            ]"
          >
            {{ step }}
          </div>
        </div>

        <!-- Formulaire -->
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Étape 1: Email -->
          <div v-show="currentStep === 1" class="space-y-4">
            <div class="text-center mb-6">
              <i class="fas fa-envelope text-primary text-4xl mb-4 block"></i>
              <h2 class="text-xl font-bold text-foreground mb-2">Récupérez votre compte</h2>
              <p class="text-muted-foreground text-sm">
                Entrez votre adresse email. Nous vous enverrons les instructions pour réinitialiser votre mot de passe.
              </p>
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-foreground mb-2">
                Adresse email
              </label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                class="input w-full"
                placeholder="votre@email.com"
              />
            </div>

            <div v-if="error" class="bg-destructive/10 border border-destructive text-destructive p-3 rounded text-sm">
              <i class="fas fa-exclamation-circle mr-2"></i>
              {{ error }}
            </div>

            <button
              type="button"
              @click="sendResetCode"
              :disabled="isLoading"
              class="btn btn-primary w-full"
            >
              <span v-if="!isLoading">
                <i class="fas fa-paper-plane mr-2"></i>
                Envoyer le code
              </span>
              <span v-else>
                <i class="fas fa-spinner animate-spin mr-2"></i>
                Envoi en cours...
              </span>
            </button>
          </div>

          <!-- Étape 2: Code de vérification -->
          <div v-show="currentStep === 2" class="space-y-4">
            <div class="text-center mb-6">
              <i class="fas fa-key text-primary text-4xl mb-4 block"></i>
              <h2 class="text-xl font-bold text-foreground mb-2">Vérification</h2>
              <p class="text-muted-foreground text-sm">
                Nous avons envoyé un code à <strong>{{ form.email }}</strong>
              </p>
            </div>

            <div>
              <label for="code" class="block text-sm font-medium text-foreground mb-2">
                Code de vérification (6 chiffres)
              </label>
              <input
                id="code"
                v-model="form.code"
                type="text"
                maxlength="6"
                placeholder="000000"
                class="input w-full text-center text-2xl tracking-widest"
                required
              />
            </div>

            <div class="text-center">
              <p class="text-muted-foreground text-sm mb-2">
                Vous n'avez pas reçu le code?
              </p>
              <button
                type="button"
                @click="resendCode"
                :disabled="resendTimer > 0"
                class="text-primary hover:underline text-sm font-medium disabled:text-muted-foreground"
              >
                {{ resendTimer > 0 ? `Renvoyer dans ${resendTimer}s` : 'Renvoyer le code' }}
              </button>
            </div>

            <div v-if="error" class="bg-destructive/10 border border-destructive text-destructive p-3 rounded text-sm">
              <i class="fas fa-exclamation-circle mr-2"></i>
              {{ error }}
            </div>

            <button
              type="button"
              @click="verifyCode"
              :disabled="isLoading || form.code.length !== 6"
              class="btn btn-primary w-full"
            >
              <span v-if="!isLoading">
                <i class="fas fa-check mr-2"></i>
                Vérifier le code
              </span>
              <span v-else>
                <i class="fas fa-spinner animate-spin mr-2"></i>
                Vérification...
              </span>
            </button>
          </div>

          <!-- Étape 3: Nouveau mot de passe -->
          <div v-show="currentStep === 3" class="space-y-4">
            <div class="text-center mb-6">
              <i class="fas fa-lock text-primary text-4xl mb-4 block"></i>
              <h2 class="text-xl font-bold text-foreground mb-2">Nouveau mot de passe</h2>
              <p class="text-muted-foreground text-sm">
                Créez un nouveau mot de passe sécurisé pour votre compte
              </p>
            </div>

            <div>
              <label for="newPassword" class="block text-sm font-medium text-foreground mb-2">
                Nouveau mot de passe
              </label>
              <div class="relative">
                <input
                  id="newPassword"
                  v-model="form.newPassword"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  class="input w-full pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <i :class="`fas fa-eye${showPassword ? '' : '-slash'}`"></i>
                </button>
              </div>
              <p class="text-xs text-muted-foreground mt-1">Min. 8 caractères avec majuscule et chiffre</p>
            </div>

            <div>
              <label for="confirmPassword" class="block text-sm font-medium text-foreground mb-2">
                Confirmer le mot de passe
              </label>
              <div class="relative">
                <input
                  id="confirmPassword"
                  v-model="form.confirmPassword"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  class="input w-full pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <i :class="`fas fa-eye${showPassword ? '' : '-slash'}`"></i>
                </button>
              </div>
            </div>

            <div v-if="error" class="bg-destructive/10 border border-destructive text-destructive p-3 rounded text-sm">
              <i class="fas fa-exclamation-circle mr-2"></i>
              {{ error }}
            </div>

            <div v-if="success" class="bg-success/10 border border-success text-success p-3 rounded text-sm">
              <i class="fas fa-check-circle mr-2"></i>
              {{ success }}
            </div>

            <button
              type="submit"
              :disabled="isLoading"
              class="btn btn-primary w-full"
            >
              <span v-if="!isLoading">
                <i class="fas fa-check mr-2"></i>
                Réinitialiser le mot de passe
              </span>
              <span v-else>
                <i class="fas fa-spinner animate-spin mr-2"></i>
                Réinitialisation...
              </span>
            </button>
          </div>
        </form>

        <!-- Retour à la connexion -->
        <div v-if="currentStep === 1" class="text-center mt-6 pt-6 border-t border-border">
          <RouterLink :to="{ name: 'Connexion' }" class="text-primary hover:underline text-sm font-medium">
            <i class="fas fa-arrow-left mr-2"></i>
            Retour à la connexion
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter()
const currentStep = ref(1)
const showPassword = ref(false)
const isLoading = ref(false)
const error = ref('')
const success = ref('')
const resendTimer = ref(0)
let resendInterval = null

const form = ref({
  email: '',
  code: '',
  newPassword: '',
  confirmPassword: ''
})

const sendResetCode = async () => {
  error.value = ''
  success.value = ''

  if (!form.value.email) {
    error.value = 'Veuillez entrer votre email'
    return
  }

  if (!form.value.email.includes('@')) {
    error.value = 'Email invalide'
    return
  }

  isLoading.value = true

  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    success.value = `Code envoyé à ${form.value.email}`
    currentStep.value = 2
    resendTimer.value = 60
    startResendTimer()
  } catch (err) {
    error.value = 'Erreur lors de l\'envoi du code'
  } finally {
    isLoading.value = false
  }
}

const resendCode = async () => {
  error.value = ''
  success.value = ''
  isLoading.value = true

  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    success.value = 'Nouveau code envoyé'
    resendTimer.value = 60
    if (resendInterval) clearInterval(resendInterval)
    startResendTimer()
  } catch (err) {
    error.value = 'Erreur lors du renvoi du code'
  } finally {
    isLoading.value = false
  }
}

const startResendTimer = () => {
  if (resendInterval) clearInterval(resendInterval)
  resendInterval = setInterval(() => {
    resendTimer.value--
    if (resendTimer.value <= 0) {
      clearInterval(resendInterval)
    }
  }, 1000)
}

const verifyCode = async () => {
  error.value = ''
  success.value = ''

  if (form.value.code.length !== 6) {
    error.value = 'Le code doit contenir 6 chiffres'
    return
  }

  isLoading.value = true

  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    success.value = 'Code vérifié avec succès'
    currentStep.value = 3
  } catch (err) {
    error.value = 'Code invalide'
  } finally {
    isLoading.value = false
  }
}

const handleSubmit = async () => {
  error.value = ''
  success.value = ''

  if (form.value.newPassword.length < 8) {
    error.value = 'Le mot de passe doit avoir au moins 8 caractères'
    return
  }

  if (form.value.newPassword !== form.value.confirmPassword) {
    error.value = 'Les mots de passe ne correspondent pas'
    return
  }

  isLoading.value = true

  try {
    await new Promise(resolve => setTimeout(resolve, 1500))
    success.value = 'Mot de passe réinitialisé avec succès!'
    setTimeout(() => {
      router.push({ name: 'Connexion' })
    }, 1500)
  } catch (err) {
    error.value = 'Erreur lors de la réinitialisation'
  } finally {
    isLoading.value = false
  }
}

onUnmounted(() => {
  if (resendInterval) clearInterval(resendInterval)
})
</script>

<style scoped>
.animate-spin {
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

input[type="text"]::-webkit-outer-spin-button,
input[type="text"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
