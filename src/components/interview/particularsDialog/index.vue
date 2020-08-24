<template>
  <div class="container">
    <el-dialog
      title="面试信息"
      :visible.sync="dialogs.centerDialogVisible"
      width="766px"
      center
      :lock-scroll="true"
      @open="getData"
    >
      <div class="top">
        <div class="topName" :class="{active:show==1}" @click="btn(1)">职位申请表</div>
        <div class="topName" :class="{active:show==2}" @click="btn(2)">面试测评</div>
      </div>
      <div v-if="show==1">
        <el-button type="primary" @click="PrintRow">打 印</el-button>
        <section ref="print" class="recordImg" id="printRecord">
          <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
            <tr>
              <td width="100%" align="center" colspan="2" class="title" height="60">职位申请表</td>
            </tr>
            <tr>
              <td width="50%" align="left" height="25">应聘职位：{{tableData.offer_name}}</td>
              <td width="50%" align="right" height="25">意向工作地点：{{tableData.intended_name}}</td>
            </tr>
          </table>
          <div class="site">基本信息</div>
          <table
            width="100%"
            border="0"
            cellpadding="4"
            cellspacing="0"
            bgcolor="#cccccc"
            class="main"
            align="center"
          >
            <tr>
              <td class="name" width="10%">中文姓名</td>
              <td width="10%">{{tableData.cn_name}}</td>
              <td class="name" width="10%">性别</td>
              <td width="10%">{{tableData.sexMsg}}</td>
              <td class="name" width="10%">民族</td>
              <td width="10%">{{tableData.nation}}</td>
              <td class="name" width="10%">籍贯</td>
              <td width="20%" colspan="2">{{tableData.native_place}}</td>
              <!-- <td class="name" colspan="1" width="10%" rowspan="3">
                  <img class="photo" :src="this.baseUrl+tableData.photo" alt />
              </td>-->
            </tr>
            <tr>
              <td class="name" width="10%">英文姓名</td>
              <td width="10%">{{tableData.en_name}}</td>
              <td class="name" width="10%">身高/体重</td>
              <td width="10%">{{tableData.height_weight}}</td>
              <td class="name" width="10%">出生年月</td>
              <td width="10%">{{tableData.birth_date}}</td>
              <td class="name" width="10%">年龄</td>
              <td width="20%" colspan="2">{{tableData.age}}</td>
            </tr>
            <tr>
              <td class="name" width="10%">政治面貌</td>
              <td width="10%">{{tableData.face}}</td>
              <td class="name" width="10%">是否婚育</td>
              <td width="10%">{{tableData.marriageMsg}}</td>
              <td class="name" width="10%">学历</td>
              <td width="10%">{{tableData.degree}}</td>
              <td class="name" width="10%">专业</td>
              <td width="20%" colspan="2">{{tableData.speciality}}</td>
            </tr>
            <tr>
              <td class="name" width="10%">毕业院校</td>
              <td colspan="3" width="30%">{{tableData.school}}</td>
              <td class="name" width="10%">毕业时间</td>
              <td colspan="2" width="20%">{{tableData.finish_date}}</td>
              <td class="name" colspan="1" width="10%">入司渠道</td>
              <td colspan="1" width="10%">{{tableData.channel_name}}</td>
            </tr>
            <tr>
              <td class="name" width="10%">计算机水平</td>
              <td colspan="2" width="20%">{{tableData.computer_level}}</td>
              <td class="name" width="10%">外语水平</td>
              <td colspan="2" width="20%">{{tableData.language_level}}</td>
              <td class="name" width="10%">联系方式</td>
              <td colspan="2" width="20%">{{tableData.phone}}</td>
            </tr>
            <tr>
              <td class="name" width="10%">身份证号</td>
              <td colspan="2" width="20%">{{tableData.IDcard}}</td>
              <td class="name" width="10%">身份证地址</td>
              <td colspan="2" width="20%">{{tableData.native_place}}</td>
              <td class="name" width="10%">现居住地</td>
              <td colspan="2" width="20%">{{tableData.address}}</td>
            </tr>
            <tr>
              <td class="name" width="10%">邮箱</td>
              <td colspan="2" width="20%">{{tableData.email}}</td>
              <td class="name" width="10%">户籍类型</td>
              <td colspan="2" width="20%">{{tableData.household_typeMsg}}</td>
              <td class="name" width="10%">现住所性质</td>
              <td colspan="2" width="20%">{{tableData.abode_natureMsg}}</td>
            </tr>
            <tr>
              <td class="name" width="10%">紧急联系人</td>
              <td colspan="2" width="20%">{{tableData.urgent_contact}}</td>
              <td class="name" width="10%">紧急联系人关系</td>
              <td colspan="2" width="20%">{{tableData.contact_relation_phone}}</td>
              <td class="name" width="10%">紧急联系人电话</td>
              <td colspan="2" width="20%">{{tableData.contact_phone}}</td>
            </tr>
            <tr>
              <td class="name" width="10%">本司任职亲友</td>
              <td colspan="2" width="20%">{{tableData.recommender}}</td>
              <td class="name" width="10%">本司任职亲友部门</td>
              <td colspan="2" width="20%">{{tableData.recommender_depart}}</td>
              <td class="name" width="10%">本司任职亲友电话</td>
              <td colspan="2" width="20%">{{tableData.recommender_phone}}</td>
            </tr>

            <tr>
              <td class="name" width="10%">最近体检时间</td>
              <td colspan="2" width="20%">{{tableData.tj_date}}</td>
              <td class="name" width="10%">曾患何种疾病</td>
              <td colspan="2" width="20%">{{tableData.history_health}}</td>
              <td class="name" width="10%">目前健康情况</td>
              <td colspan="2" width="20%">{{tableData.health}}</td>
            </tr>
            <tr>
              <td class="name" colspan="2" width="20%" rowspan="2">自我评价（包括能力、性格及特长）</td>
              <td colspan="3" width="30%" rowspan="2">{{tableData.self_assessment}}</td>
              <td class="name" width="10%">期望薪资</td>
              <td colspan="3" width="30%">{{tableData.hope_salary}}</td>
            </tr>
            <tr>
              <td class="name" width="10%">最快到岗时间</td>
              <td colspan="3" width="30%">{{tableData.duty_date}}</td>
            </tr>
          </table>
          <div class="site">教育培训经历（由高至低填写）</div>
          <el-table :data="tableEducation" border style="width: 100%" empty-text="暂无数据">
            <el-table-column prop="school_name" label="学校/培训机构" align="center"></el-table-column>
            <el-table-column prop="start_date" label="开始时间" align="center"></el-table-column>
            <el-table-column prop="end_date" label="结束时间" align="center"></el-table-column>
            <el-table-column prop="speciality" label="专业" align="center"></el-table-column>
            <el-table-column prop="degree" label="学历" align="center"></el-table-column>
            <el-table-column prop="wayMsg" label="取得方式" align="center"></el-table-column>
          </el-table>
          <div class="site">工作经历（由近至远填写）</div>
          <el-table :data="tableWork" border style="width: 100%" empty-text="暂无数据">
            <el-table-column prop="company_name" label="单位名称" align="center"></el-table-column>
            <el-table-column prop="start_date" label="开始时间" align="center"></el-table-column>
            <el-table-column prop="end_date" label="结束时间" align="center"></el-table-column>
            <el-table-column prop="position_name" label="职位" align="center"></el-table-column>
            <el-table-column prop="salary" label="最后薪金" align="center"></el-table-column>
            <el-table-column prop="leave_reason" label="离职原因" align="center"></el-table-column>
            <el-table-column prop="contact_phone" label="联系人/电话" align="center"></el-table-column>
          </el-table>
          <div class="site">家庭和社会关系状况（直系和旁系）</div>
          <el-table :data="tableFamily" border style="width: 100%" empty-text="暂无数据">
            <el-table-column prop="name" label="姓名" align="center"></el-table-column>
            <el-table-column prop="relation" label="关系" align="center"></el-table-column>
            <el-table-column prop="work" label="职业" align="center"></el-table-column>
            <el-table-column prop="company" label="工作单位" align="center"></el-table-column>
            <el-table-column prop="tel" label="联系电话" align="center"></el-table-column>
          </el-table>
          <div class="addfirm">加入公司你更看重?：{{tableData.answer_soft}}</div>
          <p class="text">请按重要程度排序：1.企业规模及品牌 2.成长记发展平台 3.福利待遇 4.企业文化 5.团队氛围 6.领导风格</p>
          <p class="text">申明：本人对以上资料的真实性负责，如有虚假，本人自愿承担任何后果！本人谨此授权公司查询有关事项！</p>
          <p class="text">注：请参加应聘者认真填写上述资料，若有疑问请及时联系人力资源部！</p>
          <div class="bottom">
            <div class="sig">
              <p>
                签名：
                <img class="autograph" :src="this.baseUrl+tableData.autograph" alt />
              </p>
            </div>
            <div class="date">日期：{{tableData.autograph_date}}</div>
          </div>
        </section>
        <div class="site">文件列表</div>

        <el-table :data="fileData" border style="width: 100%" empty-text="暂无数据">
          <el-table-column prop="file_name" label="文件名称" align="center"></el-table-column>
          <el-table-column label="操作" align="center" width="200px">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-download"
                @click="download(scope)"
              >下载</el-button>
              <el-button type="danger" size="mini" icon="el-icon-delete" @click="remove(scope)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-upload
          style="margin-top:10px"
          class="upload-demo"
          ref="upload"
          action="#"
          :http-request="handleAvatarSuccess"
          :file-list="fileList"
          :auto-upload="false"
        >
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button
            style="margin-left: 10px;"
            size="small"
            type="success"
            @click="submitUpload"
          >上传文件</el-button>
        </el-upload>
      </div>
      <div v-else>
        <el-button type="primary" @click="PrintRow">打 印</el-button>
        <section ref="print" class="recordImg" id="printRecord">
          <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
            <tr>
              <td width="100%" align="center" colspan="2" class="title" height="60">面试测评</td>
            </tr>
          </table>
          <div class="list">
            <div class="evaluatingListItem">
              <div
                class="evaluatingTitle"
              >1、为了有人能分担你的房租，你不得不与人合租，可以跟你合租的人有三个，你最终会选择跟谁合租一间房呢?按照接受程度，给他们依次排序分别是_________（排序）</div>
              <div class="evaluatingCenter">
                <div class="answer">答案:{{answer.item1}}</div>
                <div class="answerList">
                  <div class="answerItem">A：不爱讲话，个性闭塞的</div>
                  <div class="answerItem">B：热情过度，大大咧咧的</div>
                  <div class="answerItem">C：很有礼貌，但同时也非常有原则的</div>
                </div>
              </div>
            </div>
            <div class="evaluatingListItem">
              <div class="evaluatingTitle">2、如果你是电台广播行业的从业人员，你最想担任的会是哪项职务?（单选）</div>
              <div class="evaluatingCenter">
                <div class="answer">答案：{{answer.item2Msg}}</div>
                <div class="answerList">
                  <div class="answerItem">A：主持人</div>
                  <div class="answerItem">B：音控人员</div>
                  <div class="answerItem">C：企划制作人员</div>
                  <div class="answerItem">D：特别来宾或受访人员</div>
                </div>
              </div>
            </div>
            <div class="evaluatingListItem">
              <div class="evaluatingTitle">3、遇到下列情况，你会选择哪个？（单选）</div>
              <div class="evaluatingCenter">
                <div class="answer">答案：{{answer.item3Msg}}</div>
                <div class="answerList">
                  <div class="answerItem">A：1000万现金</div>
                  <div class="answerItem">B：10万月薪工作</div>
                </div>
              </div>
            </div>
            <div class="evaluatingListItem">
              <div
                class="evaluatingTitle"
              >4、有一天你在回家路上遇到一个需要急救的亿万富翁，你救了他，他会给你2000万，这时你父亲打来电话说，你妈要见你最后一面，快不行。（单选）</div>
              <div class="evaluatingCenter">
                <div class="answer">答案：{{answer.item4Msg}}</div>
                <div class="answerList">
                  <div class="answerItem">A：如果你现在回去可以见她最后一面</div>
                  <div class="answerItem">B：如果你救亿万富翁你将见不到她最后一面，而且是永远见不到了</div>
                </div>
              </div>
            </div>
            <div class="evaluatingListItem">
              <div class="evaluatingTitle">5、带一群4岁的孩子去公园玩，其中一个孩子由于别人都不和他玩而大哭起来，这个时候，您该怎么办呢?</div>
              <div class="evaluatingCenter">
                <div class="answer">答案：{{answer.item5}}</div>
              </div>
            </div>
            <div class="evaluatingListItem">
              <div class="evaluatingTitle">6、您的朋友开车时别人的车突然危险地抢到你们前面，您的朋友勃然大怒，而您试图让他平静下来。您会怎么做呢?</div>
              <div class="evaluatingCenter">
                <div class="answer">答案：{{answer.item6}}</div>
              </div>
            </div>
            <div class="evaluatingListItem">
              <div
                class="evaluatingTitle"
              >7、假如说，你去菜市场买菜，在菜市场中看到一个推车卖香蕉的老人家，香蕉2.3一斤，买5斤就按2元一斤算，你觉的很划算，便决定买了，买完后，你在公平秤上一称3.7斤，比实际少1.3斤，之后你会怎么做？</div>
              <div class="evaluatingCenter">
                <div class="answer">答案：{{answer.item7}}</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { findInterview, deleteFile } from "@/api/interview/interviewList";
import { getToken } from "@/utils/auth";

export default {
  props: {
    dialogs: Object
  },
  data() {
    return {
      tableData: {},
      tableEducation: null,
      tableWork: null,
      tableFamily: null,
      show: 1,
      personalityData: {},
      personalityType: true,
      baseUrl: "",
      answer: {},
      fileList: [],
      fileData: [],
      fileNum: 0,
      uploadFilesNum: 0
    };
  },
  created() {
    let url = this.$axios.defaults.baseURL;
    let endlength = url.indexOf("/index");
    this.baseUrl = url.substring(0, endlength);
  },
  methods: {
    getData() {
      let data = {
        id: this.dialogs.id
      };
      findInterview(data).then(res => {
        if (res.code == 0) {
          switch (res.data.info.marriage) {
            case 1:
              res.data.info.marriageMsg = "未婚未育";
              break;
            case 2:
              res.data.info.marriageMsg = "已婚未育";
              break;
            case 3:
              res.data.info.marriageMsg = "已婚已育";
              break;
            case 4:
              res.data.info.marriageMsg = "离异";
              break;
          }
          res.data.info.sexMsg = res.data.info.sex == 1 ? "男" : "女";
          res.data.info.household_typeMsg =
            res.data.info.household_type == 1 ? "城镇" : "非城镇";
          res.data.info.abode_natureMsg =
            res.data.info.abode_nature == 1
              ? "自购"
              : res.data.info.abode_nature == 2
              ? "租赁"
              : "亲友";
          this.tableData = res.data.info;
          res.data.info.education.forEach(res => {
            switch (res.way) {
              case 1:
                res.wayMsg = "统招";
                break;
              case 2:
                res.wayMsg = "自考";
                break;
              case 3:
                res.wayMsg = "成考";
                break;
              case 4:
                res.wayMsg = "其他";
                break;
            }
          });
          if (res.data.info.rgtype) {
            let arr = this.personality.filter(data => {
              return data.id == res.data.info.rgtype;
            });
            this.personalityData = arr[0];
            this.personalityType = true;
          } else {
            this.personalityData = {};
            this.personalityType = false;
            this.activeName = "first";
          }
          if (
            res.data.info.family.length == 1 &&
            res.data.info.family[0].name == "" &&
            res.data.info.family[0].relation == "" &&
            res.data.info.family[0].tel == "" &&
            res.data.info.family[0].work == ""
          ) {
            this.tableFamily = [];
          } else {
            this.tableFamily = res.data.info.family;
          }
          switch (res.data.info.face_answers.item2) {
            case "1":
              res.data.info.face_answers.item2Msg = "A：主持人";
              break;
            case "2":
              res.data.info.face_answers.item2Msg = "B：音控人员";
              break;
            case "3":
              res.data.info.face_answers.item2Msg = "C：企划制作人员";
              break;
            case "4":
              res.data.info.face_answers.item2Msg = "D：特别来宾或受访人员";
              break;
          }
          switch (res.data.info.face_answers.item3) {
            case "1":
              res.data.info.face_answers.item3Msg = "A：1000万现金";
              break;
            case "2":
              res.data.info.face_answers.item3Msg = "B：10万月薪工作";
              break;
          }
          switch (res.data.info.face_answers.item4) {
            case "1":
              res.data.info.face_answers.item4Msg =
                "A：如果你现在回去可以见她最后一面";
              break;
            case "2":
              res.data.info.face_answers.item4Msg =
                "B：如果你救亿万富翁你将见不到她最后一面，而且是永远见不到了";
              break;
          }
          this.answer = res.data.info.face_answers;
          this.tableWork = res.data.info.work;
          this.tableEducation = res.data.info.education;
          this.fileData = res.data.info.filelist;
        }
      });
    },

    //下载
    download(scope) {
      this.$confirm("是否下载?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let link = document.createElement("a");
          link.href =
            this.$axios.defaults.baseURL +
            "/api/interview/downloadFile?token=" +
            getToken() +
            "&id=" +
            scope.row.id;

          link.click();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    // 删除
    remove(scope) {
      this.$confirm("是否删除该文件?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let data = {
            id: scope.row.id
          };
          deleteFile(data)
            .then(res => {
              if (res.code == 0) {
                this.$message({
                  type: "success",
                  message: res.msg
                });
                this.getData();
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    submitUpload(file, fileList) {
      this.fileNum = 0;
      this.uploadFilesNum = this.$refs.upload.uploadFiles.length;
      if (this.$refs.upload.uploadFiles.length > 0) {
        this.$refs.upload.submit();
      } else {
        this.$message({
          type: "info",
          message: "请添加文件"
        });
      }
    },
    handleAvatarSuccess(param) {
      console.log(param, 99999);
      let data = new window.FormData();
      data.append("file", param.file);
      data.append("id", this.dialogs.id);
      data.append("token", getToken());
      this.$axios.post("/api/interview/uploadFile", data).then(res => {
        this.fileNum++;
        if (this.fileNum == this.uploadFilesNum) {
          if (res.data.code == 0) {
            this.$message({
              message: res.data.message || res.data.msg,
              type: "success"
            });
            this.getData();
            this.fileList = [];
          }
        }
      });
    },
    //切换Table
    btn(e) {
      this.show = e;
    },
    //打印
    PrintRow(index, row) {
      this.$print(this.$refs.print); // 使用
    },
    hideDialog() {
      this.dialogs.centerDialogVisible = false;
    },

    //取消
    cancel() {
      this.hideDialog();
    }
  }
};
</script>
<style scoped>
.top {
  display: flex;
  justify-content: center;
}
.top .topName {
  width: 100px;
  text-align: center;
  height: 40px;
  line-height: 40px;
  border-radius: 5px;
}
.top .topName:last-child {
  margin-left: 20px;
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
  border: 1px solid #ebeef5;
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
  width: 100%;
  height: auto;
}
.autograph {
  width: 60px;
}
.el-table__empty-block {
  height: auto !important;
}
.active {
  background: #409eff;
  color: #fff;
}
.list {
  margin-top: 10px;
}
.list .evaluatingListItem .evaluatingTitle {
  font-size: 14px;
  line-height: 25px;
  font-weight: bold;
}
.list .evaluatingListItem .evaluatingCenter .answer {
  margin-left: 20px;
  line-height: 30px;
  color: #409eff;
}
.list .evaluatingListItem .evaluatingCenter .answerList {
  margin-left: 20px;
  line-height: 30px;
}
</style>