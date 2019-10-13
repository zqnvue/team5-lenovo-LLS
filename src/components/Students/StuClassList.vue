<template>
    <div id="">
        <div id="classBg">
            <p>{{this.$route.params.name}}</p>
        </div>
        <div id="classBox">
            <el-tabs :tab-position="tabPosition" @tab-click="handleClick" style="height: 200px;">
                <el-tab-pane :label="item.name" v-for="(item,index) in keArr" :key="index">
                    <p v-for="(itema,index) in xiaoj" :key="index">
                        {{itema}}
                    </p>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
export default {
    name:'StuClassList',
    data(){
        return{ //当前组件用到的数据
            tabPosition: 'left',
            keArr: '',
            xiaoj:'',
        }
    },
    methods:{   //当前组件用到的函数
        handleClick(tab,event){
            this.getMyclassEdtails(this.$route.params.id,parseInt(tab.index)+1,tab.label);
        },
        getMyclassEdtails(keId,typeId,name){
            var app = this;
            this.$http.get(`/product/customMaterial/getListByCourseIdAndTypeId/${keId}/${typeId}`).then(function(res){
                app.xiaoj = res.data;
            })
        }
    },
    created(){  //组件加载完之后的生命周期函数，如果页面一加载就需要展示数据，那么数据在这获取
        var keId = this.$route.params.id;
        var app = this;
        this.$http.get(`/product/materialType/listForAble`).then(function(res){
            app.keArr = res.data;
                app.$http.get(`/product/customMaterial/getListByCourseIdAndTypeId/${keId}/1`).then(function(res){
                    app.xiaoj = res.data
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