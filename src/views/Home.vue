<template>
  <v-navigation-drawer class="pa-4" v-model="drawer">
    <Filter />
  </v-navigation-drawer>
  <v-sheet class="d-flex pa-4">
    <v-btn class="mr-4 bg-surface-variant" icon="mdi-filter" @click.stop="drawer = !drawer"></v-btn>
    <v-btn class="mr-4 bg-surface-variant" @click="toggleTheme" icon="mdi-circle-slice-4"></v-btn>
  </v-sheet>
  <v-main class="d-flex flex-wrap align-center justify-center pa-4">
    <v-card v-for="info in store.infos" width="400px" height="250px" class="pa-4 mr-4 mb-4 rounded-xl" style="border: solid ">
      <h2>{{ info.title }}</h2>
      <p v-for="p in info.description">{{ p }}</p>
    </v-card>
  </v-main>
  <v-snackbar v-model="store.success_snackbar" timeout="1500">查找成功，找到{{ store.infos.length }}个结果</v-snackbar>
  <v-snackbar v-model="store.fail_snackbar" timeout="1500">查找失败</v-snackbar>
  <v-snackbar v-model="store.filterfail_snackbar" timeout="1500">请完善筛选信息</v-snackbar>
</template>

<script lang="ts" setup>
// import HelloWorld from '@/components/HelloWorld.vue'
import Filter from '@/components/Filter.vue'
import { ref } from 'vue'
import { useTheme } from 'vuetify'
import { useInfosStore } from '@/plugins/store'

const store = useInfosStore()

const theme = useTheme()

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

const drawer = ref(true)

</script>