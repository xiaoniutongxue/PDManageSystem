<template>
  <div class="price-all">
    <!--价格头部品牌系列选择-->
    <div class="price-top">
      <SearchFacSer>
        <span v-if="JSON.stringify(acc_typedata)!='[]'">类型:</span>
        <el-cascader
          v-if="JSON.stringify(acc_typedata)!='[]'"
          size="small"
          class="type"
          v-model="acc_typeval"
          :options="acc_typedata"
          :props="{ expandTrigger: 'hover' }"
        ></el-cascader>
      </SearchFacSer>
    </div>

    <!--价格内容数据-->
    <div class="price-cont">
      <!--左边数据选择-->
      <div class="cont-left">
        <div class="select-top">
          <h3>本体规格数据选择</h3>
        </div>

        <div class="select_content">
          <!--当系列无数据时显示-->
          <span class="null" v-if="acc_data==''">该系列暂无数据</span>

          <!--本体规格数据-->
          <dynamicCompspe
            :dynamicdata="acc_data"
            :seriesid="seriesid"
            :typeid="acc_typeid"
            @get_CheckedList="get_AccchList"
            @get_MesData="get_AccMesData"/>
        </div>
      </div>

      <!--右边价格详情-->
      <div class="cont-right">
        <!--头部型号名称-->
        <div class="right-top">
          <ul>
            <li>
              <span class="tit">型号名称:</span>
              <el-input class="input" size="small" v-model="comp_name" placeholder="请输入型号"></el-input>
            </li>
            <li>
              <span class="tit">订货号:</span>
              <el-input class="input" size="small" v-model="comp_ordernum" placeholder="请输入订货号"></el-input>
            </li>
            <li>
              <span class="tit">型号价格:</span>
              <el-input class="input" size="small" v-model="comp_price" placeholder="请输入价格"></el-input>
            </li>
            <li class="oper">
              <span class="tit" @click="add_compdata">添加</span>
            </li>
          </ul>
        </div>

        <!--型号价格内容-->
        <div class="right-cont">
          <table>
            <thead>
              <tr>
                <td style="width: 5%">id</td>
                <td style="width: 25%">名称</td>
                <td style="width: 20%">订货号</td>
                <td style="width: 10%">价格</td>
                <td style="width: 10%">添加用户</td>
                <td style="width: 20%">添加时间</td>
                <td style="width: 10%">操作</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="comp in compdata" :class="{compColor:comp.optStr===acc_msgdata.optStr}">
                <td>{{comp.compId}}</td>
                <td>{{comp.compName}}</td>
                <td>{{comp.compNumber}}</td>
                <td>{{comp.compPrice}}</td>
                <td>{{comp.AddUser}}</td>
                <td>{{comp.AddTime}}</td>
                <td class="oper">
                  <span @click="show_dilogc(comp)">修改</span>
                  <span @click="del_compdata(comp.compId)">删除</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!--dilog对话框-->
    <el-dialog class="dialog" title="修改价格" :visible.sync="dilog_update" width="30%">
      <ul>
        <li class="textli">
          <span>型号名称:</span>
          <el-input class="short_input" v-model="comp_name" :disabled="true" size="small"/>
        </li>
        <li class="textli">
          <span>订货号:</span>
          <el-input class="short_input" v-model="comp_ordernum" :disabled="true" size="small"/>
        </li>
        <li class="textli">
          <span>型号价格:</span>
          <el-input class="short_input" v-model="comp_price" size="small" placeholder="请输入价格"/>
        </li>
      </ul>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dilog_update = false">取 消</el-button>
        <el-button type="primary" @click="update_compdata">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  // 1.导入组件
  import SearchFacSer from "../comm/SearchFacSer";
  import dynamicCompspe from "./commComp/dynamicCompspe";
  // 2.导入方法
  import {get_acctypedata} from "../../network/model/accmanage";        /*获取本体数据*/
  import {get_acccompdatabytype} from "../../network/model/accmanage";      /*获取型号数据*/
  import {add_acccompdata} from "../../network/model/accmanage";      /*添加型号数据*/
  import {update_acccompdata} from "../../network/model/accmanage";   /*修改型号数据*/
  import {del_acccompdata} from "../../network/model/accmanage";      /*删除型号数据*/

  export default {
        name: "AccPriceManage",
        data(){
          return{
            // 1.附件数据
            acc_data:[],          /*本体规格数据*/
            acc_msgdata:[],       /*本体组件传出的数据*/
            acc_chlist:[],        /*本体选中的数据id*/

            /*2.型号数据*/
            compdata:[],         /*型号价格所有数据*/
            comp_id:'',          /*型号id*/
            comp_name:'',        /*型号名称*/
            comp_ordernum:'',    /*型号订货号*/
            comp_price:'',       /*型号价格*/
            comp_propstr:'',     /*组成型号标题*/
            comp_optstr:'',      /*组成型号选项*/

            // 3.类型数据
            acc_typeid:'',
            acc_typedata:[],
            acc_typeval:'',
            acc_typename:'',

            /*开关*/
            dilog_update:false,
          }
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
          /*系列名称*/
          sername(){
            return this.$store.state.facserdata.ser_name
          },
        },
        created(){
          this.get_acctypedata(this.seriesid);
        },
        watch:{
          /*a.监听系列id*/
          seriesid(newVal){
            this.get_acctypedata(newVal);
          },
          /*b.监听勾选上的选项*/
          acc_chlist(newVal){
            this.get_compTit(newVal)
          },
          /*c.监听勾选上的值发生改变*/
          acc_msgdata(){
            this.get_compTit(this.acc_chlist)
          },
          /*d.监听类型*/
          acc_typeid(newVal){
            this.get_compdata(this.seriesid,newVal);
            this.comp_price='';
          },
          /*e.监听类型值*/
          acc_typeval(newVal){
            this.get_accdata(newVal[1]);
          },
        },
        methods:{
          // 1.获取数据
          /*a.获取本体规格数据*/
          get_acctypedata(seriesid){
            get_acctypedata(seriesid).then(res=>{
              this.acc_alldata=res;
              if(res.length>0){
                this.acc_typedata=[]
                for(let i=0;i<res.length;i++){
                  this.acc_typedata.push({
                    value:res[i].typeId,
                    label: res[i].typeName,
                    children:[]
                  })
                  for(let j=0;j<res[i].child.length;j++){
                    this.acc_typedata[i].children.push({
                      value:res[i].child[j].typeId,
                      label: res[i].child[j].typeName,
                    })
                  }
                }
                this.acc_typeval=[res[0].typeId,res[0].child[0].typeId]
              }else{
                this.acc_typeval=[]
                this.acc_typedata=[]
              }
              /*console.log(this.acc_typedata)*/
            })
          },

          /*c.获取型号价格所有数据*/
          get_compdata(seriesid,typeid){
            get_acccompdatabytype(seriesid,typeid).then(res=>{
              this.compdata=res
            })
          },

          /*d.获取附件数据*/
          get_accdata(typeid){
            this.acc_typeid=typeid
            this.acc_data=[]
            for(let i=0;i<this.acc_alldata.length;i++){
              for(let j=0;j<this.acc_alldata[i].child.length;j++){
                if(this.acc_alldata[i].child[j].typeId==typeid){
                  this.acc_typename=this.acc_alldata[i].child[j].typeName;
                  this.acc_data=this.acc_alldata[i].child[j].child;
                }
              }
            }
          },

          /*e.得到本体规格传出的数据*/
          get_AccMesData(MesData){
            this.acc_msgdata=MesData;
            /*console.log(Spe_MesData)*/
          },

          /*f.获取勾选上的本体*/
          get_AccchList(checked){
            this.acc_chlist=checked;
          },

          /*g.获取型号信息*/
          get_compTit(){
            let compTit='',propstr='',optstr=''
            for(let i=0;i<this.acc_chlist.length;i++){
              if(this.acc_msgdata['propCodeList'].length>0){
                /*得到型号名称*/
                let code=''
                if(this.acc_msgdata['propCodeList'][this.acc_chlist[i]]=='无'){
                  code=''
                }else{
                  code=this.acc_msgdata['propCodeList'][this.acc_chlist[i]]
                }
                compTit=compTit+code+this.acc_msgdata['optValList'][this.acc_chlist[i]]
                /*得到组成标题字符串*/
                propstr=propstr+"-"+this.acc_msgdata['propList'][this.acc_chlist[i]]
                /*得到组成选项字符串*/
                optstr=optstr+'-'+this.acc_msgdata['optList'][this.acc_chlist[i]]
              }
            }
            this.comp_name=compTit;
            this.comp_propstr=this.acc_msgdata.propStr
            this.comp_optstr=this.acc_msgdata.optStr
            /*console.log(compTit)
            console.log(this.comp_propstr)
            console.log(this.comp_optstr)*/
          },

          // 2.添加数据
          /*a.添加型号价格数据*/
          add_compdata(){
            /*判断数据是否为空*/
            if(this.comp_name===''){
              this.$message({
                type:'error',
                message:'类型名称不能为空',
                duration:1000
              })
              return;
            }else if (this.comp_price==='' || isNaN(this.comp_price) || parseInt(this.comp_price)<0){
              this.$message({
                type:'error',
                message:'请输入正确价格',
                duration:1000
              })
              return;
            }
            let compdata={
              typeId:this.acc_typeid,
              seriesId:this.seriesid,
              compName:this.comp_name,
              compNumber:this.comp_ordernum,
              compPrice:this.comp_price,
              propStr:this.comp_propstr,
              optStr:this.comp_optstr,
              serName:this.sername,
              AddUser:this.user,
              AddTime:this.sys_date,
            }
            compdata= JSON.stringify(compdata);
            /*console.log(compdata)*/
            add_acccompdata(compdata).then(res=>{
              if (res.code==200){
                this.$message({
                  type:'success',
                  message:res.message,
                  duration:1000
                })
                this.get_compdata(this.seriesid,this.acc_typeid)
              }else{
                this.$message({
                  type:'error',
                  message:res.message,
                  duration:1000
                })
              }
            })
          },

          /*3.修改数据*/
          /*显示修改对话框*/
          show_dilogc(comp){
            this.comp_id=comp.compId;
            this.comp_name=comp.compName;
            this.comp_ordernum=comp.compNumber;
            this.comp_price=comp.compPrice;
            this.dilog_update=true
          },

          /*修改型号价格数据*/
          update_compdata(){
            if (this.comp_price==='' || isNaN(this.comp_price) || parseInt(this.comp_price)<0){
              this.$message({
                type:'error',
                message:'请输入正确价格',
                duration:1000
              })
              return;
            }
            let compdata={
              compId:this.comp_id,
              compName:this.comp_name,
              compNumber:this.comp_ordernum,
              compPrice:this.comp_price,
              AddTime:this.sys_date,
              AddUser:this.user
            }
            compdata = JSON.stringify(compdata)
            update_acccompdata(compdata).then(res=>{
              if (res.code==200){
                this.$message({
                  type:'success',
                  message:res.message,
                  duration:1000
                })
                this.dilog_update=false;
                this.get_compdata(this.seriesid,this.acc_typeid);
              }else{
                this.$message({
                  type:'error',
                  message:res.message,
                  duration:1000
                })
              }
            })
          },

          // 4.删除数据
          del_compdata(compId){
            this.$confirm("确认删除该数据吗？删除的数据不可恢复，请谨慎操作!",'提示',{
              confirmButtonText:'确认',
              cancelButtonText:'取消',
              type:'warning'
            }).then(()=>{
              del_acccompdata(compId).then(res=>{
                if(res.code===200){
                  this.$message({
                    type: 'success',
                    message: '删除成功!',
                    duration:1000
                  });
                  this.get_compdata(this.seriesid)
                }else{
                  this.$message({
                    type: 'error',
                    message: '未知错误!',
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

        },
        components:{
          SearchFacSer,
          dynamicCompspe
        },
        }
</script>

<style lang="less" scoped>
@import "../../assets/less/model/speprice";
</style>
