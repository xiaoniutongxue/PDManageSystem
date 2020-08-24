<template>
      <div class="drawer_content">
        <!--当系列无数据时显示-->
        <!--<span class="null" v-if="spe_data==''">该系列暂无数据</span>-->

        <!--本体规格数据-->
        <div class="drawer-item" v-for="prop in drawer_data">
          <!--选型标题-->
          <div class="drawer-tit">
              <span class="propval">{{prop.propname}}</span>
          </div>

          <!--选型选项-->
          <div class="drawer-opt">
            <ul>
              <li v-for="opt in prop.child">{{opt.optname}}</li>
            </ul>
          </div>
        </div>
        <div class="drawer-oper">
          <span @click="add_drawerdata">添加到数据库</span>
        </div>
      </div>
</template>

<script>
    /*导入方法*/
    import {add_spewebdata} from "../../../network/model/spemanage";

    export default {
        props:['drawerdata'],
        name: "drawerComp",
        data(){
          return{
            drawer_data:[],
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
        },
        watch:{
          drawerdata(newVal){
            this.get_drawerdata(newVal);
          },
        },
        methods:{
          // 1.获取数据
          /*a.处理抽屉数据*/
          get_drawerdata(data){
            let drawerdata=[]
            for(let i=0;i<data.length;i++){
              drawerdata.push({
                seriesid:this.seriesid,
                propname:data[i][0],
                propCode:'无',
                child:[]
              })
              for(let j=1;j<data[i].length;j++){
                drawerdata[i].child.push({
                  seriesid:this.seriesid,
                  optname:data[i][j],
                  optvalue:'',
                  AddUser:this.user,
                  AddTime:this.sys_date
                })
              }
            }
            this.drawer_data=drawerdata
            /*console.log(drawerdata)*/
          },

          /*b.将抽屉数据添加到数据库*/
          add_drawerdata(){
            let data =JSON.stringify(this.drawer_data)
            add_spewebdata(data).then(res=>{
              this.$emit('show_drawer',res)
            })
          },
        },
    }
</script>

<style lang="less" scoped>
    @import "../../../assets/less/comm/variable";
    /*抽屉内容*/
    .drawer_content{
      width: 100%;
      height: auto;
      overflow: auto;
      /*border: 1px solid red;*/
      /*单个选项*/
      .drawer-item{
        width: 95%;
        height: auto;
        padding-left: 5%;
        margin-top: 10px;
        /*border: 1px solid black;*/
        /*选型标题*/
        .drawer-tit{
          width: 100%;
          height: auto;
          display: flex;
          /*border: 1px solid black;*/
          span{
            font-size: 14px;
            display: block;
            padding: 5px 0px;
            /*border: 1px solid black;*/
          }
          .propval{
            width: 100%;
            font-weight: bold;
            /*border: 1px solid black;*/
          }
        }
        /*选型选项*/
        .drawer-opt{
          width: 100%;
          height: auto;
          display: flex;
          /*border: 1px solid black;*/
          ul{
            width: 100%;
            height: auto;
            list-style: none;
            display: flex;
            flex-wrap: wrap;
            /*border: 1px solid black;*/
            li{
              padding: 2px 10px;
              font-size: 12px;
              cursor: pointer;
              margin-top: 5px;
              display: flex;
              /*border: 1px solid #e8e8e8;*/
            }
          }
        }
      }
      /*抽屉数据操作*/
      .drawer-oper{
        width: 100%;
        height: 30px;
        text-align: right;
        margin: 20px 0;
        /*border: 1px solid black;*/
        span{
          font-size: 12px;
          cursor: pointer;
          color: white;
          background: @theme;
          padding: 10px 5px;
          border-radius: 5px;
          margin-right: 20px;
        }
      }
    }
</style>
