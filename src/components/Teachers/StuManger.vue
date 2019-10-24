<template>
  <div id>
    <div id="navbg">
      <div id="navbg-img">
        <div id="h-name">学员管理</div>
        <p id="h-ul">真实客观统计学员数据 贴近学员生活学习 记录学生成长</p>
      </div>
    </div>
    <div id="c-title">
      <p>学员管理</p>
      <div class="c-add">
        <el-row>
          <!-- 两个按钮 -->
          <el-button type="success" @click="addClass = true">新增班级</el-button>
          <el-button type="success" @click="addStu = true">新增学生</el-button>


          <!-- 两个按钮被点击后显示的内容框 -->
          <el-dialog title="新增班级" :visible.sync="addClass">
            <el-form :model="form">
              <el-form-item label="班级名称" :label-width="formLabelWidth">
                <el-input v-model="form.addClassName"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="addClass = false">取 消</el-button>
              <el-button type="primary" @click="toAddClass">确 定</el-button>
            </div>
          </el-dialog>
          

          <el-dialog title="新增学生" :visible.sync="addStu">
            <el-form :model="form">
              <el-form-item label="学生班级：" :label-width="formLabelWidth">
                <!-- form.region选中班级后，框中确定班级 -->
                <el-select v-model="form.classId" placeholder="请选择学生班级">
                  <el-option v-for="item in addClassList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <!-- label-width="formLabelWidth"使form表单文字对齐 -->
              <el-form-item label="姓名：" :label-width="formLabelWidth">
                <el-input class="inpWidth" v-model="form.stuName"></el-input>
              </el-form-item>
              <el-form-item label="电话：" :label-width="formLabelWidth">
                <el-input class="inpWidth" v-model="form.mobile"></el-input>
              </el-form-item>
              <el-form-item label="邮箱：" :label-width="formLabelWidth">
                <el-input class="inpWidth" v-model="form.email"></el-input>
              </el-form-item>
              <el-form-item label="身份证号：" :label-width="formLabelWidth">
                <el-input class="inpWidth" v-model="form.idCard"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="addStu = false">取 消</el-button>
              <el-button type="primary" @click="toAddStu">确 定</el-button>
            </div>
          </el-dialog>
        </el-row>

      </div>
      <!-- 班级的标签列表 -->
      <el-tabs
        :tab-position="tabPosition"
        style="min-height: 200px;margin-left: 105px;background: #f1f5f4;width: 85%;margin-top: 10px;"
        @tab-click="handleClick"
      >
        <el-tab-pane
          :label="item.name"
          v-for="(item,index) in addClassList"
          :key="index"
          :index="item.id"
        >
          <el-table :data="stuList" style="width: 100%">
            <el-table-column  label="姓名" prop="userName"></el-table-column>
            <el-table-column  label="电话" prop="mobile"></el-table-column>
            <el-table-column  label="邮箱" prop="email"></el-table-column>
            <!-- <el-table-column  label="操作"></el-table-column> -->
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  name: "StuManger",
  data() {
    return {
      //当前组件用到的数据
      tabPosition: "left",
      addClassList: [],
      stuList: [],
      addStu: false,
      addClass: false,
      form: {
        // 添加班级的班级名称
        addClassName: "",
        // 添加学生时选择的班级名称id
        classId: "",
        // 学生姓名
        stuName: "",
        // 学生电话
        mobile: "",
        // 学生邮箱
        email: "",
        // 学生的身份证
        sysUserDetail:{
          birthday:"1999-76-98",
          idCard:"",
          national:""
        }
      },
      formLabelWidth: "100px"
    };
  },
  methods: {
    // 添加班级的名称
    toAddClass(){
      this.addClass = false;
      var app = this;
      this.$http.post(`/business/organClass/saveOrUpdateAndGetId`,{
        schoolId: 2,
        majorCustomId: 1,
        name: this.form.addClassName,
        year: '2000'
      }).then(function(res){
        console.log(res.data)
        app.$http.post(`/business/organClassUser/saveRelationship`,{
          userId: '2',
          classId: res.data,
          startDate: '2000-02-13',
          userFlag: 'T'
        }).then(function(res){
          console.log(res)          
        })
      });
    },
    // 添加学生的个人信息
    toAddStu(){
      this.addStu = false;
      this.$http.post(`/business/organClassUser/save`,{
        // 添加的学生姓名
        userName: this.form.stuName,
        email: this.form.email,
        mobile: this.form.mobile,
        classId: this.form.classId,
        sysUserDetail: this.form.sysUserDetail
      }).then(function(res){
        console.log(res.data)
      })
    },
    //当前组件用到的函数
    handleClick(tab, event) {
      var classId = tab.$attrs.index;
      var app = this;
      app.$http
        .get(`/business/organDuty/getStudentListByClassId/${classId}`)
        .then(function(res) {
          app.stuList = res.data;
        });
    }
  },
  created() {
    //组件加载完之后的生命周期函数，如果页面一加载就需要展示数据，那么数据在这获取
    var userId = localStorage.getItem("userId");
    var app = this;
    app.$http
      .get(`/business/organClassUser/allClassListByTeacherId/${userId}`)
      .then(function(res) {
        // console.log(res)
        app.addClassList = res.data;
      });
  }
};
</script>

<style lang="">
#navbg {
  height: 144px;
  background: rgb(253, 66, 106);
}
#navbg-img {
  height: 144px;
  background: url(../../images/back04.png) no-repeat 720px -20px;
  position: relative;
}
#h-name {
  min-width: 400px;
  color: #fff;
  font-size: 25px;
  padding-top: 40px;
  margin-left: 125px;
}
#h-ul {
  margin-left: 125px;
  color: #fff;
}
#c-title p {
  min-width: 100px;
  font-size: 16px;
  height: 22px;
  line-height: 22px;
  text-indent: 11px;
  margin: 15px 0 12px 125px;
  position: relative;
  border-left: 4px solid#49c0e0;
}
.c-add {
  width: 250px;
  margin-left: 1000px;
}
.inpWidth {
  width: 300px;
}
</style>