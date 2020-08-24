<template>
  <div class="container">
    <div class="title">
      <div class="titleBg"></div>
      <div class="titleInit">麦禾教育员工绩效面谈记录表</div>
      <img class="titleImg" src="@/assets/title_2.jpg" />
    </div>
    <div class="main" v-if="showMain">
      <el-form
        class="form"
        ref="form"
        :rules="rules"
        :model="formData"
        label-width="150px"
        label-position="left"
      >
        <el-form-item label="所在部门：">
          <el-input v-model="formData.department_name" disabled placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="职位名称：">
          <el-input v-model="formData.position_name" disabled placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="姓名：">
          <el-input v-model="formData.cn_name" disabled />
        </el-form-item>
        <el-form-item label="入职日期：">
          <el-input v-model="formData.entry_date" disabled />
        </el-form-item>
        <el-form-item label="考核周期：" prop="start_date">
          <el-date-picker
            :disabled="true"
            v-model="date"
            type="daterange"
            range-separator="至"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <div class="list">
          <el-button
            class="add"
            size="small"
            type="primary"
            icon="el-icon-circle-plus"
            @click="addHome()"
          >新增</el-button>
          <div class="main" v-for="(phone, index) in formData.family" :key="index">
            <el-form-item
              label="考核项目："
              :prop="'family.' + index + '.project_name'"
              :rules="{
         required: true, message: '输入考核项目', trigger: 'blur'
         }"
            >
              <el-input  type="textarea" v-model="formData.family[index].project_name" placeholder="请输入考核项目" />
            </el-form-item>
            <el-form-item
              label="目标完成："
              :prop="'family.' + index + '.target'"
              :rules="{
         required: true, message: '输入目标完成', trigger: 'blur'
         }"
            >
              <el-input  type="textarea" v-model="formData.family[index].target" placeholder="请输入目标完成" />
            </el-form-item>
            <el-form-item
              label="实际完成："
              :prop="'family.' + index + '.real_complete'"
              :rules="{
         required: true, message: '输入实际完成', trigger: 'blur'
         }"
            >
              <el-input  type="textarea" v-model="formData.family[index].real_complete" placeholder="请输入实际完成" />
            </el-form-item>
            <el-form-item
              label="得分："
              :prop="'family.' + index + '.grade'"
              :rules="{
         required: true, message: '输入得分', trigger: 'blur'
         }"
            >
              <el-input  type="textarea" v-model="formData.family[index].grade" placeholder="请输入得分" />
            </el-form-item>
            <el-button
              v-if="index != 0"
              class="removes"
              size="small"
              type="danger"
              icon="el-icon-delete"
              @click="remove(index)"
            >删除</el-button>
          </div>
        </div>
        <el-form-item label="业绩与优点" prop="merit">
          <el-input v-model="formData.merit" type="textarea" placeholder="请输入业绩与优点" />
        </el-form-item>
        <el-form-item label="存在的不足" prop="defect">
          <el-input v-model="formData.defect" type="textarea" placeholder="请输入存在的不足" />
        </el-form-item>
        <el-form-item label="备注" prop="improvement_plan">
          <el-input v-model="formData.improvement_plan" type="textarea" placeholder="备注" />
        </el-form-item>
        <el-form-item label="主管签名">
          <div class="esign">
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
        </el-form-item>
      </el-form>
      <el-button type="primary" class="btn" @click="confirm()">确 定</el-button>
    </div>
    <div v-else class="mainMsg">提交已完成</div>
  </div>
</template>
<script>
import {
  findApplyAchievement,
  editApplyAchievement,
  base64Uploads
} from "@/api/performance/performanceList";
export default {
  data() {
    return {
      id: "",
      showMain: true,
      lineWidth: 6, //签名配置
      lineColor: "#000000", //签名配置
      bgColor: "#fff", //签名配置
      resultImg: "", //签名配置
      isCrop: false, //签名配置
      formData: {
        employee_id: "",
        start_date: "",
        end_date: "",
        merit: "",
        defect: "",
        improvement_plan: "",
        autograph: "",
        department_name: "",
        position_name: "",
        cn_name: "",
        entry_date: "",
        family: [
          {
            project_name: "",
            target: "",
            real_complete: "",
            grade: ""
          }
        ]
      },
      date: [],
      rules: {
        // start_date: [
        //   { required: true, message: "请选择开始时间", trigger: "change" }
        // ],
        // end_date: [
        //   { required: true, message: "请选择结束时间", trigger: "change" }
        // ],
        merit: [
          { required: true, message: "请填写业绩与优点", trigger: "blur" }
        ],
        defect: [
          { required: true, message: "请填写存在的不足", trigger: "blur" }
        ],
        improvement_plan: [
          { required: true, message: "请填写改进计划与内容", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    let id = this.$route.query.id;
    this.id = id;
    this.getData(id);
  },
  methods: {
    getData(id) {
      let data = {
        id
      };
      this.$axios
        .post("/api/achievement/findApplyAchievement", data)
        .then(res => {
          console.log(res);
          if (res.data.code == 0) {
            if (res.data.data.info.status != 0) {
              this.showMain = false;
            } else {
              this.showMain = true;
            }
            this.date.push(res.data.data.info.start_date);
            this.date.push(res.data.data.info.end_date);
            this.formData = {
              department_name: res.data.data.info.employee.department_name,
              position_name: res.data.data.info.employee.position_name,
              cn_name: res.data.data.info.employee.cn_name,
              employee_id: res.data.data.info.employee_id,
              start_date: res.data.data.info.start_date,
              end_date: res.data.data.info.end_date,
              merit: res.data.data.info.merit,
              defect: res.data.data.info.defect,
              entry_date: res.data.data.info.entry_date,
              improvement_plan: res.data.data.info.improvement_plan,
              autograph: "",
              family: [
                {
                  project_name: "",
                  target: "",
                  real_complete: "",
                  grade: ""
                }
              ]
            };
          }
        });
    },
    addHome() {
      this.formData.family.push({
        project_name: "",
        target: "",
        real_complete: "",
      });
    },
    // 删除
    remove(index) {
      this.formData.family.splice(index, 1);
    },
    //提交
    confirm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
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
                    id: this.id,
                    entry_date:this.formData.entry_date,
                    employee_id: this.formData.employee_id,
                    start_date: this.formData.start_date,
                    end_date: this.formData.end_date,
                    merit: this.formData.merit,
                    defect: this.formData.defect,
                    improvement_plan: this.formData.improvement_plan,
                    project:JSON.stringify(this.formData.family),
                    autograph: this.formData.autograph
                  };
                  editApplyAchievement(data).then(res => {
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
        }
      });
    },

    //手写板清空
    handleReset() {
      this.$refs.esign.reset();
      this.formData.autograph = "";
    }
  }
};
</script>
<style scoped>
.container {
  width: 550px;
  margin: 0 auto;
}
.title {
  width: 100%;
  height: 100%;
  position: relative;
}
.title .titleInit {
  position: absolute;
  bottom: 40px;
  left: 0;
  width: 100%;
  text-align: center;
  font-size: 20px;
  color: #fff;
  z-index: 200;
  font-weight: bold;
}
.title .titleBg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 150;
  background: rgba(0, 0, 0, 0.2);
}
.title .titleImg {
  display: block;
  width: 100%;
  height: auto;
}
.form {
  margin-top: 20px;
}
.esign {
  border: 1px dashed #dcdfe6;
  position: relative;
}
.remove {
  position: absolute;
  top: -10px;
  right: -10px;
  z-index: 100;
  font-size: 30px;
  color: #dcdfe6;
}
.btn {
  margin: 0 auto;
  display: block;
}
.mainMsg {
  text-align: center;
  margin-top: 100px;
  font-size: 20px;
  color: #999;
}
.list {
  position: relative;
  margin-bottom: 10px;
  background: #eee;
  padding: 10px;
}
.main {
  border-bottom: 1px solid #eee;
  margin-top: 10px;
}
.main:last-child {
  border-bottom: 0px solid #eee;
}
.add {
  margin-left: auto;
  display: block;
  /* margin-bottom: 10px; */
}
.removes {
  margin: 0 auto;
  display: block;
}
</style>