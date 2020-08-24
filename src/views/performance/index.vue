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
      <el-input style="width:120px" size="mini" v-model="search.face_cn_name" placeholder="请输入面谈人"></el-input>
      <el-date-picker
        size="mini"
        @change="interviewDates(interviewDate)"
        value-format="yyyy-MM-dd"
        v-model="interviewDate"
        type="daterange"
        :clearable="false"
        range-separator="至"
        start-placeholder="面谈开始日期"
        end-placeholder="面谈结束日期"
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
      <!-- <el-button
        size="mini"
        type="success"
        v-if="permission.add"
        icon="el-icon-circle-plus"
        @click="handleAddAdmin()"
      >新增</el-button> -->
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
      <el-table-column label="中文姓名" align="center">
        <template slot-scope="scope">
          <p class="name" @click="particulars(scope)">{{scope.row.cn_name}}</p>
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="联系方式" align="center"></el-table-column>
      <el-table-column prop="sexMsg" label="性别" align="center"></el-table-column>
      <el-table-column prop="company_name" label="所在公司" align="center"></el-table-column>
      <el-table-column prop="school_name" label="所在校区" align="center"></el-table-column>
      <el-table-column prop="department_name" label="所在部门" align="center"></el-table-column>
      <el-table-column prop="position_name" label="职位名称" align="center"></el-table-column>
      <el-table-column prop="nature_name" label="岗位性质" align="center"></el-table-column>
      <el-table-column prop="employee_status_name" label="状态" align="center"></el-table-column>
      <el-table-column prop="employee_status_name" label="绩效与考核周期" align="center">
        <template slot-scope="scope">{{scope.row.start_date}}至{{scope.row.end_date}}</template>
      </el-table-column>
      <el-table-column prop="face_cn_name" label="面谈人" align="center"></el-table-column>
      <el-table-column prop="face_date" label="面谈时间" align="center"></el-table-column>

      <el-table-column label="员工确认" align="center">
        <template slot-scope="scope">
          <p class="name" v-if="scope.row.status !=1" @click="check(scope)">未确认</p>
          <p v-else>已确认</p>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <pagination @page="handleSizeChange" @pagesize="handleCurrentChange" :pageData="pageData"></pagination>

    <!-- dialog详情 -->
    <particularsDialog :dialogs="dialogs"></particularsDialog>
    <!-- dialog考核 -->
    <checkDialog :checkDialogs="checkDialogs"></checkDialog>
    <!-- 添加考核 -->
    <performanceDialog :dialog="dialog" @upData="getData"></performanceDialog>
  </div>
</template>
<script>
import Pagination from "@/components/pagination";
import ParticularsDialog from "@/components/performance/particularsDialog/index";
import PerformanceDialog from "@/components/performance/performanceDialog/index";
import {
  selectAchievement,
  delAchievement
} from "@/api/performance/performanceList";
import { selectOptionList } from "@/api/setting/setting";
import CheckDialog from "@/components/performance/checkDialog/index";
import { getToken } from "@/utils/auth";
export default {
  components: {
    pagination: Pagination,
    particularsDialog: ParticularsDialog,
    checkDialog: CheckDialog,
    performanceDialog: PerformanceDialog,
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
        field_date: "entry_date",
        start_date: "",
        end_date: "",
        face_cn_name: "",
        face_start_date: "",
        face_end_date: "",
        ids: ""
      },
      date: null,
      interviewDate: null,
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
        date: [],
        name: "",
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
        end_date: this.search.end_date,
        face_cn_name: this.search.face_cn_name,
        face_start_date: this.search.face_start_date,
        face_end_date: this.search.face_end_date
      };

      selectAchievement(data)
        .then(res => {
          if (res.code == 0) {
            res.data.data.forEach(res => {
              res.sexMsg = res.sex == 1 ? "男" : "女";
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
    // 确认
    check(scope) {
      if (scope.row.status == 0) {
         this.$message({
          type: "info",
          message: "请上级主管先填写考核成绩"
        });
      } else {
        this.checkDialogs.centerDialogVisible = true;
        this.checkDialogs.id = scope.row.id;
        this.checkDialogs.name = scope.row.cn_name;
        this.checkDialogs.date.push(scope.row.start_date);
        this.checkDialogs.date.push(scope.row.end_date);
      }
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
            delAchievement(data).then(res => {
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
    changeDate(e) {
      this.search.start_date = e[0];
      this.search.end_date = e[1];
    },
    interviewDates(e) {
      this.search.face_start_date = e[0];
      this.search.face_end_date = e[1];
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
            "/api/achievement/export?token=" +
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
            this.search.start_date +
            "&face_cn_name=" +
            this.search.face_cn_name +
            "&face_start_date=" +
            this.search.face_start_date +
            "&face_end_date=" +
            this.search.face_end_date;
          link.click();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消导出"
          });
        });
    },
    //添加
    handleAddAdmin() {
      this.dialog.centerDialogVisible = true;
    },
    //详情
    particulars(scope) {
      console.log(scope);
      this.dialogs.centerDialogVisible = true;
      this.dialogs.id = scope.row.id;
    },
    //清空
    empty() {
      this.date = [];
      this.interviewDate = [];
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
        face_cn_name: "",
        face_start_date: "",
        face_end_date: "",
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