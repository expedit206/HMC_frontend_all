<template>
  <div class="property-map-wrapper">

    <!-- Zone carte + overlays (position relative ensemble) -->
    <div class="map-zone" :style="{ height: height }">
      <!-- Conteneur Leaflet -->
      <div ref="mapContainer" class="map-container rounded-xl overflow-hidden border border-border"></div>

      <!-- Overlay chargement -->
      <div
        v-if="isGeocoding"
        class="map-overlay rounded-xl bg-background/80 backdrop-blur-sm"
      >
        <i class="fas fa-circle-notch fa-spin text-secondary text-2xl mb-2"></i>
        <p class="text-xs text-muted-foreground">Chargement de la carte...</p>
      </div>

      <!-- Overlay erreur géocodage (fallback) -->
      <div
        v-else-if="geocodeError"
        class="map-overlay rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-900/20 border border-green-200/50 dark:border-green-800/30"
      >
        <div class="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-3">
          <i class="fas fa-map-marker-alt text-secondary text-xl"></i>
        </div>
        <p class="text-sm font-semibold text-foreground">{{ city }}<span v-if="region">, {{ region }}</span></p>
        <p class="text-xs text-muted-foreground mt-1">Zone approximative</p>
      </div>
    </div>

    <!-- Informations d'adresse -->
    <div class="mt-3 flex items-start gap-2">
      <div class="w-5 h-5 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 mt-0.5">
        <i class="fas fa-map-marker-alt text-secondary" style="font-size: 9px;"></i>
      </div>
      <div class="min-w-0">
        <p class="text-sm text-foreground font-medium leading-tight">
          {{ city }}<span v-if="region" class="text-muted-foreground font-normal">, {{ region }}</span>
        </p>
        <p v-if="address" class="text-xs text-muted-foreground mt-0.5 line-clamp-2">{{ address }}</p>
      </div>
    </div>

    <!-- Bouton Google Maps (visible uniquement si géocodage réussi) -->
    <a
      v-if="coords"
      :href="`https://www.google.com/maps?q=${coords[0]},${coords[1]}`"
      target="_blank"
      rel="noopener noreferrer"
      class="mt-3 w-full flex items-center justify-center gap-2 py-2 px-4 text-xs font-semibold text-secondary border border-secondary/30 rounded-lg hover:bg-secondary/5 transition-colors"
    >
      <i class="fas fa-external-link-alt"></i>
      Ouvrir dans Google Maps
    </a>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// ── Fix icônes Leaflet + Vite ─────────────────────────────────────────
// Leaflet cherche les icônes via _getIconUrl qui ne fonctionne pas avec Vite.
// On supprime ce comportement et on pointe directement vers le node_modules.
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

// ── Props ─────────────────────────────────────────────────────────────
const props = defineProps({
  city:    { type: String, default: '' },
  region:  { type: String, default: '' },
  address: { type: String, default: '' },
  height:  { type: String, default: '220px' },
});

// ── État ──────────────────────────────────────────────────────────────
const mapContainer = ref(null);
const isGeocoding  = ref(true);
const geocodeError = ref(false);
const coords       = ref(null);

let mapInstance    = null;

// ── Icône marqueur personnalisée ──────────────────────────────────────
function createCustomIcon() {
  return L.divIcon({
    html: `<div class="custom-map-pin">
             <i class="fas fa-home"></i>
           </div>`,
    className: '',
    iconSize:    [38, 38],
    iconAnchor:  [19, 38],
    popupAnchor: [0, -40],
  });
}

// ── Géocodage Nominatim (gratuit, sans clé API) ───────────────────────
async function geocode() {
  const fullQuery = [props.address, props.city, props.region, 'Cameroun']
    .filter(Boolean)
    .join(', ');

  const tryFetch = async (q) => {
    const res  = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&limit=1`,
      { headers: { 'Accept-Language': 'fr' } }
    );
    const data = await res.json();
    return data?.length > 0 ? [parseFloat(data[0].lat), parseFloat(data[0].lon)] : null;
  };

  try {
    return (
      (await tryFetch(fullQuery)) ||
      (await tryFetch(`${props.city}, Cameroun`)) ||
      null
    );
  } catch {
    return null;
  }
}

// ── Initialisation Leaflet ────────────────────────────────────────────
function initMap(lat, lng) {
  if (!mapContainer.value) return;

  mapInstance = L.map(mapContainer.value, {
    center:             [lat, lng],
    zoom:               15,
    zoomControl:        true,
    scrollWheelZoom:    false,
    attributionControl: true,
  });

  // Tuiles OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
    maxZoom: 19,
  }).addTo(mapInstance);

  // Cercle de zone approximative
  L.circle([lat, lng], {
    radius:      150,
    color:       'hsl(var(--secondary))',
    fillColor:   'hsl(var(--secondary))',
    fillOpacity: 0.12,
    weight:      2,
    dashArray:   '4 4',
  }).addTo(mapInstance);

  // Marqueur
  L.marker([lat, lng], { icon: createCustomIcon() })
    .addTo(mapInstance)
    .bindPopup(
      `<div style="font-family:sans-serif;padding:2px 4px;min-width:110px">
        <strong style="font-size:13px;color:#1a1a1a">${props.city}</strong><br/>
        <span style="font-size:11px;color:#666">${props.address || props.region || ''}</span>
      </div>`,
      { offset: [0, -35] }
    );
}

// ── Chargement principal ──────────────────────────────────────────────
async function loadMap() {
  isGeocoding.value  = true;
  geocodeError.value = false;

  const result = await geocode();

  await nextTick();
  isGeocoding.value = false;

  if (result) {
    coords.value = result;
    initMap(result[0], result[1]);
  } else {
    geocodeError.value = true;
  }
}

// ── Lifecycle ─────────────────────────────────────────────────────────
onMounted(() => loadMap());

onUnmounted(() => {
  if (mapInstance) { mapInstance.remove(); mapInstance = null; }
});

// Recharge quand la propriété change (navigation SPA)
watch(() => props.city, (newVal, oldVal) => {
  if (newVal && newVal !== oldVal) {
    if (mapInstance) { mapInstance.remove(); mapInstance = null; }
    loadMap();
  }
});
</script>

<style scoped>
/* ── Wrapper global ── */
.property-map-wrapper {
  position: relative;
}

/* ── Zone carte (position relative pour les overlays) ── */
.map-zone {
  position: relative;
  width: 100%;
}

/* ── Conteneur Leaflet ── */
.map-container {
  width: 100%;
  height: 100%;
  z-index: 0;
}

/* ── Overlays (centrage absolu sur la zone carte) ── */
.map-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

/* ── Marqueur personnalisé ── */
:deep(.custom-map-pin) {
  width: 38px;
  height: 38px;
  background: hsl(var(--secondary));
  border-radius: 50% 50% 50% 0;
  transform: rotate(-45deg);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);
  border: 3px solid white;
}

:deep(.custom-map-pin .fas) {
  transform: rotate(45deg);
  color: white;
  font-size: 15px;
  line-height: 1;
}

/* ── Overrides Leaflet ── */
:deep(.leaflet-container) {
  background: hsl(var(--muted));
  font-family: inherit;
}

:deep(.leaflet-popup-content-wrapper) {
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  padding: 0;
}

:deep(.leaflet-popup-content) {
  margin: 10px 14px;
}

:deep(.leaflet-control-attribution) {
  font-size: 10px !important;
  opacity: 0.7;
}
</style>
