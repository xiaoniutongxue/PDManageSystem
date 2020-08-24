<template>
    <div class="search_all">
      <!--厂商搜索-->
      <span class="facname">品牌:</span>
      <el-select v-model="fac_value" class="fac" size="small" filterable placeholder="请选择品牌">
        <el-option
          v-for="item in fac_data"
          :key="item.value"
          :label="item.label"
          :title="item.factName"
          @click.native="get_serdata(item.factID,item.factName)"
          :value="item.factName | filterfacname">
        </el-option>
      </el-select>

      <span class="sername">系列:</span>
      <!--系列搜索-->
      <el-select v-model="ser_value" class="ser" size="small" placeholder="请选择系列">
        <el-option
          v-for="item in ser_data"
          :key="item.value"
          :label="item.label"
          @mouseenter.native="get_serpardata(item.child)"
          :value="item.SeriesName">
        </el-option>
      </el-select>

      <!--系列分类详情-->
      <div class="serpar" v-if="ser_parshow" @mouseleave="ser_parshow=false">
        <span class="null" v-if="ser_pardata==''">该系列暂未添加数据</span>
        <div class="paritem" v-for="partit in ser_pardata">
          <h3>{{partit.SeriesName}}</h3>
          <ul>
            <span class="null" v-if="partit.child==''">该系列暂未添加数据</span>
            <li v-for="paropt in partit.child" @click="get_facserid(paropt)">
              {{paropt.SeriesName}}
              {{paropt.SeriesId}}
            </li>
          </ul>
        </div>
      </div>

      <!--插槽-->
      <slot></slot>
    </div>
</template>

<script>
    /*导入方法*/
    import {get_factorydata} from "../../network/model/facmanage";
    import {get_seriesdata} from "../../network/model/sermanage";

    export default {
        name: "SearchFacSer",
        data(){
          return{
            // 1.品牌
            fac_data:[],            /*品牌数据*/
            fac_value:'',           /*品牌值*/

            // 2.系列
            ser_data:[],           /*系列数据*/
            ser_value:'',          /*系列值*/
            ser_parshow:false,     /*控制显示系列详情分类*/
            ser_pardata:[],        /*系列详情数据*/

            // 3.品牌和系列数据
            facser_data:{
              fac_id:'',
              fac_name:'',
              ser_id:'',
              ser_name:''
            }
          }
        },
        created() {
          /*1.获取品牌*/
          this.get_facdata();
        },
        watch:{
          facser_data:{
            deep:true,
            handler(newVal){
              /*console.log(newVal)*/
              this.$store.commit('get_FacSerData',newVal)
            },
          }
        },
        computed:{
          facserdata(){
            return this.$store.state.facserdata;
          },
        },
        methods:{
          // 1.获取数据
          /*a.获取厂商*/
          get_facdata(){
            get_factorydata().then(res=>{
              this.fac_data=res;
              if(this.facserdata.fac_id===''){
                this.fac_value=res[0].factName;
                this.get_serdata(res[0].factID,res[0].factName);
              }else{
                this.fac_value=this.facserdata.fac_name;
                this.get_serdata(this.facserdata.fac_id,this.facserdata.fac_name);
              }
            })
          },

          /*b.获取系列*/
          get_serdata(factid,factName){
            get_seriesdata(factid).then(res=>{
              this.ser_data=res;
              if(res.length>0){
                if(this.facserdata.ser_id==='' || this.facserdata.fac_id!=factid){
                  this.ser_value=res[0].child[0].child[0].SeriesName;
                  this.facser_data.ser_id=res[0].child[0].child[0].SeriesId;
                  this.facser_data.ser_name=res[0].child[0].child[0].SeriesName;
                }else{
                  this.facser_data.ser_id=this.facserdata.ser_id;
                  this.facser_data.ser_name=this.facserdata.ser_name;
                  this.ser_value=this.facserdata.ser_name;
                }
                this.facser_data.fac_id=factid;
                this.facser_data.fac_name=factName;
              }
            })
          },

          /*c.系列详情*/
          get_serpardata(data){
            this.ser_pardata=data;
            this.ser_parshow=true;
          },

          /*d.获取品牌系列id*/
          get_facserid(pardata){
            this.ser_value=pardata.SeriesName;
            this.ser_parshow=false;
            this.facser_data.ser_id=pardata.SeriesId;
            this.facser_data.ser_name=pardata.SeriesName;
          },
        },
        filters:{
          filterfacname(value){
            if(value.length>=15){
              let result = value.substring(0,15)
              return result+'...'
            }else{
              return value
            }
          }
        }
    }
</script>

<style lang="less" scoped>
  @import "../../assets/less/comm/variable";
  .search_all{
    width: 100%;
    height: 100%;
    position: relative;
    /*border: 1px solid black;*/
    span{
      font-size: 12px;
      margin-left: 20px;
    }
    /*品牌*/
    .fac{
      width: 270px;
      margin-left: 5px;
      margin-top: 10px;
    }
    /*系列*/
    .ser{
      width: 230px;
      margin-left: 5px;
    }
    /*插槽内容*/
    .type{
      width: 230px;
      margin-left: 5px;
    }
    .serpar{
      width: 700px;
      min-height: 300px;
      max-height: 600px;
      overflow: auto;
      position: absolute;
      top: 50px;
      left: 605px;
      z-index: 1;
      border-radius: 10px;
      background: white;
      border: 1px solid @tbl-bor;
      .paritem{
        width: 96%;
        height: auto;
        margin: 5px auto;
        /*border: 1px solid black;*/
        h3{
          font-size: 14px;
          line-height: 25px;
          color: @theme;
        }
        ul{
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          list-style: none;
          li{
            width: 32%;
            font-size: 12px;
            line-height: 20px;
            margin-bottom: 5px;
            cursor: pointer;
            /*border: 1px solid black;*/
          }
          li:hover{
            color: @theme;
          }
          .null{
            width: 100%;
            text-align: center;
            /*border: 1px solid black;*/
          }
        }
        ul:after{
          content: '';
          width: 32%;
        }
      }
    }
  }
</style>
