<template>
    <div id="">
        <div id="classBg">
            <p>{{this.$route.params.name}}</p>
        </div>
        <div id="classBox">
            <el-tabs v-model="activeName" :tab-position="tabPosition" @tab-click="handleClick" style="height: 680px;">
                <el-tab-pane :label="item.name" :name="item.name" v-for="(item,index) in keArr" :key="index">
                     <template v-if="activeName == '教学视频'">
                        <template>
                            <div class="player">
                                <video-player  class="video-player vjs-custom-skin"
                                    ref="videoPlayer"
                                    :playsinline="true"
                                    :options="playerOptions"
                                ></video-player>
                            </div>
                            <div class="player_list">
                                <h1>视频列表</h1>
                                <ul v-for="(item,index) in xiaoj" :key="index">
                                    <li><a href="#" @click.prevent="changeUrl(index)">{{item.fileName}}</a></li>
                                </ul>
                            </div>
                        </template>
                    </template>
                    <template v-else-if="activeName == '精品课件'">
                        <div class="course_img">
                            <img src="@/images/06denglu.jpg" alt="">
                            <!-- <img :src="item.fileWebUrl" alt="图片正在加载"> -->
                        </div>
                    </template>
                    <template v-else>
                        <div>
                            课程文件
                        </div>
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
                    // http://10.12.1.193:8888/customMaterials/2dc18c8e-e01b-4488-b873-65360dbded4e.mp4
                    // http://10.12.1.193:8888/customMaterials/0fce292c-07f5-4056-b659-4194931491d0.mp4
                    src: '',  // 路径
                    type: 'video/mp4'  // 类型
                }],
                poster: "../../static/images/test.jpg", //你的封面地址
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
            app.playerOptions.sources[0].src = app.xiaoj[`${`index`}`].fileWebUrl
        }
    },
    created(){  //组件加载完之后的生命周期函数，如果页面一加载就需要展示数据，那么数据在这获取
        var keId = this.$route.params.id;
        var typeId = this.$route.params.xjId;
        console.log(keId)
        var app = this;
        this.$http.get(`/product/materialType/listForAble`).then(function(res){
            app.keArr = res.data;
                app.$http.get(`/product/customMaterial/getListByCourseIdAndTypeId/${keId}/${typeId ? typeId :1}`).then(function(res){
                    app.xiaoj = res.data
            })
        })
        app.activeName = this.$route.params.xjName
        this.getMyclassEdtails(keId,this.$route.params.xjId)
    }
}
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
    .video-js .vjs-big-play-button{
        width: 50px;
        height: 50px;
        background: red;
    }
    .player {
        float: left;
        width: 700px;
    }
    .player_list {
        float: right;
        width: 200px;
        margin-right: 50px;
    }
</style>


