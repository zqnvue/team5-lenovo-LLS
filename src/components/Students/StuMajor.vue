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

    <div id="c-body">
        <ul>
            <li>
                <div id="c-body-xueq">第一学期（已修完）</div>
                <a href="#">WEB前端基础</a>
                <a href="#">xxxxx</a>
                <a href="#">xxxxx</a>
            </li>
        </ul>
    </div>

  </div>
</template>
<script>
export default {
  name: "StuMajor",
  data() {
    return {
      //当前组件用到的数据
      activeIndex: "1"
    };
  },
  methods: {},
  created() {
    //组件加载完之后的生命周期函数，如果页面一加载就需要展示数据，那么数据在这获取
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
    width: 870px;
    /* height: 800px; */
    margin-left: 355px;
    background: #ccc;
    margin-top: 70px;
    position: relative;
}
#c-body li{
    width: 200px;
    height: 269px;
    font-size: 15px;
    text-indent: 6px;
    float: left;
    margin-right: 1px;
    background: #fff;
    box-sizing: border-box;
    /* position: relative; */
    /* text-align: center; */
}
#c-body-xueq{
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 17px;
    text-align: center;
    float: left;
    margin-right: 1px;
    background: #f1f1f1;
    color: #606060;
    margin-bottom: 10px;
    /* padding-right: 28px; */
    background: rgb(255, 107, 1);
    color: rgb(255, 255, 255);
}
#c-body li a{
    display: block;
    float: left;
    font-size: 17px;
    /* min-width: 106px; */
    line-height: 34px;
    color: #515151;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    position: relative;
    padding-left: 13px;
    /* text-align: center;     */
}
#c-body li a:hover{
    color: #49c0e0;
}
</style>