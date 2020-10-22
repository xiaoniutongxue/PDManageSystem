<template>
    <div class="pwd_all">
      <h3>密码修改</h3>
      <ul>
        <li>
          <span class="tit">用户:</span>
          <input type="text" v-model="user" disabled="true"/>
        </li>
        <li>
          <span class="tit">原密码:</span>
          <input type="password" v-model="original_pwd" autocomplete="off"/>
          <span class="err">{{err_original}}</span>
        </li>
        <li>
          <span class="tit">新密码:</span>
          <input type="password" v-model="new_pwd" autocomplete="off"/>
          <span class="err">{{err_new}}</span>
        </li>
        <li>
          <span class="tit">确认密码:</span>
          <input type="password" v-model="confirm_pwd" autocomplete="off"/>
          <span class="err">{{err_confirm}}</span>
        </li>
        <li>
          <span class="submit" @click="update_pwd">提交</span>
        </li>
      </ul>
    </div>
</template>

<script>
    // 导入方法
    import {user_updatepwd} from "../../network/system/usermanage";

    export default {
        name: "SysUserPwd",
        data(){
          return{
            /*密码修改*/
            original_pwd:'',        /*原密码*/
            new_pwd:'',             /*新密码*/
            confirm_pwd:'',         /*确认密码*/

            /*密码错误*/
            err_original:'',        /*原密码错误*/
            err_new:'',             /*新密码错误*/
            err_confirm:'',         /*确认密码错误*/
          }
        },
        computed:{
          user(){
            return this.$store.state.user;
          }
        },
        methods:{
          // 1.修改密码
          update_pwd(){
            /*判断原密码*/
            if(this.original_pwd===''){
              this.err_original='请输入密码'
              return;
            }else{
              this.err_original=''
            }
            /*判断新密码*/
            if(this.new_pwd===''){
              this.err_new='请输入密码'
              return;
            }else{
              this.err_new=''
            }
            /*判断确认密码*/
            if(this.confirm_pwd===''){
              this.err_confirm='请输入密码'
              return;
            }else{
              this.err_confirm=''
            }
            /*判断新密码和确认密码是否一致*/
            if(this.new_pwd!==this.confirm_pwd){
              this.err_confirm='密码不一致'
              return;
            }else{
              this.err_confirm=''
            }
            /*密码对象数据*/
            let pwddata={
              user_name:this.user,
              original_pwd:this.original_pwd,
              new_pwd:this.new_pwd,
              confirm_pwd:this.confirm_pwd
            }
            pwddata=JSON.stringify(pwddata)
            /*调用修改密码方法*/
            user_updatepwd(pwddata).then(res=>{
              if(res.code===200){
                this.$alert('即将跳转登陆页面!', '密码修改成功', {
                  confirmButtonText: '确定',
                  callback: action => {
                    this.$router.push({'path':'/login'})
                  }
                });
              }else if(res.code===201){
                this.err_original='密码错误'
              }else{
                this.$message({
                  type:'error',
                  message:res.message,
                  duration:2000
                })
              }
            })
          },
        }
    }
</script>

<style lang="less" scoped>
  @import "../../assets/less/comm/variable";
  .pwd_all{
    width: 400px;
    height: auto;
    margin: 100px auto;
    /*border: 1px solid black;*/
    h3{
      height: 80px;
      line-height: 80px;
      text-align: center;
      -webkit-user-select: none;
    }
    ul{
      width: 100%;
      height: auto;
      list-style: none;
      /*border: 1px solid black;*/
      li{
        width: 100%;
        height: 30px;
        display: flex;
        margin-bottom: 10px;
        /*border: 1px solid black;*/
        .tit{
          width: 80px;
          display: block;
          text-align: right;
          line-height: 30px;
          font-size: 12px;
          padding-right: 10px;
          /*border: 1px solid black;*/
        }
        .submit{
          width: 80px;
          height: 30px;
          color: white;
          line-height: 30px;
          text-align: center;
          margin: 10px auto;
          cursor: pointer;
          padding-right: 0;
          border-radius: 5px;
          background: @theme;
          -webkit-user-select: none;
          /*border: 1px solid black;*/
        }
        input{
          width: 200px;
          margin-left: 10px;
          padding-left: 10px;
          outline: none;
        }
        .err{
          width: 70px;
          color: red;
          margin-left: 10px;
          font-size: 12px;
          line-height: 30px;
          /*border: 1px solid black;*/
        }
      }
    }
  }
</style>
