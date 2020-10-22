<template>
    <!--组件总框-->
    <div class="dy-all">
        <input type="checkbox" class="dy_checkall" v-if="dynamicdata!=''" v-model="dy_CheckedAll"/>
        <span class="dy_checkalltext" v-if="dynamicdata!=''">全选</span>
        <!--<el-checkbox class="dy_checkall" v-if="dynamicdata!=''" v-model="dy_CheckedAll"></el-checkbox>-->
        <div class="dy-item" :id="tititem.propId" ref="isShowDiv" v-for="(tititem,i) in dynamicdata">
            <div class="dy-title" id="">
                <input :id="tititem.propId"
                       class="spe_check"
                       type="checkbox"
                       @click="get_checkedspe()"
                     />
                <span>
                    {{tititem.propName}}
                    {{tititem.propId}}
                    <!--{{tititem.compChar}}-->
                </span>
            </div>
            <div class="dy-option">
                <ul>
                    <div @click="get_ClickOptlist()" class="optitem">
                        <li :class="is_changeClass(i,optitem.optId)" :id="optitem.optId" :name="dynamicdata"
                            v-if="is_ShowOpt(optitem.optId)" v-for="(optitem,j) in tititem.child"
                            @click="is_changeColor(i,optitem.optId)">
                            {{optitem.optName}}
                            {{optitem.optId}}
                        </li>
                    </div>
                    <div style="clear: both"></div>
                </ul>
            </div>
         </div>
    </div>
</template>

<script>
    import {get_sperel} from "../../../network/model/spemanage";
    import {get_accrel} from "../../../network/model/accmanage";

    export default {
        props:["dynamicdata",'seriesid','typeid'],
        name: "dynamicCompspe",
        data(){
            return{
                /*默认*/
                dy_originalTitleIdList:[],     /*原始默认的标题id组成的数组*/
                dy_originalTitleIdStr:"",      /*原始默认的标题id组成的字符串*/
                dy_originalTitleCodelist:[],   /*原始默认的标题连接符组成的数组*/
                dy_originalTitleTypelist:[],   /*原始默认的标题连接符组成的数组*/
                dy_originalOptionIdList:[],    /*原始默认的标题id组成的数组*/
                dy_originalOptionIdStr:"",     /*原始默认的选项id组成的字符串*/

                /*关系*/
                dyRel_AllRellist:[],
                dyRel_defaultTit:'',       /*含有关系的标题数组*/
                dyRel_defaultOpt:'',       /*含有关系的选项数组*/
                dyRel_defalutShowOpt:'',    /*需要显示的选项数组*/

                /*数据*/
                dy_DefSelectedOptList:[],  /*得到的默认选中的选项id数组*/
                dy_OptVlueList:[],         /*选项的value值组成的数组*/

                /*全选*/
                dy_CheckedAll:'',         /*全选框绑定值*/

                /*循环监听*/
                dy_num:0,
            }
        },
        watch:{
            /*a.监听传入数据*/
            dynamicdata(newVal){
                this.get_DefaultTitAndOpt(newVal);
            },
            /*b.监听选中选项*/
            dy_originalOptionIdStr(newVal){
              this.get_dynamicdata(this.seriesid,this.dy_originalTitleIdStr,newVal);
            },
            /*c.监听关系*/
            dyRel_AllRellist(){
              this.get_ShowOpt();
            },
            /*d.监听类型id(改变时清空已勾选项)*/
            typeid(){
              this.clear_selected();
            },
            /*e.监听系列id(改变时清空已勾选项)*/
            seriesid(){
              this.clear_selected();
            },
            /*f.全选*/
            dy_CheckedAll(newVal){
              this.selected_all(newVal)
            },
            // i.请求两次关系数据
            dy_DefSelectedOptList(newVal){
              this.$nextTick(function () {
                this.get_ClickOptlist()
              })
            },
        },
        updated() {
            this.is_Showdiv();
        },
        methods:{
            /*
            * 1.获取数据
            * */
            /*a.得到默认标题和选项组成的字符串*/
            get_DefaultTitAndOpt(list){
                /*1.得到原始的标题propId组成的字符串*/
                let titletpropIDs="";
                this.dy_originalTitleIdList=[];
                this.dy_originalTitleCodelist=[];
                this.dy_originalTitleTypelist=[]
                for(let i=0;i<list.length;i++){
                    titletpropIDs=titletpropIDs+"-"+list[i].propId;
                    this.dy_originalTitleIdList.push(list[i].propId);
                    this.dy_originalTitleCodelist.push(list[i].propCode)
                    this.dy_originalTitleTypelist.push(list[i].use_type)
                }
                this.dy_originalTitleIdStr=titletpropIDs.substring(1,titletpropIDs.length);

                /*2.得到原始的选项optId组成的字符串*/
                let Optdefault="",OptionIds="";
                this.dy_originalOptionIdList=[];
                for(let i=0;i<list.length;i++){
                    /*3.控制默认选中选用选项*/
                    if(list[i].child.length>0){
                      Optdefault=list[i].child[0].optId;
                    }
                    OptionIds=OptionIds+"-"+Optdefault;
                    this.dy_originalOptionIdList.push(Optdefault)
                }
                this.dy_originalOptionIdStr=OptionIds.substring(1,OptionIds.length);
                /*console.log(this.dy_originalTitleIdStr)
                console.log(this.dy_originalOptionIdStr)*/
            },

            /*b.根据选中的选项动态获取选项显示数据*/
            get_dynamicdata(seriesid,titleIdStr,optionIdStr){
              if(this.typeid==''){
                get_sperel(seriesid,titleIdStr,optionIdStr).then(res=>{
                  this.dyRel_AllRellist=res;
                })
              }else{
                get_accrel(seriesid,titleIdStr,optionIdStr).then(res=>{
                  this.dyRel_AllRellist=res;
                })
              }
              /*console.log(this.dyRel_AllRellist)*/
            },

            /*c.获取需要显示的选项*/
            get_ShowOpt(){
              /*1.得到需要改变的标题id数组及其默认选项*/
              this.dyRel_defaultTit=[];
              this.dyRel_defaultOpt=[];
              for (let i=0;i<this.dyRel_AllRellist.length;i++){
                this.dyRel_defaultTit.push(this.dyRel_AllRellist[i].fpropID);
                this.dyRel_defaultOpt.push(this.dyRel_AllRellist[i].fOptDefaultID);
              }

              /*2.得到需要显示的选项数组*/
              this.dyRel_defalutShowOpt=[];
              let relindex=0,fOptIDs;
              /*3.遍历出需要显示的所有选项*/
              for(let i=0;i<this.dy_originalTitleIdList.length;i++){
                if(this.dyRel_defaultTit.includes(this.dy_originalTitleIdList[i])){
                  relindex=this.get_Arrindex(this.dyRel_defaultTit,this.dy_originalTitleIdList[i]);
                  fOptIDs=this.dyRel_AllRellist[relindex].fOptIDs.split(",");
                  for(let j=0;j<fOptIDs.length;j++){
                    this.dyRel_defalutShowOpt.push(parseInt(fOptIDs[j]))
                  }
                }
                else{
                  for(let j=0;j<this.dynamicdata[i].child.length;j++){
                    this.dyRel_defalutShowOpt.push(this.dynamicdata[i].child[j].optId)
                  }
                }
              }

              /*console.log(this.dyRel_defalutShowOpt)*/
              /*4.调用get_DefSelectedOptlist()方法获取默认选中id数组*/
              this.get_DefSelectedOptlist();
            },

            /*d.得到默认选中的选项id组成的数组*/
            get_DefSelectedOptlist(){
                this.dy_DefSelectedOptList=[];
                /*1.得到点击时该标题以下已经选中的选项*/
                let index,reltit;
                let len=this.dy_originalTitleIdList.length;
                for(let i=0;i<len;i++){
                    if(this.dyRel_defalutShowOpt.includes(this.dy_originalOptionIdList[i])){
                        index=this.dy_originalOptionIdList[i];
                    }else{
                        reltit=this.get_Arrindex(this.dyRel_defaultTit,this.dy_originalTitleIdList[i])
                        index=this.dyRel_defaultOpt[reltit]
                    }
                    this.dy_DefSelectedOptList.push(index);
                }
                /*console.log(this.dy_DefSelectedOptList)*/
                /*2.调用get_SpeOptandOptvalue方法获得选项相关数据*/
                this.get_SpeOptandOptvalue();
            },

            /*e.得到本体规格已经选中的选项id和选项值*/
            get_SpeOptandOptvalue(){
                /*1.得到选中的选项id字符串*/
                let SelectedOpt="",SelecteOptVlue="";               /*定义已经选中的选项id和选项值*/
                let SelectedProp="",SelectedPropList=[]             /*定义标题为B的字符串和数组*/
                let SelectedOptlist=[],SelectedValuelist=[];       /*定义已经选中的选项id数组和选项值数组*/
                for(let i=0;i<this.dy_originalTitleTypelist.length;i++){
                  if(this.dy_originalTitleTypelist[i]==='B'){
                    /*标题*/
                    SelectedProp=SelectedProp+'-'+this.dy_originalTitleIdList[i];
                    SelectedPropList.push(this.dy_originalTitleIdList[i]);
                    /*选项*/
                    SelectedOpt=SelectedOpt+'-'+this.dy_DefSelectedOptList[i];
                    SelectedOptlist.push(this.dy_DefSelectedOptList[i]);
                  }
                }
                let DefSelectedPropStr=SelectedProp.substring(1,SelectedProp.length);
                let DefSelectedOptStr=SelectedOpt.substring(1,SelectedOpt.length);
                /*2.得到选中选项的value值*/
                for(let i=0;i<this.dy_DefSelectedOptList.length;i++){
                    for(let j=0;j<this.dynamicdata[i].child.length;j++){
                        if(this.dy_DefSelectedOptList.includes(this.dynamicdata[i].child[j].optId)){
                            SelecteOptVlue=this.dynamicdata[i].child[j].optValue;
                        }
                    }
                    SelectedValuelist.push(SelecteOptVlue);         /*得到已经选中的选项id值得数组*/
                }
                /*3.得到连接符*/
                let MesData={
                  propStr:DefSelectedPropStr,
                  propList:SelectedPropList,
                  propCodeList:this.dy_originalTitleCodelist,
                  optStr:DefSelectedOptStr,
                  optList:SelectedOptlist,
                  optValList:SelectedValuelist
                }
                this.$emit('get_MesData',MesData)
                /*console.log(MesData)*/
            },

            /*f.得到点击时选项id组成的数组*/
            get_ClickOptlist(){
                let optionId=document.getElementsByClassName('changeColor');
                /*1.获取本体规格所有选项的id组成的数组及字符串*/
                let OptionIds="";
                this.dy_originalOptionIdList=[];
                for(let i=0;i<optionId.length;i++){
                    OptionIds=OptionIds+"-"+optionId[i].id;
                    this.dy_originalOptionIdList.push(parseInt(optionId[i].id));
                }
                this.dy_originalOptionIdStr=OptionIds.substring(1,OptionIds.length);
                /*console.log(this.dy_originalOptionIdStr)*/
            },

            /*g.得到勾选上的值*/
            get_checkedspe(){
              let checkbox=document.getElementsByClassName('spe_check');
              let checked=[]
              for(let i=0;i<checkbox.length;i++){
                if(checkbox[i].checked==true){
                  checked.push(i)
                }
              }
              this.$emit('get_CheckedList',checked)
            },

            /*h.判断全选*/
            selected_all(boolean){
              let checkbox=document.getElementsByClassName('spe_check');
              if(boolean==true){
                for(let i=0;i<checkbox.length;i++){
                  checkbox[i].checked=true;
                }
              }else{
                for(let i=0;i<checkbox.length;i++){
                  checkbox[i].checked=false;
                }
              }
              this.get_checkedspe();
            },

            /*i.清空所有勾选*/
            clear_selected(){
              let checkbox=document.getElementsByClassName('spe_check');
              for(let i=0;i<checkbox.length;i++){
                checkbox[i].checked=false;
              }
              this.dy_CheckedAll=false;
              this.get_checkedspe();
            },

            /*2.自定义方法*/
            /*a.得到数组中某一个数据的下标*/
            get_Arrindex(arr,value){
                for(let i=0;i<arr.length;i++){
                    if(arr[i]==value){
                        return i
                    }
                }
            },

            /*3.控制数据显示*/
            /*a.判断哪些时需要显示的选项*/
            is_ShowOpt(optId){
                return this.dyRel_defalutShowOpt.includes(optId);
            },

            /*b判断是否被默认选中*/
            is_changeClass(i,optId){
                return {changeColor:this.dy_DefSelectedOptList[i]===optId}
            },

            /*c.判断当点击时选中点击的选项*/
            is_changeColor(i,optId){
                this.dy_DefSelectedOptList[i]=optId;        /*点击时将点击的选项id赋值给选中选项*/
                this.$forceUpdate();        /*Vue强制刷新事件*/
            },

            /*d.判断选项值为null时隐藏该div*/
            is_Showdiv(){
                let isdisplay=this.$refs.isShowDiv;
                let optionId=document.getElementsByClassName('changeColor');
                let optinnertext="";
                for (let i=0;i<optionId.length;i++){
                    optinnertext=optionId[i].innerText.trim()
                    //判断隐藏选用状态和隐藏选项为null的div
                    if(optinnertext=="null" || optinnertext=="选用" || optinnertext=="不选用"){
                        isdisplay[i].style.display="none"
                    }else{
                        isdisplay[i].style.display="block"
                    }
                }
            },
        }
    }
</script>

<style scoped>
    /*兼容ie8 9 10*/
    .changeColor{
        color: #409eff\9;
    }
    /*兼容ie11*/
    @media screen and(-ms-high-contrast:active),(-ms-high-contrast:none){
        .changeColor{
            color: #409eff;
        }
    }
</style>

<style lang="less">
    @import "../../../assets/less/model/spedynamic";
</style>
