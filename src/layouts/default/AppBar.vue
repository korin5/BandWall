<template>
  <v-app-bar text-color flat class="bg-teal">
    <v-app-bar-title>
      <v-btn class="text-h5" @click="openHomePage()">
        Demo
      </v-btn>
    </v-app-bar-title>
    <v-btn @click="openUploadPage()" class="bg-teal-lighten-5 " rounded="xl" prepend-icon="mdi-upload">上传</v-btn>
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
const openUploadPage = () => {
  window.open(upload.href, '_self')
}
const openHomePage = () => {
  window.open(home.href, '_self')
}
</script>
