<template>
  <div id>
    <div id="navbg">
      <div id="navbg-img">
        <div id="h-name">WEB前端开发</div>
        <ul id="h-ul">
          <li id="h-ul-one">共5个学期</li>
          <li>16门课程</li>
          <li>644节课时</li>
        </ul>
      </div>
    </div>

    <div id="c-title">
      <p id="c-title-one">专业介绍</p>
      <p id="c-title-two">下载课程表</p>
    </div>

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
    <!-- arr学期名  item.childList每个学期的课程名 -->
>>>>>>> sn
    <div id="c-body" v-for="(item,index) in arr" :key="index" :title="item.name" :name="index">
      <el-card class="box-card" >
        <div slot="header" class="clearfix">
          <!-- item表示arr数组里的每一项 第xxx学期-->
          <span>{{item.name}}</span>
        </div>
        <!-- items表示item.childList数组中的每一项 xxx课程-->
        <div v-for="(items,index) in item.childList" :key="index">{{items.name}}</div>
      </el-card>
<<<<<<< HEAD
      <!-- <div v-for="(item,index) in arr" :key="index" :title="item.name" :name="index">
            {{item.name}}
            <div v-for="(items,index) in item.childList" :key="index">
                {{items.name}}
            </div>
      </div>-->
    </div>
=======
    <!-- arr学期名  item.childList每个学期的课程名 -->
    <div id="c-body" v-for="(item,index) in arr" :key="index" :title="item.name" :name="index">
      <el-card class="box-card" >
        <div slot="header" class="clearfix">
          <!-- item表示arr数组里的每一项 第xxx学期-->
          <span>{{item.name}}</span>
        </div>
        <!-- items表示item.childList数组中的每一项 xxx课程-->
        <div v-for="(items,index) in item.childList" :key="index">{{items.name}}</div>
      </el-card>
    </div>
    
>>>>>>> 12989a8ea03a3cdb977150a42d3d5bad7338007e
=======
    <!-- arr学期名  item.childList每个学期的课程名 -->
    <div id="c-body" v-for="(item,index) in arr" :key="index" :title="item.name" :name="index">
      <el-card class="box-card" >
        <div slot="header" class="clearfix">
          <!-- item表示arr数组里的每一项 第xxx学期-->
          <span>{{item.name}}</span>
        </div>
        <!-- items表示item.childList数组中的每一项 xxx课程-->
        <div v-for="(items,index) in item.childList" :key="index">{{items.name}}</div>
      </el-card>
    </div>
    
>>>>>>> 12989a8ea03a3cdb977150a42d3d5bad7338007e
=======
    <!-- arr学期名  item.childList每个学期的课程名 -->
    <div id="c-body" v-for="(item,index) in arr" :key="index" :title="item.name" :name="index">
      <el-card class="box-card" >
        <div slot="header" class="clearfix">
          <!-- item表示arr数组里的每一项 第xxx学期-->
          <span>{{item.name}}</span>
        </div>
        <!-- items表示item.childList数组中的每一项 xxx课程-->
        <div v-for="(items,index) in item.childList" :key="index">{{items.name}}</div>
      </el-card>
    </div>
    
>>>>>>> zm
=======
    </div>
    
>>>>>>> sn
  </div>
</template>
<script>
export default {
  name: "StuMajor",
  data() {
    return {
      //当前组件用到的数据
      activeIndex: "1",
      arr: []
    };
  },
  methods: {},
  created() {
    //组件加载完之后的生命周期函数，如果页面一加载就需要展示数据，那么数据在这获取
    var app = this;
    this.$http
      .get("/product/majorCustom/getMajorCustomForCurrentUser")
      .then(function(res) {
        app.arr = res.data[0].majorCustomItemTreeAdapterList;
        console.log(res);
      });
  }
};
</script>
<style>
#navbg {
  height: 144px;
  background: #89db96;
}
#navbg-img {
  height: 144px;
  background: url(../../images/download.png) no-repeat 840px -20px;
  position: relative;
}
#h-name {
  min-width: 400px;
  color: #fff;
  font-size: 25px;
  padding-top: 40px;
  margin-left: 330px;
}
#h-ul li {
  float: left;
  padding-right: 10px;
  color: #fff;
}
#h-ul-one {
  margin-left: 330px;
}
/* 头部结束 */
#c-title {
  margin-left: 265px;
  /* height: 22px; */
}
#c-title-one {
  min-width: 100px;
  font-size: 16px;
  height: 30px;
  line-height: 30px;
  border-left: 4px solid#49c0e0;
  float: left;
}
#c-title-two {
  height: 30px;
  line-height: 30px;
  text-align: center;
  width: 100px;
  margin-right: 125px;
  color: white;
  background: #49c0e0;
  float: right;
}
/* 中间结束 */
#c-body{
    /* width: 870px; */
    /* height: 800px; */
    margin-left: 355px;
    /* background: #ccc; */
    margin-top: 70px;
    position: relative;
}
.text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix {
      
      color: white
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  .el-card{
    float: left
  }
=======
>>>>>>> 12989a8ea03a3cdb977150a42d3d5bad7338007e
=======
>>>>>>> 12989a8ea03a3cdb977150a42d3d5bad7338007e
=======
>>>>>>> zm
  .el-card__header{
      background: rgb(205,107,1);
  }
  .box-card {
    width: 187px;
    height:280px;
  }
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
  .el-card{
    float: left;
  }
>>>>>>> 12989a8ea03a3cdb977150a42d3d5bad7338007e
=======
  .el-card{
    float: left;
  }
>>>>>>> 12989a8ea03a3cdb977150a42d3d5bad7338007e
=======
  .el-card{
    float: left;
  }
>>>>>>> zm
</style>