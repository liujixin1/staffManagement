<template>
  <div class="container">
    <el-dialog
      title="员工基础信息采集卡"
      :visible.sync="dialog.centerDialogVisible"
      width="100%"
      center
      :fullscreen="true"
      :lock-scroll="true"
      @open="getData"
      @close="hideDialog"
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

          <el-form-item label="所在公司：" prop="company_name">
            <el-select
              v-model="formData.company_name"
              @change="company(formData.company_name)"
              placeholder="请选择公司"
            >
              <el-option
                v-for="item in option"
                :key="item.value"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="部门名称：" prop="department_name">
            <el-select
              v-model="formData.department_name"
              @change="department(formData.department_name)"
              placeholder="请选择部门"
            >
              <el-option
                v-for="item in option2"
                :key="item.value"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="职位名称：" prop="position_name">
            <!-- <el-select
              v-model="formData.position_name"
              @change="position(formData.position_name)"
              placeholder="请选择职位"
            >
              <el-option
                v-for="item in option3"
                :key="item.value"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>-->
            <el-cascader @change="position" :options="option3" :props="defaultProps" clearable></el-cascader>
          </el-form-item>
          <el-form-item label="岗位性质：" prop="nature_name">
            <el-select
              v-model="formData.nature_name"
              @change="nature(formData.nature_name)"
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
          <el-form-item label="所在校区：" prop="school_name">
            <el-select
              v-model="formData.school_name"
              @change="school(formData.school_name)"
              placeholder="请选择校区"
            >
              <el-option
                v-for="item in option12"
                :key="item.value"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="入职时间：" prop="entry_date">
            <el-date-picker
              class="time"
              value-format="yyyy-MM-dd"
              v-model="formData.entry_date"
              type="date"
              placeholder="选择入职时间"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="中文姓名：" prop="cn_name">
            <el-input v-model="formData.cn_name" placeholder="请输入中文姓名" />
          </el-form-item>
          <el-form-item label="英文姓名：" prop>
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
          <el-form-item label="年龄：" prop="age">
            <el-input v-model="formData.age" placeholder="请输年龄" />
          </el-form-item>
          <el-form-item label="民族：" prop="nation">
            <el-input v-model="formData.nation" placeholder="请输民族" />
          </el-form-item>
          <el-form-item label="籍贯：" prop="native_place">
            <el-input v-model="formData.native_place" placeholder="请输籍贯" />
          </el-form-item>
          <el-form-item label="国籍：" prop="nationality">
            <el-input v-model="formData.nationality" placeholder="请输国籍" />
          </el-form-item>
          <el-form-item label="微信号：" prop="wechat_code">
            <el-input v-model="formData.wechat_code" placeholder="请输入微信号" />
          </el-form-item>
          <el-form-item label="联系方式：" prop="phone">
            <el-input v-model="formData.phone" placeholder="请输入联系方式" />
          </el-form-item>
        </div>
        <div class="list">
          <div class="title">基本信息</div>
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
          <el-form-item label="身份证地址：" prop="address">
            <el-input v-model="formData.address" placeholder="请输入身份证地址" />
          </el-form-item>
          <el-form-item label="邮编：" prop>
            <el-input v-model="formData.postal_code" placeholder="请输入身份证地址邮编" />
          </el-form-item>
          <el-form-item label="居住地址：" prop="living_place">
            <el-input v-model="formData.living_place" placeholder="请输入居住地址" />
          </el-form-item>
          <el-form-item label="邮编：" prop>
            <el-input v-model="formData.living_postal_code" placeholder="请输入现居地址邮编" />
          </el-form-item>
          <el-form-item label="户籍类型：" prop>
            <el-select v-model="formData.household_type" placeholder="请选择户籍类型">
              <el-option
                v-for="item in option9"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="政治面貌：" prop="face">
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
            <el-input v-model="formData.school" placeholder="请输入毕业学校(最高学历)" />
          </el-form-item>
          <el-form-item label="学校地址：" prop>
            <el-input v-model="formData.school_address" placeholder="请输入学校地址" />
          </el-form-item>
          <!-- <el-form-item label="毕业时间：" prop="finish_date">
            <el-date-picker
              class="time"
              value-format="yyyy-MM-dd"
              v-model="formData.finish_date"
              type="date"
              placeholder="选择毕业时间"
            ></el-date-picker>
          </el-form-item>-->
          <el-form-item label="计算机水平：" prop>
            <el-input v-model="formData.computer_level" placeholder="请输入计算机水平" />
          </el-form-item>
          <el-form-item label="外语水平：" prop="language_level">
            <el-input v-model="formData.language_level" placeholder="请输入外语水平" />
          </el-form-item>
          <el-form-item label="邮箱：" prop="email">
            <el-input v-model="formData.email" placeholder="请输入邮箱" />
          </el-form-item>
        </div>
        <div class="list">
          <div class="title">基本信息</div>

          <el-form-item label="紧急联系人：" prop="urgent_contact">
            <el-input v-model="formData.urgent_contact" placeholder="请输入紧急联系人" />
          </el-form-item>
          <el-form-item label="联系人关系：" prop="contact_relation_phone">
            <el-input v-model="formData.contact_relation_phone" placeholder="请输入紧急联系人关系" />
          </el-form-item>
          <el-form-item label="联系人电话：" prop="contact_phone">
            <el-input v-model="formData.contact_phone" placeholder="请输入紧急联系人电话" />
          </el-form-item>
          <el-form-item label="员工状态：" prop>
            <el-select v-model="formData.employee_status_name" placeholder="请选择员工状态">
              <el-option
                v-for="item in option13"
                :key="item.value"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="最近体检时间：" prop="tj_date">
            <el-date-picker
              class="time"
              value-format="yyyy-MM-dd"
              v-model="formData.tj_date"
              type="date"
              placeholder="选择最近体检时间"
            ></el-date-picker>
          </el-form-item>-->
          <!-- <el-form-item label="曾患何种疾病：" prop="history_health">
            <el-input v-model="formData.history_health" placeholder="请输入曾患何种疾病" />
          </el-form-item>-->
          <el-form-item label="健康状况：" prop="health">
            <el-input v-model="formData.health" placeholder="请输入健康状况" />
          </el-form-item>
          <el-form-item label="血型：" prop>
            <el-input v-model="formData.blood_type" placeholder="请输入血型" />
          </el-form-item>

          <el-form-item label="首次北京社保：" prop="is_beijing_social_insurance">
            <el-select v-model="formData.is_beijing_social_insurance" placeholder="是否首次在北京参加社会保险">
              <el-option
                v-for="item in option10"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="竞业禁止：" prop="business_strife">
            <el-select v-model="formData.business_strife" placeholder="是否与原单位存在当期竞业禁止">
              <el-option
                v-for="item in option11"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="兴趣爱好：" prop="hobby">
            <el-input v-model="formData.hobby" type="textarea" placeholder="输入兴趣爱好" />
          </el-form-item>
          <el-form-item label="曾获奖励：" prop>
            <el-input v-model="formData.reward" type="textarea" placeholder="输入曾获奖励(大学期间)" />
          </el-form-item>
          <el-form-item label="自我评价：" prop>
            <el-input v-model="formData.self_assessment" type="textarea" placeholder="输入自我评价" />
          </el-form-item>
          <el-form-item label="座右铭及感悟：" prop="motto">
            <el-input v-model="formData.motto" type="textarea" placeholder="输入座右铭及感悟" />
          </el-form-item>
          <el-form-item label="入司告白：" prop="confession">
            <el-input v-model="formData.confession" type="textarea" placeholder="输入入司告白" />
          </el-form-item>
          <el-form-item label="入职声明：">
            <el-input v-model="formData.statement" type="textarea" placeholder="输入入职声明" />
          </el-form-item>
          <el-form-item label="上传照片：">
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
          </el-form-item>
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
            <!-- <el-form-item
              label="证明人/联系："
              :prop="'education.' + index + '.contact_phone'"
              :rules="{
         required: true, message: '填写证明人及联系方式', trigger: 'blur'
         }"
            >
              <el-input
                v-model="formData.education[index].contact_phone"
                placeholder="请输入证明人及联系方式"
              />
            </el-form-item>-->
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
                placeholder="选择结束日期"
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
              label="证明人/联系："
              :prop="'work.' + index + '.contact_phone'"
              :rules="{
         required: true, message: '填写证明人及联系方式', trigger: 'blur'
         }"
            >
              <el-input v-model="formData.work[index].contact_phone" placeholder="请输入证明人及联系方式" />
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
        <div class="list">
          <div class="title">培训经历</div>
          <el-button
            class="add"
            size="small"
            type="primary"
            icon="el-icon-circle-plus"
            @click="addTrain()"
          >新增</el-button>
          <div class="main" v-for="(phone, index) in formData.train" :key="index">
            <el-form-item label="培训单位：" :prop="'train.' + index + '.company'">
              <el-input v-model="formData.train[index].company" placeholder="请输培训单位" />
            </el-form-item>
            <el-form-item label="开始时间：" :prop="'train.' + index + '.train_date'">
              <el-date-picker
                class="time"
                value-format="yyyy-MM-dd"
                v-model="formData.train[index].train_date"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间：" :prop="'train.' + index + '.end_date'">
              <el-date-picker
                class="time"
                value-format="yyyy-MM-dd"
                v-model="formData.train[index].end_date"
                type="date"
                placeholder="选择结束日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="培训内容：" :prop="'train.' + index + '.position'">
              <el-input
                type="textarea"
                v-model="formData.train[index].position"
                placeholder="请输培训内容"
              />
            </el-form-item>
            <el-form-item label="获得证书：" :prop="'train.' + index + '.certificate'">
              <el-input
                type="textarea"
                v-model="formData.train[index].certificate"
                placeholder="请输获得证书"
              />
            </el-form-item>
            <el-button
              class="remove"
              size="small"
              type="danger"
              icon="el-icon-delete"
              @click="remove('train',index)"
            >删除</el-button>
          </div>
        </div>
        <!-- <div class="list">
          <div class="title">培训经历</div>
          <el-button
            class="add"
            size="small"
            type="primary"
            icon="el-icon-circle-plus"
            @click="addTrain()"
          >新增</el-button>
          <div class="main" v-for="(phone, index) in formData.train" :key="index">
            <el-form-item
              label="培训单位："
              :prop="'train.' + index + '.company'"
              :rules="{
         required: true, message: '输入培训单位', trigger: 'blur'
         }"
            >
              <el-input v-model="formData.train[index].company" placeholder="请输培训单位" />
            </el-form-item>
            <el-form-item
              label="开始时间："
              :prop="'train.' + index + '.train_date'"
              :rules="{
         required: true, message: '选择开始时间', trigger: 'change'
         }"
            >
              <el-date-picker
                class="time"
                value-format="yyyy-MM-dd"
                v-model="formData.train[index].train_date"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item
              label="结束时间："
              :prop="'train.' + index + '.end_date'"
              :rules="{
         required: true, message: '选择结束时间', trigger: 'change'
         }"
            >
              <el-date-picker
                class="time"
                value-format="yyyy-MM-dd"
                v-model="formData.train[index].end_date"
                type="date"
                placeholder="选择结束日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item
              label="培训内容："
              :prop="'train.' + index + '.position'"
              :rules="{
         required: true, message: '输入培训内容', trigger: 'blur'
         }"
            >
              <el-input
                type="textarea"
                v-model="formData.train[index].position"
                placeholder="请输培训内容"
              />
            </el-form-item>
            <el-form-item
              label="获得证书："
              :prop="'train.' + index + '.certificate'"
              :rules="{
         required: true, message: '输入获得证书', trigger: 'blur'
         }"
            >
              <el-input
                type="textarea"
                v-model="formData.train[index].certificate"
                placeholder="请输获得证书"
              />
            </el-form-item>
            <el-button
              class="remove"
              size="small"
              type="danger"
              icon="el-icon-delete"
              @click="remove('train',index)"
            >删除</el-button>
          </div>
        </div>-->
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
import { addEmployee } from "@/api/staff/staffList";
import { base64Uploads } from "@/api/performance/performanceList";
export default {
  props: {
    dialog: Object
  },
  data() {
    return {
      imageUrl: "",
      formData: {
        company_name: "",
        company_id: "",
        department_name: "",
        department_id: "",
        position_name: "",
        position_id: "",
        school_name: "",
        school_id: "",
        nature_name: "",
        nature_id: "",
        cn_name: "",
        en_name: "",
        sex: "",
        entry_date: "",
        nationality: "",
        nation: "",
        native_place: "",
        birth_date: "",
        age: "",
        marriage: "",
        degree: "",
        face: "",
        speciality: "",
        school: "",
        // finish_date: "",
        computer_level: "",
        language_level: "",
        IDcard: "",
        email: "",
        address: "",
        household_type: "",
        urgent_contact: "",
        contact_relation_phone: "",
        contact_phone: "",
        living_place: "",
        // channel_name: "",
        // tj_date: "",
        employee_status_name: "",
        health: "",
        wechat_code: "",
        hobby: "",
        is_beijing_social_insurance: "",
        business_strife: "",
        living_postal_code: "",
        postal_code: "",
        blood_type: "",
        phone: "",
        reward: "",
        self_assessment: "",
        motto: "",
        confession: "",
        school_address: "",
        statement: "",

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
        ],
        train: [
          {
            train_date: "",
            end_date: "",
            company: "",
            position: "",
            certificate: ""
          }
        ]
      },
      rules: {
        company_name: [
          { required: true, message: "选择公司", trigger: "change" }
        ],
        department_name: [
          { required: true, message: "选择部门", trigger: "change" }
        ],
        school_name: [
          { required: true, message: "选择校区", trigger: "change" }
        ],
        position_name: [
          { required: true, message: "选择职位", trigger: "change" }
        ],
        nature_name: [
          { required: true, message: "选择岗位性质", trigger: "change" }
        ],
        entry_date: [
          { required: true, message: "选入职时间", trigger: "change" }
        ],
        cn_name: [{ required: true, message: "输入中文姓名", trigger: "blur" }],
        en_name: [{ required: true, message: "输入英文姓名", trigger: "blur" }],
        sex: [{ required: true, message: "选择性别", trigger: "change" }],
        nation: [{ required: true, message: "输入民族", trigger: "blur" }],
        native_place: [
          { required: true, message: "输入籍贯", trigger: "blur" }
        ],
        nationality: [{ required: true, message: "输入国籍", trigger: "blur" }],
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
        // finish_date: [
        //   { required: true, message: "选择毕业时间", trigger: "change" }
        // ],
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
        contact_relation_phone: [
          {
            required: true,
            message: "输入紧急联系人关系",
            trigger: "blur"
          }
        ],
        contact_phone: [
          {
            required: true,
            message: "输入紧急联系人电话",
            trigger: "blur"
          }
        ],
        postal_code: [
          { required: true, message: "输入身份证地址", trigger: "blur" }
        ],
        self_assessment: [
          { required: true, message: "输入自我评价", trigger: "blur" }
        ],
        living_place: [
          { required: true, message: "输入居住地址", trigger: "blur" }
        ],
        motto: [
          { required: true, message: "输入座右铭及感悟", trigger: "blur" }
        ],
        confession: [
          { required: true, message: "输入入司告白", trigger: "blur" }
        ],
        reward: [
          { required: true, message: "输入获得过的奖励", trigger: "blur" }
        ],
        // channel_name: [
        //   { required: true, message: "输入入司渠道", trigger: "blur" }
        // ],
        // tj_date: [{ required: true, message: "输入体检时间", trigger: "blur" }],
        employee_status_name: [
          { required: true, message: "选择员工状态", trigger: "change" }
        ],
        wechat_code: [
          { required: true, message: "输入微信号", trigger: "blur" }
        ],
        health: [{ required: true, message: "输入健康状况", trigger: "blur" }],
        school_address: [
          { required: true, message: "输入学校地址", trigger: "blur" }
        ],
        hobby: [{ required: true, message: "输入兴趣爱好", trigger: "blur" }],
        is_beijing_social_insurance: [
          {
            required: true,
            message: "选择是否首次在北京参加社会保险",
            trigger: "change"
          }
        ],
        business_strife: [
          {
            required: true,
            message: "选择是否与原单位存在当期竞业禁止",
            trigger: "change"
          }
        ],
        living_postal_code: [
          { required: true, message: "输入居住地址邮编", trigger: "blur" }
        ],
        blood_type: [{ required: true, message: "输入血型", trigger: "blur" }],
        statement: [
          { required: true, message: "输入入职声明", trigger: "blur" }
        ]
      },
      defaultProps: {
        children: "child",
        label: "name",
        value: "id",
        checkStrictly: true
      },
      option: [],
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
        {
          value: 1,
          label: "是"
        },
        {
          value: 2,
          label: "否"
        }
      ],
      option11: [
        {
          value: 1,
          label: "是"
        },
        {
          value: 2,
          label: "否"
        }
      ],
      option12: [],
      option13: [],
      date: null,
      positions: null,
      baseUrl: ""
    };
  },
  created() {
    let url = this.$axios.defaults.baseURL;
    let endlength = url.indexOf("/index");
    this.baseUrl = url.substring(0, endlength);
  },
  methods: {
    handleAvatarSuccess(param) {
      let data = new window.FormData();
      data.append("images", param.file);
      data.append("type", "photo");
      this.$axios.post("/api/uploads/upload", data).then(res => {
        if (res.data.code == 0) {
          this.$message({
            message: res.data.message || res.data.msg,
            type: "success"
          });
          this.imageUrl = res.data.data.file_url;
        }
      });
    },
    hideDialog() {
      this.$refs["form"].resetFields();
      this.dialog.centerDialogVisible = false;
    },
    getData() {
      let data = {
        ispc: 1
      };
      selectOptionList(data).then(res => {
        this.option = res.data[3];
        this.option2 = res.data[5];
        this.option3 = res.data[6];
        this.option4 = res.data[7];
        this.option13 = res.data[8];
        this.option12 = res.data[4];
        this.positions = res.position;
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
    //添加培训经历
    addTrain() {
      this.formData.train.push({
        train_date: "",
        end_date: "",
        company: "",
        position: "",
        certificate: ""
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
      } else if (name == "train") {
        this.formData.train.splice(index, 1);
      }
    },
    company(e) {
      let arr = this.option.filter(res => {
        return res.name == e;
      });
      this.formData.company_id = arr[0].id;
      console.log(this.formData.company_id);
    },
    school(e) {
      let arr = this.option12.filter(res => {
        return res.name == e;
      });
      this.formData.school_id = arr[0].id;
      console.log(this.formData.school_id);
    },
    department(e) {
      let arr = this.option2.filter(res => {
        return res.name == e;
      });
      this.formData.department_id = arr[0].id;
      console.log(this.formData.department_id);
    },
    // position(e) {
    //   let arr = this.option3.filter(res => {
    //     return res.name == e;
    //   });
    //   this.formData.position_id = arr[0].id;
    //   console.log(this.formData.position_id);
    // },
    nature(e) {
      let arr = this.option4.filter(res => {
        return res.name == e;
      });
      this.formData.nature_id = arr[0].id;
      console.log(this.formData.nature_id);
    },
    position(e) {
      console.log(e);
      let len = e.length - 1;
      this.formData.position_id = e[len];
      this.formData.position_name = this.positions[this.formData.position_id];
    },
    //提交
    confirm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.imageUrl == "") {
            this.$message({
              type: "info",
              message: "请上传照片"
            });
          } else {
            let data = {
              company_name: this.formData.company_name,
              company_id: this.formData.company_id,
              department_name: this.formData.department_name,
              department_id: this.formData.department_id,
              position_name: this.formData.position_name,
              position_id: this.formData.position_id,
              nature_name: this.formData.nature_name,
              nature_id: this.formData.nature_id,
              school_name: this.formData.school_name,
              school_id: this.formData.school_id,
              entry_date: this.formData.entry_date,
              cn_name: this.formData.cn_name,
              en_name: this.formData.en_name,
              sex: this.formData.sex,
              school_address: this.formData.school_address,
              nationality: this.formData.nationality,
              nation: this.formData.nation,
              native_place: this.formData.native_place,
              birth_date: this.formData.birth_date,
              age: this.formData.age,
              marriage: this.formData.marriage,
              degree: this.formData.degree,
              face: this.formData.face,
              speciality: this.formData.speciality,
              school: this.formData.school,
              photo: this.imageUrl,
              // finish_date: this.formData.finish_date,
              computer_level: this.formData.computer_level,
              language_level: this.formData.language_level,
              IDcard: this.formData.IDcard,
              email: this.formData.email,
              address: this.formData.address,
              household_type: this.formData.household_type,
              urgent_contact: this.formData.urgent_contact,
              contact_relation_phone: this.formData.contact_relation_phone,
              contact_phone: this.formData.contact_phone,
              living_place: this.formData.living_place,
              // channel_name: this.formData.channel_name,
              // tj_date: this.formData.tj_date,
              // history_health: this.formData.history_health,
              health: this.formData.health,
              wechat_code: this.formData.wechat_code,
              hobby: this.formData.hobby,
              is_beijing_social_insurance: this.formData
                .is_beijing_social_insurance,
              business_strife: this.formData.business_strife,
              postal_code: this.formData.postal_code,
              living_postal_code: this.formData.living_postal_code,
              blood_type: this.formData.blood_type,
              phone: this.formData.phone,
              reward: this.formData.reward,
              self_assessment: this.formData.self_assessment,
              motto: this.formData.motto,
              confession: this.formData.confession,
              statement: this.formData.statement,
              employee_status_name: this.formData.employee_status_name,
              education: JSON.stringify(this.formData.education),
              family: JSON.stringify(this.formData.family),
              work: JSON.stringify(this.formData.work),
              train: JSON.stringify(this.formData.train)
            };
            addEmployee(data).then(res => {
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
  min-width: 2400px;
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
.photo {
  border: 1px dashed #d9d9d9;
  width: 178px;
  height: 178px;
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
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>