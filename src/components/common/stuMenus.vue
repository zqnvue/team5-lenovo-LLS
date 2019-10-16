<template>
  <div id="stuMenus">
    <el-row :gutter="20">
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <img src="../../images/lenovo.png" alt />
        </div>
      </el-col>
      <el-col :span="14">
        <div class="grid-content bg-purple">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            id="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
          >
            <el-menu-item index="1" id="el-menu-demo">我的专业</el-menu-item>
            <el-submenu index="2">
              <template slot="title" id="myclass2">我的课程</template>
              <!-- (item,xiabiao) in arr 循环遍历arr中的每一项 xiabiao是唯一标识 -->
              <el-submenu :index="'2-'+xiabiao" v-for="(item,xiabiao) in arr" :key="xiabiao">
                <!-- 第xxx学期 -->
                <template slot="title">{{item.name}}</template>
                <el-menu-item index="2-1-1" v-for="(items,index) in item.childList" :key="index">
                  <!-- 课程名 -->
                  <a href="#" @click.prevent="toMyClassList(items.id,items.name)">{{items.name}}</a>
                </el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="3" id="el-menu-demo">我的成长</el-menu-item>
            <el-menu-item index="4" id="el-menu-demo">我的参与</el-menu-item>
            <el-menu-item index="5" id="el-menu-demo">我的考试</el-menu-item>
          </el-menu>
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <ul>
            <li>
              <span style="cursor:pointer;color:#A3A3A4;font-size:14px;">张倩男</span>
              <span class="ask_title">在线提问</span>
              <span style="cursor:pointer;color:#A3A3A4;font-size:14px;margin-left:15px">退出</span>
            </li>
          </ul>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "stuMenus",
  data() {
    return {
      activeIndex: "2",
      // 用空数组，动态接收数据
      arr: []
    };
  },
  methods: {
    handleSelect(key) {
      if (key == 1) {
        this.$router.push("/student/StuMajor");
      } else if (key == 2) {
        this.$router.push("/student/StuClass");
      } else if (key == 3) {
        this.$router.push("/student/MyGrow");
      } else if (key == 4) {
        this.$router.push("/student/MyJoin");
      } else if (key == 5){
        this.$router.push("/student/MyTest");
      }
    },
    toMyClassList(itemId,name){
      this.$router.push({
        name: 'StuClass',
        params: {
          id :itemId,
          name : name
        }
      })
    }
  },
  created() {
    //组件加载完之后的生命周期函数，如果页面一加载就需要展示数据，那么数据在这获取
    var app = this;
    this.$http
      .get("/product/majorCustom/getMajorCustomForCurrentUser")
      .then(function(res) {
        // 把获取到的数据 放到arr中
        app.arr = res.data[0].majorCustomItemTreeAdapterList;
      });
  }
};
</script>
<style lang="">
#el-menu-demo {
  height: 46px;
  box-sizing: border-box;
}
#myclass2 {
  line-height: 60px !important;
}
a {
  color: #6c6868;
  font-size: 12px;
}
.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
  padding-left: 0 !important;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.grid-content img {
  height: 46px;
  display: block;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.loginUser {
  overflow: hidden;
}
.loginUser li {
  float: left;
  margin-left: 20px;
}
.logoutSvg {
  opacity: 0.1;
}
.ask_title {
  background: #49c0e0;
  font-size: 14px;
  color: white;
  padding: 15px 5px;
}
.ask_title:hover {
  cursor: pointer;
}
#stuMenus .el-badge__content.is-fixed {
  top: 11px;
  line-height: 13px;
  padding: 0px 3px;
  height: 13px;
}
</style>