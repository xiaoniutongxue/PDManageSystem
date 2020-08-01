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

      </div>
    </div>

    <!--系统内容-->
    <div class="index_cont">
      <!--左边导航列表-->
      <div class="cont_left">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#222"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-s-home"/>
              <span>选型管理</span>
            </template>
            <el-submenu index="1-1">
              <template slot="title">品牌系列管理</template>
              <router-link to="/index/facmanage">
                <el-menu-item index="1-1-1">品牌管理</el-menu-item>
              </router-link>
              <router-link to="/index/sermanage">
                <el-menu-item index="1-1-2">系列管理</el-menu-item>
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
          <!--<el-menu-item index="2">
            <i class="el-icon-s-home"/>
            <span slot="title">商城管理</span>
          </el-menu-item>-->
        </el-menu>
      </div>

      <!--右边内容-->
      <div class="cont_right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
    import {get_areadata} from "../network/model/facmanage";

    export default {
        name: "index",
        data(){
          return{

          }
        },
        created() {
          this.get_Allarea();
        },
        methods:{
          // 1.获取全国地区
          get_Allarea(){
            get_areadata().then(res=>{
              if(res){
                this.$store.commit('get_Areadate',res)
                /*this.AllareaData=res;
                this.get_provincedata(res);*/
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
  @import "../assets/less/variable";
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
      margin: 0 auto;
      background: #222;
      /*border: 1px solid black;*/
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
        background: #222;
        a{
          color: white;
          text-decoration: none;
        }
      }

      /*右边内容展示*/
      .cont_right{
        width: 87%;
        height: 99%;
        margin: 3px auto;
        border: 1px solid @tbl-bor;
      }
    }
  }
</style>
