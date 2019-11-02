<template>
  <div id="app">
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
                  <el-option
                    v-for="item in addClassList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
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
          <el-table
            v-if="stuList.length != 0"
            :data="stuList.filter(data => !search || data.userName.toLowerCase().includes(search.toLowerCase()))"
            style="width: 100%"
            slot-scope="scope"
          >
            <el-table-column label="姓名" prop="userName"></el-table-column>
            <el-table-column label="电话" prop="mobile"></el-table-column>
            <el-table-column label="邮箱" prop="email"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <!-- 使用插槽语法获取到当前行的id值 -->
                <el-button type="text" @click="jiangli_dialog = true">
                  <span @click="jiangli(scope.row.id)">奖励</span>
                </el-button>
                <el-button type="text" @click="daigj_dialog = true"><span @click="jiangli(scope.row.id)">待改进</span></el-button>
              </template>
            </el-table-column>
            <!-- 搜索框 -->
            <el-table-column>
              <template slot="header" slot-scope="scope">
                <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 奖励的弹出框 -->
    <!-- 奖励 -->
    <el-dialog title="奖励" :visible.sync="jiangli_dialog">
      <el-form ref="form" :model="form_jiangli" label-width="80px">
        <el-form-item label="评价时间">
          <el-row>
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form_jiangli.date1"
                style="width: 100%;"
              ></el-date-picker>
            </el-col>
            <el-col :span="5" :offset="8">
              <el-button type="primary" style="float:left" @click="savejl">保存</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <div id="zhuy">奖励共0次，共0分</div>
        <div class="tableTitle">
          <div class="titleLeft"><b>联想9要素</b></div>
          <div class="titleRight"><b>奖励细则</b></div>
        </div>
          <table>
          <template v-for="(tr) of filterGood">
            <tr v-for="(item,i) of tr.childList" :key="item.id">
              <!-- tr.name左侧大标题3要求，5要求，1要求 -->
              <td class="leftTitle" v-if="i===0" :rowspan="tr.childList.length">{{tr.name}}</td>
              <td class="rightContent">
                <!-- item.name沟通、主动、认真等等小标题 -->
                <div class="smallTitle">{{item.name}}</div>
                <ul class="ulBox">
                  <li class="liBox" v-for="(li,index1) in item.childList" :key="index1">
                    <!-- index1+1是序号，li.name是选项的名字 i标签中是奖惩次数-->
                    <el-checkbox @change="checkChange(li.id,$event)" class="lableLeft">
                      ({{index1+1}})
                      {{li.name}}
                      (<i style="color:red;font-weight:200">{{li.nineEssentialFactorRecodeCount}}</i>次)
                    </el-checkbox>
                    <!-- input备注框 -->
                    <el-input class="lableRight"
                      size="small"
                      placeholder="备注"
                      v-model="inputData[li.id]"
                      @change="checkChange(li.id,$event)"
                    ></el-input>
                  </li>
                </ul>
              </td>
            </tr>
          </template>
        </table>
      </el-form>
    </el-dialog>
    <!-- 待改进的弹出框 -->
    <el-dialog title="待改进" :visible.sync="daigj_dialog">
      <el-form ref="form" :model="form_jiangli" label-width="80px">
        <el-form-item label="评价时间">
          <el-row>
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form_jiangli.date1"
                style="width: 100%;"
              ></el-date-picker>
            </el-col>
            <el-col :span="5" :offset="8">
              <el-button type="primary" style="float:left" @click="savejl">保存</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <div id="zhuy">惩罚共0次，共0分</div>
        <div class="tableTitle">
          <div class="titleLeft"><b>联想9要素</b></div>
          <div class="titleRight"><b>惩罚细则</b></div>
        </div>
          <table>
          <template v-for="(tr) of filterBad">
            <tr v-for="(item,i) of tr.childList" :key="item.id">
              <!-- tr.name左侧大标题3要求，5要求，1要求 -->
              <td class="leftTitle" v-if="i===0" :rowspan="tr.childList.length">{{tr.name}}</td>
              <td class="rightContent">
                <!-- item.name沟通、主动、认真等等小标题 -->
                <div class="smallTitle">{{item.name}}</div>
                <ul class="ulBox">
                  <li class="liBox" v-for="(li,index1) in item.childList" :key="index1">
                    <!-- index1+1是序号，li.name是选项的名字 i标签中是奖惩次数-->
                    <el-checkbox @change="checkChange(li.id,$event)" class="lableLeft">
                      ({{index1+1}})
                      {{li.name}}
                      (<i style="color:red;font-weight:200">{{li.nineEssentialFactorRecodeCount}}</i>次)
                    </el-checkbox>
                    <!-- input备注框 -->
                    <el-input class="lableRight"
                      size="small"
                      placeholder="备注"
                      v-model="inputData[li.id]"
                      @change="checkChange(li.id,$event)"
                    ></el-input>
                  </li>
                </ul>
              </td>
            </tr>
          </template>
        </table>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "StuManger",
  data() {
    return {
      checkList: "",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      studentId: "", //当前学生的id
      nineElementsList: [], //联想9要素
      activeName: "", //默认选中
      inputData: [], //备注的内容
      arr: [],
      jiangli_dialog: false,
      daigj_dialog: false,
      form_jiangli: {
        date1: ""
      },
      value1: "",
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
        sysUserDetail: {
          birthday: "1999-76-98",
          idCard: "",
          national: ""
        }
      },
      formLabelWidth: "100px",
      search: ""
    };
  },
  computed: {
    //过滤奖励数据
    filterGood() {
      return this.nineElementsList.filter(function(item) {
        return item.goodOrBad == "G";
      });
    },
    filterBad() {
      return this.nineElementsList.filter(function(item) {
        return item.goodOrBad == "B";
      });
    }
  },
  methods: {
    // 请求班级数据
    classMessage() {
      var userId = localStorage.getItem("userId");
      var app = this;
      app.$http
        .get(`/business/organClassUser/allClassListByTeacherId/${userId}`)
        .then(function(res) {
          app.addClassList = res.data;
        });
    },
    //班级自带点击函数处理
    handleClick(tab, event) {
      this.stuMessage(this.addClassList[tab.index].id);
    },
    // 请求班级中学员的信息
    stuMessage(classId) {
      var app = this;
      app.$http
        .get(`/business/organDuty/getStudentListByClassId/${classId}`)
        .then(function(res) {
          app.stuList = res.data;
        });
    },
    // 添加班级的名称
    toAddClass() {
      this.addClass = false;
      var app = this;
      this.$http
        .post(`/business/organClass/saveOrUpdateAndGetId`, {
          schoolId: 2,
          majorCustomId: 1,
          name: this.form.addClassName,
          year: "2000"
        })
        .then(function(res) {
          console.log(res.data);
          app.$http
            .post(`/business/organClassUser/saveRelationship`, {
              userId: "2",
              classId: res.data,
              startDate: "2000-02-13",
              userFlag: "T"
            })
            .then(function(res) {
              app.classMessage();
            });
        });
    },
    // 添加学生的个人信息
    toAddStu() {
      var app = this;
      this.addStu = false;
      this.$http
        .post(`/business/organClassUser/save`, {
          // 添加的学生姓名
          userName: this.form.stuName,
          email: this.form.email,
          mobile: this.form.mobile,
          classId: this.form.classId,
          sysUserDetail: this.form.sysUserDetail
        })
        .then(function(res) {
          app.stuMessage(app.form.classId);
        });
    },
    // 奖惩9九要素的获取
    goodNineElements(studentId) {
      var app = this;
      this.$http
        .get(
          `/business/nineEssentialFactor/getAllListByStudentIdShowTree/${studentId}`
        )
        .then(res => {
          console.log(res.data);
        });
    },
    // 获取到该学生的奖励和待改进数据
    jiangli(id) {
      var studentId = id;
      var app = this;
      this.$http
        .get(
          `/business/nineEssentialFactor/getAllListByStudentIdShowTree/${studentId}`
        )
        .then(res => {
          app.nineElementsList = res.data; //请求到的联想9要点
        });
    },
    // 奖励和待改进框框的X号关闭
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    // 保存按钮，发送奖励的点击处理函数
    savejl() {
      this.jiangli_dialog = false;
      this.daigj_dialog = false;
      this.$http
        .post("business/nineEssentialFactor/saveFactorRecode", this.arr)
        .then(function() {
          console.log("发送成功");
        });
      this.arr = [];
    },
    // 奖励列表选中单元格发生的事件
    checkChange(id, event) {
      if (typeof event == "string") {
        // ar是选中的每个复选框
        var ar = {
          factorId: id,
          fractionDesc: event,
          rewardPenaltyTime: 1572364800000,
          studentId: this.studentId
        };
        this.arr.push(ar);
        console.log(this.arr);
      }
    },
  },
  created() {
    //组件加载完之后的生命周期函数，如果页面一加载就需要展示数据，那么数据在这获取
    // 请求所有班级的函数
    this.classMessage();
  }
};
</script>

<style>
/* 布局中的header、footer、aside样式 */
/* 绿色框框的样式 */
#zhuy {
  background: rgba(9, 247, 88, 0.904);
  color: rgb(9, 145, 15);
  width: 98%;
  height: 20px;
  line-height: 20px;
  padding-left: 13px;
  margin-top: 20px;
}
/* 奖励的标题，包含两个需要浮动的子div */
.tableTitle {
  overflow: hidden;
  text-align: center;
  background: #daf8d6;
}
.titleLeft {
  width: 15%;
  float: left;
}
.titleRight {
  width: 80%;
  float: right;
}
/* 上半部分----行动3要求 */
.leftTitle {
  border: 1px solid #606266;
  width: 90px;
  text-align: center;
}
.rightContent {
  border: 1px solid #606266;
}
.smallTitle {
  float: left;
  height: 180px;
  width: 150px;
  text-align: center;
  line-height: 180px;
}
.ulBox {
  overflow: hidden;
}
.liBox {
  margin: 10px 0px;
}
.el-checkbox__label {
  width: 160px;
  padding-left: 3px;
  font-size: 12px;
}
.el-input {
  width: 50%;
}

/* 主体背景图片样式 */
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