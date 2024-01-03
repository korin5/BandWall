<template>
  <h1 class="text-center">筛选</h1>

  <h3>类型</h3>
  <v-chip-group variant="outlined" v-model=type_select mandatory filter>
    <v-chip color="teal" value="线上">线上</v-chip>
    <v-chip color="teal" value="线下">线下</v-chip>
  </v-chip-group>

  <h3 class="mt-4" v-show=show_local>地址</h3>
  <v-sheet v-show=show_local class="mt-2 d-flex flex-row">
    <v-select v-show=show_local label="省" variant="underlined" :items=Provinces v-model=province_select></v-select>
    <v-select v-show=show_local label="市" variant="underlined" :items=Citys[province_select]
      v-model=city_select></v-select>
    <v-select v-show=show_local label="区" variant="underlined" :items=Districts[city_select]
      v-model=district_select></v-select>
  </v-sheet>

  <h3 class="mt-4">招募</h3>
  <v-chip-group variant="outlined" v-model=inst_select multiple filter>
    <v-chip color="teal" v-for="inst in Insts" :key="inst" :value="inst">{{ inst }}</v-chip>
  </v-chip-group>

  <v-sheet class="d-flex flex-row">
    <v-btn variant="tonal" class="mt-4 bg-surface flex-1-0" rounded="xl" @click="store.show_filter = false">取消</v-btn>
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

const type_select: Ref<string> = ref("线下")
const province_select: Ref<string> = ref("上海市")
const city_select: Ref<string> = ref("上海市")
const district_select: Ref<string> = ref("不限")
const inst_select: Ref<string[]> = ref([])

async function submit() {
  loading.value = true
  // setTimeout(() => (loading.value = false), 2000)
  if (type_select.value == "线下") {
    if (inst_select.value.length == 0 || !district_select.value || !city_select.value || !province_select.value) {
      store.snackbar_text = '请完善筛选信息'
      store.show_snackbar = true
      loading.value = false
      return
    }
  } else if (type_select.value == "线上") {
    if (inst_select.value.length == 0) {
      store.snackbar_text = '请完善筛选信息'
      store.show_snackbar = true
      loading.value = false
      return
    }
  }
  await axios.post('bandinfos', {
    type: type_select.value,
    province: province_select.value,
    city: city_select.value,
    district: district_select.value,
    insts: inst_select.value
  })
    .then(function (response: any) {
      store.infos = response.data
      store.snackbar_text = '查找成功，找到' + store.infos.length + '个结果'
      store.show_snackbar = true
    })
    .catch(function (error: any) {
      store.snackbar_text = '查找失败'
      store.show_snackbar = true
      console.log(error);
    })
    .finally(function () {
      loading.value = false
      store.show_filter = false
      set_select_info()
    })
}

function set_select_info() {
  store.select_info = new Array()
  store.select_info[0] = type_select.value
  if(type_select.value=="线下"){
    store.select_info[1] = province_select.value
    store.select_info[2] = city_select.value
    store.select_info[3] = district_select.value
  }
  for(let i in inst_select.value){
    store.select_info.push(inst_select.value[i])
  }
}

const show_local = computed(() => {
  return type_select.value == '线下'
})
watch(province_select, async () => {
  city_select.value = ""
})
watch(city_select, async () => {
  district_select.value = ""
})
watch(type_select, async () => {
  if (type_select.value == "线上") {
    province_select.value = ""
    city_select.value = ""
    district_select.value = ""
  }
})
</script>
