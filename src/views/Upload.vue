<template>
    <v-main class="h-100 pa-4 bg-surface">
        <v-sheet max-width="600px" class=" align-center">
            <h1 class="text-center">上传</h1>

            <h3>类型</h3>
            <v-chip-group variant="outlined" v-model=type_select mandatory filter>
                <v-chip color="teal" value="线上">线上</v-chip>
                <v-chip color="teal" value="线下">线下</v-chip>
            </v-chip-group>

            <h3 class="mt-4" v-show=show_local>地址</h3>
            <v-sheet v-show=show_local class="mt-2 d-flex flex-row">
                <v-select v-show=show_local label="省" variant="underlined" :items=Provinces
                    v-model=province_select></v-select>
                <v-select v-show=show_local label="市" variant="underlined" :items=Citys[province_select]
                    v-model=city_select></v-select>
                <v-select v-show=show_local label="区" variant="underlined" :items=Districts[city_select]
                    v-model=district_select></v-select>
            </v-sheet>

            <h3 class="mt-4">招募</h3>
            <v-chip-group variant="outlined" v-model=inst_select multiple filter>
                <v-chip color="teal" v-for="inst in Insts" :key="inst" :value="inst">{{ inst }}</v-chip>
            </v-chip-group>

            <!-- <h3 class="mt-4">标题</h3> -->
            <v-text-field class="mt-4" label="标题" variant="outlined" v-model="title"></v-text-field>

            <v-textarea class="mt-4" label="介绍" variant="outlined" v-model="description"></v-textarea>

            <v-sheet class="d-flex flex-row">
                <v-btn color="teal" class="mt-4 flex-1-0" rounded="xl" @click="submit" :loading="loading">上传</v-btn>
            </v-sheet>
        </v-sheet>
    </v-main>
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

const title = ref()
const description = ref()

async function submit() {
    loading.value = true
    // setTimeout(() => (loading.value = false), 2000)
    if (type_select.value == "线下") {
        if (!description.value || !title.value || inst_select.value.length == 0 || !district_select.value || !city_select.value || !province_select.value) {
            store.snackbar_text = '请完善上传信息'
            store.show_snackbar = true
            loading.value = false
            return
        }
    } else if (type_select.value == "线上") {
        if (!description.value || !title.value || inst_select.value.length == 0) {
            store.snackbar_text = '请完善上传信息'
            store.show_snackbar = true
            loading.value = false
            return
        }
    }
    // await axios.post('upload', {
    //     type: Type_select.value,
    //     province: Province_select.value,
    //     city: City_select.value,
    //     district: District_select.value,
    //     insts: Inst_select.value
    // })
    //     .then(function (response: any) {
    //         store.infos = response.data
    //         store.snackbar_text = ''
    //         store.show_snackbar = true
    //     })
    //     .catch(function (error: any) {
    //         store.snackbar_text = ''
    //         store.show_snackbar = true
    //         console.log(error);
    //     })
    //     .finally(function () {
    //         loading.value = false
    //         store.show_filter = false
    //     })
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
