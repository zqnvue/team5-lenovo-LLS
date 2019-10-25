<template>
  <div id>
    <div id="classBg">
      <!-- 专业课名称 -->
      <p>{{this.$route.params.name}}</p>
    </div>
    <div id="c-title">
      <p>专业介绍</p>
    </div>

    <div id="class-body">
      <el-card class="box-card" v-for="(item,index) in classList" :key="index">
        <div slot="header" class="clearfix">
          <!-- 第几课时-->
          <span>
            <a href @click.prevent="myClass(item.id,item.name)">{{item.name}}</a>
          </span>
        </div>
        <!-- 5个小节-->
        <div v-for="(ke,id) in keArr" :key="id" @click.prevent="myXioaj(item.id,ke.id,item.name,ke.name)">
          <a href>{{ke.name}}</a>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  name: "MyClass",
  data() {
    return {
      //当前组件用到的数据
      classList: "",
      arr: "",
      keArr: ""
    };
  },
  methods: {
    // 第几课时的id，name
    myClass(itemId, itemName) {
      this.$router.push({
        name: "MyClassList",
        params: {
          id: itemId,
          name: itemName,
          xjId: 1,
          xjName: "教学视频"
        }
      });
    },
    myXioaj(itemId, xjId,itemName,xjName) {
      this.$router.push({
        name: "MyClassList",
        params: {
          id: itemId,
          name: itemName,
          xjId: xjId,
          xjName: xjName
        }
      });
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
        });
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
#classBg {
  height: 144px;
  background: #f570c9;
}
#classBg p {
  color: #fff;
  font-size: 20px;
  text-align: center;
  line-height: 144px;
}
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
    line-height: 30px;
  }
</style>