import Vue from 'vue'
import Logined from '@/components/common/Login.vue'
import Shome from '@/components/Students/Home.vue'  //引入学生端的主页面

//--------------------教师端-------------------------------------------
import Thome from '@/components/Teachers/Home.vue'  //引入教师端的主页面
import MyMajor from '@/components/Teachers/MyMajor.vue'
import MyExam from '@/components/Teachers/MyExam.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)   //在vue对象中使用router

const routes=[
  {
    path:'/',
    redirect:'/logined' //路由重定向 当用户访问根目录时，重定向到登陆页面
  },{
    path:'/logined',
    component:Logined
  },{
    path:'/teacher',  //教师端的主页面
    component:Thome,
    children:[
      {
        path:'MyMajor',   //我教的专业
        component:MyMajor,
        name:'MyMajor'
      },{
        path:'MyExam',   //我教的课程
        component:MyExam,
        name:'MyExam'
      }
    ]
  },{
    path:'/student',  //学生端的主页面
    component:Shome
  }
]

const Router=new VueRouter({  //将routes注册到router中
  routes
})


export default Router;