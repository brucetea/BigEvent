<script setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'


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
      title="添加文章"
      :direction="direction"
      :before-close="handleClose"
      size="50%"
    >
    <el-form>
      <el-form-item label="文章标题" prop="title">
        <el-input placeholder="请输入文章标题" v-model="params.title" />
      </el-form-item>
      <el-form-item label="文章分类" prop="cate_id">
        <el-select v-model="params.cate_id">
          <el-option label="Zone one" value="shanghai" />
        </el-select>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img">
        <el-upload
          class="avatar-uploader"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div class="editor">富文本编辑器</div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">发布</el-button>
        <el-button>草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style lang="scss" scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
::v-deep.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

::v-deep.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>