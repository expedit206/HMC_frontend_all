<template>
  <div class="card hover:shadow-lg transition-shadow duration-300 cursor-pointer hover:border-ring">
    <div class="text-4xl mb-4">{{ icon }}</div>
    <h3 class="text-xl font-bold text-primary mb-2">{{ title }}</h3>
    <p class="text-foreground/70">{{ description }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  description: String,
  icon: String
})
</script>
