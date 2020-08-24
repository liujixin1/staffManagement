<template>
  <div class="container">
    <div class="top">
      <el-input
        style="width:200px;margin-bottom:5px"
        v-model="search.goods_name"
        placeholder="请输入操作人"
        clearable
      ></el-input>
      <el-date-picker
        value-format="yyyy-MM-dd"
        v-model="date"
        type="daterange"
        :clearable="false"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
      <el-button
        size="small"
        type="primary"
        icon="el-icon-search"
        class="handleSearch"
        @click="handleSearch()"
      >查询</el-button>
      <el-button
        size="small"
        type="danger"
        class="handleSearch"
        icon="el-icon-delete"
        @click="empty()"
      >清空</el-button>
      <el-button
        type="info"
        size="mini"
        v-if="permission.export"
        icon="el-icon-tickets"
        @click="derive()"
      >导出</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%" empty-text="暂无数据">
      <el-table-column type="index" width="50" align="center"></el-table-column>
      <el-table-column prop="opt_desc" label="操作" align="center"></el-table-column>
      <el-table-column prop="remark" label="内容" align="center"></el-table-column>
      <el-table-column prop="operator_name" label="操作人" align="center"></el-table-column>
      <el-table-column prop="opt_time" label="操作时间" align="center"></el-table-column>
    </el-table>
    <!-- 分页 -->
    <pagination @page="handleSizeChange" @pagesize="handleCurrentChange" :pageData="pageData"></pagination>
  </div>
</template>
<script>
import Pagination from "@/components/pagination";
import { selectOperationLog } from "@/api/log/logList";
import { getToken } from "@/utils/auth";
export default {
  components: {
    pagination: Pagination
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
      search: {
        goods_name: "",
        start_time: "",
        end_time: ""
      },
      date: null,
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
        operator_name: this.search.goods_name,
        start_date: this.search.start_time,
        end_date: this.search.end_time
      };

      selectOperationLog(data)
        .then(res => {
          if (res.code == 0) {
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
          let link = document.createElement("a");
          link.href =
            this.$axios.defaults.baseURL +
            "/api/operation/export?token=" +
            getToken() +
            "&operator_name=" +
            this.search.goods_name +
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
    //清空
    empty() {
      this.date = "";
      this.search = {
        goods_name: "",
        start_time: "",
        end_time: ""
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
</style>