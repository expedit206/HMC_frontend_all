<template>
  <!-- ============================================================ -->
  <!-- SKELETON LOADER — choisir le type via la prop `type`         -->
  <!-- types: category | property | agent | service | product       -->
  <!-- ============================================================ -->

  <!-- CATEGORIES -->
  <div
    v-if="type === 'category'"
    class="skeleton-category flex items-center gap-3 bg-card rounded-[.45rem] px-5 py-3 shadow-sm border border-border flex-shrink-0 min-w-[200px]"
  >
    <div class="sk w-10 h-10 rounded-[.45rem]"></div>
    <div class="space-y-2 flex-1">
      <div class="sk h-3 w-24 rounded"></div>
      <div class="sk h-2 w-16 rounded"></div>
    </div>
  </div>

  <!-- PROPERTY CARD -->
  <div
    v-else-if="type === 'property'"
    class="bg-card rounded-[.45rem] overflow-hidden shadow-sm border border-border"
  >
    <div class="sk h-32 w-full rounded-none"></div>
    <div class="p-2 space-y-2">
      <div class="sk h-3 w-3/4 rounded"></div>
      <div class="sk h-3 w-1/2 rounded"></div>
      <div class="sk h-2 w-2/3 rounded"></div>
      <div class="flex gap-3 py-1">
        <div class="sk h-2 w-10 rounded"></div>
        <div class="sk h-2 w-10 rounded"></div>
        <div class="sk h-2 w-10 rounded"></div>
      </div>
      <div class="sk h-6 w-full rounded-[.45rem]"></div>
    </div>
  </div>

  <!-- AGENT CARD -->
  <div
    v-else-if="type === 'agent'"
    class="rounded-[.45rem] shadow border border-border overflow-hidden h-full flex flex-col"
  >
    <div class="sk h-48 w-full rounded-none"></div>
    <div class="p-3 space-y-3 flex-1">
      <div class="sk h-4 w-2/3 rounded"></div>
      <div class="flex gap-2">
        <div class="sk h-5 w-20 rounded-full"></div>
        <div class="sk h-5 w-16 rounded-full"></div>
      </div>
      <div class="sk h-2 w-full rounded"></div>
      <div class="sk h-2 w-5/6 rounded"></div>
      <div class="flex gap-2 py-2 border-y border-border">
        <div class="flex-1 space-y-1">
          <div class="sk h-3 w-8 rounded"></div>
          <div class="sk h-2 w-14 rounded"></div>
        </div>
        <div class="flex-1 space-y-1">
          <div class="sk h-3 w-8 rounded"></div>
          <div class="sk h-2 w-14 rounded"></div>
        </div>
      </div>
      <div class="sk h-8 w-full rounded-[.45rem]"></div>
    </div>
  </div>

  <!-- SERVICE CARD -->
  <div
    v-else-if="type === 'service'"
    class="bg-card rounded-[.45rem] shadow-sm border border-border overflow-hidden"
  >
    <div class="p-5 space-y-3">
      <div class="flex items-start gap-3">
        <div class="sk w-12 h-12 rounded-[.45rem] shrink-0"></div>
        <div class="space-y-2 flex-1">
          <div class="sk h-4 w-3/4 rounded"></div>
          <div class="sk h-3 w-1/2 rounded"></div>
        </div>
      </div>
      <div class="sk h-2 w-full rounded"></div>
      <div class="sk h-2 w-4/5 rounded"></div>
      <div class="flex gap-2">
        <div class="sk h-5 w-14 rounded"></div>
        <div class="sk h-5 w-14 rounded"></div>
      </div>
      <div class="sk h-8 w-full rounded-[.45rem]"></div>
    </div>
  </div>

  <!-- PRODUCT CARD -->
  <div
    v-else-if="type === 'product'"
    class="bg-card rounded-[.45rem] shadow-sm border border-border overflow-hidden"
  >
    <div class="sk h-32 w-full rounded-none"></div>
    <div class="p-3 space-y-2">
      <div class="sk h-3 w-3/4 rounded"></div>
      <div class="sk h-2 w-full rounded"></div>
      <div class="flex items-center justify-between">
        <div class="sk h-4 w-16 rounded"></div>
        <div class="sk w-7 h-7 rounded-full"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: "property",
  },
});
</script>

<style scoped>
/* Element squelette de base */
.sk {
  background: linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%);
  background-size: 200% 100%;
  animation: shimmer 1.6s ease-in-out infinite;
  border-radius: 0.25rem;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
