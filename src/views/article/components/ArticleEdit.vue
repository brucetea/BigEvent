<script setup>
import { ref, reactive } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import ChannelSelet from './ChannelSelet.vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { artUploadService } from '@/api/article'

const visibleDrawer = ref(false)
const initialValues = {
  title: '',
  cate_id: '',
  content: '',
  cover_img: '',
  state: ''
}
const previewUrl = ref('')
const params = reactive({...initialValues})

const drawertitle = ref('添加文章')

// 图片
const handlePictureChange = (uploadFile,uploadFiles) =>{
  previewUrl.value = URL.createObjectURL(uploadFile.raw)
  params.cover_img = uploadFile.raw
  console.log(uploadFile,uploadFiles,params.cover_img)
}
const open = (id) => {
  if (!id) {
    drawertitle.value = '添加文章'
    Object.assign(params, initialValues)
    console.log(params,2222,initialValues);
  } else {
    drawertitle.value = '编辑文章'
    // 根据id获取文章详情
    const data = {
        "id": 1564,
        "title": "哈哈",
        "content": "<p>123</p>",
        "cover_img": "/uploads/885eb38f6270eb10b42aedadd84fea23.jpg",
        "pub_date": "Tue Jun 07 2022 13:42:56 GMT+0800 (Coordinated Universal Time)",
        "state": "已发布",
        "cate_id": 1284,
        "author_id": 951,
        "cate_name": "123",
        "username": "laoli6666",
        "nickname": ""
    }
    const { title, cate_id, content, cover_img, state, id } = data
    Object.assign(params, { title, cate_id, content, cover_img, state, id })
  }
  visibleDrawer.value = true
}

const onSubmit = async (state) => {
  params.state = state
  const fd = new FormData()
  for (let key in params) {
    fd.append(key, params[key])
  }
  if (state === '已发布') {
    await artUploadService(fd)
    ElMessage({
      message: 'success message.',
      type: 'success'
    })
    visibleDrawer.value = false
    // ✅ 重置表单数据（复用你已经定义好的 initialValues）
    Object.assign(params, initialValues)
    console.log(params,11111);
    // ✅ 清空图片预览
    previewUrl.value = ''
    console.log('已发布')
  } else if (state === '草稿') {
    console.log('草稿')
  }
}

defineExpose({
  open
})
</script>

<template>
  <el-drawer
    v-model="visibleDrawer"
    :title="drawertitle"
    :direction="direction"
    :before-close="handleClose"
    size="50%"
  >
    <el-form>
      <el-form-item label="文章标题" prop="title">
        <el-input placeholder="请输入文章标题" v-model="params.title" />
      </el-form-item>
      <el-form-item label="文章分类" prop="cate_id">
        <ChannelSelet v-model="params.cate_id"></ChannelSelet>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img">
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="handlePictureChange"
        >
          <img v-if="previewUrl" :src="previewUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div class="editor">
          <QuillEditor
            theme="snow"
            v-model:content="params.content"
            content-type="html"
          />
        </div>
      </el-form-item>
      <el-form-item class="footer">
        <el-button @click="onSubmit('已发布')" type="primary">发布</el-button>
        <el-button @click="onSubmit('草稿')">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style lang="scss" scoped>
:deep(){
  .avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
  }

  .avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
  }

  .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
  }
  .editor{
    width: 100%;
    .ql-editor{
      min-height: 200px;
    }
  }
  .footer .el-form-item__content{
    justify-content: end;
  }
}
</style>
