import Vue from 'vue'
import VueRouter from 'vue-router'

// 1.登陆和主页
import login from "../views/login";    /*登陆组件*/
import index from '../views/index'    /*首页组件*/

// 2.系统信息管理组件
import SysUserManage from "../components/system/SysUserManage";             /*系统管理员信息*/
import UserErr from "../components/comm/UserErr";

// 3.选型管理组件
import FacManage from "../components/model/FacManage";                      /*品牌管理*/
import SerManage from "../components/model/SerManage";                      /*系列管理*/
import SpeDataManage from "../components/model/SpeDataManage";              /*本体数据*/
import SpeRelManage from "../components/model/SpeRelManage";                /*本体管理*/
import SpePriceManage from "../components/model/SpePriceManage";            /*本体价格*/
import AccDataManage from "../components/model/AccDataManage";              /*附件数据*/
import AccRelManage from "../components/model/AccRelManage";                /*附件关系*/
import AccPriceManage from "../components/model/AccPriceManage";            /*附件价格*/
import ParamDataManage from "../components/model/ParamDataManage";          /*特性参数*/
import test from "../components/model/test";


Vue.use(VueRouter)


const routes=[
  /*默认显示*/
  {
    path: '/',
    component: index,
    redirect:'/index/facmanage',
  },
  /*登陆页面*/
  {
    path: '/login',
    name: login,
    component: login,
  },
  /*主页*/
  {
    path: '/index',
    component: index,
    redirect:'/index/facmanage',
    children:[
      // 1.选项管理
      /*品牌管理*/
      {
        path:'/index/facmanage',
        component:FacManage
      },
      /*系列管理*/
      {
        path: '/index/sermanage',
        component: SerManage
      },
      /*本体数据管理*/
      {
        path: '/index/spedatamanage',
        component: SpeDataManage
      },
      /*本体关系管理*/
      {
        path: '/index/sperelmanage',
        component: SpeRelManage
      },
      /*本体价格管理*/
      {
        path: '/index/spepricemanage',
        component: SpePriceManage
      },
      /*附件选择数据管理*/
      {
        path: '/index/accdatamanage',
        component: AccDataManage
      },
      /*附件选择关系管理*/
      {
        path: '/index/accrelmanage',
        component: AccRelManage
      },
      /*附件选择价格管理*/
      {
        path: '/index/accpricemanage',
        component: AccPriceManage
      },
      /*特性参数数据管理*/
      {
        path: '/index/parammanage',
        component: ParamDataManage
      },
      // 3.系统管理
      {
        path: '/index/sysusermanage',
        component: SysUserManage
      },
      {
        path: '/index/sysusererr',
        component: UserErr
      },
      /*测试*/
      {
        path: '/index/test',
        component: test
      },
    ]
  }
]


const router = new VueRouter({
  routes
})

export default router
