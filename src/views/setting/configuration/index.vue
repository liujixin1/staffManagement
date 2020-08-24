<template>
  <div class="main">
    <div class="interview">
      <div class="title">面试信息表配置</div>
      <div class="btnList">
        <el-button v-if="permission.offer" @click="showDialog(1)">应聘职位配置</el-button>
        <el-button v-if="permission.intended" @click="showDialog(2)">意向工作地点配置</el-button>
        <el-button v-if="permission.channel" @click="showDialog(3)">入司渠道配置</el-button>
        <el-button v-if="permission.channel" @click="showDialog(16)">面试邀约人</el-button>

        <!-- <el-button v-if="permission.tpl" @click="showDialog(4)">短信模板配置</el-button> -->
      </div>
    </div>
    <div class="staff">
      <div class="title">员工信息表配置</div>
      <div class="btnList">
        <el-button class="item" v-if="permission.company" @click="showDialog(5)">一级部门配置</el-button>
        <el-button class="item" v-if="permission.school" @click="showDialog(6)">二级部门配置</el-button>
        <el-button class="item" v-if="permission.department" @click="showDialog(7)">三级部门配置</el-button>
        <el-button class="item" v-if="permission.position" @click="showDialog(8)">职位名称配置</el-button>
        <el-button class="item" v-if="permission.nature" @click="showDialog(9)">岗位性质配置</el-button>
        <el-button class="item" v-if="permission.status" @click="showDialog(10)">状态配置</el-button>
        <el-button class="item" v-if="permission.lessons_level" @click="showDialog(11)">授课级别</el-button>
        <el-button class="item" v-if="permission.teacher_type" @click="showDialog(12)">教师类别</el-button>
        <el-button class="item" v-if="permission.teacher_star" @click="showDialog(13)">教师星级</el-button>
        <el-button class="item" v-if="permission.position_type" @click="showDialog(14)">岗位类别</el-button>
        <el-button class="item" v-if="permission.contract_type" @click="showDialog(15)">合同性质</el-button>
      </div>
    </div>
    <div class="staff">
      <div class="title">邮箱配置</div>
      <div class="btnList">
        <el-button class="item" v-if="permission.find_CEO_email" @click="showEmailDialog(1)">CEO邮箱</el-button>
        <el-button class="item" v-if="permission.find_HRD_email" @click="showEmailDialog(2)">HED邮箱</el-button>
        <el-button class="item" v-if="permission.find_SSC_email" @click="showEmailDialog(3)">SSC邮箱</el-button>
      </div>
    </div>
    <!-- dialog -->
    <configurationDialog :dialog="dialog"></configurationDialog>
    <!-- 职位dialog -->
    <jobTitleDialog :jobTitle="jobTitle"></jobTitleDialog>
    <emailDialog  :emailsDialog="emailsDialog"></emailDialog>

  </div>
</template>
<script>
import ConfigurationDialog from "@/components/setting/configuration/configurationDialog";
import JobTitleDialog from "@/components/setting/configuration/jobTitleDialog";
import { selectOption } from "@/api/setting/setting";
import EmailDialog from "@/components/setting/emailDialog";


export default {
  components: {
    configurationDialog: ConfigurationDialog,
    jobTitleDialog: JobTitleDialog,
    emailDialog:EmailDialog

  },
  data() {
    return {
      dialog: {
        centerDialogVisible: false,
        name: "",
        id: ""
      },
      emailsDialog: {
        centerDialogVisible: false,
        name: "",
        id: ""
      },
      jobTitle: {
        centerDialogVisible: false
      },
      permission: {}
    };
  },
  created() {
    //页面数据
    this.getData();
  },
  methods: {
    getData() {
      selectOption().then(res => {
        if (res.code == 0) {
          this.permission = res.data.btn_status;
        }
      });
    },
    showEmailDialog(id) {
      switch (id) {
        case 1:
          this.emailsDialog = {
            centerDialogVisible: true,
            name: "CEO邮箱",
            id: id
          };
          break;
        case 2:
          this.emailsDialog = {
            centerDialogVisible: true,
            name: "HED邮箱",
            id: id
          };
          break;
        case 3:
          this.emailsDialog = {
            centerDialogVisible: true,
            name: "SSC邮箱",
            id: id
          };
          break;
      }
    },
    showDialog(id) {
      switch (id) {
        case 1:
          this.dialog = {
            centerDialogVisible: true,
            name: "应聘职位",
            id: id
          };
          break;
        case 2:
          this.dialog = {
            centerDialogVisible: true,
            name: "意向工作地点",
            id: id
          };
          break;
        case 3:
          this.dialog = {
            centerDialogVisible: true,
            name: "入司渠道",
            id: id
          };
          break;
        case 4:
          this.dialog = {
            centerDialogVisible: true,
            name: "短信模板",
            id: id
          };
          break;
        case 5:
          this.dialog = {
            centerDialogVisible: true,
            name: "一级部门配置",
            id: id
          };
          break;
        case 6:
          this.dialog = {
            centerDialogVisible: true,
            name: "二级部门配置",
            id: id
          };
          break;
        case 7:
          this.dialog = {
            centerDialogVisible: true,
            name: "三级部门配置",
            id: id
          };
          break;
        case 8:
          this.jobTitle = {
            centerDialogVisible: true
          };
          break;
        case 9:
          this.dialog = {
            centerDialogVisible: true,
            name: "岗位性质",
            id: id
          };
          break;
        case 10:
          this.dialog = {
            centerDialogVisible: true,
            name: "状态配置",
            id: id
          };
          break;
        case 11:
          this.dialog = {
            centerDialogVisible: true,
            name: "授课级别",
            id: id
          };
          break;
        case 12:
          this.dialog = {
            centerDialogVisible: true,
            name: "教师类别",
            id: id
          };
          break;
        case 13:
          this.dialog = {
            centerDialogVisible: true,
            name: "教师星级",
            id: id
          };
          break;
        case 14:
          this.dialog = {
            centerDialogVisible: true,
            name: "岗位类别",
            id: id
          };
          break;
        case 15:
          this.dialog = {
            centerDialogVisible: true,
            name: "合同性质",
            id: id
          };
          break;
        case 16:
          this.dialog = {
            centerDialogVisible: true,
            name: "面试邀约人",
            id: id
          };
          break;
      }
    }
  }
};
</script>

<style scoped>
.main {
  margin-left: 50px;
}
.title {
  height: 80px;
  line-height: 80px;
  color: #409eff;
}
.item {
  margin-bottom: 10px;
}
.btnList {
  width: 80%;
}
</style>
