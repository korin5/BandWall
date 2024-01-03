<template>
    <v-snackbar v-model="store.show_snackbar" timeout="1500">{{ store.snackbar_text }}</v-snackbar>
</template>

<script lang="ts" setup>
import { useInfosStore } from '@/plugins/store'

const store = useInfosStore()

</script>