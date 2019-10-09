<template>
    <div id="">
        <div id="classBg">
            <p>我是课程的详情，一共有5小节</p>
        </div>
    </div>
</template>
<script>
export default {
    name:'MyClass',
    data(){
        return{ //当前组件用到的数据
            
        }
    },
    methods:{   //当前组件用到的函数
        
    },
    created(){  //组件加载完之后的生命周期函数，如果页面一加载就需要展示数据，那么数据在这获取
        
    }
}
</script>
<style>
    #classBg {
        height: 144px;
        background: #f570c9;
    }
</style>