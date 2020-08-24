<template>
    <div class="page_all">
      <ul>
        <li>首页</li>
        <li>上一页</li>
        <li>下一页</li>
        <li>尾页</li>
        <li class="page_num">
          <input type="text"/>
        </li>
        <li>GO</li>
      </ul>
    </div>
</template>

<script>
    export default {
        name: "PageOper"
    }
</script>

<style lang="less" scoped>
  .page_all{
    width: 100%;
    height: 100%;
    ul{
      width: 600px;
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
        border: 1px solid @tbl-bor;
        input{
          width: 30px;
          height: 100%;
          text-align: center;
          outline: none;
          border: none;
        }
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
