<template>
  <v-navigation-drawer class="pa-4" v-model="drawer">
    <Filter />
  </v-navigation-drawer>
  <v-sheet class="d-flex">
    <v-btn class="ma-4 bg-surface-variant" icon="mdi-filter" @click.stop="drawer = !drawer"></v-btn>
    <v-btn class="ma-4 bg-surface-variant" @click="toggleTheme" icon="mdi-circle-slice-4"></v-btn>
  </v-sheet>
  <v-main class="d-flex flex-wrap align-center justify-center pa-4" style="min-height: 300px;">
    <v-card v-for="info in infos" width="400px" height="300px" class="pa-4 mr-4 mb-4">
      <h2>{{ info.title }}</h2>
      <p v-for="text in info.text">{{ text }}</p>
    </v-card>
  </v-main>
</template>

<script lang="ts" setup>
// import HelloWorld from '@/components/HelloWorld.vue'
import Filter from '@/components/Filter.vue'
import { ref } from 'vue'
import { useTheme } from 'vuetify'

const theme = useTheme()

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

const drawer = ref(true)

const infos = ref([
  {
    title: "one",
    text: ["balabalabalabalabala","balabalala","lababalaba"]
  },
  {
    title: "two",
  },
  {
    title: "three",
    text: ["balabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabala"]
  },
  {
    title: "four",
  },
  {
    title: "five",
    text: ["balabalabalabalabalabalablabala"]
  },
  {
    title: "six",
  },
  {
    title: "seven",
  },
  {
    title: "eight",
  },
  {
    title: "nine",
  },
  {
    title: "ten",
  },
])
</script>
