<template>
  <el-dialog
    @open="getData"
    center
    width="550px"
    :title="'是否发送'+formData.name+'绩效考核结果？'"
    :visible.sync="checkDialogs.centerDialogVisible"
  >
    <el-form ref="form" :rules="rules" :model="formData" label-width="100px" label-position="left">
      <el-form-item label="接收人：">
        <el-input style="width:200px" :disabled="true" v-model="formData.name" />
      </el-form-item>
      <el-form-item label="考核周期：" prop="date">
        <el-date-picker
          :disabled="true"
          v-model="formData.date"
          type="daterange"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <el-dialog width="35%" center title="内层 Dialog" :visible.sync="innerVisible" append-to-body></el-dialog>
    <div slot="footer" class="dialog-footer">
      <el-button @click="hideDialog">取 消</el-button>
      <el-button type="primary" @click="confirm">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { sendEmail } from "@/api/performance/performanceList";
export default {
  props: {
    checkDialogs: Object
  },
  data() {
    return {
      formData: {
        name: "",
        face_id: "",
        date: ""
      },
      rules: {
        date: [{ required: true, message: "选择时间", trigger: "change" }]
      },
      innerVisible: false
    };
  },
  created() {},
  methods: {
    getData() {
      this.formData.name = this.checkDialogs.name;
      this.formData.date = this.checkDialogs.date;
    },
    confirm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          let data = {
            id: this.checkDialogs.id
          };
          console.log(data);
          sendEmail(data)
            .then(res => {
              console.log(res);
              if (res.code == 0) {
                this.$message({
                  type: "success",
                  message: res.msg
                });
                this.hideDialog();
                this.$emit("upData");
              } else {
                this.$message({
                  type: "info",
                  message: res.msg
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    },
    hideDialog() {
      this.checkDialogs.centerDialogVisible = false;
    }
  }
};
</script>