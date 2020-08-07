<template>
    <div class="ser_all">
      <!--系列头部-->
      <div class="ser_top">
        <!--品牌选择-->
        <div class="top_fac">
          <el-select class="select" v-model="fac_value" size="small" filterable placeholder="请选择品牌">
            <el-option
              v-for="item in fac_data"
              :key="item.value"
              :label="item.label"
              @click.native="get_seriesdata(item.factID)"
              :value="item.factName">
            </el-option>
          </el-select>
        </div>

        <!--系列查询-->
        <div class="top_ser">
          <el-input class="input" size="small" v-model="ser_value" placeholder="请输入系列名称"></el-input>
          <span class="search" @click="search_ser">查询</span>
          <span class="clear" @click="">重置</span>
        </div>

        <!--类型添加-->
        <div class="top_add">
          <span @click="show_adddilog('type',-1)">添加新类型</span>
        </div>
      </div>

      <!--系列内容-->
      <div class="ser_cont">
        <!--左边列表-->
        <div class="cont-left">
          <h3>系列数据层级</h3>
          <span class="null" v-show="ser_data==''">该厂商暂未添加系列</span>
          <ul class="first">
            <li v-for="(fir,i) in ser_data">
              <h5 :class="{selcol:ser_seltedid==fir.SeriesId}" @click="get_sermsg(fir.SeriesId)">
                <i class="el-icon-caret-right"></i>
                {{fir.SeriesName}}
              </h5>
              <ul class="second">
                <li v-for="(sec,j) in fir.child">
                  <h5 :class="{selcol:ser_seltedid==sec.SeriesId}" @click="get_sermsg(sec.SeriesId)">
                    <i class="el-icon-caret-right"></i>
                    {{sec.SeriesName}}
                  </h5>
                  <ul class="third">
                    <li :class="{selcol:ser_seltedid==thi.SeriesId}" v-for="(thi,z) in sec.child"
                        @click="get_sermsg(thi.SeriesId)">
                      {{thi.SeriesName}}
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <!--右边系列详情数据-->
        <div class="cont-right">
          <span class="null" v-show="ser_msgdata==''">请先选择需要操作的系列</span>

          <div class="par-table" v-if="ser_msgdata!=''">
            <!--右边头部-->
            <div class="right-top">
              <!--左边类型名称-->
              <h3>{{ser_msgdata[0].SeriesName}}</h3>
              <div class="oper">
                <span @click="show_adddilog('sersen',ser_msgdata[0].SeriesId)">新增子项</span>
                <span @click="show_updatedilog('type',ser_msgdata[0].SeriesId,ser_msgdata[0])">修改</span>
                <span @click="del_serdate(ser_msgdata[0].SeriesId)">删除</span>
              </div>
            </div>

            <span class="null" v-show="ser_msgdata[0].child==''">该类型暂未添加子项</span>
            <!--系列详情-->
            <div class="right_par" v-for="senpar in ser_msgdata[0].child">
              <div class="tit">
                <h6 :class="{selcol:ser_seltedid==senpar.SeriesId}">{{senpar.SeriesName}}</h6>
                <div class="oper">
                  <span @click="show_adddilog('serthi',senpar.SeriesId)">新增子项</span>
                  <span @click="show_updatedilog('sersen',ser_msgdata[0].SeriesId,senpar)">修改</span>
                  <span @click="del_serdate(senpar.SeriesId)">删除</span>
                </div>
              </div>

              <table>
                <thead>
                  <tr>
                    <td style="width: 10%">系列id</td>
                    <td style="width: 35%">系列名称</td>
                    <td style="width: 15%">系列简称</td>
                    <td style="width: 20%">添加时间</td>
                    <td style="width: 10%">添加用户</td>
                    <td style="width: 10%">操作</td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="senpar.child==''">
                    <td colspan="6">该系列暂无子项</td>
                  </tr>
                  <tr :class="{selcol:ser_seltedid==thipar.SeriesId}" v-for="thipar in senpar.child">
                    <td>{{thipar.SeriesId}}</td>
                    <td>{{thipar.SeriesName}}</td>
                    <td>{{thipar.ShortName}}</td>
                    <td>{{thipar.AddTime}}</td>
                    <td>{{thipar.AddUser}}</td>
                    <td class="oper">
                      <span @click="show_updatedilog('serthi',senpar.SeriesId,thipar)">修改</span>
                      <span @click="del_serdate(thipar.SeriesId)">删除</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!--dilog-->
      <!--新增类型-->
      <el-dialog
        title="新增类型"
        class="dialog"
        :visible.sync="addtype_dilog"
        width="30%">
        <div class="form">
          <ul>
            <li class="textli">
              <span>类型名称:</span>
              <el-input class="input" v-model="type_val" size="small" placeholder="请输入类型名称"/>
            </li>
          </ul>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addtype_dilog = false">取 消</el-button>
          <el-button type="primary" @click="add_type('type')">确 定</el-button>
        </span>
      </el-dialog>

      <!--新增系列-->
      <el-dialog
        title="新增系列"
        class="dialog"
        :visible.sync="addser_dilog"
        width="30%">
        <div class="form">
          <ul>
            <li class="textli">
              <span>系列名称:</span>
              <el-input class="input" v-model="ser_val" size="small" placeholder="请输入系列名称"/>
            </li>
            <li class="textli" v-if="ser_shortinput">
              <span>系列简称:</span>
              <el-input class="input" v-model="ser_shortval" size="small" placeholder="请输入系列简称"/>
            </li>
          </ul>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addser_dilog = false">取 消</el-button>
          <el-button type="primary" @click="add_type('ser')">确 定</el-button>
        </span>
      </el-dialog>

      <!--修改类型-->
      <el-dialog
        title="修改类型"
        class="dialog"
        :visible.sync="updatetype_dilog"
        width="30%">
        <div class="form">
          <ul>
            <li class="textli">
              <span>类型名称:</span>
              <el-input class="input" v-model="type_val" size="small" placeholder="请输入类型名称"/>
            </li>
          </ul>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="updatetype_dilog = false">取 消</el-button>
          <el-button type="primary" @click="update_type('type')">确 定</el-button>
        </span>
      </el-dialog>

      <!--修改系列-->
      <el-dialog
        title="修改系列"
        class="dialog"
        :visible.sync="updateser_dilog"
        width="30%">
        <div class="form">
          <ul>
            <li class="textli">
              <span>系列名称:</span>
              <el-input class="input" v-model="ser_val" size="small" placeholder="请输入系列名称"/>
            </li>
            <li class="textli" v-if="ser_shortinput">
              <span>系列简称:</span>
              <el-input class="input" v-model="ser_shortval" size="small" placeholder="请输入系列简称"/>
            </li>
          </ul>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="updateser_dilog = false">取 消</el-button>
          <el-button type="primary" @click="update_type('ser')">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
     /*导入方法*/
    import {get_factorydata} from "../../network/model/facmanage";
    import {get_seriesdata} from "../../network/model/sermanage";
    import {add_seriesdata} from "../../network/model/sermanage";
    import {update_seriesdata} from "../../network/model/sermanage";
    import {delete_seriesdata} from "../../network/model/sermanage";

     export default {
        name: "SerManage",
        data(){
          return{
            /*品牌数据*/
            fac_value:"",
            fac_id:"",
            fac_data:"",

            /*系列数据*/
            ser_data:"",
            ser_value:"",
            ser_id:'',
            ser_msgdata:[],
            ser_seltedid:0,
            ser_parentid:0,

            /*dilog开关*/
            addtype_dilog:false,
            addser_dilog:false,
            updatetype_dilog:false,
            updateser_dilog:false,
            ser_shortinput:false,

            /*输入框绑定值*/
            type_val:'',
            ser_val:'',
            ser_shortval:'',
          }
        },
        created() {
          this.get_factorydata();
      },
        computed:{
          /*用户*/
          user(){
            return this.$store.state.user;
          },
          /*当前系统时间*/
          sys_date(){
            return this.$store.getters.sys_date;
          }
        },
        watch:{
          ser_data(newVal){
            this.get_sermsg(this.ser_seltedid)
          },
        },
        methods:{
          // 1.获取数据
          /*a.获取品牌数据*/
          get_factorydata() {
            get_factorydata().then(res=>{
              this.fac_data=res
              /*设置默认*/
              this.fac_value=res[0].factName
              this.get_seriesdata(res[0].factID)
            })
          },

          /*b.获取系列数据*/
          get_seriesdata(factid){
              this.ser_msgdata=[];
              this.fac_id=factid;
              get_seriesdata(factid).then(res=>{
                this.ser_data=res;
                /*默认选中*/
                if(this.ser_seltedid==0){
                  this.ser_seltedid=res[0].SeriesId
                }
              })
          },

          /*c.得到左边选择的系列数据*/
          get_sermsg(seriesid){
            this.ser_msgdata=[]
            for(let i=0;i<this.ser_data.length;i++){
              if(this.ser_data[i].SeriesId==seriesid){
                this.ser_msgdata.push(this.ser_data[i])
                this.ser_seltedid=seriesid
                return
              }
              for(let j=0;j<this.ser_data[i].child.length;j++){
                if(this.ser_data[i].child[j].SeriesId==seriesid){
                  this.ser_msgdata.push(
                    {
                      ParentId:this.ser_data[i].ParentId,
                      SeriesId:this.ser_data[i].SeriesId,
                      SeriesName:this.ser_data[i].SeriesName,
                      ShortName:this.ser_data[i].ShortName,
                      child:[]
                    }
                  )
                  this.ser_msgdata[0].child.push(this.ser_data[i].child[j])
                  this.ser_seltedid=seriesid
                  return
                }
                for(let z=0;z<this.ser_data[i].child[j].child.length;z++){
                  if(this.ser_data[i].child[j].child[z].SeriesId==seriesid){
                    this.ser_msgdata.push(
                      {
                        ParentId:this.ser_data[i].ParentId,
                        SeriesId:this.ser_data[i].SeriesId,
                        SeriesName:this.ser_data[i].SeriesName,
                        ShortName:this.ser_data[i].ShortName,
                        child:[]
                      }
                    )
                    this.ser_msgdata[0].child.push(this.ser_data[i].child[j])
                    this.ser_seltedid=seriesid
                    return
                  }
                }
              }
            }
            /*console.log(this.ser_msgdata)*/
          },

          // 2.开关
          /*显示添加对话框*/
          show_adddilog(grand,parentId){
            if(grand=='type'){
              this.addtype_dilog=true;
              this.type_val='';
              this.ser_shortval="";
            }else{
              this.addser_dilog=true
              this.ser_val=''
              if(grand=='sersen'){
                this.ser_shortinput=false
                this.ser_shortval="0";
              }else{
                this.ser_shortinput=true
                this.ser_shortval="";
              }
            }
            this.ser_parentid=parentId
          },

          /*显示修改对话框*/
          show_updatedilog(grand,parentId,msgdata){
            if(grand=='type'){
              this.updatetype_dilog=true;
              this.type_val=msgdata.SeriesName;
              this.ser_shortval="";
            }else{
              this.updateser_dilog=true
              this.ser_val=msgdata.SeriesName
              if(grand=='sersen'){
                this.ser_shortinput=false
                this.ser_shortval="0";

              }else{
                this.ser_shortinput=true
                this.ser_shortval=msgdata.SeriesName;
                this.ser_shortval=msgdata.ShortName;
              }
            }
            this.ser_id=msgdata.SeriesId
            this.ser_parentid=parentId
          },

          // 3.增加数据
          add_type(grand){
            let seriesdata={}
            if(grand=='type'){
              seriesdata.SeriesName=this.type_val;
            }else{
              seriesdata.SeriesName=this.ser_val;
              if(this.ser_shortval==''){
                this.$message({
                  type:'warning',
                  message:"请输入简称",
                  duration:1000
                })
                return
              }
            }
            if(seriesdata.SeriesName==''){
              this.$message({
                type:'warning',
                message:"添加数据不能为空",
                duration:1000
              })
              return
            }
            seriesdata.FactId=this.fac_id;
            seriesdata.ParentId=this.ser_parentid;
            seriesdata.AddUser=this.user;
            seriesdata.AddTime=this.sys_date;
            seriesdata.ShortName=this.ser_shortval;
            seriesdata=JSON.stringify(seriesdata)
            add_seriesdata(seriesdata).then(res=>{
              if(res.code==200){
                this.$message({
                  type:'success',
                  message:res.message,
                  duration:1000
                })
                this.addtype_dilog=false
                this.addser_dilog=false
                this.get_seriesdata(this.fac_id)
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
          update_type(grand){
            let seriesdata={}
            if(grand=='type'){
              seriesdata.SeriesName=this.type_val;
            }else{
              seriesdata.SeriesName=this.ser_val;
              if(this.ser_shortval==''){
                this.$message({
                  type:'warning',
                  message:"请输入简称",
                  duration:1000
                })
                return
              }
            }
            if(seriesdata.SeriesName==''){
              this.$message({
                type:'warning',
                message:"修改数据不能为空",
                duration:1000
              })
              return
            }
            seriesdata.FactId=this.fac_id;
            seriesdata.ParentId=this.ser_parentid;
            seriesdata.SeriesId=this.ser_id;
            seriesdata.UpdateUser=this.user;
            seriesdata.UpdateTime=this.sys_date;
            seriesdata.ShortName=this.ser_shortval;
            seriesdata=JSON.stringify(seriesdata)
            update_seriesdata(seriesdata).then(res=>{
              if(res.code==200){
                this.$message({
                  type:'success',
                  message:res.message,
                  duration:1000
                })
                this.updatetype_dilog=false
                this.updateser_dilog=false
                this.get_seriesdata(this.fac_id)
              }else{
                this.$message({
                  type:'error',
                  message:"修改错误",
                  duration:1000
                })
              }
            })
          },

          // 5.删除数据
          del_serdate(seriesid){
            this.$confirm('确认删除该数据及其相关数据, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              delete_seriesdata(seriesid).then(res=>{
                if(res.code==200){
                  this.$message({
                    type: 'success',
                    message: '删除成功!',
                    duration:1000
                  });
                  this.get_seriesdata(this.fac_id)
                }
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除',
                duration:1000
              });
            });
          },

          // 6.系列搜索框
          search_ser(){
            /*console.log(this.ser_value)*/
          },
      }
    }
</script>

<style lang="less" scoped>
  @import "../../assets/less/comm/variable";
  @import "../../assets/less/comm/comm";
  .ser_all{
    width: 100%;
    height: 100%;
    /*border: 1px solid black;*/
    /*头部查询*/
    .ser_top{
      width: 100%;
      height: 50px;
      display: flex;
      background: #e5e5e5;
      /*厂商查询*/
      .top_fac{
        width: 20%;
        height: 100%;
        /*border: 1px solid black;*/
        .select{
          width: 90%;
          margin-top: 10px;
          margin-left: 20px;
        }
      }
      /*系列查询*/
      .top_ser{
        width: 25%;
        height: 100%;
        display: flex;
        /*border: 1px solid black;*/
        .input{
          width: 65%;
          margin-top: 10px;
          margin-left: 20px;
        }
        span{
          cursor: pointer;
          width: 50px;
          height: 30px;
          display: block;
          color: white;
          font-size: 12px;
          text-align: center;
          line-height: 30px;
          background: @theme;
          margin-top: 11px;
          border-radius: 5px;
          margin-left: 10px;
          -webkit-user-select: none;
        }
      }
      /*添加新类型*/
      .top_add{
        width: 55%;
        height: 100%;
        text-align: right;
        /*border: 1px solid black;*/
        span{
          cursor: pointer;
          width: 80px;
          display: block;
          text-align: center;
          padding: 5px 8px;
          font-size: 14px;
          margin-top: 10px;
          margin-left: 87%;
          background: @theme;
          color: white;
          border-radius: 5px;
          /*border: 1px solid black;*/
        }
      }
    }
    /*系列内容*/
    .ser_cont{
      width: 100%;
      height: 93.5%;
      margin-top: 0.5%;
      display: flex;
      justify-content: space-between;
      /*border: 1px solid black;*/
      /*左边列表*/
      .cont-left{
        width: 20%;
        height: 100%;
        border: 1px solid @tbl-bor;
        h3{
          width: 100%;
          height: 40px;
          text-align: center;
          line-height: 40px;
          border-bottom: 1px solid @tbl-bor;
        }
        ul{
          width: 90%;
          margin-left: 10%;
          font-size: 12px;
          cursor: pointer;
          list-style: none;
          h5:hover{
            color: @theme;
          }
        }
        .first{
          margin-top: 10px;
        }
        .third{
          li:hover{
            color: @theme;
          }
        }
      }
      /*右边系列详情*/
      .cont-right{
        width: 79%;
        height: 100%;
        border: 1px solid @tbl-bor;
        /*公共样式*/
        .sysoper(@H){
          width: 15%;
          font-size: 12px;
          cursor: pointer;
          text-align: center;
          /*border: 1px solid @tbl-bor;*/
          span{
            margin-left: 10px;
            line-height: @H;
          }
          span:hover{
            color: @theme;
            text-decoration: underline;
          }
        }
        .par-table{
          width: 100%;
          height: auto;
          overflow: auto;
          max-height: 100%;
          /*border: 1px solid black;*/
          /*右边头部*/
          .right-top{
            width: 100%;
            height: 40px;
            display: flex;
            margin: 0 auto;
            border-bottom: 1px solid @tbl-bor;
            h3{
              width: 85%;
              padding-left: 2%;
              line-height: 40px;
              /*border: 1px solid black;*/
            }
            .oper{
              .sysoper(40px);
            }
          }
          /*右边内容*/
          .right_par{
            width: 99%;
            margin: 10px auto;
            border: 1px solid @tbl-bor;
            .tit{
              width: 100%;
              height: 30px;
              display: flex;
              background: #dadada;
              /*border: 1px solid black;*/
              h6{
                width: 88%;
                padding-left: 2%;
                line-height: 30px;
              }
              .oper{
                .sysoper(30px);
              }
            }
          }
        }
      }
    }
    .selcol{
      color: @theme;
    }
  }

</style>
