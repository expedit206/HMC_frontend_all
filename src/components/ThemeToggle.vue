<template>
  <button
    @click="toggleDarkMode"
    class="relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
    :class="isDarkMode ? 'bg-primary' : 'bg-muted'"
    :aria-label="isDarkMode ? 'Passer en mode clair' : 'Passer en mode sombre'"
    :title="isDarkMode ? 'Mode clair' : 'Mode sombre'"
  >
    <!-- Le cercle coulissant avec les icônes -->
    <div
      class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md flex items-center justify-center transition-transform duration-300"
      :class="isDarkMode ? 'translate-x-6' : 'translate-x-0'"
    >
      <!-- Icône soleil (visible en mode clair) -->
      <i 
        class="fas fa-sun text-xs absolute transition-all duration-300"
        :class="isDarkMode ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'"
        :style="{ color: isDarkMode ? 'transparent' : '#f59e0b' }"
      ></i>
      
      <!-- Icône lune (visible en mode sombre) -->
      <i 
        class="fas fa-moon text-xs absolute transition-all duration-300"
        :class="isDarkMode ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'"
        :style="{ color: isDarkMode ? '#6366f1' : 'transparent' }"
      ></i>
    </div>
  </button>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isDarkMode = ref(false)

// Appliquer le thème
const applyTheme = (dark) => {
  if (dark) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

// Basculer le thème
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  applyTheme(isDarkMode.value)
  localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light')
}

// Initialisation
onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  
  if (savedTheme === 'dark') {
    isDarkMode.value = true
  } else if (savedTheme === 'light') {
    isDarkMode.value = false
  } else {
    isDarkMode.value = prefersDark
  }
  
  applyTheme(isDarkMode.value)
  
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  const handleSystemThemeChange = (e) => {
    if (!localStorage.getItem('theme')) {
      isDarkMode.value = e.matches
      applyTheme(e.matches)
    }
  }
  
  mediaQuery.addEventListener('change', handleSystemThemeChange)
  return () => mediaQuery.removeEventListener('change', handleSystemThemeChange)
})
</script>