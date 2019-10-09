<template>
  <div id="navMenus">
    <el-row :gutter="20">
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <img src="../../images/lenovo.png" alt />
        </div>
      </el-col>
      <el-col :span="14">
        <div class="grid-content bg-purple">
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">我教的专业</el-menu-item>
            <el-submenu index="2">
              <template slot="title">我教的课程</template>
              <el-submenu :index="'2-'+xiabiao" v-for="(item,xiabiao) in arr" :key="xiabiao">
                <template  slot="title">{{item.name}}</template>
                <el-menu-item index="2-1-1" v-for="(items,index) in item.childList" :key="index">
                  <a href="" @click.prevent="toMyClassList(items.id,items.name)">{{items.name}}</a>
                </el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="3">考试管理</el-menu-item>
            <el-menu-item index="4">学员管理</el-menu-item>
            <el-menu-item index="5">课程管理</el-menu-item>
            <el-menu-item index="6">我的贡献</el-menu-item>
          </el-menu>
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <ul>
            <li>
              <span style="cursor:pointer;color:#A3A3A4;font-size:14px;">讲师</span>
              <span class="ask_title">在线解答</span>
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
  name: "navMenus",
  data() {
    return {
      activeIndex: "1",
      // 用空数组，动态接收数据
      arr:[]
    };
  },
  methods: {
    handleSelect(key) {
      if(key == 1){
        this.$router.push('/teacher/MyMajor')
      }else if(key == 2){
        this.$router.push('/teacher/MyClass')
      }else if(key == 3) {
        this.$router.push('/teacher/MyExam')
      }else if(key == 4) {
        this.$router.push('/teacher/StuManger')
      }else if(key == 5) {
        this.$router.push('/teacher/ClassManger')
      }else if(key == 6) {
        this.$router.push('/teacher/MyGood')
      }
    },
    toMyClassList(itemId,name){
      console.log('a')
      this.$router.push({
        name: 'MyClass',
        params: {
          id :itemId,
          name : name
        }
      })
    }
  },
  created(){
     //组件加载完之后的生命周期函数，如果页面一加载就需要展示数据，那么数据在这获取
    var app = this;
    this.$http.get('/product/userMajorCustom/getTeacherMajorCustomAdapterList').then(function(res){
        // 把获取到的数据 放到arr中
        app.arr = res.data[0].majorCustomItemTreeAdapterList;
    })
  }
};
</script>
<style lang="">
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
#navMenus .el-badge__content.is-fixed {
  top: 11px;
  line-height: 13px;
  padding: 0px 3px;
  height: 13px;
}
</style>