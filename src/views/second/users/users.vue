<template>
  <el-card class="box-card">
    <div class="header">
      <el-input placeholder="请输入内容"></el-input>
      <el-button icon="el-icon-search" class="btn"></el-button>
      <el-button type="primary">添加用户</el-button>
    </div>

    <!-- table -->
    <el-table border fit :data="dataList">
      <el-table-column label="#" width="48px" height="48px" prop="index"></el-table-column>
      <el-table-column label="姓名" prop="username"></el-table-column>
      <el-table-column label="电话" prop="mobile"></el-table-column>
      <el-table-column label="角色" prop="role_name"></el-table-column>
      <el-table-column label="状态">
        <template v-slot="scope">
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <el-button size="small" type="primary" icon="el-icon-edit"></el-button>
        <el-button size="small" type="danger" icon="el-icon-search"></el-button>
        <el-button size="small" type="warning" icon="el-icon-star-off"></el-button>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[1, 2, 5, 10]"
        :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </el-card>
</template>

<script>
import { userInfoApi } from '@/api/user'
export default {
  created () {
    this.getUserInfo()
  },
  data () {
    return {
      dataList: [],
      pagenum: 1,
      pagesize: 5,
      total: 0
    }
  },
  methods: {
    // 获取用户信息
    async getUserInfo () {
      try {
        const res = await userInfoApi({
          pagenum: this.pagenum,
          pagesize: this.pagesize
        })
        console.log(res)
        this.dataList = res.data.data.users
        this.dataList.forEach((item, index) => { item.index = index + 1 })
        console.log(this.dataList)
        this.pagenum = res.data.data.pagenum
        this.pagesize = res.data.data.pagesize
        this.total = res.data.data.total
      } catch (err) {
        console.log(err)
      }
    },

    // 分页
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.getUserInfo()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pagenum = val
      this.getUserInfo()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='scss'>
.text {
  font-size: 14px;
}

.box-card {
  width: 100%;

  .header {
    padding-bottom: 15px;
  }

  .el-input {
    width: 470px;
    height: 40px;
    border-radius: 0;
  }

  .btn {
    background-color: #f5f7fa;
    border-radius: 0;
  }
  .el-table {
    margin-bottom: 10px;
  }
}
</style>
