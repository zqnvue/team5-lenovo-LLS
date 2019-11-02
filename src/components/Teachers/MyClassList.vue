<template>
  <div id>
    <div id="classbg">
      <div id="c-name">
        <p>{{this.$route.params.name}}</p>
      </div>
    </div>

    <div id="classBox">
      <el-tabs
        v-model="activeName"
        :tab-position="tabPosition"
        @tab-click="handleClick"
      >
        <el-tab-pane
          :label="item.name"
          :name="item.name"
          v-for="(item,index) in keArr"
          :key="index"
        >
          <template v-if="activeName == '教学视频'">
            <template>
              <div class="player">
                <video-player
                  class="video-player vjs-custom-skin"
                  ref="videoPlayer"
                  :playsinline="true"
                  :options="playerOptions"
                ></video-player>
              </div>
              <div class="player_list">
                <h1>视频列表</h1>
                <ul v-for="(item,index) in xiaoj" :key="index">
                  <li>
                    <a href="#" @click.prevent="changeUrl(index)">
                      <span class="el-icon-video-play"></span>
                      {{item.fileName}}
                    </a>
                  </li>
                </ul>
              </div>
            </template>
          </template>

          <template v-else-if="activeName == '精品课件'">
            <ul v-for="(item,index) in xiaoj" :key="index">
              <li class="course_img">
                <img :src="item.fileWebUrl" alt="图片正在加载" />
              </li>
            </ul>
          </template>

          <template v-else-if="activeName == '练习手册'">
            <!-- <div>练习手册</div> -->
            <template>
              <el-table :data="xiaoj" height="350" border style="width: 100%">
                <el-table-column prop="id" label="序号" width="169"></el-table-column>
                <el-table-column prop="fileName" label="文件名称" width="255"></el-table-column>
                <el-table-column prop="fileAuthor" label="作者" width="200"></el-table-column>
                <el-table-column prop="fileUrl" label="文件地址" width="349"></el-table-column>
              </el-table>
            </template>
          </template>

          <template v-else-if="activeName == '课堂案例'">
            <!-- <div>课堂案例</div> -->
            <template>
              <el-table :data="xiaoj" height="350" border style="width: 100%">
                <el-table-column prop label="序号" width="169"></el-table-column>
                <el-table-column prop label="文件名称" width="255"></el-table-column>
                <el-table-column prop label="作者" width="200"></el-table-column>
                <el-table-column prop label="文件地址" width="349"></el-table-column>
              </el-table>
            </template>
          </template>

          <template v-else>
            <!-- <div>企业问答</div> -->
            <template>
              <el-table :data="xiaoj" height="350" border style="width: 100%">
                <el-table-column prop label="序号" width="169"></el-table-column>
                <el-table-column prop label="文件名称" width="255"></el-table-column>
                <el-table-column prop label="作者" width="200"></el-table-column>
                <el-table-column prop label="文件地址" width="349"></el-table-column>
              </el-table>
            </template>
          </template>
          
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
    name:'MyClassList',
    data(){
        return{ //当前组件用到的数据
            tabPosition: 'left',
            keArr: '',
            xiaoj:'',
            activeName:'教学视频',
            playerOptions : {
                playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                autoplay: false, //如果true,浏览器准备好时开始回放。
                muted: false, // 默认情况下将会消除任何音频。
                loop: false, // 导致视频一结束就重新开始。
                preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                language: 'zh-CN',
                aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                sources: [{
                    src: '',  // 路径
                    type: 'video/mp4'  // 类型
                }],
                poster: "", //你的封面地址
                // width: document.documentElement.clientWidth,
                notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                controlBar: {
                    timeDivider: true,
                    durationDisplay: true,
                    remainingTimeDisplay: false,
                    fullscreenToggle: true  //全屏按钮
                }
            }
        }
    },
    methods:{   //当前组件用到的函数
        handleClick(tab,event){
            this.getMyclassEdtails(this.$route.params.id,parseInt(tab.index)+1,tab.label);
        },
        getMyclassEdtails(keId,typeId){
            var app = this;
            this.$http.get(`/product/customMaterial/getListByCourseIdAndTypeId/${keId}/${typeId ? typeId :1}`).then(function(res){
                app.xiaoj = res.data;
                if(typeId == 1){
                    app.playerOptions.sources[0].src = res.data[0].fileWebUrl
                }else if (typeId == 2){
                }
            })
        },
        changeUrl(index){
            var app = this;
            app.playerOptions.sources[0].src = app.xiaoj[`${index}`].fileWebUrl
        }
    },
    created(){  //组件加载完之后的生命周期函数，如果页面一加载就需要展示数据，那么数据在这获取
        // keId是第几课时的id typeId是第几小节的id
        var keId = this.$route.params.id;
        var typeId = this.$route.params.xjId;
        var app = this;
        this.$http.get(`/product/materialType/listForAble`).then(function(res){
            app.keArr = res.data;
                app.$http.get(`/product/customMaterial/getListByCourseIdAndTypeId/${keId}/${typeId ? typeId :1}`).then(function(res){
                    app.xiaoj = res.data
            })
        })
        app.activeName = this.$route.params.xjName
        this.getMyclassEdtails(keId,typeId)
    }
}
</script>
<style>
#classbg {
  height: 144px;
  background: #f570c9;
}
#c-name {
  min-width: 400px;
  color: #fff;
  font-size: 20px;
  padding-top: 40px;
  text-align: center;
}
#c-name p {
  height: 50px;
  margin: 0 auto;
  line-height: 50px;
}
#classBox {
  width: 80%;
  min-height: 450px;
  border: 1px solid blue;
  margin: 20px auto;
}
.video-js .vjs-big-play-button {
  width: 50px;
  height: 50px;
  background: red;
}
.player {
  float: left;
  width: 650px;
}
.player_list {
  float: right;
  width: 200px;
  margin-right: 50px;
  line-height: 30px;
  font-size: 15px;
}
.course_img img {
  width: 700px;
}
</style>


