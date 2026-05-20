<template>
  <div class="cameroon-location-fields space-y-5">

    <!-- 🌍 Pays (fixe) -->
    <div class="flex items-center gap-2 px-4 py-3 bg-secondary/5 border border-secondary/20 rounded-xl">
      <span class="text-lg">🇨🇲</span>
      <span class="text-xs font-black text-secondary uppercase tracking-widest">Cameroun</span>
      <span class="ml-auto text-[10px] text-muted-foreground font-medium">Pays fixé</span>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">

      <!-- 🏙️ Ville -->
      <div>
        <label :for="cityId" class="block text-[10px] text-muted-foreground font-bold uppercase mb-2 ml-2">
          <i class="fas fa-city text-secondary mr-1"></i>Ville <span class="text-destructive">*</span>
        </label>
        <div class="relative">
          <select
            :id="cityId"
            :value="city"
            @change="onCityChange($event.target.value)"
            required
            class="w-full px-5 py-4 bg-muted/20 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-secondary/20 outline-none transition-all cursor-pointer text-foreground appearance-none pr-10"
          >
            <option value="" disabled>— Sélectionner une ville —</option>
            <optgroup v-for="(cities, region) in CAMEROON_DATA" :key="region" :label="region">
              <option
                v-for="c in cities"
                :key="c.name"
                :value="c.name"
                class="bg-card"
              >{{ c.name }}</option>
            </optgroup>
          </select>
          <i class="fas fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-xs pointer-events-none"></i>
        </div>
      </div>

      <!-- 🏘️ Quartier avec autocomplétion -->
      <div class="relative">
        <label :for="neighborhoodId" class="block text-[10px] text-muted-foreground font-bold uppercase mb-2 ml-2">
          <i class="fas fa-map-pin text-secondary mr-1"></i>Quartier <span class="text-destructive">*</span>
        </label>
        <div class="relative">
          <input
            :id="neighborhoodId"
            ref="neighborhoodInput"
            :value="location"
            @input="onNeighborhoodInput($event.target.value)"
            @focus="showSuggestions = filteredNeighborhoods.length > 0"
            @blur="hideSuggestions"
            @keydown.down.prevent="highlightNext"
            @keydown.up.prevent="highlightPrev"
            @keydown.enter.prevent="selectHighlighted"
            @keydown.escape="showSuggestions = false"
            :placeholder="city ? `Ex: ${suggestionsForCity[0] ?? 'Votre quartier'}` : 'Sélectionnez d\'abord une ville'"
            :disabled="!city"
            required
            autocomplete="off"
            class="w-full px-5 py-4 bg-muted/20 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-secondary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed pr-10"
          />
          <i class="fas fa-search absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-xs pointer-events-none"></i>

          <!-- Suggestions dropdown -->
          <Transition name="dropdown">
            <ul
              v-if="showSuggestions && filteredNeighborhoods.length"
              class="suggestions-list absolute z-50 top-[calc(100%+4px)] left-0 right-0 bg-card border border-border rounded-2xl shadow-xl overflow-hidden max-h-52 overflow-y-auto"
            >
              <li
                v-for="(n, idx) in filteredNeighborhoods"
                :key="n"
                @mousedown.prevent="selectNeighborhood(n)"
                :class="[
                  'px-4 py-2.5 text-sm cursor-pointer transition-colors flex items-center gap-2',
                  idx === highlightedIndex
                    ? 'bg-secondary text-secondary-foreground'
                    : 'hover:bg-muted/30 text-foreground'
                ]"
              >
                <i class="fas fa-map-marker-alt text-xs opacity-60"></i>
                <!-- Surlignage du texte saisi -->
                <span v-html="highlightMatch(n, location)"></span>
              </li>
            </ul>
          </Transition>
        </div>

        <!-- Badge nb quartiers disponibles -->
        <p v-if="city && suggestionsForCity.length" class="text-[10px] text-muted-foreground mt-1 ml-2">
          <i class="fas fa-info-circle text-secondary/50 mr-1"></i>
          {{ suggestionsForCity.length }} quartiers disponibles pour {{ city }}
        </p>
      </div>

    </div>

    <!-- 📍 Adresse précise (optionnelle) -->
    <div v-if="showAddress">
      <label :for="addressId" class="block text-[10px] text-muted-foreground font-bold uppercase mb-2 ml-2">
        <i class="fas fa-road text-secondary mr-1"></i>Adresse précise
        <span class="text-muted-foreground font-normal normal-case">(optionnel)</span>
      </label>
      <input
        :id="addressId"
        :value="address"
        @input="$emit('update:address', $event.target.value)"
        type="text"
        placeholder="Ex: Rue de l'Ambassade, face Pharmacie du coin"
        class="w-full px-5 py-4 bg-muted/20 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-secondary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground"
      />
    </div>

  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

// ── Props & Emits ─────────────────────────────────────────────────────
const props = defineProps({
  city:        { type: String, default: '' },
  location:    { type: String, default: '' },
  address:     { type: String, default: '' },
  showAddress: { type: Boolean, default: false },
  cityId:      { type: String, default: 'city-select' },
  neighborhoodId: { type: String, default: 'neighborhood-input' },
  addressId:   { type: String, default: 'address-input' },
});

const emit = defineEmits(['update:city', 'update:location', 'update:address']);

// ── Données : villes & quartiers du Cameroun ──────────────────────────
const CAMEROON_DATA = {
  'Centre': [
    {
      name: 'Yaoundé',
      neighborhoods: [
        'Bastos', 'Nlongkak', 'Melen', 'Biyem-Assi', 'Mvog-Ada', 'Essos',
        'Omnisport', 'Ngousso', 'Ekoumdoum', 'Emana', 'Obili', 'Mfandena',
        'Nkolbisson', 'Mendong', 'Mvog-Betsi', 'Etoudi', 'Tsinga',
        'Briqueterie', 'Mokolo', 'Mimboman', 'Nkol-Eton', 'Simbock',
        'Odza', 'Nkolafeme', 'Metta', 'Ahala', 'Nkomo', 'Ngoa-Ekélé',
        'Mvog-Mbi', 'Nsimeyong', 'Cité Verte', 'Djoungolo', 'Efoulan',
        'Kondengui', 'Titi-Garage', 'Ekié', 'Nkoldongo',
        'Nkol-Mbong', 'Santa Barbara', 'Awae', 'Mbankolo',
      ],
    },
    { name: 'Mbalmayo', neighborhoods: ['Centre', 'Nkol-Bogo', 'Akono'] },
    { name: 'Bafia',    neighborhoods: ['Centre', 'Bokito'] },
    { name: 'Nanga Eboko', neighborhoods: ['Centre'] },
  ],
  'Littoral': [
    {
      name: 'Douala',
      neighborhoods: [
        'Akwa', 'Bonanjo', 'Bali', 'Bonapriso', 'Deido', 'New Bell',
        'Ndokotti', 'Logbaba', 'Makepe', 'PK8', 'PK10', 'PK12', 'PK14',
        'Kotto', 'Yassa', 'Bonaberi', 'Bonamoussadi', 'Ndogbong', 'Bépanda',
        'Nyalla', 'Cité des Palmiers', 'Mboppi', 'Ndog-Passi', 'Denver',
        'Village', 'Cité SIC', 'Ndongué', 'Ange Raphaël', 'Fiido',
        'Bilongué', 'Kwa-Kwa', 'Mbanga Bakoko', 'Sodiko', 'Oyomabang',
        'Ndog-Bong', 'Nettoyage', 'SONEL', 'Ndokombé', 'Ndog-Passi I',
        'Ndog-Passi II', 'Ndog-Passi III', 'Bonamouang', 'Ngangué',
      ],
    },
    { name: 'Nkongsamba', neighborhoods: ['Centre', 'Baré Bakem', 'Melong'] },
    { name: 'Edéa',       neighborhoods: ['Centre', 'Mbanga'] },
    { name: 'Loum',       neighborhoods: ['Centre', 'Melong'] },
  ],
  'Ouest': [
    {
      name: 'Bafoussam',
      neighborhoods: [
        'Banengo', 'Djeleng', 'Kamkop', 'Tamdja', 'Tougang', 'Ngouache',
        'Nylon', 'Famla', 'Mbankeu', 'Cowbell', 'Fonkouankem', 'Marché A',
        'Marché B', 'Kilomètre 5', 'Nitoukou', 'Toulao', 'Bandjoun',
      ],
    },
    { name: 'Dschang',   neighborhoods: ['Dschang Ville', 'Fongang', 'Toutsang'] },
    { name: 'Mbouda',    neighborhoods: ['Centre', 'Bamendou'] },
    { name: 'Foumban',   neighborhoods: ['Centre', 'Njimom'] },
    { name: 'Bangangté', neighborhoods: ['Centre', 'Bangoulap'] },
  ],
  'Nord-Ouest': [
    {
      name: 'Bamenda',
      neighborhoods: [
        'Commercial Avenue', 'Up Station', 'Nkwen', 'Mile 4', 'Mile 6',
        'Old Town', 'Ntarikon', 'Cowbell', 'Mankon', 'Nkwen Hospital',
        'Mbengwi Road', 'City Chemist', 'Mendankwe', 'Bamendankwe',
      ],
    },
    { name: 'Kumbo',    neighborhoods: ['Centre', 'Tobin', 'Mbinon'] },
    { name: 'Wum',      neighborhoods: ['Centre'] },
    { name: 'Ndop',     neighborhoods: ['Centre', 'Babessi'] },
  ],
  'Sud-Ouest': [
    {
      name: 'Buea',
      neighborhoods: [
        'Molyko', 'Bonduma', 'Mile 17', 'Great Soppo', 'Bokwango',
        'Muea', 'Clerks Quarter', 'Government Residential Area',
        'Small Soppo', 'Sandpit', 'Wokoko',
      ],
    },
    { name: 'Limbe',    neighborhoods: ['Down Beach', 'New Town', 'Bota', 'Lumpsum'] },
    { name: 'Kumba',    neighborhoods: ['Fiango', 'Mbonge Road', 'Missellele', 'Barracks'] },
    { name: 'Mamfe',    neighborhoods: ['Centre', 'Tali'] },
  ],
  'Nord': [
    {
      name: 'Garoua',
      neighborhoods: [
        'Yelwa', 'Bibemi', 'Pitoa', 'Mayo Figuil', 'Riao', 'Bocklé',
        'Ngong', 'Ouro Labbo', 'Mission', 'Lopéré', 'Marché Central',
      ],
    },
    { name: 'Guider',   neighborhoods: ['Centre', 'Lam'] },
    { name: 'Figuil',   neighborhoods: ['Centre'] },
  ],
  'Adamaoua': [
    {
      name: 'Ngaoundéré',
      neighborhoods: [
        'Joli Soir', 'Bini', 'Dang', 'Gadamayo', 'Mbandjock', 'Bidim',
        'Maoutel', 'Sabongari', 'Marché Central', 'Bamnyanga',
      ],
    },
    { name: 'Meiganga', neighborhoods: ['Centre', 'Djamboutou'] },
    { name: 'Tibati',   neighborhoods: ['Centre'] },
  ],
  'Extrême-Nord': [
    {
      name: 'Maroua',
      neighborhoods: [
        'Djarengol', 'Kongola', 'Domayo', 'Palar', 'Doualaré',
        'Kakataré', 'Lopéré', 'Makabaye', 'Meskine', 'Papata',
      ],
    },
    { name: 'Kousseri', neighborhoods: ['Centre', 'Maltam'] },
    { name: 'Mora',     neighborhoods: ['Centre'] },
    { name: 'Yagoua',   neighborhoods: ['Centre', 'Vele'] },
  ],
  'Est': [
    {
      name: 'Bertoua',
      neighborhoods: [
        'Centre Ville', 'Haoussa', 'Mokolo', 'Bonis', 'Atok', 'Ndjambé',
        'Mbaya', 'Nguelemendouka',
      ],
    },
    { name: 'Abong-Mbang', neighborhoods: ['Centre'] },
    { name: 'Batouri',     neighborhoods: ['Centre', 'Nguélémendouka'] },
  ],
  'Sud': [
    {
      name: 'Ebolowa',
      neighborhoods: ['Centre', 'Angalé', 'Nkoemvone', 'Nkong-Zem'],
    },
    {
      name: 'Kribi',
      neighborhoods: ['Centre', 'Grand Batanga', 'Petit Batanga', 'Afan Mabe', 'Lolabé'],
    },
    { name: 'Sangmélima', neighborhoods: ['Centre', 'Bulu'] },
    { name: 'Ambam',      neighborhoods: ['Centre', 'Ma\'an'] },
  ],
};

// ── État local ────────────────────────────────────────────────────────
const neighborhoodInput  = ref(null);
const showSuggestions    = ref(false);
const highlightedIndex   = ref(-1);

// ── Computed ──────────────────────────────────────────────────────────
const suggestionsForCity = computed(() => {
  if (!props.city) return [];
  for (const cities of Object.values(CAMEROON_DATA)) {
    const found = cities.find(c => c.name === props.city);
    if (found) return found.neighborhoods;
  }
  return [];
});

const filteredNeighborhoods = computed(() => {
  const q = (props.location || '').trim().toLowerCase();
  if (!q) return suggestionsForCity.value.slice(0, 8);
  return suggestionsForCity.value.filter(n =>
    n.toLowerCase().includes(q)
  ).slice(0, 10);
});

// ── Handlers ──────────────────────────────────────────────────────────
function onCityChange(val) {
  emit('update:city', val);
  emit('update:location', '');   // Reset quartier
  highlightedIndex.value = -1;
  showSuggestions.value = false;
}

function onNeighborhoodInput(val) {
  emit('update:location', val);
  highlightedIndex.value = -1;
  showSuggestions.value = filteredNeighborhoods.value.length > 0;
}

function selectNeighborhood(n) {
  emit('update:location', n);
  showSuggestions.value = false;
  highlightedIndex.value = -1;
}

function hideSuggestions() {
  setTimeout(() => { showSuggestions.value = false; }, 150);
}

function highlightNext() {
  if (!showSuggestions.value) { showSuggestions.value = true; return; }
  highlightedIndex.value = Math.min(highlightedIndex.value + 1, filteredNeighborhoods.value.length - 1);
}

function highlightPrev() {
  highlightedIndex.value = Math.max(highlightedIndex.value - 1, -1);
}

function selectHighlighted() {
  if (highlightedIndex.value >= 0 && filteredNeighborhoods.value[highlightedIndex.value]) {
    selectNeighborhood(filteredNeighborhoods.value[highlightedIndex.value]);
  }
}

// ── Highlight texte saisi dans les suggestions ────────────────────────
function highlightMatch(text, query) {
  if (!query) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return text.replace(new RegExp(`(${escaped})`, 'gi'), '<mark class="bg-secondary/20 text-secondary font-bold rounded px-0.5">$1</mark>');
}

// Reset highlight si les suggestions changent
watch(filteredNeighborhoods, () => { highlightedIndex.value = -1; });
</script>

<style scoped>
/* Animation dropdown */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

/* Scrollbar suggestions */
.suggestions-list::-webkit-scrollbar {
  width: 4px;
}
.suggestions-list::-webkit-scrollbar-thumb {
  background: hsl(var(--secondary) / 0.4);
  border-radius: 4px;
}

/* Fix select appearance */
select.appearance-none {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
</style>
