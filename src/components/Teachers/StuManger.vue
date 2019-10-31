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
                <el-button type="text" @click="jiangli_dialog = true">待改进</el-button>
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
        <table>
          <tr>
            <th>联想9要素</th>
            <th>奖励细则</th>
          </tr>
          <template v-for="(tr) of filterGood">
            <tr v-for="(item,i) of tr.childList" :key="item.id">
              <td v-if="i===0" :rowspan="tr.childList.length">{{tr.name}}</td>
              <td>
                <div>{{item.name}}</div>
                <ul>
                  <li v-for="(li,index1) in item.childList" :key="index1">
                    <el-checkbox @change="checkChange(li.id,$event)">
                      ({{index1+1}})
                      {{li.name}}
                      (
                      <i
                        style="color:red;font-weight:200"
                      >{{li.nineEssentialFactorRecodeCount}}</i>次)
                    </el-checkbox>
                    <el-input
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
      title1: 1,
      title2: 2,
      studentId: "", //当前学生的id
      nineElementsList: [], //联想9要素
      activeName: "", //默认选中
      inputData: [], //备注的内容
      arr: [],
      jiangli_dialog: false,
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
    // 保存按钮，发送奖励的点击处理函数
    savejl() {
      this.jiangli_dialog = false;
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
    jiangli(id) {
      var studentId = id;
      var app = this;
      this.$http
        .get(
          `/business/nineEssentialFactor/getAllListByStudentIdShowTree/${studentId}`
        )
        .then(res => {
          console.log(res.data);
          app.nineElementsList = res.data; //请求到的联想9要点
          console.log(app.filterGood);
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
              console.log(res);
            });
        });
    },
    // 添加学生的个人信息
    toAddStu() {
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
          console.log(res.data);
        });
    },
    // 奖励
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
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
    },
    // 奖惩9九要素
    goodNineElements(studentId, title1) {
      this.studentId = studentId;
      console.log(studentId);
      // if (this.title1 == title1) {
      //   this.jiangl = true;
      // } else {
      //   this.daigj = true;
      // }
      var app = this;
      this.$http
        .get(
          `/business/nineEssentialFactor/getAllListByStudentIdShowTree/${studentId}`
        )
        .then(res => {
          console.log(res.data);
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
        app.addClassList = res.data;
      });
  }
};
</script>

<style>
/* 布局中的header、footer、aside样式 */
/* 最大的框框，只起包含作用 */
.tableBig {
  overflow: hidden;
}
/* 绿色框框的样式 */
#zhuy {
  background: rgba(9, 247, 88, 0.904);
  color: rgb(9, 145, 15);
  height: 30px;
  line-height: 30px;
  padding-left: 20px;
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
.tableTop {
  background: #f8f8f8f6;
  height: 380px;
  overflow: hidden;
}
/* 左大标题栏（3要求） */
.topLeft {
  float: left;
  border: 1px solid rgb(141, 139, 139);
  width: 15%;
  height: 360px;
  margin: 20px 0px 20px 18px;
  box-sizing: border-box;
  line-height: 360px;
  text-align: center;
}
/* 右边内容，又分1、2、3个框 */
.topRight {
  float: right;
  border: 1px solid rgb(141, 139, 139);
  width: 80%;
  height: 360px;
  margin: 20px 20px 20px 0px;
  box-sizing: border-box;
}
.threeBox {
  height: 33%;
  border-bottom: 1px solid rgb(141, 139, 139);
  margin: 1px auto;
  box-sizing: border-box;
  overflow: hidden;
}
.threeBox:nth-child(3) {
  border-bottom: none;
}
/* 所有的小东西框 */
.bb1,
.cc1,
.dd1,
.oo1,
.pp1,
.qq1,
.rr1,
.ss1,
.aa1 {
  text-align: center;
  line-height: 120px;
  width: 25%;
  height: 100%;
  float: left;
  border-right: 1px solid rgb(141, 139, 139);
  padding: 10px auto;
}
.aa1 {
  line-height: 50px;
}
.bb2,
.cc2,
.dd2,
.oo2,
.pp2,
.qq2,
.rr2,
.ss2 {
  width: 36%;
  height: 100%;
  padding: 15px 0 0 5px;
  float: left;
  border-right: 1px solid rgb(141, 139, 139);
}
.aa2 {
  margin: auto 0;
  width: 36%;
  height: 70%;
  padding: 15px 0 0 5px;
  float: left;
  border-right: 1px solid rgb(141, 139, 139);
}
.bb3,
.cc3,
.dd3,
.oo3,
.pp3,
.qq3,
.rr3,
.ss3,
.aa3 {
  border-right: none;
  width: 32%;
  height: 100%;
  margin-top: 15px;
  padding-left: 5px;
  float: left;
}
/* 所有的多选框 */
.el-checkbox__label {
  padding: 2px 0 0 0;
  font-size: 10px;
}
/* 下半部分---品德5要求 */
.tableBottom {
  background: #f8f8f8f6;
  height: 610px;
  /* margin-top: 10px; */
  overflow: hidden;
}
/* 左大标题（5要求） */
.bottomLeft {
  float: left;
  border: 1px solid rgb(141, 139, 139);
  width: 15%;
  height: 600px;
  margin: 10px 0px 20px 18px;
  box-sizing: border-box;
  line-height: 600px;
  text-align: center;
}
/* 右边又分5个内容框 */
.bottomRight {
  float: right;
  border: 1px solid rgb(141, 139, 139);
  width: 80%;
  height: 600px;
  margin: 10px 20px 20px 0px;
  box-sizing: border-box;
}
.fiveBox {
  height: 20%;
  margin: 0 auto;
  border-bottom: 1px solid rgb(141, 139, 139);
  box-sizing: border-box;
  overflow: hidden;
}
.fiveBox:nth-child(5) {
  border-bottom: none;
}
.tableGood {
  background: #f8f8f8f6;
  height: 80px;
  /* margin-top: 10px; */
  overflow: hidden;
}
/* 左边的1标题 */
.goodLeft {
  float: left;
  border: 1px solid rgb(141, 139, 139);
  width: 15%;
  height: 50px;
  margin: 10px 0px 0px 18px;
  box-sizing: border-box;
  line-height: 50px;
  text-align: center;
}
.goodRight {
  float: right;
  border: 1px solid rgb(141, 139, 139);
  width: 80%;
  height: 50px;
  margin: 10px 20px 0px 0px;
  box-sizing: border-box;
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