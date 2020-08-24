<template>
  <div class="container">
    <el-dialog
      :title="emailsDialog.name"
      :visible.sync="emailsDialog.centerDialogVisible"
      width="50%"
      center
      :lock-scroll="true"
      :before-close="hideDialog"
      @open="getData"
    >
      <el-form ref="form" :model="formData" label-width="100px" label-position="left">
        <el-form-item label="邮箱：">
          <el-input v-model="formData.email" placeholder="请输入邮箱" />
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
  findCEOEmail,
  editCEOEmail,
  findHRDEmail,
  editHRDEmail,
  findSSCEmail,
  editSSCEmail
} from "@/api/setting/setting";
export default {
  props: {
    emailsDialog: Object
  },
  data() {
    return {
      formData: {
        email: ""
      }
    };
  },
  methods: {
    hideDialog() {
      this.emailsDialog.centerDialogVisible = false;
      this.formData.email = "";
    },
    check(email) {
      var reg = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/; //正则表达式

      if (email === "") {
        //输入不能为空
        return false;
      } else if (!reg.test(email)) {
        //正则验证不通过，格式不对
        return false;
      } else {
        return true;
      }
    },
    getData() {
      switch (this.emailsDialog.id) {
        case 1:
          findCEOEmail().then(res => {
            if (res.code == 0) {
              this.formData.email = res.data.name;
            }
          });
          break;
        case 2:
          findHRDEmail().then(res => {
            if (res.code == 0) {
              this.formData.email = res.data.name;
            }
          });
          break;
        case 3:
          findSSCEmail().then(res => {
            if (res.code == 0) {
              this.formData.email = res.data.name;
            }
          });
          break;
      }
    },
    //提交
    confirm() {
      console.log(this.emailsDialog.id);
      if (this.check(this.formData.email)) {
        let data = {
          name: this.formData.email
        };
        switch (this.emailsDialog.id) {
          case 1:
            editCEOEmail(data).then(res => {
              if (res.code == 0) {
                this.$message({
                  message: res.message || res.msg,
                  type: "success"
                });
                this.hideDialog();
              }
            });
            break;
          case 2:
            editHRDEmail(data).then(res => {
              if (res.code == 0) {
                this.$message({
                  message: res.message || res.msg,
                  type: "success"
                });
                this.hideDialog();
              }
            });
            break;

          case 3:
            editSSCEmail(data).then(res => {
              if (res.code == 0) {
                this.$message({
                  message: res.message || res.msg,
                  type: "success"
                });
                this.hideDialog();
              }
            });
            break;
        }
      } else {
        this.$message({
          message: "请正确输入邮箱",
          type: "info"
        });
      }
    },

    //取消
    cancel() {
      this.hideDialog();
    }
  }
};
</script>
<style scoped>
.tab {
  display: flex;
}
.tab .el-form-item {
  flex: 1;
}
</style>