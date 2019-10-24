<template>
    <div id="">
        <div id="classBg">
            <!-- 专业课名称 -->
            <p>{{this.$route.params.name}}</p>
        </div>
        <div id="c-title">
            <p>专业介绍</p>
        </div>
        <div id="ke" v-for="(item,index) in classList" :key="index">
            <p id="one">
                <!-- 第几课时 -->
                <span id="one"><a href="" @click.prevent="myClass(item.id,item.name)">{{item.name}}</a></span>
            </p>
            <p id="two">
                <!-- 5个小节 -->
                <span v-for="(ke,id) in keArr" :key="id" @click.prevent="myXioaj(item.id,ke.id,ke.name)">
                    <a href="">{{ke.name}}</a>
                </span>
            </p>
        </div>
    </div>
</template>
<script>
export default {
    name:'MyClass',
    data(){
        return{ //当前组件用到的数据
            classList:'',
            arr:'',
            keArr:''
        }
    },
    methods:{ 
        // 第几课时的id，name
        myClass(itemId,itemName){
            this.$router.push({
                name: 'MyClassList',
                params: {
                    id: itemId,
                    name: itemName,
                    xjId:1,
                    xjName:"教学视频"
                }
            })
        },
        myXioaj(itemId,xjId,xjName){
            this.$router.push({
                name: 'MyClassList',
                params: {
                    id: itemId,
                    xjName: xjName,
                    xjId: xjId
                }
            })
        }
    },
    watch:{
        $route(to,from) {
            var app = this;
            this.$http.get(`/product/majorCustomCourse/getListByItemId/${this.$route.params.id}`).then(function(res){
            app.classList = res.data;
            })
        }
    },
    created(){  //组件加载完之后的生命周期函数，如果页面一加载就需要展示数据，那么数据在这获取
        var id = this.$route.params.id;
        var app = this;
        app.$http.get(`/product/majorCustomCourse/getListByItemId/${id}`).then(function(res){
            app.classList = res.data;
            app.$http.get(`/product/materialType/listForAble`).then(function(res){
                app.keArr = res.data
            })
        })
    }
}
</script>
<style>
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
    #ke {
        overflow: hidden;
        margin: 5px 0px 0px 125px;
        width: 80%;
        height: 30px;
        line-height: 30px;
        background: rgb(231, 231, 231);
    }
    #one {
        float: left;
        margin: 0 0 0 10px;
    }
    #two {
        float: right;
        margin: 0 10px 0 0;
    }
    #two span{
        margin-right: 15px;
    }
</style>