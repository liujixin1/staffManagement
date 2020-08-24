<template>
  <div class="container">
    <el-dialog
      title="员工信息"
      :visible.sync="dialogs.centerDialogVisible"
      width="780px"
      center
      :lock-scroll="true"
      @open="getData"
    >
      <!-- <el-tabs v-model="activeName" >
      <el-tab-pane label="基础信息" name="first">-->
      <el-button type="primary" @click="PrintRow">打 印</el-button>
      <section ref="print" class="recordImg" id="printRecord">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
          <tr>
            <td width="100%" align="center" colspan="4" class="title" height="60">基础信息采集卡</td>
          </tr>
          <tr>
            <td width="25%" align="left" height="25">部门名称：{{tableData.department_name}}</td>
            <td width="25%" align="center" height="25">职位名称：{{tableData.position_name}}</td>
            <td width="25%" align="center" height="25">岗位性质：{{tableData.nature_name}}</td>
            <td width="25%" align="right" height="25">入职日期：{{tableData.entry_date}}</td>
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
            <td width="10%">{{tableData.native_place}}</td>
            <td class="name" colspan="1" width="10%" rowspan="3">
              <!-- <img class="photo" :src="this.baseUrl+tableData.photo" alt /> -->
              <div class="photo">
              <el-upload
                class="avatar-uploader"
                action="#"
                :show-file-list="false"
                :http-request="handleAvatarSuccess"
              >
                <img v-if="imageUrl" :src="baseUrl+imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
            </td>
          </tr>
          <tr>
            <td class="name" width="10%">英文姓名</td>
            <td width="10%">{{tableData.en_name}}</td>
            <td class="name" width="10%">国籍</td>
            <td width="10%">{{tableData.nationality}}</td>
            <td class="name" width="10%">出生年月</td>
            <td width="10%">{{tableData.birth_date}}</td>
            <td class="name" width="10%">年龄</td>
            <td width="10%">{{tableData.ageMsg}}</td>
          </tr>
          <tr>
            <td class="name" width="10%">政治面貌</td>
            <td width="10%">{{tableData.face}}</td>
            <td class="name" width="10%">是否婚育</td>
            <td width="10%">{{tableData.marriageMsg}}</td>
            <td class="name" width="10%">学历</td>
            <td width="10%">{{tableData.degree}}</td>
            <td class="name" width="10%">专业</td>
            <td width="10%">{{tableData.speciality}}</td>
          </tr>
          <tr>
            <td class="name">毕业院校</td>
            <td colspan="4">{{tableData.school}}</td>
            <td class="name">学校地址</td>
            <td colspan="3">{{tableData.school_address}}</td>
            <!-- <td class="name" colspan="1">毕业时间</td>
            <td colspan="1">{{tableData.finish_date}}</td>-->
          </tr>
          <tr>
            <td class="name">计算机水平</td>
            <td colspan="2">{{tableData.computer_level}}</td>
            <td class="name">外语水平</td>
            <td colspan="2">{{tableData.language_level}}</td>
            <td class="name">联系方式</td>
            <td colspan="2">{{tableData.phone}}</td>
          </tr>
          <tr>
            <td class="name">身份证号</td>
            <td colspan="2">{{tableData.IDcard}}</td>
            <td class="name">身份证地址</td>
            <td colspan="2">{{tableData.address}}</td>
            <td class="name">微信号</td>
            <td colspan="2">{{tableData.wechat_code}}</td>
          </tr>
          <tr>
            <td class="name">邮箱</td>
            <td colspan="2">{{tableData.email}}</td>
            <td class="name">户籍类型</td>
            <td colspan="2">{{tableData.household_typeMsg}}</td>
            <td class="name">现居住地</td>
            <td colspan="2">{{tableData.living_place}}</td>
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
            <td class="name" colspan="3">是否首次在北京参加社会保险</td>
            <td colspan="1">{{tableData.is_beijing_social_insuranceMsg}}</td>
            <td class="name">血型</td>
            <td colspan="1">{{tableData.blood_type}}</td>
            <td class="name">目前健康情况</td>
            <td colspan="2">{{tableData.health}}</td>
          </tr>
          <tr>
            <td class="name" colspan="3">是否与原单位存在当期竞业禁止</td>
            <td colspan="1">{{tableData.business_strifeMsg}}</td>
            <td class="name" colspan="1">爱好及特长</td>
            <td colspan="4">{{tableData.hobby}}</td>
          </tr>

          <tr>
            <td class="name" colspan="2">曾获何种奖励(大学期间开始)</td>
            <td colspan="3">{{tableData.reward}}</td>
            <td class="name" colspan="1">自我评价</td>
            <td colspan="3">{{tableData.self_assessment}}</td>
          </tr>

          <tr>
            <td class="name" colspan="2">座右铭及感悟</td>
            <td colspan="3">{{tableData.motto}}</td>
            <td class="name" colspan="1">入司告白</td>
            <td colspan="3">{{tableData.confession}}</td>
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
        <div class="site">培训经历</div>
        <el-table :data="train" border style="width: 100%" empty-text="暂无数据">
          <el-table-column prop="company" label="培训单位" align="center"></el-table-column>
          <el-table-column prop="position" label="培训内容" align="center"></el-table-column>
          <el-table-column prop="train_date" label="开始时间" align="center"></el-table-column>
          <el-table-column prop="end_date" label="开始时间" align="center"></el-table-column>
          <el-table-column prop="certificate" label="获得证书" align="center"></el-table-column>
        </el-table>
        <div class="site">家庭和社会关系状况（直系和旁系）</div>
        <el-table :data="tableFamily" border style="width: 100%" empty-text="暂无数据">
          <el-table-column prop="name" label="姓名" align="center"></el-table-column>
          <el-table-column prop="relation" label="关系" align="center"></el-table-column>
          <el-table-column prop="work" label="职业" align="center"></el-table-column>
          <el-table-column prop="company" label="工作单位" align="center"></el-table-column>
          <el-table-column prop="tel" label="联系电话" align="center"></el-table-column>
        </el-table>

        <table
          width="100%"
          border="0"
          cellspacing="1"
          cellpadding="4"
          bgcolor="#cccccc"
          class="main"
          align="center"
        >
          <!-- <tr>
          <td class="name" width="100%" rowspan="1">直系亲属定义：本人父母、配偶、子女、兄弟姐妹及其子女；配偶父母、子女、兄弟姐妹及其子女。</td>
          </tr>-->
        </table>
        <p class="text">本人承诺：上述信息完全真实有效，如有虚假，愿接受公司处罚及承担因此所产生的一切后果。</p>
        <p class="text">本人信息如有变动，将在变化后一周内到人力资源部办理变更，否则由此造成的损失由本人负责。</p>
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
      <div class="sites">人力部门填写</div>
      <div class="inpList">
        <el-form class="form" label-width="130px" label-position="left">
          <el-form-item label="员工编号：">
            <el-input v-model="formData.job_number" @change="company(11)" placeholder="请输入员工编号" />
          </el-form-item>
          <el-form-item label="员工状态：">
            <el-select
              v-model="formData.employee_status_name"
              placeholder="请选择员工状态"
              @change="company(5,formData.employee_status_name)"
            >
              <el-option
                v-for="item in option13"
                :key="item.value"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="一级部门：">
            <el-select
              v-model="formData.company_name"
              @change="company(1,formData.company_name)"
              placeholder="请选择一级部门"
            >
              <el-option
                v-for="item in option"
                :key="item.value"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="二级部门：">
            <el-select
              v-model="formData.school_name"
              @change="company(4,formData.school_name)"
              placeholder="请选择二级部门"
            >
              <el-option
                v-for="item in option12"
                :key="item.value"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="三级部门：">
            <el-select
              v-model="formData.department_name"
              @change="company(2,formData.department_name)"
              placeholder="请选择三级部门"
            >
              <el-option
                v-for="item in option2"
                :key="item.value"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="职位名称：">
            <el-select
              v-model="formData.position_name"
              @change="company(14,formData.position_name)"
              placeholder="职位名称"
            >
              <el-option
                v-for="item in option3"
                :key="item.value"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="岗位性质：">
            <el-select
              v-model="formData.nature_name"
              @change="company(3,formData.nature_name)"
              placeholder="请选择岗位"
            >
              <el-option
                v-for="item in option4"
                :key="item.value"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="岗位类别：">
            <el-select
              v-model="formData.position_type_name"
              placeholder="请选择岗位类别"
              @change="company(20,formData.position_type_name)"
            >
              <el-option
                v-for="item in option14"
                :key="item.value"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="合同性质：">
            <el-select
              v-model="formData.contract_type_name"
              placeholder="请选择合同性质"
              @change="company(21,formData.contract_type_name)"
            >
              <el-option
                v-for="item in option15"
                :key="item.value"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="税务/社保所在地：">
            <el-input
              v-model="formData.shebao_place_name"
              @change="company(18)"
              placeholder="请输入税务/社保所在地"
            />
          </el-form-item>
          <el-form-item label="成本所属：">
            <el-input v-model="formData.chengben_name" @change="company(19)" placeholder="请输入成本所属" />
          </el-form-item>
          <el-form-item label="公司邮箱：">
            <el-input v-model="formData.company_email" @change="company(9)" placeholder="请输入公司邮箱" />
          </el-form-item>
          <el-form-item label="上级领导邮箱：">
            <el-input v-model="formData.super_email" @change="company(10)" placeholder="请输入上级领导邮箱" />
          </el-form-item>
          <el-form-item label="抄送负责人邮箱：">
            <el-input
              v-model="formData.shaosong_manager_email"
              type="textarea"
              @change="company(28)"
              placeholder="请输入抄送负责人邮箱用分号隔开（英文分号）"
            />
          </el-form-item>
          <el-form-item label="合同签署公司：">
            <el-input
              v-model="formData.agreement_compony"
              @change="company(29)"
              placeholder="请输入合同签署公司"
            />
          </el-form-item>
        </el-form>
        <el-form class="form" label-width="150px" label-position="left">
          <el-form-item label="授课级别：">
            <el-select
              v-model="formData.lessons_name"
              @change="company(6,formData.lessons_name)"
              placeholder="请选择授课级别"
            >
              <el-option
                v-for="item in option5"
                :key="item.value"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="教师类别：">
            <el-select
              v-model="formData.teacher_type_name"
              @change="company(7,formData.teacher_type_name)"
              placeholder="请选择教师类别"
            >
              <el-option
                v-for="item in option6"
                :key="item.value"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="教师星级：">
            <el-select
              v-model="formData.teacher_star_name"
              @change="company(8,formData.teacher_star_name)"
              placeholder="请选择教师星级"
            >
              <el-option
                v-for="item in option7"
                :key="item.value"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="入职日期：">
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="formData.entry_date"
              @change="company(15)"
              type="date"
              placeholder="选择入职日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="试用期期限(月)：">
            <el-input-number
              v-model="formData.shiyong_limit_month"
              @change="company(22)"
              :min="0"
              label="请输入试用期期限（月）"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="预计转正日期：">
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="formData.yuzhuanzheng_date"
              @change="company(23)"
              type="date"
              placeholder="选择预计转正日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="转正日期：">
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="formData.formal_date"
              @change="company(16)"
              type="date"
              placeholder="选择转正日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="入职考核成绩：">
            <el-input v-model="formData.achievement" @change="company(13)" placeholder="请输入职考核成绩" />
          </el-form-item>
          <el-form-item label="合同签订次数(次)：">
            <el-input-number
              v-model="formData.agreement_times"
              @change="company(24)"
              :min="0"
              label="请输入合同签订次数（次）"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="合同签订日期：">
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="formData.agreement_date"
              @change="company(25)"
              type="date"
              placeholder="选择合同签订日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="合同期限（月）：">
            <el-input-number
              v-model="formData.agreement_limit_month"
              @change="company(26)"
              :min="0"
              label="请输入合同签订次数（次）"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="合同截止日期：">
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="formData.agreement_end_date"
              @change="company(27)"
              type="date"
              placeholder="选择合同截止日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="离职日期：">
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="formData.quit_date"
              @change="company(17)"
              type="date"
              placeholder="选择离职日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="离职原因：">
            <el-input v-model="formData.quit_reasons" @change="company(12)" placeholder="请输入离职原因" />
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { findEmployee, editEmployeeOption } from "@/api/staff/staffList";
import { selectOptionList } from "@/api/setting/setting";
export default {
  props: {
    dialogs: Object
  },
  data() {
    return {
      baseUrl: "",
      defaultProps: {
        children: "child",
        label: "name",
        value: "id",
        checkStrictly: true
      },
      tableData: {},
      formData: {
        company_name: "",
        department_name: "",
        position_name: "",
        nature_name: "",
        school_name: "",
        employee_status_name: "",
        lessons_name: "",
        teacher_type_name: "",
        teacher_star_name: "",
        company_email: "",
        super_email: "",
        job_number: "",
        quit_reasons: "",
        achievement: "",
        entry_date: "",
        formal_date: "",
        quit_date: "",
        shebao_place_name: "",
        chengben_name: "",
        position_type_name: "",
        contract_type_name: "",
        shiyong_limit_month: "",
        yuzhuanzheng_date: "",
        agreement_times: "",
        agreement_date: "",
        agreement_limit_month: "",
        agreement_end_date: "",
        shaosong_manager_email: "",
        agreement_compony: ""
      },
      imageUrl:"",
      tableEducation: null,
      tableWork: null,
      tableFamily: null,
      train: [],
      activeName: "first",
      option: [],
      option2: [],
      option3: [],
      option4: [],
      option5: [],
      option6: [],
      option7: [],
      option12: [],
      option13: [],
      option14: [],
      option15: []
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
      findEmployee(data).then(res => {
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
          switch (res.data.info.business_strife) {
            case 1:
              res.data.info.business_strifeMsg = "是";
              break;
            case 2:
              res.data.info.business_strifeMsg = "否";
              break;
          }
          switch (res.data.info.is_beijing_social_insurance) {
            case 1:
              res.data.info.is_beijing_social_insuranceMsg = "是";
              break;
            case 2:
              res.data.info.is_beijing_social_insuranceMsg = "否";
              break;
          }
          res.data.info.ageMsg = this.getAge(res.data.info.birth_date);
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
          if (
            res.data.info.train.length == 1 &&
            res.data.info.train[0].certificate == "" &&
            res.data.info.train[0].company == "" &&
            res.data.info.train[0].end_date == "" &&
            res.data.info.train[0].position == "" &&
            res.data.info.train[0].train_date == ""
          ) {
            this.train = [];
          } else {
            this.train = res.data.info.train;
          }
          this.tableEducation = res.data.info.education;
          this.imageUrl = res.data.info.photo;
          this.tableWork = res.data.info.work;
          this.tableFamily = res.data.info.family;
          this.formData.company_name = res.data.info.company_name || "";
          this.formData.department_name = res.data.info.department_name || "";
          this.formData.position_name = res.data.info.position_name || "";
          this.formData.nature_name = res.data.info.nature_name || "";
          this.formData.school_name = res.data.info.school_name || "";
          this.formData.employee_status_name =
            res.data.info.employee_status_name || "";
          this.formData.lessons_name = res.data.info.lessons_name || "";
          this.formData.teacher_type_name =
            res.data.info.teacher_type_name || "";
          this.formData.teacher_star_name =
            res.data.info.teacher_star_name || "";
          this.formData.company_email = res.data.info.company_email || "";
          this.formData.super_email = res.data.info.super_email || "";
          this.formData.job_number = res.data.info.job_number || "";
          this.formData.quit_reasons = res.data.info.quit_reasons || "";
          this.formData.achievement = res.data.info.achievement || "";
          this.formData.entry_date =
            res.data.info.entry_date != "0000-00-00"
              ? res.data.info.entry_date
              : "";
          this.formData.formal_date =
            res.data.info.formal_date != "0000-00-00"
              ? res.data.info.formal_date
              : "";
          this.formData.quit_date =
            res.data.info.quit_date != "0000-00-00"
              ? res.data.info.quit_date
              : "";
          this.formData.shebao_place_name =
            res.data.info.shebao_place_name || "";
          this.formData.chengben_name = res.data.info.chengben_name || "";
          this.formData.position_type_name =
            res.data.info.position_type_name || "";
          this.formData.contract_type_name =
            res.data.info.contract_type_name || "";
          this.formData.shiyong_limit_month =
            res.data.info.shiyong_limit_month || "";
          this.formData.yuzhuanzheng_date =
            res.data.info.yuzhuanzheng_date || "";
          this.formData.agreement_times = res.data.info.agreement_times || "";
          this.formData.agreement_date = res.data.info.agreement_date || "";
          this.formData.agreement_limit_month =
            res.data.info.agreement_limit_month || "";
          this.formData.agreement_end_date =
            res.data.info.agreement_end_date || "";
          this.formData.shaosong_manager_email =
            res.data.info.shaosong_manager_email || "";
          this.formData.agreement_compony =
            res.data.info.agreement_compony || "";
        }
      });
      let datas = {
        ispc: 1
      };
      selectOptionList(datas).then(res => {
        this.option3 = [];
        for (var i in res.position) {
          this.option3.push({
            id: i,
            name: res.position[i]
          });
        }
        this.option = res.data[3];
        this.option2 = res.data[5];
        // this.option3 = res.position;
        this.option4 = res.data[7];
        this.option5 = res.data[12];
        this.option6 = res.data[13];
        this.option7 = res.data[14];
        this.option12 = res.data[4];
        this.option13 = res.data[8];
        this.option14 = res.data[15];
        this.option15 = res.data[16];
      });
    },
    company(sum, id) {
      let data = {};
      let result = null;
      data.id = this.dialogs.id;
      switch (sum) {
        case 1:
          let result = this.option.filter(res => {
            return res.name == id;
          });
          data.company_name = result[0].name;
          data.company_id = result[0].id;
          break;
        case 2:
          result = this.option2.filter(res => {
            return res.name == id;
          });
          data.department_name = result[0].name;
          data.department_id = result[0].id;
          break;
        case 3:
          result = this.option4.filter(res => {
            return res.name == id;
          });
          data.nature_name = result[0].name;
          data.nature_id = result[0].id;
          break;
        case 4:
          result = this.option12.filter(res => {
            return res.name == id;
          });
          data.school_name = result[0].name;
          data.school_id = result[0].id;
          break;
        case 5:
          result = this.option13.filter(res => {
            return res.name == id;
          });
          data.employee_status_name = result[0].name;
          data.employee_status_id = result[0].id;
          break;
        case 6:
          result = this.option5.filter(res => {
            return res.name == id;
          });
          data.lessons_name = result[0].name;
          data.lessons_id = result[0].id;
          break;
        case 7:
          result = this.option6.filter(res => {
            return res.name == id;
          });
          data.teacher_type_name = result[0].name;
          data.teacher_type_id = result[0].id;
          break;
        case 8:
          result = this.option7.filter(res => {
            return res.name == id;
          });
          data.teacher_star_name = result[0].name;
          data.teacher_star_id = result[0].id;
          break;
        case 9:
          data.company_email = this.formData.company_email;
          break;
        case 10:
          data.super_email = this.formData.super_email;
          break;
        case 11:
          data.job_number = this.formData.job_number;
          break;
        case 12:
          data.quit_reasons = this.formData.quit_reasons;
          break;
        case 13:
          data.achievement = this.formData.achievement;
          break;
        case 14:
          result = this.option3.filter(res => {
            return res.name == id;
          });
          data.position_name = result[0].name;
          data.position_id = result[0].id;
          break;
        case 15:
          data.entry_date = this.formData.entry_date;
          break;
        case 16:
          data.formal_date = this.formData.formal_date;
          break;
        case 17:
          data.quit_date = this.formData.quit_date;
          break;
        case 18:
          data.shebao_place_name = this.formData.shebao_place_name;
          break;
        case 19:
          data.chengben_name = this.formData.chengben_name;
          break;
        case 20:
          result = this.option14.filter(res => {
            return res.name == id;
          });
          data.position_type_name = result[0].name;
          data.position_type_id = result[0].id;
          break;
        case 21:
          result = this.option15.filter(res => {
            return res.name == id;
          });
          data.contract_type_name = result[0].name;
          data.contract_type_id = result[0].id;
          break;
        case 22:
          data.shiyong_limit_month = this.formData.shiyong_limit_month;
          break;
        case 23:
          data.yuzhuanzheng_date = this.formData.yuzhuanzheng_date;
          break;
        case 24:
          data.agreement_times = this.formData.agreement_times;
          break;
        case 25:
          data.agreement_date = this.formData.agreement_date;
          break;
        case 26:
          data.agreement_limit_month = this.formData.agreement_limit_month;
          break;
        case 27:
          data.agreement_end_date = this.formData.agreement_end_date;
          break;
        case 28:
          data.shaosong_manager_email = this.formData.shaosong_manager_email;
          break;
        case 29:
          data.agreement_compony = this.formData.agreement_compony;
          break;
            case 30:
          data.photo = this.imageUrl;
          break;
      }
      editEmployeeOption(data).then(res => {
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
    },
    //上传图片
     handleAvatarSuccess(param) {
      let data = new window.FormData();
      data.append("images", param.file);
      data.append("type", "photo");
      this.$axios.post("/api/uploads/upload", data).then(res => {
        if (res.data.code == 0) {
          // this.$message({
          //   message: res.data.message || res.data.msg,
          //   type: "success"
          // });
          this.imageUrl = res.data.data.file_url;
          this.company(30)
        }
      });
    },
    hideDialog() {
      this.dialogs.centerDialogVisible = false;
    },
    PrintRow(index, row) {
      this.$print(this.$refs.print); // 使用
    },
    //年龄计算
    getAge(str) {
      var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})/);
      if (r == null) return false;

      var d = new Date(r[1], r[3] - 1, r[4]);
      var returnStr = "输入的日期格式错误！";

      if (
        d.getFullYear() == r[1] &&
        d.getMonth() + 1 == r[3] &&
        d.getDate() == r[4]
      ) {
        var date = new Date();
        var yearNow = date.getFullYear();
        var monthNow = date.getMonth() + 1;
        var dayNow = date.getDate();

        var largeMonths = [1, 3, 5, 7, 8, 10, 12], //大月， 用于计算天，只在年月都为零时，天数有效
          lastMonth = monthNow - 1 > 0 ? monthNow - 1 : 12, // 上一个月的月份
          isLeapYear = false, // 是否是闰年
          daysOFMonth = 0; // 当前日期的上一个月多少天

        if ((yearNow % 4 === 0 && yearNow % 100 !== 0) || yearNow % 400 === 0) {
          // 是否闰年， 用于计算天，只在年月都为零时，天数有效
          isLeapYear = true;
        }

        if (largeMonths.indexOf(lastMonth) > -1) {
          daysOFMonth = 31;
        } else if (lastMonth === 2) {
          if (isLeapYear) {
            daysOFMonth = 29;
          } else {
            daysOFMonth = 28;
          }
        } else {
          daysOFMonth = 30;
        }

        var Y = yearNow - parseInt(r[1]);
        var M = monthNow - parseInt(r[3]);
        var D = dayNow - parseInt(r[4]);
        if (D < 0) {
          D = D + daysOFMonth; //借一个月
          M--;
        }
        if (M < 0) {
          // 借一年 12个月
          Y--;
          M = M + 12; //
        }

        if (Y < 0) {
          returnStr = "出生日期有误！";
        } else if (Y === 0) {
          if (M === 0) {
            returnStr = D + "天";
          } else {
            returnStr = M + "月";
          }
        } else {
          if (M === 0) {
            returnStr = Y + "岁";
          } else {
            returnStr = Y + "岁";
          }
        }
      }

      return returnStr;
    },
    //取消
    cancel() {
      this.hideDialog();
    }
  }
};
</script>
<style scoped>
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
.sites {
  font-size: 16px;
  font-weight: bold;
  padding-top: 15px;
  padding-bottom: 10px;
  text-align: center;
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
  height: 40px;
}
.el-table__empty-block {
  height: auto !important;
}
.inpList {
  display: flex;
  justify-content: space-between;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 140px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 140px;
  height: 178px;
  display: block;
}
</style>