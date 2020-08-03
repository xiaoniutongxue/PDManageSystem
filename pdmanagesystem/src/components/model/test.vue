<template>
    <div class="accdata_all">
      <div>
        <input type="file" id="file" name="filename" @change="get_imgdata"/>
      </div>
      <!--<div>
        {{img_data}}
      </div>-->
      <login/>
    </div>
</template>

<script>
    import login from "../../views/login";

    import {get_imgdata} from "../../network/model/test";
    import {get_file} from "../../network/model/test";

    export default {
        name: "test",
        data(){
          return{
            img_url:'',
            img_data:[]
          }
        },
      created() {
          /*this.get_imgdata(1);*/
      },
      components:{
        login
      },
      methods:{
          get_imgdata(e){
            // console.log(e.target.files)
            get_file(e.target.files[0]).then(res=>{
              console.log(res)
            })
          },
        }
    }
</script>

<style lang="less" scoped>
  @import "../../assets/less/variable";
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
        .null{
          width: 100%;
          text-align: center;
          margin-top: 20px;
          font-size: 12px;
          display: block;
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
        /*类型数据*/
        .right-top{
          width: 100%;
          height: 40px;
          display: flex;
          margin: 0 auto;
          border-bottom: 1px solid @tbl-bor;
          /*类型名称*/
          .right_type{
            width: 85%;
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
            /*.fir{
              font-size;
            }*/
          }
          /*操作*/
          .oper{
            width: 15%;
            font-size: 12px;
            cursor: pointer;
            text-align: center;
            /*border: 1px solid @tbl-bor;*/
            span{
              margin-left: 10px;
              line-height: 40px;
            }
            span:hover{
              color: @theme;
              text-decoration: underline;
            }
          }
        }
        .null{
          width: 100%;
          text-align: center;
          margin-top: 20px;
          font-size: 12px;
          display: block;
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
            h3{
              width: 85%;
              height: 100%;
              line-height: 30px;
              font-size: 16px;
              padding-left: 20px;
              /*border: 1px solid black;*/
            }
            .oper{
              width: 15%;
              height: 100%;
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
          table{
            width: 100%;
            font-size: 12px;
            margin-top: 5px;
            border-collapse: collapse;
            thead{
              tr{
                td{
                  height: 30px;
                  text-align: center;
                  font-weight: bold;
                  background: @tbl-bg;
                  border: 1px solid @tbl-bor;
                }
              }
            }
            tbody{
              tr{
                td{
                  height: 25px;
                  text-align: center;
                  border: 1px solid @tbl-bor;
                }
                .oper{
                  width: 10%;
                  span{
                    cursor: pointer;
                    margin-left: 10px;
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

    /*dilog对话框*/
    .dialog{
      ul{
        width: 90%;
        height: auto;
        margin: 0 auto;
        list-style: none;
        li{
          width: 100%;
          height: 30px;
          margin-top: 10px;
          display: flex;
          /*border: 1px solid black;*/
          span{
            width: 20%;
            line-height: 30px;
            display: block;
          }
          input{
            outline: none;
          }
        }
        .textli{
          width: 100%;
          height: 30px;
          input{
            width: 80%;
          }
        }
      }
    }

    .selected{
      color: @theme;
    }
  }
</style>
