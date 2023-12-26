<template>
    <v-navigation-drawer v-model="store.show_nav">
        <v-list-item prepend-icon="mdi-home" class="pa-4" to="/" title="主页" color="teal"></v-list-item>
        <v-list-item prepend-icon="mdi-upload" class="pa-4" to="/upload" title="上传" color="teal"></v-list-item>
    </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { useInfosStore } from '@/plugins/store'
import { ref } from 'vue'

const store = useInfosStore()
const items = ref([
    { text: '主页', icon: 'mdi-home' },
],)

</script>