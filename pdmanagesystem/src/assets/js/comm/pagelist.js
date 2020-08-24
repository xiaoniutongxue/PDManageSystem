export default {
  /*当前页数据*/
  get_currpagedata(data,pagesize,currpage){
    /*totalpage:总页数,currpage:当前页,currdata:当前页数据*/
    let totalpage,currdata=[]
    for(let i=0;i<data.length;i++){
      if(i>=((currpage-1)*pagesize) && i>=((currpage-1)*pagesize)){}
    }
  },

  /*首页*/
  home_page(){
    console.log(123)
  },

  /*尾页*/
  last_page(){},

  /*上一页*/
  up_page(){},

  /*下一页*/
  down_page(){},

  /*数字一页*/
  num_page(){},
}


