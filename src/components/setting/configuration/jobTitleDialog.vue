<template>
  <div class="container">
    <el-dialog
      class="dialog"
      title="职位名称"
      :visible.sync="jobTitle.centerDialogVisible"
      center
      width="30%"
      :lock-scroll="true"
      @open="getData"
    >
      <!-- <el-button class="add" size="small" v-if="permission.add" type="primary" @click="handleAddRole()">新增</el-button> -->
      <el-tree
        :data="tableData"
        :props="defaultProps"
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
        :render-content="renderContent"
      ></el-tree>
      <el-dialog
        width="30%"
        center
        :title="dialogs.dialogType==='edit'?`修改职位`:`创建职位`"
        :visible.sync="dialogs.centerDialogVisible"
        append-to-body
        @close="hideDialogs"
      >
        <el-form
          ref="form"
          :rules="rules"
          :model="formData"
          label-width="100px"
          label-position="left"
        >
          <el-form-item label="名称：" prop="name">
            <el-input v-model="formData.name" placeholder="请输入名称" />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancels()">取 消</el-button>
          <el-button type="primary" @click="confirms()">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 分页 -->
      <!-- <pagination @page="handleSizeChange" @pagesize="handleCurrentChange" :pageData="pageData"></pagination> -->
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirm()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  addPosition,
  editPosition,
  delPosition,
  selectPosition,
  findPosition,
  selectPositionByPid,
  selectPositionTree
} from "@/api/setting/setting";
import Pagination from "@/components/pagination";

export default {
  props: {
    jobTitle: Object
  },
  components: {
    pagination: Pagination
  },
  data() {
    return {
      rules: {
        name: [{ required: true, message: "请填写名称", trigger: "blur" }]
      },
      //页面数据
      tableData: [],
      defaultProps: {
        children: "child",
        label: "name",
        value: "id",
        checkStrictly: true
      },
      formData: {
        name: ""
      },
      //分页
      pageData: {
        pageSizes: [10, 20],
        pageSize: 10,
        page: 1,
        total: null,
        layout: "total, sizes, prev, pager, next, jumper"
      },

      dialogs: {
        centerDialogVisible: false,
        dialogType: "edit",
        name: "",
        parentId:'',
        id: ""
      },
       permission: {}
    };
  },
  created() {},
  methods: {
    getData() {
      let data = {
        limit: this.pageData.pageSize,
        page: this.pageData.page
      };
      this.getDataFn(selectPositionTree, data);
    },
    getDataFn(post, data) {
      post(data).then(res => {
        if (res.code == 0) {
          this.tableData = res.data;
          this.permission = res.btn_status;
          //   this.pageData.page = res.data.current_page;
          //   this.pageData.pagesize = res.data.per_page;
          //   this.pageData.total = res.data.total;
        }
      });
    },
    //内层确定
    confirms() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          let data = {
            name: this.formData.name,
            pid: this.dialogs.id
          };
          if (this.dialogs.dialogType == "edit") {
            data.pid=this.dialogs.parentId;
            data.id = this.dialogs.id;
            this.handleEditsFn(editPosition, data);
          } else {
            this.handleAddRoleFn(addPosition, data);
          }
        }
      });
    },
    //新增
    handleAddRole(scope) {
      this.dialogs = {
        centerDialogVisible: true,
        dialogType: "",
        parentId:'',
        id: scope.id
      };
    },
    //新增方法
    handleAddRoleFn(post, data) {
      post(data).then(res => {
        if (res.code == 0) {
          this.$message({
            message: res.message || res.msg,
            type: "success"
          });
          this.hideDialogs();
          this.getData();
        } else {
          this.$message({
            message: res.message || res.msg,
            type: "error"
          });
        }
      });
    },
    // 编辑
    handleEdits(node, scope) {
      console.log(node,scope)
      this.dialogs = {
        centerDialogVisible: true,
        dialogType: "edit",
        id: scope.id,
        parentId:scope.pid
      };
      this.formData.name = node.label;
    },
    //编辑方法
    handleEditsFn(post, data) {
      post(data).then(res => {
        if (res.code == 0) {
          this.$message({
            message: res.message || res.msg,
            type: "success"
          });
          this.hideDialogs();
          this.getData();
        } else {
          this.$message({
            message: res.message || res.msg,
            type: "error"
          });
        }
      });
    },
    //删除
    handleDelete(scope) {
      this.$confirm("是否删除该条信息?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        center: true
      })
        .then(() => {
          let data = {
            id: scope.id
          };
          this.handleDeleteFn(delPosition, data);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //删除方法
    handleDeleteFn(post, data) {
      post(data).then(res => {
        if (res.code == 0) {
          this.$message({
            message: res.message || res.msg,
            type: "success"
          });
          this.getData();
        } else {
          this.$message({
            message: res.message || res.msg,
            type: "error"
          });
        }
      });
    },
    renderContent(h, { node, data, store }) {
      return (
        <span
          class="custom-tree-node"
          style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;"
        >
          <span>{data.name}</span>
          <span>
           <el-button
              size="mini"
              type="text"
              on-click={() => this.handleAddRole(data)}
            >
              {this.permission.add ? "新增" : ""}
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.handleEdits(node, data)}
            >
               {this.permission.edit ? "修改" : ""}
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.handleDelete(data)}
            >
               {this.permission.del ? "删除" : ""}
            </el-button>
          </span>
        </span>
      );
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
    //关闭dialog
    hideDialog() {
      this.jobTitle.centerDialogVisible = false;
      this.tableData = [];
    },
    //关闭内层dialog
    hideDialogs() {
      this.$refs["form"].resetFields();
      this.formData = {
        relation: [],
        name: ""
      };
      this.dialogs.centerDialogVisible = false;
    },
    //确定
    confirm() {
      this.hideDialog();
    },
    // 取消内层
    cancels() {
      this.hideDialogs();
    }
  }
};
</script>
<style scoped>
.add {
  margin-left: auto;
  margin-bottom: 10px;
  display: block;
}
</style>