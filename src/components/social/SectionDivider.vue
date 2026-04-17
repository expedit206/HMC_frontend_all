<template>
  <div class="flex items-center gap-3 my-2 px-4">
    <div class="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
         :style="`background: linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%);`">
      <i :class="`fas ${item.icon} text-white text-xs`"></i>
    </div>
    <div class="flex flex-1 items-center gap-3">
      <span class="text-sm font-bold text-foreground whitespace-nowrap">{{ item.label }}</span>
      <div class="flex-1 h-px bg-border"></div>
    </div>
    <RouterLink v-if="item.link"
      :to="item.link"
      class="text-xs font-semibold whitespace-nowrap px-3 py-1 rounded-full border border-border text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 flex-shrink-0">
      {{ item.link_label }}
    </RouterLink>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  item: {
    type: Object,
    required: true,
  },
})
</script>
