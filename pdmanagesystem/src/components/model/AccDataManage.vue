<template>
    <div class="accdata_all">
        <!--附件数据管理头部-->
        <div class="accdata_top">
          <!--头部查询-->
          <div class="top_search">
            <SearchFacSer/>
          </div>

          <!--头部添加-->
          <div class="top_add">
            <span @click="show_addtdilog(-1)">新增类型</span>
          </div>
        </div>
        <!--{{Acc_SelectedData}}-->

        <!--附件数据管理内容-->
        <div class="accdata_cont">
          <!--左边类型层级-->
          <div class="cont-left">
            <h3>附件类别</h3>
            <span class="null" v-show="Acc_typeData==''">该厂商暂未添加系列</span>
            <ul class="first">
              <li v-for="(fir,i) in Acc_typeData">
                <h5
                  :class="{changeColor:Acc_SelectedData.typefirid==fir.typeId}"
                  @click="get_AccPropData(fir,'',fir.typeId)">
                  <i class="el-icon-caret-right"></i>
                  {{fir.typeName}}
                </h5>
                <ul class="second">
                  <li
                      v-for="(sec,j) in fir.child"
                      :class="{changeColor:Acc_SelectedData.typeid==sec.typeId}"
                      @click="get_AccPropData(fir,sec.typeId,fir.typeId)">
                      {{sec.typeName}}
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          <!--右边选项数据-->
          <div class="cont-right">
            <span class="null" v-if="Acc_PropData==''">该系列暂未添加数据</span>
            <!--头部类型信息-->
            <div class="right-top" v-if="Acc_PropData!=''">
              <!--左边类型名称-->
              <div class="right_type">
                <h3>{{Acc_PropData.typeName}}</h3>
              </div>
              <div class="oper">
                <span @click="show_addtdilog(Acc_PropData.typeId)">新增分类</span>
                <span @click="show_updatetdilog(Acc_PropData)">修改</span>
                <span @click="del_acctype(Acc_PropData.typeId)">删除</span>
              </div>
            </div>

            <span class="null" v-if="Acc_PropData.child==''">该类型暂未添加子项</span>
            <div class="right_cont" v-for="type in Acc_PropData.child">
              <!--附件分类-->
              <div class="right-types">
                <!--分类名称-->
                <div class="types-name">
                  <span class="tit">{{type.typeName}}</span>
                </div>
                <!--分类操作-->
                <div class="types-oper">
                  <div class="oper-sel">
                    <span>关联本体项:</span>
                    <!--Spe_propandopt(type.speRelpId)-->
                    <!--<span class="val">{{type.speRelpId}}{{type.speRelId}}</span>-->
                    <span class="val">{{Spe_propandopt(type.speRelId)}}</span>
                  </div>
                  <div class="oper-sels">
                    <span class="sel">是否可选:</span>
                    <span class="val" v-if="type.isDisabled==='Y'">是</span>
                    <span class="val" v-if="type.isDisabled==='N'">否</span>
                  </div>
                  <div class="oper-oper">
                    <span @click="show_addpdilog(type.typeId)">新增标题</span>
                    <span @click="show_updatetdilog(type)">修改</span>
                    <span @click="del_acctype(type.typeId)">删除</span>
                  </div>
                </div>
              </div>

              <span class="null" v-if="type.child==''">该类型暂未添加子项</span>
              <div class="data_item" v-for="prop in type.child">
                <div class="data_prop">
                  <div class="prop_name">
                    <h3>{{prop.propName}}</h3>
                  </div>
                  <div class="oper">
                    <div class="oper-sel">
                      <span>关联本体项:</span>
                      <span class="val">{{Spe_prop(prop.speRelId)}}</span>
                    </div>

                    <div class="oper-oper">
                      <span @click="show_addodilog(prop)">新增选项</span>
                      <span @click="show_updatepdilog(prop)">修改</span>
                      <span @click="del_accprop(prop.propId)">删除</span>
                    </div>
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
                    <tr v-if="prop.child==''">
                      <td colspan="7">该标题暂未添加子项</td>
                    </tr>
                    <tr v-for="opt in prop.child">
                      <td>{{opt.optId}}</td>
                      <td>{{opt.optName}}</td>
                      <td>{{opt.optValue}}</td>
                      <td>{{opt.optCode}}</td>
                      <td>{{opt.AddUser}}</td>
                      <td>{{opt.AddTime}}</td>
                      <td class="oper">
                        <span @click="show_updateodilog(prop,opt)">修改</span>
                        <span @click="del_accopt(opt.optId)">删除</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <!--dilog对话框-->
        <!--添加-->
        <el-dialog class="dialog" title="添加类型" :visible.sync="dilog_addt" width="30%">
          <ul>
            <li class="textli">
              <span>类型名称:</span>
              <el-input class="input" v-model="type_name" size="small" placeholder="请输入类型名称"/>
            </li>
            <li class="radioli" v-if="type_disable!=''">
              <span>是否可选:</span>
              <el-radio class="radio" v-model="type_disable" label="Y">是</el-radio>
              <el-radio class="radio" v-model="type_disable" label="N">否</el-radio>
            </li>
            <li v-if="type_showsperel">
              <span>关联本体项:</span>
              <el-cascader
                size="small"
                v-model="type_sperelid"
                :options="Spe_Granddata"
                :props="{ expandTrigger: 'hover' }"/>
            </li>
          </ul>

          <span slot="footer" class="dialog-footer">
          <el-button @click="dilog_addt = false">取 消</el-button>
          <el-button type="primary" @click="add_typedata">确 定</el-button>
        </span>
        </el-dialog>
        <el-dialog class="dialog" title="添加类型标题" :visible.sync="dilog_addp" width="30%">
          <ul>
            <li class="textli">
              <span>标题名称:</span>
              <el-input class="input" v-model="prop_name" size="small" placeholder="请输入类型名称"/>
            </li>
            <li>
              <span>关联本体项:</span>
              <el-select class="select" v-model="prop_sperelid" size="small" placeholder="请选择">
                <el-option
                  label="无"
                  value='-1'>
                </el-option>
                <el-option
                  v-for="item in Spe_Data"
                  :key="item.propId"
                  :label="item.propName"
                  :value="item.propId">
                </el-option>
              </el-select>
            </li>
          </ul>

          <span slot="footer" class="dialog-footer">
            <el-button @click="dilog_addp = false">取 消</el-button>
            <el-button type="primary" @click="add_propdata">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog class="dialog" title="添加类型标题选项" :visible.sync="dilog_addo" width="30%">
          <ul>
            <li class="textli">
              <span>所属标题:</span>
              <el-input class="input" v-model="prop_name" disabled size="small"/>
            </li>
            <li class="textli">
              <span>选项名称:</span>
              <el-input class="input" v-model="opt_name" size="small" placeholder="请输入选项名称"/>
            </li>
            <li class="textli">
              <span>选项值:</span>
              <el-input class="input" v-model="opt_value" size="small" placeholder="请输入选型值"/>
            </li>
          </ul>

          <span slot="footer" class="dialog-footer">
            <el-button @click="dilog_addo = false">取 消</el-button>
            <el-button type="primary" @click="add_optdata">确 定</el-button>
          </span>
        </el-dialog>

        <!--修改-->
        <el-dialog class="dialog" title="修改类型" :visible.sync="dilog_updatet" width="30%">
          <ul>
            <li class="textli">
              <span>类型名称:</span>
              <el-input class="input" v-model="type_name" size="small" placeholder="请输入类型名称"/>
            </li>
            <li class="radioli" v-if="type_disable">
              <span>是否可选:</span>
              <el-radio class="radio" v-model="type_disable" label="Y">是</el-radio>
              <el-radio class="radio" v-model="type_disable" label="N">否</el-radio>
            </li>
            <li v-if="type_showsperel">
              <span>关联本体项:</span>
              <el-cascader
                size="small"
                v-model="type_sperelid"
                :options="Spe_Granddata"
                :props="{ expandTrigger: 'hover' }"/>
            </li>
          </ul>

          <span slot="footer" class="dialog-footer">
            <el-button @click="dilog_updatet = false">取 消</el-button>
            <el-button type="primary" @click="update_typedata">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog class="dialog" title="修改类型标题" :visible.sync="dilog_updatep" width="30%">
          <ul>
            <li class="textli">
              <span>标题名称:</span>
              <el-input class="input" v-model="prop_name" size="small" placeholder="请输入类型名称"/>
            </li>
            <li class="textli">
              <span>连接符:</span>
              <el-select class="select" v-model="prop_code" size="small" placeholder="请选择连接符">
                <el-option label="无" value="无"/>
                <el-option label=" " value=" "/>
                <el-option label="-" value="-"/>
                <el-option label="/" value="/"/>
              </el-select>
            </li>
            <li>
              <span>关联本体项:</span>
              <el-select class="select" v-model="prop_sperelid" size="small" placeholder="请选择">
                <el-option
                  label="无"
                  value='-1'>
                </el-option>
                <el-option
                  v-for="item in Spe_Data"
                  :key="item.propId"
                  :label="item.propName"
                  :value="item.propId">
                </el-option>
              </el-select>
            </li>
          </ul>

          <span slot="footer" class="dialog-footer">
            <el-button @click="dilog_updatep = false">取 消</el-button>
            <el-button type="primary" @click="update_propdata">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog class="dialog" title="修改类型标题选项" :visible.sync="dilog_updateo" width="30%">
          <ul>
            <li class="textli">
              <span>所属标题:</span>
              <el-input class="input" v-model="prop_name" disabled size="small"/>
            </li>
            <li class="textli">
              <span>选项名称:</span>
              <el-input class="input" v-model="opt_name" size="small" placeholder="请输入选项名称"/>
            </li>
            <li class="textli">
              <span>选项值:</span>
              <el-input class="input" v-model="opt_value" size="small" placeholder="请输入选型值"/>
            </li>
          </ul>

          <span slot="footer" class="dialog-footer">
            <el-button @click="dilog_updateo = false">取 消</el-button>
            <el-button type="primary" @click="update_optdata">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
    // 1.导入组件
    import SearchFacSer from "../comm/SearchFacSer";

    // 2.导入方法
    import {get_acctypedata} from "../../network/model/accmanage";          /*获取附件数据*/
    import {add_acctypedata} from "../../network/model/accmanage";          /*增加附件类型*/
    import {add_accpropdata} from "../../network/model/accmanage";          /*增加附件标题*/
    import {add_accoptdata} from "../../network/model/accmanage";           /*增加附件选项*/
    import {update_acctypedata} from "../../network/model/accmanage";       /*修改附件类型*/
    import {update_accpropdata} from "../../network/model/accmanage";       /*修改附件标题*/
    import {update_accoptdata} from "../../network/model/accmanage";        /*修改附件选项*/
    import {del_acctypedata} from "../../network/model/accmanage";          /*删除附件类型*/
    import {del_accpropdata} from "../../network/model/accmanage";          /*删除附件标题*/
    import {del_accoptdata} from "../../network/model/accmanage";           /*删除附件选项*/
    import {get_spedata} from "../../network/model/spemanage";

    export default {
        name: "AccDataManage",
        data(){
          return{
            // 1.id
            parentid:0,                 /*父id*/

            // 2.附件数据
            Acc_typeData:[],          /*附件类型数据*/
            Acc_PropData:[],          /*附件选项详情数据*/

            // 3.dilog开关
            dilog_addt:false,         /*添加类型*/
            dilog_addp:false,         /*添加标题*/
            dilog_addo:false,         /*添加选项*/
            dilog_updatet:false,      /*修改类型*/
            dilog_updatep:false,      /*修改标题*/
            dilog_updateo:false,      /*修改选项*/

            // 4.dilog输入框绑定值
            /*本体数据*/
            Spe_Data:[],              /*本体数据*/
            Spe_Granddata:[],         /*本体级联数据*/

            /*5.类型*/
            Acc_SelectedData:{       /*附件类型选中数据*/
              seldata:[],
              typeid:0,
              typefirid:0
            },
            type_id:'',              /*类型id*/
            type_name:'',            /*类型名称*/
            type_sperelid:'',        /*类型关联本体id*/
            type_disable:'',         /*是否可选*/
            type_showsperel:false,   /*是否显示关联本体*/

            /*6.标题*/
            prop_id:'',              /*选中的标题id*/
            prop_typeid:'',          /*标题类型id*/
            prop_code:'',            /*连接符*/
            prop_sperelid:-1,        /*关联本体id*/
            prop_name:'',            /*标题名称*/

            /*7.选项*/
            opt_id:'',               /*选项id*/
            opt_name:'',             /*选项名称*/
            opt_value:'',            /*选项值*/
          }
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
          /*c.品牌id*/
          factid(){
            return this.$store.state.facserdata.fac_id;
          },
          /*d.系列id*/
          seriesid(){
            return this.$store.state.facserdata.ser_id;
          },

          // 2.页面数据
          /*a.本体标题值*/
          Spe_prop(){
            return (id)=>{
              if(id==-1){
                return '无'
              }
              for(let i=0;i<this.Spe_Data.length;i++){
                if(this.Spe_Data[i].propId==id){
                  return this.Spe_Data[i].propName;
                }
              }
            }
          },

          /*b.本体和选项值*/
          Spe_propandopt(){
            return(optid)=>{
              if(optid==-1){
                return '无'
              }
              for(let i=0;i<this.Spe_Data.length;i++){
                for(let j=0;j<this.Spe_Data[i].child.length;j++){
                  if(this.Spe_Data[i].child[j].optId==optid){
                    return this.Spe_Data[i].propName+'>'+this.Spe_Data[i].child[j].optName;
                  }
                }
              }
            }
          }
        },
        components:{
          SearchFacSer
        },
        created(){
          /*a.获取本体数据*/
          this.get_spedata(this.seriesid);
          /*b.获取类型数据*/
          this.get_acctypedata(this.seriesid);
          this.Acc_PropData=[]
        },
        watch:{
          /*1.监听系列*/
          seriesid(newVal){
            /*a.获取本体数据*/
            this.get_spedata(newVal);
            /*b.获取类型数据*/
            this.get_acctypedata(newVal);
            this.Acc_PropData=[]
          },

          /*2.监听附件数据发生改变*/
          Acc_typeData(newVal){
            if(this.Acc_SelectedData.typeid==0){
              if(newVal.length>0){
                this.get_AccPropData(newVal[0],'',newVal[0].typeId)
              }
            }else{
              for(let i=0;i<newVal.length;i++){
                if(newVal[i].typeId==this.Acc_SelectedData.typefirid){
                  this.get_AccPropData(newVal[i],this.Acc_SelectedData.typeid,this.Acc_SelectedData.typefirid)
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
              this.Spe_Data=res;
              let Spe_Granddata=[]
              Spe_Granddata.push({
                value:'-1',
                label:'无',
                children:[{
                  value:'-1',
                  label:'无',
                }]
              })
              for(let i=0;i<res.length;i++){
                Spe_Granddata.push({
                  value:res[i].propId,
                  label:res[i].propName,
                  children:[]
                })
                for(let j=0;j<res[i].child.length;j++){
                  Spe_Granddata[i+1].children.push({
                    value:res[i].child[j].optId,
                    label:res[i].child[j].optName
                  })
                }
              }
              this.Spe_Granddata=Spe_Granddata
            })
          },

          /*b.获取类型数据*/
          get_acctypedata(seriesId){
            get_acctypedata(seriesId).then(res=>{
              this.Acc_typeData=res;
            })
          },

          /*c.获取附件右边选项数据*/
          get_AccPropData(data,typeid,typefirid){
            /*得到选中的数据*/
            this.Acc_SelectedData={
              seldata:data,
              typeid:typeid,
              typefirid:typefirid
            }
            let propdata;
            if(typeid!=''){
              propdata={
                typeName:data.typeName,
                typeId:data.typeId,
                speRelpId:data.speRelpId,
                speRelId:data.speRelId,
                showId:data.showId,
                seriesId:data.seriesId,
                parentId:data.parentId,
                isDisabled:data.isDisabled,
                AddUser:data.AddUser,
                AddTime:data.AddTime,
                child:[]
              }
              for(let i=0;i<data.child.length;i++){
                if(data.child[i].typeId==typeid){
                  propdata.child.push(data.child[i])
                }
              }
            }else{
              propdata=data
            }
            this.Acc_PropData=propdata;
          },

          // 2.dilog控制开关
          /*a.显示添加类型dilog*/
          show_addtdilog(parentId){
            if(parentId==-1){
              this.type_disable=''
              this.type_showsperel=false
              this.type_sperelid=[-1,-1]
            }else{
              this.type_disable='Y'
              this.type_showsperel=true
              this.type_sperelid=[-1,-1]
            }
            this.type_name='';
            this.parentid=parentId;
            this.dilog_addt=true;
          },

          /*b.显示添加标题dilog*/
          show_addpdilog(parentId){
            this.parentid=parentId;
            this.prop_name='';
            this.prop_sperelid='-1';
            this.dilog_addp=true;
          },

          /*c.显示添加选项dilog*/
          show_addodilog(prop){
            this.prop_name=prop.propName
            this.parentid=prop.propId;
            this.opt_name="";
            this.opt_value="";
            this.dilog_addo=true;
          },

          /*d.显示修改类型dilog*/
          show_updatetdilog(typedata){
            this.type_id=typedata.typeId;
            this.type_name=typedata.typeName;
            this.parentid=typedata.parentId;
            this.type_disable=typedata.isDisabled;
            this.type_sperelid=[typedata.speRelpId,typedata.speRelId]
            this.type_showsperel=true;
            this.dilog_updatet=true;
          },

          /*e.显示修改标题dilog*/
          show_updatepdilog(prop){
            this.prop_id=prop.propId;
            this.prop_name=prop.propName;
            this.dilog_updatep=true;
            this.prop_code=prop.propCode;
            if(prop.speRelId==-1){
              this.prop_sperelid='-1'
            }else{
              this.prop_sperelid=prop.speRelId;
            }
          },

          /*f.显示添加类型dilog*/
          show_updateodilog(prop,opt){
            this.prop_name=prop.propName
            this.prop_id=prop.propId;
            this.opt_id=opt.optId;
            this.opt_name=opt.optName;
            this.opt_value=opt.optValue;
            this.prop_typeid=prop.typeId;
            this.dilog_updateo=true;
          },

          // 3.添加数据
          /*a.添加附件类型*/
          add_typedata(){
            /*判断输入的值是否为空*/
            if(this.type_name==''){
              this.$message({
                type:'error',
                message:'请输入类型名称'
              })
              return
            }
            let typedata={
              typeName:this.type_name,
              seriesId:this.seriesid,
              parentId:this.parentid,
              isDisabled:this.type_disable,
              speRelId:this.type_sperelid[1],
              speRelpId:this.type_sperelid[0],
              AddUser:this.user,
              AddTime:this.sys_date,
            }
            typedata=JSON.stringify(typedata)
            add_acctypedata(typedata).then(res=>{
              if(res.code==200){
                this.$message({
                  type:'success',
                  message:res.message,
                  duration:1000
                })
                this.get_acctypedata(this.seriesid);
                this.dilog_addt=false;
              }else{
                this.$message({
                  type:'error',
                  message:res.message,
                  duration:1000
                })
              }
            })
          },

          /*b.添加附件标题*/
          add_propdata(){
            if(this.prop_name.trim()==""){
              this.$message({
                type:'error',
                message:'请填写标题值',
                duration:1000
              })
              return
            }
            let propdata={}
            propdata={
              seriesid:this.seriesid,
              typeId:this.parentid,
              speRelId:this.prop_sperelid,
              propCode:'无',
              propname:this.prop_name
            }
            propdata=JSON.stringify(propdata);
            /*console.log(propdata)*/
            add_accpropdata(propdata).then(res=>{
              if(res.code==200){
                this.$message({
                  type:'success',
                  message:res.message,
                  duration:1000
                })
                this.get_acctypedata(this.seriesid);
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

          /*c.添加附件选项*/
          add_optdata(){
            /*判断选项值是否为空*/
            if(this.opt_name.trim()==""){
              this.$message({
                type:'error',
                message:'请填写选项值',
                duration:1000
              })
              return;
            }

            let optdata={}
            optdata={
              optName:this.opt_name.trim(),
              optValue:this.opt_value.trim(),
              optCode:'-',
              propId:this.parentid,
              seriesId:this.seriesid,
              AddUser:this.user,
              AddTime:this.sys_date,
            }
            let optdatalist=[]
            optdatalist.push(optdata)
            /*console.log(optdata)*/
            optdatalist=JSON.stringify(optdatalist)
            add_accoptdata(optdatalist).then(res=>{
              if(res.code==200){
                this.$message({
                  type:'success',
                  message:res.message,
                  duration:1000
                })
                this.get_acctypedata(this.seriesid);
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
          /*a.修改附件类型*/
          update_typedata(){
            /*判断输入的值是否为空*/
            if(this.type_name==''){
              this.$message({
                type:'error',
                message:'请输入类型名称'
              })
              return
            }
            let typedata={
              typeName:this.type_name,
              typeId:this.type_id,
              seriesId:this.seriesid,
              parentId:this.parentid,
              isDisabled:this.type_disable,
              speRelId:this.type_sperelid[1],
              speRelpId:this.type_sperelid[0],
              AddUser:this.user,
              AddTime:this.sys_date,
            }
            typedata=JSON.stringify(typedata)
            update_acctypedata(typedata).then(res=>{
              if(res.code==200){
                this.$message({
                  type:'success',
                  message:res.message,
                  duration:1000
                })
                this.get_acctypedata(this.seriesid);
                this.dilog_updatet=false;
              }else{
                this.$message({
                  type:'error',
                  message:res.message,
                  duration:1000
                })
              }
            })
          },

          /*b.修改附件标题*/
          update_propdata(){
            if(this.prop_name.trim()==""){
              this.$message({
                type:'error',
                message:'请填写标题值',
                duration:1000
              })
              return
            }
            let propdata={}
            propdata.typeId=this.prop_typeid;
            propdata.seriesid=this.seriesid;
            propdata.propId=this.prop_id;
            propdata.propCode=this.prop_code;
            propdata.speRelId=this.prop_sperelid;
            propdata.propName=this.prop_name;
            propdata=JSON.stringify(propdata)
            /*console.log(propdata)*/
            update_accpropdata(propdata).then(res=>{
              if(res.code==200){
                this.$message({
                  type:'success',
                  message:res.message,
                  duration:1000
                })
                this.get_acctypedata(this.seriesid);
                this.dilog_updatep=false;
              }else{
                this.$message({
                  type:'error',
                  message:res.message,
                  duration:1000
                })
              }
            })
          },

          /*c.修改附件选项*/
          update_optdata(){
            /*判断选项值是否为空*/
            if(this.opt_name.trim()==""){
              this.$message({
                type:'error',
                message:'请填写选项值',
                duration:1000
              })
              return;
            }
            let optdata={}
            optdata.seriesId=this.seriesid;
            optdata.propId=this.prop_id;
            optdata.optName=this.opt_name;
            optdata.optId=this.opt_id;
            optdata.optValue=this.opt_value;
            optdata=JSON.stringify(optdata);
            update_accoptdata(optdata).then(res=>{
              if(res.code==200){
                this.$message({
                  type:'success',
                  message:res.message,
                  duration:1000
                })
                this.get_acctypedata(this.seriesid);
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

          /*5.删除数据*/
          /*删除类型*/
          del_acctype(typeid){
            this.$confirm("确认删除该项及其所有子项吗？",'提示',{
              confirmButtonText:'确认',
              cancelButtonText:'取消',
              type:'warning'
            }).then(()=>{
              del_acctypedata(typeid).then(res=>{
                if(res.code==200){
                  this.get_acctypedata(this.seriesid);
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

          /*删除标题*/
          del_accprop(propid){
            this.$confirm("确认删除该项及其所有子项吗？",'提示',{
              confirmButtonText:'确认',
              cancelButtonText:'取消',
              type:'warning'
            }).then(()=>{
              del_accpropdata(propid).then(res=>{
                if(res.code==200){
                  this.get_acctypedata(this.seriesid);
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

          /*删除选项*/
          del_accopt(optid){
            this.$confirm("确认删除该数据吗？",'提示',{
              confirmButtonText:'确认',
              cancelButtonText:'取消',
              type:'warning'
            }).then(()=>{
              del_accoptdata(optid).then(res=>{
                if(res.code==200){
                  this.get_acctypedata(this.seriesid);
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
        }
    }
</script>

<style lang="less" scoped>
  @import "../../assets/less/comm/variable";
  @import "../../assets/less/comm/comm";
  .accdata_all{
    width: 100%;
    height: 100%;
    /*border: 1px solid black;*/
    /*附件头部*/
    .accdata_top{
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
    /*附件内容*/
    .accdata_cont{
      width: 100%;
      height: 93.5%;
      margin-top: 0.5%;
      overflow-y: auto;
      display: flex;
      justify-content: space-between;
      border: 1px solid @tbl-bor;
      /*左边层级*/
      .cont-left{
        width: 15%;
        height: 99.5%;
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
        .second{
          li:hover{
            color: @theme;
          }
        }
      }
      /*右边数据*/
      .cont-right{
        width: 84%;
        height: 99.5%;
        border: 1px solid @tbl-bor;
        /*类型一层数据*/
        .right-top{
          width: 100%;
          height: 40px;
          display: flex;
          margin: 0 auto;
          border-bottom: 1px solid @tbl-bor;
          /*类型名称*/
          .right_type{
            width: 50%;
            padding-left: 2%;
            line-height: 40px;
            /*border: 1px solid black;*/
            span{
              font-size: 14px;
              font-weight: bold;
              margin-right: 5px;
              cursor: pointer;
              -webkit-user-select: none;
            }
            span:hover{
              color: @theme;
            }
          }
          /*操作*/
          .oper{
            width: 50%;
            font-size: 12px;
            cursor: pointer;
            text-align: right;
            /*border: 1px solid @tbl-bor;*/
            span{
              margin-right: 14px;
              line-height: 40px;
            }
            span:hover{
              color: @theme;
              text-decoration: underline;
            }
          }
        }
        /*类型二层分类*/
        .right_cont{
          width: 100%;
          height: auto;
          /*border: 1px solid black;*/
          .right-types{
            width: 99%;
            height: 35px;
            display: flex;
            background: #dadada;
            margin: 10px auto;
            border: 1px solid @tbl-bor;
            /*名称*/
            .types-name{
              width: 40%;
              /*border: 1px solid black;*/
              span{
                font-size: 18px;
                line-height: 35px;
                font-weight: bold;
                margin-left: 20px;
              }
            }
            /*操作*/
            .types-oper{
              width: 60%;
              display: flex;
              /*border: 1px solid red;*/
              /*是否可选*/
              .oper-sel{
                width: 50%;
                /*border: 1px solid black;*/
                span{
                  margin-left: 20px;
                  font-size: 12px;
                  font-weight: bold;
                  line-height: 35px;
                }
                .sel{
                  margin-left: 31px;
                }
                .val{
                  font-weight: normal;
                }
              }
              .oper-sels{
                width: 20%;
                /*border: 1px solid black;*/
                span{
                  margin-left: 20px;
                  font-size: 12px;
                  font-weight: bold;
                  line-height: 35px;
                }
                .sel{
                  margin-left: 31px;
                }
                .val{
                  font-weight: normal;
                }
              }
              /*数据操作*/
              .oper-oper{
                width: 30%;
                text-align: right;
                /*border: 1px solid black;*/
                span{
                  cursor: pointer;
                  margin-right: 10px;
                  font-size: 12px;
                  line-height: 35px;
                }
                span:hover{
                  color: @theme;
                  text-decoration: underline;
                }
              }
            }

          }
          /*选项数据*/
          .data_item{
            width: 99%;
            height: auto;
            margin: 10px auto;
            border: 1px solid @tbl-bor;
            .data_prop{
              width: 100%;
              height: 30px;
              display: flex;
              background: #dadada;
              /*border: 1px solid @tbl-bor;*/
              .prop_name{
                width: 40%;
                /*border: 1px solid black;*/
                h3{
                  line-height: 30px;
                  font-size: 16px;
                  padding-left: 20px;
                  /*border: 1px solid black;*/
                }
              }
              .oper{
                width: 60%;
                height: 100%;
                display: flex;
                /*border: 1px solid black;*/
                .oper-sel{
                  width: 70%;
                  /*border: 1px solid red;*/
                  span{
                    font-size: 12px;
                    font-weight: bold;
                    line-height: 30px;
                    margin-left: 20px;
                  }
                  .val{
                    font-weight: normal;
                  }
                }
                .oper-oper{
                  width: 30%;
                  text-align: right;
                  /*border: 1px solid black;*/
                  span{
                    cursor: pointer;
                    line-height: 30px;
                    margin-right: 10px;
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
      }
    }

    .selected{
      color: @theme;
    }
  }
</style>
