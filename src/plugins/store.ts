import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useInfosStore = defineStore('infos', () => {
    const infos = ref()
    const Provinces = ref(['上海市', '北京市', '广东省',])
    const Citys = ref({
        "上海市": ["上海市"],
        "广东省": ["暂未开放"],
        "北京市": ["暂未开放"],
    })
    const Districts = ref({
        "上海市": ["不限", "宝山区", "静安区", "嘉定区", "金山区", "青浦区", "崇明区", "普陀区", "徐汇区", "长宁区", "松江区", "闵行区", "虹口区", "奉贤区", "黄浦区", "浦东新区"],
        "暂未开放": ["暂未开放"],
    })
    const Insts = ref(['电吉他','电贝斯','键盘', '架子鼓','木吉他'])
    const show_snackbar = ref()
    const snackbar_text = ref('')
    const show_nav = ref()
    const show_filter = ref(false)

    return {infos,Provinces,Citys,Districts,Insts,show_snackbar,snackbar_text,show_nav,show_filter}

})