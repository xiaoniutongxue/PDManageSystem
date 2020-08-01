import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    /*1.页面加载创建时加载数据*/
    AllareaData:[],              /*全国地区数据*/

    // 2.公共数据
    facserdata:{
      fac_id:'',
      fac_name:'',
      ser_id:'',
      ser_name:''
    },                        /*品牌系列选中数据*/
    sys_date:new Date(),      /*当前系统时间*/
    user:'ls',                /*登录用户*/
  },
  mutations: {
    // 1.获取页面加载创建时加载数据
    get_Areadate(state,list){
      state.AllareaData=list
    },

    //2.获取动态公共数据
    /*品牌id,系列id*/
    get_FacSerData(state,facserdata){
      state.facserdata.fac_id=facserdata.fac_id;
      state.facserdata.fac_name=facserdata.fac_name;
      state.facserdata.ser_id=facserdata.ser_id;
      state.facserdata.ser_name=facserdata.ser_name;
    },

  },
  getters:{
    /*获取当前系统格式*/
    sys_date:function(state){
      let year=state.sys_date.getFullYear();
      let month= state.sys_date.getMonth()
      if(month<10){
        month='0'+month;
      }
      let day=state.sys_date.getDay();
      if (day<10){
        day='0'+day;
      }
      let hour=state.sys_date.getHours();
      let seconds=state.sys_date.getSeconds();
      let minutes=state.sys_date.getMinutes();
      let time=year+'-'+month+'-'+day+' '+hour+':'+seconds+':'+minutes;
      return time
    },
  },
  actions: {
  },
  modules: {
  }
})
