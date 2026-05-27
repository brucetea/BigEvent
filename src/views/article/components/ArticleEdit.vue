<script setup>
import { ref } from 'vue'

const visibleDrawer = ref(false)
const params = ref({
  title: '',
  cate_id: '',
  content: '',
  cover_img: '',
  state: ''
})

const open = (index) => {
  visibleDrawer.value = true
  console.log(index);
  
}

defineExpose({
  open
})
</script>


<template>
  <el-drawer
      v-model="visibleDrawer"
      title="I am the title"
      :direction="direction"
      :before-close="handleClose"
    >
    <div>
      文章标题
      <el-input v-model="params.title" placeholder="" /></div>
    <div>
      文章分类
      <el-select v-model="value" placeholder="" >
        <ChannelSelet v-model="params.cate_id"/>
      </el-select>
    </div>
  </el-drawer>
</template>