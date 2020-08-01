<template>
    <div class="rel_all">
      <!--1.关系头部-->
      <div class="rel_top">
        <SearchFacSer/>
      </div>

      <!--2.关系内容-->
      <div class="rel_cont">
        <!--a.选择需要添加关系的项-->
        <div class="rel_select">
          <div class="select-top">
            <h3>本体规格数据选择</h3>
          </div>

          <div class="select_content">
            <!--当系列无数据时显示-->
            <span class="null" v-if="spe_data==''">该系列暂无数据</span>

            <!--本体规格数据-->
            <div class="spe-item" v-for="(prop,i) in spe_data">
              <!--选型标题-->
              <div class="spe-tit">
                  <span class="propval">
                      <input :id="prop.propId"
                             class="spe_check"
                             type="checkbox"
                             @click="get_checkedspe(i,prop.propId)"/>
                      {{prop.propName}}
                      {{prop.propId}}
                  </span>
              </div>

              <!--选型选项-->
              <div class="spe-opt">
                <ul>
                  <li v-for="(opt,j) in prop.child">
                    {{opt.optName}}
                    {{opt.optID}}
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
            <h3>本体规格关系添加</h3>
          </div>

          <!--内容信息-->
          <div class="select_content">
            <!--当未勾选值时显示-->
            <span class="null" v-if="spe_ckdlist==''">请先选择需要添加关系的选项</span>

            <!--本体规格数据-->
            <div class="spe-item" v-for="(prop,i) in spe_ckdlist">
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
                      :class="{'selectopt':spe_classData[i].includes(j)}"
                      @click="judje_morf(i,j)">
                    {{opt.optName}}
                    {{opt.optId}}
                  </li>
                </ul>
              </div>
            </div>

            <div class="spe-commit" v-show="spe_ckdlist!=''">
              <h3 @click="add_rel">添加关系</h3>
            </div>
          </div>
        </div>

        <!--c.显示关系-->
        <div class="rel_showrel">
          <!--头部操作-->
          <div class="showrel-top">
            <h3>关系展示</h3>
            <div class="change">
              <span @click="show_rel=2">id格式</span>
              <span @click="show_rel=1">文字格式</span>
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
            <tbody v-if="show_rel==1">
              <tr v-if="spe_reldata==''">
                <td colspan="6">该系列暂未添加关系</td>
              </tr>
              <tr v-for="relitem in spe_reldata">
                <td>{{relitem.multiIdsstr}}</td>
                <td class="tit">{{relitem.mpropstr}}</td>
                <td>{{relitem.moptidstr}}</td>
                <td class="tit">{{relitem.fpropstr}}</td>
                <td>{{relitem.foptstr}}</td>
                <td class="reldel" @click="del_sperel(relitem.relID)">删除</td>
              </tr>
            </tbody>
            <tbody v-if="show_rel==2">
              <tr v-if="spe_reldata==''">
                <td colspan="6">该系列暂未添加关系</td>
              </tr>
              <tr v-for="relitem in spe_reliddata">
                <td>{{relitem.multiIds}}</td>
                <td class="tit">{{relitem.mpropID}}</td>
                <td>{{relitem.mOptIDs}}</td>
                <td class="tit">{{relitem.fpropID}}</td>
                <td>{{relitem.fOptIDs}}</td>
                <td class="reldel" @click="del_sperel(relitem.relID)">删除</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
</template>

<script>
    /*导入组件*/
    import SearchFacSer from "../comm/SearchFacSer";
    /*导入方法*/
    import {get_spedata} from "../../network/model/spemanage";        /*获取所有本体数据*/
    import {add_sperel} from "../../network/model/spemanage";         /*添加本体关系*/
    import {get_sperelid} from "../../network/model/spemanage";       /*获取本体规格可视化id*/
    import {get_sperelview} from "../../network/model/spemanage";     /*获取本体规格可视化关系*/
    import {del_sperel} from "../../network/model/spemanage";         /*删除关系*/

    export default {
        name: "SpeRelManage",
        data(){
          return{
            // 2.本体数据
            spe_data:'',

            // 3.本体数据选择
            spe_ckdlist:[],
            spe_classData:[],

            // 4.本体规格关系
            spe_reldata:[],
            spe_reliddata:[],

            // 5.开关
            show_rel:2,
          }
        },
        watch:{
          /*监听系列id发生改变*/
          seriesid(newVal){
            this.get_spedata(newVal);      /*获取本体数据*/
            this.get_spereldata(newVal);   /*本体规格关系可视化数据*/
          },
          /*监听左边勾选上的值发生改变*/
          spe_ckdlist(newVal){
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
          // 1.本体选择
          /*b.获取本体数据*/
          get_spedata(seriesid){
            get_spedata(seriesid).then(res=>{
              /*console.log(res)*/
              this.spe_data=res;
            })
          },

          /*c.获取勾选上的本体*/
          get_checkedspe(){
            let checkbox=document.getElementsByClassName('spe_check');
            let spe_checked=[]
            for(let i=0;i<checkbox.length;i++){
              if(checkbox[i].checked==true){
                spe_checked.push(parseInt(checkbox[i].id))
              }
            }
            this.spe_ckdlist=[]
            for(let i=0;i<this.spe_data.length;i++){
              for(let j=0;j<spe_checked.length;j++){
                if(this.spe_data[i].propId==spe_checked[j]){
                  this.spe_ckdlist.push(this.spe_data[i])
                }
              }
            }
            /*console.log(this.spe_ckdlist)*/
          },

          // 2.关系添加
          /*a.判断只能选择一个f*/
          judje_onecheckedf(i){
            let spe_f=document.getElementsByClassName('spe_F');
            let spe_m=document.getElementsByClassName('spe_M');
            let fnum=0;
            for(let i=0;i<spe_f.length;i++){
              if(spe_f[i].checked==true){
                this.spe_classData[i]=[]
                fnum++
              }
              if(spe_m[i].checked==true){
                this.spe_classData[i]=[0]
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
              this.spe_classData[i]=[];
              this.spe_classData[i].push(j)
            }
            if(spe_f[i].checked==true){
              if(this.spe_classData[i].includes(j)){
                for(let z=0;z<this.spe_classData[i].length;z++){
                  if(this.spe_classData[i][z]==j){
                    this.spe_classData[i].splice(z,1)
                  }
                }
              }else{
                this.spe_classData[i].push(j)
              }
            }
            this.$forceUpdate();
          },

          /*c.清空选中*/
          clear_speselect(list){
            /*清空选中的选项*/
            this.spe_classData=[]
            for(let i=0;i<list.length;i++){
              this.spe_classData.push([])
            }
            /*清空选中的单选*/
            let spe_m=document.getElementsByClassName('spe_M');
            let spe_f=document.getElementsByClassName('spe_F');
            for(let i=0;i<spe_m.length;i++){
              spe_m[i].checked=false
              spe_f[i].checked=false
            }
          },

          /*d.添加关系*/
          add_rel(){
            let spe_m=document.getElementsByClassName('spe_M');
            let spe_f=document.getElementsByClassName('spe_F');
            let m=0,f=0;
            for(let i=0;i<spe_m.length;i++){
              if(spe_m[i].checked==true){
                m++
              }
              if(spe_f[i].checked==true){
                f++
              }
            }
            /*判断是否有选择M和F*/
            if(m<1 || f<1){
              this.$message({
                type:'warning',
                message:'至少选择一个F和M',
                duration:1000,
              })
              return
            }else{
              this.get_addreldata(spe_m,spe_f);
            }
          },

          /*e.获取需要添加关系的数据*/
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
            add_sperel(spereldatalist).then(res=>{
              if(res.code=="200"){
                this.get_spereldata(this.seriesid);
                this.$message({
                  type:'success',
                  message:res.message,
                  duration:1000
                })
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

          // 3.关系显示
          /*获取可视化关系*/
          get_spereldata(seriesid){
            get_sperelview(seriesid).then(res=>{
              this.spe_reldata=res
            })
            /*获取可视化id关系*/
            get_sperelid(seriesid).then(res=>{
              /*console.log(res)*/
              this.spe_reliddata=res
            })
          },

          /*删除关系数据*/
          del_sperel(relID){
            this.$confirm("确认删除该关系吗？",'提示',{
              confirmButtonText:'确认',
              cancelButtonText:'取消',
              type:'warning'
            }).then(()=>{
              del_sperel(relID).then(res=>{
                this.get_spereldata(this.seriesid);
                if(res.code==200){
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
        },
    }
</script>

<style lang="less" scoped>
  @import "../../assets/less/model/sperel.less";
</style>
