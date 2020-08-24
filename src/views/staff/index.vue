<template>
  <div class="container">
    <div class="top">
      <el-select size="mini" style="width:130px;margin-bottom:5px;" v-model="search.field">
        <el-option v-for="item in option" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-input size="mini" style="width:130px;margin-bottom:5px;" v-model="search.keyword"></el-input>
      <el-select
        size="mini"
        style="width:130px;margin-bottom:5px;"
        v-model="search.sex"
        placeholder="请选择性别"
      >
        <el-option
          v-for="item in option1"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-select
        size="mini"
        style="width:130px;margin-bottom:5px;"
        v-model="search.company_name"
        placeholder="请选择所在公司"
      >
        <el-option v-for="item in option2" :key="item.value" :label="item.name" :value="item.name"></el-option>
      </el-select>
      <el-select
        size="mini"
        style="width:140px;margin-bottom:5px;"
        v-model="search.school_name"
        placeholder="请选择所在校区"
      >
        <el-option v-for="item in option3" :key="item.value" :label="item.name" :value="item.name"></el-option>
      </el-select>
      <el-select
        size="mini"
        style="width:140px;margin-bottom:5px;"
        v-model="search.department_name"
        placeholder="请选择所在部门"
      >
        <el-option v-for="item in option4" :key="item.value" :label="item.name" :value="item.name"></el-option>
      </el-select>
      <el-select
        size="mini"
        style="width:140px;margin-bottom:5px;"
        v-model="search.position_name"
        placeholder="请选择职位"
      >
        <el-option v-for="item in option5" :key="item.value" :label="item.name" :value="item.name"></el-option>
      </el-select>
      <el-select
        size="mini"
        style="width:140px;margin-bottom:5px;"
        v-model="search.nature_name"
        placeholder="请选择性质"
      >
        <el-option v-for="item in option6" :key="item.value" :label="item.label" :value="item.name"></el-option>
      </el-select>
      <el-select
        size="mini"
        style="width:140px;margin-bottom:5px;"
        v-model="search.employee_status_name"
        placeholder="请选择状态"
      >
        <el-option v-for="item in option7" :key="item.value" :label="item.label" :value="item.name"></el-option>
      </el-select>
      <el-select size="mini" style="width:140px;margin-bottom:5px;" v-model="search.field_date">
        <el-option
          v-for="item in option8"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-date-picker
        size="mini"
        @change="changeDate(date)"
        value-format="yyyy-MM-dd"
        v-model="date"
        type="daterange"
        :clearable="false"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
      <el-button
        size="mini"
        type="primary"
        icon="el-icon-search"
        class="handleSearch"
        @click="handleSearch()"
      >查询</el-button>
      <el-button
        size="mini"
        type="warning"
        class="handleSearch"
        icon="el-icon-circle-close"
        @click="empty()"
      >清空</el-button>
      <el-button
        type="info"
        size="mini"
        v-if="permission.export"
        icon="el-icon-tickets"
        @click="derive()"
      >导出</el-button>
      <el-button
        size="mini"
        type="danger"
        v-if="permission.del"
        icon="el-icon-delete"
        @click="handleDelete()"
      >删除</el-button>
      <el-button
        size="mini"
        type="success"
        v-if="permission.add"
        icon="el-icon-circle-plus"
        @click="handleAddAdmin()"
      >新增</el-button>
      <el-button
        size="mini"
        type="success"
        icon="el-icon-s-custom"
        @click="welcome()"
      >入职欢迎</el-button>
      <el-button
        size="mini"
        type="success"
        icon="el-icon-user-solid"
        @click="welcomeall()"
      >全员入职欢迎</el-button>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      empty-text="暂无数据"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="index" width="50" align="center"></el-table-column>
      <el-table-column type="selection" width="50" align="center"></el-table-column>
      <el-table-column prop="job_number" label="工号" align="center"></el-table-column>
      <el-table-column label="中文姓名" align="center">
        <template slot-scope="scope">
          <p class="name" @click="particulars(scope)">{{scope.row.cn_name}}</p>
        </template>
      </el-table-column>
      <el-table-column prop="en_name" label="英文姓名" align="center"></el-table-column>
      <el-table-column prop="phoneMsg" label="联系方式" align="center"></el-table-column>
      <el-table-column prop="sexMsg" label="性别" align="center"></el-table-column>
      <el-table-column prop="birth_date" label="生日" align="center"></el-table-column>
      <el-table-column prop="company_name" label="所在公司" align="center"></el-table-column>
      <el-table-column prop="school_name" label="所在校区" align="center"></el-table-column>
      <el-table-column prop="department_name" label="所在部门" align="center"></el-table-column>
      <el-table-column prop="position_name" label="职位名称" align="center"></el-table-column>
      <el-table-column prop="nature_name" label="岗位性质" align="center"></el-table-column>
      <el-table-column prop="employee_status_name" label="状态" align="center"></el-table-column>
      <el-table-column prop="entry_date" label="入职日期" align="center"></el-table-column>
      <el-table-column prop="formal_date" label="转正日期" align="center"></el-table-column>
      <el-table-column prop="quit_date" label="离职日期" align="center"></el-table-column>
      <el-table-column prop="achievement_times" label="考核次数" align="center"></el-table-column>

      <el-table-column label="绩效考核" align="center">
        <template slot-scope="scope">
          <p class="name" @click="check(scope)">考核</p>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <pagination @page="handleSizeChange" @pagesize="handleCurrentChange" :pageData="pageData"></pagination>
    <!-- dialog -->
    <staffDialog :dialog="dialog" @upData="getData"></staffDialog>
    <!-- dialog详情 -->
    <particularsDialog :dialogs="dialogs"></particularsDialog>
    <!-- dialog考核 -->
    <checkDialog :checkDialogs="checkDialogs"></checkDialog>
  </div>
</template>
<script>
import Pagination from "@/components/pagination";
import StaffDialog from "@/components/staff/staffDialog/index";
import ParticularsDialog from "@/components/staff/particularsDialog/index";
import CheckDialog from "@/components/staff/checkDialog/index";
import {
  selectEmployee,
  delEmployee,
  appraiseEmployee,
  sendWelcome,
  sendAllWelcome
} from "@/api/staff/staffList";
import { selectOptionList } from "@/api/setting/setting";
import { getToken } from "@/utils/auth";
export default {
  components: {
    pagination: Pagination,
    staffDialog: StaffDialog,
    particularsDialog: ParticularsDialog,
    checkDialog: CheckDialog
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
      option: [
        {
          value: "job_number",
          label: "工号"
        },
        {
          value: "cn_name",
          label: "中文姓名"
        },
        {
          value: "en_name",
          label: "英文姓名"
        },
        {
          value: "phone",
          label: "联系方式"
        }
      ],
      option1: [
        {
          value: 1,
          label: "男"
        },
        {
          value: 2,
          label: "女"
        }
      ],
      option2: [],
      option3: [],
      option4: [],
      option5: [],
      option6: [],
      option7: [],
      option8: [
        {
          value: "entry_date",
          label: "入职日期"
        },
        {
          value: "formal_date",
          label: "转正日期"
        },
        {
          value: "quit_date",
          label: "离职日期"
        }
      ],

      search: {
        field: "job_number",
        keyword: "",
        sex: "",
        company_name: "",
        school_name: "",
        department_name: "",
        position_name: "",
        nature_name: "",
        employee_status_name: "",
        start_date: "",
        field_date: "entry_date",
        end_date: "",
        ids: ""
      },
      date: null,
      //dialog信息
      dialog: {
        centerDialogVisible: false
      },
      //dialog详情信息
      dialogs: {
        centerDialogVisible: false,
        id: ""
      },
      //考核
      checkDialogs: {
        centerDialogVisible: false,
        id: ""
      },
      permission: {}
    };
  },
  created() {
    this.getData();
  },
  methods: {
    //获取页面数据
    getData() {
      if (this.date) {
        this.search.start_time = this.date[0];
        this.search.end_time = this.date[1];
      }
      let data = {
        limit: this.pageData.pageSize,
        page: this.pageData.page,
        field: this.search.field,
        keyword: this.search.keyword,
        sex: this.search.sex,
        company_name: this.search.company_name,
        school_name: this.search.school_name,
        department_name: this.search.department_name,
        position_name: this.search.position_name,
        nature_name: this.search.nature_name,
        employee_status_name: this.search.employee_status_name,
        field_date: this.search.field_date,
        start_date: this.search.start_date,
        end_date: this.search.end_date
      };

      selectEmployee(data)
        .then(res => {
          if (res.code == 0) {
            res.data.data.forEach(res => {
              res.sexMsg = res.sex == 1 ? "男" : "女";
              res.phoneMsg = this.noPassByName(res.phone)
            });
            this.tableData = res.data.data;
            this.permission = res.data.btn_status;
            this.pageData.page = res.data.current_page;
            this.pageData.pagesize = res.data.per_page;
            this.pageData.total = res.data.total;
          }
        })
        .catch(err => {
          console.log(err);
        });
      selectOptionList().then(res => {
        this.option2 = res.data[3];
        this.option3 = res.data[4];
        this.option4 = res.data[5];
        this.option5 = res.data[6];
        this.option6 = res.data[7];
        this.option7 = res.data[8];
      });
    },
    // 考核
    check(scope) {
      let data = {
        id: scope.row.id
      };
      appraiseEmployee(data)
        .then(res => {
          if (res.code == 0) {
            this.checkDialogs = {
              centerDialogVisible: true,
              id: scope.row.id
            };
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //删除
    handleDelete() {
      if (this.search.ids == "") {
        this.$message({
          type: "info",
          message: "请勾选员工"
        });
      } else {
        this.$confirm("是否删除?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            let data = {
              ids: this.search.ids
            };
            delEmployee(data).then(res => {
              if (res.code == 0) {
                this.$message({
                  message: res.message || res.msg,
                  type: "success"
                });
                this.getData();
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    },
    // 本地搜索
    handleSearch() {
      if (this.date) {
        this.search.start_time = this.date[0];
        this.search.end_time = this.date[1];
      }
      this.pageData.page = 1;
      this.getData();
    },

    // 导出
    derive() {
      this.$confirm("是否导出?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (this.date) {
            this.search.start_time = this.date[0];
            this.search.end_time = this.date[1];
          }
          let link = document.createElement("a");
          link.href =
            this.$axios.defaults.baseURL +
            "/api/employee/export?token=" +
            getToken() +
            "&ids=" +
            this.search.ids +
            "&field=" +
            this.search.field +
            "&keyword=" +
            this.search.keyword +
            "&sex=" +
            this.search.sex +
            "&company_name=" +
            this.search.company_name +
            "&school_name=" +
            this.search.school_name +
            "&department_name=" +
            this.search.department_name +
            "&position_name=" +
            this.search.position_name +
            "&nature_name=" +
            this.search.nature_name +
            "&employee_status_name=" +
            this.search.employee_status_name +
            "&field_date=" +
            this.search.field_date +
            "&start_date=" +
            this.search.start_date +
            "&end_date=" +
            this.search.end_date;

          link.click();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消导出"
          });
        });
    },
    welcome() {
      if (this.search.ids == "") {
        this.$message({
          type: "info",
          message: "请勾选面试人员"
        });
      } else {
        this.$confirm("是否发送入职欢迎?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            let data = {
              empid: this.search.ids
            };
            sendWelcome(data).then(res => {
              if (res.code == 0) {
                this.$message({
                  message: res.message || res.msg,
                  type: "success"
                });
                this.getData();
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消"
            });
          });
      }
    },
    //全员入职欢迎
    welcomeall() {
      this.$confirm("是否发送全员入职欢迎?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          sendAllWelcome().then(res => {
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
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    noPassByName(str) {
      return str.substring(0, 3) + "****" + str.substring(7, str.length);
    },

    changeDate(e) {
      this.search.start_date = e[0];
      this.search.end_date = e[1];
    },
    //添加
    handleAddAdmin() {
      this.dialog.centerDialogVisible = true;
    },
    //详情
    particulars(scope) {
      if (this.permission.show) {
        this.dialogs.centerDialogVisible = true;
        this.dialogs.id = scope.row.id;
      }
    },
    //清空
    empty() {
      this.date = "";
      this.search = {
        field: "job_number",
        keyword: "",
        sex: "",
        company_name: "",
        school_name: "",
        department_name: "",
        position_name: "",
        nature_name: "",
        employee_status_name: "",
        start_date: "",
        end_date: "",
        field_date: "entry_date",
        ids: ""
      };
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
    handleSelectionChange(val) {
      this.search.ids = "";
      let arr = [];
      val.forEach(res => {
        arr.push(res.id);
      });
      this.search.ids = arr.join(",") || "";
      console.log(this.search);
    }
  }
};
</script>
<style scoped>
.top {
  position: relative;
  margin-bottom: 5px;
}

.add {
  position: absolute;
  right: 0;
  top: 4px;
}
.pagination {
  text-align: right;
  padding: 10px;
}
.name {
  color: #409eff;
  cursor: pointer;
}
</style>