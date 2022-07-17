<template>
  <div>
    <el-card>
      <!-- 警告 -->
      <el-alert title="注意：只允许为第三级分类设置相关参数！" type="warning"> </el-alert>

      <!-- 级联选择器 -->
      <div class="block">
        <span class="demonstration">选择商品分类:</span>
        <el-cascader v-model="value" :options="options"
          :props="{ expandTrigger: 'hover', label: 'cat_name', value: 'cat_id' }" @change="handleChange">
        </el-cascader>

        <!-- 导航菜单 -->
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">动态参数</el-menu-item>
          <el-menu-item index="2">静态属性</el-menu-item>
        </el-menu>

        <!-- 添加参数 -->
        <div class="disabled">
          <el-button type="primary" size="small" :disabled="categoriesList.length === 0" @click="dialogVisible = true">
            添加参数</el-button>
          <el-table border :data="categoriesList">
            <el-table-column type="expand">
              <template>
                <el-tag>+ New Tags</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="#" width="48px" height="48px" prop="index"></el-table-column>
            <el-table-column label="分类名称" prop="attr_name"></el-table-column>
            <el-table-column label="操作">
              <template v-slot="scope">
                <el-button type="primary" size="small">编辑</el-button>
                <el-button type="danger" size="small" @click="delFn(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <!-- 添加参数dialog -->
        <el-dialog title="添加参数" :visible.sync="dialogVisible" width="50%">
          <el-form width="100px" :model="form">
            <el-form-item label="动态参数">
              <el-input v-model="form.categories"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="addCategoryAttr">确 定</el-button>
            </span>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getCategoriesApi, getCategoryByIdApi, addCategoryAttrApi, deleteCategoryAttrApi } from '@/api/goods'
export default {
  created () {
    this.getCategories()
  },
  data () {
    return {
      value: [], // 选中的值
      options: [], // 分类列表
      activeIndex: 'many', // 当前激活的菜单项
      categoriesList: [], // table数据
      dialogVisible: false, // dialog是否显示
      form: {
        categories: ''
      }
    }
  },
  methods: {
    async handleChange (value) {
      console.log(value)
      try {
        const res = await getCategoryByIdApi(value[value.length - 1], {
          sel: this.activeIndex
        })
        console.log(res)
        this.categoriesList = res.data.data
        this.categoriesList.forEach((item, index) => {
          item.index = index + 1
        })
        console.log(this.categoriesList)
      } catch (err) {
        console.log(err)
      }
    },
    // 获取分类列表
    async getCategories () {
      try {
        const res = await getCategoriesApi()
        console.log(res)
        this.options = res.data.data
      } catch (err) {
        console.log(err)
      }
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
      if (key === '1') {
        this.activeIndex = 'many'
        console.log(this.activeIndex)
      } else {
        this.activeIndex = 'only'
        console.log(this.activeIndex)
      }
      if (this.value.length === 0) {
        this.$message.error('请选择三级分类')
      }
    },
    // 添加动态参数
    async addCategoryAttr () {
      try {
        const res = await addCategoryAttrApi(this.value[this.value.length - 1], {
          attr_name: this.form.categories,
          attr_sel: this.activeIndex,
          attr_vals: ''
        })
        this.dialogVisible = false
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    },
    // 删除动态参数
    async delFn (val) {
      console.log(val)
      try {
        console.log(val.cat_id, val.attr_id)
        const res = await deleteCategoryAttrApi(val.cat_id - 0, val.attr_id - 0)
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang="scss">
.el-alert {
  margin-bottom: 15px;
}

.el-menu-demo {
  margin-bottom: 15px;
}

.el-button {
  margin-bottom: 15px;
}

:deep(span) {
  margin-right: 10px;
}

.el-tag {
  margin-left: 20px;
}
</style>
