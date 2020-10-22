<template>
    <div class="page_all">
      <ul>
        <li @click="home_page">首页</li>
        <li @click="up_page">上一页</li>
        <li @click="down_page">下一页</li>
        <li @click="last_page">尾页</li>
        <li class="page_num">
          <input v-model="page_num" type="text" placeholder=""/>
        </li>
        <li @click="num_page">GO</li>
        <li class="recode">{{currpage}}/{{totalpage}}页  (共{{totalrecode}}条记录)</li>
      </ul>
    </div>
</template>

<script>
    export default {
        props:['Page_Msg'],
        name: "PageOper",
        data(){
          return{
            currpage:1,         /*当前页*/
            page_num:'',        /*分页数字查询*/
            totalrecode:0,     /*总记录数*/
            totalpage:'',      /*总页数*/
          }
        },
        watch:{
          Page_Msg:{
            deep:true,
            handler(newVal){
              this.get_currpagedata(1);
              this.totalrecode = newVal.data.length;
            },
          },
        },
        methods:{
          /*当前页数据*/
          get_currpagedata(currpage){
            this.currpage=currpage;
            /*totalpage:总页数,currpage:当前页,currdata:当前页数据*/
            let currdata=[]
            this.totalpage=Math.ceil(this.Page_Msg.data.length/this.Page_Msg.pagesize)
            for(let i=0;i<this.Page_Msg.data.length;i++){
              if(i>=((currpage-1)*this.Page_Msg.pagesize) && i<((currpage)*this.Page_Msg.pagesize)){
                currdata.push(this.Page_Msg.data[i])
              }
            }
            this.$emit('get_PageData',currdata)
          },

          /*首页*/
          home_page(){
            this.get_currpagedata(1);
          },

          /*尾页*/
          last_page(){
            this.get_currpagedata(this.totalpage);
          },

          /*上一页*/
          up_page(){
            if(this.currpage===1){
              this.$message({
                type:'warning',
                message:'数据已经到顶咯!',
                duration:1000
              })
            }else{
              this.get_currpagedata(this.currpage-1);
            }
          },

          /*下一页*/
          down_page(){
            if(this.currpage===this.totalpage){
              this.$message({
                type:'warning',
                message:'数据已经到头咯!',
                duration:1000
              })
            }else{
              this.get_currpagedata(this.currpage+1);
            }
          },

          /*数字一页*/
          num_page(){
            if(isNaN(this.page_num) || this.page_num<1 || this.page_num>this.totalpage){
              this.$message({
                type:'warning',
                message:'请输入正确页码!',
                duration:1000
              })
            }else{
              this.get_currpagedata(this.page_num);
            }
          },
        }
    }
</script>

<style lang="less" scoped>
  @import "../../assets/less/comm/variable";
  .page_all{
    width: 100%;
    height: 100%;
    border-top:1px dashed @tbl-bor ;
    ul{
      width: 700px;
      height: 100%;
      list-style: none;
      margin: 0 auto;
      display: flex;
      justify-content: space-evenly;
      /*border: 1px solid black;*/
      li{
        padding: 3px 15px;
        margin: 8px 10px;
        font-size: 12px;
        cursor: pointer;
        -webkit-user-select: none;
        border: 1px solid @tbl-bor;
        input{
          width: 30px;
          height: 100%;
          text-align: center;
          outline: none;
          border: none;
        }
      }
      .recode:hover{
        color: black;
        background: white;
      }
      li:hover{
        color: white;
        background: @theme;
      }
      .page_num:hover{
        background: white;
      }
    }
  }
</style>
