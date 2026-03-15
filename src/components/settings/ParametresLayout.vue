<template>
  <DashboardLayout>
    <div class="max-w-5xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-foreground flex items-center gap-3">
          <div class="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center">
            <i class="fas fa-cog text-secondary"></i>
          </div>
          Paramètres
        </h1>
        <p class="text-muted-foreground mt-1">Gérez votre profil, sécurité et préférences</p>
      </div>

      <div class="flex flex-col lg:flex-row gap-6">
        <!-- Sidebar navigation -->
        <aside class="lg:w-60 shrink-0">
          <nav class="bg-card rounded-2xl border border-border p-2 space-y-1 sticky top-24">
            <button
              v-for="tab in allTabs" :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left',
                activeTab === tab.id
                  ? 'bg-secondary text-secondary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/20'
              ]"
            >
              <i :class="tab.icon" class="w-4 text-center shrink-0"></i>
              <span>{{ tab.label }}</span>
            </button>
          </nav>
        </aside>

        <!-- Contenu des onglets -->
        <div class="flex-1 min-w-0">
          <!-- PROFIL -->
          <div v-if="activeTab === 'profil'" class="bg-card rounded-2xl border border-border p-6 lg:p-8 space-y-6">
            <h2 class="text-lg font-bold text-foreground flex items-center gap-2">
              <i class="fas fa-user-circle text-secondary"></i> Informations personnelles
            </h2>

            <!-- Avatar -->
            <div class="flex items-center gap-5">
              <div class="relative">
                <div class="w-20 h-20 rounded-full overflow-hidden border-4 border-secondary/20 bg-muted/20 shrink-0">
                  <img
                    v-if="authStore.user?.avatar_url"
                    :src="authStore.user.avatar_url"
                    :alt="authStore.user.name"
                    class="w-full h-full object-cover"
                  />
                  <div v-else class="w-full h-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center text-white font-bold text-2xl">
                    {{ initials }}
                  </div>
                </div>
                <label class="absolute -bottom-1 -right-1 w-7 h-7 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center cursor-pointer shadow hover:bg-primary transition-colors">
                  <i class="fas fa-camera text-[10px]"></i>
                  <input type="file" class="hidden" accept="image/*" @change="uploadAvatar" />
                </label>
              </div>
              <div>
                <p class="font-semibold text-foreground">{{ authStore.user?.name }}</p>
                <p class="text-sm text-muted-foreground capitalize">{{ authStore.user?.role }}</p>
                <p v-if="avatarMessage" :class="avatarMessage.type === 'success' ? 'text-green-600' : 'text-red-500'" class="text-xs mt-1">{{ avatarMessage.text }}</p>
              </div>
            </div>

            <hr class="border-border" />

            <!-- Formulaire infos -->
            <form @submit.prevent="saveProfile" class="space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-foreground mb-1.5">Nom complet</label>
                  <input v-model="form.name" type="text"
                    class="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-secondary/30 transition"
                    placeholder="Votre nom" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-foreground mb-1.5">Téléphone</label>
                  <input v-model="form.phone" type="tel"
                    class="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-secondary/30 transition"
                    placeholder="+237 6XX XXX XXX" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-foreground mb-1.5">Email</label>
                  <input v-model="form.email" type="email" disabled
                    class="w-full px-4 py-2.5 bg-muted/20 border border-border rounded-xl text-sm text-muted-foreground cursor-not-allowed" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-foreground mb-1.5">Ville</label>
                  <input v-model="form.city" type="text"
                    class="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-secondary/30 transition"
                    placeholder="Ex: Douala" />
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-foreground mb-1.5">Bio / Description</label>
                <textarea v-model="form.bio" rows="3"
                  class="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-secondary/30 resize-none transition"
                  placeholder="Parlez de vous en quelques mots..."></textarea>
              </div>
              <div class="flex items-center justify-between pt-2">
                <p v-if="profileMessage" :class="profileMessage.type === 'success' ? 'text-green-600' : 'text-red-500'" class="text-sm">
                  <i :class="profileMessage.type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'" class="mr-1"></i>
                  {{ profileMessage.text }}
                </p>
                <div v-else></div>
                <button type="submit" :disabled="isSavingProfile"
                  class="px-6 py-2.5 bg-secondary text-secondary-foreground rounded-xl text-sm font-bold hover:bg-primary hover:text-primary-foreground transition-all disabled:opacity-50">
                  <i v-if="isSavingProfile" class="fas fa-circle-notch fa-spin mr-2"></i>
                  Enregistrer
                </button>
              </div>
            </form>

            <!-- Slot pour contenu spécifique au rôle -->
            <slot name="profil-extra" />
          </div>

          <!-- SECURITÉ -->
          <div v-if="activeTab === 'securite'" class="bg-card rounded-2xl border border-border p-6 lg:p-8 space-y-6">
            <h2 class="text-lg font-bold text-foreground flex items-center gap-2">
              <i class="fas fa-lock text-secondary"></i> Sécurité du compte
            </h2>

            <form @submit.prevent="changePassword" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-foreground mb-1.5">Mot de passe actuel</label>
                <input v-model="passwordForm.current" type="password"
                  class="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-secondary/30 transition"
                  placeholder="••••••••" />
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-foreground mb-1.5">Nouveau mot de passe</label>
                  <input v-model="passwordForm.new" type="password"
                    class="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-secondary/30 transition"
                    placeholder="••••••••" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-foreground mb-1.5">Confirmer</label>
                  <input v-model="passwordForm.confirm" type="password"
                    class="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-secondary/30 transition"
                    placeholder="••••••••" />
                </div>
              </div>
              <div class="flex items-center justify-between pt-2">
                <p v-if="passwordMessage" :class="passwordMessage.type === 'success' ? 'text-green-600' : 'text-red-500'" class="text-sm">
                  <i :class="passwordMessage.type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'" class="mr-1"></i>
                  {{ passwordMessage.text }}
                </p>
                <div v-else></div>
                <button type="submit" :disabled="isChangingPassword"
                  class="px-6 py-2.5 bg-secondary text-secondary-foreground rounded-xl text-sm font-bold hover:bg-primary hover:text-primary-foreground transition-all disabled:opacity-50">
                  <i v-if="isChangingPassword" class="fas fa-circle-notch fa-spin mr-2"></i>
                  Mettre à jour
                </button>
              </div>
            </form>

            <hr class="border-border" />

            <!-- Zone de danger -->
            <div class="p-5 border border-destructive/20 rounded-2xl bg-destructive/5">
              <h3 class="font-bold text-destructive mb-1">Zone de danger</h3>
              <p class="text-sm text-muted-foreground mb-4">La suppression de votre compte est irréversible.</p>
              <button class="px-4 py-2 border border-destructive/40 text-destructive text-sm font-bold rounded-xl hover:bg-destructive/10 transition">
                <i class="fas fa-user-slash mr-2"></i> Supprimer mon compte
              </button>
            </div>
          </div>

          <!-- NOTIFICATIONS -->
          <div v-if="activeTab === 'notifications'" class="bg-card rounded-2xl border border-border p-6 lg:p-8 space-y-4">
            <h2 class="text-lg font-bold text-foreground flex items-center gap-2">
              <i class="fas fa-bell text-secondary"></i> Préférences de notifications
            </h2>
            <div class="space-y-3">
              <label v-for="notif in notifOptions" :key="notif.id"
                class="flex items-center justify-between p-4 bg-muted/10 rounded-xl cursor-pointer hover:bg-muted/20 transition border border-border">
                <div>
                  <p class="font-medium text-foreground text-sm">{{ notif.label }}</p>
                  <p class="text-xs text-muted-foreground">{{ notif.desc }}</p>
                </div>
                <button
                  @click="notif.enabled = !notif.enabled"
                  :class="notif.enabled ? 'bg-secondary' : 'bg-muted/40'"
                  class="relative w-12 h-6 rounded-full transition-colors shrink-0 ml-4">
                  <span :class="notif.enabled ? 'translate-x-6' : 'translate-x-1'"
                    class="absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform"></span>
                </button>
              </label>
            </div>
          </div>

          <!-- Slot pour onglets spécifiques au rôle -->
          <slot name="tab-content" :active-tab="activeTab" />
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import DashboardLayout from '../../layouts/DashboardLayout.vue';
import { useAuthStore } from '../../stores/auth';
import axios from '../../axios';

const props = defineProps({
  extraTabs: {
    type: Array,
    default: () => []
  }
});

const authStore = useAuthStore();

const baseTabs = [
  { id: 'profil',        label: 'Profil',        icon: 'fas fa-user' },
  { id: 'securite',      label: 'Sécurité',      icon: 'fas fa-lock' },
  { id: 'notifications', label: 'Notifications', icon: 'fas fa-bell' },
];

const allTabs = computed(() => [...baseTabs, ...props.extraTabs]);
const activeTab = ref('profil');

// ─── Initiales ─────────────────────────────────────────────────────────
const initials = computed(() =>
  (authStore.user?.name ?? '?').split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
);

// ─── Formulaire profil ──────────────────────────────────────────────────
const form = ref({ name: '', phone: '', email: '', city: '', bio: '' });
const isSavingProfile = ref(false);
const profileMessage = ref(null);

const avatarMessage = ref(null);

onMounted(() => {
  const u = authStore.user;
  if (u) {
    form.value = { name: u.name ?? '', phone: u.phone ?? '', email: u.email ?? '', city: u.city ?? '', bio: u.bio ?? '' };
  }
});

const saveProfile = async () => {
  isSavingProfile.value = true;
  profileMessage.value = null;
  try {
    const { data } = await axios.put('/api/profile', form.value);
    if (data.success) {
      await authStore.fetchUser();
      profileMessage.value = { type: 'success', text: 'Profil mis à jour avec succès.' };
    }
  } catch (err) {
    profileMessage.value = { type: 'error', text: err.response?.data?.message || 'Une erreur est survenue.' };
  } finally {
    isSavingProfile.value = false;
    setTimeout(() => profileMessage.value = null, 4000);
  }
};

const uploadAvatar = async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const formData = new FormData();
  formData.append('avatar', file);
  avatarMessage.value = null;
  try {
    await axios.post('/api/profile/avatar', formData);
    await authStore.fetchUser();
    avatarMessage.value = { type: 'success', text: 'Photo mise à jour.' };
  } catch {
    avatarMessage.value = { type: 'error', text: 'Erreur lors du téléversement.' };
  }
  setTimeout(() => avatarMessage.value = null, 3000);
};

// ─── Mot de passe ────────────────────────────────────────────────────────
const passwordForm = ref({ current: '', new: '', confirm: '' });
const isChangingPassword = ref(false);
const passwordMessage = ref(null);

const changePassword = async () => {
  if (passwordForm.value.new !== passwordForm.value.confirm) {
    passwordMessage.value = { type: 'error', text: 'Les mots de passe ne correspondent pas.' };
    return;
  }
  isChangingPassword.value = true;
  passwordMessage.value = null;
  try {
    const { data } = await axios.post('/api/profile/password', {
      current_password: passwordForm.value.current,
      password: passwordForm.value.new,
      password_confirmation: passwordForm.value.confirm,
    });
    if (data.success) {
      passwordForm.value = { current: '', new: '', confirm: '' };
      passwordMessage.value = { type: 'success', text: 'Mot de passe mis à jour.' };
    }
  } catch (err) {
    passwordMessage.value = { type: 'error', text: err.response?.data?.message || 'Erreur lors de la mise à jour.' };
  } finally {
    isChangingPassword.value = false;
    setTimeout(() => passwordMessage.value = null, 4000);
  }
};

// ─── Notifications ───────────────────────────────────────────────────────
const notifOptions = ref([
  { id: 'new_properties',  label: 'Nouvelles annonces',    desc: 'Alertes pour les biens correspondants à vos critères', enabled: true },
  { id: 'visits',          label: 'Visites & confirmations', desc: 'Rappels et confirmations de visite',                  enabled: true },
  { id: 'applications',    label: 'Dossiers de location',   desc: 'Statut de vos dossiers de candidature',               enabled: true },
  { id: 'newsletter',      label: 'Newsletter HMC',         desc: 'Actualités et conseils immobiliers',                  enabled: false },
]);

// Expose activeTab for parent slot usage
defineExpose({ activeTab });
</script>
