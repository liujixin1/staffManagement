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
        v-model="search.offer_name"
        placeholder="请选择应聘岗位"
      >
        <el-option v-for="item in option2" :key="item.value" :label="item.name" :value="item.name"></el-option>
      </el-select>
      <el-select
        size="mini"
        style="width:140px;margin-bottom:5px;"
        v-model="search.intended_name"
        placeholder="请选择意向工作地点"
      >
        <el-option v-for="item in option3" :key="item.value" :label="item.name" :value="item.name"></el-option>
      </el-select>
      <el-select
        size="mini"
        style="width:140px;margin-bottom:5px;"
        v-model="search.channel_name"
        placeholder="请选择入司渠道"
      >
        <el-option v-for="item in option4" :key="item.value" :label="item.name" :value="item.name"></el-option>
      </el-select>
      <el-date-picker
        size="mini"
        @change="changeDate(date)"
        value-format="yyyy-MM-dd"
        v-model="date"
        type="daterange"
        :clearable="false"
        range-separator="至"
        start-placeholder="面试开始日期"
        end-placeholder="面试结束日期"
      ></el-date-picker>
      <el-select
        size="mini"
        style="width:140px;margin-bottom:5px;"
        v-model="search.view_hj"
        placeholder="请选择面试环节"
      >
        <el-option
          v-for="item in option5"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-select
        size="mini"
        style="width:140px;margin-bottom:5px;"
        v-model="search.view_result"
        placeholder="请选择面试结果"
      >
        <el-option
          v-for="item in option6"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
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
        v-if="permission.export"
        size="mini"
        icon="el-icon-tickets"
        @click="derive()"
      >导出</el-button>
      <el-button
        size="mini"
        v-if="permission.del"
        type="danger"
        icon="el-icon-delete"
        @click="handleDelete()"
      >删除</el-button>
      <el-button
        size="mini"
        v-if="permission.add"
        type="success"
        icon="el-icon-circle-plus"
        @click="handleAddAdmin()"
      >新增</el-button>
     
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
      <el-table-column prop="en_name" label="英文姓名" align="center"></el-table-column>
      <el-table-column prop="phone" label="联系方式" align="center"></el-table-column>
      <el-table-column prop="sexMsg" label="性别" align="center"></el-table-column>
      <el-table-column prop="offer_name" label="应聘职位" align="center"></el-table-column>
      <el-table-column prop="intended_name" label="意向工作地点" align="center"></el-table-column>
      <el-table-column prop="channel_name" label="入司渠道" align="center"></el-table-column>
      <el-table-column prop="view_date" label="面试日期" align="center"></el-table-column>
      <el-table-column prop="audition_invitation" label="面试邀约人" align="center"></el-table-column>

      <el-table-column label="面试环节" align="center">
        <template slot-scope="scope">
          <el-select
            :disabled="!permission.edit"
            v-model="scope.row.view_hj_msg"
            @change="link(scope)"
            placeholder="请选择面试环节"
          >
            <el-option
              v-for="item in view_hj"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="面试结果" align="center">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.view_result_msg"
            :disabled="!permission.edit"
            @change="result(scope)"
            placeholder="请选择面试结果"
          >
            <el-option
              v-for="item in view_result"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <pagination @page="handleSizeChange" @pagesize="handleCurrentChange" :pageData="pageData"></pagination>
    <!-- dialog -->
    <interviewDialog :dialog="dialog" @upData="getData"></interviewDialog>
    <!-- dialog详情 -->
    <particularsDialog :dialogs="dialogs"></particularsDialog>
  </div>
</template>
<script>
import Pagination from "@/components/pagination";
import InterviewDialog from "@/components/interview/interviewDialog/index";
import ParticularsDialog from "@/components/interview/particularsDialog/index";
import { selectOptionList } from "@/api/setting/setting";
import {
  selectInterview,
  delInterviewInfo,
  editInterviewOption,
  autoToEmployee,
 
} from "@/api/interview/interviewList";
import { getToken } from "@/utils/auth";
export default {
  components: {
    pagination: Pagination,
    interviewDialog: InterviewDialog,
    particularsDialog: ParticularsDialog
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
      option5: [
        {
          value: 0,
          label: "初试"
        },
        {
          value: 1,
          label: "复试"
        },
        {
          value: 2,
          label: "终试"
        }
      ],
      option6: [
        {
          value: 1,
          label: "通过"
        },
        {
          value: 2,
          label: "不通过"
        },
        {
          value: 3,
          label: "录用"
        }
      ],
      view_hj: [
        {
          value: 0,
          label: "初试"
        },
        {
          value: 1,
          label: "复试"
        },
        {
          value: 2,
          label: "终试"
        }
      ],
      view_result: [
        {
          value: 1,
          label: "通过"
        },
        {
          value: 2,
          label: "不通过"
        },
        {
          value: 3,
          label: "录用"
        },
        {
          value: 4,
          label: "入职"
        }
      ],
      search: {
        ids: "",
        field: "cn_name",
        keyword: "",
        sex: "",
        offer_name: "",
        intended_name: "",
        channel_name: "",
        start_time: "",
        end_time: "",
        view_hj: "",
        view_result: ""
      },
      date: null,
      //dialog信息
      dialog: {
        centerDialogVisible: false,
        dialogType: "",
        id: ""
      },
      //dialog详情信息
      dialogs: {
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
      let data = {
        limit: this.pageData.pageSize,
        page: this.pageData.page,
        field: this.search.field,
        keyword: this.search.keyword,
        sex: this.search.sex,
        offer_name: this.search.offer_name,
        intended_name: this.search.intended_name,
        channel_name: this.search.channel_name,
        view_hj: this.search.view_hj,
        view_result: this.search.view_result,
        start_date: this.search.start_time,
        end_date: this.search.end_time
      };

      selectInterview(data)
        .then(res => {
          if (res.code == 0) {
            res.data.data.forEach(data => {
              data.sexMsg = data.sex == 1 ? "男" : "女";
              switch (data.view_hj) {
                case 0:
                  data.view_hj_msg = "初试";
                  break;
                case 1:
                  data.view_hj_msg = "复试";
                  break;
                case 2:
                  data.view_hj_msg = "终试";
                  break;
              }
              switch (data.view_result) {
                case 1:
                  data.view_result_msg = "通过";
                  break;
                case 2:
                  data.view_result_msg = "不通过";
                  break;
                case 3:
                  data.view_result_msg = "录取";
                  break;
                case 4:
                  data.view_result_msg = "入职";
                  break;
              }
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
        this.option2 = res.data[0];
        this.option3 = res.data[1];
        this.option4 = res.data[2];
      });
    },
    //选择面试环节
    link(scope) {
      let data = {
        id: scope.row.id,
        view_hj: scope.row.view_hj_msg
      };
      editInterviewOption(data)
        .then(res => {
          this.$message({
            type: "success",
            message: res.message || res.msg
          });
        })
        .catch(() => {
          this.getData();
          this.$message({
            type: "info",
            message: "已取消转为正式员工"
          });
        });
    },
    //选择面试结果
    result(scope) {
      //  return
      if (scope.row.view_result_msg == 4) {
        this.$confirm("是否转为正式员工?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            let data = {
              id: scope.row.id,
              view_result: scope.row.view_result_msg
            };
            let datas = {
              id: scope.row.id,
              phone: scope.row.phone
            };
            editInterviewOption(data).then(res => {
              console.log(res);
            });
            autoToEmployee(datas).then(res => {
              if (res.code == 0) {
                this.$alert("已转为正式员工", {
                  confirmButtonText: "确定",
                  center: true,
                  callback: action => {
                    this.$message({
                      type: "success",
                      message: res.message || res.msg
                    });
                  }
                });
              }
            });
          })
          .catch(() => {
            this.getData();
            this.$message({
              type: "info",
              message: "已取消转为正式员工"
            });
          });
      } else {
        let data = {
          id: scope.row.id,
          view_result: scope.row.view_result_msg
        };
        editInterviewOption(data).then(res => {
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
      }
      
    },
    changeDate(e) {
      this.search.start_date = e[0];
      this.search.end_date = e[1];
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
            "/api/interview/export?token=" +
            getToken() +
            "&ids=" +
            this.search.ids +
            "&sex=" +
            this.search.sex +
            "&field=" +
            this.search.field +
            "&keyword=" +
            this.search.keyword +
            "&offer_name=" +
            this.search.offer_name +
            "&intended_name=" +
            this.search.intended_name +
            "&channel_name=" +
            this.search.channel_name +
            "&view_hj=" +
            this.search.view_hj +
            "&view_result=" +
            this.search.view_result +
            "&start_date=" +
            this.search.start_time +
            "&end_date=" +
            this.search.end_time;
          link.click();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消导出"
          });
        });
    },
    //删除
    handleDelete() {
      if (this.search.ids == "") {
        this.$message({
          type: "info",
          message: "请勾选面试人员"
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
            delInterviewInfo(data).then(res => {
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
    //入职欢迎
    
    //添加
    handleAddAdmin() {
      this.dialog.centerDialogVisible = true;
    },
    //详情
    particulars(scope) {
      this.dialogs.centerDialogVisible = true;
      this.dialogs.id = scope.row.id;
    },

    //清空
    empty() {
      this.date = "";
      this.search = {
        ids: "",
        field: "cn_name",
        keyword: "",
        sex: "",
        offer_name: "",
        intended_name: "",
        channel_name: "",
        start_time: "",
        end_time: "",
        view_hj: "",
        view_result: ""
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