<template>
  <div class="container">
    <el-dialog
      class="dialog"
      :title="dialog.name"
      :visible.sync="dialog.centerDialogVisible"
      center
      width="50%"
      :lock-scroll="true"
      @open="getData"
      @close="hideDialog"
    >
      <el-dialog
        width="30%"
        center
        :title="dialogs.dialogType==='edit'?`修改${dialogs.name}`:`创建${dialogs.name}`"
        :visible.sync="dialogs.centerDialogVisible"
        @open="getDatas"
        @close="hideDialogs"
        append-to-body
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
      <el-button
        class="add"
        size="small"
        type="primary"
        v-if="permission.add"
        @click="handleAddRole()"
      >新增</el-button>
      <el-table :data="tableData" border style="width: 100%" empty-text="暂无数据">
        <el-table-column prop="name" :label="dialog.name" align="center"></el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              icon="el-icon-edit"
              type="primary"
              v-if="permission.edit"
              @click="handleEdits(scope)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              v-if="permission.del"
              @click="handleDelete(scope)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <pagination @page="handleSizeChange" @pagesize="handleCurrentChange" :pageData="pageData"></pagination>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="cancel()">取 消</el-button> -->
        <el-button type="primary" @click="confirm()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  selectAcceptOffer,
  addAcceptOffer,
  editAcceptOffer,
  findAcceptOffer,
  delAcceptOffer,
  selectIntended,
  addIntended,
  editIntended,
  findIntended,
  delIntended,
  selectChannel,
  addChannel,
  editChannel,
  findChannel,
  delChannel,
  addMessageTpl,
  editMessageTpl,
  delMessageTpl,
  selectMessageTpl,
  findMessageTpl,
  addCompany,
  editCompany,
  delCompany,
  selectCompany,
  findCompany,
  addSchool,
  editSchool,
  delSchool,
  selectSchool,
  findSchool,
  addDepartment,
  editDepartment,
  delDepartment,
  selectDepartment,
  findDepartment,
  addPosition,
  editPosition,
  delPosition,
  selectPosition,
  selectPositionByPid,
  addNature,
  editNature,
  delNature,
  selectNature,
  findNature,
  addEmployeeStatus,
  editEmployeeStatus,
  delEmployeeStatus,
  selectEmployeeStatus,
  findEmployeeStatus,
  addLessonsLevel,
  editLessonsLevel,
  delLessonsLevel,
  selectLessonsLevel,
  findLessonsLevel,
  addTeacherType,
  editTeacherType,
  delTeacherType,
  selectTeacherType,
  findTeacherType,
  addTeacherStar,
  editTeacherStar,
  delTeacherStar,
  selectTeacherStar,
  findTeacherStar,
  addPositionType,
  editPositionType,
  delPositionType,
  selectPositionType,
  findPositionType,
  addContractType,
  editContractType,
  delContractType,
  selectContractType,
  findContractType,
  addAuditionInvitation,
  editAuditionInvitation,
  delAuditionInvitation,
  selectAuditionInvitation,
  findAuditionInvitation
} from "@/api/setting/setting";
import Pagination from "@/components/pagination";

export default {
  props: {
    dialog: Object
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
      switch (this.dialog.id) {
        case 1:
          this.getDataFn(selectAcceptOffer, data);
          break;
        case 2:
          this.getDataFn(selectIntended, data);
          break;
        case 3:
          this.getDataFn(selectChannel, data);
          break;
        case 4:
          this.getDataFn(selectMessageTpl, data);
          break;
        case 5:
          this.getDataFn(selectCompany, data);
          break;
        case 6:
          this.getDataFn(selectSchool, data);
          break;
        case 7:
          this.getDataFn(selectDepartment, data);
          break;
        case 9:
          this.getDataFn(selectNature, data);
          break;
        case 10:
          this.getDataFn(selectEmployeeStatus, data);
          break;
        case 11:
          this.getDataFn(selectLessonsLevel, data);
          break;
        case 12:
          this.getDataFn(selectTeacherType, data);
          break;
        case 13:
          this.getDataFn(selectTeacherStar, data);
          break;
        case 14:
          this.getDataFn(selectPositionType, data);
          break;
        case 15:
          this.getDataFn(selectContractType, data);
          break;
        case 16:
          this.getDataFn(selectAuditionInvitation, data);
          break;
      }
    },
    getDataFn(post, data) {
      post(data).then(res => {
        if (res.code == 0) {
          this.tableData = res.data.data;
          this.permission = res.data.btn_status;
          this.pageData.page = res.data.current_page;
          this.pageData.pagesize = res.data.per_page;
          this.pageData.total = res.data.total;
        }
      });
    },
    getDatas() {
      if (this.dialogs.dialogType == "edit") {
        let data = {
          id: this.dialogs.id
        };
        switch (this.dialog.id) {
          case 1:
            this.getDatasFn(findAcceptOffer, data);
            break;
          case 2:
            this.getDatasFn(findIntended, data);
            break;
          case 3:
            this.getDatasFn(findChannel, data);
            break;
          case 4:
            this.getDatasFn(findMessageTpl, data);
            break;
          case 5:
            this.getDatasFn(findCompany, data);
            break;
          case 6:
            this.getDatasFn(findSchool, data);
            break;
          case 7:
            this.getDatasFn(findDepartment, data);
            break;
          case 9:
            this.getDatasFn(findNature, data);
            break;
          case 10:
            this.getDatasFn(findEmployeeStatus, data);
            break;
          case 11:
            this.getDatasFn(findLessonsLevel, data);
            break;
          case 12:
            this.getDatasFn(findTeacherType, data);
            break;
          case 13:
            this.getDatasFn(findTeacherStar, data);
            break;
          case 14:
            this.getDatasFn(findPositionType, data);
            break;
          case 15:
            this.getDatasFn(findContractType, data);
            break;
          case 16:
            this.getDatasFn(findAuditionInvitation, data);
            break;
        }
      }
    },
    getDatasFn(post, data) {
      post(data).then(res => {
        if (res.code == 0) {
          this.formData.name = res.data.name;
          this.formData.id = res.data.id;
        } else {
          this.$message({
            message: res.message || res.msg,
            type: "error"
          });
        }
      });
    },
    //内层确定
    confirms() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          let data = {
            name: this.formData.name
          };
          if (this.dialogs.dialogType == "edit") {
            data.id = this.formData.id;
            switch (this.dialog.id) {
              case 1:
                this.handleEditsFn(editAcceptOffer, data);
                break;
              case 2:
                this.handleEditsFn(editIntended, data);
                break;
              case 3:
                this.handleEditsFn(editChannel, data);
                break;
              case 4:
                this.handleEditsFn(editMessageTpl, data);
                break;
              case 5:
                this.handleEditsFn(editCompany, data);
                break;
              case 6:
                this.handleEditsFn(editSchool, data);
                break;
              case 7:
                this.handleEditsFn(editDepartment, data);
                break;
              case 9:
                this.handleEditsFn(editNature, data);
                break;
              case 10:
                this.handleEditsFn(editEmployeeStatus, data);
                break;
              case 11:
                this.handleEditsFn(editLessonsLevel, data);
                break;
              case 12:
                this.handleEditsFn(editTeacherType, data);
                break;
              case 13:
                this.handleEditsFn(editTeacherStar, data);
                break;
              case 14:
                this.handleEditsFn(editPositionType, data);
                break;
              case 15:
                this.handleEditsFn(editContractType, data);
                break;
              case 16:
                this.handleEditsFn(editAuditionInvitation, data);
                break;
            }
          } else {
            switch (this.dialog.id) {
              case 1:
                this.handleAddRoleFn(addAcceptOffer, data);
                break;
              case 2:
                this.handleAddRoleFn(addIntended, data);
                break;
              case 3:
                this.handleAddRoleFn(addChannel, data);
                break;
              case 4:
                this.handleAddRoleFn(addMessageTpl, data);
                break;
              case 5:
                this.handleAddRoleFn(addCompany, data);
                break;
              case 6:
                this.handleAddRoleFn(addSchool, data);
                break;
              case 7:
                this.handleAddRoleFn(addDepartment, data);
                break;
              case 9:
                this.handleAddRoleFn(addNature, data);
                break;
              case 10:
                this.handleAddRoleFn(addEmployeeStatus, data);
                break;
              case 11:
                this.handleAddRoleFn(addLessonsLevel, data);
                break;
              case 12:
                this.handleAddRoleFn(addTeacherType, data);
                break;
              case 13:
                this.handleAddRoleFn(addTeacherStar, data);
                break;
              case 14:
                this.handleAddRoleFn(addPositionType, data);
                break;
              case 15:
                this.handleAddRoleFn(addContractType, data);
                break;
              case 16:
                this.handleAddRoleFn(addAuditionInvitation, data);
                break;
            }
          }
        }
      });
    },
    //新增
    handleAddRole() {
      this.dialogs = {
        centerDialogVisible: true,
        dialogType: "",
        name: this.dialog.name
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
    handleEdits(scope) {
      this.dialogs = {
        centerDialogVisible: true,
        dialogType: "edit",
        name: this.dialog.name,
        id: scope.row.id
      };
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
            id: scope.row.id
          };
          switch (this.dialog.id) {
            case 1:
              this.handleDeleteFn(delAcceptOffer, data);
              break;
            case 2:
              this.handleDeleteFn(delIntended, data);
              break;
            case 3:
              this.handleDeleteFn(delChannel, data);
              break;
            case 4:
              this.handleDeleteFn(delMessageTpl, data);
              break;
            case 5:
              this.handleDeleteFn(delCompany, data);
              break;
            case 6:
              this.handleDeleteFn(delSchool, data);
              break;
            case 7:
              this.handleDeleteFn(delDepartment, data);
              break;
            case 9:
              this.handleDeleteFn(delNature, data);
              break;
            case 10:
              this.handleDeleteFn(delEmployeeStatus, data);
              break;
            case 11:
              this.handleDeleteFn(delLessonsLevel, data);
              break;
            case 12:
              this.handleDeleteFn(delTeacherType, data);
              break;
            case 13:
              this.handleDeleteFn(delTeacherStar, data);
              break;
            case 14:
              this.handleDeleteFn(delPositionType, data);
              break;
            case 15:
              this.handleDeleteFn(delContractType, data);
              break;
            case 16:
              this.handleDeleteFn(delAuditionInvitation, data);
              break;
          }
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
      this.dialog.centerDialogVisible = false;
      this.tableData = [];
    },
    //关闭内层dialog
    hideDialogs() {
      this.$refs["form"].resetFields();
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