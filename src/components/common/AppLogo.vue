<template>
  <div v-if="withText" class="flex items-center gap-1 group">
    <img 
      src="/images/logo/image.png" 
      alt="Home Cameroon Logo" 
      class="object-contain"
      :class="imageClass"
    />
    <div class="flex items-center leading-tight" :class="textClass">
      <span class="font-bold tracking-tight" :class="primaryColorClass">Home</span>
      <span class="font-bold" :class="secondaryColorClass">Cameroon</span>
    </div>
  </div>
  <img 
    v-else 
    src="/images/logo/image.png" 
    alt="Home Cameroon Logo" 
    class="object-contain"
  />
</template>

<script setup>
defineProps({
  withText: {
    type: Boolean,
    default: false
  },
  imageClass: {
    type: String,
    default: "w-10 h-10 sm:w-12 sm:h-12 dark:bg-accent-foreground/25 dark:rounded transition-transform group-hover:scale-105"
  },
  textClass: {
    type: String,
    default: "sm:text-xl"
  },
  primaryColorClass: {
    type: String,
    default: "text-primary"
  },
  secondaryColorClass: {
    type: String,
    default: "text-secondary"
  }
});
</script>
