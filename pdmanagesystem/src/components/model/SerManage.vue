<template>
    <div class="ser_all">
      <!--系列头部-->
      <div class="ser_top">
        <!--品牌选择-->
        <div class="top_fac">
          <span>品牌:</span>
          <el-select v-model="fac_value" class="select" size="small" filterable placeholder="请选择品牌">
            <!--品牌分组(按字母分组)-->
            <el-option-group
              v-for="alp in fac_data"
              :key="alp.alpha"
              :label="alp.alpha">
              <el-option
                v-for="item in alp.facdata"
                :key="item.value"
                :label="item.label"
                :title="item.factName"
                @click.native="get_seriesdata(item.factID)"
                :value="item.factName | filterfacname">
              </el-option>
            </el-option-group>
          </el-select>
        </div>

        <!--系列查询-->
        <div class="top_ser">
          <el-input class="input" size="small" v-model="ser_value" @click.native="search_ser" placeholder="请输入系列名称" v-on:input="search_ser"></el-input>
          <span class="clear" @click="clear_ser">清空</span>
          <div class="ser_search" v-show="show_searchres">
            <ul>
              <li v-for="serch in search_data" @click="get_sermsg(serch.SeriesId)">{{serch.SeriesName}}</li>
            </ul>
          </div>
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
                    <td style="width: 10%">系列简称</td>
                    <td style="width: 20%">添加时间</td>
                    <td style="width: 10%">添加用户</td>
                    <td style="width: 10%">操作</td>
                    <td style="width: 5%">是否完善</td>
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
                    <!--数据是否完善-->
                    <td>
                      <el-switch
                        size="small"
                        :value="thipar.IsPerfection | get_successdata"
                        @click.native="update_serisper(thipar)"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                      </el-switch>
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
    import {get_factorydata} from "../../network/model/facmanage";        /*获取品牌数据*/
    import {get_seriesdata} from "../../network/model/sermanage";         /*获取系列数据*/
    import {add_seriesdata} from "../../network/model/sermanage";         /*添加系列数据*/
    import {update_seriesdata} from "../../network/model/sermanage";      /*修改系列数据*/
    import {update_serperfect} from "../../network/model/sermanage";      /*修改系列是否完善数据*/
    import {delete_seriesdata} from "../../network/model/sermanage";      /*删除系列数据*/

     export default {
        name: "SerManage",
        data(){
          return{
            // 1.品牌数据
            fac_value:"",
            fac_id:"",
            fac_data:[],

            // 2.系列数据
            ser_data:"",
            ser_value:"",
            ser_id:'',
            ser_msgdata:[],
            ser_seltedid:0,
            ser_parentid:0,

            // 3.dilog开关
            addtype_dilog:false,
            addser_dilog:false,
            updatetype_dilog:false,
            updateser_dilog:false,
            ser_shortinput:false,

            // 4.输入框绑定值
            type_val:'',
            ser_val:'',
            ser_shortval:'',

            // 5.系列查询数据
            search_data:[],
            show_searchres:false,

            //6. 分类
            alphabet:["常用","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
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
          },
          // 系列选中品牌和id
          Ser_data(){
            return this.$store.state.Ser_data;
          },
        },
        watch:{
          /*监听品牌id*/
          fac_id(){
            this.ser_seltedid=0;
          },
          /*监听系列id*/
          ser_data(newVal){
            this.get_sermsg(this.ser_seltedid)
          },
          /*监听选中系列id*/
          ser_seltedid(newVal){
            let serdata={
              fac_id:this.fac_id,
              fac_name:this.fac_value,
              selectedid:newVal
            }
            this.$store.commit('get_SerData',serdata)
          },
        },
        methods:{
          // 1.获取数据
          /*a.获取品牌数据*/
          get_factorydata() {
            get_factorydata().then(res=>{
              if(res.length>0){
                for(let i=0;i<this.alphabet.length;i++){
                  let facitem=[]
                  for(let j=0;j<res.length;j++){
                    /*查找常用或者按字母分类*/
                    if(i===0){
                      if(res[j].IsComm==='Y'){
                        facitem.push(res[j])
                      }
                    }else{
                      if(this.alphabet[i]===res[j].KeyName.substring(0,1)){
                        facitem.push(res[j])
                      }
                    }
                  }
                  this.fac_data.push({
                    alpha:this.alphabet[i],
                    facdata:facitem
                  })
                }
              }
              /*设置默认*/
              if(this.Ser_data.fac_id===''){
                this.fac_value=res[0].factName
                this.get_seriesdata(res[0].factID)
              }else{
                this.fac_value=this.Ser_data.fac_name;
                this.get_seriesdata(this.Ser_data.fac_id)
              }
            })
          },

          /*b.获取系列数据*/
          get_seriesdata(factid){
              this.ser_msgdata=[];
              this.fac_id=factid;
              get_seriesdata(factid).then(res=>{
                this.ser_data=res;
                /*默认选中*/
                if(res.length>0 && this.Ser_data.selectedid===''){
                  this.ser_seltedid=res[0].SeriesId
                }else{
                  this.ser_seltedid=this.Ser_data.selectedid;
                }
              })
          },

          /*c.得到左边选择的系列数据*/
          get_sermsg(seriesid){
            this.ser_msgdata=[];
            this.show_searchres=false;
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
          /*修改系列*/
          update_type(grand){
            let seriesdata={}
            if(grand=='type'){
              seriesdata.SeriesName=this.type_val;
            }else{
              seriesdata.SeriesName=this.ser_val;
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

          /*修改系列数据是否完善*/
          update_serisper(serdata){
            let perfection=''
            if(serdata.IsPerfection==='Y'){
              perfection='N'
            }else{
              perfection='Y'
            }
            let seriesdata={
              SeriesId:serdata.SeriesId,
              IsPerfection:perfection
            }
            seriesdata=JSON.stringify(seriesdata)
            update_serperfect(seriesdata).then(res=>{
              if(res.code===200){
                this.get_seriesdata(this.fac_id)
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
          /*系列搜索*/
          search_ser(){
            /*控制显示查询返回框*/
            this.show_searchres = this.ser_value !== '';
            /*查找数据*/
            let seardata=[]
            for(let i=0;i<this.ser_data.length;i++){
              if(this.ser_data[i].SeriesName.toLowerCase().indexOf(this.ser_value.toLowerCase())!=-1){
                seardata.push(this.ser_data[i])
              }
              for(let j=0;j<this.ser_data[i].child.length;j++){
                if(this.ser_data[i].child[j].SeriesName.toLowerCase().indexOf(this.ser_value.toLowerCase())!=-1){
                  seardata.push(this.ser_data[i].child[j])
                }
                for(let z=0;z<this.ser_data[i].child[j].child.length;z++){
                  if(this.ser_data[i].child[j].child[z].SeriesName.toLowerCase().indexOf(this.ser_value.toLowerCase())!=-1){
                    seardata.push(this.ser_data[i].child[j].child[z])
                  }
                }
              }
            }
            this.search_data=seardata
          },

          /*清空系列搜索框*/
          clear_ser(){
            this.ser_value='';
            this.show_searchres=false;
          },
        },
        filters:{
          /*过滤系列名称*/
         filterfacname(value){
           if(value.length>=15){
             let result = value.substring(0,15)
             return result+'...'
           }else{
             return value
           }
         },
         /*过滤数据是否添加完善*/
          get_successdata(value){
            return value==='Y'
          },
       }
    }
</script>

<style lang="less" scoped>
  @import "../../assets/less/model/series";
</style>
