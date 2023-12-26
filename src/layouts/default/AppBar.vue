<template>
  <v-app-bar color="teal" text-color flat>
      <v-btn class="mr-4 d-lg-none" icon="mdi-menu" @click.stop="store.show_nav = !store.show_nav"></v-btn>
    <v-app-bar-title>
      <router-link class="text-h5 text-decoration-none text-white" to="/">
        BandWall
      </router-link>
    </v-app-bar-title>
    <v-btn class="mr-4" @click="toggleTheme" icon="mdi-circle-slice-4"></v-btn>
    <!-- <v-btn to="/upload" class="bg-teal-lighten-5 " rounded="xl" prepend-icon="mdi-upload">上传</v-btn> -->
  </v-app-bar>
</template>

<script lang="ts" setup>
import { useTheme } from 'vuetify'
import { useInfosStore } from '@/plugins/store'

const theme = useTheme()
const store = useInfosStore()

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
</script>
