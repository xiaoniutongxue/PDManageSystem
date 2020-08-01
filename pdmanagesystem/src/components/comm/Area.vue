<!--地区组件-->
<template>
  <div class="area">
    <select v-model="province" @change="change_province">
      <option value="">--请选择省份--</option>
      <option v-for="item in provincedata"
              :value="item.district_name">
        {{item.district_name}}
      </option>
    </select>
    <select v-model="city" @change="change_city">
      <option value="">--请选择城市--</option>
      <option v-for="item in citydata"
              @click="get_countydata(province,item.district_name)"
              :value="item.district_name">
        {{item.district_name}}
      </option>
    </select>
    <select v-model="county">
      <option value="">--请选择区县--</option>
      <option v-for="item in countydata"
              :value="item.district_name">
        {{item.district_name}}
      </option>
    </select>
  </div>
</template>

<script>

    export default {
        props:[
          "areaData",       /*传入的默认值*/
        ],
        name: "Area",
        data(){
          return{
            /*地区数据*/
            province:"",        /*省绑定值*/
            city:"",            /*市绑定值*/
            county:"",          /*区绑定值*/

            provincedata:[],    /*省所有数据*/
            citydata:[],        /*得到的市数据*/
            countydata:[],     /*得到的区数据*/
          }
        },
        created() {
          this.get_provincedata(this.AllareaData)
        },
        computed:{
          /*所有地区数据在加载整个页面的时候就请求好,不然会造成多次引用多次调用接口*/
          AllareaData(){
            return this.$store.state.AllareaData
          },
        },
        watch:{
          areaData:{
            immediate:true,
            handler(newVal){
              this.province=newVal.province;
              this.get_citydata(this.province);
              this.city=newVal.city;
              this.get_countydata(this.province,this.city);
              this.county=newVal.county;
            },
          },
          province(newVal){
            this.get_citydata(newVal);
            let area={};
            area={
              province:this.province,
              city:this.city,
              county:this.county
            }
            this.$emit("getarea",area)
          },
          city(newVal){
            this.get_countydata(this.province,newVal);
            let area={};
            area={
              province:this.province,
              city:this.city,
              county:this.county
            }
            this.$emit("getarea",area)
          },
          county(){
            let area={};
            area={
              province:this.province,
              city:this.city,
              county:this.county
            }
            this.$emit("getarea",area)
          },
        },
        methods:{
          //1.获得参数
          /*a.获得省数据*/
          get_provincedata(list){
            this.provincedata=[];
            for(let i=0;i<list.length;i++){
              this.provincedata.push(list[i])
            }
          },

          /*b.获得市数据*/
          get_citydata(province){
            this.citydata=[];
            for(let i=0;i<this.AllareaData.length;i++){
              if(this.AllareaData[i].district_name==province){
                for(let j=0;j<this.AllareaData[i].child.length;j++){
                  this.citydata.push(this.AllareaData[i].child[j])
                }
              }
            }
          },

          /*c.获得区数据*/
          get_countydata(province,city){
            this.countydata=[];
            for(let i=0;i<this.AllareaData.length;i++){
              if(this.AllareaData[i].district_name==province){
                for(let j=0;j<this.AllareaData[i].child.length;j++){
                  if(this.AllareaData[i].child[j].district_name==city){
                    for(let z=0;z<this.AllareaData[i].child[j].child.length;z++){
                      this.countydata.push(this.AllareaData[i].child[j].child[z]);
                    }
                  }
                }
              }
            }
          },

          //2.当改变选项时，清空后面选项
          /*ps：option没有点击事件，可以变相通过select的change事件触发*/
          change_province(){
            this.city="";
            this.county="";
          },
          change_city(){
            this.county="";
          },
        },
    }
</script>

<style lang="less" scoped>
  @import "../../assets/less/variable";
  .area{
    width: 100%;
    height: auto;
    select{
      width: 110px;
      margin-right: 5px;
      height: 25px;
      outline: none;
      color: black;
      /*border: 1px solid @tbl-bor;*/
    }
  }
</style>
