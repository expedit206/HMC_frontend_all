<template>
  <div class="card p-4">
    <div :class="`h-24 rounded-lg shadow-md mb-3 bg-${color}`" />
    <h4 class="font-semibold text-foreground mb-1">{{ label }}</h4>
    <p class="text-sm text-muted-foreground font-mono">{{ value }}</p>
  </div>
</template>

<script setup>
defineProps({
  color: String,
  label: String,
  value: String
})
</script>

<style scoped>
.bg-primary {
  background-color: #180d34;
}

.bg-secondary {
  background-color: #961e11;
}

.bg-accent {
  background-color: #f09f84;
}

.bg-destructive {
  background-color: #bd0514;
}

.bg-card {
  background-color: #ffffff;
  border: 1px solid #d4d4d4;
}

.bg-muted {
  background-color: #f09f84;
}

.bg-border {
  background-color: #d4d4d4;
}

.bg-input {
  background-color: #e6e6e6;
}

:deep(.dark .bg-card) {
  background-color: #19191a;
  border-color: #2b2b2b;
}
</style>
