<template>
  <div class="container">
    <el-dialog
      :title="dialog.dialogType==='edit'?'修改面试':'添加面试'"
      :visible.sync="dialog.centerDialogVisible"
      width="100%"
      center
      :fullscreen="true"
      :lock-scroll="true"
      @open="getData"
      @close='hideDialog'
    >
      <el-form
        class="form"
        ref="form"
        :rules="rules"
        :model="formData"
        label-width="130px"
        label-position="left"
      >
        <div class="list">
          <div class="title">基本信息</div>
          <el-form-item label="面试邀约人：" prop="audition_invitation">
            <el-select v-model="formData.audition_invitation" placeholder="请选择面试邀约人">
              <el-option
                v-for="item in option"
                :key="item.value"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="应聘职位：" prop="offer_name">
            <el-select v-model="formData.offer_name" placeholder="请选择应聘岗位">
              <el-option
                v-for="item in option2"
                :key="item.value"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="意向工作地点：" prop="intended_name">
            <el-select v-model="formData.intended_name" placeholder="请选择意向工作地点">
              <el-option
                v-for="item in option3"
                :key="item.value"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="中文姓名：" prop="cn_name">
            <el-input v-model="formData.cn_name" placeholder="请输入中文姓名" />
          </el-form-item>
          <el-form-item label="英文姓名：" prop="">
            <el-input v-model="formData.en_name" placeholder="请输入英文姓名" />
          </el-form-item>
          <el-form-item label="性别：" prop="sex">
            <el-select v-model="formData.sex" placeholder="请选择性别">
              <el-option
                v-for="item in option1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="民族：" prop="nation">
            <el-input v-model="formData.nation" placeholder="请输民族" />
          </el-form-item>
          <el-form-item label="籍贯：" prop="native_place">
            <el-input v-model="formData.native_place" placeholder="请输籍贯" />
          </el-form-item>
          <el-form-item label="身高/体重：" prop="">
            <el-input v-model="formData.height_weight" placeholder="请输身高/体重(cm/kg)" />
          </el-form-item>
          <el-form-item label="出生日期：" prop="birth_date">
            <el-date-picker
              class="time"
              value-format="yyyy-MM-dd"
              v-model="formData.birth_date"
              type="date"
              placeholder="选择出生日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="身份证号码：" prop="IDcard">
            <el-input v-model="formData.IDcard" placeholder="请输入身份证号码" />
          </el-form-item>
          <el-form-item label="年龄：" prop="age">
            <el-input v-model="formData.age" placeholder="请输年龄" />
          </el-form-item>

          <el-form-item label="现居住地：" prop="living_place">
            <el-input v-model="formData.living_place" placeholder="请输现居住地" />
          </el-form-item>
          <el-form-item label="现居住地性质：" prop="abode_nature">
            <el-select v-model="formData.abode_nature" placeholder="请选择现居住地性质">
              <el-option
                v-for="item in option10"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="list">
          <div class="title">基本信息</div>
          <el-form-item label="政治面貌：" prop="">
            <el-input v-model="formData.face" placeholder="请输政治面貌" />
          </el-form-item>
          <el-form-item label="学历：" prop="degree">
            <el-input v-model="formData.degree" placeholder="请输学历" />
          </el-form-item>
          <el-form-item label="是否婚育：" prop="marriage">
            <el-select v-model="formData.marriage" placeholder="请选择是否婚育">
              <el-option
                v-for="item in option8"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="专业：" prop="speciality">
            <el-input v-model="formData.speciality" placeholder="请输入专业" />
          </el-form-item>
          <el-form-item label="毕业学校：" prop="school">
            <el-input v-model="formData.school" placeholder="请输入毕业学校" />
          </el-form-item>
          <el-form-item label="毕业时间：" prop="">
            <el-date-picker
              class="time"
              value-format="yyyy-MM-dd"
              v-model="formData.finish_date"
              type="date"
              placeholder="选择毕业时间"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="计算机水平：" prop="">
            <el-input v-model="formData.computer_level" placeholder="请输入计算机水平" />
          </el-form-item>
          <el-form-item label="外语水平：" prop="">
            <el-input v-model="formData.language_level" placeholder="请输入外语水平" />
          </el-form-item>
          <el-form-item label="联系方式：" prop="phone">
            <el-input v-model="formData.phone" placeholder="请输入联系方式" />
          </el-form-item>
          <el-form-item label="邮箱：" prop="email">
            <el-input v-model="formData.email" placeholder="请输入邮箱" />
          </el-form-item>
          <el-form-item label="身份证地址：" prop="">
            <el-input v-model="formData.address" placeholder="请输入身份证地址" />
          </el-form-item>
          <el-form-item label="户籍类型：" prop="">
            <el-select v-model="formData.household_type" placeholder="请选择户籍类型">
              <el-option
                v-for="item in option9"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="紧急联系人：" prop="urgent_contact">
            <el-input v-model="formData.urgent_contact" placeholder="请输入紧急联系人" />
          </el-form-item>
        </div>
        <div class="list">
          <div class="title">基本信息</div>

          <el-form-item label="联系人关系：" prop="contact_relation_phone">
            <el-input v-model="formData.contact_relation_phone" placeholder="请输入紧急联系人关系" />
          </el-form-item>
          <el-form-item label="联系人电话：" prop="contact_phone">
            <el-input v-model="formData.contact_phone" placeholder="请输入紧急联系人电话" />
          </el-form-item>
          <!-- <el-form-item label="本司任职亲友：" prop="">
            <el-input v-model="formData.friend" placeholder="请输入本司任职亲友" />
          </el-form-item>
          <el-form-item label="关系/电话：" prop="">
            <el-input v-model="formData.friend_relation_phone" placeholder="请输入关系/电话" />
          </el-form-item> -->
          <el-form-item label="入司渠道：" prop="channel_name">
            <el-select v-model="formData.channel_name" @change="channel(formData.channel_name)" placeholder="请选择入司渠道">
              <el-option
                v-for="item in option4"
                :key="item.value"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
           <el-form-item v-if="channelType" label="推荐人：" prop="recommender">
            <el-input v-model="formData.recommender" placeholder="请输入推荐人" />
          </el-form-item>
           <el-form-item v-if="channelType" label="推荐人部门：" prop="recommender_depart">
            <el-input v-model="formData.recommender_depart" placeholder="请输入推荐人部门" />
          </el-form-item>
           <el-form-item v-if="channelType" label="联系方式：" prop="recommender_phone">
            <el-input v-model="formData.recommender_phone" placeholder="请输入推荐人联系方式" />
          </el-form-item>
          <el-form-item label="最近体检时间：" prop="">
            <el-date-picker
              class="time"
              value-format="yyyy-MM-dd"
              v-model="formData.tj_date"
              type="date"
              placeholder="选择最近体检时间"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="曾患何种疾病：" prop="">
            <el-input v-model="formData.history_health" placeholder="请输入曾患何种疾病" />
          </el-form-item>
          <el-form-item label="健康状况：" prop="health">
            <el-input v-model="formData.health" placeholder="请输入健康状况" />
          </el-form-item>
          <el-form-item label="期望薪资：" prop="hope_salary">
            <el-input v-model="formData.hope_salary" placeholder="请输入期望薪资" />
          </el-form-item>
          <el-form-item label="获得证书：" prop="">
            <el-input v-model="formData.certificate" placeholder="请输入获得证书" />
          </el-form-item>
          <el-form-item label="最快到岗时间：" prop="duty_date">
            <el-date-picker
              class="time"
              value-format="yyyy-MM-dd"
              v-model="formData.duty_date"
              type="date"
              placeholder="选择最快到岗时间"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="自我评价：" prop="self_assessment">
            <el-input v-model="formData.self_assessment" type="textarea" placeholder="请输入自我评价" />
          </el-form-item>
          <el-form-item label="你最看重：" prop="answer_soft">
            <el-input v-model="formData.answer_soft" type="textarea" placeholder="加入公司，你更看重？" />
          </el-form-item>
          <p>*请按重要程度排序：1、企业规模及品牌 2、成长记发展平台 3、福利待遇 4、企业文化 5、团队氛围 6、领导风格</p>
        </div>
        <div class="list">
          <div class="title">教育培训经历(由高自低填写)</div>
          <el-button
            class="add"
            size="small"
            type="primary"
            icon="el-icon-circle-plus"
            @click="addEducation()"
          >新增</el-button>
          <div class="main" v-for="(phone, index) in formData.education" :key="index">
            <el-form-item
              label="学校/培训机构："
              :prop="'education.' + index + '.school_name'"
              :rules="{
         required: true, message: '学校/培训机构不能为空', trigger: 'blur'
         }"
            >
              <el-input v-model="formData.education[index].school_name" placeholder="请输入学校/培训机构" />
            </el-form-item>
            <el-form-item
              label="开始时间："
              :prop="'education.' + index + '.start_date'"
              :rules="{
         required: true, message: '选择开始时间', trigger: 'change'
         }"
            >
              <el-date-picker
                class="time"
                value-format="yyyy-MM-dd"
                v-model="formData.education[index].start_date"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item
              label="结束时间："
              :prop="'education.' + index + '.end_date'"
              :rules="{
         required: true, message: '选择结束时间', trigger: 'change'
         }"
            >
              <el-date-picker
                class="time"
                value-format="yyyy-MM-dd"
                v-model="formData.education[index].end_date"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item
              label="专业："
              :prop="'education.' + index + '.speciality'"
              :rules="{
         required: true, message: '填写专业', trigger: 'blur'
         }"
            >
              <el-input v-model="formData.education[index].speciality" placeholder="请输入专业" />
            </el-form-item>
            <el-form-item
              label="学历："
              :prop="'education.' + index + '.degree'"
              :rules="{
         required: true, message: '填写学历', trigger: 'blur'
         }"
            >
              <el-input v-model="formData.education[index].degree" placeholder="请输入学历" />
            </el-form-item>
            <el-form-item
              label="取得方式："
              :prop="'education.' + index + '.way'"
              :rules="{
         required: true, message: '选择取得方式', trigger: 'change'
         }"
            >
              <el-select v-model="formData.education[index].way" placeholder="请选择取得方式">
                <el-option
                  v-for="item in option7"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="证明人/电话："
              :prop="'education.' + index + '.contact_phone'"
              :rules="{
         required: true, message: '填写证明人/电话', trigger: 'blur'
         }"
            >
              <el-input v-model="formData.education[index].contact_phone" placeholder="输入证明人/电话" />
            </el-form-item>
            <el-button
              class="remove"
              size="small"
              type="danger"
              icon="el-icon-delete"
              @click="remove('education',index)"
            >删除</el-button>
          </div>
        </div>

        <div class="list">
          <div class="title">工作经历(由近至远填写)</div>
          <el-button
            class="add"
            size="small"
            type="primary"
            icon="el-icon-circle-plus"
            @click="addWork()"
          >新增</el-button>
          <div class="main" v-for="(phone, index) in formData.work" :key="index">
            <el-form-item
              label="单位名称："
              :prop="'work.' + index + '.company_name'"
              :rules="{
         required: true, message: '输入单位名称', trigger: 'blur'
         }"
            >
              <el-input v-model="formData.work[index].company_name" placeholder="请输单位名称" />
            </el-form-item>
            <el-form-item
              label="开始时间："
              :prop="'work.' + index + '.start_date'"
              :rules="{
         required: true, message: '选择开始时间', trigger: 'change'
         }"
            >
              <el-date-picker
                class="time"
                value-format="yyyy-MM-dd"
                v-model="formData.work[index].start_date"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item
              label="结束时间："
              :prop="'work.' + index + '.end_date'"
              :rules="{
         required: true, message: '选择结束时间', trigger: 'change'
         }"
            >
              <el-date-picker
                class="time"
                value-format="yyyy-MM-dd"
                v-model="formData.work[index].end_date"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item
              label="职位："
              :prop="'work.' + index + '.position_name'"
              :rules="{
         required: true, message: '输入职位', trigger: 'blur'
         }"
            >
              <el-input v-model="formData.work[index].position_name" placeholder="请输职位" />
            </el-form-item>
            <el-form-item
              label="最后薪资："
              :prop="'work.' + index + '.salary'"
              :rules="{
         required: true, message: '输入最后薪资', trigger: 'blur'
         }"
            >
              <el-input v-model="formData.work[index].salary" placeholder="请输最后薪资" />
            </el-form-item>
            <el-form-item
              label="离职原因："
              :prop="'work.' + index + '.leave_reason'"
              :rules="{
         required: true, message: '输入离职原因', trigger: 'blur'
         }"
            >
              <el-input
                v-model="formData.work[index].leave_reason"
                type="textarea"
                placeholder="请输入离职原因"
              />
            </el-form-item>
            <el-form-item
              label="证明人/电话："
              :prop="'work.' + index + '.contact_phone'"
              :rules="{
         required: true, message: '填写证明人/电话', trigger: 'blur'
         }"
            >
              <el-input v-model="formData.work[index].contact_phone" placeholder="输入证明人/电话" />
            </el-form-item>
            <el-button
              class="remove"
              size="small"
              type="danger"
              icon="el-icon-delete"
              @click="remove('work',index)"
            >删除</el-button>
          </div>
        </div>
        <div class="list">
          <div class="title">家庭和社会关系状况(直系和旁系)</div>
          <el-button
            class="add"
            size="small"
            type="primary"
            icon="el-icon-circle-plus"
            @click="addHome()"
          >新增</el-button>
          <div class="main" v-for="(phone, index) in formData.family" :key="index">
            <el-form-item
              label="姓名："
              :prop="'family.' + index + '.name'"
              :rules="{
         required: true, message: '输入姓名', trigger: 'blur'
         }"
            >
              <el-input v-model="formData.family[index].name" placeholder="请输姓名" />
            </el-form-item>
            <el-form-item
              label="关系："
              :prop="'family.' + index + '.relation'"
              :rules="{
         required: true, message: '输入关系', trigger: 'blur'
         }"
            >
              <el-input v-model="formData.family[index].relation" placeholder="请输关系" />
            </el-form-item>
            <el-form-item
              label="职业："
              :prop="'family.' + index + '.work'"
              :rules="{
         required: true, message: '输入职业', trigger: 'blur'
         }"
            >
              <el-input v-model="formData.family[index].work" placeholder="请输职业" />
            </el-form-item>
            <el-form-item
              label="联系电话："
              :prop="'family.' + index + '.tel'"
              :rules="{
         required: true, message: '联系电话', trigger: 'blur'
         }"
            >
              <el-input v-model="formData.family[index].tel" placeholder="联系电话" />
            </el-form-item>
            <el-form-item
              label="工作单位："
              :prop="'family.' + index + '.company'"
              :rules="{
         required: true, message: '输入工作单位', trigger: 'blur'
         }"
            >
              <el-input v-model="formData.family[index].company" placeholder="请输工作单位" />
            </el-form-item>
            <el-button
              class="remove"
              size="small"
              type="danger"
              icon="el-icon-delete"
              @click="remove('family',index)"
            >删除</el-button>
          </div>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { selectOptionList } from "@/api/setting/setting";
import { addInterviewInfo } from "@/api/interview/interviewList";
export default {
  props: {
    dialog: Object
  },
  data() {
    return {
      formData: {
        audition_invitation:"",
        offer_name: "",
        intended_name: "",
        cn_name: "",
        en_name: "",
        sex: "",
        nation: "",
        native_place: "",
        height_weight: "",
        birth_date: "",
        age: "",
        marriage: "",
        degree: "",
        face: "",
        speciality: "",
        school: "",
        finish_date: "",
        computer_level: "",
        language_level: "",
        IDcard: "",
        email: "",
        address: "",
        household_type: "",
        urgent_contact: "",
        contact_relation_phone: "",
        contact_phone:'',
        // friend: "",
        // friend_relation_phone: "",
        recommender:'',
        recommender_depart:'',
        recommender_phone:'',
        channel_name: "",
        tj_date: "",
        history_health: "",
        health: "",
        hope_salary: "",
        duty_date: "",
        self_assessment: "",
        living_place: "",
        abode_nature: "",
        phone: "",
        certificate: "",
        answer_soft: "",
        education: [
          {
            school_name: "",
            start_date: "",
            end_date: "",
            speciality: "",
            degree: "",
            way: "",
            contact_phone: ""
          }
        ],
        work: [
          {
            company_name: "",
            start_date: "",
            end_date: "",
            position_name: "",
            salary: "",
            leave_reason: "",
            contact_phone: ""
          }
        ],
        family: [
          {
            name: "",
            relation: "",
            work: "",
            tel: "",
            company: ""
          }
        ]
      },
      rules: {
        audition_invitation: [
          { required: true, message: "选择面试邀约人", trigger: "change" }
        ],
        offer_name: [
          { required: true, message: "选择应聘职位", trigger: "change" }
        ],
        intended_name: [
          { required: true, message: "选择意向工作地点", trigger: "change" }
        ],
        cn_name: [{ required: true, message: "输入中文姓名", trigger: "blur" }],
        en_name: [{ required: true, message: "输入英文姓名", trigger: "blur" }],
        sex: [{ required: true, message: "选择性别", trigger: "change" }],
        nation: [{ required: true, message: "输入民族", trigger: "blur" }],
        native_place: [
          { required: true, message: "输入籍贯", trigger: "blur" }
        ],
        height_weight: [
          { required: true, message: "输入身高/体重", trigger: "blur" }
        ],
        birth_date: [
          { required: true, message: "选择出生日期", trigger: "change" }
        ],
        age: [{ required: true, message: "输入年龄", trigger: "blur" }],
        degree: [{ required: true, message: "输入学历", trigger: "blur" }],
        marriage: [
          { required: true, message: "选择是否婚育", trigger: "change" }
        ],
        face: [{ required: true, message: "输入政治面貌", trigger: "blur" }],
        speciality: [{ required: true, message: "输入专业", trigger: "blur" }],
        school: [{ required: true, message: "输入毕业学校", trigger: "blur" }],
        finish_date: [
          { required: true, message: "选择毕业时间", trigger: "change" }
        ],
        computer_level: [
          { required: true, message: "输入计算机水平", trigger: "blur" }
        ],
        language_level: [
          { required: true, message: "输入外语水平", trigger: "blur" }
        ],
        phone: [{ required: true, message: "输入联系方式", trigger: "blur" }],
        IDcard: [
          { required: true, message: "输入身份证号码", trigger: "blur" }
        ],
        email: [{ required: true, message: "输入邮箱", trigger: "blur" }],
        address: [
          { required: true, message: "输入身份证地址", trigger: "blur" }
        ],
        household_type: [
          { required: true, message: "选择户籍类型", trigger: "change" }
        ],
        urgent_contact: [
          { required: true, message: "输入紧急联系人", trigger: "blur" }
        ],
        
        living_place: [
          { required: true, message: "输入现居住地", trigger: "blur" }
        ],
        abode_nature: [
          { required: true, message: "选择现居住地性质", trigger: "change" }
        ],
        contact_relation_phone: [
          {
            required: true,
            message: "输入紧急联系人关系",
            trigger: "blur"
          }
        ],
        contact_phone:[
          {
            required: true,
            message: "输入紧急联系人电话",
            trigger: "blur"
          }
        ],
        recommender:[
          {
            required: true,
            message: "输入推荐人",
            trigger: "blur"
          }
        ],
        recommender_depart:[
          {
            required: true,
            message: "输入推荐人部门",
            trigger: "blur"
          }
        ],
        recommender_phone:[
          {
            required: true,
            message: "输入推荐人联系方式",
            trigger: "blur"
          }
        ],
        friend: [
          { required: true, message: "输入本司任职亲友", trigger: "blur" }
        ],
        friend_relation_phone: [
          { required: true, message: "输入本司亲友关系/电话", trigger: "blur" }
        ],
        channel_name: [
          { required: true, message: "输入入司渠道", trigger: "change" }
        ],
        tj_date: [{ required: true, message: "输入体检时间", trigger: "blur" }],
        history_health: [
          { required: true, message: "输入曾患何种疾病", trigger: "blur" }
        ],
        health: [{ required: true, message: "输入健康状况", trigger: "blur" }],
        hope_salary: [
          { required: true, message: "输入期望薪资", trigger: "blur" }
        ],
        certificate: [
          { required: true, message: "输入获得证书", trigger: "blur" }
        ],
        duty_date: [
          { required: true, message: "输入最快到岗时间", trigger: "blur" }
        ],
        self_assessment: [
          { required: true, message: "输入自我评价", trigger: "blur" }
        ],
        answer_soft: [
          { required: true, message: "输入加入公司，你更看重", trigger: "blur" }
        ]
      },
      option:{},
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
      option7: [
        {
          value: 1,
          label: "统招"
        },
        {
          value: 2,
          label: "自考"
        },
        {
          value: 3,
          label: "成考"
        },
        {
          value: 4,
          label: "其它"
        }
      ],
      option8: [
        {
          value: 1,
          label: "未婚未育"
        },
        {
          value: 2,
          label: "已婚未育"
        },
        {
          value: 3,
          label: "已婚已育"
        },
        {
          value: 4,
          label: "离异"
        }
      ],
      option9: [
        { label: "本地城镇", value: 1 },
        { label: "本地农村", value: 2 },
        { label: "外地城镇", value: 3 },
        { label: "外地农村", value: 4 }
      ],
      option10: [
        { label: "自购", value: 1 },
        { label: "租赁", value: 2 },
        { label: "亲友", value: 3 }
      ],
      date: null,
      channelType:false
    };
  },
  methods: {
    hideDialog() {
      this.$refs["form"].resetFields();
      this.dialog.centerDialogVisible = false;
    },
    getData() {
      selectOptionList().then(res => {
        this.option=res.data[17]
        this.option2 = res.data[0];
        this.option3 = res.data[1];
        this.option4 = res.data[2];
      });
    },
    //添加教育
    addEducation() {
      this.formData.education.push({
        school_name: "",
        start_date: "",
        end_date: "",
        speciality: "",
        degree: "",
        way: ""
      });
    },
    // 添加工作经历
    addWork() {
      this.formData.work.push({
        company_name: "",
        start_date: "",
        end_date: "",
        position_name: "",
        salary: "",
        leave_reason: ""
      });
    },
    addHome() {
      this.formData.family.push({
        name: "",
        relation: "",
        work: "",
        tel: "",
        company: ""
      });
    },
    // 删除
    remove(name, index) {
      if (name == "education") {
        this.formData.education.splice(index, 1);
      } else if (name == "work") {
        this.formData.work.splice(index, 1);
      } else if (name == "family") {
        this.formData.family.splice(index, 1);
      }
    },
    //判断是否内部推荐
    channel(name){
      if(name == '内部推荐'){
        this.channelType = true;
      }else{
        this.channelType = false;
        this.formData.recommender = '';
        this.formData.recommender_depart ='';
        this.formData.recommender_phone = '';
      }
    },
    audition(){
      return this.option.filter(res => {
        return res.id == this.formData.audition_invitation
      });
    },
    //提交
    confirm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          let data = {
            audition_invitation:this.audition()[0].name,
            audition_invitation_id:this.audition()[0].id,
            offer_name: this.formData.offer_name,
            intended_name: this.formData.intended_name,
            cn_name: this.formData.cn_name,
            en_name: this.formData.en_name,
            sex: this.formData.sex,
            phone: this.formData.phone,
            nation: this.formData.nation,
            native_place: this.formData.native_place,
            height_weight: this.formData.height_weight,
            birth_date: this.formData.birth_date,
            age: this.formData.age,
            marriage: this.formData.marriage,
            degree: this.formData.degree,
            face: this.formData.face,
            speciality: this.formData.speciality,
            school: this.formData.school,
            finish_date: this.formData.finish_date,
            computer_level: this.formData.computer_level,
            language_level: this.formData.language_level,
            IDcard: this.formData.IDcard,
            email: this.formData.email,
            living_place: this.formData.living_place,
            abode_nature: this.formData.abode_nature,
            certificate: this.formData.certificate,
            answers: "",
            address: this.formData.address,
            household_type: this.formData.household_type,
            urgent_contact: this.formData.urgent_contact,
            contact_relation_phone: this.formData.contact_relation_phone,
            contact_phone:this.formData.contact_phone,
            // friend: this.formData.friend,
            // friend_relation_phone: this.formData.friend_relation_phone,
            recommender:this.formData.recommender,
            recommender_depart:this.formData.recommender_depart,
            recommender_phone:this.formData.recommender_phone,
            channel_name: this.formData.channel_name,
            tj_date: this.formData.tj_date,
            history_health: this.formData.history_health,
            health: this.formData.health,
            hope_salary: this.formData.hope_salary,
            duty_date: this.formData.duty_date,
            self_assessment: this.formData.self_assessment,
            answer_soft: this.formData.answer_soft,
            education: JSON.stringify(this.formData.education),
            family: JSON.stringify(this.formData.family),
            work: JSON.stringify(this.formData.work)
          };
          // return;
          addInterviewInfo(data).then(res => {
            if (res.code == 0) {
              this.$message({
                message: res.message || res.msg,
                type: "success"
              });
              this.hideDialog();
              this.$emit("upData");
            } else {
              this.$message({
                message: res.message || res.msg,
                type: "error"
              });
            }
          });
        }
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
.title {
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  height: 40px;
  line-height: 40px;
  columns: #222;
  margin-bottom: 10px;
}
.form {
  display: flex;
  min-width: 2000px;
}
.list {
  width: 320px;
  margin-right: 20px;
  position: relative;
  margin-bottom: 10px;
}
.time {
  width: 190px;
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
.remove {
  margin: 0 auto;
  display: block;
}
</style>