<template>
  <v-app>
    <default-bar />

    <default-nav />
    
    <default-view />
  </v-app>
</template>

<script lang="ts" setup>
  import DefaultBar from './AppBar.vue'
  import DefaultView from './View.vue'
  import DefaultNav from './NavBar.vue'
</script>
