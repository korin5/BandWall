<template>
  <v-app-bar text-color flat class="bg-teal">
    <v-app-bar-title>
      <!-- <v-btn variant="outlined" class="text-h5" to="/"> -->
      <router-link class="text-h5 text-decoration-none text-white" to="/">
        BandWall
      </router-link>
      <!-- </v-btn> -->
    </v-app-bar-title>
    <v-btn  to="/upload" class="bg-teal-lighten-5 " rounded="xl" prepend-icon="mdi-upload">上传</v-btn>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter();
const upload = router.resolve({
  name: 'Upload',
  path: '/upload',
})
const home = router.resolve({
  name: 'Home',
  path: '/',
})
</script>
