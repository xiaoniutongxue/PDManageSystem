<template>
    <div class="sysuser_all">
      <!--新增用户-->
      <div class="sysuser_top">
        <span class="top_add" @click="show_add">
          <i class="el-icon-circle-plus-outline"/>&nbsp;新增用户
        </span>
      </div>

      <!--用户信息表格-->
      <div class="sysuser_cont">
        <table>
          <thead>
          <tr>
            <td style="width: 5%">用户Id</td>
            <td style="width: 20%">用户名称</td>
            <td style="width: 20%">用户等级</td>
            <td style="width: 20%">添加时间</td>
            <td style="width: 20%">添加用户</td>
            <td style="width: 15%">操作</td>
          </tr>
          </thead>
          <tbody>
            <tr class="user_tr" v-for="item in user_data">
              <td>{{item.uId}}</td>
              <td>{{item.uName}}</td>
              <td>{{item.uGrade | get_grade}}</td>
              <td>{{item.AddTime}}</td>
              <td>{{item.AddUser}}</td>
              <td class="oper">
                <span @click="show_update(item)">修改</span>
                <span @click="del_user(item.uId)">删除</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!--dilog对话框-->
      <!--添加-->
      <el-dialog class="dialog" title="添加用户" :visible.sync="dilog_add" width="30%">
        <ul>
          <li class="textli">
            <span>用户名称:</span>
            <el-input class="input" v-model="user_name" size="small" placeholder="请输入用户名称"/>
          </li>
          <li class="textli">
            <span>初始密码:</span>
            <el-input class="input" v-model="user_pwd" size="small" placeholder="请输入初始密码"/>
          </li>
          <li class="textli">
            <span>用户等级:</span>
            <el-select size="small" v-model="user_grade" placeholder="请选择用户等级">
              <el-option
                v-for="item in user_gradedata"
                :key="item.id"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </li>
        </ul>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dilog_add = false">取 消</el-button>
          <el-button type="primary" @click="add_user">确 定</el-button>
        </span>
      </el-dialog>

      <!--修改-->
      <el-dialog class="dialog" title="修改用户" :visible.sync="dilog_update" width="30%">
        <ul>
          <li class="textli">
            <span>用户名称:</span>
            <el-input class="input" v-model="user_name" size="small" placeholder="请输入用户名称"/>
          </li>
          <li class="textli">
            <span>用户等级:</span>
            <el-select size="small" v-model="user_grade" placeholder="请选择用户等级">
              <el-option
                v-for="item in user_gradedata"
                :key="item.id"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </li>
        </ul>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dilog_update = false">取 消</el-button>
          <el-button type="primary" @click="update_user">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
    // 1.导入方法
    import {get_user} from "../../network/system/usermanage";
    import {user_add} from "../../network/system/usermanage";
    import {user_update} from "../../network/system/usermanage";
    import {user_del} from "../../network/system/usermanage";

    export default {
        name: "SysUserManage",
        data(){
          return{
            // 1.用户信息
            user_data:'',        /*所有用户*/
            user_id:'',          /*用户id*/
            user_name:'',        /*用户名称*/
            user_pwd:'',         /*用户密码*/
            user_grade:'',       /*用户等级*/

            // 2.dilog对话框
            dilog_add:false,        /*添加用户*/
            dilog_update:false,     /*修改用户*/

            /*3.用户等级*/
            user_gradedata:[
              {
                id:'1',
                name:'超级管理员',
                value:'S'
              },
              {
                id:'2',
                name:'普通管理员',
                value:'A'
              }
            ]
          }
        },
        created(){
          this.get_user();
        },
        computed:{
          // 1.仓库数据
          /*a.用户*/
          user(){
            return this.$store.state.user;
          },
          /*b.当前系统时间*/
          sys_date(){
            return this.$store.getters.sys_date;
          },
        },
        methods:{
          //1. 获取用户
          get_user(){
            get_user().then(res=>{
              this.user_data=res;
            })
          },

          //2. 新增用户
          /*a.显示新增用户dilog*/
          show_add(){
            this.user_name='';
            this.user_pwd='';
            this.user_grade='A';
            this.dilog_add=true;
          },

          /*b.添加用户*/
          add_user(){
            if(this.user_name===''){
              this.$message({
                type:'error',
                message:'请输入用户名称',
                duration:1000
              })
              return
            }else if (this.user_pwd===''){
              this.$message({
                type:'error',
                message:'请输入初始密码',
                duration:1000
              })
              return
            }else if(this.user_grade===''){
              this.$message({
                type:'error',
                message:'请选择用户等级',
                duration:1000
              })
              return
            }else{
              let userdata={
                uName:this.user_name,
                uPwd:this.user_pwd,
                uGrade:this.user_grade,
                AddUser:this.user,
                AddTime:this.sys_date
              }
              userdata=JSON.stringify(userdata)
              user_add(userdata).then(res=>{
                if(res.code==200){
                  this.$message({
                    type:'success',
                    message:res.message,
                    duration:1000
                  })
                  this.get_user();
                  this.dilog_add=false;
                }else{
                  this.$message({
                    type:'error',
                    message:res.message,
                    duration:1000
                  })
                }
              })
            }
          },

          //3. 修改用户
          /*a.显示用户信息修改dilog*/
          show_update(userdata){
            this.user_id=userdata.uId;
            this.user_name=userdata.uName;
            this.user_grade=userdata.uGrade;
            this.dilog_update=true;
          },

          /*b.修改用户信息*/
          update_user(){
            if(this.user_name===''){
              this.$message({
                type:'error',
                message:'请输入用户名称',
                duration:1000
              })
              return
            }else if(this.user_grade===''){
              this.$message({
                type:'error',
                message:'请选择用户等级',
                duration:1000
              })
              return
            }else{
              let userdata = {
                uId:this.user_id,
                uName:this.user_name,
                uGrade: this.user_grade
              }
              userdata=JSON.stringify(userdata)
              user_update(userdata).then(res=>{
                if(res.code==200){
                  this.$message({
                    type:'success',
                    message:res.message,
                    duration:1000
                  })
                  this.get_user();
                  this.dilog_update=false;
                }else{
                  this.$message({
                    type:'error',
                    message:res.message,
                    duration:1000
                  })
                }
              })
            }
          },

          //4. 删除用户
          del_user(uid){
            this.$confirm("确认删除该用户吗？",'提示',{
              confirmButtonText:'确认',
              cancelButtonText:'取消',
              type:'warning'
            }).then(()=>{
              user_del(uid).then(res=>{
                if(res.code==200){
                  this.$message({
                    type: 'success',
                    message: '数据删除成功',
                    duration:1000
                  });
                  this.get_user();
                }
              })
            }).catch(()=>{
              this.$message({
                type: 'info',
                message: '已取消删除',
                duration:1000
              });
            })
          },
        },
        filters:{
          get_grade(value){
            if(value=='S'){
              return '超级管理员'
            }else if(value=='A'){
              return '普通管理员'
            }
          }
        },
    }
</script>

<style lang="less" scoped>
  @import "../../assets/less/comm/variable";
  @import "../../assets/less/comm/comm";
  .sysuser_all{
    width: 100%;
    height: 99%;
    /*border: 1px solid black;*/
    /*头部用户添加*/
    .sysuser_top{
      width: 100%;
      height: 40px;
      /*border: 1px solid black;*/
      .top_add{
        width: 80px;
        height: 30px;
        background: @theme;
        color: white;
        margin-top: 10px;
        margin-left: 20px;
        line-height: 30px;
        border-radius: 5px;
        font-size: 12px;
        cursor: pointer;
        text-align: center;
        display: block;
      }
    }
    /*中间用户信息*/
    .sysuser_cont{
      width: 100%;
      height: 94%;
      /*border: 1px solid black;*/
    }
  }
</style>
