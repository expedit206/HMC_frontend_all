<template>
  <footer class="border-t border-border mt-16">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <!-- Contenu principal du footer -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <!-- Colonne 1: Logo et description -->
        <div>
          <div class="text-2xl font-bold text-primary mb-4">
            Home<span class="text-secondary">Cameroon</span>
          </div>
          <p class="text-muted-foreground text-sm leading-relaxed">
            La plateforme n°1 pour trouver votre logement idéal au Cameroun.
            Studios, chambres, appartements, maisons et villas modernes à
            Yaoundé, Douala et partout au pays.
          </p>
        </div>

        <!-- Colonne 2: Liens rapides -->
        <div>
          <h3 class="text-primary text-lg font-semibold mb-6">Liens rapides</h3>
          <ul class="space-y-3">
            <li>
              <RouterLink
                :to="{ name: 'Accueil' }"
                class="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                Accueil
              </RouterLink>
            </li>
            <li>
              <RouterLink
                :to="{ name: 'Annonces' }"
                class="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                Catégories
              </RouterLink>
            </li>
            <li>
              <RouterLink
                :to="{ name: 'Annonces' }"
                class="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                Toutes les annonces
              </RouterLink>
            </li>
            <li>
              <RouterLink
                :to="{ name: 'Connexion' }"
                class="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                Publier une annonce
              </RouterLink>
            </li>
            <li>
              <a
                href="#"
                class="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                À propos
              </a>
            </li>
            <li>
              <a
                href="#"
                class="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        <!-- Colonne 3: Contact -->
        <div>
          <h3 class="text-primary text-lg font-semibold mb-6">Contact</h3>
          <div class="space-y-4">
            <div class="flex items-start gap-3">
              <i class="fas fa-phone text-primary mt-1"></i>
              <span class="text-muted-foreground">+237 6 99 99 99 99</span>
            </div>
            <div class="flex items-start gap-3">
              <i class="fas fa-envelope text-primary mt-1"></i>
              <span class="text-muted-foreground">contact@homecameroon.cm</span>
            </div>
            <div class="flex items-start gap-3">
              <i class="fas fa-map-marker-alt text-primary mt-1"></i>
              <span class="text-muted-foreground"
                >Yaoundé & Douala, Cameroun</span
              >
            </div>
          </div>
        </div>

        <!-- Colonne 4: Réseaux sociaux -->
        <div>
          <h3 class="text-primary text-lg font-semibold mb-6">Suivez-nous</h3>
          <div class="flex gap-4 mb-6">
            <a
              href="#"
              class="w-12 h-12 bg-sidebar rounded-full flex items-center justify-center text-sidebar-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 transform hover:-translate-y-1"
            >
              <i class="fab fa-facebook-f"></i>
            </a>
            <a
              href="#"
              class="w-12 h-12 bg-sidebar rounded-full flex items-center justify-center text-sidebar-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 transform hover:-translate-y-1"
            >
              <i class="fab fa-instagram"></i>
            </a>
            <a
              href="#"
              class="w-12 h-12 bg-sidebar rounded-full flex items-center justify-center text-sidebar-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 transform hover:-translate-y-1"
            >
              <i class="fab fa-linkedin-in"></i>
            </a>
            <a
              href="#"
              class="w-12 h-12 bg-sidebar rounded-full flex items-center justify-center text-sidebar-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 transform hover:-translate-y-1"
            >
              <i class="fab fa-twitter"></i>
            </a>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-muted-foreground text-sm"
              >Supporté avec fierté au</span
            >
            <span class="text-2xl">🇨🇲</span>
          </div>
        </div>
      </div>

      <!-- Séparateur -->
      <div class="border-t border-border pt-6">
        <!-- Section inférieure -->
        <div
          class="flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <div class="text-muted-foreground text-sm">
            © 2026 Home Cameroon - Tous droits réservés.
          </div>

          <div class="flex flex-wrap justify-center gap-4 md:gap-6">
            <a
              href="#"
              class="text-muted-foreground hover:text-primary text-sm transition-colors duration-300"
            >
              Mentions légales
            </a>
            <span class="text-border">|</span>
            <a
              href="#"
              class="text-muted-foreground hover:text-primary text-sm transition-colors duration-300"
            >
              Politique de confidentialité
            </a>
            <span class="text-border">|</span>
            <a
              href="#"
              class="text-muted-foreground hover:text-primary text-sm transition-colors duration-300"
            >
              Conditions d'utilisation
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css");
</style>
