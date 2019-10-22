<template>
  <div id>
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

    <div id="c-title">
      <p id="c-title-one">专业介绍</p>
      <p id="c-title-two">下载课程表</p>
    </div>

    <!-- arr学期名  item.childList每个学期的课程名 -->
    <div id="c-body" >
      <el-card class="box-card" v-for="(item,index) in arr" :key="index" :title="item.name" :name="index">
        <div slot="header" class="clearfix">
          <!-- item表示arr数组里的每一项 第xxx学期-->
          <span>{{item.name}}</span>
        </div>
        <!-- items表示item.childList数组中的每一项 xxx课程-->
        <div v-for="(items,index) in item.childList" :key="index">
          <a href="" @click.prevent="toMyClassList(items.id,items.name)">{{items.name}}</a>
        </div>
      </el-card>
    </div>
    
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
  methods: {
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
        app.arr = res.data[0].majorCustomItemTreeAdapterList;
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
  background: url(../../images/download.png) no-repeat 720px -20px;
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
/* 头部结束 */
#c-title {
  margin-left: 265px;
  height: 60px;
  /* background: #ccc; */
}
#c-title-one {
  /* min-width: 100px; */
  font-size: 16px;
  /* height: 30px; */
  /* line-height: 30px; */
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
    margin-left: 300px;
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
  .el-card{
    float: left
  }
  .el-card__header{
      background: rgb(205,107,1);
  }
  .box-card {
    width: 187px;
    height:280px;
  }
</style>