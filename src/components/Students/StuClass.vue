<template>
  <div id>
    <div id="classbg">
        <div id="c-name">
            <p>{{this.$route.params.name}}</p>
        </div>
    </div>

    <div id="class-title">
      <p id="class-title-one">专业介绍</p>
      <p id="class-title-two">下载课程表</p>
    </div>

    <div id="class-body">
      <el-card class="box-card" v-for="(item,index) in classList" :key="index">
        <div slot="header" class="clearfix">
          <!-- 第几课时-->
          <span><a href="" @click.prevent="myClass(item.id,item.name)">{{item.name}}</a></span>
        </div>
        <!-- 5个小节-->
        <div v-for="(ke,id) in keArr" :key="id" @click.prevent="myXioaj(item.id,ke.id,ke.name)">
          <a href="">{{ke.name}}</a>
        </div>
      </el-card>
    </div>

  </div>
</template>
<script>
export default {
  name: "StuClass",
  data() {
    return {
      //当前组件用到的数据
      classList: "",
      arr: "",
      keArr: ""
    };
  },
  methods: {
    //当前组件用到的函数
    // 第几课时的id，name
    myClass(itemId, itemName) {
      this.$router.push({
        name: "StuClassList",
        params: {
          id: itemId,
          name: itemName
        }
      });
    },
    myXioaj(itemId,xjId,xjName){
      this.$router.push({
        name: 'stuClassList',
        params: {
          id: itemId,
          xjName: xjName,
          xjId: xjId
        }
    })
  }
  },
  watch: {
    $route(to, from) {
      var app = this;
      this.$http
        .get(
          `/product/majorCustomCourse/getListByItemId/${this.$route.params.id}`
        )
        .then(function(res) {
          app.classList = res.data;
        })
    }
  },
  created() {
    //组件加载完之后的生命周期函数，如果页面一加载就需要展示数据，那么数据在这获取
    var id = this.$route.params.id;
    var app = this;
    app.$http
      .get(`/product/majorCustomCourse/getListByItemId/${id}`)
      .then(function(res) {
        app.classList = res.data;
        app.$http.get(`/product/materialType/listForAble`).then(function(res) {
          app.keArr = res.data;
        });
      });
  }
};
</script>
<style>
#classbg {
  height: 144px;
  background: #f570c9;
}
#c-name {
  min-width: 400px;
  color: #fff;
  font-size: 25px;
  padding-top: 40px;
  text-align: center;
}
#c-name p {
    height: 50px;
    margin: 0 auto;
    line-height: 50px;
}
#class-title {
  margin-left: 265px;
  height: 60px;
  /* background: #ccc; */
}
#class-title-one {
  font-size: 16px;
  border-left: 4px solid#49c0e0;
  float: left;
}
#class-title-two {
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
#class-body{
    margin-left: 300px;
    /* width: 100%; */
    /* background: #ccc; */
    position: relative;
}
.text {
  font-size: 14px;
  }
  .item {
  margin-bottom: 18px;
  }
  .clearfix a{
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
  }
</style>