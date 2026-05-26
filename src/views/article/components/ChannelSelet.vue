<script setup>
import { artGetChannelsService } from '@/api/article'
import { ref } from 'vue'

const channelList = ref([])

const props = defineProps({
    modelValue: [String, Number]
})

const emit = defineEmits(['update:modelValue'])


const getList = async () => {
  const res = await artGetChannelsService()
  channelList.value = res.data.data
  console.log(channelList.value);
  
}
getList()
</script>

<template>
  <el-select :modelValue="props.modelValue" @update:modelValue="emit('update:modelValue', $event)" placeholder="请选择">
    
    <el-option
      v-for="item in channelList"
      :key="item.id"
      :label="item.cate_name"
      :value="item.id"
    />
  </el-select>
</template>
