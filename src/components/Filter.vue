<template>
    <h3>类型</h3>
    <v-chip-group v-model=Type_select mandatory filter>
      <v-chip variant="outlined" value="线上">线上</v-chip>
      <v-chip variant="outlined" value="线下">线下</v-chip>
    </v-chip-group>

    <h3 class="mt-4" v-show=show_local>地址</h3>
    <v-combobox v-show=show_local label="省" density="comfortable" :items=Provinces v-model=Province_select></v-combobox>
    <v-combobox v-show=show_local label="市" density="comfortable" :items=Citys[Province_select] v-model=City_select></v-combobox>
    <v-combobox v-show=show_local label="区" density="comfortable" :items=Districts[City_select] v-model=District_select></v-combobox>
      
    <h3 class="mt-4">招募</h3>
    <v-chip-group v-model=Insts_select mandatory multiple filter>
      <v-chip  variant="outlined" v-for="inst in Insts" :key="inst" :value="inst">{{ inst }}</v-chip>
    </v-chip-group>

    <v-btn class="mt-4 bg-surface-variant" block rounded="xl" @click="submit" :loading="loading">查找</v-btn>
</template>


<script lang="ts" setup>
import { ref, watch, Ref, computed } from 'vue'

const loading = ref(false)

const Provinces: Ref<string[]> = ref(['上海市', '北京市', '广东省',])
const Citys: Ref<any> = ref({
  "上海市": ["上海市"],
  "广东省": ["暂未开放"],
  "北京市": ["暂未开放"],
})
const Districts: Ref<any> = ref({
  "上海市": ["不限", "宝山区", "静安区", "嘉定区", "金山区", "青浦区", "崇明区", "普陀区", "徐汇区", "长宁区", "松江区", "闵行区", "虹口区", "奉贤区", "黄浦区", "浦东新区"],
  "暂未开放": ["暂未开放"],
})
const Insts: Ref<string[]> = ref(['键盘', '架子鼓', '电吉他', '电贝斯', '木吉他'])

const Province_select = ref("上海市")
const City_select = ref("上海市")
const District_select = ref("不限")
const Type_select = ref("线下")
const Insts_select = ref([])

function submit() {
  loading.value = true
  setTimeout(() => (loading.value = false), 1000)
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
</script>
