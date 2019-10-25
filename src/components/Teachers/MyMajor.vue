<template>
  <div id="">
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
      <p>专业介绍</p>
      <p>专业章节</p>
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
  name: "MyMajor",
  data() {
    return {
      //当前组件用到的数据
      arr:[]
    };
  },
  methods: {
    //当前组件用到的函数
    toMyClassList(itemId,name){
      this.$router.push({
        name: 'MyClass',
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
    this.$http.get('/product/userMajorCustom/getTeacherMajorCustomAdapterList').then(function(res){
        app.arr = res.data[1].majorCustomItemTreeAdapterList;
    })
  }
};
</script>
<style lang="">
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
#c-title p {
  min-width: 100px;
  font-size: 16px;
  height: 30px;
  line-height: 30px;
  text-indent: 11px;
  margin: 15px 0 12px 125px;
  position: relative;
  border-left: 4px solid#49c0e0;
}
#el-collapse-head-4090 {
  background: #49c0e0;
  color: #fff;
  font-size: 18px;
}
#item-head {
    margin-left: 100px;
    padding-left: 20px;
    border-left: 2px solid #49c0e0;
}
#xueqi {
  width: 100px;
  margin: 10px 0 0 20px;
  border-bottom: 1px solid #ccc;
}
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
  .box-card a{
    font-size: 15px;
    line-height: 30px;
  }
</style>
