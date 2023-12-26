<template>
  <h1 class="text-center">筛选</h1>

  <h3>类型</h3>
  <v-chip-group variant="outlined" v-model=Type_select mandatory filter>
    <v-chip color="teal" value="线上">线上</v-chip>
    <v-chip color="teal" value="线下">线下</v-chip>
  </v-chip-group>

  <h3 class="mt-4" v-show=show_local>地址</h3>
  <v-sheet v-show=show_local class="mt-2 d-flex flex-row">
    <v-select v-show=show_local label="省" variant="underlined" :items=Provinces
      v-model=Province_select></v-select>
    <v-select v-show=show_local label="市" variant="underlined" :items=Citys[Province_select]
      v-model=City_select></v-select>
    <v-select v-show=show_local label="区" variant="underlined" :items=Districts[City_select]
      v-model=District_select></v-select>
  </v-sheet>

  <h3 class="mt-4">招募</h3>
  <v-chip-group variant="outlined" v-model=Inst_select multiple filter>
    <v-chip color="teal" v-for="inst in Insts" :key="inst" :value="inst">{{ inst }}</v-chip>
  </v-chip-group>

  <v-sheet class="d-flex flex-row">
    <v-btn  variant="tonal" class="mt-4 bg-surface flex-1-0" rounded="xl" @click="store.show_filter = false">取消</v-btn>
    <v-btn color="teal" class="mt-4 ml-4 flex-1-0" rounded="xl" @click="submit" :loading="loading">查找</v-btn>
  </v-sheet>
</template>


<script lang="ts" setup>
import { ref, watch, Ref, computed } from 'vue'
import { useInfosStore } from '@/plugins/store'
import axios from 'axios';

axios.defaults.baseURL = '/api';
const store = useInfosStore()
const loading = ref(false)

const Provinces: any = store.Provinces
const Citys: any = store.Citys
const Districts: any = store.Districts
const Insts: any = store.Insts

const Type_select: Ref<string> = ref("线下")
const Province_select: Ref<string> = ref("上海市")
const City_select: Ref<string> = ref("上海市")
const District_select: Ref<string> = ref("不限")
const Inst_select: Ref<string[]> = ref([])

async function submit() {
  loading.value = true
  // setTimeout(() => (loading.value = false), 2000)
  if (Type_select.value == "线下") {
    if (Inst_select.value.length == 0 || !District_select.value || !City_select.value || !Province_select.value) {
      store.filterfail_snackbar = true
      loading.value = false
      return
    }
  } else if (Type_select.value == "线上") {
    if (Inst_select.value.length == 0) {
      store.filterfail_snackbar = true
      loading.value = false
      return
    }
  }
  await axios.post('bandinfos', {
    type: Type_select.value,
    province: Province_select.value,
    city: City_select.value,
    district: District_select.value,
    insts: Inst_select.value
  })
    .then(function (response: any) {
      store.infos = response.data
      store.success_snackbar = true
    })
    .catch(function (error: any) {
      store.fail_snackbar = true
      console.log(error);
    })
    .finally(function () {
      loading.value = false
      store.show_filter = false
    })
}

const show_local = computed(() => {
  return Type_select.value == '线下'
})
watch(Province_select, async () => {
  City_select.value = ""
})
watch(City_select, async () => {
  District_select.value = ""
})
watch(Type_select, async () => {
  if (Type_select.value == "线上") {
    Province_select.value = ""
    City_select.value = ""
    District_select.value = ""
  }
})
</script>
