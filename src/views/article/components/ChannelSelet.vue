<script setup>
import { artGetChannelsService } from '@/api/article'
import { ref } from 'vue'

const channelList = ref([])
const selected = ref('')



const getList = async () => {
  const res = await artGetChannelsService()
  channelList.value = res.data.data
}
getList()
</script>

<template>
  {{ obj?.name  }}
  <el-select v-model="selected" placeholder="请选择">
    
    <el-option
      v-for="item in channelList"
      :key="item.id"
      :label="item.cate_name"
      :value="item.cate_alias"
    />
  </el-select>
</template>
