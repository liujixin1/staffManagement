<template>
  <div class="container">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
      <tr>
        <td width="100%" align="center" colspan="4" class="title" height="60">员工绩效面谈记录表</td>
      </tr>
    </table>
    <table
      width="100%"
      border="0"
      cellspacing="1"
      cellpadding="4"
      bgcolor="#EBEEF5"
      class="main"
      align="center"
    >
      <tr>
        <td class="name" width="10%">姓名</td>
        <td colspan="2">{{employee.cn_name}}</td>
        <td class="name" width="10%">部门</td>
        <td colspan="2">{{employee.department_name}}</td>
        <td class="name" width="10%">岗位职务</td>
        <td colspan="2">{{employee.position_name}}</td>
      </tr>
      <tr>
        <td class="name" colspan="3" width="30%">绩效考核周期</td>
        <td width="60%" colspan="6">{{tableData.start_date}}至{{tableData.end_date}}</td>
      </tr>
      <tr>
        <td class="name" rowspan="3" width="10%">考 核 人 谈 话 要 点</td>
        <td class="name" colspan="2" width="20%">业绩与优点</td>
        <td width="60%" colspan="6">{{tableData.merit}}</td>
      </tr>
      <tr>
        <td class="name" colspan="2" width="20%">存在的不足</td>
        <td width="60%" colspan="6">{{tableData.defect}}</td>
      </tr>
      <tr>
        <td class="name" colspan="2" width="20%">备注</td>
        <td width="60%" colspan="6">{{tableData.improvement_plan}}</td>
      </tr>
      <tr>
        <td colspan="3" width="30%">上级主管签字</td>
        <td class="name" width="10%">签字：</td>
        <td colspan="2">
          <img class="photo" :src="this.baseUrl+tableData.autograph" alt />
        </td>
        <td class="name" width="10%">日期</td>
        <td colspan="2">{{tableData.autograph_date}}</td>
      </tr>
    </table>
    <el-table :data="tableEducation" border style="width: 100%" empty-text="暂无数据">
          <el-table-column prop="project_name" label="考核项目" align="center"></el-table-column>
          <el-table-column prop="target" label="目标完成" align="center"></el-table-column>
          <el-table-column prop="real_complete" label="实际完成" align="center"></el-table-column>
          <el-table-column prop="grade" label="得分" align="center"></el-table-column>
        </el-table>
    <p class="text">1、绩效改进计划由主管与员工在进行绩效面谈时共同沟通确认，作为员工工作改进依据。</p>
    <p class="text">2、绩效改进计划由上级主管与员工双方确认后签字生效，HR留存备案。</p>
    <div v-if="showMain">
      <div class="signCenter">
        <div class="signName">本人签名：</div>
        <div class="sign">
          <vue-esign
            ref="esign"
            :width="800"
            :height="300"
            :isCrop="isCrop"
            :lineWidth="lineWidth"
            :lineColor="lineColor"
            :bgColor.sync="bgColor"
          />
          <i @click="handleReset" class="el-icon-error remove"></i>
        </div>
      </div>
      <el-button type="primary" class="btn" @click="confirm()">确 定</el-button>
    </div>
    <div v-else class="mainMsg">提交已完成</div>
  </div>
</template>
<script>
import {
  confirmAchievement,
  findApplyAchievement,
  base64Uploads
} from "@/api/performance/performanceList";
export default {
  props: {
    dialogs: Object
  },
  data() {
    return {
      baseUrl: "",
      showMain: true,
      tableData: {},
      employee: {},
      tableEducation: null,
      tableWork: null,
      tableFamily: null,
      train: [],
      activeName: "first",
      lineWidth: 6,
      lineColor: "#000000",
      bgColor: "",
      resultImg: "",
      isCrop: false,
      formData: {
        id: "",
        autograph: ""
      }
    };
  },
  created() {
    let url = this.$axios.defaults.baseURL;
    let endlength = url.indexOf("/index");
    this.baseUrl = url.substring(0, endlength);
    let id = this.$route.query.id;
    this.formData.id = id;
    this.getData(id);
  },
  methods: {
    getData(id) {
      let data = {
        id
      };
      findApplyAchievement(data).then(res => {
        if (res.code == 0) {
          if (res.data.info.status == 1) {
              this.showMain = false;
            } else {
              this.showMain = true;
            }
          this.tableData = res.data.info;
          this.employee = res.data.info.employee;
          this.tableEducation=res.data.info.achievenment_project;
        }
      });
    },
    hideDialog() {
      this.dialogs.centerDialogVisible = false;
    },
    //提交
    confirm() {
      this.$refs.esign
        .generate()
        .then(res => {
          let data = {
            image: res
          };
          base64Uploads(data)
            .then(result => {
              if (result.code == 0) {
                this.formData.autograph = result.data.url;
              }
            })
            .then(() => {
              let data = {
                id: this.formData.id,
                emp_autograph: this.formData.autograph
              };
              confirmAchievement(data).then(res => {
                if (res.code == 0) {
                  this.$message({
                    message: res.msg,
                    type: "success"
                  });
                  this.showMain = false;
                } else {
                  this.$message({
                    message: res.msg,
                    type: "error"
                  });
                }
              });
            });
        })
        .catch(err => {
          this.$message({
            message: "请写入签名",
            type: "error"
          });
        });
    },
    //手写板清空
    handleReset() {
      this.$refs.esign.reset();
      this.formData.autograph = "";
    },
    //取消
    cancel() {
      this.hideDialog();
    }
  }
};
</script>
<style scoped>
.container {
  width: 60%;
  margin: 0 auto;
}
.main {
  /* margin-top: 10px; */
}
.main td {
  background-color: #ffffff;
  height: 48px;
  /* line-height: 40px; */
  color: #909399;
  font-size: 14px;
  text-align: center;
}
.title {
  font-size: 24px;
  font-weight: bold;
  color: #255e95;
}
.site {
  font-size: 16px;
  font-weight: bold;
  padding-top: 15px;
  padding-bottom: 10px;
}
.name {
  text-align: center;
  font-weight: bold;
  color: #909399;
  font-size: 14px;
}
.addfirm {
  margin: 10px 0;
  color: #909399;
}
.text {
  font-size: 12px;
  line-height: 18px;
  color: #909399;
}
.photo {
  width: 100px;
  height: auto;
}
.autograph {
  width: 60px;
}
.btn {
  margin: 0 auto;
  display: block;
  margin-top: 10px;
}
.signCenter {
  display: flex;
}
.signName {
  width: 100px;
}

.sign {
  border: 1px dashed #dcdfe6;
  position: relative;
  flex: 1;
}
.remove {
  position: absolute;
  top: -10px;
  right: -10px;
  z-index: 100;
  font-size: 30px;
  color: #dcdfe6;
}
.mainMsg {
  text-align: center;
  margin-top: 100px;
  font-size: 20px;
  color: #999;
}
</style>