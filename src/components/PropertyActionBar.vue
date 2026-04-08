<template>
  <!-- 
    Barre d'actions TikTok-style : verticale, superposée sur l'image du bien
    Props:
      - property: l'objet bien (doit avoir: id, slug, type, city, rooms, price, area, favorites_count, review_count)
      - isFav: boolean indiquant si le bien est en favori (géré par le parent)
      - btnSize: 'sm' (w-8 h-8) ou 'md' (w-10 h-10), défaut 'md'
      - position: classe CSS de positionnement (défaut: 'absolute right-3 bottom-4')
    Emits:
      - toggle-favorite: l'utilisateur a cliqué sur le cœur
      - share: l'utilisateur veut partager
  -->
  <div :class="[position, 'flex flex-col md:gap-1 items-center z-20']">

    <!-- ❤️ Favoris -->
    <button @click.prevent="$emit('toggle-favorite', property.id)"
      class="flex flex-col  justify-center focus:outline-none">
      <div :class="btnClass('')">
        <i :class="[isFav ? 'fas text-red-400' : 'far ', iconSize, 'fa-heart ont-black drop-shadow-[2px_0px_2px_rgba(0,0,0,1)] drop-shadow-[0_0_2px_rgba(0,0,0,1)]']"></i>
      </div>

        <span :class="labelClass">{{ property.favorites_count || 0 }}</span>
    </button>

    <!-- 💬 Avis / Commentaires -->
    <RouterLink :to="`/annonces/${property.slug}#reviews`"
      class="flex flex-col justify-center  focus:outline-none">
      <div :class="btnClass('')">
        <i :class="[iconSize, 'fas fa-comment-dots ont-black drop-shadow-[2px_0px_2px_rgba(0,0,0,1)] drop-shadow-[0_0_2px_rgba(0,0,0,1)]']"></i>
      </div>
      <span :class="labelClass">{{ property.review_count || 0 }}</span>
    </RouterLink>

    <!-- ➦ Partager -->
    <button @click.prevent="$emit('share', property)"
      class="flex flex-col justify-center  focus:outline-none">
      <div :class="btnClass('')">
        <i :class="[iconSize, 'fas fa-share pr-[1px] ont-black drop-shadow-[2px_0px_2px_rgba(0,0,0,1)] drop-shadow-[0_0_2px_rgba(0,0,0,1)]' ]"></i>
      </div>
      <span :class="labelClass">{{ property.shares_count || 0 }}</span>
    </button>

    <!-- ⋮ Menu options -->
    <div class="relative mt-3 flex justify-center ">
      <button @click.prevent="toggleMenu"
        :class="[sizeClass, 'flex items-center justify-center text-white   transition-all  focus:outline-none  cursor-pointer px-2 py-2 ']">
        <i :class="[iconSize, 'fas fa-ellipsis-v font-black drop-shadow-[2px_0px_2px_rgba(0,0,0,1)] drop-shadow-[0_0_2px_rgba(0,0,0,1)] '] "></i>
      </button>

      <!-- Backdrop -->
      <div v-if="menuOpen" @click.prevent.stop="menuOpen = false" class="fixed inset-0 z-30"></div>

      <!-- Dropdown -->
      <div v-if="menuOpen"
        class="absolute right-full mr-2 bottom-0 w-48 bg-card border border-border shadow-xl rounded-md overflow-hidden py-1 z-40 space-y-2">

        <!-- Biens similaires (logique intelligente) -->
        <RouterLink
          :to="{ path: '/annonces', query: similarQuery }"
          @click="menuOpen = false"
          class="w-full text-left px-2 py-1 hover:bg-muted text-xs text-foreground flex items-center gap-2 transition-colors">
          <i class="fas fa-clone text-muted-foreground w-3"></i>
          Biens similaires
        </RouterLink>


        <!-- Masquer -->
        <button @click.prevent="handleHide"
          class="w-full text-left px-2 py-1 hover:bg-muted text-xs text-foreground flex items-center gap-2 transition-colors">
          <i class="fas fa-eye-slash text-muted-foreground w-3"></i>
          je n'aime pas
          
        </button>

        <!-- Signaler -->
        <button @click.prevent="handleReport"
          class="w-full text-left px-2 py-1 hover:bg-red-50 dark:hover:bg-red-900/20 text-xs text-destructive flex items-center gap-2 transition-colors">
          <i class="fas fa-flag w-3"></i>
          Signaler l'arnaque
        </button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { RouterLink } from 'vue-router';

const props = defineProps({
  property: { type: Object, required: true },
  isFav: { type: Boolean, default: false },
  btnSize: { type: String, default: 'md' }, // 'sm' | 'md'
  position: { type: String, default: 'absolute right-3 bottom-4' },
});

const emit = defineEmits(['toggle-favorite', 'share']);

const menuOpen = ref(false);

const toggleMenu = () => { menuOpen.value = !menuOpen.value; };

// Computed sizes
const sizeClass = computed(() =>
  props.btnSize === 'sm' ? 'w-2 h-3' : 'w-6 h-4'
);
const iconSize = computed(() =>
  props.btnSize === 'sm' ? 'text-sm' : 'text-lg'
);
const labelClass = computed(() =>
  'text-[12px] text-white font-black drop-shadow-[2px_0px_2px_rgba(0,0,0,1)] drop-shadow-[0_0_2px_rgba(0,0,0,1)] transition-all text-center'
);

const btnClass = (hoverColor) => {
  return [
    sizeClass.value,
    'rounded-full flex justify-center items-center text-white transition-all ',
    hoverColor,
  ];
};

// Requête intelligente pour biens similaires
const similarQuery = computed(() => ({
  type: props.property.type,
  city: props.property.city,
  rooms: props.property.rooms,
  max_price: Math.floor((props.property.price || 0) * 1.5),
  min_area: Math.max(0, (props.property.area || 0) - 10),
}));

const handleHide = () => {
  menuOpen.value = false;
  alert('Cette annonce sera masquée de vos recommandations.');
};

const handleReport = () => {
  menuOpen.value = false;
  alert('Merci de votre signalement. Notre équipe va examiner ce bien.');
};
</script>
