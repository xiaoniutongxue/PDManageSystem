<template>
  <div class="index_all">
    <!--系统头部-->
    <div class="index_top">
      <!--头部左边logo-->
      <div class="top_left">
        <h5>后台管理系统</h5>
      </div>

      <!--头部右边用户-->
      <div class="top_right">
        <span class="right_tit">欢迎您:</span>
        <span class="right_user">{{$store.state.user}}</span>
        <span class="right_icon" @click="show_UserOper=!show_UserOper"><i class="el-icon-caret-bottom"></i></span>
        <ul class="right_exit" v-if="show_UserOper" @mouseleave="show_UserOper=!show_UserOper">
          <li>
            <router-link to="/login">退出登陆</router-link>
          </li>
        </ul>
      </div>
    </div>

    <!--系统内容-->
    <div class="index_cont">
      <!--左边导航列表-->
      <div class="cont_left">
        <el-menu
          default-active="1-1-1"
          class="el-menu-vertical-demo"
          background-color="#222"
          text-color="#fff"
          active-text-color="#ffd04b">
          <!--选项管理-->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-s-home"/>
              <span>选型管理</span>
            </template>
            <el-submenu index="1-1">
              <template slot="title">品牌系列管理</template>
              <router-link to="/index/facmanage">
                <el-menu-item index="1-1-1">
                  品牌管理
                </el-menu-item>
              </router-link>
              <router-link to="/index/sermanage">
                <el-menu-item index="1-1-2">
                  系列管理
                </el-menu-item>
              </router-link>
            </el-submenu>
            <el-submenu index="1-2">
              <template slot="title">本体规格管理</template>
              <router-link to="/index/spedatamanage">
                <el-menu-item index="1-2-1">本体数据</el-menu-item>
              </router-link>
              <router-link to="/index/sperelmanage">
                <el-menu-item index="1-2-2">本体关系</el-menu-item>
              </router-link>
              <router-link to="/index/spepricemanage">
                <el-menu-item index="1-2-3">本体价格</el-menu-item>
              </router-link>
            </el-submenu>
            <el-submenu index="1-3">
              <template slot="title">附件选择管理</template>
              <router-link to="/index/accdatamanage">
                <el-menu-item index="1-3-1">附件数据</el-menu-item>
              </router-link>
              <router-link to="/index/accrelmanage">
                <el-menu-item index="1-3-2">附件关系</el-menu-item>
              </router-link>
              <router-link to="/index/accpricemanage">
                <el-menu-item index="1-3-3">附件价格</el-menu-item>
              </router-link>
            </el-submenu>
            <router-link to="/index/parammanage">
              <el-menu-item index="1-4">特性参数管理</el-menu-item>
            </router-link>
            <router-link to="/index/test">
              <el-menu-item index="1-5">测试</el-menu-item>
            </router-link>
          </el-submenu>

          <!--商城管理-->
          <el-menu-item index="2">
            <i class="el-icon-s-home"/>
            <span slot="title">商城管理</span>
          </el-menu-item>

          <!--系统管理-->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-s-home"/>
              <span>系统管理</span>
            </template>
            <router-link to="/index/sysusermanage">
              <el-menu-item index="3-1">管理员信息</el-menu-item>
            </router-link>
            <router-link to="/index/sysuserpwd">
              <el-menu-item index="3-2">密码修改</el-menu-item>
            </router-link>
          </el-submenu>
        </el-menu>
      </div>

      <!--右边内容-->
      <div class="cont_right">
        <!--<div class="right-top">
          <SearchFacSer/>
        </div>-->
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
    // 1.导入组件
    import SearchFacSer from "../components/comm/SearchFacSer";
    // 2.导入方法
    import {get_areadata} from "../network/model/facmanage";

    export default {
        name: "index",
        data(){
          return{
            show_UserOper:false,
          }
        },
        created() {
          this.get_Allarea();
        },
        components:{
          SearchFacSer
        },
        methods:{
          // 1.获取全国地区
          get_Allarea(){
            get_areadata().then(res=>{
              if(res){
                this.$store.commit('get_Areadate',res)
              }else{
                console.log('地区信息无法连接服务器')
              }
            },error=>{
              console.log(error)
            })
          },

          hide_modelman(){

          },
        }
    }
</script>

<style lang="less">
  @import "../assets/less/comm/variable";
  *{
    padding: 0;
    margin: 0;
  }
  .index_all{
    width: 100%;
    height: 100%;
    position: absolute;
    /*border: 1px solid black;*/
    .index_top{
      width: 100%;
      height: 5%;
      display: flex;
      margin: 0 auto;
      background: #222;
      /*border: 1px solid black;*/
      /*左边后台提示*/
      .top_left{
        width: 12%;
        height: 100%;
        h5{
          font-size: 20px;
          font-weight: normal;
          line-height: 40px;
          margin-left: 10px;
          color: white;
        }
      }
      /*右边登陆用户*/
      .top_right{
        width: 88%;
        height: 100%;
        text-align: right;
        position: relative;
        /*border:1px solid white;*/
        span{
          color: white;
          font-size: 12px;
          margin-right: 10px;
          line-height: 50px;
        }
        .right_icon{
          margin-right: 30px;
        }
        /*用户操作*/
        .right_exit{
          width: 100px;
          height: auto;
          list-style: none;
          background: white;
          position: absolute;
          left: 92%;
          -webkit-user-select: none;
          li{
            height: 30px;
            font-size: 12px;
            text-align: center;
            cursor: pointer;
            line-height: 30px;
            a{
              color: black;
              text-decoration: none;
            }
            a:hover{
              color: @theme;
            }
          }
        }
      }
    }

    .index_cont{
      width: 100%;
      height: 95%;
      display: flex;
      margin: 0 auto;
      /*border: 1px solid black;*/
      /*左边导航栏*/
      .cont_left{
        width: 12%;
        height: 100%;
        max-height: 100%;
        overflow: auto;
        background: #222;
        .el-menu-item{
          min-width: 160px !important;
        }
        a{
          width: 100%;
          color: white;
          text-decoration: none;
          background: red;
        }
      }

      /*右边内容展示*/
      .cont_right{
        width: 87%;
        height: 99%;
        margin: 3px auto;
        border: 1px solid @tbl-bor;
        /*.right-top{
          width: 100%;
          height: 50px;
          border: 1px solid black;
        }*/
      }
    }
  }
</style>
