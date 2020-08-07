<template>
  <!--登陆总框-->
  <div class="login_all">
    <!--登陆框-->
    <div class="login">
      <ul>
        <li class="login_top">
          <h6>登录管理系统</h6>
        </li>
        <li class="login_cont">
          <span class="tit">用户名:</span>
          <el-input class="input" v-model="user_name" size="small" placeholder="请输入用户名"/>
        </li>
        <li class="login_cont">
          <span class="tit">密码:</span>
          <el-input class="input" type="password" v-model="user_pwd" size="small" placeholder="请输入密码"/>
        </li>
        <li class="login_bottom">
          <span @click="login">登陆</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  // 1.导入方法
  import {user_login} from "../network/system/usermanage";

  import cookie from "../assets/js/comm/cookie";

  export default {
    data() {
      return {
        user_name:'',
        user_pwd:'',
      };
    },
    methods:{
      /*登陆*/
      login(){
        if(this.user_name==='' || this.user_pwd===''){
          this.$message({
            type:'error',
            message:'请输入用户名和密码',
            duration:1000
          })
        }else{
          let userdata={
            uName:this.user_name,
            uPwd:this.user_pwd
          }
          userdata=JSON.stringify(userdata)
          user_login(userdata).then(res=>{
            if(res.code==200){
              let udata = JSON.stringify(res.userdata);
              cookie.setCookie(udata,2)
              this.$router.push({'path':'index'})
            }else{
              console.log('登陆失败!')
            }
          })
        }
      },
    },
  };
</script>
<style lang="less" scoped>
  @import "../assets/less/comm/variable";
  /*登陆总框*/
  .login_all{
    width: 100%;
    height: 100%;
    margin: 0 auto;
    position: absolute;
    /*background: url("../assets/img/login.jpg") no-repeat;
    background-size: 100%;*/
    background: @theme;
    /*border: 1px solid black;*/
    .login{
      width: 400px;
      height: 320px;
      margin: 200px auto;
      background: white;
      ul{
        width: 80%;
        height: 100%;
        list-style: none;
        margin: 0 auto;
        /*border: 1px solid black;*/
        li{
          width: 100%;
          /*border: 1px solid black;*/
        }
        /*头部登陆提示*/
        .login_top{
          width: 100%;
          margin-top: 30px;
          /*border: 1px solid black;*/
          h6{
            width: 100%;
            height: 80px;
            font-size: 24px;
            color: @theme;
            text-align: center;
            line-height: 80px;
          }
        }
        /*中间登陆信息*/
        .login_cont{
          height: 40px;
          display: flex;
          margin-top: 10px;
          span{
            width: 80px;
            height: 100%;
            text-align: right;
            line-height: 40px;
            font-size: 12px;
            /*border: 1px solid black;*/
          }
          .input{
            width: 200px;
            margin-top: 5px;
            margin-left: 10px;
          }
        }
        /*下面登陆按钮*/
        .login_bottom{
          width: 100%;
          height: 40px;
          margin-top: 30px;
          /*border: 1px solid black;*/
          span{
            width: 80px;
            height: 30px;
            cursor: default;
            display: block;
            font-size: 12px;
            border-radius: 5px;
            text-align: center;
            line-height: 30px;
            margin: 0 auto;
            color: white;
            background: @theme;
          }
        }
      }
    }
  }
</style>
