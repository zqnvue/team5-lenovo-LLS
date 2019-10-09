import Vue from 'vue'
import Logined from '@/components/common/Login.vue'
import Shome from '@/components/Students/Home.vue'  //引入学生端的主页面
import StuMajor from '@/components/Students/StuMajor.vue'
import StuClass from '@/components/Students/StuClass.vue'
import MyGrow from '@/components/Students/MyGrow.vue'
import MyJoin from '@/components/Students/MyJoin.vue'
import MyTest from '@/components/Students/MyTest.vue'

//--------------------教师端-------------------------------------------
import Thome from '@/components/Teachers/Home.vue'  //引入教师端的主页面
import MyMajor from '@/components/Teachers/MyMajor.vue'
import MyExam from '@/components/Teachers/MyExam.vue'
import MyClass from '@/components/Teachers/MyClass.vue'
import StuManger from '@/components/Teachers/StuManger.vue'
import ClassManger from '@/components/Teachers/ClassManger.vue'
import MyGood from '@/components/Teachers/MyGood.vue'
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
        path:'MyExam',   //我的考试
        component:MyExam,
        name:'MyExam'
      },{
        path:'MyClass/:id',   //我教的课程
        component:MyClass,
        name:'MyClass'
      },{
        path:'StuManger',   //我教的课程
        component:StuManger,
        name:'StuManger'
      },{
        path:'ClassManger',   //我教的课程
        component:ClassManger,
        name:'ClassManger'
      },{
        path:'MyGood',   //我教的课程
        component:MyGood,
        name:'MyGood'
      }
    ]
  },{
    path:'/student',  //学生端的主页面
    component:Shome,
    children:[
      {
        path:'StuMajor',   //我教的课程
        component:StuMajor,
        name:'StuMajor'
      },{
        path:'StuClass',   //我教的课程
        component:StuClass,
        name:'StuClass'
      },{
        path:'MyGrow',   //我教的课程
        component:MyGrow,
        name:'MyGrow'
      },{
        path:'MyJoin',   //我教的课程
        component:MyJoin,
        name:'MyJoin'
      },{
        path:'MyTest',   //我教的课程
        component:MyTest,
        name:'MyTest'
      }
    ]
  }
]

const Router=new VueRouter({  //将routes注册到router中
  routes
})


export default Router;