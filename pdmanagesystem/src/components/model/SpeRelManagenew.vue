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
          <a href="">下载</a>
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
                    :id="opt.optId">
                  {{opt.optName}}
                  {{opt.optId}}
                </li>
              </ul>
            </div>
          </div>

          <div class="spe-commit" v-show="spe_ckdlist!=''">
            <h3 @click="get_comblist">添加关系</h3>
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
    name: "SpeRelManagenew",
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
    created() {

    },
    watch:{
      /*监听系列id发生改变*/
      seriesid(newVal){
        this.get_spedata(newVal);      /*获取本体数据*/
        /*this.get_spereldata(newVal);   /!*本体规格关系可视化数据*!/*/
      },
      /*监听左边勾选上的值发生改变*/
      spe_ckdlist(newVal){
        /*this.clear_speselect(newVal);*/
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
                arrey.push([array[0][i],array[1][j]])
              }
            }
          }
          let arraynew = [arrey]
          for(let i=2;i<array.length;i++){
            arraynew[i-1]=array[i]
          }
          return this.get_combdata(arraynew)
        }else{
          return array[0]
        }
      },

      get_comblist(){
        let spe_m=document.getElementsByClassName('spe_M');
        let spe_f=document.getElementsByClassName('spe_F');
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
        for(let i=0;i<this.spe_data.length;i++){
          for(let j=0;j<mcomblist.length;j++){
            if(this.spe_data[i].propId==mcomblist[j]){
              let mpropitem=[],moptitem=[]
              for(let z=0;z<this.spe_data[i].child.length;z++){
                mpropitem.push(this.spe_data[i].propId)
                moptitem.push(this.spe_data[i].child[z].optId)
              }
              mproplist.push(mpropitem)
              moptlist.push(moptitem)
            }
          }
        }
        /*console.log(moptlist)*/
        let multiIdcomb=[],mOptIDscomb=[]
        /*判断一对一还是多对一*/
        if(mproplist.length==1){
          for(let i=0;i<mproplist[0].length;i++){
            multiIdcomb.push(mproplist[0][i])
            mOptIDscomb.push([moptlist[0][i]])
          }
        }else{
          multiIdcomb = this.get_combdata(mproplist,'prop')
          mOptIDscomb = this.get_combdata(moptlist,'opt')
        }
        let index=1;
        let spereldata=[]
        for(let i=0;i<multiIdcomb.length;i++){
          for(let j=0;j<mproplist.length;j++){
            spereldata.push({
              multiIds:multiIdcomb[i]+'-'+fcomb+'|'+index,
              mpropID:mproplist[j][0],
              mOptIDs:mOptIDscomb[i][j],
              fpropID:fcomb,
            })
          }
          index++
        }
        console.log(spereldata)
      },
    },
  }
</script>

<style lang="less" scoped>
  @import "../../assets/less/model/sperel.less";
</style>
