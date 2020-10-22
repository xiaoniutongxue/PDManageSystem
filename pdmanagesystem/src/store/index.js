import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 1.页面加载创建时加载数据
    AllareaData:[],              /*全国地区数据*/

    //2.系列管理数据
    Ser_data:{
      fac_id:'',
      fac_name:'',
      selectedid:''
    },

    // 3.公共数据
    /*厂商系列搜索框数据*/
    facserdata:{
      fac_id:'',
      fac_name:'',
      ser_id:'',
      ser_name:''
    },                        /*品牌系列选中数据*/
    sys_date:new Date(),      /*当前系统时间*/
    user:'',                  /*登录用户*/

    arr:'',
  },
  mutations: {
    // 1.获取页面加载创建时加载数据
    get_Areadate(state,list){
      state.AllareaData=list
    },

    // 2.获取系列管理数据
    get_SerData(state,serdata){
      state.Ser_data=serdata;
    },

    //3.获取动态公共数据
    /*a.品牌id,系列id*/
    get_FacSerData(state,facserdata){
      state.facserdata.fac_id=facserdata.fac_id;
      state.facserdata.fac_name=facserdata.fac_name;
      state.facserdata.ser_id=facserdata.ser_id;
      state.facserdata.ser_name=facserdata.ser_name;
    },
    /*b.判断用户*/
    get_User(state,name){
      state.user=name
    },

    get_arr(state,arr){
      state.arr=arr
    },

  },
  getters:{
    /*获取当前系统格式*/
    sys_date:function(state){
      let year=state.sys_date.getFullYear();
      let month= state.sys_date.getMonth()+1;
      if(month<10){
        month='0'+month;
      }
      let day=state.sys_date.getDate();
      if (day<10){
        day='0'+day;
      }
      let hour=state.sys_date.getHours();
      let seconds=state.sys_date.getSeconds();
      let minutes=state.sys_date.getMinutes();
      let time=year+'-'+month+'-'+day+' '+hour+':'+minutes+':'+seconds;
      return time
    },
  },
  actions: {
  },
  modules: {
  },
  /*plugins: [createPersistedState()]*/
})
