<template>
    <div id="">
        <div id="classBg">
            <p>{{this.$route.params.name}}</p>
        </div>
        <div id="c-title">
            <p>专业介绍</p>
        </div>
        <div id="ke" v-for="(item,index) in classList" :key="index">
            <ul>
                <li id="one">{{item.name}}</li>
                <li v-for="(ke,index) in keArr" :key="index">{{ke.name}}</li>
            </ul>
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
            keArr:[{index:1,name:'企业问答'},
                {index:2,name:'课堂案例'},
                {index:3,name:'联系手册'},
                {index:4,name:'精品课件'},
                {index:5,name:'教学视频'}
            ]
        }
    },
    methods:{   //当前组件用到的函数
        
    },
    created(){  //组件加载完之后的生命周期函数，如果页面一加载就需要展示数据，那么数据在这获取
        var id = this.$route.params.id;
        var app = this;
        app.$http.get(`/product/majorCustomCourse/getListByItemId/${id}`).then(function(res){
            app.classList = res.data;
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
        margin: 5px 0px 0px 125px;
        font-size: 13px;
        width: 80%;
    }
    #ke ul {
        overflow: hidden;
        background: rgb(231, 231, 231);
        height: 26px;
        line-height: 26px;
    }
    #ke ul li {
        float: right;
        margin: 0px 10px 0px 0px;
        margin-left: 15px;
    }
    #ke ul #one {
        float: left;
    }
</style>