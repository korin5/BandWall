<template>
  <v-main class="h-100 pa-4 bg-surface">
    <v-sheet class="mb-4">
      <v-btn color="teal" class="mr-4" icon="mdi-filter" @click.stop="store.show_filter = true"></v-btn>
      <v-chip class="mr-2 mt-2" v-for="info in store.select_info">{{ info }}</v-chip>
    </v-sheet>

    <v-sheet class="d-flex flex-wrap align-start justify-center">
      <v-sheet v-for="info in store.infos" width="500px" height="300px"
        class=" mr-4 mb-4 elevation-6 rounded-xl overflow-hidden">
        <v-card class="w-100 h-100 pa-4 overflow-auto ">
          <h2>{{ info.title }}</h2>
          <p v-for="p in info.description">{{ p }}</p>
        </v-card>
      </v-sheet>
    </v-sheet>

    <v-dialog v-model="store.show_filter" max-width="600px" class=" align-center">
      <v-card v-show="store.show_filter" class="w-100 pa-4 mr-4 mb-4 rounded-xl elevation-6 ">
        <Filter />
      </v-card>
    </v-dialog>
  </v-main>
</template>

<script lang="ts" setup>
// import HelloWorld from '@/components/HelloWorld.vue'
import Filter from '@/components/Filter.vue'
import { useInfosStore } from '@/plugins/store'

const store = useInfosStore()

</script>