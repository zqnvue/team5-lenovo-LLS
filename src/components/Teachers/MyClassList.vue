<template>
    <div id="">
        <div id="classBg">
            <p>{{this.$route.params.name}}</p>
        </div>
        <div id="classBox">
            <el-tabs :tab-position="tabPosition" style="height: 200px;">
                <el-tab-pane :label="item.name" v-for="(item,index) in keArr" :key="index">{{item.id}}</el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
export default {
    name:'MyClass',
    data(){
        return{ //当前组件用到的数据
            tabPosition: 'left',
            keArr: ''
        }
    },
    methods:{   //当前组件用到的函数
        
    },
    created(){  //组件加载完之后的生命周期函数，如果页面一加载就需要展示数据，那么数据在这获取
        var keId = this.$route.params.id;
        var majorId = this.$route.params.majorId;

        var className = this.$route.params.className;
        var classId = this.$route.params.classId;        
        console.log(keId +'2')
        console.log(className)
        console.log(classId)
        console.log(majorId)
        var app = this;
        this.$http.get(`/product/materialType/listForAble`).then(function(res){
            app.keArr = res.data;
            app.$http.post(`/product/customMaterial/listForCourseIdAndTypeId?courseId=${this.$route.params.id}&typeId=${item.id}`).then(function(res){
                console.log(res);
            })
        })
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
</style>