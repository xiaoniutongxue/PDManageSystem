<template>
  <div class="fac_all">
    <!--品牌头部-->
    <div class="fac_top">
      <!--左边查询-->
      <div class="top_left">
        <el-input class="input" size="small" v-model="fac_val" placeholder="请输入内容"></el-input>
        <span class="search" @click="search_fac">查询</span>
        <span class="clear" @click="clear_facval">重置</span>
      </div>

      <!--右边添加-->
      <div class="top_right">
        <span @click="show_adddilog">添加厂商</span>
      </div>
    </div>

    <!--品牌内容-->
    <div class="fac_cont">
      <!--数据表格-->
      <div class="page_table">
        <table>
          <thead>
          <tr>
            <td>全选</td>
            <td>id</td>
            <td>全称</td>
            <td>简称</td>
            <td>联系方式</td>
            <td>网址</td>
            <td>邮箱</td>
            <td>国家</td>
            <td>省份</td>
            <td>城市</td>
            <td>区县</td>
            <td>详细地址</td>
            <td>操作</td>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(fac,i) in fac_PageData">
            <td>全选</td>
            <td>{{fac.factID}}</td>
            <td>{{fac.factName}}</td>
            <td>{{fac.ShortCusName}}</td>
            <td>{{fac.Phone}}</td>
            <td>{{fac.WebSite}}</td>
            <td>{{fac.Email}}</td>
            <td>{{fac.Country}}</td>
            <td>{{fac.Province}}</td>
            <td>{{fac.City}}</td>
            <td>{{fac.County}}</td>
            <td>{{fac.Address}}</td>
            <td class="oper">
              <span @click="show_facpar(i)">查看详情</span>
              <span @click="show_facupdata(i)">修改</span>
              <span @click="del_facdata(i)">删除</span>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <!--分页操作-->
      <div class="page_oper">
        <PageOper :Page_Msg="Page_Msg" @get_PageData="get_PageData"/>
      </div>
    </div>


    <!--dilog对话框-->
    <!--添加数据-->
    <el-dialog class="add_dialog" title="添加品牌" :visible.sync="add_facdilog" width="45%">
      <ul>
        <li>
          <span class="tit">
              <span class="must">*</span>
              品牌名称:
          </span>
          <span class="input">
            <el-input class="input" v-model="factName" size="small"
                      @blur="judje_facinfo('factName')"
                      placeholder="请输入名称">
            </el-input>
          </span>
          <span class="err">{{err_factName}}</span>
        </li>
        <li>
          <span class="tit">
              <span class="must">*</span>
              简称:
          </span>
          <span class="input">
            <el-input class="input" v-model="ShortCusName" size="small"
                      @blur="judje_facinfo('ShortCusName')"
                      placeholder="请输入简称">
            </el-input>
          </span>
          <span class="err">{{err_ShortCusName}}</span>
        </li>
        <li>
          <span class="tit">网址:</span>
          <span class="input">
            <el-input class="input" v-model="WebSite" size="small"
                      @blur="judje_facinfo('WebSite')"
                      placeholder="请输入网址">
            </el-input>
          </span>
          <span class="err">{{err_WebSite}}</span>
        </li>
        <li>
          <span class="tit">联系方式1:</span>
          <span class="input">
            <el-input class="input" v-model="Phone" size="small"
                      @blur="judje_facinfo('Phone')"
                      placeholder="请输入联系方式1">
            </el-input>
          </span>
          <span class="err">{{err_Phone}}</span>
        </li>
        <li>
          <span class="tit">联系方式2:</span>
          <span class="input">
            <el-input class="input" v-model="Phone1" size="small"
                      @blur="judje_facinfo('Phone1')"
                      placeholder="请输入联系方式2">
            </el-input>
          </span>
          <span class="err">{{err_Phone1}}</span>
        </li>
        <li>
          <span class="tit">邮箱:</span>
          <span class="input">
            <el-input class="input" v-model="Email" size="small"
                      @blur="judje_facinfo('Email')"
                      placeholder="请输入邮箱">
            </el-input>
          </span>
          <span class="err">{{err_Email}}</span>
        </li>
        <li>
          <span class="tit">所在国家:</span>
          <span class="input">
            <el-input class="input" v-model="Country" :disabled="true" size="small"
                      @blur="judje_facinfo('Country')"
                      placeholder="请输入所属国家">
            </el-input>
          </span>
          <span class="err">{{err_Country}}</span>
        </li>
        <li class="area">
          <span class="tit">
              <span class="must">*</span>所在地区:
          </span>
          <div class="areadiv">
            <Area @getarea="get_area" :areaData="AreaDefault" :updata="add_facdilog"/>
          </div>
          <span class="err">{{err_Area}}</span>
        </li>
        <li>
          <span class="tit">详细地址:</span>
          <span class="input">
            <el-input class="input" v-model="Address" size="small"
                      @blur="judje_facinfo('Address')"
                      placeholder="请输入详细地址">
            </el-input>
          </span>
          <span class="err">{{err_Address}}</span>
        </li>
        <li class="describe">
          <span class="tit">简介:</span>
          <textarea v-model="Description" @blur="judje_facinfo('Description')">
                    </textarea>
          <span class="err">{{err_Description}}</span>
        </li>
      </ul>

      <span slot="footer" class="dialog-footer">
        <el-button @click="add_facdilog = false">取 消</el-button>
        <el-button type="primary" @click="add_facdata">确 定</el-button>
      </span>
    </el-dialog>

    <!--显示详情-->
    <el-dialog class="show_dialog" title="品牌详情" :visible.sync="show_facdilog" width="45%">
      <ul>
        <li>
          <span class="tit">ID:</span>
          <span class="val">{{fac_itemdata.factID}}</span>
        </li>
        <li>
          <span class="tit">名称:</span>
          <span class="val">{{fac_itemdata.factName}}</span>
        </li>
        <li>
          <span class="tit">简称:</span>
          <span class="val">{{fac_itemdata.ShortCusName}}</span>
        </li>
        <li>
          <span class="tit">网址:</span>
          <span class="val">{{fac_itemdata.WebSite}}</span>
        </li>
        <li>
          <span class="tit">首字母大写:</span>
          <span class="val">{{fac_itemdata.KeyName}}</span>
        </li>
        <li>
          <span class="tit">全拼:</span>
          <span class="val">{{fac_itemdata.Ename}}</span>
        </li>
        <li>
          <span class="tit">联系方式1:</span>
          <span class="val">{{fac_itemdata.Phone}}</span>
        </li>
        <li>
          <span class="tit">联系方式2:</span>
          <span class="val">{{fac_itemdata.Phone1}}</span>
        </li>
        <li>
          <span class="tit">邮箱:</span>
          <span class="val">{{fac_itemdata.Email}}</span>
        </li>
        <li>
          <span class="tit">所属国家:</span>
          <span class="val">{{fac_itemdata.Country}}</span>
        </li>
        <li>
          <span class="tit">所属地区:</span>
          <span class="val">{{fac_itemdata.Province+' '+fac_itemdata.City+' '+fac_itemdata.County}}</span>
        </li>
        <li>
          <span class="tit">详细地址:</span>
          <span class="val">{{fac_itemdata.Address}}</span>
        </li>
        <li>
          <span class="tit">添加用户:</span>
          <span class="val">{{fac_itemdata.AddUser}}</span>
        </li>
        <li>
          <span class="tit">添加时间:</span>
          <span class="val">{{fac_itemdata.AddTime}}</span>
        </li>
        <li>
          <span class="tit">修改用户:</span>
          <span class="val">{{fac_itemdata.UpdataUser}}</span>
        </li>
        <li>
          <span class="tit">修改时间:</span>
          <span class="val">{{fac_itemdata.UpdataTime}}</span>
        </li>
        <li>
          <span class="tit">简介:</span>
          <span class="val">{{fac_itemdata.Description}}</span>
        </li>
      </ul>

      <span slot="footer" class="dialog-footer">
                <el-button @click="show_facdilog = false">确 定</el-button>
              </span>
    </el-dialog>

    <!--修改数据-->
    <el-dialog class="add_dialog" title="品牌信息修改" :visible.sync="updata_facdilog" width="45%">
      <ul>
        <li>
          <span class="tit">
              <span class="must">*</span>
              品牌名称:
          </span>
          <span class="input">
            <el-input class="input" v-model="factName" size="small"
                      @blur="judje_facinfo('factName')"
                      placeholder="请输入名称">
            </el-input>
          </span>
          <span class="err">{{err_factName}}</span>
        </li>
        <li>
          <span class="tit">
              <span class="must">*</span>
              简称:
          </span>
          <span class="input">
            <el-input class="input" v-model="ShortCusName" size="small"
                      @blur="judje_facinfo('ShortCusName')"
                      placeholder="请输入简称">
            </el-input>
          </span>
          <span class="err">{{err_ShortCusName}}</span>
        </li>
        <li>
          <span class="tit">网址:</span>
          <span class="input">
            <el-input class="input" v-model="WebSite" size="small"
                      @blur="judje_facinfo('WebSite')"
                      placeholder="请输入网址">
            </el-input>
          </span>
          <span class="err">{{err_WebSite}}</span>
        </li>
        <li>
          <span class="tit">联系方式1:</span>
          <span class="input">
            <el-input class="input" v-model="Phone" size="small"
                      @blur="judje_facinfo('Phone')"
                      placeholder="请输入联系方式1">
            </el-input>
          </span>
          <span class="err">{{err_Phone}}</span>
        </li>
        <li>
          <span class="tit">联系方式2:</span>
          <span class="input">
            <el-input class="input" v-model="Phone1" size="small"
                      @blur="judje_facinfo('Phone1')"
                      placeholder="请输入联系方式2">
            </el-input>
          </span>
          <span class="err">{{err_Phone1}}</span>
        </li>
        <li>
          <span class="tit">邮箱:</span>
          <span class="input">
            <el-input class="input" v-model="Email" size="small"
                      @blur="judje_facinfo('Email')"
                      placeholder="请输入邮箱">
            </el-input>
          </span>
          <span class="err">{{err_Email}}</span>
        </li>
        <li>
          <span class="tit">所在国家:</span>
          <span class="input">
            <el-input class="input" v-model="Country" :disabled="true" size="small"
                      @blur="judje_facinfo('Country')"
                      placeholder="请输入所属国家">
            </el-input>
          </span>
          <span class="err">{{err_Country}}</span>
        </li>
        <li class="area">
          <span class="tit">
              <span class="must">*</span>所在地区:
          </span>
          <div class="areadiv">
            <Area @getarea="get_area" :areaData="AreaDefault" :updata="add_facdilog"/>
          </div>
          <span class="err">{{err_Area}}</span>
        </li>
        <li>
          <span class="tit">详细地址:</span>
          <span class="input">
            <el-input class="input" v-model="Address" size="small"
                      @blur="judje_facinfo('Address')"
                      placeholder="请输入详细地址">
            </el-input>
          </span>
          <span class="err">{{err_Address}}</span>
        </li>
        <li class="describe">
          <span class="tit">简介:</span>
          <textarea v-model="Description" @blur="judje_facinfo('Description')">
                    </textarea>
          <span class="err">{{err_Description}}</span>
        </li>
      </ul>

      <span slot="footer" class="dialog-footer">
        <el-button @click="updata_facdilog = false">取 消</el-button>
        <el-button type="primary" @click="updata_facdata">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
    /*导入方法*/
    import {
      get_factorydata,         /*获取厂商*/
      add_factory,             /*添加厂商*/
      updata_factory,          /*修改厂商*/
      delate_factory          /*删除厂商*/
    } from "../../network/model/facmanage";
    import pinyin from "../../assets/js/comm/pinyin";

    /*导入组件*/
    import Area from "../comm/Area";                          /*地区组件*/
    import PageOper from "../comm/PageOper";                  /*分页组件*/

    export default {
        name: "FacManage",
        data(){
          return{
            // 1.开关
            add_facdilog:false,         /*添加厂商*/
            show_facdilog:false,        /*显示详情*/
            updata_facdilog:false,       /*修改厂商*/

            /*2.厂商所有数据*/
            fac_data:[],                    /*所有厂商数据*/
            fac_PageData:[],                /*厂商分页分页数据*/
            fac_itemdata:[],                /*厂商单个数据*/
            fac_val:'',                     /*厂商查询输入值*/

            /*3.厂商数据*/
            factId: '',                 /*厂商id*/
            factName:'',                /*厂商名称*/
            ShortCusName:'',            /*简称*/
            Phone:'',                   /*联系方式1*/
            Phone1:'',                  /*联系方式2*/
            Email:'',                   /*邮箱*/
            WebSite:'',                 /*网址*/
            Country:'中国',             /*所在国家*/
            Area:"",                    /*所在地区*/
            Address:'',                 /*详细地址*/
            Description:'',             /*简介*/

            /*数据格式错误*/
            err_factName:'',                /*厂商名称错误信息*/
            err_ShortCusName:'',            /*简称错误信息*/
            err_Phone:'',                   /*联系方式1错误信息*/
            err_Phone1:'',                  /*联系方式2错误信息*/
            err_Email:'',                   /*邮箱错误信息*/
            err_WebSite:'',                 /*网址错误信息*/
            err_Country:'',                 /*所在国家错误信息*/
            err_Area:'',                    /*所在地区错误信息*/
            err_Address:'',                 /*详细地址错误信息*/
            err_Description:'',             /*简介错误信息*/

            /*4.地区数据*/
            AreaDefault:[],                 /*地区默认值*/

            /*5.分页数据*/
            Page_Msg:{
              data:[],
              pagesize:20,
            }
        }
        },
        created() {
          this.get_FacData();
        },
        computed:{
            /*用户*/
            user(){
              return this.$store.state.user;
            },
            /*当前系统时间*/
            sys_date(){
              return this.$store.getters.sys_date;
            }
        },
        components:{
          PageOper,
          Area
        },
        methods:{
          //1.获取数据
          /*a.获取厂商数据*/
          get_FacData(){
            get_factorydata().then(res=>{
              this.fac_data=res;
              this.Page_Msg.data=res;
            })
          },

          /*b.获取地区信息*/
          get_area(area){
            this.Area=area
          },

          /*c.获取分页数据*/
          get_PageData(data){
            this.fac_PageData=data
          },

          // 2.添加数据
          /*显示添加数据框*/
          show_adddilog(){
            this.add_facdilog=true;
            this.factName="";
            this.ShortCusName='';
            this.Phone="";
            this.Phone1='';
            this.Email='';
            this.WebSite='';
            this.Description='';
            this.AreaDefault={
              province:'',
              city:'',
              county:''
            }
          },

          /*添加数据*/
          add_facdata(){
            let facdata={}
            /*判断厂商名称*/
            if(this.factName==""){
              this.err_factName="厂商不能为空"
              return;
            }else if (this.err_factName!=""){
              return;
            }else{
              facdata.factName=this.factName
            }

            /*判断厂商简称*/
            if(this.ShortCusName==""){
              this.err_ShortCusName="简称不能为空"
              return;
            }else if (this.err_ShortCusName!=""){
              return;
            }else{
              facdata.ShortCusName=this.ShortCusName
            }

            /*首字母大写*/
            facdata.KeyName=pinyin.pinyin.getCamelChars(this.factName)

            /*全拼*/
            facdata.Ename=pinyin.pinyin.getFullChars(this.factName)

            /*判断联系方式1*/
            if(this.err_Phone!=""){
              return;
            }else{
              facdata.Phone=this.Phone
            }

            /*判断联系方式2*/
            if(this.err_Phone1!=""){
              return;
            }else{
              facdata.Phone1=this.Phone1
            }

            /*判断邮箱*/
            if(this.err_Email!=""){
              return;
            }else{
              facdata.Email=this.Email
            }

            /*判断网址*/
            if(this.err_WebSite!=""){
              return;
            }else{
              facdata.WebSite=this.WebSite
            }

            /*判断地区*/
            if(this.Area==""){
              this.err_Area="请选择厂商所在地"
              return;
            }else if(this.Area.province==""){
              this.err_Area="请选择厂商所在省份"
              return;
            }else if(this.Area.city==""){
              this.err_Area="请选择厂商所在城市"
              return;
            }else if(this.Area.county==""){
              this.err_Area="请选择厂商所在区县"
              return;
            }else{
              this.err_Area=""
              facdata.Province=this.Area.province;
              facdata.City=this.Area.city;
              facdata.County=this.Area.county;
            }

            /*判断详细地址*/
            if(this.err_Address!=""){
              return;
            }else{
              facdata.Address=this.Address
            }

            /*所在国家*/
            facdata.Country=this.Country

            /*判断简介*/
            if(this.err_Description!=""){
              return;
            }else{
              facdata.Description=this.Description
            }

            /*添加用户*/
            facdata.AddUser=this.user;

            /*添加时间*/
            facdata.AddTime=this.sys_date;

            facdata=JSON.stringify(facdata)
            /*添加厂商*/
            add_factory(facdata).then(res=>{
              if(res.code==200){
                this.$message({
                  type:'success',
                  message:res.message,
                  duration:1000
                })
                this.add_facdilog=false
                this.get_FacData()
              }else{
                this.$message({
                  type:'error',
                  message:res.message,
                  duration:1000
                })
              }
            })
          },

          /*输入框失去焦点时判断*/
          judje_facinfo(value){
            /*判断厂商名称*/
            if(value=="factName"){
              if(this.factName==""){
                this.err_factName="厂商名称不能为空"
              }else if (this.factName.length>=20){
                this.err_factName="厂商长度不能超过20"
              }else{
                this.err_factName="";
              }
            }

            /*判断厂商简称*/
            if(value=="ShortCusName"){
              if(this.ShortCusName==""){
                this.err_ShortCusName="简称不能为空"
              }else if (this.ShortCusName.length>=20){
                this.err_ShortCusName="简称长度不能超过20"
              }else{
                this.err_ShortCusName="";
              }
            }

            /*判断联系方式1*/
            if(value='Phone'){
              if(this.Phone!=""){
                if(this.Phone.length>20){
                  this.err_Phone="联系方式长度不能超过20"
                }else{
                  this.err_Phone=""
                }
              }
            }

            /*判断联系方式2*/
            if(value='Phone1'){
              if(this.Phone1!=""){
                if(this.Phone1.length>20){
                  this.err_Phone1="联系方式长度不能超过20"
                }else{
                  this.err_Phone1=""
                }
              }
            }

            /*判断邮箱*/
            if(value='Email'){
              if(this.Email!=""){
                if(this.Email.length>20){
                  this.err_Email="邮箱长度不能超过20"
                }else{
                  this.err_Email=""
                }
              }
            }

            /*判断网址*/
            if(value='WebSite'){
              if(this.WebSite!=""){
                if(this.WebSite.length>30){
                  this.err_WebSite="网址长度不能超过30"
                }else{
                  this.err_WebSite=""
                }
              }
            }

            /*判断地址*/
            if(value='Address'){
              if(this.Address!=""){
                if(this.Address.length>20){
                  this.err_Address="全拼长度不能超过20"
                }else{
                  this.err_Address=""
                }
              }
            }

            /*判断简介*/
            if(value='Description'){
              if(this.Description!=""){
                if(this.Description.length>50){
                  this.err_Description="全拼长度不能超过50"
                }else{
                  this.err_Description=""
                }
              }
            }
          },

          // 3.显示详情
          show_facpar(index){
            this.fac_itemdata=this.fac_data[index]
            this.show_facdilog=true
          },

          // 4.修改数据
          /*显示修改数据框*/
          show_facupdata(index){
            this.factId=this.fac_data[index].factID;
            this.factName=this.fac_data[index].factName;
            this.ShortCusName=this.fac_data[index].ShortCusName;
            this.WebSite=this.fac_data[index].WebSite;
            this.Phone=this.fac_data[index].Phone;
            this.Phone1=this.fac_data[index].Phone1;
            this.Email=this.fac_data[index].Email;
            this.Address=this.fac_data[index].Address;
            this.Description=this.fac_data[index].Description;
            this.AreaDefault={
              province:this.fac_data[index].Province,
              city:this.fac_data[index].City,
              county:this.fac_data[index].County
            }
            this.updata_facdilog=true;
          },

          /*修改数据*/
          updata_facdata(){
            let facdata={}
            /*厂商id*/
            facdata.factID=this.factId;

            /*判断厂商名称*/
            if(this.factName==""){
              this.err_factName="厂商不能为空"
              return;
            }else if (this.err_factName!=""){
              return;
            }else{
              facdata.factName=this.factName
            }

            /*判断厂商简称*/
            if(this.ShortCusName==""){
              this.err_ShortCusName="简称不能为空"
              return;
            }else if (this.err_ShortCusName!=""){
              return;
            }else{
              facdata.ShortCusName=this.ShortCusName
            }

            /*首字母大写*/
            facdata.KeyName=pinyin.pinyin.getCamelChars(this.factName)

            /*全拼*/
            facdata.Ename=pinyin.pinyin.getFullChars(this.factName)

            /*判断联系方式1*/
            if(this.err_Phone!=""){
              return;
            }else{
              facdata.Phone=this.Phone
            }

            /*判断联系方式2*/
            if(this.err_Phone1!=""){
              return;
            }else{
              facdata.Phone1=this.Phone1
            }

            /*判断邮箱*/
            if(this.err_Email!=""){
              return;
            }else{
              facdata.Email=this.Email
            }

            /*判断网址*/
            if(this.err_WebSite!=""){
              return;
            }else{
              facdata.WebSite=this.WebSite
            }

            /*判断地区*/
            if(this.Area==""){
              this.err_Area=""
              facdata.Province=this.AreaDefault.province;
              facdata.City=this.AreaDefault.city;
              facdata.County=this.AreaDefault.county;
            }else{
              this.err_Area=""
              facdata.Province=this.Area.province;
              facdata.City=this.Area.city;
              facdata.County=this.Area.county;
            }

            /*详细地址*/
            if(this.err_Address!=""){
              return;
            }else{
              facdata.Address=this.Address
            }

            /*所在国家*/
            facdata.Country=this.Country

            /*判断简介*/
            if(this.err_Description!=""){
              return;
            }else{
              facdata.Description=this.Description
            }

            /*添加用户*/
            facdata.UpdataUser=this.user;

            /*添加时间*/
            facdata.UpdataTime=this.sys_date;

            facdata=JSON.stringify(facdata)
            /*添加厂商*/
            updata_factory(facdata).then(res=>{
              if(res.code==200){
                this.$message({
                  type:'success',
                  message:res.message,
                  duration:1000
                })
                this.updata_facdilog=false
                this.get_FacData()
              }else{
                this.$message({
                  type:'error',
                  message:res.message,
                  duration:1000
                })
              }
            })
          },

          // 5.删除数据
          del_facdata(index){
            let fatId=this.fac_data[index].factID;
            this.$confirm("确认删除该厂商吗？",'提示',{
              confirmButtonText:'确认',
              cancelButtonText:'取消',
              type:'warning'
            }).then(()=>{
              delate_factory(fatId).then(res=>{
                if(res.code==200){
                  this.$message({
                    type: 'success',
                    message: '删除成功',
                    duration:1000
                  });
                  this.get_FacData()
                }
              })
            }).catch(()=>{
              this.$message({
                type: 'info',
                message: '已取消删除',
                duration:1000
              });
            })
          },

          /*6.厂商查询*/
          search_fac(){
            let fac_res=[]
            if(this.fac_val==''){
              this.get_FacData()
            }else{
              for(let i=0;i<this.fac_data.length;i++){
                if(this.fac_data[i].factName.indexOf(this.fac_val)!=-1){
                  fac_res.push(this.fac_data[i])
                }
              }
              this.fac_data=fac_res;
            }
          },

          /*7.清空搜索框*/
          clear_facval(){
            this.fac_val="";
            this.search_fac();
          },
        },
    }
</script>

<style lang="less" scoped>
  @import "../../assets/less/model/factory";
</style>
