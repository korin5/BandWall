<template>
  <v-app>
    <default-bar />

    <default-nav />

    <default-view />

    <default-snackbar />
  </v-app>
</template>

<script lang="ts" setup>
import DefaultBar from './AppBar.vue'
import DefaultView from './View.vue'
import DefaultNav from './NavBar.vue'
import DefaultSnackbar from './Snackbar.vue'
</script>
