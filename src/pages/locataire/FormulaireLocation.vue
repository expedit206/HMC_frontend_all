<template>
  <div class="bg-gray-50 min-h-screen pb-16">
    <!-- ─── PAGE DE CONFIRMATION APRÈS SOUMISSION ─── -->
    <Transition name="fade">
      <div
        v-if="submitted"
        class="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center text-center px-6"
      >
        <div
          class="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8 animate-bounce-once"
        >
          <i class="fas fa-check-circle text-5xl text-green-500"></i>
        </div>
        <h1 class="text-3xl font-black text-gray-900 mb-3">Dossier envoyé !</h1>
        <p class="text-gray-500 max-w-md mb-2">
          Votre demande de location pour
          <strong class="text-gray-800">{{ property?.title }}</strong> a été
          transmise au bailleur avec succès.
        </p>
        <p class="text-sm text-gray-400 mb-10">
          Vous recevrez une notification dès que votre dossier sera examiné.
        </p>
        <div class="flex flex-col sm:flex-row gap-4">
          <router-link
            :to="{ name: 'LocataireMesLocations' }"
            class="px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-primary/90 transition-all"
          >
            <i class="fas fa-list mr-2"></i> Voir mes demandes
          </router-link>
          <router-link
            :to="{ name: 'Annonces' }"
            class="px-8 py-4 border-2 border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all"
          >
            Continuer à chercher
          </router-link>
        </div>
      </div>
    </Transition>

    <!-- ─── FORMULAIRE ─── -->
    <main class="py-8 px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mx-auto">
        <!-- En-tête / Bien concerné -->
        <div
          class="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6"
        >
          <div class="flex items-start gap-4 mb-6">
            <div
              class="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center shrink-0"
            >
              <i class="fas fa-home text-2xl text-primary"></i>
            </div>
            <div class="flex-1 min-w-0">
              <h1 class="text-xl sm:text-2xl font-black text-gray-900">
                Demande de location
              </h1>
              <div
                v-if="isLoadingProperty"
                class="h-4 w-48 bg-gray-100 rounded animate-pulse mt-2"
              ></div>
              <p
                v-else-if="property"
                class="text-sm text-gray-500 mt-1 truncate"
              >
                <i class="fas fa-map-marker-alt text-primary mr-1"></i>
                <span class="font-semibold text-gray-700">{{
                  property.title
                }}</span>
                · {{ property.location }}
              </p>
              <p v-else class="text-sm text-red-500 mt-1">
                <i class="fas fa-exclamation-triangle mr-1"></i> Aucun bien
                sélectionné —
                <router-link :to="{ name: 'Annonces' }" class="underline"
                  >retour aux annonces</router-link
                >
              </p>
            </div>
          </div>

          <!-- Barre de progression -->
          <div>
            <div
              class="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-widest mb-3"
            >
              <span :class="currentStep >= 1 ? 'text-primary' : ''"
                >1. Informations</span
              >
              <span :class="currentStep >= 2 ? 'text-primary' : ''"
                >2. Validation</span
              >
            </div>
            <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                class="h-full bg-primary transition-all duration-500 ease-out rounded-full"
                :style="{ width: currentStep === 1 ? '50%' : '100%' }"
              ></div>
            </div>
          </div>
        </div>

        <!-- ══════════════════════════════════════════
             ÉTAPE 1  •  Informations & Documents
        ══════════════════════════════════════════ -->
        <div v-if="currentStep === 1" class="space-y-6">
          <!-- Identité -->
          <div
            class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <h2
              class="text-base font-black text-gray-800 mb-5 flex items-center gap-2 uppercase tracking-wide"
            >
              <span
                class="w-7 h-7 bg-primary text-white text-xs rounded-full flex items-center justify-center font-black"
                >1</span
              >
              Informations personnelles
            </h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2"
                  >Prénom <span class="text-red-500">*</span></label
                >
                <input
                  type="text"
                  v-model="form.firstName"
                  :class="[
                    'w-full px-4 py-3 border-2 rounded-xl outline-none transition-colors',
                    errors.firstName
                      ? 'border-red-400 bg-red-50'
                      : 'border-gray-100 focus:border-primary',
                  ]"
                  placeholder="Votre prénom"
                />
                <p
                  v-if="errors.firstName"
                  class="text-xs text-red-500 mt-1 flex items-center gap-1"
                >
                  <i class="fas fa-exclamation-circle"></i>
                  {{ errors.firstName }}
                </p>
              </div>
              <div>
                <label
                  class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2"
                  >Nom <span class="text-red-500">*</span></label
                >
                <input
                  type="text"
                  v-model="form.lastName"
                  :class="[
                    'w-full px-4 py-3 border-2 rounded-xl outline-none transition-colors',
                    errors.lastName
                      ? 'border-red-400 bg-red-50'
                      : 'border-gray-100 focus:border-primary',
                  ]"
                  placeholder="Votre nom"
                />
                <p
                  v-if="errors.lastName"
                  class="text-xs text-red-500 mt-1 flex items-center gap-1"
                >
                  <i class="fas fa-exclamation-circle"></i>
                  {{ errors.lastName }}
                </p>
              </div>
              <div class="sm:col-span-2">
                <label
                  class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2"
                  >Email</label
                >
                <input
                  type="email"
                  v-model="form.email"
                  readonly
                  class="w-full px-4 py-3 border-2 border-gray-100 rounded-xl outline-none bg-gray-50 text-gray-400 cursor-not-allowed"
                />
              </div>
              <div class="sm:col-span-2">
                <label
                  class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2"
                  >Téléphone <span class="text-red-500">*</span></label
                >
                <div class="flex">
                  <div
                    class="flex items-center px-4 border-2 border-r-0 border-gray-100 rounded-l-xl bg-gray-50 text-sm font-bold text-gray-700 shrink-0"
                  >
                    🇨🇲 +237
                  </div>
                  <input
                    type="tel"
                    v-model="form.phone"
                    :class="[
                      'flex-1 px-4 py-3 border-2 border-l-0 rounded-r-xl outline-none transition-colors',
                      errors.phone
                        ? 'border-red-400 bg-red-50'
                        : 'border-gray-100 focus:border-primary',
                    ]"
                    placeholder="6XX XX XX XX"
                  />
                </div>
                <p
                  v-if="errors.phone"
                  class="text-xs text-red-500 mt-1 flex items-center gap-1"
                >
                  <i class="fas fa-exclamation-circle"></i> {{ errors.phone }}
                </p>
              </div>
            </div>
          </div>

          <!-- Détails location -->
          <div
            class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <h2
              class="text-base font-black text-gray-800 mb-5 flex items-center gap-2 uppercase tracking-wide"
            >
              <span
                class="w-7 h-7 bg-primary text-white text-xs rounded-full flex items-center justify-center font-black"
                >2</span
              >
              Détails de la location
            </h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2"
                  >Date de début souhaitée
                  <span class="text-red-500">*</span></label
                >
                <input
                  type="date"
                  v-model="form.start_date"
                  :min="minDate"
                  :class="[
                    'w-full px-4 py-3 border-2 rounded-xl outline-none transition-colors',
                    errors.start_date
                      ? 'border-red-400 bg-red-50'
                      : 'border-gray-100 focus:border-primary',
                  ]"
                />
                <p
                  v-if="errors.start_date"
                  class="text-xs text-red-500 mt-1 flex items-center gap-1"
                >
                  <i class="fas fa-exclamation-circle"></i>
                  {{ errors.start_date }}
                </p>
              </div>
              <div>
                <label
                  class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2"
                  >Durée <span class="text-red-500">*</span></label
                >
                <select
                  v-model="form.duration_months"
                  class="w-full h-[50px] px-4 border-2 border-gray-100 rounded-xl outline-none focus:border-primary transition-colors bg-white"
                >
                  <option v-for="n in [6, 12, 18, 24, 36]" :key="n" :value="n">
                    {{ n }} mois
                  </option>
                </select>
              </div>
              <div class="sm:col-span-2">
                <label
                  class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2"
                  >Notes ou demandes particulières</label
                >
                <textarea
                  v-model="form.notes"
                  rows="3"
                  class="w-full px-4 py-3 border-2 border-gray-100 rounded-xl outline-none focus:border-primary transition-colors resize-none text-sm"
                  placeholder="Ex : j'ai un animal de compagnie, je souhaite emménager un week-end..."
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Documents -->
          <div
            class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <h2
              class="text-base font-black text-gray-800 mb-1 flex items-center gap-2 uppercase tracking-wide"
            >
              <span
                class="w-7 h-7 bg-primary text-white text-xs rounded-full flex items-center justify-center font-black"
                >3</span
              >
              Documents du dossier
            </h2>
            <p class="text-xs text-gray-400 mb-5 ml-9">
              Les documents marqués * sont obligatoires pour soumettre votre
              dossier.
            </p>

            <div class="space-y-4">
              <div
                v-for="doc in documents"
                :key="doc.id"
                :class="[
                  'border-2 rounded-xl p-4 transition-colors',
                  doc.status === 'uploaded'
                    ? 'border-green-300 bg-green-50/50'
                    : 'border-gray-100',
                ]"
              >
                <div class="flex items-start justify-between gap-3">
                  <div class="flex items-start gap-3">
                    <div
                      :class="[
                        'w-10 h-10 rounded-lg flex items-center justify-center shrink-0',
                        doc.status === 'uploaded'
                          ? 'bg-green-100'
                          : 'bg-gray-100',
                      ]"
                    >
                      <i
                        :class="[
                          'text-lg',
                          doc.status === 'uploaded'
                            ? 'fas fa-check text-green-600'
                            : 'fas fa-file-alt text-gray-400',
                        ]"
                      ></i>
                    </div>
                    <div>
                      <p class="font-bold text-gray-800 text-sm">
                        {{ doc.label }}
                        <span v-if="doc.required" class="text-red-500">*</span>
                      </p>
                      <p class="text-xs text-gray-400 mt-0.5">
                        {{ doc.description }}
                      </p>
                      <p
                        v-if="doc.fileName"
                        class="text-xs text-green-600 font-medium mt-1"
                      >
                        <i class="fas fa-paperclip mr-1"></i>{{ doc.fileName }}
                      </p>
                    </div>
                  </div>
                  <span
                    :class="[
                      'text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-widest shrink-0',
                      doc.status === 'uploaded'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700',
                    ]"
                  >
                    {{ doc.status === "uploaded" ? "Reçu ✓" : "Requis" }}
                  </span>
                </div>

                <!-- Zone d'upload -->
                <div
                  v-if="doc.status !== 'uploaded'"
                  class="relative mt-4 border-2 border-dashed border-gray-200 rounded-xl p-5 text-center bg-gray-50 hover:bg-gray-100 hover:border-primary/40 transition-all cursor-pointer group"
                >
                  <input
                    type="file"
                    class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept=".jpg,.jpeg,.png,.pdf"
                    @change="handleFileUpload($event, doc.id)"
                  />
                  <i
                    class="fas fa-cloud-upload-alt text-2xl text-gray-300 group-hover:text-primary transition-colors mb-2"
                  ></i>
                  <p class="text-xs text-gray-500 font-medium">
                    Cliquez ou glissez-déposez
                  </p>
                  <p class="text-[10px] text-gray-400 mt-0.5">
                    JPG, PNG ou PDF · max 5 Mo
                  </p>
                </div>
                <button
                  v-else
                  @click="removeFile(doc.id)"
                  class="mt-3 text-xs text-red-400 hover:text-red-600 font-bold flex items-center gap-1"
                >
                  <i class="fas fa-times-circle"></i> Retirer le fichier
                </button>
              </div>
            </div>
            <p
              v-if="errors.documents"
              class="text-xs text-red-500 mt-3 flex items-center gap-1 font-bold"
            >
              <i class="fas fa-exclamation-triangle"></i> {{ errors.documents }}
            </p>
          </div>

          <!-- Consentement -->
          <div
            :class="[
              'rounded-2xl p-5 border-2 transition-colors',
              errors.agree
                ? 'border-red-300 bg-red-50'
                : 'border-blue-100 bg-blue-50/60',
            ]"
          >
            <label class="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                v-model="form.agree"
                class="mt-1 h-5 w-5 rounded accent-primary border-gray-300"
              />
              <span class="text-sm text-gray-700 leading-relaxed">
                Je certifie que les informations et documents fournis sont
                exacts et authentiques. J'accepte les
                <a
                  href="/politique-confidentialite"
                  target="_blank"
                  class="text-primary font-bold hover:underline"
                  >Conditions Générales</a
                >
                et la
                <a
                  href="/politique-confidentialite"
                  target="_blank"
                  class="text-primary font-bold hover:underline"
                  >Politique de Confidentialité</a
                >
                de Home Cameroon. <span class="text-red-500">*</span>
              </span>
            </label>
            <p
              v-if="errors.agree"
              class="text-xs text-red-500 mt-2 ml-8 font-bold"
            >
              {{ errors.agree }}
            </p>
          </div>
        </div>

        <!-- ══════════════════════════════════════════
             ÉTAPE 2  •  Récapitulatif & Soumission
        ══════════════════════════════════════════ -->
        <div v-if="currentStep === 2" class="space-y-6">
          <!-- Récap du dossier -->
          <div
            class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <h2
              class="font-black text-gray-900 mb-5 uppercase tracking-wide text-sm flex items-center gap-2"
            >
              <i class="fas fa-clipboard-check text-primary"></i> Récapitulatif
              de votre dossier
            </h2>
            <div class="divide-y divide-gray-100">
              <div class="flex justify-between py-3 text-sm">
                <span class="text-gray-500">Locataire</span>
                <span class="font-bold text-gray-800"
                  >{{ form.firstName }} {{ form.lastName }}</span
                >
              </div>
              <div class="flex justify-between py-3 text-sm">
                <span class="text-gray-500">Téléphone</span>
                <span class="font-bold text-gray-800"
                  >+237 {{ form.phone }}</span
                >
              </div>
              <div class="flex justify-between py-3 text-sm">
                <span class="text-gray-500">Bien souhaité</span>
                <span
                  class="font-bold text-gray-800 text-right max-w-[60%] truncate"
                  >{{ property?.title }}</span
                >
              </div>
              <div class="flex justify-between py-3 text-sm">
                <span class="text-gray-500">Date d'entrée souhaitée</span>
                <span class="font-bold text-gray-800">{{
                  formatDate(form.start_date)
                }}</span>
              </div>
              <div class="flex justify-between py-3 text-sm">
                <span class="text-gray-500">Durée</span>
                <span class="font-bold text-gray-800"
                  >{{ form.duration_months }} mois</span
                >
              </div>
              <div class="flex justify-between py-3 text-sm">
                <span class="text-gray-500">Documents joints</span>
                <span class="font-bold text-green-600"
                  >{{ uploadedCount }}/{{ documents.length }} ✓</span
                >
              </div>
            </div>
          </div>

          <!-- Récapitulatif financier -->
          <div
            class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <h2
              class="font-black text-gray-900 mb-5 uppercase tracking-wide text-sm flex items-center gap-2"
            >
              <i class="fas fa-wallet text-primary"></i> Estimation financière
            </h2>
            <div class="divide-y divide-gray-100">
              <div class="flex justify-between py-3 text-sm">
                <span class="text-gray-500">Loyer mensuel</span>
                <span class="font-bold text-gray-800" v-if="property"
                  >{{ formatPrice(property.price) }} FCFA</span
                >
                <span v-else class="text-gray-300 italic">—</span>
              </div>
              <div class="flex justify-between py-3 text-sm">
                <span class="text-gray-500">Caution (2 mois)</span>
                <span class="font-bold text-gray-800" v-if="property"
                  >{{ formatPrice(property.price * 2) }} FCFA</span
                >
                <span v-else class="text-gray-300 italic">—</span>
              </div>
              <div class="flex justify-between py-3 text-sm">
                <span class="text-gray-500">Frais de dossier</span>
                <span class="font-bold text-green-600">Offerts</span>
              </div>
            </div>
            <div
              class="flex justify-between items-center pt-4 mt-2 border-t-2 border-gray-100"
            >
              <span class="font-black text-gray-900">À prévoir à l'entrée</span>
              <span class="text-2xl font-black text-primary" v-if="property"
                >{{ formatPrice(property.price * 3) }} FCFA</span
              >
            </div>
            <p class="text-[11px] text-gray-400 mt-3 italic">
              <i class="fas fa-info-circle mr-1"></i>
              Le paiement sera demandé uniquement après validation de votre
              dossier par le bailleur.
            </p>
          </div>

          <!-- Mode de paiement (préférence) -->
          <div
            class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <h2
              class="font-black text-gray-900 mb-5 uppercase tracking-wide text-sm flex items-center gap-2"
            >
              <i class="fas fa-money-bill-wave text-primary"></i> Moyen de
              paiement préféré
            </h2>
            <div class="grid grid-cols-1 gap-3">
              <label
                v-for="m in paymentMethods"
                :key="m.id"
                :class="[
                  'flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all',
                  paymentMethod === m.id
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-100 hover:border-gray-200',
                ]"
              >
                <input
                  type="radio"
                  :value="m.id"
                  v-model="paymentMethod"
                  class="sr-only"
                />
                <div
                  :class="[
                    'w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0',
                    paymentMethod === m.id
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-400',
                  ]"
                >
                  <i :class="m.icon"></i>
                </div>
                <div class="flex-1">
                  <p class="font-bold text-gray-900 text-sm">{{ m.label }}</p>
                  <p class="text-xs text-gray-400">{{ m.sub }}</p>
                </div>
                <div
                  :class="[
                    'w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0',
                    paymentMethod === m.id
                      ? 'border-primary'
                      : 'border-gray-300',
                  ]"
                >
                  <div
                    v-if="paymentMethod === m.id"
                    class="w-2.5 h-2.5 bg-primary rounded-full"
                  ></div>
                </div>
              </label>
            </div>
          </div>

          <!-- Avertissement & confirmation -->
          <div
            class="bg-amber-50 border-2 border-amber-200 rounded-2xl p-5 flex items-start gap-4"
          >
            <i
              class="fas fa-exclamation-triangle text-amber-500 text-xl mt-0.5 shrink-0"
            ></i>
            <div>
              <h4 class="font-black text-gray-900 mb-1 text-sm">
                Confirmation finale
              </h4>
              <p class="text-sm text-gray-600 leading-relaxed">
                En soumettant ce dossier, vous confirmez que toutes les
                informations sont exactes. Le bailleur sera notifié
                immédiatement par email. Vous ne pourrez pas modifier ce dossier
                après soumission.
              </p>
            </div>
          </div>
        </div>

        <!-- ─── NAVIGATION ─── -->
        <div
          class="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-gray-100"
        >
          <button
            v-if="currentStep > 1"
            @click="prevStep"
            class="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition-all w-full sm:w-auto justify-center"
          >
            <i class="fas fa-chevron-left text-xs"></i> Retour
          </button>
          <div v-else></div>

          <div class="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              v-if="currentStep === 1"
              @click="saveDraft"
              class="px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition-all flex items-center gap-2 justify-center"
            >
              <i class="fas fa-save"></i> Brouillon
            </button>
            <button
              @click="nextStep"
              :disabled="isSubmitting"
              :class="[
                'px-8 py-3 rounded-xl font-black text-white transition-all flex items-center gap-2 justify-center min-w-[180px]',
                isSubmitting
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-primary hover:bg-primary/90 hover:-translate-y-0.5 shadow-lg active:scale-95',
              ]"
            >
              <span v-if="isSubmitting"
                ><i class="fas fa-circle-notch fa-spin mr-2"></i
                >Traitement...</span
              >
              <span v-else>
                {{ currentStep === 1 ? "Continuer" : "Soumettre ma demande" }}
                <i class="fas fa-chevron-right text-xs ml-1"></i>
              </span>
            </button>
          </div>
        </div>

        <!-- Message d'erreur API global -->
        <div
          v-if="apiError"
          class="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3"
        >
          <i class="fas fa-times-circle text-red-500 text-xl"></i>
          <p class="text-sm text-red-700 font-medium">{{ apiError }}</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "../../stores/auth";
import axios from "../../axios";

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

// ── État général ─────────────────────────────────────────────────────────────
const currentStep = ref(1);
const isSubmitting = ref(false);
const submitted = ref(false);
const apiError = ref("");
const paymentMethod = ref("mobile");
const isLoadingProperty = ref(true);
const property = ref(null);

// ── Formulaire ───────────────────────────────────────────────────────────────
const form = ref({
  property_id: route.query.property_id || null,
  firstName: authStore.user?.name?.split(" ")[0] || "",
  lastName: authStore.user?.name?.split(" ").slice(1).join(" ") || "",
  email: authStore.user?.email || "",
  phone: authStore.user?.phone || "",
  start_date: "",
  duration_months: 12,
  notes: "",
  agree: false,
});

// ── Erreurs de validation ─────────────────────────────────────────────────────
const errors = ref({});

// ── Date minimum (demain) ─────────────────────────────────────────────────────
const minDate = computed(() => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split("T")[0];
});

// ── Documents ─────────────────────────────────────────────────────────────────
const documents = ref([
  {
    id: 1,
    label: "CIN Recto",
    description: "Photo recto de votre carte d'identité nationale",
    required: true,
    status: "pending",
    file: null,
    fileName: "",
  },
  {
    id: 2,
    label: "CIN Verso",
    description: "Photo verso de votre carte d'identité nationale",
    required: true,
    status: "pending",
    file: null,
    fileName: "",
  },
  {
    id: 3,
    label: "Justificatif de domicile",
    description: "Facture d'eau, d'électricité ou de téléphone récente",
    required: true,
    status: "pending",
    file: null,
    fileName: "",
  },
  {
    id: 4,
    label: "Bulletin de salaire",
    description: "3 derniers mois (facultatif mais recommandé)",
    required: false,
    status: "pending",
    file: null,
    fileName: "",
  },
]);

const uploadedCount = computed(
  () => documents.value.filter((d) => d.status === "uploaded").length,
);

// ── Modes de paiement ─────────────────────────────────────────────────────────
const paymentMethods = [
  {
    id: "mobile",
    label: "Mobile Money",
    sub: "Orange Money · MTN Mobile Money",
    icon: "fas fa-mobile-alt",
  },
  {
    id: "card",
    label: "Carte bancaire",
    sub: "Visa · Mastercard · UnionPay",
    icon: "fas fa-credit-card",
  },
  {
    id: "cash",
    label: "Espèces",
    sub: "À remettre en mains propres",
    icon: "fas fa-money-bill-alt",
  },
];

// ── Chargement du bien ────────────────────────────────────────────────────────
const fetchProperty = async () => {
  if (!form.value.property_id) {
    isLoadingProperty.value = false;
    return;
  }
  try {
    const { data } = await axios.get(
      `/api/properties/${form.value.property_id}`,
    );
    if (data.success) property.value = data.data;
  } catch {
    // property reste null
  } finally {
    isLoadingProperty.value = false;
  }
};

// ── Brouillon ─────────────────────────────────────────────────────────────────
const saveDraft = () => {
  localStorage.setItem("rental_draft", JSON.stringify(form.value));
  // Petit feedback visuel sans alert()
  const btn = document.activeElement;
  if (btn) {
    btn.innerHTML = '<i class="fas fa-check mr-2"></i>Sauvegardé !';
    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-save mr-2"></i>Brouillon';
    }, 2000);
  }
};

const loadDraft = () => {
  const draft = localStorage.getItem("rental_draft");
  if (draft) {
    const parsed = JSON.parse(draft);
    // Ne charger que si c'est pour le même bien
    if (parsed.property_id === form.value.property_id) {
      form.value = { ...form.value, ...parsed };
    }
  }
};

// ── Gestion fichiers ──────────────────────────────────────────────────────────
const handleFileUpload = (event, docId) => {
  const file = event.target.files[0];
  if (!file) return;
  if (file.size > 5 * 1024 * 1024) {
    alert("Le fichier est trop volumineux (max 5 Mo).");
    return;
  }
  const doc = documents.value.find((d) => d.id === docId);
  if (doc) {
    doc.file = file;
    doc.fileName = file.name;
    doc.status = "uploaded";
  }
};

const removeFile = (docId) => {
  const doc = documents.value.find((d) => d.id === docId);
  if (doc) {
    doc.file = null;
    doc.fileName = "";
    doc.status = "pending";
  }
};

// ── Validation Étape 1 ────────────────────────────────────────────────────────
const validateStep1 = () => {
  errors.value = {};
  if (!form.value.firstName.trim())
    errors.value.firstName = "Le prénom est requis.";
  if (!form.value.lastName.trim()) errors.value.lastName = "Le nom est requis.";
  if (!form.value.phone.trim()) errors.value.phone = "Le téléphone est requis.";
  if (!form.value.start_date)
    errors.value.start_date = "La date de début est requise.";
  if (!form.value.agree)
    errors.value.agree = "Vous devez accepter les conditions générales.";

  const missingRequired = documents.value.filter(
    (d) => d.required && d.status !== "uploaded",
  );
  if (missingRequired.length > 0) {
    errors.value.documents = `Documents manquants : ${missingRequired.map((d) => d.label).join(", ")}.`;
  }

  return Object.keys(errors.value).length === 0;
};

// ── Navigation étapes ─────────────────────────────────────────────────────────
const nextStep = () => {
  apiError.value = "";
  if (currentStep.value === 1) {
    if (!validateStep1()) {
      // Scroll vers la première erreur
      document
        .querySelector(".border-red-400, .border-red-300")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    currentStep.value = 2;
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    submitForm();
  }
};

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

// ── Soumission ────────────────────────────────────────────────────────────────
const submitForm = async () => {
  if (!form.value.start_date) {
    apiError.value = "Date de début manquante.";
    return;
  }

  isSubmitting.value = true;
  apiError.value = "";

  try {
    const payload = {
      property_id: form.value.property_id,
      start_date: form.value.start_date,
      duration_months: form.value.duration_months,
      notes: form.value.notes,
    };

    const { data } = await axios.post("/api/tenant/apply", payload);

    if (data.success) {
      localStorage.removeItem("rental_draft");
      submitted.value = true;
    }
  } catch (err) {
    apiError.value =
      err.response?.data?.message ||
      "Une erreur est survenue. Veuillez réessayer.";
  } finally {
    isSubmitting.value = false;
  }
};

// ── Utilitaires ───────────────────────────────────────────────────────────────
const formatPrice = (price) => new Intl.NumberFormat("fr-FR").format(price);

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

// ── Montage ───────────────────────────────────────────────────────────────────
onMounted(() => {
  loadDraft();
  fetchProperty();
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes bounce-once {
  0%,
  100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-20px);
  }
  60% {
    transform: translateY(-8px);
  }
}
.animate-bounce-once {
  animation: bounce-once 0.8s ease-out forwards;
}
</style>
