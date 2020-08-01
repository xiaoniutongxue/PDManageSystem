import Vue from 'vue'
import VueRouter from 'vue-router'

import index from '../views/index'    /*首页组件*/
/*导入子组件*/
import FacManage from "../components/model/FacManage";                      /*品牌管理*/
import SerManage from "../components/model/SerManage";                      /*系列管理*/
import SpeDataManage from "../components/model/SpeDataManage";
import SpeRelManage from "../components/model/SpeRelManage";
import SpePriceManage from "../components/model/SpePriceManage";
import AccDataManage from "../components/model/AccDataManage";
import AccRelManage from "../components/model/AccRelManage";
import AccPriceManage from "../components/model/AccPriceManage";
import ParamDataManage from "../components/model/ParamDataManage";
import test from "../components/model/test";


Vue.use(VueRouter)


const routes=[
  /*默认显示*/
  {
    path: '/',
    component: index,
    redirect:'/index/facmanage',
  },
  /*主页*/
  {
    path: '/index',
    component: index,
    children:[
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
