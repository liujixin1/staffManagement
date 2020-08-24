<template>
  <div class="container">
    <div class="top">
      <el-button size="small" @click="stopAdminInfo()">停用</el-button>
      <el-button size="small" @click="startAdminInfo()">启用</el-button>
      <el-button
        class="add"
        size="small"
        type="primary"
        v-if="permission.add"
        icon="el-icon-circle-plus"
        @click="handleAddAdmin()"
      >新增管理员</el-button>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      empty-text="暂无数据"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="50" align="center"></el-table-column>
      <el-table-column prop="admin_id" label="id" width="180"></el-table-column>
      <el-table-column prop="username" label="用户名" width="180"></el-table-column>
      <el-table-column prop="nickname" label="管理员名称" width="180"></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column label="操作" width="380" align="center">
        <template slot-scope="scope">
          <el-button size="mini" icon="el-icon-lock" type="warning" @click="password(scope)">重置密码</el-button>
          <el-button
            size="mini"
            icon="el-icon-edit"
            type="primary"
            v-if="permission.edit"
            @click="handleEdit(scope)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            v-if="permission.del"
            @click="handleDelete(scope)"
          >删除</el-button>
          <el-button size="mini" v-if="scope.row.status == 1" @click="stopAdminInfo(scope)">停用</el-button>
          <el-button size="mini" v-if="scope.row.status == 0" @click="startAdminInfo(scope)">启用</el-button>
          <el-button size="mini" v-if="scope.row.status == 2" @click="unlock(scope)">解锁</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <pagination @page="handleSizeChange" @pagesize="handleCurrentChange" :pageData="pageData"></pagination>
    <!-- dialog -->
    <adminDialog :dialog="dialog" :formData="formData" @upData="getData"></adminDialog>
  </div>
</template>
<script>
import AdminDialog from "@/components/permission/adminDialog";
import Pagination from "@/components/pagination";
import {
  SelectAdminList,
  delAdminInfo,
  stopAdminInfo,
  startAdminInfo,
  unfreeze,
  resetAdminPassword
} from "@/api/permission/adminlist";
export default {
  components: {
    pagination: Pagination,
    adminDialog: AdminDialog
  },
  data() {
    return {
      //页面数据
      tableData: [],
      //分页
      pageData: {
        pageSizes: [10, 20],
        pageSize: 10,
        page: 1,
        total: null,
        layout: "total, sizes, prev, pager, next, jumper"
      },
      //dialog信息
      dialog: {
        centerDialogVisible: false,
        dialogType: "",
        admin_id: ""
      },
      multipleSelection: "",
      formData: {},
      permission: {}
    };
  },
  computed: {
    routesData() {
      return this.routes;
    }
  },
  created() {
    //页面数据
    this.getData();
  },
  methods: {
    //页面数据
    getData() {
      let data = {
        limit: this.pageData.pageSize,
        page: this.pageData.page
      };
      SelectAdminList(data)
        .then(res => {
          if (res.code == 0) {
            this.tableData = res.data.data;
            this.permission = res.data.btn_status;
            this.pageData.page = res.data.current_page;
            this.pageData.pagesize = res.data.per_page;
            this.pageData.total = res.data.total;
          }
        })
        .catch(err => {});
    },
    // 添加管理员
    handleAddAdmin() {
      this.dialog.centerDialogVisible = true;
      this.dialog.dialogType = "";
      this.dialog.admin_id = "";
    },
    handleEdit(scope) {
      this.dialog.centerDialogVisible = true;
      this.dialog.dialogType = "edit";
      this.dialog.admin_id = scope.row.admin_id;
    },
    //停用
    stopAdminInfo(scope) {
      let data = {};
      if (scope) {
        data.ids = scope.row.admin_id;
      } else {
        data.ids = this.multipleSelection;
      }
      this.$confirm("是否停用?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        stopAdminInfo(data).then(res => {
          this.getData();
          this.$message({
            type: "success",
            message: res.msg
          });
        });
      });
    },
    //启用
    startAdminInfo(scope) {
      let data = {};
      if (scope) {
        data.ids = scope.row.admin_id;
      } else {
        data.ids = this.multipleSelection;
      }
      this.$confirm("是否停用?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        startAdminInfo(data).then(res => {
          this.getData();
          this.$message({
            type: "success",
            message: res.msg
          });
        });
      });
    },
    //解锁
    unlock(scope) {
      let data = {
        id: scope.row.admin_id
      };
      this.$confirm("是否解锁该管理员?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          unfreeze(data).then(res => {
            if (res.code == 0) {
              this.getData();
              this.$message({
                type: "success",
                message: res.msg
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消解锁"
          });
        });
    },
    //删除管理员
    handleDelete(scope) {
      let data = {
        admin_id: scope.row.admin_id
      };
      console.log(scope);
      this.$confirm("是否删除该条信息?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delAdminInfo(data).then(res => {
            if (res.code == 0) {
              this.getData();
              this.$message({
                type: "success",
                message: res.msg
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //重置密码
    password(scope) {
      let data = {
        admin_id: scope.row.admin_id
      };
      console.log(scope);
      this.$confirm("是否重置密码?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          resetAdminPassword(data).then(res => {
            if (res.code == 0) {
              this.$message({
                type: "success",
                message: res.msg
              });
            }else{
              this.$message({
                type: "error",
                message: res.msg
              });
            }
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //每页多少条
    handleCurrentChange(val) {
      this.pageData.page = 1;
      this.pageData.pageSize = val;
      this.getData();
    },
    //选取页数
    handleSizeChange(page) {
      this.pageData.page = page;
      this.getData();
    },
    //选取
    handleSelectionChange(val) {
      let arr = [];
      val.forEach(res => {
        arr.push(res.admin_id);
      });
      this.multipleSelection = arr.join(",");
      // console.log( this.multipleSelection)
    }
  }
};
</script>
<style scoped>
.top {
  display: flex;
  margin-bottom: 10px;
  position: relative;
}
.add {
  position: absolute;
  right: 0;
  top: 0;
}
</style>