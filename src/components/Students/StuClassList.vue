<template>
  <div id>
    <div id="classBg">
      <p>{{this.$route.params.name}}</p>
    </div>
    <div id="classBox">
      <el-tabs :tab-position="tabPosition" @tab-click="handleClick" style="height: 680px;">
        <el-tab-pane :label="item.name" v-for="(item,index) in keArr" :key="index">
          <p v-for="(itema,index) in xiaoj" :key="index">
            <video-player class="vjs-custom-skin" :options="playerOptions"></video-player>
          </p>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
//引入video样式
import "video.js/dist/video-js.css";
import "vue-video-player/src/custom-theme.css";
//引入hls.js
import "videojs-contrib-hls.js/src/videojs.hlsjs";

export default {
  name: "StuClassList",
  data() {
    return {
      //当前组件用到的数据
      tabPosition: "left",
      keArr: "",
      xiaoj: "",
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        controls: true, //控制条
        preload: "auto", //视频预加载
        muted: false, //默认情况下将会消除任何音频。
        loop: false, //导致视频一结束就重新开始。
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4",
            src: "http://10.12.1.193:8888/customMaterials/2dc18c8e-e01b-4488-b873-65360dbded4e.mp4" //你所放置的视频的地址，最好是放在服务器上
          }
        ],
        poster: "", //你的封面地址（覆盖在视频上面的图片）
        width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试" //允许覆盖Video.js无法播放媒体源时显示的默认信息。
      }
    };
  },
  methods: {
    //当前组件用到的函数
    handleClick(tab, event) {
      this.getMyclassEdtails(
        this.$route.params.id,
        parseInt(tab.index) + 1,
        tab.label
      );
    },
    getMyclassEdtails(keId, typeId, name) {
      var app = this;
      this.$http
        .get(
          `/product/customMaterial/getListByCourseIdAndTypeId/${keId}/${typeId}`
        )
        .then(function(res) {
          app.xiaoj = res.data;
        });
    }
  },
  created() {
    //组件加载完之后的生命周期函数，如果页面一加载就需要展示数据，那么数据在这获取
    var keId = this.$route.params.id;
    var app = this;
    this.$http.get(`/product/materialType/listForAble`).then(function(res) {
      // console.log(res);
      app.keArr = res.data;
      app.$http
        .get(`/product/customMaterial/getListByCourseIdAndTypeId/${keId}/1`)
        .then(function(res) {
          // console.log(res);
          app.xiaoj = res.data;
        });
    });
    app.activeName = this.$route.params.xjName;
    this.getMyclassEdtails(keId, this.$route.params.xjId);
  }
};
</script>
<style>
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
#classBox {
  width: 80%;
  border: 1px solid blue;
  margin: 0px auto;
}
</style>