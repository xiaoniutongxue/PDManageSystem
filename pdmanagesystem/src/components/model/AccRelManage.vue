<template>
  <div class="rel_all">
    <!--1.关系头部-->
    <div class="rel_top">
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

    <!--2.关系内容-->
    <div class="rel_cont">
      <!--a.选择需要添加关系的项-->
      <div class="rel_select">
        <div class="select-top">
          <h3>附件数据选择</h3>
        </div>

        <div class="select_content">
          <!--当系列无数据时显示-->
          <span class="null" v-if="acc_data==''">该系列暂无数据</span>

          <!--本体规格数据-->
          <div class="spe-item" v-for="(prop,i) in acc_data">
            <!--选型标题-->
            <div class="spe-tit">
                  <span class="propval">
                      <input :id="prop.propId"
                             class="spe_check"
                             type="checkbox"
                             @click="get_checkedacc(i,prop.propId)"/>
                      {{prop.propName}}
                  </span>
            </div>

            <!--选型选项-->
            <div class="spe-opt">
              <ul>
                <li v-for="(opt,j) in prop.child">
                  {{opt.optName}}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!--b.添加关系-->
      <div class="rel_add">
        <!--头部信息-->
        <div class="select-top">
          <h3>附件关系添加</h3>
        </div>

        <!--内容信息-->
        <div class="select_content">
          <!--当未勾选值时显示-->
          <span class="null" v-if="acc_ckdlist==''">请先选择需要添加关系的选项</span>

          <!--本体规格数据-->
          <div class="spe-item" v-for="(prop,i) in acc_ckdlist">
            <!--选型标题-->
            <div class="spe-tit">
                <span class="propval">
                    {{prop.propName}}
                    {{prop.propId}}
                </span>
              <span class="propradio">
                    <input class="spe_M" :name="prop.propId" @change="judje_onecheckedf(i)" type="radio"/>
                    M
                    <input class="spe_F" :name="prop.propId" @change="judje_onecheckedf(i)" type="radio"/>
                    F
                </span>
            </div>

            <!--选型选项-->
            <div class="spe-opt">
              <ul ref="Domopt">
                <li v-for="(opt,j) in prop.child"
                    :id="opt.optId"
                    :class="{'selectopt':acc_classData[i].includes(j)}"
                    @click="judje_morf(i,j)">
                  {{opt.optName}}
                  {{opt.optId}}
                </li>
              </ul>
            </div>
          </div>

          <div class="spe-commit" v-show="acc_ckdlist!=''">
            <h3 @click="add_batchrel" class="batch">批量生成关系</h3>
            <h3 @click="add_rel">添加关系</h3>
          </div>
        </div>
      </div>

      <!--c.显示关系-->
      <div class="rel_showrel">
        <!--头部操作-->
        <div class="showrel-top">
          <div class="top-left">
            <h3>关系展示</h3>
            <span class="left-span">被影响项:</span>
            <el-select class="left-input" size="small" v-model="rel_fprop" placeholder="请选择">
              <el-option
                :key="-1"
                :label="'全部'"
                :value="-1">
              </el-option>
              <el-option
                v-for="item in acc_data"
                :key="item.propId"
                :label="item.propName"
                :value="item.propId">
              </el-option>
            </el-select>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <td>影响关系</td>
              <td>影响项</td>
              <td>影响项选项</td>
              <td>被影响项</td>
              <td>被影响显示项</td>
              <td style="width: 50px;">操作</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="relitem in acc_rellidata" v-if="rel_fprop==relitem.fpropID || rel_fprop==-1">
              <td>{{relitem.multiIds}}</td>
              <td class="tit">{{relitem.mpropID}}</td>
              <td>{{relitem.mOptIDs}}</td>
              <td class="tit">{{relitem.fpropID}}</td>
              <td>{{relitem.fOptIDs}}</td>
              <td class="oper">
                <span @click="show_updateaccrel(relitem.multiIds)">修改</span>
                <span @click="del_accrel(relitem.relID)">删除</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!--3.dilog-->
    <el-dialog class="dialog_rel" title="修改关系" :visible.sync="dilog_updater" width="40%">
      <div class="dilog_data">
        <!--影响项-->
        <div class="m_reldata">
          <h3>影响项</h3>
          <div class="m_relitem" v-for="prop in dilog_mdata">
            <h4>{{prop.propName}}</h4>
            <ul>
              <li :class="{'changeColor':dilog_mselopt.includes(opt.optId)}" v-for="opt in prop.child">{{opt.optName}}</li>
            </ul>
          </div>
        </div>
        <!--被影响项-->
        <div class="f_relitem">
          <h3>被影响项</h3>
          <h4>{{dilog_fdata.propName}}</h4>
          <ul>
            <li :class="{'changeColor':dilog_fselopt.includes(opt.optId)}"
                @click="get_foptlist(opt.optId)"
                v-for="opt in dilog_fdata.child">{{opt.optName}}</li>
          </ul>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dilog_updater = false">取 消</el-button>
        <el-button type="primary" @click="update_accrel">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
    /*导入组件*/
    import SearchFacSer from "../comm/SearchFacSer";
    /*导入方法*/
    import {get_acctypedata} from "../../network/model/accmanage";    /*获取附件类型*/
    import {get_accrelall} from "../../network/model/accmanage";      /*获取附件关系*/
    import {add_accrelbatch} from "../../network/model/accmanage";    /*批量添加关系*/
    import {add_accrel} from "../../network/model/accmanage";         /*添加附件关系*/
    import {get_accrelview} from "../../network/model/accmanage";     /*获取附件可视化关系*/
    import {update_accrel} from "../../network/model/accmanage";      /*修改关系*/
    import {del_accrel} from "../../network/model/accmanage";         /*删除关系*/


    export default {
        name: "AccRelManage",
        data(){
          return{
            // 1.id
            typeid:'',              /*类型id*/

            // 2.附件数据
            acc_alldata:[],         /*附件所有数据*/
            acc_typedata:[],        /*附件类型数据*/
            acc_typeval:'',         /*附件类型值*/
            acc_data:[],            /*附件数据*/

            // 3.本体数据选择
            acc_ckdlist:[],         /*附件勾选数组*/
            acc_classData:[],       /*选项选中数组*/

            // 4.本体规格关系
            acc_reldata:[],         /*附件文字关系*/
            acc_rellidata:[],       /*附件所有关系*/

            // 5.关系被影响项
            rel_fprop:-1,

            // 6.dilog数据
            dilog_updater:false,     /*是否显示dialog*/
            dilog_mdata:[],          /*附件影响项标题*/
            dilog_mselopt:[],        /*附件影响项选项*/
            dilog_fselopt:[],        /*附件被影响项选项*/
            dilog_fdata:[],          /*附件被影响项*/
          }
        },
        created(){
          this.get_acctypedata(this.seriesid);
        },
        watch:{
          /*监听系列id发生改变*/
          seriesid(newVal){
            this.get_acctypedata(newVal);
          },
          typeid(newVal){
            /*this.get_accreldata(this.seriesid)*/           /*本体规格关系可视化数据*/
            this.get_accrelall(this.seriesid,newVal);
          },
          acc_typeval(newVal){
            this.get_accdata(newVal[1]);
          },
          /*监听左边勾选上的值发生改变*/
          acc_ckdlist(newVal){
            this.clear_speselect(newVal);
          },
        },
        computed:{
          /*品牌id*/
          factid(){
            return this.$store.state.facserdata.fac_id
          },
          /*系列id*/
          seriesid(){
            return this.$store.state.facserdata.ser_id
          },
        },
        components:{
          SearchFacSer
        },
        methods:{
          // 1.获取数据
          /*a.获取附件类型数据*/
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

          /*b.获取附件数据*/
          get_accdata(typeid){
            this.typeid=typeid
            this.acc_data=[]
            for(let i=0;i<this.acc_alldata.length;i++){
              for(let j=0;j<this.acc_alldata[i].child.length;j++){
                if(this.acc_alldata[i].child[j].typeId==typeid){
                  this.acc_data=this.acc_alldata[i].child[j].child
                }
              }
            }
          },

          /*c.获取勾选上的本体*/
          get_checkedacc(){
            let checkbox=document.getElementsByClassName('spe_check');
            let spe_checked=[]
            for(let i=0;i<checkbox.length;i++){
              if(checkbox[i].checked==true){
                spe_checked.push(parseInt(checkbox[i].id))
              }
            }
            this.acc_ckdlist=[]
            for(let i=0;i<this.acc_data.length;i++){
              for(let j=0;j<spe_checked.length;j++){
                if(this.acc_data[i].propId==spe_checked[j]){
                  this.acc_ckdlist.push(this.acc_data[i])
                }
              }
            }
          },

          /*d.获取所有关系*/
          get_accrelall(seriesid,typeid){
            get_accrelall(seriesid,typeid).then(res=>{
              this.acc_rellidata=res;
            })
          },

          /*e.获取可视化关系*/
          get_accreldata(seriesid){
            get_accrelview(seriesid,this.acc_typeid).then(res=>{
              this.acc_reldata=res
            })
          },

          // 2.关系添加
          /*a.判断只能选择一个f*/
          judje_onecheckedf(i){
            let spe_f=document.getElementsByClassName('spe_F');
            let spe_m=document.getElementsByClassName('spe_M');
            let fnum=0;
            for(let i=0;i<spe_f.length;i++){
              if(spe_f[i].checked==true){
                this.acc_classData[i]=[]
                fnum++
              }
              if(spe_m[i].checked==true){
                this.acc_classData[i]=[0]
              }
            }
            this.$forceUpdate();
            if(fnum>1){
              spe_f[i].checked=false;
              this.$message({
                type:'warning',
                message:'只能选择一个f',
                duration:1000
              })
            }
          },

          /*b.根据选择的M还是F判断选项可多选还是单选*/
          judje_morf(i,j){
            let spe_m=document.getElementsByClassName('spe_M');
            let spe_f=document.getElementsByClassName('spe_F');
            if(spe_m[i].checked==true){
              this.acc_classData[i]=[];
              this.acc_classData[i].push(j)
            }
            if(spe_f[i].checked==true){
              if(this.acc_classData[i].includes(j)){
                for(let z=0;z<this.acc_classData[i].length;z++){
                  if(this.acc_classData[i][z]==j){
                    this.acc_classData[i].splice(z,1)
                  }
                }
              }else{
                this.acc_classData[i].push(j)
              }
            }
            this.$forceUpdate();
          },

          /*c.判断必须选择一个F*/
          judje_onef(spe_m,spe_f){
            let m=0,f=0;
            for(let i=0;i<spe_m.length;i++){
              if(spe_m[i].checked==true){
                m++
              }
              if(spe_f[i].checked==true){
                f++
              }
            }
            if(m<1 || f<1){
              return false
            }else{
              return true
            }
          },

          /*d.添加关系*/
          add_rel(){
            let spe_m=document.getElementsByClassName('spe_M');
            let spe_f=document.getElementsByClassName('spe_F');
            let boolean=this.judje_onef(spe_m,spe_f);
            if(boolean===true){
              this.get_addreldata(spe_m,spe_f);
            }else{
              this.$message({
                type:'warning',
                message:'至少选择一个F和M',
                duration:1000,
              })
            }
          },

          /*e.批量生成关系*/
          add_batchrel(){
            let spe_m=document.getElementsByClassName('spe_M');
            let spe_f=document.getElementsByClassName('spe_F');
            let boolean=this.judje_onef(spe_m,spe_f);
            if(boolean===true){
              this.get_addrelbatch(spe_m,spe_f);
            }else{
              this.$message({
                type:'warning',
                message:'至少选择一个F和M',
                duration:1000,
              })
            }
          },

          /*f.获取需要添加关系的数据*/
          get_addreldata(spe_m,spe_f){
            let optul=this.$refs.Domopt;
            let fpropID="",fOptIDs="",fOptDefaultID="",mOptIDs="";
            let mproplist=[],mpropstr="",mOptIDslist=[];
            for(let i=0;i<spe_m.length;i++){
              if(spe_m[i].checked==true){
                mproplist.push(spe_m[i].name)
                mpropstr=mpropstr+'+'+spe_m[i].name
                for(let j=0;j<optul[i].childNodes.length;j++){
                  if(optul[i].childNodes[j].className=='selectopt'){
                    mOptIDs=optul[i].childNodes[j].id
                  }
                }
                mOptIDslist.push(mOptIDs)
              }
              if(spe_f[i].checked==true){
                fpropID=spe_f[i].name;
                for(let j=0;j<optul[i].childNodes.length;j++){
                  if(optul[i].childNodes[j].className=='selectopt'){
                    fOptIDs=fOptIDs+','+optul[i].childNodes[j].id
                  }
                }
                fOptIDs=fOptIDs.substring(1,fOptIDs.length)
                if(fOptIDs.indexOf(',')!=-1){
                  fOptDefaultID=fOptIDs.substring(0,fOptIDs.indexOf(','))
                }else{
                  fOptDefaultID=fOptIDs
                }
              }
            }

            if(fOptIDs==""){
              this.$message({
                type:'warning',
                message:"F项未选择数据",
                duration:1000
              })
              return
            }
            let spereldatalist=[]
            for(let i=0;i<mproplist.length;i++){
              let spereldata={}
              spereldata={
                seriesid:this.seriesid,
                typeId:this.typeid,
                mpropID:mproplist[i],
                fpropID:fpropID,
                multiIds:mpropstr.substring(1,mpropstr.length)+'-'+fpropID,
                fOptIDs:fOptIDs,
                fOptDefaultID:fOptDefaultID,
                mOptIDs:mOptIDslist[i],
              }
              spereldatalist.push(spereldata)
            }
            spereldatalist=JSON.stringify(spereldatalist)
            add_accrel(spereldatalist).then(res=>{
              if(res.code=="200"){
                this.$message({
                  type:'success',
                  message:res.message,
                  duration:1000
                })
                this.get_accrelall(this.seriesid,this.typeid)
              }else{
                this.$message({
                  type:'error',
                  message:res.message,
                  duration:1000
                })
              }
            }).catch(err=>{
              console.log(err)
            })
          },

          /*i.获取需要批量添加的关系数据*/
          get_addrelbatch(spe_m,spe_f){
            let mcomblist=[],fcomb
            for(let i=0;i<spe_m.length;i++){
              if(spe_m[i].checked==true){
                mcomblist.push(spe_m[i].name)
              }
            }
            for(let i=0;i<spe_f.length;i++){
              if(spe_f[i].checked==true){
                fcomb=spe_f[i].name
              }
            }
            let mproplist=[],moptlist=[]
            for(let i=0;i<this.acc_data.length;i++){
              for(let j=0;j<mcomblist.length;j++){
                if(this.acc_data[i].propId==mcomblist[j]){
                  let mpropitem=[],moptitem=[]
                  for(let z=0;z<this.acc_data[i].child.length;z++){
                    mpropitem.push(this.acc_data[i].propId)
                    moptitem.push(this.acc_data[i].child[z].optId)
                  }
                  mproplist.push(mpropitem)
                  moptlist.push(moptitem)
                }
              }
            }
            let multiIdcomb=[],mOptIDscomb=[];
            let mOptIDscombarr=[],arr;
            /*判断一对一还是多对一*/
            if(mproplist.length==1){
              for(let i=0;i<mproplist[0].length;i++){
                multiIdcomb.push(mproplist[0][i])
                mOptIDscombarr.push([moptlist[0][i]])
              }
            }else{
              multiIdcomb = this.get_combdata(mproplist,'prop')
              mOptIDscomb = this.get_combdata(moptlist,'opt')
              /*处理mOptIDscomb*/
              for(let i=0;i<mOptIDscomb.length;i++){
                arr=mOptIDscomb[i].split(',')
                mOptIDscombarr.push(arr)
              }
            }
            let accreldata
            accreldata={
              seriesid:this.seriesid,
              typeId:this.typeid,
              multiIdcomb:multiIdcomb,
              mproplist:mproplist,
              mOptIDscombarr:mOptIDscombarr,
              fpropID:fcomb,
            }
            accreldata=JSON.stringify(accreldata)
            add_accrelbatch(accreldata).then(res=>{
              if(res.code==200){
                this.get_accrelall(this.seriesid,this.typeid)
              }else{
                console.log('未知错误!')
              }
            })
          },

          /*g.获取组合*/
          get_combdata(array,type){
            let len = array.length;
            if(len>=2){
              let len1=array[0].length
              let len2=array[1].length
              let arrey = []
              for(let i=0;i<len1;i++){
                for(let j=0;j<len2;j++){
                  if(type=='prop'){
                    arrey.push(array[0][i]+'+'+array[1][j])
                  }else{
                    arrey.push(array[0][i]+','+array[1][j])
                  }
                }
              }
              let arraynew = [arrey]
              for(let i=2;i<array.length;i++){
                arraynew[i-1]=array[i]
              }
              return this.get_combdata(arraynew,type)
            }else{
              return array[0]
            }
          },

          // 3.关系修改
          /*a.显示修改dilog*/
          show_updateaccrel(multiIds){
            /*I.循环得到需要更改的关系数据(一条或多条)*/
            this.dilog_multiIds=multiIds;
            let reldata = []
            for (let i=0;i<this.acc_rellidata.length;i++){
              if(this.acc_rellidata[i].multiIds==multiIds){
                reldata.push(this.acc_rellidata[i])
              }
            }
            /*II.循环获取更改关系数据的本体数据*/
            let maccdata=[],faccdata=[],moptsel=[]
            for(let i=0;i<reldata.length;i++){
              for(let j=0;j<this.acc_data.length;j++){
                if(reldata[i].mpropID==this.acc_data[j].propId){
                  maccdata.push(this.acc_data[j])
                }if(reldata[i].fpropID==this.acc_data[j].propId){
                  faccdata.push(this.acc_data[j])
                }
              }
              moptsel.push(parseInt(reldata[i].mOptIDs))
            }
            /*III.获取已经添加的被影响项选项*/
            if(reldata[0].fOptIDs!=null && reldata[0].fOptIDs!=''){
              let fOptIDs=reldata[0].fOptIDs.split(',')
              this.dilog_fselopt=[]
              for(let i=0;i<fOptIDs.length;i++){
                this.dilog_fselopt.push(parseInt(fOptIDs[i]))
              }
            }else{
              this.dilog_fselopt=[]
            }
            /*IV将数据存入data*/
            this.dilog_mdata=maccdata;
            this.dilog_fdata=faccdata[0];
            this.dilog_mselopt=moptsel;
            this.dilog_updater=true;
          },

          /*b.获取选项数组*/
          get_foptlist(optid){
            if(this.dilog_fselopt.includes(optid)){
              for(let i=0;i<this.dilog_fselopt.length;i++){
                if(this.dilog_fselopt[i]==optid){
                  this.dilog_fselopt.splice(i,1)
                }
              }
            }else{
              this.dilog_fselopt.push(optid)
            }
          },

          /*c.修改关系*/
          update_accrel(){
            let fOptIDs='',fOptDefaultID=''
            if(this.dilog_fselopt.length>0){
              for(let i=0;i<this.dilog_fselopt.length;i++){
                fOptIDs=fOptIDs+','+this.dilog_fselopt[i]
              }
              fOptIDs=fOptIDs.substring(1,fOptIDs.length)
              fOptDefaultID=this.dilog_fselopt[0]
            }else{
              fOptIDs='';
              fOptDefaultID='';
            }
            let accreldata={
              seriesid:this.seriesid,
              typeId:this.typeid,
              multiIds:this.dilog_multiIds,
              fOptIDs:fOptIDs,
              fOptDefaultID:fOptDefaultID
            }
            accreldata=JSON.stringify(accreldata)
            update_accrel(accreldata).then(res=>{
              if(res.code==200){
                this.get_accrelall(this.seriesid,this.typeid)
                this.dilog_updater=false
              }else{
                console.log('未知错误!')
              }
            })
          },

          // 4.关系删除
          /*a.删除关系数据*/
          del_accrel(relID){
            this.$confirm("确认删除该关系吗吗？",'提示',{
              confirmButtonText:'确认',
              cancelButtonText:'取消',
              type:'warning'
            }).then(()=>{
              del_accrel(relID).then(res=>{
                if(res.code==200){
                  this.$message({
                    type: 'success',
                    message: '数据删除成功',
                    duration:1000
                  });
                  this.get_accrelall(this.seriesid,this.typeid)
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

          // 5.数据清空
          clear_speselect(list){
            /*清空选中的选项*/
            this.acc_classData=[]
            for(let i=0;i<list.length;i++){
              this.acc_classData.push([])
            }
            /*清空选中的单选*/
            let spe_m=document.getElementsByClassName('spe_M');
            let spe_f=document.getElementsByClassName('spe_F');
            for(let i=0;i<spe_m.length;i++){
              spe_m[i].checked=false
              spe_f[i].checked=false
            }
          },
        },
    }
</script>

<style lang="less" scoped>
  @import "../../assets/less/model/sperel.less";
</style>
