<script setup>
import { ref } from 'vue'
import { Delete, Edit } from '@element-plus/icons-vue'
import { artGetListService } from '../../api/article'
import ChannelSelet from './components/ChannelSelet.vue'
import ArticleEdit from './components/ArticleEdit.vue'

const articleList = ref([])
const total = ref(0)


const params = ref({
  pagenum: 1, 
  pagesize: 5,
  cate_id:'',
  state:''
})
const getArticleList = async () => {
  const res = await artGetListService(params.value)
  console.log(res)
  articleList.value = res.data.data
  total.value = res.data.total
}

getArticleList()

const handleSizeChange=(page)=>{
  console.log(page)
  params.value.pagenum = 1
  getArticleList()
}

const handleCurrentChange=(page)=>{
  console.log(page)
  getArticleList()
}

const search = () => {
  params.value.pagenum = 1
  getArticleList()
}

const reset = () => {
  params.value.cate_id = ''
  params.value.state = ''
  params.value.pagenum = 1
  getArticleList()
}

const articleEditRef = ref()
const onAddArticle = () => {
  articleEditRef.value.open({})
}
// const onEditArticle = (id) => {
//   articleEditRef.value.open(id)
// }
</script>

<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button @click=onAddArticle>添加文章</el-button>
    </template>

    <!-- 表单区域 -->
    <el-form inline>
        <el-form-item label="文章分类:" class="form">
            <ChannelSelet v-model="params.cate_id"/>
        </el-form-item>
        <el-form-item label="发布状态:" class="form">
            <el-select v-model="params.state"  placeholder="请选择">
                <el-option label="已发布" value="已发布" />
                <el-option label="草稿" value="草稿" />
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="search">搜索</el-button>
            <el-button @click="reset">重置</el-button>
        </el-form-item>
    </el-form>

    <!-- 表格区域 -->
    <el-table :data="articleList" style="width: 100%">
        <el-table-column prop="title" label="文章标题" width="180" />
        <el-table-column prop="cate_name" label="分类" width="180" />
        <el-table-column prop="pub_date" label="发布时间" />
        <el-table-column prop="state" label="状态" />
        <el-table-column label="操作">
            <template #default>
                <el-button type="primary" :icon="Edit" circle plain></el-button>
                <el-button type="danger" :icon="Delete" circle plain></el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 分页区域 -->
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 5, 10]"
      :size="size"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange($event)"
      @current-change="handleCurrentChange($event)"
      style="margin-top: 20px;justify-content: flex-end;"
    />
    <!-- 添加文章 -->
     <ArticleEdit ref="articleEditRef"></ArticleEdit>
  </page-container>
</template>


<style lang="scss" scoped>
 .form{
  width: 300px;
}
</style>
