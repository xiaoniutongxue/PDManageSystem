<template>
  <div class="main">
    <div class="content">
      <div class="login">
        <div class="loginchild">
          <el-form ref="formCustom" :model="formCustom"   label-width="80px">

            <el-form-item label="用户名" prop="username">
              <el-input type="text" placeholder="用户名" size="large" v-model="formCustom.username"  />
            </el-form-item>
            <el-form-item label="密码" prop="psw"  style="margin-top:25px">
              <el-input type="text" size="large" placeholder="密码"  show-password v-model="formCustom.psw" />
            </el-form-item>

            <div class="loginbutton"><el-button type="primary">登录</el-button></div>
          </el-form>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        formCustom: {
          username: "",
          psw: "",},

        name: "",
        psw: ""
      };
    }
  };
</script>
<style lang="less" scoped>
  .main {

    .content {
      width: 100%;
      height: 100vh;
      display: flex;
      align-items: center; /*定义body的元素垂直居中*/
      justify-content: center; /*定义body的里的元素水平居中*/


      .login {

        width: 350px;
        height: 300px;
        background-color: #409eff40;
        .loginchild{
          margin: 20px;
          .loginbutton{
            position: absolute;
            left: 50%;
            transform: translateX(-50%);




          }

        }


      }
    }
  }
</style>
