<template>
    <div class="param-all">
      <!--特性参数头部品牌系列查询-->
      <div class="param-top">
        <!--头部查询-->
        <div class="top_search">
          <SearchFacSer>
            <span>类型:</span>
            <el-select class="type" size="small" v-model="Type_name" placeholder="请选择">
              <el-option
                v-for="item in Param_Data"
                :key="item.typeId"
                :label="item.typeName"
                :value="item.typeName"
                @click.native="get_propdate(item)"
              />
            </el-select>
          </SearchFacSer>
        </div>

        <!--头部添加-->
        <div class="top_add">
          <span @click="show_addt">新增类型</span>
        </div>
      </div>

      <!--特性参数内容-->
      <div class="param-cont" v-for="type in Param_Data" v-if="type.typeId==Type_id">
        <!--特性参数头部类型-->
        <div class="cont-top">
          <h3>{{type.typeName}}</h3>
          <div class="oper">
            <span @click="show_addp">新增标题</span>
            <span @click="show_updatet">修改</span>
            <span @click="del_paramt(typeid,'fir')">删除</span>
          </div>
        </div>

        <!--特性参数选项数据-->
        <!--<span class="null" v-if="propdata==''">该类型暂未添加数据</span>-->
        <div class="cont-item" v-for="prop in type.child">
          <!--选项标题-->
          <div class="prop">
            <div class="tit">
              <h3>{{prop.propName}}</h3>
            </div>
            <div class="oper">
              <div class="rel">
                <span class="rel-tit">关联本体项:</span>
                <span class="rel-opt">{{Spe_prop(prop.speRelId)}}</span>
              </div>
              <div class="oper-oper">
                <span @click="show_addo(prop.typeId)">新增选项</span>
                <span @click="show_updatep(prop)">修改</span>
                <span @click="del_paramt(prop.typeId,'sec')">删除</span>
              </div>
            </div>
          </div>
          <!--选项-->
          <table>
            <thead>
              <tr>
                <td>id</td>
                <td>选项名称</td>
                <td>选项值</td>
                <td>选项单位</td>
                <td>添加用户</td>
                <td>添加时间</td>
                <td>操作</td>
              </tr>
            </thead>
            <tbody>
              <!--<tr v-if="prop.child==''">
                <td colspan="7">该标题暂未添加数据</td>
              </tr>-->
              <tr v-for="opt in prop.child">
                <td>{{opt.optId}}</td>
                <td>{{opt.optName}}</td>
                <td>{{opt.optValue}}</td>
                <td>{{opt.optUnit}}</td>
                <td>{{opt.AddUser}}</td>
                <td>{{opt.AddTime}}</td>
                <td class="oper">
                  <span @click="show_updateo(opt)">修改</span>
                  <span @click="del_paramo(opt.optId)">删除</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!--dilog对话框-->
      <!--添加-->
      <el-dialog class="dialog" title="添加类型" :visible.sync="dilog_addt" width="30%">
        <ul>
          <li class="textli">
            <span>类型名称:</span>
            <el-input class="input" v-model="typename" size="small" placeholder="请输入类型名称"/>
          </li>
        </ul>

        <span slot="footer" class="dialog-footer">
            <el-button @click="dilog_addt = false">取 消</el-button>
            <el-button type="primary" @click="add_paramt">确 定</el-button>
          </span>
      </el-dialog>
      <el-dialog class="dialog" title="添加标题" :visible.sync="dilog_addp" width="30%">
        <ul>
          <li class="textli">
            <span>标题名称:</span>
            <el-input class="input" v-model="propname" size="small" placeholder="请输入标题名称"/>
          </li>
          <li>
            <span>关联本体项:</span>
            <el-select class="select" v-model="spe_relid" size="small" placeholder="请选择">
              <el-option
                label="无"
                value="-1">
              </el-option>
              <el-option
                v-for="item in spe_data"
                :key="item.propId"
                :label="item.propName"
                :value="item.propId">
              </el-option>
            </el-select>
          </li>
        </ul>

        <span slot="footer" class="dialog-footer">
            <el-button @click="dilog_addp = false">取 消</el-button>
            <el-button type="primary" @click="add_paramp">确 定</el-button>
          </span>
      </el-dialog>
      <el-dialog class="dialog" title="添加选项" :visible.sync="dilog_addo" width="30%">
        <ul>
          <li class="textli">
            <span>选项名称:</span>
            <el-input class="input" v-model="optname" size="small" placeholder="请输入类型名称"/>
          </li>
          <li class="textli">
            <span>选项值:</span>
            <el-input class="input" v-model="optval" size="small" placeholder="请输入类型名称"/>
          </li>
          <li class="textli">
            <span>选项单位:</span>
            <el-input class="input" v-model="optunit" size="small" placeholder="请输入类型名称"/>
          </li>
        </ul>

        <span slot="footer" class="dialog-footer">
            <el-button @click="dilog_addo = false">取 消</el-button>
            <el-button type="primary" @click="add_paramo">确 定</el-button>
          </span>
      </el-dialog>

      <!--修改-->
      <el-dialog class="dialog" title="修改类型" :visible.sync="dilog_updatet" width="30%">
        <ul>
          <li class="textli">
            <span>类型名称:</span>
            <el-input class="input" v-model="typename" size="small" placeholder="请输入类型名称"/>
          </li>
        </ul>

        <span slot="footer" class="dialog-footer">
            <el-button @click="dilog_updatet = false">取 消</el-button>
            <el-button type="primary" @click="update_paramt()">确 定</el-button>
          </span>
      </el-dialog>
      <el-dialog class="dialog" title="修改标题" :visible.sync="dilog_updatep" width="30%">
        <ul>
          <li class="textli">
            <span>标题名称:</span>
            <el-input class="input" v-model="propname" size="small" placeholder="请输入标题名称"/>
          </li>
          <li>
            <span>关联本体项:</span>
            <el-select class="select" v-model="spe_relid" size="small" placeholder="请选择">
              <el-option
                label="无"
                value="-1">
              </el-option>
              <el-option
                v-for="item in spe_data"
                :key="item.propId"
                :label="item.propName"
                :value="item.propId">
              </el-option>
            </el-select>
          </li>
        </ul>

        <span slot="footer" class="dialog-footer">
            <el-button @click="dilog_updatep = false">取 消</el-button>
            <el-button type="primary" @click="update_paramp()">确 定</el-button>
          </span>
      </el-dialog>
      <el-dialog class="dialog" title="修改选项" :visible.sync="dilog_updateo" width="30%">
        <ul>
          <li class="textli">
            <span>选项名称:</span>
            <el-input class="input" v-model="optname" size="small" placeholder="请输入类型名称"/>
          </li>
          <li class="textli">
            <span>选项值:</span>
            <el-input class="input" v-model="optval" size="small" placeholder="请输入类型名称"/>
          </li>
          <li class="textli">
            <span>选项单位:</span>
            <el-input class="input" v-model="optunit" size="small" placeholder="请输入类型名称"/>
          </li>
        </ul>

        <span slot="footer" class="dialog-footer">
            <el-button @click="dilog_updateo = false">取 消</el-button>
            <el-button type="primary" @click="update_paramo">确 定</el-button>
          </span>
      </el-dialog>
    </div>
</template>

<script>
    // 导入组件
    import SearchFacSer from "../comm/SearchFacSer";

    // 导入方法
    import {get_paramdata} from "../../network/model/parammanage";
    import {add_paramtype} from "../../network/model/parammanage";
    import {add_paramopt} from "../../network/model/parammanage";
    import {update_paramtype} from "../../network/model/parammanage";
    import {update_paramopt} from "../../network/model/parammanage";
    import {del_paramtype} from "../../network/model/parammanage";
    import {del_paramopt} from "../../network/model/parammanage";
    import {get_spedata} from "../../network/model/spemanage";
    import {del_accrel} from "../../network/model/accmanage";

    export default {
        name: "ParamDataManage",
        data(){
          return{
            // 1.特性参数数据
            Param_Data:[],             /*所有特性参数数据*/

            // 2.类型数据
            Type_id:'',                /*类型id*/
            Type_name:'',             /*类型名称*/

            // 3.本体数据
            spe_data:[],              /*本体规格数据*/

            // 4.dilog开关
            dilog_addt:false,         /*控制显示添加类型*/
            dilog_addp:false,         /*控制显示添加标题*/
            dilog_addo:false,         /*控制显示添加选项*/
            dilog_updatet:false,      /*控制显示修改类型*/
            dilog_updatep:false,      /*控制显示修改标题*/
            dilog_updateo:false,      /*控制显示修改选项*/

            // 5.输入框绑定值
            typename:'',              /*类型名称*/
            propname:'',              /*标题名称*/
            optid:'',                 /*选项id*/
            optname:'',               /*选项名称*/
            optval:'',                /*选项值*/
            optunit:'',               /*选项单位*/

            // 6.关联本体
            spe_relid:'',             /*关联本体层级(选择哪个选项)*/
          }
        },
        created(){
          this.get_paramdata(this.seriesid);      /*获取特性参数数据*/
          this.get_spedata(this.seriesid);         /*获取本体数据*/
        },
        watch:{
          /*监听系列id*/
          seriesid(newVal){
            this.get_paramdata(newVal);      /*获取特性参数数据*/
            this.get_spedata(newVal);         /*获取本体数据*/
          },
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
          /*得到本体标题id*/
          Spe_prop(){
            return (id)=>{
              if(id==-1){
                return '无'
              }
              for(let i=0;i<this.spe_data.length;i++){
                if(this.spe_data[i].propId==id){
                  return this.spe_data[i].propName;
                }
              }
            }
          },
        },
        methods:{
          // 1.获取数据
          /*a.获取本体数据*/
          get_spedata(seriesid){
            get_spedata(seriesid).then(res=>{
              this.spe_data=res
            })
          },

          /*b.获取特性参数所有数据*/
          get_paramdata(seriesid){
            get_paramdata(seriesid).then(res=>{
              this.Param_Data=res;
              if(res.length>0){
                if(this.Type_id===''){
                  this.Type_id=res[0].typeId;
                  this.Type_name=res[0].typeName;
                }else{
                  for(let i=0;i<res.length;i++){
                    if(this.typename===res[i].typeName){
                      this.Type_id=res[i].typeId;
                      this.Type_name=res[i].typeName;
                    }
                  }
                }
              }
            })
          },

          /*c.获取特性参数内容数据*/
          get_propdate(typedata){
            this.Type_id=typedata.typeId;
            this.Type_name=typedata.typeName;
          },

          // 2.显示对话框
          /*a.添加特性参数类型*/
          show_addt(){
            this.typename='';
            this.dilog_addt=true;
          },

          /*b.添加特性参数标题*/
          show_addp(){
            this.propname="";
            this.spe_relid='-1';
            this.dilog_addp=true;
          },

          /*c.添加特性参数选项*/
          show_addo(typeid){
            this.optname="";
            this.optval="";
            this.optunit="";
            this.dilog_addo=true;
          },

          /*d.修改特性参数类型*/
          show_updatet(){
            this.typename=this.Type_name;
            this.dilog_updatet=true;
          },

          /*e.修改特性参数类标题*/
          show_updatep(prop){
            this.propid=prop.propId;
            this.propname=prop.propName;
            if(prop.speRelId==-1){
              this.spe_relid='-1'
            }else{
              this.spe_relid=prop.speRelId;
            }
            this.dilog_updatep=true;
          },

          /*f.修改特性参数类型*/
          show_updateo(opt){
            this.optid=opt.optId;
            this.optname=opt.optName;
            this.optval=opt.optValue;
            this.optunit=opt.optUnit;
            this.dilog_updateo=true;
          },

          // 3.添加数据
          /*a.添加类型*/
          add_paramt(){
            if(this.typename==''){
              this.$message({
                type:'error',
                message:'请输入类型名称',
                duration:1000
              })
              return
            }
            let typedata={}
            typedata={
              typeName:this.typename,
              AddUser:this.user,
              AddTime:this.sys_date,
              seriesId:this.seriesid,
            }
            typedata=JSON.stringify(typedata)
            /*console.log(typedata)*/
            add_paramtype(typedata).then(res=>{
              if(res.code==200){
                this.$message({
                  type:'success',
                  message:res.message,
                  duration:1000
                })
                this.get_paramdata(this.seriesid);
                this.dilog_addt=false;
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

          /*b.添加标题*/
          add_paramp(){},

          /*c.添加选项*/
          add_paramo(){
            if(this.optname==''){
              this.$message({
                type:'error',
                message:'请输入选项名称',
                duration:1000
              })
              return
            }
            let optdata={}
            optdata={
              optName:this.optname,
              optValue:this.optval,
              optUnit:this.optunit,
              AddUser:this.user,
              AddTime:this.sys_date,
              typeId:this.Type_id,
              seriesId:this.seriesid,
            }
            optdata=JSON.stringify(optdata)
            /*console.log(optdata)*/
            add_paramopt(optdata).then(res=>{
              if(res.code==200){
                this.$message({
                  type:'success',
                  message:res.message,
                  duration:1000
                })
                this.get_paramdata(this.seriesid);
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

          // 4.修改数据
          /*a.修改类型*/
          update_paramt(){
            if(this.typename==''){
              this.$message({
                type:'error',
                message:'请输入类型名称',
                duration:1000
              })
              return
            }
            let typedata={}
            typedata={
              typeId:this.Type_id,
              typeName:this.typename,
              AddUser:this.user,
              AddTime:this.sys_date,
              seriesId:this.seriesid,
            }
            typedata=JSON.stringify(typedata)
            /*console.log(typedata)*/
            update_paramtype(typedata).then(res=>{
              if(res.code==200){
                this.$message({
                  type:'success',
                  message:res.message,
                  duration:1000
                })
                this.dilog_updatet=false;
                this.get_paramdata(this.seriesid);
              }else{
                this.$message({
                  type:'error',
                  message:res.message,
                  duration:1000
                })
              }
            })
          },

          /*b.修改标题*/
          update_paramp(){},

          /*c.修改选项*/
          update_paramo(){
            if(this.optname==''){
              this.$message({
                type:'error',
                message:'请输入选项名称',
                duration:1000
              })
              return
            }
            let optdata={}
            optdata={
              optId:this.optid,
              optName:this.optname,
              optValue:this.optval,
              optUnit:this.optunit,
              typeId:this.Type_id,
              seriesId:this.seriesid,
            }
            optdata=JSON.stringify(optdata)
            /*console.log(optdata)*/
            update_paramopt(optdata).then(res=>{
              if(res.code==200){
                this.$message({
                  type:'success',
                  message:res.message,
                  duration:1000
                })
                this.get_paramdata(this.seriesid);
                this.dilog_updateo=false;
              }else{
                this.$message({
                  type:'error',
                  message:res.message,
                  duration:1000
                })
              }
            })
          },

          // 5.删除数据
          /*a.删除类型*/
          del_paramt(typeid){
            this.$confirm("确认删除该数据及其子项吗？",'提示',{
              confirmButtonText:'确认',
              cancelButtonText:'取消',
              type:'warning'
            }).then(()=>{
              del_paramtype(typeid).then(res=>{
                if(res.code==200){
                  this.$message({
                    type:'success',
                    message:res.message,
                    duration:1000
                  })
                  this.get_paramdata(this.seriesid);
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

          /*b.删除标题*/
          del_paramp(propid){},

          /*c.删除选项*/
          del_paramo(optid){
            this.$confirm("确认删除该数据及其子项吗？",'提示',{
              confirmButtonText:'确认',
              cancelButtonText:'取消',
              type:'warning'
            }).then(()=>{
              del_paramopt(optid).then(res=>{
                if(res.code==200){
                  this.$message({
                    type:'success',
                    message:res.message,
                    duration:1000
                  })
                  this.get_paramdata(this.seriesid);
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
        components:{
          SearchFacSer
        },
    }
</script>

<style lang="less" scoped>
  @import "../../assets/less/comm/variable";
  @import "../../assets/less/comm/comm";
  .param-all{
    width: 100%;
    height: 100%;
    /*border: 1px solid black;*/
    .null{
      width: 100%;
      text-align: center;
      margin-top: 20px;
      font-size: 12px;
      display: block;
    }
    /*参数头部*/
    .param-top{
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
    /*参数内容*/
    .param-cont{
      width: 100%;
      height: 93.5%;
      margin-top: 0.5%;
      overflow-y: auto;
      border: 1px solid @tbl-bor;
      /*头部类型*/
      .cont-top{
        width: 99%;
        height: 40px;
        margin: 5px auto;
        display: flex;
        background: #cacaca;
        border-bottom:1px solid @tbl-bor ;
        h3{
          width: 50%;
          line-height: 40px;
          padding-left: 20px;
          /*border: 1px solid black;*/
        }
        .oper{
          width: 50%;
          height: 40px;
          text-align: right;
          /*border: 1px solid black;*/
          span{
            cursor: pointer;
            font-size: 12px;
            line-height: 40px;
            margin-right: 10px;
          }
          span:hover{
            color: @theme;
            text-decoration: underline;
          }
        }
      }
      /*内容数据*/
      .cont-item{
        width: 99%;
        height: auto;
        margin: 5px auto;
        border: 1px solid @tbl-bor;
        /*标题*/
        .prop{
          width: 100%;
          height: 30px;
          display: flex;
          background: #dadada;
          /*border: 1px solid black;*/
          .tit{
            width: 50%;
            line-height: 30px;
            padding-left: 18px;
            /*border: 1px solid black;*/
          }
          .oper{
            width: 50%;
            line-height: 30px;
            padding-left: 18px;
            display: flex;
            /*border: 1px solid black;*/
            .rel{
              width: 60%;
              font-size: 12px;
              /*border: 1px solid black;*/
              .rel-tit{
                font-weight: bold;
              }
              .rel-opt{
                margin-left: 10px;
              }
            }
            .oper-oper{
              width: 40%;
              height: 30px;
              text-align: right;
              /*border: 1px solid black;*/
              span{
                cursor: pointer;
                font-size: 12px;
                line-height: 30px;
                margin-right: 10px;
              }
              span:hover{
                color: @theme;
                text-decoration: underline;
              }
            }
          }
        }
        table{
          width: 100%;
          margin-top: 5px;
          border-collapse: collapse;
          thead{
            tr{
              td{
                height: 30px;
                text-align: center;
                font-size: 14px;
                font-weight: bold;
                background: #dadada;
                border: 1px solid @tbl-bor;
              }
            }
          }
          tbody{
            tr{
              td{
                height: 25px;
                text-align: center;
                font-size: 12px;
                border: 1px solid @tbl-bor;
              }
              .oper{
                width: 120px;
                span{
                  cursor: pointer;
                  margin-left: 10px;
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
    }
  }
</style>
