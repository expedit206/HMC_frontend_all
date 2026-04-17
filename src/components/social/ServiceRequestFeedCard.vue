<template>
  <article class="bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all duration-300 mx-4 my-2 p-4 flex flex-col gap-3 group relative overflow-hidden">
    <!-- Décoration urgence -->
    <div v-if="urgencyColor" :class="`absolute top-0 left-0 w-1 h-full ${urgencyColor}`"></div>

    <div class="flex items-start justify-between gap-3 relative z-10">
      <!-- Avatar Client -->
      <div class="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0 overflow-hidden border border-border shadow-sm">
        <img v-if="item.client_avatar" :src="avatarUrl" alt="Avatar" class="w-full h-full object-cover">
        <span v-else class="text-xs font-bold text-muted-foreground">{{ initials }}</span>
      </div>

      <!-- Info Meta -->
      <div class="flex-1 min-w-0">
        <div class="flex items-center justify-between mb-0.5">
          <h4 class="text-sm font-bold text-foreground truncate">{{ item.client_name }}</h4>
          <span class="text-xs text-muted-foreground whitespace-nowrap">{{ item.date }}</span>
        </div>
        <div class="flex items-center gap-1 text-xs text-muted-foreground">
          <span class="inline-flex items-center justify-center w-4 h-4 rounded bg-primary/10 text-primary mr-1">
            <i :class="item.category_icon || 'fas fa-tools' + ' text-[8px]'"></i>
          </span>
          <span class="font-medium text-foreground">{{ item.category }}</span>
          <span class="mx-1.5 opacity-50">•</span>
          <i class="fas fa-map-marker-alt text-[10px]"></i>
          <span class="truncate">{{ item.city }}</span>
        </div>
      </div>
    </div>

    <!-- Contenu Demande -->
    <div class="mt-1 relative z-10">
      <h3 class="font-bold text-base text-foreground leading-tight mb-2 group-hover:text-primary transition-colors">
        {{ item.title }}
      </h3>
      <p class="text-sm text-card-foreground/80 line-clamp-2 leading-relaxed">
        {{ item.description }}
      </p>
    </div>

    <!-- Tags / Budget -->
    <div class="flex items-center gap-2 mt-1 flex-wrap relative z-10">
      <span class="px-2 py-1 bg-muted rounded-full text-xs font-medium text-muted-foreground flex items-center gap-1 border border-border/50">
        <i class="fas fa-wallet text-[10px]"></i>
        <span v-if="item.min_budget || item.max_budget">
          {{ formatBudget(item.min_budget, item.max_budget) }}
        </span>
        <span v-else>Budget à débattre</span>
      </span>

      <span v-if="item.urgency" :class="`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${urgencyBadgeClass}`">
        <i :class="urgencyIcon + ' text-[10px]'"></i>
        {{ urgencyText }}
      </span>
    </div>

    <!-- Actions -->
    <div class="flex items-center justify-between mt-2 pt-3 border-t border-border relative z-10">
      <div class="flex items-center gap-2">
        <div class="flex -space-x-2 mr-1" v-if="item.responses_count > 0">
          <div v-for="i in Math.min(3, item.responses_count)" :key="i" class="w-6 h-6 rounded-full bg-secondary/80 border-2 border-card flex items-center justify-center text-white text-[8px] z-20">
            <i class="fas fa-user"></i>
          </div>
        </div>
        <span class="text-xs text-muted-foreground font-medium">
          {{ item.responses_count > 0 ? `${item.responses_count} propositions` : 'Soyez le premier à répondre' }}
        </span>
      </div>

      <RouterLink :to="`/marketplace/demandes/${item.id}`"
        class="inline-flex items-center justify-center rounded-lg px-3 py-1.5 text-xs font-bold transition-colors bg-secondary/10 text-secondary hover:bg-secondary hover:text-white border border-transparent hover:border-secondary shadow-sm">
        Proposer mes services
      </RouterLink>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  item: { type: Object, required: true },
})

const initials = computed(() => {
  if (!props.item.client_name) return '?'
  return props.item.client_name.substring(0, 2).toUpperCase()
})

const avatarUrl = computed(() => {
  if (!props.item.client_avatar) return null
  const img = props.item.client_avatar
  if (img.startsWith('http')) return img
  return `${import.meta.env.VITE_API_BASE_URL?.replace('/api', '') ?? ''}/storage/${img}`
})

const urgencyColor = computed(() => {
  switch (props.item.urgency) {
    case 'high': return 'bg-red-500'
    case 'medium': return 'bg-orange-400'
    case 'low': return 'bg-blue-400'
    default: return ''
  }
})

const urgencyBadgeClass = computed(() => {
  switch (props.item.urgency) {
    case 'high': return 'bg-red-500/10 text-red-600 border border-red-500/20'
    case 'medium': return 'bg-orange-400/10 text-orange-600 border border-orange-400/20'
    case 'low': return 'bg-blue-400/10 text-blue-600 border border-blue-400/20'
    default: return ''
  }
})

const urgencyIcon = computed(() => {
  switch (props.item.urgency) {
    case 'high': return 'fas fa-exclamation-circle'
    case 'medium': return 'fas fa-clock'
    case 'low': return 'fas fa-calendar-alt'
    default: return 'fas fa-info-circle'
  }
})

const urgencyText = computed(() => {
  switch (props.item.urgency) {
    case 'high': return 'Urgent'
    case 'medium': return 'Dès que possible'
    case 'low': return 'Flexible'
    default: return 'Normal'
  }
})

function formatBudget(min, max) {
  const fmt = new Intl.NumberFormat('fr-FR')
  if (min && max) return `${fmt.format(min)} - ${fmt.format(max)} FCFA`
  if (min) return `Min. ${fmt.format(min)} FCFA`
  if (max) return `Max. ${fmt.format(max)} FCFA`
  return ''
}
</script>
