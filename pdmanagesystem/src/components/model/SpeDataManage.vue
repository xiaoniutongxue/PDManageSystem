<template>
  <div class="spedata_all">
    <!--本体规格数据头部-->
    <div class="spedata_top">
      <!--头部搜索-->
      <div class="top_search">
        <SearchFacSer/>
      </div>

      <!--新增标题-->
      <div class="top_add">
        <span @click="show_dilogaddp">新增标题</span>
      </div>
    </div>

    <!--本体规格数据内容-->
    <div class="spedata_cont">
      <span class="null" v-show="spe_data==''">该系列暂未添加数据</span>
      <div class="data_item" v-for="prop in spe_data">
        <div class="data_prop">
          <h3>{{prop.propName}}</h3>
          <div class="oper">
            <span @click="show_dilogaddo(prop)">新增选项</span>
            <span @click="show_dilogupdatep(prop)">修改</span>
            <span @click="del_prop(prop.propId)">删除</span>
            <span><i class="el-icon-top" title="上移" @click="move_prop(prop,'up')"/></span>
            <span><i class="el-icon-bottom" title="下移" @click="move_prop(prop,'down')"/></span>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <td style="width: 10%">选项id</td>
              <td style="width: 25%">选项名称</td>
              <td style="width: 15%">选项值</td>
              <td style="width: 15%">连接符</td>
              <td style="width: 10%">添加用户</td>
              <td style="width: 15%">添加时间</td>
              <td style="width: 10%">操作</td>
            </tr>
          </thead>
          <tbody>
            <tr v-show="prop.child==''">
              <td colspan="7">该标题暂未添加选项</td>
            </tr>
            <tr v-for="(opt,j) in prop.child">
              <td>{{opt.optId}}</td>
              <td>{{opt.optName}}</td>
              <td>{{opt.optValue}}</td>
              <td>{{opt.optCode}}</td>
              <td>{{opt.AddUser}}</td>
              <td>{{opt.AddTime}}</td>
              <td class="oper">
                <span @click="show_dilogupdateo(prop,opt)">修改</span>
                <span @click="del_opt(opt.optId)">删除</span>
                <span><i class="el-icon-top" title="上移" @click="move_opt(opt,'up')"/></span>
                <span><i class="el-icon-bottom" title="下移" @click="move_opt(opt,'down')"/></span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!--dilog对话框-->
    <!--添加-->
    <el-dialog class="dialog" title="添加标题" :visible.sync="dilog_addp" width="30%">
      <ul>
        <li class="textli">
          <span>标题名称:</span>
          <el-input v-model="propname" size="small" placeholder="批量添加多个标题请以空格分开(如：标题1 标题2)"/>
        </li>
      </ul>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dilog_addp = false">取 消</el-button>
        <el-button type="primary" @click="add_prop">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog class="dialog" title="添加选项" :visible.sync="dilog_addo" width="30%">
      <ul>
        <li>
          <span>所属标题:</span>
          <el-input v-model="propname" disabled size="small"/>
        </li>
        <li class="textli">
          <span>选项名称:</span>
          <el-input v-model="optname" size="small" placeholder="请输入选项名称"/>
        </li>
        <li class="textli">
          <span>选项值:</span>
          <el-input v-model="optvalue" size="small" placeholder="请输入选项值"/>
        </li>
      </ul>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dilog_addo = false">取 消</el-button>
        <el-button type="primary" @click="add_opt">确 定</el-button>
      </span>
    </el-dialog>
    <!--修改-->
    <el-dialog class="dialog" title="修改标题" :visible.sync="dilog_updatep" width="30%">
      <ul>
        <li>
          <span>标题名称:</span>
          <el-input class="input" v-model="propname" size="small" placeholder="请输入标题名称"/>
        </li>
        <li>
          <span>连接符:</span>
          <el-select class="select" v-model="propcode" size="small" placeholder="请选择连接符">
            <el-option label="无" value="无"/>
            <el-option label=" " value=" "/>
            <el-option label="-" value="-"/>
            <el-option label="/" value="/"/>
          </el-select>
        </li>
      </ul>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dilog_updatep = false">取 消</el-button>
        <el-button type="primary" @click="update_prop">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog class="dialog" title="修改选项" :visible.sync="dilog_updateo" width="30%">
      <ul>
        <li>
          <span>所属标题:</span>
          <el-input v-model="propname" size="small" disabled/>
        </li>
        <li class="textli">
          <span>选项名称:</span>
          <el-input v-model="optname" size="small" placeholder="请输入选项名称"/>
        </li>
        <li class="textli">
          <span>选项值:</span>
          <el-input v-model="optvalue" size="small" placeholder="请输入选项值"/>
        </li>
      </ul>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dilog_updateo = false">取 消</el-button>
        <el-button type="primary" @click="update_opt">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
    /*导入组件*/
    import SearchFacSer from "../comm/SearchFacSer";

    /*导入方法*/
    import {get_spedata} from "../../network/model/spemanage";          /*获取本体选项数据*/
    import {add_speprop} from "../../network/model/spemanage";          /*添加标题*/
    import {add_speopt} from "../../network/model/spemanage";           /*添加选项*/
    import {update_speprop} from "../../network/model/spemanage";       /*修改标题*/
    import {update_speopt} from "../../network/model/spemanage";        /*修改选项*/
    import {del_speprop} from "../../network/model/spemanage";          /*删除标题*/
    import {del_speopt} from "../../network/model/spemanage";           /*删除选项*/
    import {change_speoptorder} from "../../network/model/spemanage";   /*更改本体排序*/
    import {change_speproporder} from "../../network/model/spemanage";

    export default {
        name: "SpeDataManage",
        data(){
          return{
            // 2.本体数据
            spe_data:[],         /*本体规格数据*/

            // 3.dilog
            dilog_addp:false,       /*标题dilog*/
            dilog_addo:false,       /*选项dilog*/
            dilog_updatep:false,    /*标题dilog*/
            dilog_updateo:false,    /*选项dilog*/

            // 4.输入框绑定值
            propid:'',          /*标题id*/
            propname:'',        /*标题绑定值*/
            propcode:'',        /*连接符*/
            optid:'',           /*选项绑定id*/
            optname:'',         /*选项绑定值名称*/
            optvalue:'',        /*选项绑定值*/

          }
        },
        components:{
          SearchFacSer
        },
        computed:{
          /*用户*/
          user(){
            return this.$store.state.user;
          },
          /*当前系统时间*/
          sys_date(){
            return this.$store.getters.sys_date;
          },
          /*品牌id*/
          factid(){
            return this.$store.state.facserdata.fac_id
          },
          /*系列id*/
          seriesid(){
            return this.$store.state.facserdata.ser_id
          },
        },
        watch:{
          seriesid(newVal){
            this.get_spedata(newVal);
          },
        },
        methods:{
          // 1.获取数据
          /*b.获取本体规格数据*/
          get_spedata(seriesid){
            get_spedata(seriesid).then(res=>{
              if(res){
                this.spe_data=res;
              }else{
                console.log('服务器未请求到数据')
              }
            })
          },

          //2.控制开关
          /*a.控制添加标题*/
          show_dilogaddp(){
            this.propname="";
            this.dilog_addp=true;
          },

          /*b.控制添加选项*/
          show_dilogaddo(prop){
            this.propid=prop.propId
            this.propname=prop.propName;
            this.optname="";
            this.optvalue="";
            this.dilog_addo=true;
          },

          /*c.控制修改标题*/
          show_dilogupdatep(prop){
            this.propname=prop.propName;
            this.propcode=prop.propCode;
            this.propid=prop.propId;
            this.dilog_updatep=true;
          },

          /*d.控制修改选项*/
          show_dilogupdateo(prop,optdata){
            this.propid=prop.propId;
            this.propname=prop.propName;
            this.optid=optdata.optId;
            this.optname=optdata.optName;
            this.optvalue=optdata.optValue;
            this.dilog_updateo=true;
          },

          // 3.数据添加
          /*a.添加标题*/
          add_prop(){
            if(this.propname.trim()==""){
              this.$message({
                type:'error',
                message:'请填写标题值',
                duration:1000
              })
              return
            }
            let propnamelist=this.propname.trim().split(/\s+/)
            let propdata=[]
            for(let i=0;i<propnamelist.length;i++){
              /*将输入的值添加到一个对象数组*/
              propdata.push(
                {
                  seriesid:this.seriesid,
                  propname:propnamelist[i],
                  propCode:'无'
                }
              )
            }
            propdata=JSON.stringify(propdata)
            add_speprop(propdata).then(res=>{
              if(res.code==200){
                this.$message({
                  type:'success',
                  message:res.message,
                  duration:1000
                })
                this.get_spedata(this.seriesid);
                this.dilog_addp=false;
              }else{
                this.$message({
                  type:'error',
                  message:res.message,
                  duration:1000
                })
              }
            })
          },

          /*b.添加选项*/
          add_opt(){
            /*判断选项值是否为空*/
            if(this.optname.trim()==""){
              this.$message({
                type:'error',
                message:'请填写选项值',
                duration:1000
              })
              return;
            }
            let optdata=[]
            optdata.push(
              {
                seriesid:this.seriesid,
                propid:this.propid,
                optname:this.optname,
                optvalue:this.optvalue,
                AddUser:this.user,
                AddTime:this.sys_date
              }
            )
            optdata=JSON.stringify(optdata)
            add_speopt(optdata).then(res=>{
              if(res.code==200){
                this.$message({
                  type:'success',
                  message:res.message,
                  duration:1000
                })
                this.get_spedata(this.seriesid);
                this.dilog_addo=false;
              }else{
                this.$message({
                  type:'error',
                  message:res.message,
                  duration:1000
                })
              }
            })
          },

          // 4.数据修改
          /*a.修改标题*/
          update_prop(){
            if(this.propname==""){
              this.$message({
                type:'error',
                message:'请填写标题值',
                duration:1000
              })
              return
            }
            let propdata={}
            propdata.propName=this.propname;
            propdata.propId=this.propid;
            propdata.propCode=this.propcode;
            propdata.seriesid=this.seriesid;
            propdata=JSON.stringify(propdata)
            update_speprop(propdata).then(res=>{
              if(res.code==200){
                this.$message({
                  type:'success',
                  message:res.message,
                  duration:1000
                })
                this.get_spedata(this.seriesid);
                this.dilog_updatep=false;
              }else{
                this.$message({
                  type:'erroe',
                  message:res.message,
                  duration:1000
                })
              }
            })
          },

          /*b.修改选项*/
          update_opt(){
            if(this.optname==""){
              this.$message({
                type:'error',
                message:'请填写选项值',
                duration:1000
              })
              return;
            }
            let optdata={}
            optdata.seriesid=this.seriesid;
            optdata.propId=this.propid;
            optdata.optId=this.optid;
            optdata.optName=this.optname;
            optdata.optValue=this.optvalue;
            optdata=JSON.stringify(optdata)
            update_speopt(optdata).then(res=>{
              if(res.code==200){
                this.$message({
                  type:'success',
                  message:res.message,
                  duration:1000
                })
                this.dilog_updateo=false;
                this.get_spedata(this.seriesid);
              }else{
                this.$message({
                  type:'error',
                  message:res.message,
                  duration:1000
                })
              }
            })
          },

          // 5.数据删除
          /*a.删除标题*/
          del_prop(propid){
            this.$confirm("确认删除该项及其所有子项吗？",'提示',{
              confirmButtonText:'确认',
              cancelButtonText:'取消',
              type:'warning'
            }).then(()=>{
              del_speprop(this.seriesid,propid).then(res=>{
                if(res.code==200){
                  this.get_spedata(this.seriesid);
                  this.$message({
                    type: 'success',
                    message: '数据删除成功',
                    duration:1000
                  });
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

          /*b.删除选项*/
          del_opt(optId){
            this.$confirm("确认删除该项吗？",'提示',{
              confirmButtonText:'确认',
              cancelButtonText:'取消',
              type:'warning'
            }).then(()=>{
              del_speopt(optId).then(res=>{
                if(res.code==200){
                  this.get_spedata(this.seriesid);
                  this.$message({
                    type: 'success',
                    message: '数据删除成功',
                    duration:1000
                  });
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

          // 6.数据排序
          /*a.标题排序*/
          move_prop(data,oper){
            let spedata = {
              oper:oper,
              seriesId:data.seriesId,
              propId:data.propId,
              showOrder:data.showOrder
            }
            spedata=JSON.stringify(spedata)
            change_speproporder(spedata).then(res=>{
              if(res.code==200){
                this.$message({
                  type:"success",
                  message:res.message,
                  duration:1000
                })
                this.get_spedata(this.seriesid)
              }else{
                this.$message({
                  type:"warning",
                  message:res.message,
                  duration:1000
                })
              }
            })
          },

          /*b.选项排序*/
          move_opt(data,oper){
            let spedata = {
              oper:oper,
              seriesId:data.seriesId,
              propId:data.propId,
              optId:data.optId,
              showOrder:data.showOrder
            }
            spedata=JSON.stringify(spedata)
            change_speoptorder(spedata).then(res=>{
              if(res.code==200){
                this.$message({
                  type:"success",
                  message:res.message,
                  duration:1000
                })
                this.get_spedata(this.seriesid)
              }else{
                this.$message({
                  type:"warning",
                  message:res.message,
                  duration:1000
                })
              }
            })
          },
        },
    }
</script>

<style lang="less" scoped>
  @import "../../assets/less/variable";
  @import "../../assets/less/model/comm";
  .spedata_all{
    width: 100%;
    height: 100%;
    /*border: 1px solid black;*/
    /*本体规格头部*/
    .spedata_top{
      width: 100%;
      height: 50px;
      display: flex;
      background: #e5e5e5;
      /*头部搜索*/
      .top_search{
        width: 80%;
        height: 100%;
        /*border: 1px solid black;*/
      }
      /*新增标题*/
      .top_add{
        width: 20%;
        height: 100%;
        /*border: 1px solid black;*/
        span{
          cursor: pointer;
          width: 80px;
          display: block;
          text-align: center;
          padding: 5px 8px;
          font-size: 14px;
          margin-top: 10px;
          margin-left: 62%;
          background: @theme;
          color: white;
          border-radius: 5px;
        }
      }
    }
    /*本体规格内容*/
    .spedata_cont{
      width: 100%;
      height: 93.5%;
      margin-top: 0.5%;
      overflow-y: auto;
      .null{
        display: block;
        width: 100%;
        text-align: center;
        margin-top: 20px;
        font-size: 12px;
      }
      .data_item{
        width: 99%;
        height: auto;
        margin: 0 auto;
        margin-bottom: 10px;
        border: 1px solid @tbl-bor;
        .data_prop{
          width: 100%;
          height: 30px;
          display: flex;
          background: #dadada;
          /*border: 1px solid @tbl-bor;*/
          h3{
            width: 80%;
            height: 100%;
            line-height: 30px;
            font-size: 16px;
            padding-left: 20px;
            /*border: 1px solid black;*/
          }
          .oper{
            width: 20%;
            height: 100%;
            text-align: right;
            margin-right: 10px;
            /*border: 1px solid black;*/
            span{
              cursor: pointer;
              line-height: 30px;
              margin-left: 10px;
              font-size: 12px;
            }
            span:hover{
              color: @theme;
              text-decoration: underline;
            }
          }
        }
      }
    }
  }
</style>
