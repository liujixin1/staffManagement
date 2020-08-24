<template>
  <div class="container">
    <el-dialog
      title="创建绩效考核"
      :visible.sync="dialog.centerDialogVisible"
      width="600px"
      center
      :lock-scroll="true"
      @close="hideDialog"
    >
      <el-form
        ref="form"
        :rules="rules"
        :model="formData"
        label-width="150px"
        label-position="left"
      >
        <el-form-item label="选择员工：" prop="employee_id">
          <el-select v-model="formData.employee_id" placeholder="请选择员工">
            <el-option
              v-for="item in option"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="考核开始时间：" prop="start_date">
          <el-date-picker v-model="formData.start_date" type="date" placeholder="选择考核开始时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="考核结束时间：" prop="end_date">
          <el-date-picker v-model="formData.end_date" type="date" placeholder="选择考核结束时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="业绩与优点：">
          <el-input v-model="formData.merit" type="textarea" placeholder="请输入角色描述" />
        </el-form-item>
        <el-form-item label="缺点：">
          <el-input v-model="formData.defect" type="textarea" placeholder="请输入角色描述" />
        </el-form-item>
        <el-form-item label="计划改进：">
          <el-input v-model="formData.improvement_plan" type="textarea" placeholder="请输入角色描述" />
        </el-form-item>
        <el-form-item label="选择面谈人：">
          <el-select v-model="formData.face_cn_name" placeholder="请选择面谈人">
            <el-option
              v-for="item in option"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="面谈时间：">
          <el-date-picker v-model="formData.face_date" type="date" placeholder="选择面谈时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="本人签名：">
          <div class="signCenter">
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
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  addAchievement,
  base64Uploads
} from "@/api/performance/performanceList";
export default {
  props: {
    dialog: Object
  },
  data() {
    return {
      option: [
        {
          lable: "我",
          value: 1
        }
      ],
      formData: {
        employee_id: "",
        start_date: "",
        end_date: "",
        merit: "",
        defect: "",
        improvement_plan: "",
        face_cn_name: "",
        face_date: "",
        face_id: "",
        autograph: "",
        autograph_date: ""
      },
      activeName: "first",
      lineWidth: 6,
      lineColor: "#000000",
      bgColor: "",
      resultImg: "",
      isCrop: false,
      rules: {
        name: [{ required: true, message: "填写角色名称", trigger: "blur" }],
        describe: [{ required: true, message: "填写描述", trigger: "blur" }]
      }
    };
  },
  methods: {
    hideDialog() {
      this.dialog.centerDialogVisible = false;
      this.$refs["form"].resetFields();
    },
    //手写板清空
    handleReset() {
      this.$refs.esign.reset();
      this.formData.autograph = "";
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
              console.log(this.formData, 1111);
              let data = {
                employee_id: this.formData.employee_id,
                start_date:this.formData.start_date,
                end_date: this.formData.end_date,
                merit: this.formData.merit,
                defect: this.formData.defect,
                improvement_plan:this.formData.improvement_plan,
                face_cn_name: this.formData.face_cn_name,
                face_date: this.formData.face_date,
                face_id: this.formData.face_id,
                autograph: this.formData.autograph,
                autograph_date: this.formData.autograph_date
              };
                addAchievement(data).then(res => {
                  if (res.code == 0) {
                    this.$message({
                      message: res.msg,
                      type: "success"
                    });
                    this.hideDialog();
              this.$emit("upData");
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
    //取消
    cancel() {
      this.hideDialog();
    }
  }
};
</script>
<style scoped>
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
</style>