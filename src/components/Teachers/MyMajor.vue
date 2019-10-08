<template>
<<<<<<< HEAD
  <div id="main">
=======
  <div id="">
>>>>>>> 9e32dacfafdf192054032a10f86315b2d69adbee
    <div id="navbg">
      <div id="navbg-img">
        <div id="h-name">大前端001</div>
        <ul id="h-ul">
          <li id="h-ul-one">共5个学期</li>
          <li>16门课程</li>
          <li>644节课时</li>
        </ul>
      </div>
    </div>
<<<<<<< HEAD
    <div class="wenben">
      <p>专业介绍</p>
      <p>专业章节</p>
    </div>
    <div class="class">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="第一学期" name="1">
          <div>前端001</div>
          <div>前端导论</div>
        </el-collapse-item>
        <el-collapse-item title="第二学期" name="2">
          <div>前端002</div>
        </el-collapse-item>
        <el-collapse-item title="第三学期" name="3">
          <div>php基础</div>
=======
    <div id="c-title">
      <p>专业介绍</p>
      <p>专业章节</p>
    </div>
    <div id="c-main">
      <el-collapse v-model="activeNames" @change="handleChange">
        <!-- 下面是遍历学期的标题 -->
        <el-collapse-item id="item-head" v-for="(item,index) in arr" :key="index" :title="item.name" :name="index">
          <!-- 下面是遍历学期中的课程名 -->
          <div v-for="(items,index) in item.childList" :key="index">
            {{items.name}}
          </div>
>>>>>>> 9e32dacfafdf192054032a10f86315b2d69adbee
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script>
export default {
  name: "MyMajor",
  data() {
    return {
      //当前组件用到的数据
<<<<<<< HEAD
      activeNames: ["1"]
=======
      activeNames: ['1'],
      arr:[],
>>>>>>> 9e32dacfafdf192054032a10f86315b2d69adbee
    };
  },
  methods: {
    //当前组件用到的函数
    handleChange(val) {
<<<<<<< HEAD
      console.log(val);
    }
=======

      }
>>>>>>> 9e32dacfafdf192054032a10f86315b2d69adbee
  },
  created() {
    //组件加载完之后的生命周期函数，如果页面一加载就需要展示数据，那么数据在这获取
    var app = this;
<<<<<<< HEAD
    this.$http
      .get("/product/majorCustom/getMajorCustomForCurrentUser")
      .then(function(res) {
        console.log(res);
      });
=======
    this.$http.get('/product/userMajorCustom/getTeacherMajorCustomAdapterList').then(function(res){
        app.arr = res.data[0].majorCustomItemTreeAdapterList;
    })
>>>>>>> 9e32dacfafdf192054032a10f86315b2d69adbee
  }
};
</script>
<style lang="">
<<<<<<< HEAD
.wenben p {
  border-left: 4px solid #4ac0e0;
  font-family: 微软雅黑;
  margin-left: 120px;
  font-size: 16px;
}
=======
>>>>>>> 9e32dacfafdf192054032a10f86315b2d69adbee
#navbg {
  height: 144px;
  background: #89db96;
}
#navbg-img {
  height: 144px;
<<<<<<< HEAD
  background: url(../../images/download.png) no-repeat 940px -20px;
=======
  background: url(../../images/download.png) no-repeat 720px -20px;
>>>>>>> 9e32dacfafdf192054032a10f86315b2d69adbee
  position: relative;
}
#h-name {
  min-width: 400px;
  color: #fff;
  font-size: 25px;
  padding-top: 40px;
  margin-left: 125px;
}
#h-ul li {
  float: left;
  padding-right: 10px;
  color: #fff;
}
#h-ul-one {
  margin-left: 125px;
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
<<<<<<< HEAD
}
</style>
=======
}
#el-collapse-head-4090 {
  background: #49c0e0;
  color: #fff;
  font-size: 18px;
}
</style>
>>>>>>> 9e32dacfafdf192054032a10f86315b2d69adbee
