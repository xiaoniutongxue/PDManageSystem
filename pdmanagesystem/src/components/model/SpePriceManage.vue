<template>
    <div class="price-all">
      <!--价格头部品牌系列选择-->
      <div class="price-top">
        <SearchFacSer/>
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
            <span class="null" v-if="spe_data==''">该系列暂无数据</span>

            <!--本体规格数据-->
            <dynamicCompspe
              :dynamicdata="spe_data"
              :seriesid="seriesid"
              :typeid="''"
              @get_CheckedList="get_SpechList"
              @get_MesData="get_SpeMesData"/>
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
            <!--价格数据表格-->
            <div class="page_table">
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
                  <tr v-for="comp in comp_data" :class="{compColor:comp.optStr===spe_msgdata.optStr}">
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

            <!--当前价格-->
            <div class="cur_price">
              <span>
                当前选项价格:
                <span class="span_price">{{cur_price}}</span>
              </span>
            </div>
            <!--分页操作-->
            <div class="page_oper">
              <PageOper :Page_Msg="Page_Msg" @get_PageData="get_PageData"/>
            </div>
          </div>
        </div>
      </div>

      <!--dilog对话框-->
      <el-dialog class="dialog" title="修改价格" :visible.sync="dilog_update" width="40%">
        <ul>
          <li class="textli">
            <span>型号名称:</span>
            <el-input class="short_input" v-model="comp_name" :disabled="true" size="small"/>
          </li>
          <li class="textli">
            <span>订货号:</span>
            <el-input class="short_input" v-model="comp_ordernum" size="small"/>
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
    import PageOper from "../comm/PageOper";

    // 2.导入方法
    import {get_spedata} from "../../network/model/spemanage";        /*获取本体数据*/
    import {get_specompdata} from "../../network/model/spemanage";      /*获取型号数据*/
    import {add_specompdata} from "../../network/model/spemanage";      /*添加型号数据*/
    import {update_specompdata} from "../../network/model/spemanage";   /*修改型号数据*/
    import {del_specompdata} from "../../network/model/spemanage";      /*删除型号数据*/

    export default {
        name: "SpePriceManage",
        data(){
          return{
            // 1.本体数据
            spe_data:[],          /*本体规格数据*/
            spe_msgdata:[],       /*本体组件传出的数据*/
            spe_chlist:[],        /*本体选中的数据id*/

            // 2.型号数据
            comp_data:[],         /*型号价格当前页数据*/
            comp_id:'',          /*型号id*/
            comp_name:'',        /*型号名称*/
            comp_price:'',       /*型号价格*/
            comp_ordernum:'',    /*订货号*/
            comp_propstr:'',     /*组成型号标题*/
            comp_optstr:'',      /*组成型号选项*/

            // 3.开关
            dilog_update:false,

            // 4.分页数据
            Page_Msg:{
              data:[],
              pagesize:25,
            },

            /*5.当前选项价格*/
            cur_price:'',
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
          this.get_spedata(this.seriesid);
          this.get_compdata(this.seriesid);
          this.comp_price='';
          this.comp_ordernum='';
        },
        watch:{
          /*监听系列id*/
          seriesid(newVal){
            this.get_spedata(newVal);
            this.get_compdata(newVal);
            this.comp_price='';
            this.comp_ordernum='';
          },
          /*监听勾选上的选项*/
          spe_msgdata(newVal){
            this.get_compTit(this.spe_chlist)
            this.get_curprice(newVal.optStr)
          },
          spe_chlist(newVal){
            this.get_compTit(newVal)
          },
          comp_optstr(){
            this.comp_price='';
            this.comp_ordernum='';
          },
        },
        methods:{
          // 1.获取数据
          /*a.获取本体规格数据*/
          get_spedata(seriesid){
            get_spedata(seriesid).then(res=>{
              if(res){
                this.spe_data=res;
              }else{
                console.log('服务器未请求到数据')
              }
            })
          },

          /*c.获取型号价格所有数据*/
          get_compdata(seriesid){
            get_specompdata(seriesid).then(res=>{
              /*this.comp_data=res*/
              this.Page_Msg.data=res
            })
          },

          /*d.得到本体规格传出的数据*/
          get_SpeMesData(MesData){
            this.spe_msgdata=MesData;
          },

          /*e.获取勾选上的本体*/
          get_SpechList(spe_checked){
            this.spe_chlist=spe_checked;
          },

          /*f.获取型号信息*/
          get_compTit(){
            let compTit='',propstr='',optstr=''
            for(let i=0;i<this.spe_chlist.length;i++){
              if(this.spe_msgdata['propCodeList'].length>0){
                /*得到型号名称*/
                let code=''
                if(this.spe_msgdata['propCodeList'][this.spe_chlist[i]]=='无'){
                  code=''
                }else{
                  code=this.spe_msgdata['propCodeList'][this.spe_chlist[i]]
                }
                compTit=compTit+code+this.spe_msgdata['optValList'][this.spe_chlist[i]]
                /*得到组成标题字符串*/
                propstr=propstr+"-"+this.spe_msgdata['propList'][this.spe_chlist[i]]
                /*得到组成选项字符串*/
                optstr=optstr+'-'+this.spe_msgdata['optList'][this.spe_chlist[i]]
              }
            }
            if(this.sername==''){
              this.comp_name=compTit
            }else{
              this.comp_name=this.sername+'-'+compTit;
            }
            this.comp_propstr=this.spe_msgdata.propStr
            this.comp_optstr=this.spe_msgdata.optStr
            if(compTit==''){
              this.comp_name=''
            }
            /*console.log(compTit)
            console.log(this.comp_propstr)
            console.log(this.comp_optstr)*/
          },

          /*i.获取分页后的数据*/
          get_PageData(data){
            this.comp_data=data
          },

          /*j.获取当前价格*/
          get_curprice(optstr){
            let cur_price = ''
            for(let i=0;i<this.Page_Msg.data.length;i++){
              if(this.Page_Msg.data[i].optStr===optstr){
                cur_price=this.Page_Msg.data[i].compPrice;
              }
            }
            if(cur_price !== ''){
              this.cur_price = '￥' + cur_price
            }else{
              this.cur_price = '该组合暂未添加价格'
            }
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
              seriesId:this.seriesid,
              compName:this.comp_name,
              compPrice:this.comp_price,
              compNumber:this.comp_ordernum,
              propStr:this.comp_propstr,
              optStr:this.comp_optstr,
              AddUser:this.user,
              AddTime:this.sys_date,
            }
            compdata= JSON.stringify(compdata);
            add_specompdata(compdata).then(res=>{
              if (res.code==200){
                this.$message({
                  type:'success',
                  message:res.message,
                  duration:1000
                })
                this.get_compdata(this.seriesid)
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
          /*a.显示修改对话框*/
          show_dilogc(comp){
            this.comp_id=comp.compId;
            this.comp_name=comp.compName;
            this.comp_price=comp.compPrice;
            this.comp_ordernum=comp.compNumber;
            this.dilog_update=true
          },

          /*b.修改型号价格数据*/
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
            update_specompdata(compdata).then(res=>{
              if (res.code==200){
                this.$message({
                  type:'success',
                  message:res.message,
                  duration:1000
                })
                this.dilog_update=false;
                this.get_compdata(this.seriesid);
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
              del_specompdata(compId).then(res=>{
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
          dynamicCompspe,
          PageOper
        },
    }
</script>

<style lang="less" scoped>
  @import "../../assets/less/model/speprice";
</style>
