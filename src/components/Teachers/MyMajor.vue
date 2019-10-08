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
    <div id="c-main">
      <el-collapse v-model="activeNames" @change="handleChange">
        <!-- 下面是遍历学期的标题 -->
        <el-collapse-item id="item-head" v-for="(item,index) in arr" :key="index" :title="item.name" :name="index">
          <!-- 下面是遍历学期中的课程名 -->
          <div v-for="(items,index) in item.childList" :key="index">
            <a href="" @click.prevent="toMyClassList(items.id,items.name)">{{items.name}}</a>
          </div>
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
      activeNames: ['1'],
      arr:[],
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
        app.arr = res.data[0].majorCustomItemTreeAdapterList;
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
  height: 22px;
  line-height: 22px;
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
</style>